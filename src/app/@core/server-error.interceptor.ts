import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Alert} from "./components/toastr/toastr.service";

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private alert: Alert
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.error) {
          const err =
            typeof error.error === 'string'
              ? JSON.parse(error.error)
              : error.error;

          if (
            typeof err !== 'string' &&
            (err?.errors?.Messages?.length > 0 ||
              err?.data?.errors?.Messages?.length > 0)
          ) {
            const errors = err.data
              ? err.data.errors.Messages
              : err.errors.Messages;
            errors.forEach((errorMessage: string) => {
              if (errorMessage === 'Incorrect user or password') {
                this.alert.show({
                  title: '',
                  message: 'Usuário ou senha incorretos!',
                  type: 'standard',
                  context: 'error',
                });
              } else {
                this.alert.show({
                  title: 'Erro!',
                  message: errorMessage,
                  type: 'standard',
                  context: 'error',
                });
              }
            });
          }
        }
        return throwError(error);
      })
    );
  }
}
