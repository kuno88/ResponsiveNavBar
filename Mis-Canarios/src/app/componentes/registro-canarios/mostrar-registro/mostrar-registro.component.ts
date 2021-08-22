import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mostrar-registro',
  templateUrl: './mostrar-registro.component.html',
  styleUrls: ['./mostrar-registro.component.css']
})
export class MostrarRegistroComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<MostrarRegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
