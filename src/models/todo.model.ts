export interface INewTodoRequest {
  title: string;
  done: string;
  userId: string;
}

export interface NewTodoResponse {
  todo: string;
  done: string;
}
