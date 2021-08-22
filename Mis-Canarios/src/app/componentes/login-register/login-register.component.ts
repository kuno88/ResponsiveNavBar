import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { async } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  loginForm = new FormGroup({
    emailLogin: new FormControl(''),
    passwordLogin: new FormControl(''),

  });
  formLogin: FormGroup;
  formRegister: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private ruta: Router) {
    this.formLogin = this.fb.group({
      emailLogin: ['', Validators.required],
      passwordLogin: ['', Validators.required]
    })
    this.formRegister = this.fb.group({
      emailRegister: ['', Validators.required],
      passwordRegister: ['', Validators.required]
    })
   }

  ngOnInit(): void {}

  async logear() {
    try {
      const correo = this.formLogin.value.emailLogin;
      const contraseña = this.formLogin.value.passwordLogin;
      const user = await this.auth.login(correo, contraseña);
      if (user) {
        this.fakeLoading();
      }
    } catch {
      this.msjError();
      this.formLogin.reset();
    }
  }

  async registrar() {
    try {
      const correo = this.formRegister.value.emailRegister;
      const contraseña = this.formRegister.value.passwordRegister;
      const user = await this.auth.register(correo, contraseña);
      if (user) {
        this.fakeLoading();
        this.registroCorrecto();
      }
    } catch (error) {
      console.log(error)
      this.msjError2();
      this.formLogin.reset();
    }
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.ruta.navigate(['/inicio'])
    }, 1500);
  }

  registroCorrecto() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
     
    })

    Toast.fire({
      icon: 'success',
      title: 'Registro exitoso',
      
    });
  }

  msjError(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      background: '#C0CBDE'
    })
    Toast.fire({
      icon: 'error',
      title: 'Usuario o contraseña incorrectos',
      
    });

  }

  msjError2(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      background: '#C0CBDE'
    })
    Toast.fire({
      icon: 'error',
      title: 'El formato de email es incorrecto',
      
    });

  }


}
