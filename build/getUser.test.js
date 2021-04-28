"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
const graphql_tools_1 = require("graphql-tools");
const faker_1 = __importDefault(require("faker"));
const testGraphQLQuery_1 = require("./testGraphQLQuery");
const apollo_server_express_1 = require("apollo-server-express");
describe('Testing getting a user', () => {
    const GetUser = `
        query GetUser($id: ID!) {
            getUser(id: $id) {
                id
                username
                email
            }
        }
    `;
    it('gets the desired user', () => __awaiter(void 0, void 0, void 0, function* () {
        const schema = graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs_1.default, resolvers: resolvers_1.default });
        const userId = faker_1.default.random.alphaNumeric(20);
        const username = faker_1.default.internet.userName();
        const email = faker_1.default.internet.email();
        const mocks = {
            User: () => ({
                id: userId,
                username,
                email,
            }),
        };
        console.log('id', userId);
        console.log('username', username);
        console.log('email', email);
        apollo_server_express_1.addMockFunctionsToSchema({ schema, mocks });
        const queryResponse = yield testGraphQLQuery_1.testGraphQLQuery({
            schema,
            source: GetUser,
            variableValues: { id: faker_1.default.random.alphaNumeric(20) },
        });
        const result = queryResponse.data ? queryResponse.data.getUser : null;
        console.log('result', result);
        expect(result).toEqual({
            id: userId,
            username,
            email,
        });
    }));
});
//# sourceMappingURL=getUser.test.js.map