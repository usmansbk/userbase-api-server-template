const query = `
	mutation SampleQuery {
		doSomething {
			id
		}
	}
`;

describe("Mutation", () => {
  describe("doSomething", () => {
    expect(query).toBeDefined();
  });
});
