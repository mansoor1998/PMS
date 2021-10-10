import {Component, Injector, OnInit} from '@angular/core';
import {Framework} from './shared/framework';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class RootComponent implements OnInit{
  constructor(private framework: Framework) {
  }
  ngOnInit(): void {
    //this.framework.message.clearAllMessages();
  }
}
