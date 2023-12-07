import { type User } from "@prisma/client";
import { createMockApolloServer } from "test/graphql";
import createMockContext from "test/graphql/context";

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
    const user = {
      email: "test@email.com",
      firstName: "Testing",
      password: "test",
    } as unknown as User;

    contextValue.mockPrismaClient.user.findFirst.mockResolvedValue(user);

    const response = await server.executeOperation(
      {
        query,
        variables: {
          email: user.email,
        },
      },
      { contextValue },
    );

    expect(contextValue.mockPrismaClient.user.delete).toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });

  it("should be idempotent", async () => {
    const server = createMockApolloServer();
    const contextValue = await createMockContext();

    const response = await server.executeOperation(
      {
        query,
        variables: {
          email: "test@email.com",
        },
      },
      { contextValue },
    );

    expect(response).toMatchSnapshot();
  });
});
