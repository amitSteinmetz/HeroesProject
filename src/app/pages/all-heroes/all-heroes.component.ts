import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { HeroesService } from '../../services/heroes-service/heroes.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'app-all-heroes',
  imports: [CommonModule],
  templateUrl: './all-heroes.component.html',
  styleUrls: ['../../../styles/heroes.css']
})
export class AllHeroesComponent implements OnInit {
  allHeroes: Hero[];
  allHeroesSub: Subscription;
  showMoreDetails: boolean[] = [];
  heroesIconClass = [];
  loggedUserSubscription: Subscription;
  currentLoggedUser: string = "";

  constructor(private heroesService: HeroesService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.allHeroesSub = this.heroesService.allHeroesAsObservable.subscribe((allHeroes) => {
      this.allHeroes = allHeroes;
    })

    for (let i = 0; i < this.allHeroes.length; i++) {
      this.showMoreDetails.push(false);
      this.heroesIconClass.push({
        "fa-caret-down": true,
        "fa-caret-up": false
      })
    }

    this.loggedUserSubscription = this.usersService.loggedUser.subscribe((loggedUser) => {
      this.currentLoggedUser = loggedUser;
    })
  }

  onClickMoreDetailsIcon(index) {
    this.showMoreDetails[index] = !this.showMoreDetails[index];

    this.heroesIconClass[index] = {
      "fa-caret-down": !this.heroesIconClass[index]['fa-caret-down'],
      "fa-caret-up": !this.heroesIconClass[index]['fa-caret-up']
    }
  }

  onClickAddHeroButton(hero: Hero) {
    this.heroesService.addHeroToMyHeroes(hero);
  }
}
