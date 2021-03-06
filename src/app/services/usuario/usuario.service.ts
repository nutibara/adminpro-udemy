import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

// import * as _swal from 'sweetalert';
// import { SweetAlert } from 'sweetalert/typings/core';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import {  Observable } from 'rxjs';
import swal from 'sweetalert';
// const swal: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Usuario logueado
  usuario: Usuario;

  // token de usuario logueado
  token: string;

  role: string;

  menu: any[] = [];

  constructor(public http: HttpClient,
              public router: Router,
              public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
   }

   renuevaToken() {
       let url = URL_SERVICIOS + 'login/renuevatoken';
       url += '?token=' + this.token;

       return this.http.get(url)
       .pipe(
        map((resp: any) => {
            this.token = resp.token;
            localStorage.setItem('token', this.token);
            console.log('token renovado');
            return true;
        }),
        catchError ( err => {
            this.logout();
            swal('No se pudo renovar el token', 'No es posible renobar el token', 'error');
            // return throwError(err);
            return new Observable<any>();
        })
        );

   }

   estaLogueado() {
     return (this.token.length > 5) ? true : false;
   }

   cargarStorage() {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
        this.menu = JSON.parse(localStorage.getItem('menu'));
      } else {
        this.token = '';
        this.usuario = null;
        this.menu = [];
      }
   }

   guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
   }

   logout() {
     this.usuario = null;
     this.token = '';
     this.menu = [];

     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('menu');

     this.router.navigate(['/login']);
   }

   loginGoogle(token: string) {
       const url = URL_SERVICIOS + 'login/google';

       return this.http.post(url, {token})
               .pipe(
                map((resp: any) => {
                    this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                    console.log(resp);
                    return true;
        }));
   }

   login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + 'login';

    return this.http.post(url, usuario)
            .pipe(
             map((resp: any) => {
                 this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                 return true;
            }),
            catchError ( err => {
                swal('Error en el login', err.error.mensaje, 'error');
                // return throwError(err);
                return new Observable<any>();
            })
            );

   }

   crearUsuario( usuario: Usuario) {
    const url = URL_SERVICIOS + 'usuario';

    return this.http.post(url, usuario)
                      .pipe(
                          map((resp: any) => {
                            swal('Usuario creado ', usuario.email, 'success');
                            return resp.usuario;
                          }),
                          catchError ( err => {
                            swal(err.error.mensaje, err.error.errors.message, 'error');
                             // return throwError(err);
                            return new Observable<any>();
                        })
                        );
   }

   actualizarUsuario(usuario: Usuario) {
     let url = URL_SERVICIOS + 'usuario/' + usuario._id;
     url += '?token=' + this.token;

     return this.http.put(url, usuario)
         .pipe(
          map((resp: any) => {

            if (usuario._id === this.usuario._id) {
              const usrDB: Usuario = resp.body;
              this.guardarStorage(usuario._id, this.token, usrDB, this.menu);
            }

            swal('Usuario actualizado', usuario.nombre, 'success');

            return true;
          }),
            catchError ( err => {
                        swal(err.error.mensaje, err.error.errors.message, 'error');
                        return throwError(err);
                    })
                    );
   }

   // cambiar imagen de usuario logueado
   cambiarImagen(archivo: File, id: string) {
      this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
          .then( (resp: any) => {
              console.log(resp);
              this.usuario.img = resp.usuario.img;
              swal('Imagen actualizada', this.usuario.nombre, 'success');
              this.guardarStorage(id, this.token, this.usuario, this.menu);
          })
          .catch( resp => {
            console.log(resp);
          });
   }

   cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + 'usuario?desde=' + desde;

    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + 'busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url)
          .pipe(
            map((resp: any) => resp.usuarios));
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + 'usuario/' + id;
    url += '?token=' + this.token;

    return  this.http.delete(url)
              .pipe(
                map((resp: any) => {
                  swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
                  return true;
                }));
  }


}
