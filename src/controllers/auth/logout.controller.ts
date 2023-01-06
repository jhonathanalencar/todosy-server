import { Request, Response } from 'express';

class LogoutController {
  async handle(request: Request, response: Response) {
    const cookies = request.cookies;

    if (cookies?.jwt === undefined) {
      return response.status(204).send();
    }

    response.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return response.status(200).json({ message: 'Cookie cleared' });
  }
}

export { LogoutController };
