import { Column, Entity } from "typeorm";
import { CoreEntity } from "../../common/abstracts/core-entity.abstract";

@Entity("books")
export class Book extends CoreEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publicationDate: Date;

  @Column({ type: "jsonb" })
  genres: string[];
}
