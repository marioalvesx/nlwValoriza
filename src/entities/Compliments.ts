import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm"

import { v4 as uuid } from "uuid";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity("compliments")
class Compliment {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_sender:string;

  @Column()
  user_receiver: Date;

  @JoinColumn({name: "user_receiver"})
  @ManyToOne(() => User)
  userReceiver: User;

  @Column()
  tag_id: string;

  @JoinColumn({name: "tag_id"})
  @ManyToOne(() => Tag)
  tag: Tag

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    !this.id ? this.id = uuid() : this.id;
  }

}

export { Compliment }