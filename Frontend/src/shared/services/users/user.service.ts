import {Injectable, InjectionToken, Type} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpResponseBase} from '@angular/common/http';
import {Framework} from '../../framework';
import {catchError} from 'rxjs/operators';
import {AppConst} from '../../AppConst';
import { AppSessionDto, AuthDto, ChangePassword, CreateUserDto, GetUserDto } from './user.dto';


// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private REMOTE_BASE_URL = '';
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private framework?: Framework) {
    this.REMOTE_BASE_URL = AppConst.remoteServiceBaseUrl;
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.framework.session.getToken('auth-token')
    });
  }

  public create(user: CreateUserDto) {
    console.log(user);
    return this.http.post(this.REMOTE_BASE_URL + '/api/user', user, {headers: this.headers});
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

  public getAll(skip: number = 0, max: number = 10, search: string = ''): Observable<{ total: number, arrayList: GetUserDto[]}> {
    return this.http.get(this.REMOTE_BASE_URL + `/api/user?skip=${skip}&max=${max}&search=${search}`, { headers: this.headers }) as Observable<{ total: number, arrayList: GetUserDto[]} >;
  }

  public getAllRoles(): Observable<string[]>{
    return this.http.get(this.REMOTE_BASE_URL + '/api/user/roles', { headers: this.headers }) as Observable<string[]>;
  }

  public changePassword(changePassword: ChangePassword){
    return this.http.post(this.REMOTE_BASE_URL + `/api/user/ChangePassword`, changePassword , { headers: this.headers });
  }


}


