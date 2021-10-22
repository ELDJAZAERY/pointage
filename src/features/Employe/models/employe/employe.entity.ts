import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { CreateEmployeDTO } from "../..";
import Pointage from "../pointage/pointage.entity";

@Entity({ name: "employe" })
export default class Employe extends BaseEntity {
  static readonly TABLE_NAME = "employe";

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  firstName: string;

  @Column({ type: "varchar" })
  department: string;

  @CreateDateColumn({ name: "creation_date" })
  readonly creationDate: Date;

  @UpdateDateColumn({ name: "last_update" })
  readonly lastUpdate: Date;

  @OneToMany(
    (type) => Pointage,
    (pointage) => pointage.employe
  )
  pointages: Pointage[];

  constructor(createEmployeDTO?: CreateEmployeDTO) {
    super();

    if (!createEmployeDTO) return this;

    const { name, firstName, department } = createEmployeDTO;

    this.name = name;
    this.firstName = firstName;
    this.department = department;

    // id, dateCreated et dateUpdated seront automatiquement genere
  }
}
