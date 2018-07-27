import { EspecialidadService } from './../../_service/especialidad.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Especialidad } from '../../_model/especialidad';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  lista: Especialidad[] = [];
  displayedColumns = ['idEspecialidad', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Especialidad>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private especialidadService: EspecialidadService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.especialidadService.especialidadCambio.subscribe(data=>{
      this.lista = data;
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.especialidadService.mensaje.subscribe(data=>{
        this.snackBar.open(data, "Aviso", {duration:2000});

      });
    });
    this.especialidadService.listarEspecialidades().subscribe(data => {
      this.lista = data;
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  eliminar(idEspecialidad: number) {
    this.especialidadService.eliminar(idEspecialidad).subscribe(data => {
      this.especialidadService.listarEspecialidades().subscribe(data => {
        this.lista = data;
        this.dataSource = new MatTableDataSource(this.lista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
    );
  }
}
