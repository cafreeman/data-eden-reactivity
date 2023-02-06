import { belongsTo, createServer, hasMany, Model, RestSerializer } from 'miragejs';

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
        include: ['pets', 'car'],
      }),
    },

    models: {
      person: Model.extend({
        pets: hasMany(),
        car: belongsTo(),
      }),
      car: Model.extend({
        person: belongsTo(),
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

      server.create('car', {
        id: '1',
        __type: 'car',
        make: 'Ford',
        model: 'Mustang',
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

        return person.update(attrs);
      });

      this.put('/pets/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const pet = schema.pets.find(id);

        return pet.update(attrs);
      });

      this.get('/cars/:id', (schema, request) => {
        const id = request.params.id;
        const car = schema.cars.find(id);
        return car;
      });

      this.put('/cars/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const car = schema.cars.find(id);

        return car.update(attrs);
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
