import { Component } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  name = '';

  constructor(
    public wsService: WebsocketService,
    private router: Router
  ) { }

  login() {
    this.wsService.loginWS(this.name)
      .then(() => {
        this.router.navigateByUrl('/mensajes');
      });
  }


}
