class CustomError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
  }
}

export { CustomError };
