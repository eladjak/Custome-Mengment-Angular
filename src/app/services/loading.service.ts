import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  private requestCount = 0;

  constructor() {
    console.log('אתחול שירות הטעינה');
  }

  setLoading(loading: boolean): void {
    if (loading) {
      this.requestCount++;
      if (this.requestCount === 1) {
        Promise.resolve().then(() => {
          this.loadingSubject.next(true);
        });
      }
    } else {
      this.requestCount--;
      if (this.requestCount === 0) {
        Promise.resolve().then(() => {
          this.loadingSubject.next(false);
        });
      }
    }
  }
}
