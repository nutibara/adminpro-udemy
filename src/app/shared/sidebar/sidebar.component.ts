import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;
  constructor(public _SB: SidebarService,
              public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

}
