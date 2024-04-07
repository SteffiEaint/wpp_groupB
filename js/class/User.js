import { BACKEND_URL } from "../config.js";

class User {
  #id = undefined;
  #username = undefined;
  #email = undefined;
  #password = undefined;
  #newPassword = undefined;

  constructor() {
    const userFromStorage = sessionStorage.getItem("user");
    if (userFromStorage) {
      const userObject = JSON.parse(userFromStorage);
      this.#id = userObject.id;
      this.#username = userObject.username;
      this.#email = userObject.email;
    }
  }

  get id() {
    return this.#id;
  }

  get username() {
    return this.#username;
  }

  get email() {
    return this.#email;
  }

  get password() {
    return this.#password;
  }

  get newPassword() {
    return this.#newPassword;
  }

  async login(username, password) {
    const data = JSON.stringify({ username: username, password: password });
    const response = await fetch(BACKEND_URL + "/user/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    if (response.ok === true) {
      const json = await response.json();
      this.#id = json.id;
      this.#username = json.username;
      sessionStorage.setItem("user", JSON.stringify(json));
      return this;
    } else {
      throw response.statusText;
    }
  }

  async signup(username, email, password) {
    const data = JSON.stringify({
      username: username,
      email: email,
      password: password,
    });
    const response = await fetch(BACKEND_URL + "/user/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    if (response.ok === true) {
      const json = await response.json();
      return json.id;
    } else {
      throw response.statusText;
    }
  }

  async checkEmailExists(email) {
    const data = JSON.stringify({ email: email });
    try {
      const response = await fetch(BACKEND_URL + "/user/check-email", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: data,
      });

      if (response.ok === true) {
        const json = await response.json();
        return json.exists;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while checking email existence:", error);
      throw error;
    }
  }

  async reset(newPassword) {
    const data = JSON.stringify({ newPassword: newPassword });
    try {
      const response = await fetch(BACKEND_URL + "/user/reset-password", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: data,
      });

      if (response.ok === true) {
        const json = await response.json();
        return json.newPassword;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during password reset:", error);
      throw error;
    }
  }
}
export { User };