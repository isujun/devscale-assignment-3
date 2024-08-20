export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface Ilogin {
  email: string;
  password: string;
}

export interface IUserResponse {
  //   id: string;
  //   username: string;
  name: string;
  email: string;
  password: string;
}

export interface ICreateUserRequest {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface ILoginUserRequest {
  email: string;
  password: string;
}

export interface ILoginUserResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IUpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

export type INewUser = Omit<IUser, "id" | "password" | "email">;
