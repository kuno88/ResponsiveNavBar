import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LineasService } from 'src/app/services/lineas.service';

@Component({
  selector: 'app-mostrar-linea',
  templateUrl: './mostrar-linea.component.html',
  styleUrls: ['./mostrar-linea.component.css']
})
export class MostrarLineaComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'linea', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(private lineaSvs: LineasService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<MostrarLineaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.dataSource = new MatTableDataSource();
    this.lineaSvs.obtenerLineas().subscribe(data => this.dataSource.data = data)
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.dataSource.sort = this.sort;
    }


    closeDialog(linea: string) {
      try{
       this.dialogRef.close(linea);
      
    }catch(error){
      console.log(error)
    }
    }

  ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
