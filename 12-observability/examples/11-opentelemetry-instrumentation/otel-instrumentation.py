"""11 — OpenTelemetry instrumentation (Python)"""
# Requires: pip install opentelemetry-api opentelemetry-sdk opentelemetry-exporter-otlp

from opentelemetry import trace, metrics
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import OTLPMetricExporter
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace.sampling import TraceIdRatioBased
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor  # pip install opentelemetry-instrumentation-fastapi

# === Setup ===
resource = Resource.create({"service.name": "my-app", "service.version": "1.0"})
tracer_provider = TracerProvider(resource=resource, sampler=TraceIdRatioBased(0.1))
tracer_provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter(endpoint="localhost:4317")))
trace.set_tracer_provider(tracer_provider)

meter_provider = MeterProvider(
    resource=resource,
    metric_readers=[PeriodicExportingMetricReader(OTLPMetricExporter(endpoint="localhost:4317"))]
)
metrics.set_meter_provider(meter_provider)

tracer = trace.get_tracer(__name__)
meter = metrics.get_meter(__name__)
request_counter = meter.create_counter("http_requests", unit="1")
latency_histogram = meter.create_histogram("http_request_duration", unit="ms")

# === Use in app ===
def handle_request(user_id: str) -> dict:
    with tracer.start_as_current_span("handle_request") as span:
        span.set_attribute("user.id", user_id)

        # Metrics
        request_counter.add(1, {"endpoint": "/users"})

        # Simulate work
        return {"user_id": user_id}

# === FastAPI auto-instrumentation ===
# from fastapi import FastAPI
# app = FastAPI()
# FastAPIInstrumentor.instrument_app(app)

# === Manual instrumentation (Go example equivalent) ===
# import "go.opentelemetry.io/otel"
# ctx, span := otel.Tracer("my-service").Start(ctx, "handle_request")
# defer span.End()
# otel.GetTextMapPropagator().Inject(ctx, propagation.HeaderCarrier(req.Header))