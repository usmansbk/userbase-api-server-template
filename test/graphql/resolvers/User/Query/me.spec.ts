import type { User } from "@prisma/client";
import { createMockApolloServer } from "test/graphql";
import createMockContext from "test/graphql/context";
import type { AccountStatus } from "types/graphql";

const query = `query {
	me {
		firstName
		lastName
	}
}`;

describe("Query.me", () => {
  it("should return current logged-in user", async () => {
    const server = createMockApolloServer();

    const user = {
      email: "test@email.com",
      firstName: "Test",
      password: "test",
    } as unknown as User;

    const contextValue = await createMockContext({
      id: user.id,
      language: user.language,
      roles: [],
      permissions: [],
      status: "Active" as AccountStatus,
    });

    contextValue.mockPrismaClient.user.findUnique.mockResolvedValue(user);

    const response = await server.executeOperation(
      {
        query,
      },
      {
        contextValue,
      },
    );

    expect(response).toMatchSnapshot();
  });

  it("should not allow unauthenticated access", async () => {
    const server = createMockApolloServer();
    const contextValue = await createMockContext();

    const response = await server.executeOperation(
      {
        query,
      },
      { contextValue },
    );

    expect(response).toMatchSnapshot();
  });
});
