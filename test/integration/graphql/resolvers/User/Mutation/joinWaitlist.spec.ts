import { createMockApolloServer } from "test/integration/graphql";
import createMockContext from "test/integration/graphql/context";

const query = `mutation {
			joinWaitlist(email: "usmansbk@gmail.com") {
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
      },
      { contextValue },
    );

    expect(response).toMatchSnapshot();
  });
});
