// 09 — Jaeger client instrumentation (Go)

package main

import (
    "context"
    "fmt"
    "io"
    "net/http"
    "os"
    "time"

    "github.com/opentracing/opentracing-go"
    "github.com/uber/jaeger-client-go"
    "github.com/uber/jaeger-client-go/config"
)

func main() {
    cfg, err := config.FromEnv()
    if err != nil {
        // Use default config
        cfg = &config.Configuration{
            ServiceName: "my-service",
            Sampler: &config.SamplerConfig{
                Type:  "const",
                Param: 1,
            },
            Reporter: &config.ReporterConfig{
                LogSpans:            true,
                BufferFlushInterval: 1 * time.Second,
                LocalAgentHostPort:  "jaeger:6831",
            },
        }
    }

    tracer, closer := cfg.NewTracer()
    defer closer.Close()
    opentracing.SetGlobalTracer(tracer)

    http.HandleFunc("/hello", handleHello)
    http.ListenAndServe(":8080", nil)
}

func handleHello(w http.ResponseWriter, r *http.Request) {
    span := opentracing.StartSpan("handleHello")
    defer span.Finish()

    span.SetTag("http.method", r.Method)
    span.SetTag("http.path", r.URL.Path)

    // Simulate work
    callDownstream(r.Context(), span)

    io.WriteString(w, "Hello, World!")
}

func callDownstream(ctx context.Context, parent opentracing.Span) {
    span := opentracing.StartSpan(
        "callDownstream",
        opentracing.ChildOf(parent.Context()),
    )
    defer span.Finish()

    span.LogEvent("downstream called")
    time.Sleep(50 * time.Millisecond)
    span.LogKV("status", "ok")
}