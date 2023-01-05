import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToasterService {

  constructor(private toastr: ToastrService) {
  }

  showToastMessage(message: string, timeout?: number, type?: 'danger' | 'warning' | 'success' | string) {
    const t = type || 'success';
    const options = {
      timeOut: timeout || 3000,
      closeButton: true,
      enableHtml: true,
      tapToDismiss: false,
      positionClass: 'toast-top-center',
      toastClass:
        'ngx-toastr'
    }
    switch (t){
      case 'success':
        this.toastr.success(message, '', options);
        break;
      case 'danger':
        this.toastr.error(message, '', options);
        break;
      case 'warning':
        this.toastr.warning(message, '', options);
        break;
      case 'info':
        this.toastr.info(message, '', options);
        break;
    }
  }
}
