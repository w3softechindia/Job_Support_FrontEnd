/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-de-active',
  templateUrl: './de-active.component.html',
  styleUrls: ['./de-active.component.scss']
})
export class DeActiveComponent implements OnInit{

  user: User[] = [];
  status: string = 'De-Activated';
  role: string = 'Employer';
  filteredUsers: User[] = [];

  photo: any;
  error!: string;
  photoUrl!: string | ArrayBuffer | null;
  searchQuery: string = '';
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllUsersByStatus();
  }

  private getAllUsersByStatus() {
    this.adminService.getUsersByStatus(this.role, this.status).subscribe((data: any) => {
      this.user = data;
      this.filteredUsers = data;
    })
  }

  updateStatus(email: string, status: string) {
    this.adminService.updateStatus(email, status)
      .subscribe(
        () => {
          console.log('Status updated successfully');
          location.reload();
        },
        error => {
          console.error('Error updating status:', error);
        }
      );
  }

  deleteUserByEmail(email: string) {
    this.adminService.deleteUser(email).subscribe(() => {
      console.log("User Account Deleted..!!!!");
    },
      error => {
        console.error('Error Deleting Account:', error);
      }
    );
  }

  search() {
    const query = this.searchQuery.toLowerCase();
    if (query.trim() === '') {
      // If search query is empty, show all users
      this.filteredUsers = this.user;
    } else {
      // Filter users based on search query
      this.filteredUsers = this.user.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.jobtitle.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.status.toLowerCase().includes(query)
      );
    }
  }

}
