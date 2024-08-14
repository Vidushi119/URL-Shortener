import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbThemeModule, NbSidebarModule, NbLayoutModule, NbButtonModule,NbSidebarService,NbLayoutRulerService, 
  NbCardModule, NbUserModule,NbColumnsService, NbListModule,NbInputModule, NbDialogModule,NbDialogConfig, NbDialogService  } from '@nebular/theme';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NbPasswordAuthStrategy, NbAuthModule,NbAuthService,NbTokenService, NbAuthJWTToken } from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HomePageComponent } from './home-page/home-page.component';
import { AddUrlDialogComponent } from './add-url-dialog/add-url-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AddUrlDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NbThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbDialogModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
    NbInputModule,
    NbEvaIconsModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:8080',
          token: {
            class: NbAuthJWTToken,
            getter: (module: string, res: any, options: any) => {
              console.log(res);
              return res.body[1].jwt;
            }

          },
          login: {
            endpoint: '/api/users/login',
            method: 'post',
            requireValidToken: true,
            redirect: {
              success: '/',
              failure: null,
            },
          },
          register: {
            endpoint: '/api/users/signup',
            method: 'post',
            requireValidToken: true,
            redirect: {
              success: '/',
              failure: null,
            },
          },
          logout: {
            endpoint: '/api/users/logout',
            method: 'post',
            requireValidToken: false,
            redirect: {
              success: '/auth/login',
              failure: null,
            },
          },
          }
        ),
      ],
      forms: {},
    }),
  ],
  providers: [
    NbSidebarService,
    NbLayoutRulerService,
    NbAuthService,
    NbTokenService,
    NbColumnsService,
    NbTokenService,
    NbDialogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
