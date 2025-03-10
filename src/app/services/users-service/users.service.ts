import { Injectable } from '@angular/core';
import { Signup } from '../../models/signup.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  loggedUserSub: BehaviorSubject<string> = new BehaviorSubject("");
  loggedUser: Observable<string> = this.loggedUserSub.asObservable();

  constructor(private http: HttpClient) { }

  signup(signupModel: Signup): Observable<string> {
    return this.http.post<any>(environment.apiUrl + "UserAccount/signup", signupModel);
  }

  updateCurrentUser(userName: string) {
    this.loggedUserSub.next(userName);
  }
}
