import type { User } from "@prisma/client";
import { createMockApolloServer } from "test/graphql";
import createMockContext from "test/graphql/context";

const query = `mutation JoinWaitlist($email: EmailAddress!) {
			joinWaitlist(email: $email) {
				success
				message
			}
		}`;

describe("Mutation.joinWaitlist", () => {
  it("should add user to the waitlist", async () => {
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

  it("should be idempotent", async () => {
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

    expect(contextValue.mockPrismaClient.user.create).not.toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });
});
