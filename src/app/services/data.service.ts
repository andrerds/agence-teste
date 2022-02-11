import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../model/usuario';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  listar(path?): Observable<IUsuario> {
    const url = `${environment.baseUrl}${path}`;
    return this.http.get<IUsuario>(url).pipe(take(1), map(res => res[0]));
  };

}
