import { Injectable } from '@angular/core';
import { Signup } from '../../models/signup.model';
import { BehaviorSubject, catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Login } from '../../models/login.model';
import { LoggedUser } from '../../models/loggedUser.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  loggedUserSub: BehaviorSubject<LoggedUser> = new BehaviorSubject(
    JSON.parse(localStorage.getItem('loggedUser') || null)
  );
  loggedUserObs: Observable<LoggedUser> = this.loggedUserSub.asObservable();

  constructor(private http: HttpClient) { }

  signup(signupModel: Signup): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}UserAccount/signup`, signupModel).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  login(loginModel: Login): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(`${environment.apiUrl}UserAccount/login`, loginModel).pipe(
      tap((loggedUser) => {
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        this.loggedUserSub.next(loggedUser);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  logout() {
    localStorage.setItem('loggedUser', null);
    this.loggedUserSub.next(null);
  }

  isValidLoggedIn(loggedUser: LoggedUser) {
    return !!loggedUser && !this.isTokenExpired(loggedUser.tokenExpireTime);
  }

  isTokenExpired(tokenExpireTime: string) : boolean {
    return Date.parse(tokenExpireTime) < Date.now()
  }
}
