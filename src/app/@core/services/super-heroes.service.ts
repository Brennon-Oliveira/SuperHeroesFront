import { Injectable } from '@angular/core';
import {ApiResponse} from "../interfaces/api-response.interface";
import {GetFullSuperHeroDto} from "../entities/super-heroes/dtos/get-full-super-hero.dto";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginationResponse} from "../interfaces/paginationResponse.interface";
import {CreateSuperHeroDto} from "../entities/super-heroes/dtos/create-super-hero.dto";
import {UpdateSuperHeroDto} from "../entities/super-heroes/dtos/update-super-hero.dto";

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesService {
  constructor(private http: HttpClient) {}

  getSuperHeroes(params: {
    search?: string,
    page?: number,
    pageSize?: number
  }):Observable<ApiResponse<PaginationResponse<GetFullSuperHeroDto>>> {
    return this.http.get<ApiResponse<PaginationResponse<GetFullSuperHeroDto>>>('https://localhost:7043/api/SuperHeroes/search',
      {
        params
      }
    )
  }

  getSuperHeroById(id: number): Observable<ApiResponse<GetFullSuperHeroDto>> {
    return this.http.get<ApiResponse<GetFullSuperHeroDto>>(`https://localhost:7043/api/SuperHeroes/${id}`);
  }

  createSuperHero(superHero: CreateSuperHeroDto): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>('https://localhost:7043/api/SuperHeroes', superHero);
  }

  updateSuperHero(superHero: UpdateSuperHeroDto): Observable<ApiResponse<number>> {
    return this.http.put<ApiResponse<number>>(`https://localhost:7043/api/SuperHeroes/`, superHero);
  }

  deleteSuperHero(id: number): Observable<ApiResponse<number | undefined>> {
    return this.http.delete<ApiResponse<number | undefined>>(`https://localhost:7043/api/SuperHeroes/${id}`);
  }

}
