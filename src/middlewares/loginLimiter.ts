import { rateLimit } from 'express-rate-limit';

import { logEvents } from '@/utils';

const loginLimiter = rateLimit({
  windowMs: 1000 * 60,
  max: 6,
  message: {
    message:
      'Too many login attempts from this IP, please try again after a 60 second pause',
  },
  handler: (request, response, next, options) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t${request.method}\t${request.url}\t${request.headers.origin}`,
      'errLog.log'
    );

    return response.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export { loginLimiter };
