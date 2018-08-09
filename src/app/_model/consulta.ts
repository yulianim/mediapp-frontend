import { Especialidad } from './especialidad';
import { Medico } from './medico';
import { Paciente } from './paciente';
import { DetalleConsulta } from './detalleConsulta';
export class Consulta{
    public idConsulta:number;
    public paciente: Paciente;
    public fecha: string;
    public medico: Medico;
    public especialidad: Especialidad;
    public detalleConsulta:DetalleConsulta[];


}