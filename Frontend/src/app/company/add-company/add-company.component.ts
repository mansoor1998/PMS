import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateCompanyDto } from 'src/shared/services/company/company.dto';
import { CompanyService } from 'src/shared/services/company/company.service';
import { CompanyComponent } from '../company.component';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  public company: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddCompanyComponent>,  
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }) { }

  ngOnInit(): void {
    this.company = this.fb.group({
      name: ['', [
        Validators.required,
        // Validators.pattern('[A-Za-z0-9]{5,}')
      ]],
      description: ['']
    });

    console.log(this.data); 

    if(this.data?.id){
      this.companyService.getById(this.data.id).subscribe((result: CreateCompanyDto) => {
        this.company.patchValue({
          ...result
        });
      });
    }
  }

  get _name(){
    return this.company.get('name');
  }

  get _description(){
    return this.company.get('description'); 
  }

  onSubmit(){

    this.company.markAllAsTouched();

    if(this.company.valid){

      const company = this.company.value as CreateCompanyDto;

      // edit the data.
      if(this.data?.id){
        // debugger
        company.id = this.data.id;
        this.companyService.update(company).subscribe(() => {
          this.dialogRef.close('ADD');
        })
        return;
      }

      // create the data.
      this.companyService.create(company).subscribe(() => {
        this.dialogRef.close('ADD');
      });

      this.dialogRef.close();
      return;
    }

    this.company.markAsTouched();
  }

}
