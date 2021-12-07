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

    constructor(private http: HttpClient, private framework: Framework){
        this.REMOTE_BASE_URL = AppConst.remoteServiceBaseUrl;
    }

    public getall() : Observable<{
        total: number,
        arrayList: CreateCompanyDto[]
    }> {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.framework.session.getToken('auth-token')
        });
        return this.http.get(this.REMOTE_BASE_URL + '/api/medicine/company/all', {headers}) as Observable<{
            total: number,
            arrayList: CreateCompanyDto[]
        }>;
    }
}