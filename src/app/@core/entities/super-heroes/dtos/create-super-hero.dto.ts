import Dto from "../../Dto";
import {SuperHeroEntity} from "../super-hero.entity";
import {SuperPowerEntity} from "../../super-powers/super-power.entity";
import {GetFullSuperPowerDto} from "../../super-powers/dtos/get-full-super-power.dto";

type ICreateSuperHeroDto = SuperHeroEntity;

@Dto()
export class CreateSuperHeroDto implements ICreateSuperHeroDto {
    id: number = 0;
    name: string = '';
    birthDate?: Date = new Date();
    height: number = 0;
    weight: number = 0;
    superPowers: Array<number> = [];
}
