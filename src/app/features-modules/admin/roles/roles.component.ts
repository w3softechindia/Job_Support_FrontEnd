/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, forkJoin, interval, switchMap } from 'rxjs';
import { Message, UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})

export class RolesComponent implements OnInit, OnDestroy {

  photoUrls: { [key: string]: string } = {};

  photo: any;
  error: string | undefined;

  isLoading: boolean | undefined;
  // users: User[] | undefined
  users: User[] = []; // Assuming User interface exists

  userEmail: string | undefined;

  messages: any[] = [];
  newMessage: Message = { sender: '', receiver: '', content: '' };
  photoUrl: string | undefined;
  name: string | undefined;
  intervalSubscription: Subscription | undefined;




  printUserDetails(user: User) {

    console.log(user);
    // Or you can print specific user details
    console.log(user.name, user.email);
    this.name = user.name;
    this.userEmail = user.email;
    console.log(this.userEmail);
    this.loadPhoto(this.userEmail);

  }






  sender = 'mailto:purnapuri14@gmail.com';
  receiver = 'mailto:admin123@gmail.com';
  messageSubscription: Subscription | undefined;

  constructor(private messageService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchMessages(); // Initially fetch messages
    // Subscribe to an interval that emits values every second
    this.messageSubscription = interval(1000).subscribe(() => {
      this.fetchMessages(); // Fetch messages every second
    });

    // this.getAllUsers();
    // Assuming userEmail is available somewhere in your code


    this.getAllUsers();
    // Update message count every second
    this.intervalSubscription = interval(1000).pipe(
      switchMap(() => this.updateMessageCounts())
    ).subscribe();



  }


  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe(); // Unsubscribe to avoid memory leaks
    }

    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }


  fetchMessages(): void {
    if (!this.userEmail) {
      console.error('User email is not available.');
      return;
    }

    if (!this.receiver) {
      console.error('Receiver email is not available.');
      return;
    }

    // Using non-null assertion operator (!) to assert that userEmail and receiver are not undefined
    this.messageService.getMessages(this.userEmail!, this.receiver!)
      .subscribe(
        (messages) => {
          this.messages = messages;
          this.deleteMessages(this.userEmail!, this.receiver!); // Both userEmail and receiver are defined here
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
  }

  deleteMessages(sender: string, receiver: string): void {
    if (!sender || !receiver) {
      console.error('Sender or receiver email is not available.');
      return;
    }

    this.messageService.deleteMessagesBySenderAndReceiver(sender, receiver)
      .subscribe(
        response => {
          console.log(response); // Handle success response
        },
        error => {
          console.error(error); // Handle error
        }
      );
  }







  // fetchMessages(): void {
  //   // Assuming this.userEmail is already populated with the user's email
  //   if (!this.userEmail) {
  //     console.error('User email is not available.');
  //     return;
  //   }

  //   this.messageService.getMessages(this.userEmail, this.receiver)

  //     .subscribe(
  //       (response) => {
  //         this.messages = response;


  //       },
  //       (error) => {
  //         console.error('Error fetching messages:', error);
  //       }
  //     );
  // }





  // sendMessage(): void {
  //   const message: Message = {
  //     sender: 'mailto:admin123@gmail.com',
  //     receiver: 'mailto:purnapuri14@gmail.com',

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
    // Check if userEmail is available
    if (!this.userEmail) {
      console.error('User email is not available.');
      return;
    }

    const message: Message = {
      sender: 'mailto:admin123@gmail.com',
      receiver: this.userEmail, // Assign userEmail as the receiver
      content: this.newMessage.content
    };

    this.messageService.sendMessage(message)
      .subscribe(
        (response) => {
          console.log('Message sent successfully:', response);
          this.newMessage.content = ''; // Clear the content input
          // Assuming this.messages is updated by fetching new messages or adding the sent message
          this.messages.push(message); // Add the sent message to the messages array
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
  }










  // getAllUsers(): void {
  //   this.messageService.getAllUsers().subscribe(
  //     (data: User[]) => {
  //       this.users = data || [];
  //       console.log(this.users);

  //       for (const user of this.users) {
  //         if (user && user.email) {
  //           this.loadPhoto(user.email);
  //         }
  //       }


  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }









  getAllUsers(): void {
    this.messageService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data || [];
        console.log(this.users);

        for (const user of this.users) {
          if (user && user.email) {
            this.loadPhoto(user.email);
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  updateMessageCounts() {
    const receiverEmail = 'mailto:admin123@gmail.com'; // Assuming this is your receiver email
    const updateObservables = this.users.map(user =>
      // this.messageService.getMessageCount(user.email, receiverEmail)
      this.messageService.getMessageCounttodelt(user.email, receiverEmail)


    );

    return forkJoin(updateObservables).pipe(
      switchMap(counts => {
        counts.forEach((count, index) => {
          this.users[index].messageCount = count;
        });
        return [];
      })
    );
  }

  loadPhoto(userEmail: string): void {
    // Reset photoUrl and isLoading before loading a new photo
    this.photoUrl = undefined;
    this.isLoading = true;

    // Check if the photo URL is already loaded for this user
    if (this.photoUrls[userEmail]) {
      this.photoUrl = this.photoUrls[userEmail];
      this.isLoading = false;
      return;
    }

    this.messageService.getPhoto(userEmail).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const photoUrl = reader.result as string;
          this.photoUrls[userEmail] = photoUrl; // Store photo URL in the map
          this.photoUrl = photoUrl; // Set the photo URL
          this.isLoading = false;
        };
        reader.readAsDataURL(data);
      },
      (error: any) => {
        console.error('Error loading photo:', error);
        this.isLoading = false;
      }
    );
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



}









