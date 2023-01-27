import { belongsTo, createServer, hasMany, Model, RestSerializer } from 'miragejs';

const petNames = ['hitch', 'dre', 'eazy', 'arya'];

let petIndex = 0;

export function makeServer() {
  const ApplicationSerializer = RestSerializer.extend({
    root: false,
    embed: true,
    keyForAttribute(attr) {
      if (attr === '__type') {
        return attr;
      }

      return attr;
    },
  });

  let server = createServer({
    serializers: {
      application: ApplicationSerializer,
      person: ApplicationSerializer.extend({
        include: ['pets'],
      }),
    },

    models: {
      person: Model.extend({
        pets: hasMany(),
      }),
      pet: Model.extend({
        person: belongsTo(),
      }),
    },

    seeds(server) {
      let person = server.create('person', {
        id: '1',
        __type: 'person',
        name: 'chris',
      });

      server.create('pet', {
        id: '1',
        __type: 'pet',
        name: 'hitch',
        person,
      });
      server.create('pet', {
        id: '2',
        __type: 'pet',
        name: 'dre',
        person,
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/users/:id', (schema, request) => {
        const id = request.params.id;
        const person = schema.people.find(id);
        return person;
      });

      this.put('/users/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const person = schema.people.find(id);

        const result = person.update(attrs);

        // petIndex = petIndex >= petNames.length - 1 ? 0 : petIndex + 1;
        // schema.pets.find(1).update({ name: petNames[petIndex] });

        return result;
      });

      this.put('/pets/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const pet = schema.pets.find(id);

        return pet.update(attrs);
      });
    },
  });

  return server;
}

// export function makeServer() {
//   const server = createServer({
//     models: {
//       reminder: Model,
//     },

//     seeds(server) {
//       server.create('reminder', { text: 'Walk the dog' });
//       server.create('reminder', { text: 'Take out the trash' });
//       server.create('reminder', { text: 'Work out' });
//     },

//     routes() {
//       this.get('/api/reminders', (schema) => {
//         return schema.reminders.all();
//       });

//       this.post('/api/reminders', (schema, request) => {
//         let attrs = JSON.parse(request.requestBody);

//         return schema.reminders.create(attrs);
//       });
//     },
//   });
// }
