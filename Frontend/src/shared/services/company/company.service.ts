import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConst } from "src/shared/AppConst";
import { Framework, mockData } from "src/shared/framework";
import { CreateCompanyDto } from "./company.dto";


export interface ICompanyService {
    getall(skip: number, max: number, search: string): Observable<{
        total: number,
        arrayList: CreateCompanyDto[]
    }>;

    getById(id: number): Observable <CreateCompanyDto>;

    delete(id: number): Observable<any>;

    create(data: CreateCompanyDto): Observable<any>;
    
    update(data: CreateCompanyDto): Observable<any>;
}


@Injectable({
    providedIn: 'root'
})
export class CompanyService implements ICompanyService {

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


@Injectable({
    providedIn: 'root'
})
export class CompanyServiceMock implements ICompanyService {
    
    getall(skip: number, max: number, search: string): Observable<{ total: number; arrayList: CreateCompanyDto[]; }> {
        const users = mockData.data['companies'].filter(item => 
            item['name']?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase())
            || item['description']?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase()));
        const result = users.slice(skip, skip + max);
          
        return new Observable((obs) => {
            obs.next({
                total: users?.length ? users?.length : 0,
                arrayList: result
            });
        });
    }

    getById(id: number): Observable<CreateCompanyDto> {
        const result = mockData.data['companies'].find(item => item.id === id);
        const dto = new CreateCompanyDto();
        dto.description = result.description;
        dto.name = result.name;
        dto.id = result.id;
        return new Observable((obs) => {
            obs.next(dto);
        });
    }

    delete(id: number): Observable<any> {
        mockData.data['companies'] = mockData.data['companies'].filter(item => item.id !== id);
        return new Observable((obs) => {
            obs.next();
        });
    }

    create(data: CreateCompanyDto): Observable<any> {
        const highestId: number = mockData.data?.['companies']?.map((x: any) => x?.id).reduce((x, acc) => Math.max(x, acc));
        mockData.data['companies'].push({
            id: highestId + 1,
            name: data.name,
            desciption: data.description
        });
        return new Observable((obs) => {
            obs.next();
        });
    }

    update(data: CreateCompanyDto): Observable<any> {
        const result = mockData.data['companies'].find(item => item.id === data.id);
        result.name = data.name;
        result.description = data.description;
        return new Observable((obs) => {
            obs.next();
        });
    }

}