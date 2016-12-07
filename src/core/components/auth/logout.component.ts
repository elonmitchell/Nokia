import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'logout',
  directives: [],
  template: `
    <button type="button" class="btn btn-default nokia-logout" (click)="onLogout()">
      <i class="jstree-icon jstree-themeicon ko-x-square main-link jstree-themeicon-custom"></i>
    Log Out</button>
  `
})

export class LogoutComponent {

  constructor(public _router:Router,
              private _authService:AuthenticationService) {

  }

  onLogout() {
    this._authService.logout()
      .subscribe(
        () => {

        	/*TEMPORAL FIX: the store is not getting reset*/
          //this._router.navigate(['Login']);
          window.location.replace('/login')
        }
      );
  }
}
