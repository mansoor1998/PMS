import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateCompanyDto } from 'src/shared/services/company/company.dto';
import { CompanyComponent } from '../company.component';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  public company: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddCompanyComponent>,  @Inject(MAT_DIALOG_DATA) private data: { id: number }) { }

  ngOnInit(): void {
    this.company = this.fb.group({
      name: ['', [
        Validators.required,
        // Validators.pattern('[A-Za-z0-9]{5,}')
      ]],
      description: ['', [
        // Validators.required,
        // Validators.minLength(8)
      ]]
    });

    if ( this.data?.id ){
      // load the data from ther server and edit it.
      console.log('ther server will load the data.');
    }
  }

  get _name(){
    return this.company.get('name');
  }

  get _description(){
    return this.company.get('description'); 
  }

  onSubmit(){
    if(this.company.valid){
      // just call a service and pass the data.
      let data = this.company.value as (CreateCompanyDto);
      this.dialogRef.close();
      return;
    }

    this.company.markAsTouched();
  }

}
