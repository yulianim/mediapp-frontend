import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Especialidad } from './../_model/especialidad';
import { HOST, TOKEN_NAME } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { ConsultaListaExamen } from '../_model/consultaListaExamen';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url: string = `${HOST}/consultas`;

  constructor(private http: HttpClient) { }

  registrar(consultaDTO: ConsultaListaExamen) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, consultaDTO, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
