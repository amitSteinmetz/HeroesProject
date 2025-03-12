import { Injectable } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { BehaviorSubject, catchError, Observable, Subscription, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UsersService } from '../users-service/users.service';
import { LoggedUser } from '../../models/loggedUser.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  loggedUserSubscription: Subscription;
  loggedUser: LoggedUser;
  headers = { 'Authorization': "" };

  constructor(private usersService: UsersService, private http: HttpClient) {
    this.loggedUserSubscription = this.usersService.loggedUserObs.subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
      if (loggedUser) this.headers.Authorization = `Bearer ${this.loggedUser.token}`;
    })
  }

  getAllAvailableHeroes() {
    return this.http.get<Hero[]>(`${environment.apiUrl}Heroes/available`, { headers: this.headers });
  }

  getLoggedUserHeroes() {
    return this.http.get<Hero[]>(`${environment.apiUrl}Trainers/my-heroes`, { headers: this.headers });
  }

  addHeroToLoggedUser(hero: Hero) {
    return this.http.put<void>(`${environment.apiUrl}Trainers/add-hero/${hero.id}`, {}, { headers: this.headers })
  }

  deleteHeroFromTrainer(hero: Hero) {
    return this.http.delete<void>(`${environment.apiUrl}Trainers/${hero.id}`, { headers: this.headers });
  }

  trainHero(hero: Hero) {
    return this.http.patch<number>(`${environment.apiUrl}Trainers/train/${hero.id}`, {}, { headers: this.headers });
  }
}
