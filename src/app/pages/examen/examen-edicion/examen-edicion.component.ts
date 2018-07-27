import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../../node_modules/@angular/forms';
import { Examen } from '../../../_model/examen';
import { ExamenService } from '../../../_service/examen.service';
import { ActivatedRoute, Router, Params } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-examen-edicion',
  templateUrl: './examen-edicion.component.html',
  styleUrls: ['./examen-edicion.component.css']
})
export class ExamenEdicionComponent implements OnInit {

  
  id: number;
  examen: Examen;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private examenService: ExamenService, private route: ActivatedRoute, private router: Router) {
    this.examen = new Examen();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
      'descripcion': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
      
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    if (this.edicion) {
      this.examenService.listarExamenPorId(this.id).subscribe(data => {
        let id = data.idExamen;
        let nombre = data.nombre;
        let descripcion = data.descripcion;
        
        this.form = new FormGroup({
      'id': new FormControl(id),
      'nombre': new FormControl(nombre),
      'descripcion': new FormControl(descripcion),
      
        });
      });
    }
  }

  operar() {
    this.examen.idExamen = this.form.value['id'];
    this.examen.nombre = this.form.value['nombre'];
    this.examen.descripcion = this.form.value['descripcion'];
  

    if (this.edicion) {
      //update
      this.examenService.modificar(this.examen).subscribe(data => {
        console.log(data);
        //if (data === 1) {
          this.examenService.listarExamenes().subscribe(examenes => {
            this.examenService.examenCambio.next(examenes);
            this.examenService.mensaje.next('Se modificó');
          });
        //} else {
          //this.pacienteService.mensaje.next('No se modificó');
        //}
       
      });
    } else {
      this.examenService.registrar(this.examen).subscribe(data => {
        console.log(data);
        //if (data === 1) {
          this.examenService.listarExamenes().subscribe(pacientes => {
            this.examenService.examenCambio.next(pacientes);
            this.examenService.mensaje.next('Se registró');
          });
        //} else {
          //this.pacienteService.mensaje.next('No se registró');
        //}
        });
    }

    this.router.navigate(['examen'])
  }


}
