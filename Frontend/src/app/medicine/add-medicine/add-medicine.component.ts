import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCompanyComponent } from 'src/app/company/add-company/add-company.component';
import { CreateCompanyDto } from 'src/shared/services/company/company.dto';
import { CompanyService, ICompanyService } from 'src/shared/services/company/company.service';
import { CreateMedicineDto } from 'src/shared/services/medicine/medicine.dto';
import { IMedicineService, MedicineService } from 'src/shared/services/medicine/medicine.service';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {


  public medicine: FormGroup;
  public companies: CreateCompanyDto[];

  constructor(private fb: FormBuilder, 
    public dialogRef: MatDialogRef<AddCompanyComponent>,  
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    @Inject('ICompanyService') private companyService: ICompanyService,
    @Inject('IMedicineService') private medicineService: IMedicineService) { }

  ngOnInit(): void {

    this.medicine = this.fb.group({
      name: [
        '', [Validators.required]
      ],
      batchCode: [ '', [Validators.required] ],
      mgfDate: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      quantity: [0, [Validators.required]],
      pricePerUnit: [0.00, [Validators.required]],
      medicalCompanyId: [null , [Validators.required] ]
    });

    this.companyService.getall(0, 100, '').subscribe((data: {
      total: number,
      arrayList: CreateCompanyDto[]
    }) => {
      this.companies = data.arrayList;
    });

    if(this.data?.id){
      this.medicineService.getById(this.data.id).subscribe((result: CreateMedicineDto) => {
        console.log(result);
        this.medicine.patchValue({
          ...result
        });
        // Object.assign(this.medicine.value, result);
      });
    }
  }

  get _name(){
    return this.medicine.get('name');
  }

  get _batchCode(){
    return this.medicine.get('batchCode');
  }


  get _mgfDate(){
    return this.medicine.get('mgfDate');
  }

  get _expiryDate(){
    return this.medicine.get('expiryDate');
  }

  get _quantity(){
    return this.medicine.get('quantity');
  }

  get _price(){
    return this.medicine.get('price');
  }

  get _medicalCompanyId(){
    return this.medicine.get('medicalCompanyId');
  }

  public close(){
    this.dialogRef.close();
  }

  public onSubmit(){
    
    this.medicine.markAllAsTouched();

    if(this.medicine.valid){

      const medicine = this.medicine.value as CreateMedicineDto;

      if(this.data?.id){
        // debugger
        medicine.id = this.data.id;
        this.medicineService.update(medicine).subscribe(() => {
          this.dialogRef.close('ADD');
        })
        return;
      }
      // debugger;
      this.medicineService.create(medicine).subscribe(() => {
        this.dialogRef.close('ADD');
      });

      return;
    }
  }

}
