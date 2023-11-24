import {SuperPowerEntity} from "../super-power.entity";
import Dto from "../../Dto";

type IUpdateSuperPowerDto = Partial<SuperPowerEntity> & {id: number}

@Dto()
export class UpdateSuperPowerDto implements IUpdateSuperPowerDto {
  id: number = 0;
  name?: string = '';
  description?: string = '';
}





