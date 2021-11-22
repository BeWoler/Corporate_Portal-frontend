import { User } from "../models/user";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import LoginService from "../services/LoginService";
import RegistrationService from "../services/RegistrationService";
import LogoutService from "../services/LogoutService";
import { AuthResponse } from "../models/response/authResponse";
import { API_URL } from "../http/axios";
import DeleteService from "../services/DeleteService";
import EditProfileService from "../services/EditProfileService";
import ChangePasswordService from "../services/ChangePasswordService";

export default class Store {
  user = {} as User;
  isAuth = false;
  isLoading = false;
  error: string;
  successMessage: string;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: User) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setError(err: string) {
    this.error = err;
  }

  setSuccessMessage(msg: string) {
    this.successMessage = msg;
  }

  async login(username: string, password: string) {
    try {
      await LoginService.login(username, password)
        .then((response) => {
          localStorage.setItem("token", response.data.accessToken);
          this.setAuth(true);
          this.setUser(response.data.user);
        })
        .catch((err) => {
          this.setError(err.response.data.message);
          setTimeout(() => this.setError(null), 2500);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async delete() {
    try {
      await DeleteService.delete();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as User);
    } catch (e) {
      console.log(e);
    }
  }

  async editProfile(username: string, { ...args }: object) {
    try {
      await EditProfileService.edit(username, { ...args }); 
      this.setSuccessMessage("Successfully changed");
      setTimeout(() => this.setSuccessMessage(null), 3500);
    } catch (e) {
      console.log(e);
    }
  }

  async changePass(username: string, newPassword: string, oldPassword: string) {
    try {
      await ChangePasswordService.change(username, newPassword, oldPassword).catch((err) => {
        this.setError(err.response.data.message);
        setTimeout(() => this.setError(null), 3500);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async registration(email: string, username: string, password: string) {
    try {
      await RegistrationService.registration(
        email,
        username,
        password
      )
        .then((response) => {
          localStorage.setItem("token", response.data.accessToken);
          this.setAuth(true);
          this.setUser(response.data.user);
        })
        .catch((err) => {
          this.setError(err.response.data.message);
          setTimeout(() => this.setError(null), 2500);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      await LogoutService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as User);
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async getUsers() {
    try {
      await axios.get<AuthResponse>(`${API_URL}/users`, {
        withCredentials: true,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
