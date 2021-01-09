import { CreateDateColumn, UpdateDateColumn} from "typeorm";

export class BaseModel {
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
