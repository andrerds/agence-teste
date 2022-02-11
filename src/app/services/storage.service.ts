import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  public get validarAtualizarApp() {
    const { updateApp, path } = this.obterAtualizacaoCaminhoApiLocaStorage();
    let autalizarPath = null;

    if (updateApp === 'true') {
      this.setarAutalizacaoSucesso('true');
      return autalizarPath = path;

    } else {
      this.setarAutalizacaoSucesso('false');
      return autalizarPath = 'v1';
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
