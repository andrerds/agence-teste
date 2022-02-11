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
  public sucessoAtualizacao;
  private subscriptions: Subscription[] = [];
  constructor(private dataService: DataService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.sucessoAtualizacao = this.storageService.primeiroAcessoAposAtualizacao();
    this.listarUsuario();
    this.obterUsuarioLocalStorage();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(unsub => unsub.unsubscribe);
  }

  async listarUsuario() {

    this.storageService.validarAtualizarAppBehavior.pipe()
      .subscribe((res) => {
        const sub = this.dataService.listar(res.path).pipe(finalize(() => {
          this.skeleton = false;
        })).subscribe(async usuario => {
          if (res.updateApp) {
            this.usuario = usuario;
            this.limparUsuarioLocal();
          } else if (!this.sucessoAtualizacao) {
            this.salvarUsuarioLocalStorage(usuario);
          }
        });
        this.subscriptions.push(sub);
      });
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
