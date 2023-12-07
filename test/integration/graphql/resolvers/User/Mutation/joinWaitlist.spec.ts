import { faker } from "@faker-js/faker";
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
          email: faker.internet.email(),
        },
      },
      { contextValue },
    );

    expect(response).toMatchSnapshot();
  });

  it("should be idempotent", async () => {
    const server = createMockApolloServer();
    const contextValue = await createMockContext();

    const userWaiting = await contextValue.prismaClient.user.create({
      data: {
        email: faker.internet.email(),
        firstName: "Test",
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

    expect(response).toMatchSnapshot();
  });
});
