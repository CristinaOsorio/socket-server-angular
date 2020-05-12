import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(
        public wsService: WebsocketService
    ) { }

    sendMessage(message: string) {

        const payload = {
            from: this.wsService.getUser().name,
            body: message
        };

        this.wsService.emit('message', payload);
    }

    getMessage() {
        return this.wsService.listen('message-new');
    }

    getMessagePrivate() {
        return this.wsService.listen('message-private');
    }

}
