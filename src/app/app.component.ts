import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { VersaoService } from './services/versao.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private versaoService: VersaoService, private storageService: StorageService) { }
  async ngOnInit() {
    await this.versaoService.verificarAtualizacacao();
    await this.storageService.validarAtualizarApp();
  }


}
