import {Component, EventEmitter, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SuperPowersService} from "../../@core/services/super-powers.service";
import {GetFullSuperPowerDto} from "../../@core/entities/super-powers/dtos/get-full-super-power.dto";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {popupErrors} from "../../@core/utils/popup-errors";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {SuperPowerModalComponent} from "./super-hero-modal/super-power-modal.component";

@Component({
  selector: 'app-super-powers',
  templateUrl: './super-powers.component.html',
  styleUrl: './super-powers.component.scss'
})
export class SuperPowersComponent {

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  page = 1;
  pageSize = 10;
  search = '';

  loading = false;

  powers: GetFullSuperPowerDto[] = []
  powersHeaders: string[] = [
    'id',
    'name',
    'description',
    'actions'
  ]

  searchTrigger = new EventEmitter<string>();

  constructor(
      private superPowersService: SuperPowersService,
      private toastr: ToastrService,
      private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.setPaginatorLabels();
    this.getPowers()
    this.searchTrigger.subscribe((searchText)=>{
      this.search = searchText;
      this.getPowers()
    })
  }

  getPowers(){
    this.loading=true;
    this.superPowersService.getSuperPowers({
      search: this.search,
      page: this.page,
      pageSize: this.pageSize
    }).subscribe({
        next: (response)=> {
          this.powers = response.data.itens;
          this.paginator.length = response.data.total;
          this.page = response.data.page;
          this.pageSize = response.data.pageSize;
          this.loading = false;
        },
        error: (error)=> {
          popupErrors(this.toastr, error)
          this.loading = false;
          this.powers =[]
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
    this.getPowers()
  }

  newPower(){
    this.dialog.open(SuperPowerModalComponent).afterClosed().subscribe((result)=>{
      this.getPowers();
    })
  }

  editPower(id: number){
    this.dialog.open(SuperPowerModalComponent, {
      data: {
        id
      }
    }).afterClosed().subscribe((result)=>{
      this.getPowers();
    })
  }

  deletePower(id: number){
    this.superPowersService.deleteSuperPower(id).subscribe({
        next: (response) => {
            this.toastr.success('Super herói deletado com sucesso!');
            this.getPowers();
        },
        error: (error) => {
            popupErrors(this.toastr, error)
        }
    })
  }
}
