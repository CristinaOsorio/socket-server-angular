import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(
        public wservice: WebsocketService,
        public chatService: ChatService
    ) { }


    ngOnInit() {
        this.chatService.getMessagePrivate()
            .subscribe(msg => {
               console.log(msg);
                
            } );

    }


}
