import {SuperPowerEntity} from "../super-power.entity";
import Dto from "../../Dto";

type IGetFullSuperPowerDto = SuperPowerEntity;

@Dto()
export class GetFullSuperPowerDto implements IGetFullSuperPowerDto {
  id: string = '';
  name: string = '';
  description: string = '';
}





