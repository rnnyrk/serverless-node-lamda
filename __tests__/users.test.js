const { mockServer, makeExecutableSchema } = require('graphql-tools');
const { describe, expect, it } = require('jest');
const typeDefs = require('./api/schema');

const schema = makeExecutableSchema({ typeDefs });

const userId = 'c9dbfcb7-6887-4896-90e3-b18c187a8a65';

const mocks = {
  User: () => ({
    id: userId,
  }),
};

const server = mockServer(schema, mocks);

const query = `
query {
  listUsers {
    id
  }
  getUser(userId: $userId) {
    name
  }
}
`;
const variables = {
  userId,
};

server.query(query, variables).then((response) => {
  describe('listUsers', () => {
    it('query should return data', () => {
      expect(response.data.listUsers).to.have.lengthOf(4);
    });
    it('tag name should match the mocked data', () => {
      expect(response.data.listUsers[0].id).to.equal(userId);
    });
  });
});
