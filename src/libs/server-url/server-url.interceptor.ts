import { Inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL } from './base-url.constant';

@Injectable()
export class ServerUrlInterceptor implements HttpInterceptor {

    constructor( @Inject(BASE_URL) private readonly baseUrl: string) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const originUrl = req.url;
        if (!originUrl.startsWith('http')) {
            const url = originUrl.startsWith('/') ? this.baseUrl + originUrl : `${this.baseUrl}/${originUrl}`;
            req = req.clone({ url: url });
        }
        return next.handle(req);
    }
}
