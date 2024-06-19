import { DoneCallback } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../../users/entities/user.entity';
import { cfg } from '../config/cfg';
import { AppDataSource } from '../config/db';

const userRepository = AppDataSource.getRepository(User);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: cfg.JWT.SECRET as string,
};

const jwtStrategy = new Strategy(opts, async (payload: any, done: DoneCallback) => {
  try {
    const user = await userRepository.findOne({
      where: { id: payload.userId },
    });
    if (!user) throw new Error('User not found');

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export default jwtStrategy;
