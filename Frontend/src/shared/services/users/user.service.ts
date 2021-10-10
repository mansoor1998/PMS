import {Injectable, InjectionToken, Type} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpResponseBase} from '@angular/common/http';
import {Framework} from '../../framework';
import {catchError} from 'rxjs/operators';
import {AppConst} from '../../AppConst';


// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private REMOTE_BASE_URL = '';

  constructor(private http: HttpClient, private framework?: Framework) {
    this.REMOTE_BASE_URL = AppConst.remoteServiceBaseUrl;
  }

  public getUserConfiguration(): Observable<AppSessionDto> | any{
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.framework.session.getToken('auth-token')
    });
    return this.http.get(this.REMOTE_BASE_URL + '/api/user/GetUserConfiguration', {headers}).pipe(
      catchError((err: HttpErrorResponse) => {
        this.framework.preLoader.remove();
        if (this.framework) { this.framework.message.error('Internal Server Error', 'The server did not respond'); }
        return throwError(err);
      })
    );
  }

  public login(user: AuthDto): Observable<{ jwt: string }> | any{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': 'Bearer ' + this.framework.session.getToken()
    });
    return this.http.post(this.REMOTE_BASE_URL + '/api/user/authenticate', user, { headers }).pipe(
      catchError((err: HttpErrorResponse) => {
        if (this.framework) { this.framework.message.error('Internal Server Error', 'The server did not respond'); }
        return throwError(err);
      })
    );
  }

}


export class AppSessionDto{
  public  userId: number;
  public  username: string;
  public  name: string;
  public  roleName: string;
  public  allRoles: string[];
}

export class AuthDto{
  public username: string | undefined;
  public password: string | undefined;
}
