import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    public socketStatus = false;
    public usuario: Usuario;

    constructor(
        private socket: Socket
    ) {
        this.cargarStorage();
        this.checkStatus();
    }

    checkStatus() {
        this.socket.on('connect', () => {
            console.log('Conectado al servidor');
            this.socketStatus = true;
        });

        this.socket.on('disconnect', () => {
            console.log('Desconectado del servidor');
            this.socketStatus = false;
        });
    }

    emit( event: string, payload?: any, calback?: Function) {
        // emit ('EVENTO, PAYLOAD, CALLBACk)
        console.log('Emitiendo: ', event);

        this.socket.emit(event, payload, calback);
    }

    listen(event: string) {
        return this.socket.fromEvent(event );
    }

    loginWS( name: string ) {

        return new Promise((resolve, reject) => {

            this.emit('new-user', { name }, resp => {

                this.usuario = new Usuario(name);
                this.saveStorage();

                resolve();
                console.log(resp);

            });

        });

    }
    getUser() {
        return this.usuario;
    }

    saveStorage() {
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
    }

    cargarStorage() {
        if (localStorage.getItem('usuario')) {
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            this.loginWS(this.usuario.name);
        }
    }
}
