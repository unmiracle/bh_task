import * as dotenv from 'dotenv';

dotenv.config();

export const cfg = {
  APP: {
    PORT: process.env.PORT,
  },
  DB: {
    HOST: process.env.DB_HOST,
    PORT: Number(process.env.DB_PORT),
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_NAME,
  },
  JWT: {
    EXPIRES_IN: '7d',
    SECRET: process.env.JWT_SECRET,
  },
};
