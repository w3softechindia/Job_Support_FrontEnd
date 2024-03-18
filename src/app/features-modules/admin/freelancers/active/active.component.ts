import { Component, OnInit,  } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  user: User[]=[];
  status:string='Active';
  role:string='Freelancer';
  searchQuery: string = '';
  filteredUsers: User[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllUsersByStatus();
  }

      private getAllUsersByStatus(){
        this.adminService.getUsersByStatus(this.role,this.status).subscribe((data:any)=>{
          this.user=data;
          this.filteredUsers=data;
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
    
      deleteUserByEmail(email:string){
        this.adminService.deleteUser(email).subscribe(()=>{
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