import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';
import { Especialidad } from '../_model/especialidad';
import { HOST } from '../_shared/var.constant';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  EspecialidadCambio = new Subject<Especialidad[]>();
  mensaje = new Subject<string>();
  url: string = `${HOST}/especialidades`;

  constructor(private http: HttpClient) { }

  listarEspecialidads(){
    return this.http.get<Especialidad[]>(this.url);
  }
  listarEspecialidadPorId(id:number){
    return this.http.get<Especialidad>(`${this.url}/${id}`);

  }
  registrar(especialidad: Especialidad){
    return this.http.post(this.url, especialidad);
  }
  modificar(especialidad: Especialidad){
    return this.http.put(this.url, especialidad);

  }
  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
