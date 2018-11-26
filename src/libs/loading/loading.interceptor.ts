import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, finalize, map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    private _pendingRequests = 0;
    private _filteredUrlPatterns: RegExp[] = [];

    get pendingRequests(): number {
        return this._pendingRequests;
    }

    get filteredUrlPatterns(): RegExp[] {
        return this._filteredUrlPatterns;
    }

    private shouldBypass(url: string): boolean {
        return this._filteredUrlPatterns.some(e => {
            return e.test(url);
        });
    }

    constructor(private readonly loadingService: LoadingService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const shouldBypass = this.shouldBypass(req.url);

        if (!shouldBypass) {
            this._pendingRequests++;

            if (this._pendingRequests === 1) {
                this.loadingService.setState(true);
            }
        }

        return next.handle(req).pipe(
            map(event => {
                return event;
            }),
            catchError(error => {
                return Observable.throw(error);
            }),
            finalize(() => {
                if (!shouldBypass) {
                    this._pendingRequests--;

                    if (this._pendingRequests === 0) {
                        this.loadingService.setState(false);
                    }
                }
            })
        );
    }
}
