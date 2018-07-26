import { MedicoComponent } from './pages/medico/medico.component';
import { Not403Component } from './pages/not403/not403.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';

const routes: Routes = [
     {path:'not-403', component:Not403Component},
     {path:'consulta',component:ConsultaComponent},
    // {path:'buscar', component:BuscarComponent},
     {path: 'medico',component:MedicoComponent },
  {
    path:'paciente', component:PacienteComponent, children: [
      {path:'nuevo', component:PacienteEdicionComponent},
      {path:'edicion/:id', component:PacienteEdicionComponent}
      
    ]
  },
  {
    path:'especialidad', component:EspecialidadComponent, children:[
        {path:'nuevo', component:EspecialidadEdicionComponent},
        {path:'edicion/:id', component:EspecialidadEdicionComponent}
    ]
  },
  {
    path:'examen', component:ExamenComponent, children: [
      {path:'nuevo', component:ExamenEdicionComponent},
      {path:'edicion/:id', component:ExamenEdicionComponent}
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
