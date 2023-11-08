"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, login, password, admin) {
        this.id = id;
        this.username = login;
        this.password = password;
        this.admin = admin;
    }
    getId() {
        return this.id;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getAdmin() {
        return this.admin;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map