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
    public customerName;
    public orderNumber;
    public orderStatus;
    public orderItems: GetOrderItemDto[];

}

export class GetOrderItemDto {
    public  medicineName: string;
    public  quantity: string;
    public  batchCode: string;
    public  pricePerUnit: number;
}