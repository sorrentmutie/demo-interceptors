import { Component } from '@angular/core';
import { MessengerService } from './shared/services/messenger.service';

@Component({
  selector: 'app-root',
  template: `
  <app-menu/>
   <ul>
    <li *ngFor="let m of messenger.messages">{{m}}</li>
   </ul>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  constructor(public messenger: MessengerService){}
}
