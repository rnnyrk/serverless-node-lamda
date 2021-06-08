const handler = require('../api/users');

test('should fetch users', () => {
  const users = [
    {
      "id": "c9dbfcb7-6887-4896-90e3-b18c187a8a65",
      "name": "Jorn"
    },
    {
      "id": "6045e6d7-6a26-4b9f-80a7-0ac86f916e50",
      "name": "Ronny"
    },
    {
      "id": "9df26cf0-17e1-4e77-9bb1-b971981d988f",
      "name": "Stefan"
    }
  ]
  const resp = { data: users };
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});

test('correct greeting is generated', () => {
  expect(handler.listUsers()).toBe(

  )
});
