import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IUsuario } from '../model/usuario';
import { DataService } from '../services/data.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public usuario: IUsuario;
  public usuarioTem: IUsuario;
  public skeleton = true;
  public sucessoAtualizacao = false;
  private subscriptions: Subscription[] = [];
  constructor(private dataService: DataService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.listarUsuario();
    this.obterUsuarioLocalStorage();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(unsub => unsub.unsubscribe);
  }

  async listarUsuario() {
    const path = this.storageService.validarAtualizarApp;
    const sub = this.dataService.listar(path).pipe(finalize(() => {
      this.skeleton = false;
    })).subscribe(async res => {
      const sucessoAtualizacao = this.storageService.primeiroAcessoAposAtualizacao();
      if (sucessoAtualizacao === 'true') {
        this.usuario = res;
        this.sucessoAtualizacao = true;
        this.limparUsuarioLocal();
      } else {
        this.salvarUsuarioLocalStorage(res);
      }
    });

    this.subscriptions.push(sub);
  }
  private obterUsuarioLocalStorage() {
    const usuarioStorage = localStorage.getItem('USUARIO');
    this.usuarioTem = JSON.parse(usuarioStorage) as any;
  }
  private salvarUsuarioLocalStorage(res) {
    localStorage.setItem('USUARIO', JSON.stringify(res));
    this.obterUsuarioLocalStorage();
  }
  private limparUsuarioLocal() {
    const timeOut = setTimeout(() => {
      localStorage.removeItem('USUARIO');
      clearTimeout(timeOut);
      console.warn('Limpando usuario local deixando somente novo.');
      this.usuarioTem = null;
    }, 3000);
  }
}
