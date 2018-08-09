import { ServerErrorsInterceptor } from './_shared/server-errors.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { Not403Component } from './pages/not403/not403.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { DialogoComponent } from './pages/medico/dialogo/dialogo.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    ConsultaComponent,
    PacienteEdicionComponent,
    EspecialidadComponent,
    ExamenComponent,
    MedicoComponent,
    Not403Component,
    EspecialidadEdicionComponent,
    ExamenEdicionComponent,
    DialogoComponent,
    LoginComponent,
   
  ],
  entryComponents:[DialogoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, 
    useClass: ServerErrorsInterceptor,
    multi:true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
