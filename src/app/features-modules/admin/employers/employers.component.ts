import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.scss']
})
export class EmployersComponent {

  public routes = routes;
  base = '';
  page = '';
  last = '';
  public str2!: string;
  public str!: string;
  public filter = false;
  totalCount: number = 0;
  role: string = "Employer";
  countType: string = '';

  constructor(private common: CommonService, public router: Router, private adminService: AdminService) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
      this.str = this.last;
      this.str2 = this.str.charAt(0).toUpperCase() + this.str.slice(1);
    });
  }
  ngOnInit(): void {
    this.updateCounts('all');
  }

  openFilter() {
    this.filter = !this.filter;
  }

  updateCounts(option: string) {
    if (option === 'all') {
      this.countType = 'all';
      this.adminService.getCountOfUsers(this.role).pipe(
        catchError(error => {
          console.error('Error getting count of all users:', error);
          return throwError('Failed to get count of all users. Please try again later.');
        })
      ).subscribe(count => {
        this.totalCount = count;
      });
    } else if (option === 'active') {
      this.countType = 'active';
      this.adminService.getCountofUsersByActive(this.role).pipe(
        catchError(error => {
          console.error('Error getting count of active users:', error);
          return throwError('Failed to get count of active users. Please try again later.');
        })
      ).subscribe(count => {
        this.totalCount = count;
      });
    } else if (option === 'deactive') {
      this.countType = 'deactive';
      this.adminService.getCountofUsersByDeactive(this.role).pipe(
        catchError(error => {
          console.error('Error getting count of deactive users:', error);
          return throwError('Failed to get count of deactive users. Please try again later.');
        })
      ).subscribe(count => {
        this.totalCount = count;
      });
    }
  }
}
