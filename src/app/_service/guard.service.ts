import { Menu } from './../_model/menu';
import { TOKEN_NAME } from './../_shared/var.constant';
import { MenuService } from './menu.service';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import * as decode from 'jwt-decode';
import { map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private loginService: LoginService, private menuService: MenuService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let rpta = this.loginService.estaLogeado();
    if (!rpta) {
      sessionStorage.clear();
      this.router.navigate(['login']);
      return false;
    } else {
      let token = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
      if (tokenNotExpired(TOKEN_NAME, token.access_token)) {
        const decodedToken = decode(token.access_token);
        //console.log(decodedToken);
        let roles = decodedToken.authorities;
        console.log(roles);
        let url = state.url;

        return this.menuService.listar().pipe(map((data: Menu[]) => {
          let cont = 0;
          for (let m of data) {
            if (m.url === url) {
              for (let r of m.roles) {
                for (let ur of roles) {
                  if (r.nombre === ur) {
                    cont++;
                  }
                }
              }
              break;
            }
          }

          if (cont > 0) {
            return true;
          } else {
            this.router.navigate(['not-403']);
            return false;
          }
        }));
      } else {
        sessionStorage.clear();
        this.router.navigate(['login']);
        return false;
      }
    }
  }
}
