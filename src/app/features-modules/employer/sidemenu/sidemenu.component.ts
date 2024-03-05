import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { SidebarData } from 'src/app/core/models/models';
import { routes } from 'src/app/core/helpers/routes/routes';
import { FreelancerSidebarItem } from 'src/app/core/models/sidebar-model';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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
  username: any;
  email: any;
  photoUrl!: string;
  isLoading!: boolean;
  constructor(
    private data: ShareDataService,
    private common: CommonService,
      private userService:UserService,
      private auth:AuthService,
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
    this.username = this.auth.getUsername();
    this.email=this.auth.getEmail();
    this.loadPhoto();
}

loadPhoto(): void {
  this.userService.getPhoto(this.email).subscribe(
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
