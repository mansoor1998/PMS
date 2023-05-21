import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConst } from "src/shared/AppConst";
import { Framework, mockData } from "src/shared/framework";
import { CreateMedicineDto } from "../medicine/medicine.dto";
import { GetCartDto, GetOrderDto } from "./order.dto";

export interface IOrderService {
    addToCart(product: { quantity: number, medicineId: number }): Observable<CreateMedicineDto>;

    getByOrderNumber(orderNumber: string) : Observable<GetOrderDto>;

    getAllCarts(skip: number, max: number): Observable<{
        total: number,
        arrayList: GetCartDto[]
    }>;

    deleteCart(id: number): Observable<any>

    create(order: { customerName: string }): Observable<{ orderNumber: string }>;

    getSalesReport(date: { from: Date, to: Date }) : Observable<GetOrderDto[]>;

    getWidgetsData();

    getDailySales();
}


@Injectable({
    providedIn: 'root'
})
export class OrderService implements IOrderService {
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

    public getWidgetsData(){
        return this.http.get(this.REMOTE_BASE_URL + `/api/order/widgets-data`, {headers: this.headers});
    }

    public getDailySales() : Observable<{ created: Date, count: number }[]> {
        return this.http.get(this.REMOTE_BASE_URL + '/api/order/daily-sales', { headers: this.headers }) as Observable<{ created: Date, count: number }[]>;
    }

}


@Injectable({
    providedIn: 'root'
})
export class OrderServiceMock implements IOrderService {
    addToCart(product: { quantity: number; medicineId: number; }): Observable<CreateMedicineDto> {
        return new Observable((obs) => {
            obs.next();
        })
    }
    getByOrderNumber(orderNumber: string): Observable<GetOrderDto> {
        return new Observable((obs) => {
            obs.next();
        })
    }
    getAllCarts(skip: number, max: number): Observable<{ total: number; arrayList: GetCartDto[]; }> {
        return new Observable((obs) => {
            obs.next({
                total: mockData.data['carts'].length,
                arrayList: mockData.data['carts']
            });
        })
    }
    deleteCart(id: number): Observable<any> {
        return new Observable((obs) => {
            obs.next();
        })
    }

    create(order: { customerName: string; }): Observable<{ orderNumber: string; }> {
        return new Observable((obs) => {
            obs.next();
        })
    }

    getSalesReport(date: { from: Date; to: Date; }): Observable<GetOrderDto[]> {
       const sales = mockData.data['orders']['salesReport'];
        return new Observable((obs) => {
            obs.next(sales); 
        });
    }

    getWidgetsData() {
        const data = mockData.data['orders']['widgetsData'];
        return new Observable((obs) => {
            obs.next(data);
        });
    }

    getDailySales() {
        return new Observable((obs) => {
            obs.next();
        })
    }

}