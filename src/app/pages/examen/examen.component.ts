import { Component, OnInit, ViewChild } from '@angular/core';
import { Examen } from '../../_model/examen';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '../../../../node_modules/@angular/material';
import { ExamenService } from '../../_service/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  lista: Examen[] = [];
  displayedColumns = ['idExamen', 'nombre', 'descripcion', 'acciones'];
  dataSource: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private examenService: ExamenService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.examenService.examenCambio.subscribe(data=>{
      this.lista = data;
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.examenService.mensaje.subscribe(data=>{
        this.snackBar.open(data, "Aviso", {duration:2000});

      });
    });
    this.examenService.listarExamenes().subscribe(data => {
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
  eliminar(idExamen: number) {
    this.examenService.eliminar(idExamen).subscribe(data => {
      this.examenService.listarExamenes().subscribe(data => {
        this.lista = data;
        this.dataSource = new MatTableDataSource(this.lista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
    );
  }

}
