import { createServer } from 'miragejs';

const user = {
  id: 1,
  name: 'bob',
};

export function makeServer() {
  console.log('MAKE SERVER');
  let server = createServer({
    routes() {
      this.namespace = 'api';

      this.get('/users/1', () => {
        return user;
      });

      this.put('/users/1', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        Object.assign(user, attrs);
        return user;
      });
    },
  });

  return server;
}
