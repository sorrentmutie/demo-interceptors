import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  private cache: Map<string, any> = new Map();

  constructor(){
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Sono nell interceptor')
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    
    console.log(this.cache);
    const cachedResponse: HttpResponse<any> | undefined = this.cache.get(req.url);
    console.log(cachedResponse);
    if (cachedResponse) {
      console.log(`Returning a cached response`);
      return of(cachedResponse.clone());
    } else 
    {
        console.log(`No cached response. Making a request to ${req.url}`);
      
        return next.handle(req)
          .pipe(
            tap(event => {
            console.log("Ma ci sono?");
            console.log(event);
            if (event instanceof HttpResponse) {
              console.log(`Adding item to cache`);
              console.log(this.cache);
              this.cache.set(req.url, event)
            }
          })
          );
    }
  }
}