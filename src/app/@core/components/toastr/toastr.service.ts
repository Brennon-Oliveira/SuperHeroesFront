import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {AlertData} from "../../interfaces/alert-data.interface";

@Injectable({
  providedIn: 'root',
})
export class Alert {
  constructor(private toastr: ToastrService) {}
  show(data: AlertData) {
    this.toastr.show('', '', { payload: data });
  }

  success(title: string, message: string) {
    this.show({
      title: title,
      message: message,
      context: 'success',
      type: 'standard',
    });
  }

  info(title: string, message: string) {
    this.show({
      title: title,
      message: message,
      context: 'info',
      type: 'standard',
    });
  }

  error(title: string, message: string) {
    this.show({
      title: title,
      message: message,
      context: 'error',
      type: 'standard',
    });
  }

  warning(title: string, message: string) {
    this.show({
      title: title,
      message: message,
      context: 'warning',
      type: 'standard',
    });
  }
}
