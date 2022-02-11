import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IVersaoApp } from '../model/versao.app';

import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class VersaoService {

  constructor(private http: HttpClient, private appVersion: AppVersion, private platform: Platform) { }

  async verificarAtualizacacao() {
    const versoes = await this.versao().toPromise();
    this.setarDataLocal(null, null);
    let versao = null;
    const versaoAtualEnv = environment.appVersion; // Env ou pegando pelo plugin AppVersion
    if (this.platform.is('android') || this.platform.is('ios')) {
      const versaoAtualPlugin = await this.versaoAppLocal();
      versao = versaoAtualPlugin.appVersion;
    } else {
      versao = versaoAtualEnv;
    }

    if (versao < versoes.nova && versoes.minima < versao) {
      this.setarDataLocal('true', 'v2');
      return console.log('Realizar update');
    }

    if (versao < versoes.minima) {
      this.setarDataLocal('true', 'v2');
      return console.log('Update com urgenge versao muita antiga');
    }

    if (versao === versoes.nova) {
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
