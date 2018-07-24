import { Paciente } from './../_model/paciente';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  url: string = `${HOST}/pacientes`;

  constructor(private http: HttpClient) { }

  listarPacientes(){
    return this.http.get<Paciente[]>(this.url);
  }
}
