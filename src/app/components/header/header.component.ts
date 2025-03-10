import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  hamburgerMenuWasClicked: boolean = false;
  isSmallScreen: boolean = false;
  hamburgerButtonWasClicked: boolean = false;

  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 950;
  }

  constructor(private _router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  get router() {
    return this._router;
  }

  logout() {
    this.usersService.logout();
  }

  onHamburgerButtonClicked() {
    this.hamburgerButtonWasClicked = !this.hamburgerButtonWasClicked;
  }
}
