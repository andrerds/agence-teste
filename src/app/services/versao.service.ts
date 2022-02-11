import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IVersaoApp } from '../model/versao.app';

import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';

@Injectable({
  providedIn: 'root'
})
export class VersaoService {

  constructor(private http: HttpClient, private appVersion: AppVersion) { }

  async verificarAtualizacacao() {
    const versaoAtual = await this.versaoAppLocal(); // Env ou pegando pelo plugin AppVersion
    const versoes = await this.versao().toPromise();
    this.setarDataLocal(null, null);
    if (versaoAtual.appVersion < versoes.nova && versoes.minima < versaoAtual.appVersion) {
      this.setarDataLocal('true', 'v2');
      return console.log('Realizar update');
    }

    if (versaoAtual.appVersion < versoes.minima) {
      this.setarDataLocal('true', 'v2');
      return console.log('Update com urgenge versao muita antiga');
    }

    if (versaoAtual.appVersion === versoes.nova) {
      return console.log('App atualizado');
    }

  }

  versao(): Observable<IVersaoApp> {
    const url = `${environment.baseUrl}versaoapp`;
    return this.http.get<IVersaoApp>(url).pipe(take(1), map(res => res[0]));
  }
  private setarDataLocal(updateApp: string, pathUrl: string) {
    localStorage.setItem('UPDATE_APP', updateApp);
    localStorage.setItem('PATH_URL', pathUrl);
  }

  private async versaoAppLocal() {
    const appName = await this.appVersion.getAppName();
    const appVersion = await this.appVersion.getVersionNumber();

    return {
      appName,
      appVersion
    };
  }
}
