import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ApiResponse} from "../interfaces/api-response.interface";
import {PaginationResponse} from "../interfaces/paginationResponse.interface";
import {GetFullSuperHeroDto} from "../entities/super-heroes/dtos/get-full-super-hero.dto";
import {HttpClient} from "@angular/common/http";
import {GetFullSuperPowerDto} from "../entities/super-powers/dtos/get-full-super-power.dto";
import {CreateSuperHeroDto} from "../entities/super-heroes/dtos/create-super-hero.dto";
import {UpdateSuperHeroDto} from "../entities/super-heroes/dtos/update-super-hero.dto";
import {CreateSuperPowerDto} from "../entities/super-powers/dtos/create-super-power.dto";
import {UpdateSuperPowerDto} from "../entities/super-powers/dtos/update-super-power.dto";

@Injectable({
  providedIn: 'root'
})
export class SuperPowersService {
  constructor(private http: HttpClient) {}

  getSuperPowers(params: {
    search?: string,
    page?: number,
    pageSize?: number
  }):Observable<ApiResponse<PaginationResponse<GetFullSuperPowerDto>>> {
    return this.http.get<ApiResponse<PaginationResponse<GetFullSuperPowerDto>>>('https://localhost:7043/api/SuperPowers/search',
        {
          params
        }
    )
  }

  getAllSuperPowers():Observable<ApiResponse<GetFullSuperPowerDto[]>> {
    return this.http.get<ApiResponse<GetFullSuperPowerDto[]>>('https://localhost:7043/api/SuperPowers')
  }

  getSuperPowerById(id: number): Observable<ApiResponse<GetFullSuperPowerDto>> {
    return this.http.get<ApiResponse<GetFullSuperPowerDto>>(`https://localhost:7043/api/SuperPowers/${id}`);
  }

  createSuperPower(superPower: CreateSuperPowerDto): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>('https://localhost:7043/api/SuperPowers', superPower);
  }

  updateSuperPower(superPower: UpdateSuperPowerDto): Observable<ApiResponse<number>> {
    return this.http.put<ApiResponse<number>>(`https://localhost:7043/api/SuperPowers/`, superPower);
  }

  deleteSuperPower(id: number): Observable<ApiResponse<number | undefined>> {
    return this.http.delete<ApiResponse<number | undefined>>(`https://localhost:7043/api/SuperPowers/${id}`);
  }
}
