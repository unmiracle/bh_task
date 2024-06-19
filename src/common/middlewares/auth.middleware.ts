import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'jwt',
    (err: any, user: Express.User, info: any) => {
      if (err) return next(err);

      if (!user) {
        return res
          .status(401)
          .json({ error: 'User is not authenticated' });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};
