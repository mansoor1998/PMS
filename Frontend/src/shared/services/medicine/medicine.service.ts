import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConst } from "src/shared/AppConst";
import { Framework, mockData } from "src/shared/framework";
import { CreateMedicineDto } from "./medicine.dto";

export interface IMedicineService {
    getall(skip: number, max: number, search: string): Observable<{
        total: number,
        arrayList: CreateMedicineDto[]
    }>;

    getById(id: number): Observable <CreateMedicineDto>;

    delete(id: number): Observable<any>;

    create(data: CreateMedicineDto): Observable<any>;
    
    update(data: CreateMedicineDto): Observable<any>;
}


@Injectable({
    providedIn: 'root'
})
export class MedicineService implements IMedicineService {

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


@Injectable({
    providedIn: 'root'
})
export class MedicineServiceMock implements IMedicineService {

    getall(skip: number, max: number, search: string): Observable<{ total: number; arrayList: CreateMedicineDto[]; }> {
        const medicines = mockData.data['medicines'].filter(item => 
            item['name']?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase())
            || item['batchCode']?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase())
            || item['mgfDate']?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase())
            || item['expiryDate']?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase())
            || item['quantity'] == search
            || item['pricePerUnit'] == search
            || item['medicalCompanyName']?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase()))
        const result = medicines.slice(skip, skip + max);

        return new Observable((obs) => {
            obs.next({
                total: medicines?.length ? medicines?.length : 0,
                arrayList: result
            });
        });
    }

    getById(id: number): Observable<CreateMedicineDto> {
        
        const result = mockData.data['medicines'].find(item => item.id === id);
        const companyId = mockData.data['companies'].find(item => item.name === result.medicalCompanyName).id;

        const dto = new CreateMedicineDto();
        dto.batchCode = result.batchCode;
        dto.name = result.name;
        dto.mgfDate = result.mgfDate;
        dto.expiryDate = result.expiryDate;
        dto.quantity = result.quantity;
        dto.pricePerUnit = result.pricePerUnit;
        dto.medicalCompanyId = companyId;
        dto.medicalCompanyName = result.medicalCompanyName;

        return new Observable((obs) => {
            obs.next(dto);
        });
    }

    delete(id: number): Observable<any> {
        mockData.data['medicines'] = mockData.data['medicines'].filter(item => item.id !== id);
        return new Observable((obs) => {
            obs.next();
        });
    }

    create(data: CreateMedicineDto): Observable<any> {

        const medicineName = mockData.data['companies']?.find(x => x.id === data.medicalCompanyId)?.name;

        const highestId: number = mockData.data?.['medicines']?.map((x: any) => x?.id).reduce((x, acc) => Math.max(x, acc));
        mockData.data['medicines'].push({
            id: highestId + 1,
            batchCode: data.batchCode,
            name: data.name,
            mgfDate: data.mgfDate,
            expiryDate: data.expiryDate,
            quantity: data.quantity,
            pricePerUnit: data.pricePerUnit,
            medicalCompanyId: data.medicalCompanyId,
            medicalCompanyName: medicineName
        });
        return new Observable((obs) => {
            obs.next();
        });
    }

    update(data: CreateMedicineDto): Observable<any> {
        // console.log(data);
        const result = mockData.data['medicines'].find(item => item.id === data.id);
        const company = mockData.data['companies'].find(item => item.id === data.medicalCompanyId);

        result.batchCode = data.batchCode;
        result.name = data.name;
        result.mgfDate = data.mgfDate;
        result.expiryDate = data.expiryDate;
        result.quantity = data.quantity;
        result.pricePerUnit = data.pricePerUnit;
        result.medicalCompanyId = company.id;
        result.medicalCompanyName = company.name;

        return new Observable((obs) => {
            obs.next();
        });
    }

}