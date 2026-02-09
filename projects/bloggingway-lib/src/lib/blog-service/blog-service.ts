import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// this should actually be an app initializer so it behaves properly in the form of it will get data and THEN the rest of the app will initialize but we write shit code for demo sake
export class BlogService {
  private readonly http = inject(HttpClient);
  public blogPosts = new BehaviorSubject<any[]>([]);

  private set blogPostData(posts: any[]) {
    this._blogPostData = posts;
    this.blogPosts.next(posts);
  }
  public get blogPostData() {    
    return this._blogPostData;
  }
  private _blogPostData: any[] = [];

  constructor() {
    this.getBlogPosts();
  }

  getBlogPosts() {
    this.http.get('/blogposts.mock.json').subscribe((posts: any) => {
      this.blogPostData = posts;
    });
  }

}
