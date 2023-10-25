export default class User {
  private id: string;
  private username: string;
  private password: string;
  private admin: boolean;

  constructor(id: string, login: string, password: string, admin: boolean) {
    this.id = id;
    this.username = login;
    this.password = password;
    this.admin = admin;
  }

  getId(): string {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  getAdmin(): boolean {
    return this.admin;
  }
}
