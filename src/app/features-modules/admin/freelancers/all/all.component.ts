import { Component, OnInit, } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { User } from 'src/app/classes/user';
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  role: string = 'Freelancer';
  user: User[] = [];
  filteredUsers: User[] = [];

  photo: any;
  error!: string;
  photoUrl!: string | ArrayBuffer | null;
  searchQuery: string = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllUsersByRole();
  }

  private getAllUsersByRole() {
    this.adminService.getAllByRole(this.role).subscribe((response: any) => {
      this.user = response;
      this.filteredUsers = response;
      this.photo = response.photoUrl;
      this.createImageFromBlob();
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
        console.error('Error updating status:', error);
      }
    );
  }

  createImageFromBlob(): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.photoUrl = reader.result;
    }, false);

    if (this.photo) {
      reader.readAsDataURL(this.photo);
    }
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