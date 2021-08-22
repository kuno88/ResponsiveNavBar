import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   user: firebase.User | undefined;
  perfil: string='Ingresar';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private breakpointObserver: BreakpointObserver, private afauth: AngularFireAuth, private auth: AuthService,
    private ruta: Router) { }

  ngOnInit(): void {
    this.afauth.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.perfil='Perfil';
      }
    })
    

  }

  async onLogout() {
    try {
      await this.auth.logout();
      this.ruta.navigate(['/inicio']);
      window.location.reload();
    } catch (error) {
      console.log(error)
    }

  }

}
