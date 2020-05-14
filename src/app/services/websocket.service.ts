import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    public socketStatus = false;
    public user: User = null;

    constructor(
        private socket: Socket,
        private router: Router
    ) {
        this.loadStorage();
        this.checkStatus();
    }

    checkStatus() {
        this.socket.on('connect', () => {
            console.log('Conectado al servidor');
            this.socketStatus = true;
            this.loadStorage();
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
                this.user = new User(name);
                this.saveStorage();
                resolve();

            });

        });

    }
    logoutWs() {
        this.user = null;
        localStorage.removeItem('user');
        const payload = {
            name: 'sin-nombre'
        };

        this.emit('new-user', payload, () => {});

        this.router.navigateByUrl('/');
    }

    getUser() {
        return this.user;
    }

    saveStorage() {
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    loadStorage() {
        if (localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.loginWS(this.user.name);
        }
    }
}
