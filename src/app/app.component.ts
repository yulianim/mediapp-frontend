import { MenuService } from './_service/menu.service';
import { Component, OnInit } from '@angular/core';
import { Menu } from './_model/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

 menus:Menu[]=[];

 constructor(private menuService: MenuService){
     
 }
 ngOnInit(){
  this.menuService.listar().subscribe(data=>{
    this.menus=data;
  });

 }
}
