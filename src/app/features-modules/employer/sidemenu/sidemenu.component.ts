import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { SidebarData } from 'src/app/core/models/models';
import { routes } from 'src/app/core/helpers/routes/routes';
import { FreelancerSidebarItem } from 'src/app/core/models/sidebar-model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { UserService } from 'src/app/Services/user.service';

export interface SidemenuItem {
  page: string;
  icon: string;
  menuValue: string;
  separateRoute: boolean;
  showAsTab: boolean;
  showSubRoute: boolean;
  submenu: string;
  expanded: boolean;
  title?: string;
  routes?: boolean;
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  public routes = routes;
  base = '';
  page = '';
  last = '';
  currentroute = '';
  sidebar: SidebarData[] = [];
  photoUrl: string | undefined;
  // Added loading indicator

  photo: any;

  error: string | undefined;
  email!: string;
  isLoading: boolean | undefined;

  constructor(
    private data: ShareDataService,

    private router: Router,

    private navservices: NavbarService,
    private common: CommonService,
    private userservicee: UserService,
    private route: ActivatedRoute
  ) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    this.menuItem = this.data.menuItem;
  }

  public menuItem: Array<FreelancerSidebarItem> = [];
  toggleSubMenu(menuItem: FreelancerSidebarItem): void {
    menuItem.expanded = !menuItem.expanded;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email']; // Access email from query parameter
      console.log('Email from query param:', email);
      // Now you can use the email in this component as needed
      this.loadPhoto(email); // Call loadPhoto with the retrieved email
    });
  }
  

  loadPhoto(email: string): void {
    this.userservicee.getPhoto(email).subscribe(
      (data) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.photoUrl = reader.result as string;
          this.isLoading = false; // Set loading to false when image is loaded
        };
        reader.readAsDataURL(data);
      },
      (error) => {
        console.error('Error loading photo:', error);
        this.isLoading = false; // Set loading to false on error
      }
    );
  }


  
}
