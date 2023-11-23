import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

export function popupErrors (toastrService: ToastrService, httpError: HttpErrorResponse){
    for (const error of httpError.error.errors) {
        toastrService.error(error, 'Erro!');
    }
}
