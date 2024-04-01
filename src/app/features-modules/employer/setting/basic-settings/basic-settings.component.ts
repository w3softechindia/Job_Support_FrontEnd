/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AuthService } from 'src/app/core/services/auth/auth.service';
interface data {
  value: string;
}
@Component({
  selector: 'app-basic-settings',
  templateUrl: './basic-settings.component.html',
  styleUrls: ['./basic-settings.component.scss']
})
export class BasicSettingsComponent  {
  user: User = new User(); // Initialize user object
  formData: any = {}; // Initialize an empty object to hold form data
 
  constructor(private router: Router,
    private datePipe: DatePipe,
    private userService: UserService,
    private aut:AuthService) {}
    updatePhoto(email: string, photo: File) {
      this.userService.updatePhoto(email, photo).subscribe(
        response => {
          console.log('Photo updated successfully:', response);
          // Handle success response here
        },
        error => {
          console.error('Error updating photo:', error);
          // Handle error response here
        }
      );
    }
  
    onFileSelected(event: any) {
      const email = this.aut.getEmail();
      const file: File = event.target.files[0];
      if (file) {
        this.updatePhoto(email, file);
      }
    }
  
    // submitForm() {
    //   // Add your form submission logic here
    //   console.log('Form submitted');
    //   const email = this.aut.getEmail(); // Assuming email is already set in the user object
    //   this.userService.personalInfo(this.user, email).subscribe(
    //     response => {
    //       console.log('Personal info updated successfully:', response);
    //       // Handle success response here
    //     },
    //     error => {
    //       console.error('Error updating personal info:', error);
    //       // Handle error response here
    //     }
    //   );
    
    // }

    // submitForm() {
    //   // Add your form submission logic here
    //   console.log('Form submitted');
      
    //   const email = this.aut.getEmail(); // Assuming email is already set in the user object
      
    //   // Update personal info
    //   this.userService.personalInfo(this.user, email).subscribe(
    //     personalInfoResponse => {
    //       console.log('Personal info updated successfully:', personalInfoResponse);
    //       // Handle personal info update success response here
          
    //       // Update employer info
    //       this.userService.employerInfo(email, this.user).subscribe(
    //         employerInfoResponse => {
    //           console.log('Employer info updated successfully:', employerInfoResponse);
    //           // Handle employer info update success response here
    //         },
    //         employerInfoError => {
    //           console.error('Error updating employer info:', employerInfoError);
    //           // Handle error updating employer info here
    //         }
    //       );
    //     },
    //     personalInfoError => {
    //       console.error('Error updating personal info:', personalInfoError);
    //       // Handle error updating personal info here
    //     }
    //   );
    // }
    
    submitForm() {
      // Assuming aut is an instance of AuthenticationService to get the email
      const email = this.aut.getEmail(); 
    
      // Call the UserService to update employer dashboard information
      this.userService.updateInfoForEmployeerDashBoard(email, this.user)
        .subscribe(
          updatedUser => {
            console.log('User updated:', updatedUser);
            // Handle success scenario, if needed
          },
          error => {
            console.error('Error occurred:', error);
            // Handle error scenario, if needed
          }
        );
    }

    navigation() {
      location.reload();
    }

  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  selectedList1: data[] = [
    { value: 'Select' },
    { value: 'UK' },
    { value: 'USA' },
  ];
  selectedList3: data[] = [
    { value: 'France' },
    { value: 'USA' },
    { value: 'India' },
    { value: 'London' },
  ];
  selectedList2: data[] = [
    { value: 'California' },
    { value: 'Tasmania' },
    { value: 'Auckland' },
    { value: 'Marlborough' },
  ];
  selectedList4: data[] = [
    { value: 'Select' },
    { value: 'Intermediate' },
    { value: 'Export' },
  ];
  showCheckoutHour = true; 

  toggleCheckoutHour() {
    this.showCheckoutHour = !this.showCheckoutHour;
  }
  public isCheckboxChecked = true;
 
  showTimePicker: Array<string> = [];

  public hoursArray1 = [0];
  public hoursArray2 = [0];
  public hoursArray3 = [0];
  public hoursArray4 = [0];
  public hoursArray5 = [0];
  public hoursArray6 = [0];
  public hoursArray7 = [0];

  startTime1 = new Date();
  startTime2 = new Date();
  startTime3 = new Date();
  startTime4 = new Date();
  startTime5 = new Date();
  startTime6 = new Date();
  startTime7 = new Date();
  endTime1 = new Date();
  endTime2 = new Date();
  endTime3 = new Date();
  endTime4 = new Date();
  endTime5 = new Date();
  endTime6 = new Date();
  endTime7 = new Date();
  


  toggleTimePicker(value: string): void {
    if (this.showTimePicker[0] !== value) {
      this.showTimePicker[0] = value;
    } else {
      this.showTimePicker = [];
    }
  }
  formatTime(date: Date) {
    const selectedDate: Date = new Date(date);
    return this.datePipe.transform(selectedDate, 'h:mm a');
  }
}