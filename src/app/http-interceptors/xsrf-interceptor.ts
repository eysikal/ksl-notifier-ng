import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class XSRFInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: HttpXsrfTokenExtractor
) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    // Be careful not to overwrite an existing header of the same name.
    if (token !== null && !req.headers.has('X-XSRF-TOKEN')) {
      const headerDict = {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': token
      };
      req = req.clone({
        headers: new HttpHeaders(headerDict),
        withCredentials: true
      });
    }

    return next.handle(req);
  }
}