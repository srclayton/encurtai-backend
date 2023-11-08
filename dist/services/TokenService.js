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
Object.defineProperty(exports, "__esModule", { value: true });
const JWT_ISSUER = process.env.JWT_ISSUER;
const JWT_AUDIENCE = process.env.JWT_AUDIENCE;
class TokenService {
    static generateToken(server, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = {
                sub: user.getId(),
                admin: user.getAdmin(),
            };
            try {
                const token = yield server.jwt.sign(tokenData, {
                    expiresIn: "1h",
                });
                return token;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    static generateRefreshToken(server, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = {
                iss: JWT_ISSUER,
                aud: JWT_AUDIENCE,
                sub: user.getId(),
            };
            try {
                const token = server.jwt.sign(tokenData, {
                    // eslint-disable-next-line
                    //@ts-ignore
                    key: server.jwtPrivateRefreshKey,
                    // eslint-disable-next-line
                    //@ts-ignore
                    publicKey: server.jwtPublicRefreshKey,
                    algorithm: "RS256",
                    expiresIn: "1d",
                });
                return token;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
}
exports.default = TokenService;
//# sourceMappingURL=TokenService.js.map