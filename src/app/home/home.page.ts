import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
  public usuarioTemporariov1: IUsuario;
  public skeleton = true;
  public sucessoNaAtatualizacao: string;
  public debug: { updateApp: boolean; path: string };
  public environmentbaseUrl = environment.baseUrl;
  private subscriptions: Subscription[] = [];
  constructor(private dataService: DataService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.sucessoNaAtatualizacao = this.storageService.primeiroAcessoAposAtualizacao();
    this.listarUsuario();
    this.obterUsuarioLocalStorage();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(unsub => unsub.unsubscribe);
  }

  async listarUsuario() {
    const subValidarAtualizacao = this.storageService.validarAtualizarAppBehavior
      .subscribe((res) => {
        this.debug = res;
        const sub = this.dataService.listar(res.path).pipe(
          finalize(() => {
            this.skeleton = false;
          })).subscribe(usuario => {

            if (res.updateApp) {
              this.usuario = usuario;
              this.limparUsuarioLocal();
            } else if (!this.sucessoNaAtatualizacao) {
              this.salvarUsuarioLocalStorage(usuario);
            }

          });
        this.subscriptions.push(sub);
      });
    this.subscriptions.push(subValidarAtualizacao);
  }
  private limparUsuarioLocal() {
    const timeOut = setTimeout(() => {
      localStorage.removeItem('USUARIO');
      clearTimeout(timeOut);
      console.warn('Limpando usuario local deixando somente novo.');
      this.usuarioTemporariov1 = null;
    }, 3000);
  }
  private salvarUsuarioLocalStorage(res) {
    localStorage.setItem('USUARIO', JSON.stringify(res));
    this.obterUsuarioLocalStorage();
  }
  private obterUsuarioLocalStorage() {
    const usuarioStorage = localStorage.getItem('USUARIO');
    this.usuarioTemporariov1 = JSON.parse(usuarioStorage) as any;
  }


}
