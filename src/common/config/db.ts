import { DataSource } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Book } from "../../books/entities/book.entity";
import { cfg } from "./cfg";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: cfg.DB.HOST,
  port: cfg.DB.PORT,
  username: cfg.DB.USERNAME,
  password: cfg.DB.PASSWORD,
  database: cfg.DB.DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Book],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
