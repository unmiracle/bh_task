import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { AppDataSource } from "../common/config/db";
import { User } from "./entities/user.entity";
import { cfg } from "../common/config/cfg";

const userRepository = AppDataSource.getRepository(User);

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    const user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    await userRepository.save(user);

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error?.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await userRepository.findOne({
      where: { username },
      select: { id: true, roles: true, username: true, password: true },
    });

    if (!user || !(await user.comparePassword(password))) {
      // лучше выдать неизвестную ошибку
      // чем показывать потенциальному злоумышленнику что он ввел пароль не правильно :)
      return res.status(401).json({ error: "Unknown error" });
    }

    const token = jwt.sign(
      { userId: user.id, roles: user.roles },
      cfg.JWT.SECRET as string,
      { expiresIn: cfg.JWT.EXPIRES_IN }
    );
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    console.log({ user: req.user });
    const user = await userRepository.findOne({
      where: { id: (req.user as User).id },
    });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
