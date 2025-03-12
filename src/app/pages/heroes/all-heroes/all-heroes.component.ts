import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Hero } from '../../../models/hero.model';
import { HeroesService } from '../../../services/heroes-service/heroes.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users-service/users.service';
import { LoggedUser } from '../../../models/loggedUser.model';

@Component({
  selector: 'app-all-heroes',
  imports: [CommonModule],
  templateUrl: './all-heroes.component.html',
  styleUrls: ['./all-heroes.component.css']
})
export class AllHeroesComponent implements OnInit, OnDestroy {
  availableHeroesSubscription: Subscription;
  availableHeroes: Hero[];
  showMoreDetails: boolean[] = [];
  heroesIconClass = [];
  loggedUserSubscription: Subscription;
  loggedUser: LoggedUser;

  constructor(private heroesService: HeroesService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.loggedUserSubscription = this.usersService.loggedUserObs.subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
    })

    this.availableHeroesSubscription = this.heroesService.getAllAvailableHeroes().subscribe({
      next: (heroes) => {
        this.availableHeroes = heroes;

        for (let i = 0; i < this.availableHeroes.length; i++) {
          this.showMoreDetails.push(false);
          this.heroesIconClass.push({
            "fa-caret-down": true,
            "fa-caret-up": false
          })
        }
      },
      error: () => { }
    })
  }

  ngOnDestroy(): void {
    this.loggedUserSubscription.unsubscribe();
    this.availableHeroesSubscription.unsubscribe();
  }

  onClickMoreDetailsIcon(index) {
    this.showMoreDetails[index] = !this.showMoreDetails[index];

    this.heroesIconClass[index] = {
      "fa-caret-down": !this.heroesIconClass[index]['fa-caret-down'],
      "fa-caret-up": !this.heroesIconClass[index]['fa-caret-up']
    }
  }

  onClickAddHeroButton(hero: Hero, index: number) {
    this.heroesService.addHeroToLoggedUser(hero).subscribe({
      next: () => {
        // this.availableHeroes = this.availableHeroes.filter(h => h.id !== hero.id); // without using http request
        this.heroesService.getAllAvailableHeroes().subscribe({
          next: (heroes) => {
            this.availableHeroes = heroes;
            this.showMoreDetails.splice(index, 1);
            this.heroesIconClass.splice(index, 1);
          },
          error: () => { }
        })
      },
      error: () => { }
    });
  }
}

