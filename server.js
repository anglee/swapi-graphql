import _ from 'lodash';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import {
  graphql,
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
var http = require('http');

const PORT = 3000;

const app = express();

const data = {
  users: [
    {
      id: '1',
      name: 'A1'
    },
    {
      id: '2',
      name: 'B2'
    }
  ],
  teams: [
    {
      name: 'T1',
      members: ['1']
    },
    {
      name: 'T2',
      members: ['1', '2']
    }
  ]
};

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    members: {
      type: new GraphQLList(UserType),
      resolve(team) {
        return team.members.map((id) => _.find(data.users, {id}));
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      },
      user: {
        type: UserType,
        args: {
          id: { type: GraphQLString }
        },
        resolve(parent, args) {
          console.log('parent = ', parent);
          console.log('args = ', args);
          return _.find(data.users, {id: args.id});
        }
      },
      allUsers: {
        type: new GraphQLList(UserType),
        resolve() {
          return data.users;
        }
      },
      allTeams: {
        type: new GraphQLList(TeamType),
        resolve() {
          return data.teams;
        }
      },
      swapiPeople: {
        type: GraphQLString,
        args: {
          id: {type: GraphQLString}
        },
        resolve(parent, args) {
          const {id} = args;
          return new Promise((resolve, reject) => {
            const options = {
              host: 'swapi.co',
              path: `/api/people/${id}/`
            };
            const callback = (response) => {
              var str = '';
              response.on('data', function (chunk) {
                str += chunk;
              });
              response.on('end', function () {
                console.log(JSON.parse(str));
                resolve(str);
              });
            };
            http.request(options, callback).end();
          });
        }
      }
    }
  })
});

app.use('/graphql', graphqlHTTP({schema, graphiql: true}));

app.listen(PORT);

console.log(`GraphQL server running on http://localhost:${PORT}/graphql`);
