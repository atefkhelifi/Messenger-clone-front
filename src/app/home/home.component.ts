import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild('menu') menuElement!: ElementRef;
  user: any;
  constructor(
    private localStorage: LocalStorageService,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.login
      .getUserById(this.localStorage.getUserIdFromToken())
      .subscribe((user) => {
        this.user = user;
      });
  }
  toggleMenu() {
    const menu = this.menuElement.nativeElement;
    menu.classList.toggle('active');
  }
  logout() {
    console.log('remove token');
    this.localStorage.removeToken();
    this.router.navigate(['/login']);
  }
}
