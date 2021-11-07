import { User } from "../models/user"
import { makeAutoObservable } from "mobx";
import axios from "axios";
import LoginService from "../services/LoginService";
import RegistrationService from "../services/RegistrationService";
import LogoutService from "../services/LogoutService";
import { AuthResponse } from "../models/response/authResponse";
import { API_URL } from "../http/axios";

export default class Store {
  user = {} as User;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: User) {
    this.user = user;
  }

  async login(username: string, password: string) {
    try {
      const response = await LoginService.login(username, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    }
    catch (e) {
      console.log(e)
    }
  }

  async registration(email: string, username: string, password: string) {
    try {
      const response = await RegistrationService.registration(email, username, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    }
    catch (e) {
      console.log(e)
    }
  }

  async logout() {
    try {
      await LogoutService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as User);
    }
    catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
      console.log(response)
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    }
    catch (e) {
      console.log(e);
    }
  }
}