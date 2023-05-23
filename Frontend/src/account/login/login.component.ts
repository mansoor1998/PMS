import { Component, Inject, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IUserService, UserService} from '../../shared/services/users/user.service';
import {Framework} from '../../shared/framework';
import { AuthDto } from 'src/shared/services/users/user.dto';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //@Inject('IOrderService') private orderService: IOrderService
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, public router: Router, @Inject(DOCUMENT) private document: Document,
    @Inject('IUserService') private userService: IUserService, private framework: Framework) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['demouser', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9]{5,}')
      ]],
      password: ['password123', [
        Validators.required,
        Validators.minLength(4)
      ]]
    });
  }

  get username(): AbstractControl{
    return this.loginForm.get('username');
  }

  get password(): AbstractControl{
    return this.loginForm.get('password');
  }
  // login form submit
  submit(): void{
    const authenticate: AuthDto = this.loginForm.value;
    this.userService.login(authenticate).subscribe(result => {
      const jwt = result?.jwt;
      if (jwt != null){
        this.framework.session.setToken('auth-token', jwt, 1);
        window.location.href = this.document.getElementsByTagName('base')[0].href + '/app/home';
      }else{
        this.framework.message.error('Wrong username or password', 'please re-enter your details again');
      }
    });
    // this.router.navigate(['/app/home']);
    return;
  }


}
