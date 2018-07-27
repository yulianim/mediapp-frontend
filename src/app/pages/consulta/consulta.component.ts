import { ExamenService } from './../../_service/examen.service';
import { MatSnackBar } from '@angular/material';
import { DetalleConsulta } from './../../_model/detalleConsulta';
import { MedicoService } from './../../_service/medico.service';
import { PacienteService } from './../../_service/paciente.service';
import { Consulta } from './../../_model/consulta';
import { Medico } from './../../_model/medico';
import { Paciente } from './../../_model/paciente';
import { Component, OnInit } from '@angular/core';
import { Especialidad } from '../../_model/especialidad';
import { Examen } from '../../_model/examen';
import { EspecialidadService } from '../../_service/especialidad.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  pacientes:Paciente[]=[];
  especialidades:Especialidad[]=[];
  medicos:Medico[]=[];
  consulta:Consulta;
  examenes:Examen[]=[];
  detalleConsulta:DetalleConsulta[]=[];
  mensaje:string;
  tratamiento:string;
  diagnostico:string;

  idPacienteSeleccionado:number;
  idEspecialidadSeleccionado:number;
  idMedicoSeleccionado:number;
  fechaSeleccionada:Date=new Date();
  maxFecha:Date=new Date();
  constructor(private pacienteService:PacienteService, private medicoService:MedicoService, 
    private especialidadService:EspecialidadService, public snackBar:MatSnackBar, private examenService: ExamenService) { }

  ngOnInit() {
    this.listarPacientes();
    this.listarEspecialidad();
    this.listarMedicos();
    this.listarExamenes();
  }
  listarPacientes() {
    this.pacienteService.listarPacientes().subscribe(data => {
      this.pacientes = data;
    });
  }

  listarEspecialidad() {
    this.especialidadService.listarEspecialidades().subscribe(data => {
      this.especialidades = data;
    });
  }

  listarMedicos() {
    this.medicoService.listarMedicos().subscribe(data => {
      this.medicos = data;
    });
  }
  listarExamenes() {
    this.examenService.listarExamenes().subscribe(data => {
      this.examenes = data;
    });
  }
  agregar(){
    if (this.diagnostico != null && this.tratamiento != null) {      
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);
      this.diagnostico = null;
      this.tratamiento = null;
    } else {
      this.mensaje = `Debe agregar un diagnóstico y tramiento`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }
  removerDiagnostico(index: number) {
    this.detalleConsulta.splice(index, 1);
  }


}
