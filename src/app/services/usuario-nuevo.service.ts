import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioNuevoService {

    constructor(
        public wsService: WebsocketService
    ) { }

    newUser(name: string) {
        this.wsService.loginWS(name);
    }

    getUsuario() {
        return this.wsService.listen('user');
    }

}
