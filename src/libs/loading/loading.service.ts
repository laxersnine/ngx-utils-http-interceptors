import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class LoadingService {

    private isLoading$ = new ReplaySubject<boolean>(1);

    setState(isLoading: boolean) {
        this.isLoading$.next(isLoading);
    }

    getState(): Observable<boolean> {
        return this.isLoading$.asObservable().distinctUntilChanged();
    }
}
