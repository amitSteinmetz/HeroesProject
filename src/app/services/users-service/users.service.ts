import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // users: User[] = [
  //   {
  //     username: "amit", age: 26, email: "amitsteinmetz@gmail.com", password: "Mayan199288377!"
  //   },
  //   {
  //     username: "reut", age: 27, email: "reut@gmail.com", password: "Tutim199288377!"
  //   }
  // ];

  loggedUserSub: BehaviorSubject<string> = new BehaviorSubject("");
  loggedUser: Observable<string> = this.loggedUserSub.asObservable();

  constructor() { }

  // addUser(user: User) {
  //   this.users.push(user);
  // }

  signup() {

  }

  updateCurrentUser(userName: string) {
    this.loggedUserSub.next(userName);
  }
}
