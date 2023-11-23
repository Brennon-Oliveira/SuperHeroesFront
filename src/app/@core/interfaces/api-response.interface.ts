import {HttpStatusCode} from "@angular/common/http";

export interface ApiResponse<T> {
  statusCode: HttpStatusCode;
  errors: string[];
  data: T;
}
