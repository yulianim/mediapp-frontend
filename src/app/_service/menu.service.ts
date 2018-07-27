import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { Menu } from '../_model/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private url:string=`${HOST}`
  constructor(private http:HttpClient) { }
  
  listar(){
    return this.http.get<Menu[]>(`${this.url}/menus`);

  }
}
