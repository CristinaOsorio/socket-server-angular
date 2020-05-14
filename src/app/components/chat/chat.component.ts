import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

    text = '';
    mensajesSubcription: Subscription;
    element: HTMLElement;

    messages: any[] = [];

    constructor(
        public chatService: ChatService
    ) { }

    ngOnInit() {

        this.element = document.getElementById('chat-messages');

        this.mensajesSubcription = this.chatService.getMessage().subscribe(msg => {

            this.messages.push(msg);
            console.log(msg);
            console.log( this.messages);

            setTimeout(() => {
                this.element.scrollTop = this.element.scrollHeight;
            }, 50);

        });

    }

    ngOnDestroy() {
        this.mensajesSubcription.unsubscribe();
    }

    enviar() {
        if (this.text.trim().length === 0) {
            return;
        }

        this.chatService.sendMessage(this.text );
        console.log(this.text);
        this.text = '';
    }

}
