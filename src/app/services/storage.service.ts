import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  public get validarAtualizarApp() {
    const { updateApp, path } = this.obterAtualizacaoCaminhoApiLocaStorage();
    if (!!updateApp) {
      this.setarAutalizacaoSucesso('true');
      return {
        updateApp,
        path
      };

    } else {
      this.setarAutalizacaoSucesso('false');
      return {
        updateApp,
        path: 'v1'
      };
    }

  }


  public primeiroAcessoAposAtualizacao() {
    return localStorage.getItem('UPDATE_SUCCESS');
  }
  private setarAutalizacaoSucesso(updatesucess) {
    localStorage.setItem('UPDATE_SUCCESS', updatesucess);
  }
  private obterAtualizacaoCaminhoApiLocaStorage() {
    return {
      path: localStorage.getItem('PATH_URL'),
      updateApp: localStorage.getItem('UPDATE_APP'),
    };
  }
}
