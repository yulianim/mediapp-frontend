import { Component, OnInit, ViewChild } from '@angular/core';
import { Medico } from '../../_model/medico';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '../../../../node_modules/@angular/material';
import { MedicoService } from '../../_service/medico.service';
import { DialogoComponent } from './dialogo/dialogo.component';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  medicos: Medico[] = [];
  displayedColumns = ['idmedico', 'nombres', 'apellidos', 'cmp', 'acciones'];
  dataSource: MatTableDataSource<Medico>;
  mensaje: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private medicoService: MedicoService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    
  }

  ngOnInit() {
    this.medicoService.medicosCambio.subscribe(data => {
      this.medicos = data;
      this.dataSource = new MatTableDataSource(this.medicos);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.medicoService.mensaje.subscribe(data => {
      console.log(data);
      this.snackBar.open(data, null, { duration: 2000 });
    });

    this.medicoService.listarMedicos().subscribe(data => {
      this.medicos = data;

      this.dataSource = new MatTableDataSource(this.medicos);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  openDialog(medico: Medico): void {

    let med = medico != null ? medico : new Medico();
    let dialogRef = this.dialog.open(DialogoComponent, {
      width: '250px',   
      disableClose: true,   
      /*      data: { nombres: med.nombres , apellidos: med.apellidos, cmp: med.cmp }*/
      data: med      
    });
  }
  eliminar(medico: Medico): void {
    this.medicoService.eliminar(medico.idMedico).subscribe(data => {
      if (data === 1) {
        this.medicoService.listarMedicos().subscribe(medicos => {
          this.medicoService.medicosCambio.next(medicos);
          this.medicoService.mensaje.next("Se elimino correctamente");
        });
      } else {
        this.medicoService.mensaje.next("No se pudo eliminar");
      }
    });
  }


}
