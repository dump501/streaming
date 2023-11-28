import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '@app/core/constants/Constants';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private http: HttpClient) {}

  uploadImage(data: FormData) {
    return this.http.post(`${CONSTANTS.apiRoot}/upload`, data, {
      observe: 'response',
    });
  }
}
