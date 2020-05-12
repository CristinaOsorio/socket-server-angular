import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
    selector: 'app-mensajes',
    templateUrl: './mensajes.component.html',
    styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

    public name: string;

    constructor(
        public wsService: WebsocketService
    ) {

        this.name = wsService.usuario.name;
        console.log(this.name);

    }

    ngOnInit() {
    }

}
