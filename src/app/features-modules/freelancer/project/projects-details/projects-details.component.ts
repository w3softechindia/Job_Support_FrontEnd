/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { FileDTO, UserService } from 'src/app/Services/user.service';
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
  employerPhoto:string| undefined;
  photo: any;
  error: string | undefined;
  isLoading: boolean | undefined;
  userEmail!:string;
  photoUrl: string | undefined;
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
  fileList:FileDTO[]=[];
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

  submitProposal(): void {
    // Check if the user is logged in
    if (!this.loggedIn) {
      // If the user is not logged in, navigate to the login page
      this.router.navigate(['/auth/login']);
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
        this.userEmail=project.user.email;
        this.loadEmployerPhoto();
        this.loadFreelancerPhoto();
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
      },
      (error) => {
        console.error('Error fetching project details:', error);
        // Handle the error here, such as displaying an error message to the user
      }
    );
  }

  loadFreelancerPhoto(): void {
    this.userService.getPhoto(this.email).subscribe(
      (data: Blob) => {
        console.log('Photo data:', data);
        const reader = new FileReader();
        reader.onload = () => {
          this.photoUrl = reader.result as string;
          console.log('Photo URL:', this.photoUrl);
          this.isLoading = false; // Set loading to false when image is loaded
        };
        reader.readAsDataURL(data);
      },
      (error: any) => {
        console.error('Error loading photo:', error);
        this.isLoading = false; // Set loading to false on error
      }
    );
  }

  loadEmployerPhoto(): void {
    this.userService.getPhoto(this.userEmail).subscribe(
      (data: Blob) => {
        console.log('Photo data:', data);
        const reader = new FileReader();
        reader.onload = () => {
          this.employerPhoto = reader.result as string;
          console.log('Photo URL:', this.employerPhoto);
          this.isLoading = false; // Set loading to false when image is loaded
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
    // this.userService.getFilesByProjectId(this.projectId).subscribe((attach: any) => {
    //   this.attachments = attach;
    // })
    if (this.projectId) {
      this.userService.getFilesByProjectId(this.projectId).subscribe(files => {
        // Map files to FileDTO
        this.fileList = files.map(file => ({
          id: file.id,
          file_path: file.file_path,
          filePath: file.file_path,
          type: file.type,
          size: file.size,
          fileName: this.extractFileName(file.file_path)
        }));
      });
    }
  }
  extractFileName(filePath: string): string {
    const parts = filePath.split(/[\\/]/);
    return parts[parts.length - 1];
  }

  sendProposal(){
    this.proposal=this.proposalForm.value;
    this.userService.postProposal(this.projectId,this.email,this.proposal).subscribe((response)=>{
      console.log('Proposal Data :',response);
    })
  }

  navigation(){
    this.router.navigate([routes.freelancer_projects_proposals]);
  }
}


