export class BaseException extends Error {
  constructor(
    public errorCode: string,
    public message: string,
    public stack?: string,
  ) {
    super(message);
  }
}
