import {Injectable, InjectionToken, Type} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpResponseBase} from '@angular/common/http';
import {Framework, mockData} from '../../framework';
import {catchError} from 'rxjs/operators';
import {AppConst} from '../../AppConst';
import { AppSessionDto, AuthDto, ChangePassword, CreateUserDto, GetUserDto } from './user.dto';


export interface IUserService {
  create(user: CreateUserDto);

  getUserConfiguration(): Observable<AppSessionDto> | any;

  login(user: AuthDto): Observable<{ jwt: string }> | any;

  getAll(skip: number, max: number, search: string): Observable<{ total: number, arrayList: GetUserDto[]}>;

  getAllRoles(): Observable<string[]>;

  changePassword(changePassword: ChangePassword);
}


// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {

  private REMOTE_BASE_URL = '';
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private framework?: Framework) {
    this.REMOTE_BASE_URL = AppConst.remoteServiceBaseUrl;
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.framework.session.getToken('auth-token')
    });
  }

  public create(user: CreateUserDto) {
    // console.log(user);
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
    return this.http.post(this.REMOTE_BASE_URL + `/api/user/change-password`, changePassword , { headers: this.headers });
  }


}

@Injectable({
  providedIn: 'root'
})
export class UserServiceMock implements IUserService {
  
  create(user: CreateUserDto) {
    // add the user inside the list
    const highestId: number = mockData.data?.['users']?.['all']?.map((x: any) => x?.id).reduce((x, acc) => Math.max(x, acc));

    (mockData.data['users']['all'] as any[]).push({
      "id": highestId + 1,
      "name": user.name,
      "username": user.username,
      "contact": user.contact,
      "gender": user.gender,
      "roleId": 1,
      "roleName": "Admin"
    });

    return new Observable((obs) => {
      obs.next(true);
    });
  }

  getUserConfiguration(): Observable<AppSessionDto> | any {
    const appSession: AppSessionDto = mockData.data['userConfiguration'] as AppSessionDto;
    return new Observable((obs) => {
      obs.next(appSession);
    });
  }
  
  login(user: AuthDto) {
    const username = mockData.data['userConfiguration']?.username as string;
    if(username !== user.username){
      return new Observable((obs) => {
        obs.next();
      })
    } 

    localStorage.setItem('isLogged', 'true');
    return new Observable((obs) => {
      obs.next({
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluIiwibmFtZWlkIjoiMiIsIm5iZiI6MTY4NDY4MTg0NywiZXhwIjoxNjg1Mjg2NjQ3LCJpYXQiOjE2ODQ2ODE4NDd9.Yans5TEJqWkv9nbZPWiVam4nYLBULMw9o1QUf3bFljA'
      });
    });
  }
  
  getAll(skip: number, max: number, search: string): Observable<{ total: number; arrayList: GetUserDto[]; }> {
    const users = mockData.data['users']['all'].filter(item => 
      item['name']?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase())
      || item['username']?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase())
      || item['contact']?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase())
      || item['roleName']?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase()));;
    const result = users.slice(skip, skip + max);
    return new Observable((obs) => {
      obs.next({
        total: users?.length ? users?.length : 0,
        arrayList: result
      });
    });
  }
  
  getAllRoles(): Observable<string[]> {
    let roles = [];
    try{
      roles = [mockData.data['users']['all'][0]['roleName']];
    } catch(e){

    }
    return new Observable((obs) => {
      obs.next(roles);
    });
  }
  
  changePassword(changePassword: ChangePassword) {
    return new Observable((obs) => {
      obs.next();
    });
  }
}
