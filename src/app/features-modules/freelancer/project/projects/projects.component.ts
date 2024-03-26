import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostprojectService } from 'src/app/Services/postproject.service';
import { UserService } from 'src/app/Services/user.service';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { freeprojects } from 'src/app/core/models/models';
interface data {
  value: string;
}
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  project: any[] = [];

  projectIds: number[] = [];
  customProjectIds: number[] = [];

  email: string | undefined;

  public like: boolean[] = [false];
  public isButtonVisible = true;
  public isButtonsVisible = true;
  public isButtonVisibles = true;
  public isButtonVisibl = true;
  public isButtonsVisibles = true;
  public routes = routes;
  freeprojects: Array<freeprojects> = [];

  updatedProjectId: number | undefined;
  photoUrl: string | undefined;
  isLoading: boolean | undefined;
  photoUrls: any;

  constructor(
    public router: Router,
    private dataservice: ShareDataService,
    private proser: PostprojectService,
    private userservice: UserService
  ) {
    this.dataservice.ManageUsers3.subscribe((data: Array<freeprojects>) => {
      this.freeprojects = data;
    });
  }
  ngOnInit(): void {
    this.fetchProjectIds();
  }

  fetchProjectIds(): void {
    this.userservice.getAllUpdatedProjectIds().subscribe((ids) => {
      this.projectIds = ids;

      console.log('Id array:', this.projectIds);

      // Remove duplicates using Set
      this.customProjectIds = [...new Set(this.projectIds)];

      console.log('Custom Project IDs:', this.customProjectIds);

      // Now that you have filtered out duplicate IDs, you can proceed to fetch project details
      this.fetchProjectDetails();
    });
  }

  // fetchProjectIds(): void {
  //   this.userservice.getAllUpdatedProjectIds().subscribe(ids => {
  //     this.projectIds = ids;

  //     console.log("Id array:", this.projectIds);
  //         this.customProjectIds = this.projectIds;
  //         this.fetchProjectDetails();
  //   });
  // }

  // fetchProjectDetails(): void {
  //   this.userservice.getAdminProjectById(this.customProjectIds).subscribe(
  //     projects => {
  //       this.project = projects; // Assign the fetched projects to the project array
  //       console.log("Project Details:", this.project);
  //              // Extract userEmail property from each project
  //     const userEmails = projects.map(project => project.user_email);
  //     console.log("User Emails:", userEmails);

  //     },
  //     error => {
  //       console.error("Error fetching project details:", error);
  //       // Handle the error here, such as displaying an error message to the user
  //     }
  //   );
  // }

  // loadPhoto(email: string): void {
  //   this.userservice.getPhoto(email).subscribe(
  //     (data: Blob) => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         this.photoUrl = reader.result as string;
  //         this.isLoading = false; // Set loading to false when image is loaded
  //       };
  //       reader.readAsDataURL(data);
  //     },
  //     (error: any) => {
  //       console.error('Error loading photo:', error);
  //       this.isLoading = false; // Set loading to false on error
  //     }
  //   );
  // }

  fetchProjectDetails(): void {
    this.userservice.getAdminProjectById(this.customProjectIds).subscribe(
      (projects) => {
        this.project = projects; // Assign the fetched projects to the project array
        console.log('Project Details:', this.project);

        // Extract userEmail property from each project
        const userEmails = projects.map((project) => project.user_email);
        console.log('User Emails:', userEmails);

        // Calculate days left for each project
        this.project.forEach((project) => {
          // Extract deadline date from the project and parse it manually
          const deadlineDate = new Date(project.deadline_date);
          console.log('Deadline Date:', deadlineDate);

          // Ensure the parsed date is valid
          if (!isNaN(deadlineDate.getTime())) {
            // Calculate difference between current date and deadline date
            const currentDate = new Date();
            console.log('Current Date:', currentDate);

            const timeDiff = deadlineDate.getTime() - currentDate.getTime();
            console.log('Time Difference (ms):', timeDiff);

            const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
            console.log('Days Left:', daysLeft);

            // Add daysLeft property to the project object
            project.daysLeft = daysLeft >= 0 ? daysLeft : 0; // Ensure daysLeft is not negative
          } else {
            console.log('Invalid deadline date:', project.deadline_date);
            project.daysLeft = 0; // Set daysLeft to 0 for invalid date
          }
        });

        // Initialize photoUrls object if it's undefined
        if (!this.photoUrls) {
          this.photoUrls = {};
        }

        // Track number of loaded photos
        let loadedPhotos = 0;

        // Load photos for each user email
        userEmails.forEach((email) => {
          this.loadPhoto(email, () => {
            loadedPhotos++;

            // Check if all photos are loaded
            if (loadedPhotos === userEmails.length) {
              this.isLoading = false;
            }
          });
        });
      },
      (error) => {
        console.error('Error fetching project details:', error);
        // Handle the error here, such as displaying an error message to the user
      }
    );
  }

  loadPhoto(email: string, callback: () => void): void {
    this.userservice.getPhoto(email).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (!this.photoUrls) {
            this.photoUrls = {};
          }
          // Assign the loaded photo URL to the respective email
          this.photoUrls[email] = reader.result as string;
          console.log('Photo URL for', email, ':', this.photoUrls[email]); // Log photo URL
          callback(); // Invoke callback when photo is loaded
        };
        reader.onerror = (error) => {
          console.error('Error reading photo data:', error);
          this.isLoading = false; // Set loading to false on error
        };
        reader.readAsDataURL(data);
      },
      (error: any) => {
        console.error('Error loading photo:', error);
        this.isLoading = false; // Set loading to false on error
      }
    );
  }

  toggleLike(index: number) {
    this.like[index] = !this.like[index];
  }
  public selectedValue1 = '';
  selectedList1: data[] = [
    { value: 'Sort by (Default)' },
    { value: 'Relevance' },
    { value: 'Rating' },
    { value: 'Popular' },
    { value: 'Latest' },
    { value: 'Free' },
  ];
  navigation(id:number) {
    this.router.navigate(['/freelancer/project-details',id]);
  }
}
