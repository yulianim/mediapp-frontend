import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';
import { Examen } from '../_model/examen';
import { HOST } from '../_shared/var.constant';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  examenCambio = new Subject<Examen[]>();
  mensaje = new Subject<string>();
  url: string = `${HOST}/examenes`;

  constructor(private http: HttpClient) { }

  listarExamenes(){
    return this.http.get<Examen[]>(this.url);
  }
  listarExamenPorId(id:number){
    return this.http.get<Examen>(`${this.url}/${id}`);

  }
  registrar(examen: Examen){
    return this.http.post(this.url, examen);
  }
  modificar(examen: Examen){
    return this.http.put(this.url, examen);

  }
  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

}
