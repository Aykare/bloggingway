import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { Blog } from './blog/blog';
import { SizeService } from '../../../bloggingway-lib/src/public-api';
import { inject } from '@angular/core';
import { BlogEntry } from './blog-entry/blog-entry';

export const mobileGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const sizeService = inject(SizeService);

  return sizeService.isMobile.value === true
    ? true
    : new RedirectCommand(inject(Router).parseUrl('/blog'));
};

export const routes: Routes = [
  {
    path: 'blog',
    component: Blog,
  },
  {
    path: 'blog/:id',
    component: BlogEntry,
    canActivate: [mobileGuard],
  },
  {
    path: '',
    redirectTo: '/blog',
    pathMatch: 'full',
  },
];
