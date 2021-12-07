
export class CreateMedicineDto{
    public id: number;
    public name: string;
    public batchCode: string;
    public mgfDate: Date;
    public exipiryDate: Date;
    public qunatity: number;
    public pricePerUnit: number;
    public medicalCompanyId: number;
    public medicalComapnyName: string;
}
