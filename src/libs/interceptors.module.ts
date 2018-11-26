import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './loading.interceptor';
import { LoadingService } from './loading.service';
import { XsrfInterceptor } from './xsrf.interceptor';
import { ServerUrlInterceptor } from './server-url.interceptor';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        LoadingService
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ServerUrlInterceptor, multi: true }
    ]
})
export class InterceptorsModule { }
