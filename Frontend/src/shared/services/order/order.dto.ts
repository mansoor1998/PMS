export class GetCartDto {
    public id: number;
    public quantity: number;
    public medicineId: number;
    public medicineName: string;
    public medicineQuantity: number;
    public medicinePricePerUnit: number;
    public created: Date;
    public updated: Date;    
}

export class GetOrderDto {
    public customerName: string;
    public orderNumber: string;
    public orderStatus: string;
    public username: string;
    public orderItems: GetOrderItemDto[];

}

export class GetOrderItemDto {
    public  medicineName: string;
    public  quantity: number;
    public  batchCode: string;
    public  pricePerUnit: number;
}