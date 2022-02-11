/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private validarAtualizarApp$: BehaviorSubject<{ updateApp: boolean; path: string }> =
    new BehaviorSubject({ updateApp: false, path: 'v1' });
  public validarAtualizarAppBehavior = this.validarAtualizarApp$.asObservable();
  constructor() { }

  public async validarAtualizarApp() {
    const caminhoApiLocaStorage = this.obterAtualizacaoCaminhoApiLocaStorage();
    if (caminhoApiLocaStorage.updateApp === 'true') {
      this.setarAutalizacaoSucesso('true');
      return this.validarAtualizarApp$.next({ updateApp: true, path: caminhoApiLocaStorage?.path });

    } else {
      return this.validarAtualizarApp$.next({ updateApp: false, path: 'v1' });

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
