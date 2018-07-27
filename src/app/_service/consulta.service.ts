import { HttpClient } from '@angular/common/http';
import { Especialidad } from './../_model/especialidad';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { ConsultaListaExamen } from '../_model/consultaListaExamen';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url:string=`${HOST}/consultas`
  constructor(private http:HttpClient) { }
  registrar(consultaDTO:ConsultaListaExamen){
    return this.http.post(this.url, consultaDTO);

  }
}
