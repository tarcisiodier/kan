"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = exports.logger = void 0;
var js_1 = require("@axiomhq/js");
var pino_1 = require("pino");
var isDev = process.env.NODE_ENV !== "production";
var isCloud = process.env.NEXT_PUBLIC_KAN_ENV === "cloud";
var level = process.env.LOG_LEVEL || (isDev ? "debug" : "info");
var axiomToken = process.env.AXIOM_TOKEN;
var axiomDataset = process.env.AXIOM_DATASET;
var useAxiom = isCloud && !!axiomToken && !!axiomDataset;
function createAxiomStream(token, dataset) {
    var client = new js_1.Axiom({ token: token });
    return {
        write: function (msg) {
            try {
                client.ingest(dataset, [JSON.parse(msg)]);
            }
            catch (_a) {
                // ignore malformed log lines
            }
        },
    };
}
exports.logger = useAxiom
    ? (0, pino_1.default)({ level: level }, pino_1.default.multistream([
        { stream: process.stdout, level: level },
        { stream: createAxiomStream(axiomToken, axiomDataset), level: level },
    ]))
    : (0, pino_1.default)(__assign({ level: level }, (isDev && {
        transport: {
            target: "pino-pretty",
            options: { colorize: true, ignore: "pid,hostname", translateTime: "HH:MM:ss" },
        },
    })));
var createLogger = function (module) { return exports.logger.child({ module: module }); };
exports.createLogger = createLogger;
