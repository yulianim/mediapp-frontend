import { Component, OnInit } from '@angular/core';
import { Especialidad } from '../../../_model/especialidad';
import { FormGroup, FormControl, Validators } from '../../../../../node_modules/@angular/forms';
import { EspecialidadService } from '../../../_service/especialidad.service';
import { ActivatedRoute, Router, Params } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {

  
  id: number;
  especialidad: Especialidad;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private especialidadService: EspecialidadService,
     private route: ActivatedRoute, private router: Router) {
    this.especialidad = new Especialidad();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      
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
      this.especialidadService.listarEspecialidadPorId(this.id).subscribe(data => {
        let id = data.idEspecialidad;
        let nombre = data.nombre;
       
      this.form = new FormGroup({
      'id': new FormControl(id),
      'nombre': new FormControl(nombre),
      
        });
      });
    }
  }

  operar() {
    this.especialidad.idEspecialidad = this.form.value['id'];
    this.especialidad.nombre = this.form.value['nombre'];
    if (this.edicion) {
      //update
      this.especialidadService.modificar(this.especialidad).subscribe(data => {
        this.especialidadService.listarEspecialidades().subscribe(pacientes => {
          this.especialidadService.especialidadCambio.next(pacientes);
          this.especialidadService.mensaje.next('Se modificó');
        });
      });
    } else {
      //insert
      this.especialidadService.registrar(this.especialidad).subscribe(data => {
        this.especialidadService.listarEspecialidades().subscribe(pacientes => {
          this.especialidadService.especialidadCambio.next(pacientes);
          this.especialidadService.mensaje.next('Se registró');
        });
      });
    }


       this.router.navigate(['especialidad'])

  }

}
