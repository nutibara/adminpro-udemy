import { Component, OnInit } from '@angular/core';
import { CrearHospitalService } from './crear-hospital.service';
import { HospitalService } from '../../services/service.index';

// import * as _swal from 'sweetalert';
// import { SweetAlert } from 'sweetalert/typings/core';

// declare var swal: any;
import swal from 'sweetalert';

@Component({
  selector: 'app-crear-hospital',
  templateUrl: './crear-hospital.component.html',
  styles: []
})
export class CrearHospitalComponent implements OnInit {

  hospital = '';

  constructor(public _crearHospitalService: CrearHospitalService,
              public _hospitalService: HospitalService) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.hospital = '';
    this._crearHospitalService.ocultarModal();
  }

  crearHospital() {
    if (this.hospital.length === 0) {
      swal('Campo requerido', 'Nombre del hospital', 'error');
      return;
    }

    this._hospitalService.crearHospital(this.hospital)
          .subscribe((resp: any) => {
            this._crearHospitalService.notificacion.emit(resp);
            this.cerrarModal();
          });
  }

}
