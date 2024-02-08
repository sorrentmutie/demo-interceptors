import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize, tap } from "rxjs";
import { MessengerService } from "../services/messenger.service";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

 
  constructor(private messenger: MessengerService){
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let ok: string = '';
    const started = Date.now();
    
    return next.handle(req)
      .pipe(
       tap(
         // riesce quando c'è una risposta, altrimenti fallisce  
        {
          next: (event) => ( ok = event instanceof HttpResponse ? 'succeeded' : ''),
          error: (error) => ok = 'failed'
        }),
        finalize( () => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
          this.messenger.add(msg);
        })
        // Ne tap ne finalize toccano i valori dell'observable stream restituito al caller
      )
  }
  
}