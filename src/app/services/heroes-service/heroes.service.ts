import { Injectable } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UsersService } from '../users-service/users.service';
import { LoggedUser } from '../../models/loggedUser.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  allHeroes: Hero[] = [
    {
      name: "Spider-man", ability: "defender", startTrainingDate: null,
      suitColors: ["blue", " red"], startingPower: 12, currentPower: 12, image: "../../../assets/heroes-database-images/spider-man.jpeg"
    },
    {
      name: "Hulk", ability: "attacker", startTrainingDate: null,
      suitColors: ["green"], startingPower: 21, currentPower: 21, image: "../../../assets/heroes-database-images/hulk.jpeg"
    },
    {
      name: "Iron-man", ability: "attacker", startTrainingDate: null,
      suitColors: ["red", " yellow"], startingPower: 32, currentPower: 32, image: "../../../assets/heroes-database-images/iron-man.jpeg"
    },
    {
      name: "Wolverine", ability: "attacker", startTrainingDate: null,
      suitColors: ["black", " yellow"], startingPower: 10, currentPower: 10, image: "../../../assets/heroes-database-images/wolverine.jpeg"
    },
    {
      name: "Super-man", ability: "attacker", startTrainingDate: null,
      suitColors: ["blue", " red"], startingPower: 47, currentPower: 47, image: "../../../assets/heroes-database-images/super-man.png"
    },
    {
      name: "Captain america", ability: "attacker", startTrainingDate: null,
      suitColors: ["silver", " red", " blue"], startingPower: 15, currentPower: 15, image: "../../../assets/heroes-database-images/captain-america.jpeg"
    },
    {
      name: "Bat-man", ability: "defender", startTrainingDate: null,
      suitColors: ["black", " yellow"], startingPower: 24, currentPower: 24, image: "../../../assets/heroes-database-images/bat-man.png"
    },
    {
      name: "Black panther", ability: "attacker", startTrainingDate: null,
      suitColors: ["black", " purple"], startingPower: 38, currentPower: 38, image: "../../../assets/heroes-database-images/black-panther.jpeg"
    },
    {
      name: "Wonder-woman", ability: "defender", startTrainingDate: null,
      suitColors: ["bronze", " red", " blue"], startingPower: 17, currentPower: 17, image: "../../../assets/heroes-database-images/wonder-woman.jpeg"
    },
    {
      name: "Flash", ability: "defender", startTrainingDate: null,
      suitColors: ["red", " yellow"], startingPower: 29, currentPower: 29, image: "../../../assets/heroes-database-images/flash.png"
    },
    {
      name: "The arrow", ability: "attacker", startTrainingDate: null,
      suitColors: ["green", " black"], startingPower: 13, currentPower: 13, image: "../../../assets/heroes-database-images/the-arrow.png"
    },
    {
      name: "Doctor Strange", ability: "defender", startTrainingDate: null,
      suitColors: ["red", " blue"], startingPower: 40, currentPower: 40, image: "../../../assets/heroes-database-images/doctor-strange.jpeg"
    },
    {
      name: "Black Widow", ability: "defender", startTrainingDate: null,
      suitColors: ["black", " red"], startingPower: 25, currentPower: 25, image: "../../../assets/heroes-database-images/black-widow.jpeg"
    },
    {
      name: "Ant-man", ability: "defender", startTrainingDate: null,
      suitColors: ["black", " red", " gray"], startingPower: 19, currentPower: 19, image: "../../../assets/heroes-database-images/ant-man.png"
    }
  ];
  allUsersChosenHeroes: Map<string, Hero[]> = new Map<string, Hero[]>;

  allHeroesSubject: BehaviorSubject<Hero[]> = new BehaviorSubject(this.allHeroes);
  allHeroesAsObservable: Observable<Hero[]> = this.allHeroesSubject.asObservable();

  allUsersChosenHeroesSubject: BehaviorSubject<Map<string, Hero[]>> = new BehaviorSubject(this.allUsersChosenHeroes);
  allUsersChosenHeroesAsObservable: Observable<Map<string, Hero[]>> = this.allUsersChosenHeroesSubject.asObservable();

  lastTrainingDate: string[] = [];
  maxAmountOfTrainingsPerDay = 5;
  currentAmountOfTrainingToday: number[] = [];
  notAllowedModalClass = [];
  notAllowedSignClass = [];

  loggedUserSubscription: Subscription;
  loggedUser: LoggedUser;

  constructor(private usersService: UsersService) {
    this.loggedUserSubscription = this.usersService.loggedUser.subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
    })
  }

  addHeroToMyHeroes(hero: Hero) {
    // hero.startTrainingDate = new Date().toLocaleDateString("en-GB");

    // if (!this.allUsersChosenHeroes.has(this.currentLoggedUser))
    //   this.allUsersChosenHeroes.set(this.currentLoggedUser, []); // Initialize an empty array if the key doesn't exist

    // this.allUsersChosenHeroes.get(this.currentLoggedUser).push(hero);
    // this.allUsersChosenHeroesSubject.next(this.allUsersChosenHeroes);

    // this.allHeroes.splice(this.allHeroes.indexOf(hero), 1);
    // this.allHeroesSubject.next([...this.allHeroes]);

    // this.lastTrainingDate.push(environment.todayDate);
    // this.currentAmountOfTrainingToday.push(0);

    // this.notAllowedModalClass.push(false);
    // this.notAllowedSignClass.push({
    //   "not-allowed": false
    // });
  }

  retrieveHeroToAllHeroes(hero: Hero, index: number) {
    // hero.currentPower = hero.startingPower;

    // this.allHeroes.push(hero);
    // this.allHeroesSubject.next([...this.allHeroes]);

    // this.allUsersChosenHeroes.get(this.currentLoggedUser).splice(this.allUsersChosenHeroes.get(this.currentLoggedUser).indexOf(hero), 1);
    // this.allUsersChosenHeroesSubject.next(this.allUsersChosenHeroes);

    // this.notAllowedModalClass.splice(this.notAllowedModalClass.indexOf(hero), 1);
    // this.notAllowedSignClass.splice(this.notAllowedSignClass.indexOf(hero), 1);

    // this.currentAmountOfTrainingToday[index] = 0;
  }

  trainHero(index: number) {
    // if (this.lastTrainingDate[index] !== environment.todayDate)
    //   this.currentAmountOfTrainingToday[index] = 0;

    // this.currentAmountOfTrainingToday[index]++;

    // if (this.currentAmountOfTrainingToday[index] >= this.maxAmountOfTrainingsPerDay) {
    //   if (!this.notAllowedSignClass[index]["not-allowed"])
    //     this.notAllowedSignClass[index]["not-allowed"] = true;
    //   else
    //     this.notAllowedModalClass[index] = true;

    //   return;
    // }

    // this.lastTrainingDate[index] = environment.todayDate;
    // const hero: Hero = this.allUsersChosenHeroes.get(this.currentLoggedUser).at(index);
    // hero.currentPower += (Math.random() * (0.1 * hero.currentPower));
    // hero.currentPower = Math.round(hero.currentPower * 1000) / 1000; // Show only 3 digits after the dot
  }

  removeNotAllowedModal(index: number) {
    this.notAllowedModalClass[index] = false;
  }
}
