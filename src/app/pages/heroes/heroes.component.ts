import { Component } from '@angular/core';
import { AllHeroesComponent } from "./all-heroes/all-heroes.component";

@Component({
  selector: 'app-heroes',
  imports: [AllHeroesComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {

}
