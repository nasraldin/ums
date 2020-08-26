import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { NgxNLoggerService } from 'ngx-n-logger';
import { User } from '../models/user.model';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private logger: NgxNLoggerService) {}

  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  get(id: number): Observable<User> {
    return this.http
      .get<User>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleError));
  }

  save(submisssion: User): Observable<User> {
    return this.http
      .post<User>(this.apiUrl, submisssion)
      .pipe(catchError(this.handleError));
  }

  update(id: number, submisssion: User): Observable<User> {
    return this.http
      .put<User>(this.apiUrl + `/${id}`, submisssion)
      .pipe(catchError(this.handleError));
  }

  delete(id: number) {
    return this.http
      .delete<User>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    this.logger.debug(error);

    if (error.error instanceof ErrorEvent) {
      this.logger.error('An error occurred:', error.error.message);
    } else {
      this.logger.info(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`,
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
