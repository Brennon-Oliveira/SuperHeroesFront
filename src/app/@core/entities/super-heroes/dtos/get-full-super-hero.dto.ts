import Dto from "../../Dto";
import {SuperHeroEntity} from "../super-hero.entity";

type IGetFullSuperHeroDto = SuperHeroEntity;

@Dto()
export class GetFullSuperHeroDto implements IGetFullSuperHeroDto {
    id: number = 0;
    name: string = '';
    birthDate: Date = new Date();
    Height: number = 0;
    Weight: number = 0;
}
