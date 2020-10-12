import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','/src/styles.css','/src/argon.css']
})
export class AppComponent {
  constructor(private translate: TranslateService, public router: Router, private http: HttpClient){
    translate.setDefaultLang('en');
  }
  title = 'clientApp';
  data = true;
  selectedLang: string = '';
  public options: string[] = ["en", "fr","el"];

  switchLanguage(language: string) {
    this.translate.use(language);
  }
  selectChangeHandler (event: any) {
    this.selectedLang = event.target.value;
    this.switchLanguage(this.selectedLang);
  }
  gluuLogout(){
    let Router = this.router
    let sessionID = sessionStorage.getItem("sessionID");
    const headers = { 'Authorization': sessionID};
    const body = {}
    this.http.post<any>('http://localhost:8000/logout',body, { headers }).subscribe(data => {
      console.log(data);
      sessionStorage.clear();
      Router.navigate(['authorize'])
    })
}

}