import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loginForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.username = this.loginForm.get('username')!.value;
    this.password = this.loginForm.get('password')!.value;
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/inventario']);
      },
      (error) => {
        alert('Credenciales incorrectas');
      }
    );
  }
}