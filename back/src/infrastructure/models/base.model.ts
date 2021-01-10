import { CreateDateColumn, UpdateDateColumn} from "typeorm";

export abstract class BaseModel {
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
