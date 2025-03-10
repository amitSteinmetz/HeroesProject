import { Injectable } from '@angular/core';
import { Signup } from '../../models/signup.model';
import { BehaviorSubject, catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Login } from '../../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  loggedUserSub: BehaviorSubject<string> = new BehaviorSubject("");
  loggedUser: Observable<string> = this.loggedUserSub.asObservable();

  constructor(private http: HttpClient) { }

  signup(signupModel: Signup): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}UserAccount/signup`, signupModel).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  login(loginModel: Login): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}UserAccount/login`, loginModel).pipe(
      tap((username) => {
        this.loggedUserSub.next(username);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  logout() {
    this.loggedUserSub.next("");
  }
}
