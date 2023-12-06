import { createMockApolloServer } from "test/integration/graphql";
import createMockContext from "test/integration/graphql/context";

const query = `mutation LeaveWaitlist($email: EmailAddress!) {
			leaveWaitlist(email: $email) {
        success
				message
			}
		}`;

describe("Mutation.leaveWaitlist", () => {
  it("should remove user from the waitlist", async () => {
    const server = createMockApolloServer();
    const contextValue = await createMockContext();

    const userWaiting = await contextValue.prismaClient.user.create({
      data: {
        email: "test@email.com",
        firstName: "Testing",
        password: "test",
      },
    });

    const response = await server.executeOperation(
      {
        query,
        variables: {
          email: userWaiting.email,
        },
      },
      { contextValue },
    );

    const removed = await contextValue.prismaClient.user.findUnique({
      where: {
        id: userWaiting.id,
      },
    });

    expect(removed).toBeNull();
    expect(response).toMatchSnapshot();
  });

  it("should be idempotent", async () => {
    const server = createMockApolloServer();
    const contextValue = await createMockContext();

    const response = await server.executeOperation(
      {
        query,
        variables: {
          email: "test2@email.com",
        },
      },
      { contextValue },
    );

    expect(response).toMatchSnapshot();
  });
});
