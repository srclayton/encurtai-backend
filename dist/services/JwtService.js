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
const jwt_1 = __importDefault(require("@fastify/jwt"));
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
class JwtService {
    static RegisterKeys(server) {
        return __awaiter(this, void 0, void 0, function* () {
            const PATH_JWT_PRIVATE_SIGN_KEY = process.env.JWT_PRIVATE_SIGN_KEY_FILE;
            const PATH_JWT_PUBLIC_SIGN_KEY = process.env.JWT_PUBLIC_SIGN_KEY_FILE;
            const PATH_JWT_PRIVATE_REFRESH_KEY = process.env.JWT_PRIVATE_REFRESH_KEY_FILE;
            const PATH_JWT_PUBLIC_REFRESH_KEY = process.env.JWT_PUBLIC_REFRESH_KEY_FILE;
            if (!PATH_JWT_PRIVATE_SIGN_KEY ||
                !PATH_JWT_PUBLIC_SIGN_KEY ||
                !PATH_JWT_PRIVATE_REFRESH_KEY ||
                !PATH_JWT_PUBLIC_REFRESH_KEY) {
                throw new Error("JWT key file path not found");
            }
            try {
                const jwtPrivateSignKey = (0, node_fs_1.readFileSync)(node_path_1.default.resolve(__dirname, PATH_JWT_PRIVATE_SIGN_KEY), "utf8");
                const jwtPublicSignKey = (0, node_fs_1.readFileSync)(node_path_1.default.resolve(__dirname, PATH_JWT_PUBLIC_SIGN_KEY), "utf8");
                const jwtPrivateRefreshKey = (0, node_fs_1.readFileSync)(node_path_1.default.resolve(__dirname, PATH_JWT_PRIVATE_REFRESH_KEY), "utf8");
                const jwtPublicRefreshKey = (0, node_fs_1.readFileSync)(node_path_1.default.resolve(__dirname, PATH_JWT_PUBLIC_REFRESH_KEY), "utf8");
                server.decorate("jwtPrivateRefreshKey", jwtPrivateRefreshKey);
                server.decorate("jwtPublicRefreshKey", jwtPublicRefreshKey);
                server.register(jwt_1.default, {
                    secret: {
                        private: jwtPrivateSignKey,
                        public: jwtPublicSignKey,
                    },
                    sign: { algorithm: "RS256" },
                });
            }
            catch (err) {
                server.log.error(err);
                process.exit(1);
            }
        });
    }
}
exports.default = JwtService;
//# sourceMappingURL=JwtService.js.map