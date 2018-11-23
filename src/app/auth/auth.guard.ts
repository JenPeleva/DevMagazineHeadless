import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {SitefinityService} from '../shared/services/sitefinity.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sitefinityService: SitefinityService) {
  }

  canActivate(): boolean {
    if (this.sitefinityService.instance) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
