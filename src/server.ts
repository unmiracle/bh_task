import "reflect-metadata";
import express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import passport from "passport";

import "./common/config/db";
import { cfg } from "./common/config/cfg";

import usersController from "./users/users.controller";

import jwtStrategy from "./common/stategies/jwt.strategy";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

app.use(usersController);

passport.use("jwt", jwtStrategy);

const PORT = cfg.APP.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}!`);
});
