import {SuperPowerEntity} from "../super-power.entity";
import Dto from "../../Dto";

type ICreateSuperPowerDto = Omit<SuperPowerEntity, "id">;

@Dto()
export class CreateSuperPowerDto implements ICreateSuperPowerDto {
  name: string = '';
  description?: string = '';
}





