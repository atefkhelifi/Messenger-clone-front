import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Update to your Node.js server URL
  }

  // Emit a message
  sendMessage(message: string): void {
    this.socket.emit('chat message', message);
  }

  // Listen for messages
  receiveMessage(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('chat message', (msg: string) => {
        observer.next(msg);
      });
    });
  }
}
