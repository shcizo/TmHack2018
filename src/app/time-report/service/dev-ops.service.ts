import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevOpsService {

  constructor(public http: HttpClient) { }

  public getTaskById(id: number): Observable<any> {
      return this.http.get('https://dev.azure.com/ntmedia/DFS/_apis/wit/workitems?ids=17287&api-version=4.1');
  }
}
