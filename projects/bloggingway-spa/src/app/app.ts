import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../../bloggingway-lib/src/public-api';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.html',
})
export class App {
  public isMobile = signal(false);
  private readonly breakpointObserver = inject(BreakpointObserver);

  constructor() {

    this.breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        if (result.matches) {
          this.isMobile.set(false);
        } else {
          this.isMobile.set(true);
        }
      });
  }

}
