/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { UserService, Message } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit, OnDestroy {
  userEmail: string | undefined;
  messages: any[] = [];


  getEmployeremail() {
    this.userEmail = this.authService.getEmail();
    console.log('employeMailid for chatting' + this.userEmail)
  }

  newMessage: Message = { sender: '', receiver: '', content: '' };
  sender = 'mailto:purnapuri14@gmail.com';
  // sender = 'mailto:vamshinani9000@gmail.com';
  receiver = 'mailto:admin123@gmail.com';

  messageSubscription: Subscription | undefined;

  constructor(private messageService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.fetchMessages(); // Initially fetch messages



    // Subscribe to an interval that emits values every second
    this.messageSubscription = interval(1000).subscribe(() => {
      this.fetchMessages(); // Fetch messages every second
      this.removeComing();
    });

    this.getEmployeremail();

  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe(); // Unsubscribe to avoid memory leaks
    }
  }




  // fetchMessages(): void {
  //   this.messageService.getMessages(this.sender, this.receiver)
  //     .subscribe(
  //       (response) => {
  //         this.messages = response;
  //       },
  //       (error) => {
  //         console.error('Error fetching messages:', error);
  //       }
  //     );
  // }


  fetchMessages(): void {
    // Get the sender email (this.userEmail)
    let sender: string;

    if (this.userEmail !== undefined) {
      sender = this.userEmail;
    } else {
      // Handle the case where userEmail is undefined
      // For example, you can provide a default email or throw an error
      sender = 'mailto:default@example.com';
      // Alternatively, you can throw an error
      // throw new Error('User email is not available');
    }

    // Get messages using sender and receiver
    this.messageService.getMessages(sender, this.receiver)

      .subscribe(
        (response) => {
          this.messages = response;
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
  }








  // sendMessage(): void {
  //   const message: Message = {
  //     sender: 'mailto:purnapuri14@gmail.com',
  //     // mailto:sender:'vamshinani9000@gmail.com',
  //     receiver: 'mailto:admin123@gmail.com',
  //     content: this.newMessage.content
  //   };

  //   this.messageService.sendMessage(message)
  //     .subscribe(
  //       (response) => {
  //         console.log('Message sent successfully:', response);
  //         this.newMessage.content = ''; // Clear the content input
  //         location.reload();
  //       },
  //       (error) => {
  //         console.error('Error sending message:', error);
  //       }
  //     );
  // }


  sendMessage(): void {
    // Attempt to get the sender email (this.userEmail)
    try {
      if (!this.userEmail) {
        throw new Error('User email is not available');
      }

      const message: Message = {
        sender: this.userEmail,
        receiver: 'mailto:admin123@gmail.com',
        content: this.newMessage.content
      };

      this.messageService.sendMessage(message)
        .subscribe(
          (response) => {
            console.log('Message sent successfully:', response);
            // Add the new message to the messages array
            this.messages.push(message);
            this.newMessage.content = ''; // Clear the content input
          },
          (error) => {
            console.error('Error sending message:', error);
          }
        );
    } catch (error) {
      console.error('Failed to send message:', error);
      // Handle the error appropriately, such as displaying a user-friendly message or logging it.
    }
  }




  removeComing() {
    const sender = 'mailto:admin123@gmail.com'; // Assuming you have the correct sender email
    if (this.userEmail) {
      const receiver: string = this.userEmail; // Ensure userEmail is defined before assigning to receiver
      this.messageService.deleteMessagesBySenderAndReceiver(sender, receiver).subscribe(
        (response: string) => {
          // console.log('Messages deleted successfully:', response);
          // You can perform any additional actions here after deleting messages
        },
        (error: any) => {
          // console.error('Error deleting messages:', error);
        }
      );
    } else {
      // console.error('User email is undefined.');
    }
  }



  formatTimestamp(timestamp: number): string {
    const messageDate = new Date(timestamp);
    const hours = messageDate.getHours();
    const minutes = messageDate.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM'; // Determine if it's AM or PM
    const formattedHours = hours % 12 || 12; // Convert 24-hour format to 12-hour format

    const day = messageDate.getDate();
    const month = messageDate.getMonth() + 1; // Month is zero-based, so add 1
    const year = messageDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`; // Format date as "DD/MM/YYYY"
    const formattedTime = `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${amOrPm}`; // Format time as "HH:MM AM/PM"

    return `${formattedDate}, ${formattedTime}`; // Combine date and time
  }



  backToDashboard() {
    this.router.navigate(['/employer/dashboard']);
  }
}
