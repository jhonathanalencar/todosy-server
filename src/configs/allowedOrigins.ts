import config from 'config';

const allowedOrigins = [config.get<string>('appUrl')];

export { allowedOrigins };
