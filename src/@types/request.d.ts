declare global {
  namespace Express {
    export interface Request {
      user: {
        name: string;
        email: string;
        plan: 'free' | 'pro';
      };
    }
  }
}

export {};
