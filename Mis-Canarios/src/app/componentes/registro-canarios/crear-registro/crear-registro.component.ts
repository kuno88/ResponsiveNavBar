import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import firebase from 'firebase';
import { RegistroCanariosInterface } from 'src/app/interface/registro-canarios';
import { RegistroCanariosService } from 'src/app/services/registro-canarios.service';
import Swal from 'sweetalert2';
import { MostrarLineaComponent } from '../mostrar-linea/mostrar-linea.component';
import { MostrarRegistroComponent } from '../mostrar-registro/mostrar-registro.component';

@Component({
  selector: 'app-crear-registro',
  templateUrl: './crear-registro.component.html',
  styleUrls: ['./crear-registro.component.css']
})
export class CrearRegistroComponent implements OnInit {

  linea: any;
  formRegistroCanario: FormGroup;
  usuario?: any;
  user: firebase.User | undefined;
  genero: any[] = [
    { value: 'Macho', viewValue: 'Macho' },
    { value: 'Hembra', viewValue: 'Hembra' },
    { value: 'Indefinido', viewValue: 'Indefinido' }
  ];

  constructor(private fb: FormBuilder, private afauth: AngularFireAuth,
    private cana: RegistroCanariosService, public dialogRef: MatDialogRef<MostrarRegistroComponent>,
    public dialog: MatDialog) {
    this.formRegistroCanario = this.fb.group({
      procedencia: ['', Validators.required],
      codNumCriador: [''],
      nAnillo: ['', Validators.required],
      genero: ['', Validators.required],
      linea: [''],
      estado: ['', Validators.required],
      fechaEstado: [''],
      observacionEstado: [''],
      colorAnillo: ['', Validators.required],
      observaciones: [''],
      usuario: ['']

    })
  }

  ngOnInit(): void {
    this.afauth.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    })
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(MostrarLineaComponent, {
      height: '80%',
      width: '80%',
      data: { linea: this.linea }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.linea = result;
    })
  }


  async agregarLinea() {
    await this.openDialog();
  }

  closeDialog() {
    this.dialogRef.close();
    console.log()
  }

  async agregarCanario() {
    try {
      const canario: RegistroCanariosInterface = {
        usuario: this.user?.email,
        procedencia: this.formRegistroCanario.value.procedencia,
        codNumCriador: this.formRegistroCanario.value.codNumCriador,
        nAnillo: this.formRegistroCanario.value.nAnillo,
        colorAnillo: this.formRegistroCanario.value.colorAnillo,
        genero: this.formRegistroCanario.value.genero,
        linea: this.formRegistroCanario.value.linea,
        estado: this.formRegistroCanario.value.estado,
        fechaEstado: this.formRegistroCanario.value.fechaEstado,
        observacionEstado: this.formRegistroCanario.value.observacionEstado,
        observaciones: this.formRegistroCanario.value.observaciones,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),

      }
      if (canario) {
        await this.cana.createregisterBird(canario).then();
        this.closeDialog();
        this.registroCorrecto();
      }else{
        this.msjError();
      }
    } catch (error) {
      console.log(error)
    }
  }

  registroCorrecto() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      background: '#C0CBDE'
    })

    Toast.fire({
      icon: 'success',
      title: 'Canario registrado',

    });
  }
  msjError() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      background: '#C0CBDE'
    })
    Toast.fire({
      icon: 'error',
      title: 'Hubo un error intentelo nuevamente',
    });

  }





}
