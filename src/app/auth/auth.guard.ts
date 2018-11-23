import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {SitefinityService} from '../shared/services/sitefinity.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private sitefinity: SitefinityService) {
  }

  canActivate(): boolean | Promise<boolean> {
    if (this.sitefinity.hasAuthentication) {
      if (this.sitefinity.instance) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      if (!this.sitefinity.instance) {
        return this.sitefinity.createInstance();
      } else {
        return true;
      }
    }
  }
}
