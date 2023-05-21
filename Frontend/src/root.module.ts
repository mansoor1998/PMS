import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {CommonModule, PlatformLocation} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RootRoutingModule} from './root-routing.module';
import {HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {RootComponent} from './root.component';
import {Framework, mockData} from './shared/framework';
import {AppSessionDto} from './shared/services/users/user.dto';
import {AppConst} from './shared/AppConst';
import {debounce, debounceTime} from 'rxjs/operators';
import { IUserService, UserService, UserServiceMock } from './shared/services/users/user.service';
import { ToastrModule } from 'ngx-toastr';


// tslint:disable-next-line:typedef
function appInitializerFactory(injector: Injector, platformLocation: PlatformLocation) {
  return () => {
    return new Promise<boolean>((res, rej) => {
      const framework = injector.get(Framework);
      const element = framework.preLoader.__init__();
      injector.get(HttpClient).get('./assets/appconfig.json').toPromise()
        .then((data: { remoteServiceBaseUrl: string, appBaseUrl: string }) => {
        AppConst.remoteServiceBaseUrl = data.remoteServiceBaseUrl;
        AppConst.appBaseUrl = data.appBaseUrl;
      })
      .then(() => {
        injector.get(HttpClient).get('./assets/data/pms.json').toPromise().then(mock => { mockData.data = mock; })
        .then(() => {
          // tslint:disable-next-line:label-position
          const userService: IUserService = injector.get(UserServiceMock); // injector.get(UserService);
          const sub = userService.getUserConfiguration().subscribe((data: AppSessionDto) => {
            if(localStorage.getItem('isLogged') !== 'true'){
              element.remove();
              res(false);
              return;
            }
            if (data != null){
              const session = framework.session;
              session.UserId = data.userId;
              session.AllRoles = data.allRoles;
              session.Name = data.name;
              session.Username = data.username;
              session.RoleName = data.roleName;
            }
            element.remove();
            res(true);
          }, (err) => {
            console.error(err);
            rej(false);
          }, () => {
            sub.unsubscribe();
          });
        }).catch(err => {
          console.error(err);
        });
      })
    });
  };
}

@NgModule({
  declarations: [
    RootComponent,
  ],
  imports: [
    BrowserModule,
    RootRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Injector, PlatformLocation],
      multi: true
    },
  ],
  bootstrap: [
    RootComponent
  ]
})
export class RootModule {
}


function getAppRootUrl(): string{
  if (!document.location.origin) {
    const port = document.location.port ? ':' + document.location.port : '';
    return document.location.protocol + '//' + document.location.hostname + port;
  }

  return document.location.origin;
}
