import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateUserDto } from 'src/shared/services/users/user.dto';
import { IUserService, UserService } from 'src/shared/services/users/user.service';

@Component({
  selector: 'app-add-pharmacist',
  templateUrl: './add-pharmacist.component.html',
  styleUrls: ['./add-pharmacist.component.css']
})
export class AddPharmacistComponent implements OnInit {

  public user: FormGroup;
  public roles: string[] = [];

  constructor(private fb: FormBuilder, 
    public dialogRef: MatDialogRef<AddPharmacistComponent>,  
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    @Inject('IUserService') private userService: IUserService) { }

  ngOnInit(): void {
    // this.userService.getAllRoles().subscribe((data: string[]) => {
    //   this.roles = data;
    // });

    this.user = this.fb.group({
      username: ['', Validators.required],
      contact: ['', Validators.required],
      gender: [true, Validators.required],
      password: [{value: '', disabled: true}, Validators.required],
      name: ['', Validators.required]
      // confirmPassword: ['']
    });

    // Have to make random password generator.
    this._password.setValue('mansoor123');
  }

  get _username(){
    return this.user.get('username');
  }

  get _contact(){
    return this.user.get('contact');
  }

  get _gender(){
    return this.user.get('gender');
  }

  get _password(){
    return this.user.get('password');
  }

  get _confirmPassword(){
    return this.user.get('confirmPassword');
  }

  get _name(){
    return this.user.get('name');
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit(){
    this.user.markAllAsTouched();

    // console.log(this.user.value);
    if(this.user.valid){
      const user: CreateUserDto = this.user.getRawValue() as CreateUserDto;

      // if(this.data?.id){
      //   // debugger
      //   user.id = this.data.id;
      //   this.medicineService.update(medicine).subscribe(() => {
      //     this.dialogRef.close('ADD');
      //   })
      //   return;
      // }
      // debugger;
      this.userService.create(user).subscribe(() => {
        this.dialogRef.close('ADD');
      });

      return;
    }
  }

  copyToClipboard(){
    // this.copyToClipboard.copy(this._password.value)
  }

}
