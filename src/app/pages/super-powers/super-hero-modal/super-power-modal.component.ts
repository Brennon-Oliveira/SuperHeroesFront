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
import {HttpClientModule} from "@angular/common/http";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CreateSuperPowerDto} from "../../../@core/entities/super-powers/dtos/create-super-power.dto";
import {popupErrors} from "../../../@core/utils/popup-errors";
import {ToastrService} from "ngx-toastr";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UpdateSuperPowerDto} from "../../../@core/entities/super-powers/dtos/update-super-power.dto";
import {SuperPowersService} from "../../../@core/services/super-powers.service";
import {GetFullSuperPowerDto} from "../../../@core/entities/super-powers/dtos/get-full-super-power.dto";

@Component({
  selector: 'app-super-power-modal',
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
    SuperPowersService
  ],
  templateUrl: './super-power-modal.component.html',
  styleUrl: './super-power-modal.component.scss'
})
export class SuperPowerModalComponent implements OnInit{
  group: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  })
  loading: boolean = false;

  constructor(
      private superPowersService: SuperPowersService,
      private toastr: ToastrService,
      private dialogRef: DialogRef<SuperPowerModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data?: {id:number}
  ){}

  ngOnInit(){
    this.getCurrentPower();
  }

  getCurrentPower(){
    if(!this.data || !this.data.id) return;
    this.superPowersService.getSuperPowerById(this.data.id).subscribe(
        {
          next: (response) => {
            this.group.patchValue(response.data);
          },
          error: (error) => {
            popupErrors(this.toastr, error);
            this.dialogRef.close()
          }
        }
    )
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
    let superPower: CreateSuperPowerDto = this.group.value;
    if(!this.group.value.description){
      delete superPower.description;
    }
    this.loading = true;
    this.superPowersService.createSuperPower(superPower).subscribe(
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
    let superPower: UpdateSuperPowerDto = this.group.value;
    superPower.id = this.data.id;
    Object.keys(superPower).forEach((_key) => {
      const key = _key as keyof UpdateSuperPowerDto;
        if(!superPower[key]){
            delete superPower[key];
        }
    });
    this.loading = true;
    this.superPowersService.updateSuperPower(superPower).subscribe(
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
