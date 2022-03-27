import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConst } from "src/shared/AppConst";
import { Framework } from "src/shared/framework";
import { CreateCompanyDto } from "./company.dto";


@Injectable({
    providedIn: 'root'
})
export class CompanyService{

    private REMOTE_BASE_URL = '';
    private headers: HttpHeaders;

    constructor(private http: HttpClient, private framework: Framework){
        this.REMOTE_BASE_URL = AppConst.remoteServiceBaseUrl;
        this.headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.framework.session.getToken('auth-token')
        });
    }

    public getall(skip: number = 0, max: number = 10, search: string = '') : Observable<{
        total: number,
        arrayList: CreateCompanyDto[]
    }> {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.framework.session.getToken('auth-token')
        });
        return this.http.get(this.REMOTE_BASE_URL + `/api/medicine/company/all?skip=${skip}&max=${max}&search=${search}`, {headers}) as Observable<{
            total: number,
            arrayList: CreateCompanyDto[]
        }>;
    }

    public getById(id: number): Observable <CreateCompanyDto> {
        return this.http.get(this.REMOTE_BASE_URL + `/api/medicine/company/${id}`, {headers: this.headers}) as Observable<CreateCompanyDto>;
    }

    public delete(id: number): Observable<any>{
        return this.http.delete(this.REMOTE_BASE_URL + `/api/medicine/company/${id}`, {headers: this.headers});
    }

    public create(data: CreateCompanyDto): Observable<any> {
        return this.http.post( this.REMOTE_BASE_URL + '/api/medicine/company', data, {headers: this.headers});
    }

    public update(data: CreateCompanyDto): Observable<any>{
        return this.http.put( this.REMOTE_BASE_URL + `/api/medicine/company`, data, {headers: this.headers} );
    }
}