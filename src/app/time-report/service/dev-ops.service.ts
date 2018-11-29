import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { merge, concat as c } from 'rxjs';
import { concat, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TogglService {
  // your collection url
  orgUrl = 'https://dev.azure.com/ntmedia/';

  // ideally from config
  token = 'l37xbspklczgxkfaqm5ax4kghu2pzmno7r246noc56e7c6cqyrcq';
  constructor(public http: HttpClient) {}

  public getToggleReport(
    apikey: string,
    fromDate: Date,
    toDate: Date,
    page = 1
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${apikey}:api_token`)
      })
    };
    return this.http.get('https://www.toggl.com/api/v8/me', httpOptions).pipe(
      concatMap((user:  any) => {
        const workspace = user.data.workspaces[0];
        return this.http
            .get(`https://toggl.com/reports/api/v2/details?user_agent="tmhack"&workspace_id=${workspace.id}&since=${fromDate.toISOString()}&until=${toDate.toISOString()}&page=${page}`,
              httpOptions);

      })
    );
  }


  getTasks(): Observable<any> {
    return this.http.get(`http://localhost:1460/api/values/`);
  }

  public getTaskInfo(id: number): Observable<any> {
    return this.http.get(`http://localhost:1460/api/values/${id}`);
  }
}
