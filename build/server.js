"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
const graphql_middleware_1 = require("graphql-middleware");
const Logger_1 = require("./Logger");
const app = express_1.default();
const pubsub = new apollo_server_express_1.PubSub();
const schema = apollo_server_express_1.makeExecutableSchema({ typeDefs: typeDefs_1.default, resolvers: resolvers_1.default });
const schemaWithMiddleware = graphql_middleware_1.applyMiddleware(schema, Logger_1.log);
const apolloServer = new apollo_server_express_1.ApolloServer({
    schema: schemaWithMiddleware,
    context: ({ req, res }) => ({ req, res, pubsub }),
});
apolloServer.applyMiddleware({ app, cors: false });
const httpServer = http_1.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);
httpServer.listen({ port: 8000 }, () => {
    console.log('GraphQL server ready.' + apolloServer.graphqlPath);
    console.log('GraphQL subs server ready.' + apolloServer.subscriptionsPath);
});
