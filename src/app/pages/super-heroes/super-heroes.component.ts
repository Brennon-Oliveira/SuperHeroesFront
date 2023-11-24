import {Component, EventEmitter, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SuperHeroesService} from "../../@core/services/super-heroes.service";
import {GetFullSuperHeroDto} from "../../@core/entities/super-heroes/dtos/get-full-super-hero.dto";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {popupErrors} from "../../@core/utils/popup-errors";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {SuperHeroModalComponent} from "./super-hero-modal/super-hero-modal.component";

@Component({
  selector: 'app-super-heroes',
  templateUrl: './super-heroes.component.html',
  styleUrl: './super-heroes.component.scss'
})
export class SuperHeroesComponent {

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  page = 1;
  pageSize = 10;
  search = '';

  loading = false;

  heroes: GetFullSuperHeroDto[] = []
  heroesHeaders: string[] = [
    'id',
    'heroName',
    'realName',
    'birthDate',
    'height',
    'weight',
    'powers',
    'actions'
  ]

  searchTrigger = new EventEmitter<string>();

  constructor(
      private superHeroesService: SuperHeroesService,
      private toastr: ToastrService,
      private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.setPaginatorLabels();
    this.getHeroes()
    this.searchTrigger.subscribe((searchText)=>{
      this.search = searchText;
      this.getHeroes()
    })
  }

  getHeroes(){
    this.loading=true;
    this.superHeroesService.getSuperHeroes({
      search: this.search,
      page: this.page,
      pageSize: this.pageSize
    }).subscribe({
        next: (response)=> {
          this.heroes = response.data.itens;
          this.paginator.length = response.data.total;
          this.page = response.data.page;
          this.pageSize = response.data.pageSize;
          this.loading = false;
        },
        error: (error)=> {
          popupErrors(this.toastr, error)
          this.loading = false;
          this.heroes =[]
        }
    })
  }

  setPaginatorLabels(){
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      const start = page * pageSize + 1;
      let end = (page + 1) * pageSize;
      end = Math.min(length, end);
      return `${start} - ${end} de ${length}`;
    };
  }

  onPaginateChange(event: PageEvent){
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getHeroes()
  }

  newHero(){
    this.dialog.open(SuperHeroModalComponent).afterClosed().subscribe((result)=>{
      this.getHeroes();
    })
  }

  editHero(id: number){
    this.dialog.open(SuperHeroModalComponent, {
      data: {
        id
      }
    }).afterClosed().subscribe((result)=>{
      this.getHeroes();
    })
  }

  deleteHero(id: number){
    this.superHeroesService.deleteSuperHero(id).subscribe({
        next: (response) => {
            this.toastr.success('Super herói deletado com sucesso!');
            this.getHeroes();
        },
        error: (error) => {
            popupErrors(this.toastr, error)
        }
    })
  }
}
