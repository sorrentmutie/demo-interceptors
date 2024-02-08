import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     const authToken = this.authService.getAuthorizationToken();
      // Cloniamo la request e rimpiazziamo gli header originale con gli header clonati,
      // aggiungendo l'Authorization header
      // const authReq = req.clone({
      //   headers: req.headers.set('Authorization', authToken)
      // });
      // // mandiamo la richiesta clonata con l'header all'handler next
      // return next.handle(authReq);
      // Questa pratica è cosi comune che cc'è un setHeaders method che semplifica il tutto
      const authReq = req.clone({ setHeaders: { Authorization: authToken } });
      console.log(authReq);
      return next.handle(authReq);
      // Un interceptor che altera gli header può essere usato per tante cose:
      // - Aggiungere un token di autenticazione
      // - Aggiungere un header per il caching
      // - XSRF protection

  }
}
