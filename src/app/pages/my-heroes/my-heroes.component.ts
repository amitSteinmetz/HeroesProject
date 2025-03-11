import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { Subscription } from 'rxjs';
import { HeroesService } from '../../services/heroes-service/heroes.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users-service/users.service';
import { LoggedUser } from '../../models/loggedUser.model';

@Component({
  selector: 'app-my-heroes',
  imports: [CommonModule],
  templateUrl: './my-heroes.component.html',
  styleUrls: ['../../../styles/heroes.css', './my-heroes.component.css']
})
export class MyHeroesComponent implements OnInit {
  myHeroes: Hero[] = [];
  myHeroesSub: Subscription;
  showMoreDetails: boolean[] = [];
  heroesIconClass = [];
  loggedUserSubscription: Subscription;
  loggedUser: LoggedUser;

  constructor(private heroesService: HeroesService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.loggedUserSubscription = this.usersService.loggedUserObs.subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
    })

    this.myHeroesSub = this.heroesService.allUsersChosenHeroesAsObservable.subscribe((allUsersChosenHeroes) => {
      // this.myHeroes = allUsersChosenHeroes.get(this.currentLoggedUser);
    })

    for (let i = 0; i < this.myHeroes?.length; i++) {
      this.showMoreDetails.push(false);
      this.heroesIconClass.push({
        "fa-caret-down": true,
        "fa-caret-up": false
      });
    }
  }

  onClickMoreDetailsIcon(index) {
    this.showMoreDetails[index] = !this.showMoreDetails[index];

    this.heroesIconClass[index] = {
      "fa-caret-down": !this.heroesIconClass[index]['fa-caret-down'],
      "fa-caret-up": !this.heroesIconClass[index]['fa-caret-up']
    }
  }

  onClickTrainButton(index: number) {
    this.heroesService.trainHero(index);
  }

  onClickDiscardButton(hero: Hero, index: number) {
    this.heroesService.retrieveHeroToAllHeroes(hero, index);
  }

  get service() {
    return this.heroesService;
  }
}
