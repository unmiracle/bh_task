import { NextFunction, Request, Response } from 'express';

import { User } from '../../users/entities/user.entity';

export const authorizeRole = (role: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!((req.user as User)?.roles & role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
