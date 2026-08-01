"""gRPC server example (Python).
Run: python server.py
"""
from concurrent import futures
import grpc
import user_pb2
import user_pb2_grpc


class UserServicer(user_pb2_grpc.UserServiceServicer):
    """Implements the UserService defined in user.proto."""

    def GetUser(self, request, context):
        # In real code, fetch from database
        return user_pb2.User(
            id=request.id,
            name=f"User {request.id}",
            email=f"user{request.id}@example.com",
            active=True,
        )

    def ListUsers(self, request, context):
        # Server streaming: yield each user
        for i in range(10):
            yield user_pb2.User(
                id=str(i),
                name=f"User {i}",
                email=f"user{i}@example.com",
                active=True,
            )

    def CreateUser(self, request, context):
        return user_pb2.User(
            id="new-id",
            name=request.name,
            email=request.email,
            active=True,
        )

    def UpdateUser(self, request, context):
        return user_pb2.User(
            id=request.id,
            name=request.name,
            email=request.email,
            active=request.active,
        )

    def DeleteUser(self, request, context):
        # No-op for demo
        return google.protobuf.Empty()


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    user_pb2_grpc.add_UserServiceServicer_to_server(UserServicer(), server)
    server.add_insecure_port("[::]:50051")
    server.start()
    print("gRPC server on :50051")
    server.wait_for_termination()


if __name__ == "__main__":
    serve()