import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AllHeroesComponent } from './pages/heroes/all-heroes/all-heroes.component';
import { MyHeroesComponent } from './pages/heroes/my-heroes/my-heroes.component';
import { heroesGuard } from './guards/heroes.guard';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomePageComponent },
    { path: "login", component: LoginPageComponent },
    { path: "signup", component: SignupPageComponent },
    { path: "all-heroes", component: AllHeroesComponent, canActivate: [heroesGuard] },
    { path: "my-heroes", component: MyHeroesComponent, canActivate: [heroesGuard] },
    { path: "**", component: PageNotFoundComponent }
];
