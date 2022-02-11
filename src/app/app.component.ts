import { Component, OnInit } from '@angular/core';
import { VersaoService } from './services/versao.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private versaoService: VersaoService) { }
  ngOnInit(): void {
    this.versaoService.verificarAtualizacacao();
  }


}
