import express from 'express';
import graphqlHTTP from 'express-graphql';
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

const PORT = 3000;

const app = express();

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});

// query {hello}

app.use('/graphql', graphqlHTTP({schema, graphiql: true}));

app.listen(PORT);

console.log(`GraphQL server running on http://localhost:${PORT}/graphql`);
