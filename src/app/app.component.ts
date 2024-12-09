import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from './service/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  // private messageSubscription: Subscription;
  // messages: string[] = [];
  // newMessage: string = '';
  // constructor(private socketService: SocketService) {
  //   this.messageSubscription = this.socketService
  //     .on('message')
  //     .subscribe((data) => {
  //       this.messages.push(data.text);
  //     });
  // }
  // sendMessage() {
  //   this.socketService.emit('message', { text: this.newMessage });
  // }
  // ngOnDestroy() {
  //   this.messageSubscription.unsubscribe();
  // }
}
