import { createMockApolloServer } from "test/integration/graphql";
import createMockContext from "test/integration/graphql/context";

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
});
