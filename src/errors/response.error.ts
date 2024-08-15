export class ResponseError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}


export class InternalServerError extends Error {
  
}