import { Component, DestroyRef, inject, signal } from '@angular/core';
import { BlogService } from '../blog-service/blog-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'lib-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  public blockPosts = signal<any[]>([]);
  private readonly blogService = inject(BlogService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.blogService.blogPosts.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((posts) => {
      this.blockPosts.set(posts);
    });
  }
}
