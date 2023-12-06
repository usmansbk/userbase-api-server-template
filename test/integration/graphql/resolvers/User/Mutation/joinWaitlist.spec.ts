import { createMockApolloServer } from "test/integration/graphql";
import createMockContext from "test/integration/graphql/context";

describe("Mutation.joinWaitlist", () => {
  it("should add user to the waitlist", async () => {
    const server = createMockApolloServer();
    const contextValue = await createMockContext();
    const query = `mutation {
			joinWaitlist(email: "usmansbk@gmail.com") {
				message
			}
		}`;

    const response = await server.executeOperation(
      {
        query,
      },
      { contextValue },
    );

    expect(response).toMatchSnapshot();
  });
});
