
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const faker = require('faker');

const typeDefs = gql`
  type listItem {
    id: Int,
    label: String
  }
  type Mutation {
    addList(label: String): listItem
  }
  type Query {
    list: [listItem]
  }
`;


// 生成一些标签
var id = 0
var list = []
for (let i = 0; i < 3; i++) {
  addList(faker.random.word())
}

function addList (label) {
  let labValue = label || faker.random.word();
  let t = {
    id: id++,
    label: labValue,
  }
  list.push(t)
  return t
}



const resolvers = {
  Query: {
    list: () => {
      return list
    },
  },
  Mutation: {
    addList (root, { label }, context) {
      console.log(`adding tag '${label}'`)
      return addList(label)
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
