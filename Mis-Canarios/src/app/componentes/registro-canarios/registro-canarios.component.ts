import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { RegistroCanariosInterface } from 'src/app/interface/registro-canarios';
import { RegistroCanariosService } from 'src/app/services/registro-canarios.service';
import Swal from 'sweetalert2';
import { ModalComponent } from './modal/modal.component';
import { MostrarRegistroComponent } from './mostrar-registro/mostrar-registro.component';

@Component({
  selector: 'app-registro-canarios',
  templateUrl: './registro-canarios.component.html',
  styleUrls: ['./registro-canarios.component.css']
})
export class RegistroCanariosComponent implements OnInit {

  Canarios: any[] = [];
  user: firebase.User | null | undefined;
  usuari: string | null = '';

  displayedColumns: string[] = ['procedencia', 'nAnillo', 'genero', 'linea', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _registroCanariosSvc: RegistroCanariosService, 
              private afauth: AngularFireAuth,
              private route: Router,
              public dialog: MatDialog,
              private aRoute: ActivatedRoute) {
      
 this.afauth.user.subscribe(user => {
 this.user = user;
 this.usuari = this.user!.email;
 this.dataSource = new MatTableDataSource();
 this._registroCanariosSvc.newGetAllCanarios(this.usuari).subscribe(data => this.dataSource.data = data)
 this.dataSource.paginator = this.paginator;
 this.dataSource.sort = this.sort;
 })
 }

  ngOnInit(): void {}


  openDialog(canario?: RegistroCanariosInterface): void {

    const dialogRef = this.dialog.open(ModalComponent, {
      height: '80%',
      width: '80%',
      data: {
        message: canario ? 'Editar Registro' : 'Nuevo registro',
        content: canario,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);

    })
  }

  openDialog2(canario:RegistroCanariosInterface){
    const dialogRef=this.dialog.open(MostrarRegistroComponent,{
      height: '80%',
      width: '50%',
      data: canario
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);

    })

  }

  crearRegistro() {
    this.openDialog();
  }

  async mostrarCanario(canario:RegistroCanariosInterface){
    this.openDialog2(canario);
  }

  async editarCanario(canario: RegistroCanariosInterface) {
    this.openDialog(canario)
  }

  async eliminarCanario(canario:RegistroCanariosInterface) {
    Swal.fire({
      title: 'Desea eliminar el registro?',
      text: 'Una vez eliminado, el registro no podra ser recuperado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then(async willDelete => {
      if (willDelete) {
        //this._cana.eliminarCanario(id).then(() => {
         await this._registroCanariosSvc.deleteCanario(canario).then(() => {
          Swal.fire({ title: 'Eliminado', text: 'Su registro ha sido eliminado!', icon: "success" });
        }).catch((error) => {
          Swal.fire({ title: 'Error', text: 'Ha ocurrido un eror durante la eliminacion!', icon: "error" });
        });
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
