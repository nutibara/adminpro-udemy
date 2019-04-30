import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { HospitalService } from 'src/app/services/service.index';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { CrearHospitalService } from '../../components/crear-hospital/crear-hospital.service';

declare var swal: any;
// const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando = true;

  constructor(public _hospitalService: HospitalService,
              public _modalUploadService: ModalUploadService,
              public _crearHospital: CrearHospitalService) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
    .subscribe(resp => this.cargarHospitales());

    this._crearHospital.notificacion
    .subscribe(resp => this.cargarHospitales());
  }

  actualizarImagen( id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  mostrarModalCrearHospital() {
    this._crearHospital.mostrarModal();
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
            .subscribe((hospitales: any) => {
              this.hospitales = hospitales;
              this.cargando = false;
            });
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this._hospitalService.buscarHospitales(termino)
          .subscribe((hospitales: Hospital[]) => {
            this.hospitales = hospitales;
            this.cargando = false;
          });
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar: any) => {
      if (borrar) {
       this._hospitalService.borrarHospital(hospital._id)
                 .subscribe(() => this.cargarHospitales());
      }
    });
  }

  guardarHospital(hospital: Hospital) {
      this._hospitalService.actualizarHospital(hospital)
              .subscribe();
  }

}
