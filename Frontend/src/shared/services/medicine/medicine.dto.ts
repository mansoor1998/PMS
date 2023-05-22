
export class CreateMedicineDto{
    public id: number;
    public name: string;
    public batchCode: string;
    public mgfDate: Date;
    public expiryDate: Date;
    public quantity: number;
    public pricePerUnit: number;
    public medicalCompanyId: number;
    public medicalCompanyName: string;
}
