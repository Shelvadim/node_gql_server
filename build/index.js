"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const app = express_1.default();
const server = http_1.createServer(app);
server.listen({ port: 8000 }, () => {
    console.log('Our server is running!123');
});
