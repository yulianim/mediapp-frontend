import { EspecialidadService } from './../../_service/especialidad.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Especialidad } from '../../_model/especialidad';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '../../../../node_modules/@angular/material';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {
  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Especialidad>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  mensaje: string;

  constructor(private especialidadService: EspecialidadService, public route: ActivatedRoute, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.especialidadService.especialidadCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.especialidadService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, {
        duration: 2000,
      });
    });

    this.especialidadService.listarEspecialidades().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  eliminar(especialidad: Especialidad): void {
    this.especialidadService.eliminar(especialidad.idEspecialidad).subscribe(data => {
      if (data === 1) {
        this.especialidadService.listarEspecialidades().subscribe(data => {
          this.especialidadService.especialidadCambio.next(data);
          this.especialidadService.mensaje.next("Se elimino correctamente");
        });
      } else {
        this.especialidadService.mensaje.next("No se pudo eliminar");
      }
    });
  }
}
