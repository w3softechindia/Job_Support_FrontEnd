import { Component, OnInit } from '@angular/core';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { SendProposal } from 'src/app/classes/send-proposal';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.scss'],
})
export class ProjectsDetailsComponent implements OnInit {
  public routes = routes;

  public details = [];
  loggedIn!: boolean;
  projectId!: number;
  id!: number;
  projectDetails: any;
  photoUrl: string | undefined;
  isLoading: boolean | undefined;
  photoUrls: any;
  attachments: any[] = [];
  proposal!:SendProposal;
  email!:string;

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  proposalForm: FormGroup = new FormGroup({
    proposedPrice: new FormControl(''),
    estimatedDelivery: new FormControl(''),
    coverLetter: new FormControl('')
  })

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auth:AuthService
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
    // Check the authentication status when the component initializes
    this.loggedIn = this.userService.isLoggedIn();
    this.projectId = this.route.snapshot.params['id'];
    this.fetchProjectDetails();
    this.getProjectFiles();
    this.email=this.auth.getEmail();

    this.proposalForm = this.formBuilder.group({
      proposedPrice: ['', [Validators.required]],
      estimatedDelivery: ['', [Validators.required]],
      coverLetter: ['', [Validators.required]],
      milestones: this.formBuilder.array([this.createMilestone()])
    })
  }

  createMilestone(): FormGroup {
    return this.formBuilder.group({
      milestone_name: [''],
      price: [''],
      startdate: [''],
      enddate: ['']
    })
  }

  get milestones(): FormArray {
    return this.proposalForm.get('milestones') as FormArray;
  }

  addMilestone(): void {
    this.milestones.push(this.createMilestone());
  }

  removeMilestone(index: number): void {
    this.milestones.removeAt(index);
  }

  navigation() {
    this.router.navigate([routes.employee_dashboard]);
  }
  navigation1() {
    this.router.navigate([routes.freelancer_projects_proposals]);
  }

  submitProposal(): void {
    // Check if the user is logged in
    if (!this.loggedIn) {
      // If the user is not logged in, navigate to the login page
      this.router.navigate([routes.login]);
    } else {
      console.log("User is logged in, executing href...");
    }
  }

  private fetchProjectDetails() {
    this.userService.getProjectByAdminProject(this.projectId).subscribe(
      (project) => {
        this.projectDetails = project; // Assign the fetched project to the project variable
        console.log('Project Details:', this.projectDetails);
        this.id = project.project_id;
        // Extract userEmail property from the project
        const userEmail = project.user.email;
        console.log('User Email:', userEmail);

        // Calculate days left for the project
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
          this.projectDetails.daysLeft = daysLeft >= 0 ? daysLeft : 0; // Ensure daysLeft is not negative
        } else {
          console.log('Invalid deadline date:', project.deadline_date);
          this.projectDetails.daysLeft = 0; // Set daysLeft to 0 for invalid date
        }

        // Initialize photoUrls object if it's undefined
        if (!this.photoUrls) {
          this.photoUrls = {};
        }

        // Load photo for the user email
        this.loadPhoto(userEmail, () => {
          this.isLoading = false;
        });
      },
      (error) => {
        console.error('Error fetching project details:', error);
        // Handle the error here, such as displaying an error message to the user
      }
    );
  }

  loadPhoto(email: string, callback: () => void): void {
    this.userService.getPhoto(email).subscribe(
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

  getProjectFiles() {
    this.userService.getProjectFilesByProjectId(this.id).subscribe((attach: any) => {
      this.attachments = attach;
    })
  }

  sendProposal(){
    this.proposal=this.proposalForm.value;
    this.userService.postProposal(this.projectId,this.email,this.proposal).subscribe((response)=>{
      console.log('Proposal Data :',response);
    })
  }
}

