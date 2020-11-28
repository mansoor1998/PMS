import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type} from '@angular/core';
import {PopupDialogComponent} from './components/error-dialog/popup-dialog.component';
import {PreLoaderComponent} from './components/pre-loader/pre-loader.component';
import {browser} from 'protractor';
import { CookieService } from 'angular2-cookie/services/cookies.service';


@Injectable({
  providedIn: 'root'
})
export class Framework{

  constructor(private injector: Injector) {
    this.injector = injector;
  }

  public message: any = Popup.getInstance(this.injector);
  public preLoader: any = PreLoader.getInstance(this.injector);
  public session: any = AppSession.getInstance(this.injector);

}

class ComponentFactory<T>{
  constructor(protected injector: Injector) {
  }

  protected createComponentInstance(component: Type<T>): ComponentRef<T>{
    const componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
    const applicationRef = this.injector.get(ApplicationRef);

    // create a component reference
    const componentRef = componentFactoryResolver.resolveComponentFactory(component)
    .create(this.injector);

    // attach component to the appRef so that so that it will be dirty checked.
    applicationRef.attachView(componentRef.hostView);

    return componentRef;
  }
}

class Popup extends ComponentFactory<PopupDialogComponent>{

  private static popup: Popup;

  private constructor(injector: Injector) {
    super(injector);
  }

  private allDialogComponents: HTMLElement[] = [];

  public static getInstance(injector: Injector): Popup{
    if (Popup.popup == null) { Popup.popup = new Popup(injector); }
    return Popup.popup;
  }

  private message(title: string, body: string, type: string): void {
    const componentRef = super.createComponentInstance(PopupDialogComponent);

    componentRef.instance.title = title;
    componentRef.instance.body = body;
    componentRef.instance.type = type;

    // get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef < any > )
      .rootNodes[0] as HTMLElement;

    this.allDialogComponents.push(domElem);

    if (this.allDialogComponents.length === 1){
       document.body.appendChild(domElem);
    }
  }

  renderElement(): void {
    if ( this.allDialogComponents.length > 0 ){
      const element = this.allDialogComponents.splice(this.allDialogComponents.length - 1, 1)[0];
      document.body.appendChild((element as HTMLElement));
    }
  }

  clearAllMessages(): void{
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.allDialogComponents.length; i++){
      const element = this.allDialogComponents.splice(this.allDialogComponents.length - 1, 1)[0];
      try{
        element.remove();
      }catch (e){
        console.error(e);
      }
    }
  }


  public error(title: string, body: string): void {
      this.message(title, body, 'error');
  }

  public success(title: string, body: string): void {
    this.message(title, body, 'success');
  }

  public warn(title: string, body: string): void {
    this.message(title, body, 'warning');
  }

}

class PreLoader extends ComponentFactory<PreLoaderComponent> {

  private constructor(injector: Injector) {
    super(injector);
  }

  private static preLoader: PreLoader;

  private preLoader: HTMLElement;

  public static getInstance(injector: Injector): PreLoader{
    if (PreLoader.preLoader == null) { PreLoader.preLoader = new PreLoader(injector); }
    return PreLoader.preLoader;
  }

  __init__(): HTMLElement{
    // const componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
    // const applicationRef = this.injector.get(ApplicationRef);
    // const componentRef = componentFactoryResolver.resolveComponentFactory(PreLoaderComponent)
    //   .create(this.injector);

    const componentRef = super.createComponentInstance(PreLoaderComponent);

    // get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef < any > )
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    this.preLoader = domElem;
    return  domElem;
  }

  remove(): void{
    try{
      this.preLoader.remove();
    }catch (e){}
  }

}

class AppSession {

  private constructor(private injector: Injector) {
  }

  get UserId(): number{
    return this.userId;
  }

  get Username(): string{
    return this.username;
  }

  set UserId(userId: number){
    this.userId = userId;
  }

  set Username(username: string){
    this.username = username;
  }
  set Name(name: string){
    this.name = name;
  }
  set RoleName(rolename: string){
    this.roleName = rolename;
  }

  set AllRoles(allRoles: string[]){
    this.allRoles = allRoles;
  }

  private static appSession = null;

  private userId: number | undefined;
  private username: string | undefined;
  private name: string | undefined;
  private roleName: string | undefined;
  private allRoles: string[];

  public static getInstance(injector): AppSession{
    if (AppSession.appSession == null) { AppSession.appSession = new AppSession(injector); }
    return AppSession.appSession;
  }

  getAllRoles(): string[]{
    return this.allRoles;
  }

  isGranted(permission: string): boolean{
    if (permission) {
      return permission.toLowerCase() === this.roleName?.toLowerCase();
    }
  }

  public getToken(name: string): string {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }
      if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length, c.length); }
    }
    return null;
  }

  public setToken(name: string, value: string, expireDays: number): void {
    let expires = '';
    if (expireDays) {
      const date = new Date();
      date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '')  + expires + '; path=/';
  }

  public removeToken(name: string): void {
    /*const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      document.cookie = cookies[i] + '=;expires='
        + new Date(0).toUTCString() + ' path=/ app';
    }*/
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

}


