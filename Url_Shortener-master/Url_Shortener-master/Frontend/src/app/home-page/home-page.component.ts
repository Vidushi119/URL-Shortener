import { Component } from '@angular/core';
import { NbLayoutComponent,NbHeaderRowComponent,NbButtonComponent,NbCardComponent,NbUserComponent,NbListComponent,NbListItemComponent, NbDialogService  } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService,NbAuthToken,NbTokenService } from '@nebular/auth';
import { Router } from '@angular/router';
import { ShortUrl} from '../models/short_url.model';
import { OnInit } from '@angular/core';
import { ShortUrlsService } from '../services/url-service/short_url.service';
import { AddUrlDialogComponent } from '../add-url-dialog/add-url-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {

  ngOnInit(): void {
    this.ShortUrlService.GetLatestUrls().subscribe((result) => {
      this.urls = result;
      this.urls.forEach((url) =>{
        url.createdAt = new Date(url.createdAt);
      })
    });
  }
  user = {};
  urls:Array<ShortUrl> = [];
  loggedIn:boolean = false;
  constructor(private router: Router,private authService: NbAuthService,private ShortUrlService:ShortUrlsService,private DialogService:NbDialogService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthToken) => {
      
        if (token.isValid()) {
          this.user = token.getPayload();
          this.loggedIn = true; // here we receive a payload from the token and assigns it to our `user` variable 
        }
        
      });

  }

  OnClickLogIn(){
    this.router.navigate(['/auth/login']);
  }
  OnClickLogOut(){
    this.authService.logout('email').subscribe((result) => {
      this.router.navigate(['/auth/login']);
    });
    this.loggedIn = false;
  }

  AddNewUrl(){
    this.DialogService.open(AddUrlDialogComponent).onClose.subscribe((url:ShortUrl) => {
      this.urls.push(url);
      this.ShortUrlService.Addurl(url).subscribe((result) => {
        console.log(result);
      });
    });
  }

}
