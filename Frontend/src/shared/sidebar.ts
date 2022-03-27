export class  SideBar{
  private static toggle = false;

  public static toggleSidebar(): void{
    SideBar.toggle = !SideBar.toggle;
    if (SideBar.toggle){
      document.body.classList.add('overlay-open');
      document.body.classList.add('overlay-icon');
    }else{
      document.body.classList.remove('overlay-open');
      document.body.classList.remove('overlay-icon');
    }
  }

  public static closeSidebar(): void{
    SideBar.toggle = false;
    document.body.classList.remove('overlay-open');
    document.body.classList.remove('overlay-icon');
  }
}
