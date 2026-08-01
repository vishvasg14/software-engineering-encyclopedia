"""gRPC streaming examples (Python).

Demonstrates:
1. Unary: single request, single response
2. Server streaming: single request, streamed responses
3. Client streaming: streamed requests, single response
4. Bidirectional: streamed both ways
"""
import grpc
import user_pb2
import user_pb2_grpc
from concurrent import futures


def unary_example(stub):
    """Un RPC."""
    print("--- Unary ---")
    response = stub.GetUser(user_pb2.GetUserRequest(id="42"))
    print(f"  Got: {response.name}")


def server_streaming_example(stub):
    """Server streams responses."""
    print("--- Server streaming ---")
    request = user_pb2.ListUsersRequest(page_size=5)
    for user in stub.ListUsers(request):
        print(f"  Got: {user.name}")


def client_streaming_example(stub):
    """Client streams requests; server returns one response."""
    print("--- Client streaming ---")

    def request_gen():
        for name in ["alice", "bob", "carol"]:
            print(f"  Sending: {name}")
            yield user_pb2.CreateUserRequest(name=name, email=f"{name}@example.com")

    # Imagine: stub.StreamCreates(request_gen())


def bidirectional_example(stub):
    """Bidirectional: streams both ways."""
    print("--- Bidirectional ---")

    def chat_gen():
        for msg in ["hello", "world", "bye"]:
            yield user_pb2.CreateUserRequest(name=msg)

    # Iterate responses while sending
    # for response in stub.Chat(chat_gen()):
    #     print(f"  Got: {response.name}")


def main():
    channel = grpc.insecure_channel("localhost:50051")
    stub = user_pb2_grpc.UserServiceStub(channel)

    unary_example(stub)
    server_streaming_example(stub)
    client_streaming_example(stub)
    bidirectional_example(stub)


if __name__ == "__main__":
    main()