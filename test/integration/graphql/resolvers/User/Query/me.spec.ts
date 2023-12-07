import { faker } from "@faker-js/faker";
import { createMockApolloServer } from "test/integration/graphql";
import createMockContext from "test/integration/graphql/context";
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
    const contextValue = await createMockContext();

    const user = await contextValue.prismaClient.user.create({
      data: {
        email: faker.internet.email(),
        firstName: "Test",
        password: "test",
      },
    });

    const response = await server.executeOperation(
      {
        query,
      },
      {
        contextValue: {
          ...contextValue,
          currentUser: {
            id: user.id,
            language: user.language,
            roles: [],
            permissions: [],
            status: "Active" as AccountStatus,
          },
        },
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
