import { Component } from '@angular/core';
import { SEOResult } from './SEOResult';
import { SEOResponse } from './SEOResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SEORequest } from './SEORequest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  constructor(private http: HttpClient) { }

  title = 'SEO Search';
  result: SEOResponse = new SEOResponse();
  results: SEOResult[] = [];
  phrase: string;
  url: string;

  async searchSEO() {
    if (this.phrase && this.url) {
      const postUrl = "https://localhost:7272/api/SEO";

      let req = new SEORequest();
      req.phrase = this.phrase;
      req.url = this.url;

      let res = await this.apiCaller(postUrl, req);

      res.subscribe(Response => {this.result = Response, this.results = Response.SEOResults});
 
    }
    else {
      alert('Search term cannot be blank')
    }
  }

  apiCaller(postURL: string, postObject: SEORequest): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<SEOResponse>(postURL, postObject);
  }
}