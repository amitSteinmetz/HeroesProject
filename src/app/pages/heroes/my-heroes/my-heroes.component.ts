import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../models/hero.model';
import { Subscription } from 'rxjs';
import { HeroesService } from '../../../services/heroes-service/heroes.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users-service/users.service';
import { LoggedUser } from '../../../models/loggedUser.model';

@Component({
  selector: 'app-my-heroes',
  imports: [CommonModule],
  templateUrl: './my-heroes.component.html',
  styleUrls: ['./my-heroes.component.css']
})
export class MyHeroesComponent implements OnInit {
  myHeroes: Hero[] = [];
  showMoreDetails: boolean[] = [];
  heroesIconClass = [];
  hitTrainnigLimitModalClass = [];
  hitTrainnigLimitSignClass = [];
  loggedUserSubscription: Subscription;
  loggedUser: LoggedUser;

  constructor(private heroesService: HeroesService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.loggedUserSubscription = this.usersService.loggedUserObs.subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
    })

    this.heroesService.getLoggedUserHeroes().subscribe({
      next: (heroes) => {
        this.myHeroes = heroes;

        for (let i = 0; i < this.myHeroes?.length; i++) {
          this.showMoreDetails.push(false);
          this.heroesIconClass.push({
            "fa-caret-down": true,
            "fa-caret-up": false
          });

          this.hitTrainnigLimitModalClass.push(false);
          this.hitTrainnigLimitSignClass.push({
            "not-allowed": false
          });
        }
      },
      error: () => { }
    })
  }

  onClickMoreDetailsIcon(index) {
    this.showMoreDetails[index] = !this.showMoreDetails[index];

    this.heroesIconClass[index] = {
      "fa-caret-down": !this.heroesIconClass[index]['fa-caret-down'],
      "fa-caret-up": !this.heroesIconClass[index]['fa-caret-up']
    }
  }

  onClickTrainButton(hero: Hero, index: number) {
    this.heroesService.trainHero(hero).subscribe({
      next: (updatedCurrentPower) => {
        this.myHeroes.find(h => h.id === hero.id).currentPower = updatedCurrentPower;
      },
      error: () => {
        this.hitTrainnigLimitModalClass[index] = true;
        this.hitTrainnigLimitSignClass[index]["not-allowed"] = true;
      }
    })
  }

  onClickDiscardButton(hero: Hero, index: number) {
    this.heroesService.deleteHeroFromTrainer(hero).subscribe({
      next: () => {
        this.myHeroes = this.myHeroes.filter(h => h.id !== hero.id);
        this.hitTrainnigLimitModalClass.splice(index, 1);
        this.hitTrainnigLimitSignClass.splice(index, 1);
      },
      error: () => { }
    });

    // this.notAllowedModalClass.splice(this.notAllowedModalClass.indexOf(hero), 1);
    // this.notAllowedSignClass.splice(this.notAllowedSignClass.indexOf(hero), 1);
  }

  removeNotAllowedModal(index: number) {
    this.hitTrainnigLimitModalClass[index] = false;
  }
}
