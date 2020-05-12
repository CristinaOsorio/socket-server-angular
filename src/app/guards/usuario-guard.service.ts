import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(
    private wsService: WebsocketService,
    private router: Router
  ) { }

  canActivate() {
    console.log(this.wsService.getUser());

    if (this.wsService.getUser()) {
      return true;
    }

    this.router.navigateByUrl('/');
    return false;

  }
}
