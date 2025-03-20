import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { LocalstorageService } from './shared/services/localstorage.service';

@Component({
    selector: 'app-root',
    template: `
    <router-outlet></router-outlet>
  `,
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'inventario-frontend';

  currentDate = new Date();
  expirationDate = new Date();

  constructor(
    private readonly _localstorageService: LocalstorageService,
    private readonly _authServices: AuthService,
    private router: Router
  ) {
    this.runTimer();
  }

  @HostListener('window:keyup', ['$event'])
  KeyUp(event: KeyboardEvent) {
    this.configs(event);
  }

  @HostListener('window:keydown', ['$event'])
  keyDownt(event: KeyboardEvent) {
    this.configs(event);
  }

  configs(event: KeyboardEvent) {
    if (event.code === 'F5') {
      event.preventDefault();
    }
  }

  @HostListener('window:mousemove', ['$event'])
  refreshUserState() {
    this.expirationDate = new Date();
    this.expirationDate.setTime(this.expirationDate.getTime() + (10 * 60 * 1000));
  }

  runTimer() {
    const sleep = (milliseconds: any) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    sleep(60000).then(() => {
      if (!this.router.url.includes('login')) {
        this.validateInactive();
        this.validateToken();
      }
    });
  }

  validateInactive() {
    this.currentDate = new Date();
    if (this.currentDate >= this.expirationDate) {
      console.log('Inactividad superada');
      this._authServices.logout();
    }
    this.runTimer();
  }

  validateToken() {
    if (this._localstorageService.exitedToken()) {
      this._authServices.logout();
    }
  }
}