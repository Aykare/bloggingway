import { Component, inject, signal } from '@angular/core';
//this import is actually really bad but i don't have enough fucks to figure out what's wrong in the tsconfig
import { BlogService, SizeService } from '../../../../bloggingway-lib/src/public-api';

import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-blog-entry',
  imports: [],
  templateUrl: './blog-entry.html',
  host: { class: 'flex flex-col grow m-4 page-container p-4' },
})
export class BlogEntry {
  public postId = signal(null);
  public visiblePost = signal<any | null>(null);

  private readonly blogService = inject(BlogService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly sizeService = inject(SizeService);
  private readonly router = inject(Router);
  
  constructor() {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          this.postId.set(params['id'] || null);
          return this.blogService.blogPosts;
        }),
      )
      .subscribe((posts) => {
        const post = posts.find((p) => p.id === this.postId());
        this.visiblePost.set(post ? post : null);
      });

    this.sizeService.isMobile.subscribe((isMobile) => {
      if (isMobile === true) {
       this.router.navigate(['/blog']);
      }
    });
  }
}
