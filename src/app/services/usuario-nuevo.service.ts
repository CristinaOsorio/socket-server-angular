import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioNuevoService {

    constructor(
        public wsService: WebsocketService
    ) { }

    userNew(name: string) {
        this.wsService.loginWS(name);
    }

    getUser() {
        return this.wsService.listen('user');
    }

}
