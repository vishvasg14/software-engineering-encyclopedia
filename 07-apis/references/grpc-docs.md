# gRPC Documentation Reference

The authoritative source for gRPC is the gRPC project at CNCF. This file catalogs the gRPC documentation pages referenced in the API document.

## Primary documentation

- **gRPC Documentation:** <https://grpc.io/docs/>
- **gRPC GitHub:** <https://github.com/grpc/grpc>
- **Protocol Buffers:** <https://protobuf.dev/>
- **gRPC HTTP/2 spec:** <https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md>

## Key concepts

| Concept | Description |
|---------|-------------|
| **Service definition** | `service` declaration in `.proto` |
| **RPC methods** | Unary, server-streaming, client-streaming, bidirectional streaming |
| **Protocol Buffers** | IDL for message definitions |
| **HTTP/2** | Transport layer |
| **Protobuf binary** | Wire format |
| **gRPC metadata** | Custom headers and trailers |
| **Status codes** | gRPC error codes |

## gRPC versions

| Version | Year | Notable additions |
|---------|------|-------------------|
| 1.0 | 2015 | Stable release |
| 1.1 | 2016 | Multi-platform |
| 1.10 | 2018 | HTTP/2 improvements |
| 1.20 | 2019 | Async/await support in C++ |
| 1.30 | 2020 | New HTTP/2 implementation |
| 1.50 | 2022 | xDS improvements |
| 1.60 | 2023 | Continued improvements |
| 1.65 | 2024 | Modern C++ features |
| 1.70 | 2025 | Continued improvements |

## Language support

| Language | Implementation |
|----------|---------------|
| C++ | `grpc-cpp` |
| Java | `grpc-java` |
| Go | `grpc-go` |
| Python | `grpcio` (Python gRPC) |
| Node.js | `@grpc/grpc-js` |
| C# | `Grpc.Core` (.NET) |
| Ruby | `grpc` (Ruby) |
| PHP | `grpc/grpc` |
| Dart | `grpc` |
| Swift | `grpc-swift` |
| Kotlin | `grpc-kotlin` |

## Topics referenced

### Protocol Buffers <a class="askgpt-btn" data-askgpt="Protocol Buffers" title="Ask ChatGPT about this section">💬</a>

```proto
syntax = "proto3";

package user.v1;

service UserService {
    rpc GetUser(GetUserRequest) returns (User);
    rpc ListUsers(ListUsersRequest) returns (stream User);
    rpc CreateUser(CreateUserRequest) returns (User);
    rpc UpdateUser(UpdateUserRequest) returns (User);
    rpc DeleteUser(DeleteUserRequest) returns (google.protobuf.Empty);
}

message User {
    string id = 1;
    string name = 2;
    string email = 3;
    int64 created_at = 4;
}

message GetUserRequest {
    string id = 1;
}

message ListUsersRequest {
    int32 page_size = 1;
    string page_token = 2;
}

message CreateUserRequest {
    string name = 1;
    string email = 2;
}

message UpdateUserRequest {
    string id = 1;
    string name = 2;
    string email = 3;
}

message DeleteUserRequest {
    string id = 1;
}
```

### Streaming types <a class="askgpt-btn" data-askgpt="Streaming types" title="Ask ChatGPT about this section">💬</a>

| Type | Client | Server |
|------|--------|--------|
| **Unary** | Single request | Single response |
| **Server streaming** | Single request | Stream of responses |
| **Client streaming** | Stream of requests | Single response |
| **Bidirectional** | Stream of requests | Stream of responses |

### Status codes <a class="askgpt-btn" data-askgpt="Status codes" title="Ask ChatGPT about this section">💬</a>

| Code | Number | Description |
|------|--------|-------------|
| `OK` | 0 | Success |
| `CANCELLED` | 1 | Operation cancelled |
| `UNKNOWN` | 2 | Unknown error |
| `INVALID_ARGUMENT` | 3 | Client-side validation error |
| `DEADLINE_EXCEEDED` | 4 | Timeout |
| `NOT_FOUND` | 5 | Resource not found |
| `ALREADY_EXISTS` | 6 | Conflict |
| `PERMISSION_DENIED` | 7 | Authorization |
| `RESOURCE_EXHAUSTED` | 8 | Rate limit / quota |
| `FAILED_PRECONDITION` | 9 | Server precondition failed |
| `ABORTED` | 10 | Transaction aborted |
| `OUT_OF_RANGE` | 11 | Out of bounds |
| `UNIMPLEMENTED` | 12 | Not implemented |
| `INTERNAL` | 13 | Server internal error |
| `UNAVAILABLE` | 14 | Server unavailable |
| `DATA_LOSS` | 15 | Data loss |
| `UNAUTHENTICATED` | 16 | Auth required |

### Interceptors <a class="askgpt-btn" data-askgpt="Interceptors" title="Ask ChatGPT about this section">💬</a>

```java
public class AuthInterceptor implements ClientInterceptor {
    @Override
    public <ReqT, RespT> ClientCall<ReqT, RespT> interceptCall(
        MethodDescriptor<ReqT, RespT> method,
        CallOptions callOptions,
        Channel next) {
        return new ForwardingClientCall.SimpleForwardingClientCall<ReqT, RespT>(
            next.newCall(method, callOptions.withCallCredentials(/* ... */))) {
            @Override
            public void start(Listener<RespT> responseListener, Metadata headers) {
                headers.put(Metadata.Key.of("authorization", Metadata.ASCII_STRING_MARSHALLER),
                            "Bearer " + token);
                super.start(responseListener, headers);
            }
        };
    }
}
```

### Deadlines and cancellation <a class="askgpt-btn" data-askgpt="Deadlines and cancellation" title="Ask ChatGPT about this section">💬</a>

```java
// Client sets deadline
UserServiceGrpc.UserServiceBlockingStub stub = ...;
User user = stub
    .withDeadlineAfter(1000, TimeUnit.MILLISECONDS)  // 1 second
    .getUser(request);
```

### Server-side streaming example <a class="askgpt-btn" data-askgpt="Server-side streaming example" title="Ask ChatGPT about this section">💬</a>

```java
@Override
public void listUsers(ListUsersRequest request,
                     StreamObserver<User> responseObserver) {
    while (hasMoreUsers()) {
        User user = fetchNext();
        responseObserver.onNext(user);
    }
    responseObserver.onCompleted();
}
```

### Client-side streaming example <a class="askgpt-btn" data-askgpt="Client-side streaming example" title="Ask ChatGPT about this section">💬</a>

```java
@Override
public StreamObserver<CreateUserRequest> createUsers(
    StreamObserver<CreateUserResponse> responseObserver) {
    return new StreamObserver<CreateUserRequest>() {
        @Override
        public void onNext(CreateUserRequest request) {
            userRepository.save(request);
        }
        @Override
        public void onCompleted() {
            responseObserver.onNext(CreateUserResponse.newBuilder().build());
            responseObserver.onCompleted();
        }
        // ...
    };
}
```

## Tools

- **`protoc`:** Protocol Buffers compiler.
- **`buf`:** Modern Protobuf tooling (buf.build).
- **grpc-gateway:** Generate REST gateway for gRPC services.
- **grpcurl:** Command-line gRPC client.
- **grpc-web:** Browser-friendly gRPC.
- **Evans:** gRPC client.

## Books

- *gRPC: Up and Running* — Kasun Indrasiri, Danesh Kuruppu (O'Reilly).
- *Production API Design Patterns* — Justin Lacelle (Manning).

## Conferences

- **gRPC Conf:** annual (archived).