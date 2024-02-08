import { Component, inject } from '@angular/core';
import { ReqResService } from '../../services/req-res.service';
import { Person } from '../../models/req-res';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-req-res-page',
  template: `
    <div *ngFor="let person of peopleObservable | async">
           <app-person-card [person]="person"/>
    </div>

  `,
  styles: ``
})
export class ReqResPageComponent {
    private service = inject(ReqResService);
    people: Person[] = [];
    peopleObservable = this.service.getData();
}
