import { Component, DestroyRef, inject, signal } from '@angular/core';
//this import is actually really bad but i don't have enough fucks to figure out what's wrong in the tsconfig
import { BlogService } from '../../../../bloggingway-lib/src/public-api';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.html',
  host: { class: 'flex flex-col grow m-4 page-container p-4' },
})
export class Blog {
  public blogPosts = signal<any[] | null>(null);

  private readonly blogService = inject(BlogService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.blogService.blogPosts.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((posts) => {
      this.blogPosts.set(posts);
    });
  }
}
