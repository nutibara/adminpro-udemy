import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

const swal: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + 'medico';

    return this.http.get(url)
    .pipe(
      map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      }));
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + 'busqueda/coleccion/medicos/' + termino;

    return this.http.get(url)
          .pipe(
            map((resp: any) => {
              console.log(resp.medicos);
              return resp.medicos;
            }));
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + 'medico/' + id;

    return this.http.get(url)
          .pipe(
            map((resp: any) => resp.medico));
  }


  borrarMedico(id: string) {
    let url = URL_SERVICIOS + 'medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return  this.http.delete(url)
              .pipe(
                map((resp: any) => {
                  swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
                  return true;
                }));
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + 'medico';

    if (medico._id) {
      // actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, medico)
      .pipe(
        map((resp: any) => {
          swal('Medico actualizado', medico.nombre, 'success');
          return resp.body;
        }));
    } else {
      // creando
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, medico)
              .pipe(
                map((resp: any) => {
                  swal('Medico creado', medico.nombre, 'success');
                  return resp.body;
                }));
    }

  }

}
