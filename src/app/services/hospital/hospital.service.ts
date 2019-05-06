import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';

// import * as _swal from 'sweetalert';
// import { SweetAlert } from 'sweetalert/typings/core';
import { UsuarioService } from '../usuario/usuario.service';

// const swal: SweetAlert = _swal as any;

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) {
               }

  cargarHospitales() {
    const url = URL_SERVICIOS + 'hospital';

    return this.http.get(url)
              .pipe(
                map((resp: any) => {
                  this.totalHospitales = resp.total;
                  return resp.hospitales;
                } ));
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + 'hospital/' + id;

    return this.http.get(url)
                  .pipe(
                    map((resp: any) => resp.hospital)
                  );
  }

  buscarHospitales(termino: string) {
    const url = URL_SERVICIOS + 'busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
          .pipe(
            map((resp: any) => resp.hospitales));
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + 'hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return  this.http.delete(url)
              .pipe(
                map((resp: any) => {
                  swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
                  return true;
                }));
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + 'hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, {nombre})
                      .pipe(
                          map((resp: any) => {
                            swal('Hospital creado ', nombre, 'success');
                            return resp.hospital;
                          }));
   }

   actualizarHospital(hospital: Hospital) {
     let url = URL_SERVICIOS + 'hospital/' + hospital._id;
     url += '?token=' + this._usuarioService.token;

     return this.http.put(url, hospital)
         .pipe(
          map((resp: any) => {
            swal('Hospital actualizado', hospital.nombre, 'success');
            return true;
          }));
   }
}

