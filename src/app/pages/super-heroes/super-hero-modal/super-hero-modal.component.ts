import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {TwoDigitDecimalNumberDirective} from "../../../@core/directives/two-digit-decimal-number.directive";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SuperHeroesService} from "../../../@core/services/super-heroes.service";
import {HttpClientModule} from "@angular/common/http";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {SuperPowersService} from "../../../@core/services/super-powers.service";
import {GetFullSuperHeroDto} from "../../../@core/entities/super-heroes/dtos/get-full-super-hero.dto";
import {MatTooltipModule} from "@angular/material/tooltip";
import {GetFullSuperPowerDto} from "../../../@core/entities/super-powers/dtos/get-full-super-power.dto";
import {CreateSuperHeroDto} from "../../../@core/entities/super-heroes/dtos/create-super-hero.dto";
import {popupErrors} from "../../../@core/utils/popup-errors";
import {ToastrService} from "ngx-toastr";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UpdateSuperHeroDto} from "../../../@core/entities/super-heroes/dtos/update-super-hero.dto";

@Component({
  selector: 'app-super-hero-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    TwoDigitDecimalNumberDirective,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatChipsModule,
    MatSelectModule,
    MatTooltipModule,
    FormsModule
  ],
  providers: [
    MatDatepickerModule,
    SuperHeroesService,
    SuperPowersService
  ],
  templateUrl: './super-hero-modal.component.html',
  styleUrl: './super-hero-modal.component.scss'
})
export class SuperHeroModalComponent implements OnInit{
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  separatorKeysCodes = [ENTER, COMMA];


  group: FormGroup = new FormGroup({
    heroName: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', []),
    height: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
  })
  loading: boolean = false;

  selectPowerValue: number = 0;

  powers:GetFullSuperPowerDto[] = [];

  chips: GetFullSuperPowerDto[] = [];
  constructor(
      private superHeroesService: SuperHeroesService,
      private superPowersService: SuperPowersService,
      private toastr: ToastrService,
      private dialogRef: DialogRef<SuperHeroModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data?: {id:number}
  ){}

  ngOnInit(){
    this.superPowersService.getAllSuperPowers().subscribe(
        {
          next: (response) => {
            console.log(response);
            this.powers = response.data;
            this.getCurrentHero();
          },
          error: (error) => {
            popupErrors(this.toastr, error);
            this.dialogRef.close()
          }
        }
    )
  }

  getCurrentHero(){
    if(!this.data || !this.data.id) return;
    this.superHeroesService.getSuperHeroById(this.data.id).subscribe(
        {
          next: (response) => {
            this.group.patchValue(response.data);
            this.group.patchValue({
              birthDate: new Date(response.data.birthDate!)
            })
            this.chips = response.data.superPowers.map(power=>power.superPowers);
            this.powers = this.powers.filter((power) => {
              return !this.chips.some((chip) => chip.id == power.id)
            })
          },
          error: (error) => {
            popupErrors(this.toastr, error);
            this.dialogRef.close()
          }
        }
    )
  }

  add(event: MatSelectChange){
    let powerIndex = this.powers.findIndex((power) => power.id == event.value);
    this.chips.push(this.powers[powerIndex]);
    this.powers.splice(powerIndex, 1);
    this.selectPowerValue = 0;
  }

  remove(id: number){
    let powerIndex = this.chips.findIndex((power) => power.id == id);
    this.powers.push(this.chips[powerIndex]);
    this.chips.splice(powerIndex, 1);
    this.selectPowerValue = 0;
  }

  abstractControlToFormControl(abstractControl: AbstractControl): FormControl {
    return abstractControl as FormControl;
  }

  save(){
    if(this.group.valid){
      if(this.data && this.data.id) {
        this.update();
      } else {
        this.create();
      }
    }
  }

  create(){
    let superHero: CreateSuperHeroDto = this.group.value;
    superHero.height = this.group.value.height.replace(',', '.');
    superHero.weight = this.group.value.weight.replace(',', '.');
    if(!this.group.value.birthDate){
      delete superHero.birthDate;
    }
    superHero.superPowers = this.chips.map((chip) => chip.id);
    this.loading = true;
    this.superHeroesService.createSuperHero(superHero).subscribe(
        {
          next: (response) => {
            this.toastr.success('Herói criado com sucesso!');
            this.loading = false;
            this.dialogRef.close()
          },
          error: (error) => {
            popupErrors(this.toastr, error);
            this.loading = false;
            this.dialogRef.close()
          }
        }
    )
  }

  update(){
    if(!this.data || !this.data.id) return;
    let superHero: UpdateSuperHeroDto = this.group.value;
    superHero.id = this.data.id;

    superHero.height = this.group.value.height.toString().replace(',', '.');
    superHero.weight = this.group.value.weight.toString().replace(',', '.');

    Object.keys(superHero).forEach((_key) => {
      const key = _key as keyof UpdateSuperHeroDto;
        if(!superHero[key]){
            delete superHero[key];
        }
    });

    if(!this.group.value.birthDate){
      delete superHero.birthDate;
    }
    superHero.superPowers = this.chips.map((chip) => chip.id);
    this.loading = true;
    this.superHeroesService.updateSuperHero(superHero).subscribe(
        {
          next: (response) => {
            this.toastr.success('Herói atualizado com sucesso!');
            this.loading = false;
            this.dialogRef.close()
          },
          error: (error) => {
            popupErrors(this.toastr, error);
            this.loading = false;
            this.dialogRef.close()
          }
        }
    )
  }

}
