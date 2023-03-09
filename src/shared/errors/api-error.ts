export class ApiError extends Error {
  constructor(message: string, public serverSide: boolean, public statusCode?: number) {
    super(message);
  }
}
