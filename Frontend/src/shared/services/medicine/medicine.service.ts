import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConst } from "src/shared/AppConst";
import { Framework } from "src/shared/framework";
import { CreateMedicineDto } from "./medicine.dto";

@Injectable({
    providedIn: 'root'
})
export class MedicineService{

    private REMOTE_BASE_URL = '';
    private headers;

    constructor(private http: HttpClient, private framework: Framework){
        this.REMOTE_BASE_URL = AppConst.remoteServiceBaseUrl;
        this.headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.framework.session.getToken('auth-token')
        });
    }

    public getall(skip: number = 0, max: number = 10, search: string = '') : Observable<{
        total: number,
        arrayList: CreateMedicineDto[]
    }> {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.framework.session.getToken('auth-token')
        });
        console.log(search);
        return this.http.get(this.REMOTE_BASE_URL + `/api/medicine/all?skip=${skip}&max=${max}&search=${search}`, {headers}) as Observable<{
            total: number,
            arrayList: CreateMedicineDto[]
        }>;
    }

    public getById(id: number): Observable <CreateMedicineDto> {
        return this.http.get(this.REMOTE_BASE_URL + `/api/medicine/${id}`, {headers: this.headers}) as Observable<CreateMedicineDto>;
    }

    public delete(id: number): Observable<any>{
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.framework.session.getToken('auth-token')
        });

        return this.http.delete(this.REMOTE_BASE_URL + `/api/medicine/${id}`, {headers});
    }

    public create(data: CreateMedicineDto): Observable<any> {
        return this.http.post( this.REMOTE_BASE_URL + '/api/medicine', data, {headers: this.headers});
    }

    public update(data: CreateMedicineDto): Observable<any>{
        return this.http.put( this.REMOTE_BASE_URL + `/api/medicine`, data, {headers: this.headers} );
    }
}