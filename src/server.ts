import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import 'reflect-metadata';

import booksController from './books/books.controller';
import { cfg } from './common/config/cfg';
import './common/config/db';
import jwtStrategy from './common/stategies/jwt.strategy';
import usersController from './users/users.controller';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

app.use(usersController);
app.use(booksController);

passport.use('jwt', jwtStrategy);

const PORT = cfg.APP.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}!`);
});
