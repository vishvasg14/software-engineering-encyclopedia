"""gRPC error handling examples (Python)."""
import grpc
import user_pb2
import user_pb2_grpc
from google.protobuf import empty_pb2


class UserServicer(user_pb2_grpc.UserServiceServicer):
    """Examples of error handling."""

    def GetUser(self, request, context):
        user_id = request.id

        # Validation: empty ID
        if not user_id:
            context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
            context.set_details("id is required")
            return user_pb2.User()

        # Not found
        if user_id == "missing":
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details(f"User {user_id} not found")
            return user_pb2.User()

        # Permission
        if user_id == "forbidden":
            context.set_code(grpc.StatusCode.PERMISSION_DENIED)
            context.set_details("Access denied")
            return user_pb2.User()

        # Rate limit
        if user_id == "rate-limited":
            context.set_code(grpc.StatusCode.RESOURCE_EXHAUSTED)
            context.set_details("Rate limit exceeded")
            return user_pb2.User()

        # OK
        return user_pb2.User(
            id=user_id, name=f"User {user_id}", email=f"{user_id}@example.com", active=True,
        )

    def DeleteUser(self, request, context):
        if not request.id:
            context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
            context.set_details("id is required")
            raise grpc.RpcError()

        # Simulate deletion
        return empty_pb2.Empty()


def main():
    channel = grpc.insecure_channel("localhost:50051")
    stub = user_pb2_grpc.UserServiceStub(channel)

    # OK
    response = stub.GetUser(user_pb2.GetUserRequest(id="42"))
    print(f"OK: {response.name}")

    # INVALID_ARGUMENT
    try:
        stub.GetUser(user_pb2.GetUserRequest(id=""))
    except grpc.RpcError as e:
        print(f"Error: {e.code()} {e.details()}")

    # NOT_FOUND
    try:
        stub.GetUser(user_pb2.GetUserRequest(id="missing"))
    except grpc.RpcError as e:
        print(f"Error: {e.code()} {e.details()}")


if __name__ == "__main__":
    main()