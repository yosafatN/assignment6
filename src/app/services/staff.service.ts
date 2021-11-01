import { Injectable } from '@angular/core';
import { Staff, Role } from '../models/staff';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  endpoint: string = 'http://localhost:4000/'
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) { }

  getAllStaff () {
    let api = `${this.endpoint}users`
    return this.http.get(api, { headers: this.headers})
    .pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  createStaff (data: Staff) {
    let api = `${this.endpoint}users`
    return this.http.post<Staff>(api, data, { headers: this.headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(this.handleError)
    )
  }

  editStaff (data: Staff, id: number) {
    let api = `${this.endpoint}users/${id}`
    return this.http.put<Staff>(api, data, { headers: this.headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(this.handleError)
    )
  }

  deleteStaff (id: number) {
    let api = `${this.endpoint}users/${id}`
    return this.http.delete(api, { headers: this.headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(this.handleError)
    )
  }

  handleError (err: HttpErrorResponse) {
    let msg = ''
    if (err.error instanceof ErrorEvent) {
      msg = err.error.message
    }
    else {
      msg = `Error Code: ${err.error.status}\nMessage: ${err.message}`
    }
    return throwError(msg)
  }
}
