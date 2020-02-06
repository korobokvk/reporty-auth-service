"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const requestListener = (req, res) => {
    let reqUrl = `http://${req.headers.host}${req.url}`;
    let parseUrl = url_1.default.parse(reqUrl, true);
    console.log(reqUrl, parseUrl);
    res.end(reqUrl, parseUrl, 'worked auth');
};
let server = http_1.default.createServer(requestListener);
const PORT = 3000;
server.listen(PORT);
//# sourceMappingURL=index.js.map