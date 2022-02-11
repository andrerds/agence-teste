import { Component, Input, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {

  @Input() usuarioData: IUsuario;
  @Input() skeleton = false;
  constructor() { }

  ngOnInit() { }

}
