import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from './entities/user.entity';

import { cfg } from '../common/config/cfg';
import { AppDataSource } from '../common/config/db';

import { ROLES } from './consts/role.const';

const userRepository = AppDataSource.getRepository(User);

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    if (!(username as string).trim() || !(password as string).trim())
      throw new Error('Username and password is required!');

    const user = userRepository.create();
    user.username = username;
    user.password = password;
    user.email = email;
    await userRepository.save(user);

    const createdUser = await userRepository.findOneBy({ id: user.id });

    res.status(201).json(createdUser);
  } catch (error: any) {
    res.status(400).json({ error: error?.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await userRepository.findOne({
      where: { username },
      select: {
        id: true,
        roles: true,
        username: true,
        password: true,
      },
    });

    if (!user || !(await user.comparePassword(password))) {
      // лучше выдать неизвестную ошибку
      // чем показывать потенциальному злоумышленнику что он ввел пароль неправильно :)
      return res.status(401).json({ error: 'Unknown error' });
    }

    const token = jwt.sign({ userId: user.id, roles: user.roles }, cfg.JWT.SECRET as string, {
      expiresIn: cfg.JWT.EXPIRES_IN,
    });
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({
      where: { id: (req.user as User).id },
    });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await userRepository.findOneBy({ id: +id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!Object.values(ROLES).includes(role)) {
      throw new Error('Role is not acceptable!');
    }

    if (role === ROLES.USER) {
      user.setRoles(role);
    } else {
      user.addRole(role);
    }

    const updatedUser = await userRepository.save(user);

    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
