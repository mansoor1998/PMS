import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Framework } from 'src/shared/framework';
import { ChangePassword } from 'src/shared/services/users/user.dto';
import { IUserService, UserService } from 'src/shared/services/users/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  public changePassword: FormGroup;

  constructor(private fb: FormBuilder, private framework: Framework, @Inject('IUserService') private userService: IUserService, private route:Router) { }

  ngOnInit(): void {
    this.changePassword = this.fb.group({
      previousPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required]]
    }, { validator: this.checkPasswords });
  }

  checkPasswords: ValidatorFn = (group: FormGroup):  ValidationErrors | null => { 
    let pass = group.get('newPassword')?.value;
    let confirmPass = group.get('repeatPassword')?.value;
    return  (pass != '' && confirmPass != '') && pass === confirmPass ? null : { mismatch: true }
  }

  get _previousPassword(){
    return this.changePassword.get('previousPassword');
  }

  get _newPassword(){
    return this.changePassword.get('newPassword');
  }

  get _repeatPassword(){
    return this.changePassword.get('repeatPassword');
  }

  onSubmit(){

    this.changePassword.markAllAsTouched();

    if(this.changePassword.valid){
      let data: ChangePassword = { newPassword: this.changePassword.get('newPassword')?.value, 
                   previousPassword: this.changePassword.get('previousPassword')?.value } as ChangePassword;

      // call api to change the password.
      this.userService.changePassword(data).subscribe(() => {
        this.framework.message.success('Password Changed', 'Your password has been changed');
        this.route.navigate(['/app/home']);
      }, (err: Error) => {
        console.error(err);
        this.framework.message.error(err.message, 'Password change failed');
      })
      
    }
  }

}
