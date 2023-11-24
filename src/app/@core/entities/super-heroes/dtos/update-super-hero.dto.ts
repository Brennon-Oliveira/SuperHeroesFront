import Dto from "../../Dto";
import {SuperHeroEntity} from "../super-hero.entity";
import {SuperPowerEntity} from "../../super-powers/super-power.entity";
import {GetFullSuperPowerDto} from "../../super-powers/dtos/get-full-super-power.dto";

type IUpdateSuperHeroDto = Partial<SuperHeroEntity> & {id: number};

@Dto()
export class UpdateSuperHeroDto implements IUpdateSuperHeroDto {
    id: number = 0;
    name?: string = '';
    birthDate?: Date = new Date();
    height?: number = 0;
    weight?: number = 0;
    superPowers?: Array<number> = [];
}
