import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Employe } from "../..";
import { DiffIn_HH_MM } from "../../../../utils";

@Entity({ name: "pointage" })
export default class Pointage extends BaseEntity {
  static readonly TABLE_NAME = "pointage";

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => Employe, (employe) => employe.pointages, {
    eager: true,
  })
  employe: Employe;

  @Column({ nullable: true })
  check_in?: Date;

  @Column({ nullable: true })
  check_out?: Date;

  @Column({ nullable: true })
  comment?: string;

  @Column({ nullable: true })
  duration?: string;

  @CreateDateColumn()
  readonly creationDate: Date;

  @UpdateDateColumn()
  readonly lastUpdate: Date;

  constructor(employe?: Employe) {
    super();

    if (!employe) return this;

    this.employe = employe;
  }

  checkIn(comment?: string): Promise<this> {
    this.check_in = new Date();
    if (comment) this.comment = comment;

    return this.save();
  }

  checkOut(comment?: string): Promise<this> {
    this.check_out = new Date();
    if (comment) this.comment = comment;

    if (this.check_in) {
      this.duration = DiffIn_HH_MM(this.check_in, this.check_out);
    }

    return this.save();
  }
}
