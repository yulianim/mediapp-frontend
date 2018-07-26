import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';
import { Medico } from '../_model/medico';
import { HOST } from '../_shared/var.constant';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  medicosCambio = new Subject<Medico[]>();
  mensaje = new Subject<string>();
  url: string = `${HOST}/medicos`;

  constructor(private http: HttpClient) { }

  listarMedicos(){
    return this.http.get<Medico[]>(this.url);
  }
  listarMedicoPorId(id:number){
    return this.http.get<Medico>(`${this.url}/${id}`);

  }
  registrar(medico: Medico){
    return this.http.post(this.url, medico);
  }
  modificar(medico: Medico){
    return this.http.put(this.url, medico);

  }
  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

}
