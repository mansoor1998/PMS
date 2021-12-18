import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConst } from "src/shared/AppConst";
import { Framework } from "src/shared/framework";
import { CreateMedicineDto } from "../medicine/medicine.dto";
import { GetCartDto, GetOrderDto } from "./order.dto";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private REMOTE_BASE_URL = '';
    private headers;

    constructor(private http: HttpClient, private framework: Framework){
        this.REMOTE_BASE_URL = AppConst.remoteServiceBaseUrl;
        this.headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.framework.session.getToken('auth-token')
        });
    }

    public addToCart(product: { quantity: number, medicineId: number }): Observable<CreateMedicineDto> {
        return this.http.post(this.REMOTE_BASE_URL + '/api/order/add', product, {headers: this.headers}) as Observable<CreateMedicineDto>;
    }

    public getByOrderNumber(orderNumber: string) : Observable<GetOrderDto> {
        return this.http.get(this.REMOTE_BASE_URL + `/api/order/${orderNumber}`, {headers: this.headers}) as Observable<GetOrderDto>;
    }

    public getAllCarts(skip: number = 0, max: number = 10): Observable<{
        total: number,
        arrayList: GetCartDto[]
    }>{
        return this.http.get(this.REMOTE_BASE_URL + '/api/order/carts', { headers: this.headers }) as Observable<{
            total: number,
            arrayList: GetCartDto[]
        }>;
    }

    public deleteCart(id: number): Observable<any> {
        return this.http.delete(this.REMOTE_BASE_URL + `/api/order/cart/${id}`, { headers: this.headers });
    }

    public create(order: { customerName: string }): Observable<{ orderNumber: string }> {
        return this.http.post(this.REMOTE_BASE_URL + `/api/order`, order, { headers: this.headers } ) as Observable<{ orderNumber: string }>;
    }


    public getSalesReport(date: { from: Date, to: Date }) : Observable<GetOrderDto[]> {
        return this.http.post(this.REMOTE_BASE_URL + `/api/order/report`, date, {headers: this.headers}) as Observable<GetOrderDto[]>;   
    }

}