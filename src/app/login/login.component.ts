import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LoginService } from '../service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, AfterViewInit {
  authMessage: string = '';

  @ViewChild('checkbox') checkbox!: ElementRef;
  name: string = '';
  email: string = '';
  password: string = '';
  loginEmail: string = '';
  loginPassword: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  ngAfterViewInit(): void {
    this.checkbox.nativeElement.checked = true;
  }
  ngOnInit(): void {}
  onCheckboxChange(event: any) {
    if (event.target.checked) {
      console.log('checked', event.target.checked);
    }
    if (!event.target.checked) {
      console.log('unchecked', event.target.checked);
    }
  }
  toggleCheckbox() {
    const currentState = this.checkbox.nativeElement.checked;
    console.log(currentState);
    this.checkbox.nativeElement.checked = !currentState;
    console.log('Toggled to:', !currentState);
  }
  signUp() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    this.loginService.createUser(user).subscribe((data) => {
      this.toggleCheckbox();
    });
  }
  signIn() {
    const loginData = {
      email: this.loginEmail,
      password: this.loginPassword,
    };
    this.loginService.login(loginData.email, loginData.password).subscribe(
      (user) => {
        console.log(user);
        // this.authError = false;
        this.localStorageService.setToken(user.token);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        if (error.status != 400) {
          this.authMessage = 'Server error, please try again later';
        } else {
          this.authMessage = 'Email or password are wrong';
        }
      }
    );
  }
}
