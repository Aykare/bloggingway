
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
    public isMobile = new BehaviorSubject<boolean>(false);
  private readonly breakpointObserver = inject(BreakpointObserver);

  constructor() {

    this.breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        if (result.matches) {
          this.isMobile.next(false);
        } else {
          this.isMobile.next(true);
        }
      });
  }


}
