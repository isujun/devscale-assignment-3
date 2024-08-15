export interface IUserResponse {
  username: string;
  name: string;
  password: string;
}

export interface createUserRequest {
  username: string;
  name: string;
  password: string;
}

export interface loginUserRequest {
  // username: string;
  email: string;
  password: string;
}

export interface loginUserResponse {
  refreshToken: string;
  accessToken: string;
}

export interface updateUserRequest {
  name?: string;
  password?: string;
}
export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface INewUser {
  name: string;
  username: string;
}
