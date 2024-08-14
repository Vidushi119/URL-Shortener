import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShortUrl } from 'src/app/models/short_url.model';
import{map, retry} from 'rxjs/operators';
import { Observable,pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShortUrlsService {

  constructor(private http:HttpClient) { }

  GetLatestUrls(): Observable<ShortUrl[]> {
    return this.http.get<ShortUrl[]>('http://localhost:8080/api/urls/getLatest')
  }

  Addurl(url:ShortUrl): Observable<ShortUrl>{
    return this.http.post<ShortUrl>('http://localhost:8080/api/urls/addUrl',url);
  }
}
