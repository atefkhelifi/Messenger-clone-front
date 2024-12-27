import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LoginService } from '../service/login.service';
import { LocalStorageService } from '../service/local-storage.service';
import { SocketService } from '../service/socket.service';

@Component({
  selector: 'app-messenger',
  standalone: false,

  templateUrl: './messenger.component.html',
  styleUrl: './messenger.component.css',
})
export class MessengerComponent implements OnInit, OnDestroy {
  users: any;
  conversations: any;
  messages: any;
  idConversation: any;
  idConnected: any;
  message: any;
  otherUser: any;
  searchTerm: string = '';
  filteredUsers: any;
  constructor(
    private logiService: LoginService,
    private localStorage: LocalStorageService,
    private chatService: SocketService
  ) {
    this.chatService.receiveMessage().subscribe((msg) => {
      console.log(msg);
      this.messages.push(msg);
      this.getConversationById(this.idConversation);
    });
  }
  listUser() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter((user: any) =>
      user.name.toLowerCase().includes(term)
    );
    console.log(this.filteredUsers);
  }
  ngOnInit(): void {
    this.idConnected = this.localStorage.getUserIdFromToken();
    this.logiService.getUsers(this.idConnected).subscribe((users) => {
      console.log(users);
      this.users = users;
    });
    this.getMyConversations();
  }

  // startConversation(idUser: any) {
  //   console.log(idUser);
  //   this.logiService
  //     .startConversation(this.idConnected, idUser)
  //     .subscribe((conversation) => {
  //       console.log(conversation);
  //     });
  // }
  getMyConversations() {
    this.logiService
      .getMyConversations(this.idConnected)
      .subscribe((conversations) => {
        console.log(conversations);
        this.conversations = conversations;
        const messagesElem = document.querySelector('#messages');
        if (messagesElem) {
          console.log('innn');
          messagesElem.scrollTop =
            messagesElem.scrollHeight - messagesElem.clientHeight;
        }
      });
  }
  getConversationById(idConversation: any) {
    this.idConversation = idConversation;
    this.logiService
      .getConversationById(idConversation)
      .subscribe((conversation) => {
        console.log(conversation);
        this.messages = conversation;
        const messagesElem = document.querySelector('#messages');
        if (messagesElem) {
          console.log('innn');
          messagesElem.scrollTop =
            messagesElem.scrollHeight - messagesElem.clientHeight;
        }
      });

    this.logiService
      .getPaticipants(idConversation)
      .subscribe((participants) => {
        this.otherUser = participants.filter(
          (participant: any) => participant._id !== this.idConnected
        );
        const messagesElem = document.querySelector('#messages');
        if (messagesElem) {
          console.log('innn');
          messagesElem.scrollTop =
            messagesElem.scrollHeight - messagesElem.clientHeight;
        }
      });
  }
  getConversationByIdUser(idUser: any) {
    console.log(idUser);
    const users = [idUser, this.idConnected];
    this.logiService.getConversationByIdUser(users).subscribe((res) => {
      console.log(res);
      if (res[0]?.id) {
        this.getConversationById(res[0].id);
      } else {
        this.messages = null;
      }
    });
  }
  sendMessage() {
    let message = {
      participants: [this.idConnected, this.otherUser[0].id],
      senderId: this.idConnected,
      content: this.message,
    };
    console.log(message);

    this.logiService.startConversation(message).subscribe((message) => {
      console.log(message);
      this.chatService.sendMessage(this.message);
      this.message = '';
      this.getConversationById(this.idConversation);
    });
  }
  ngOnDestroy(): void {
    // Clean up when the component is destroyed
    // this.socketService.disconnect();
  }
}
