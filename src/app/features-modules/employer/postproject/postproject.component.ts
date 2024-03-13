import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { PostprojectService } from 'src/app/Services/postproject.service';
import { routes } from 'src/app/core/helpers/routes/routes';

interface data {
  value: string;
}

@Component({
  selector: 'app-postproject',
  templateUrl: './postproject.component.html',
  styleUrls: ['./postproject.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostprojectComponent implements OnInit, OnDestroy {
  skillSet = '';

  attachments: File[] = [];
  filenames: string[] = [];



  skillSetInput = '';
  cleanedSkillsArray: string[] = [];

  public routes = routes;
  public isChecked = true;
  selected = 'select';
  selected1 = 'select';
  editor?: Editor;
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
  budgetType: any;
  budgetFrom: any;
  budgetTo: any;
  attachment: any;

  ngOnInit(): void {
    this.editor = new Editor();
  }
  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
  }
  tag = ['Valve profit'];
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  selectedList1: data[] = [
    { value: 'Select' },
    { value: 'Category' },
    { value: 'Project' },
  ];
  selectedList2: data[] = [
    { value: '1-3 Week' },
    { value: '1 Month' },
    { value: 'Less then a month' },
    { value: 'More then a month' },
  ];
  selectedList3: data[] = [
    { value: 'Select' },
    { value: 'Full Time' },
    { value: 'Part Time' },
    { value: 'Project Based' },
  ];
  selectedList4: data[] = [
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Professional' },
  ];
  selectedList5: data[] = [
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Professional' },
  ];

  // activeRate = 'hourly';
  // toggleHourly() {
  //   this.activeRate = 'hourly';
  // }

  // toggleFixed() {
  //   this.activeRate = 'fixed';
  // }
  // isFilenameVisible: boolean[] = [true, true, true];

  // hideFilename(index: number) {
  //   this.isFilenameVisible[index] = false;
  // }


  toggleHourly() {
    this.activeRate = 'hourly';
  }

  toggleFixed() {
    this.activeRate = 'fixed';
  }

  constructor(private router: Router,
    private projectservice: PostprojectService
  ) { }

  projectTitle = '';
  projectCategory = '';
  projectDuration = '';
  deadline_date: string | undefined;

  freelancerType = '';
  freelancerLevel = '';


  tags: string[] = []; // Array to store tags
  tagsString = ''; // String to display and edit tags in input field

  skills: string[] = [];
  activeRate = 'hourly'; // Default active rate is hourly
  hourlyRateFrom: string | undefined; // Variable to store hourly rate 'from' value
  hourlyRateTo: string | undefined; // Variable to store hourly rate 'to' value
  fixedRate: number | undefined;


  attachmentFiles: FileList | undefined;
  languages = '';
  languageFluency = '';
  description = '';

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      // Check file size before adding it to the attachments
      if (file.size <= 2 * 1024 * 1024) {
        // 2MB limit
        this.attachments.push(file);
        this.filenames.push(file.name);
      } else {
        alert('File size exceeds 2MB limit.');
      }
    }
  }

  removeFile(index: number) {
    this.attachments.splice(index, 1);
    this.filenames.splice(index, 1);
  }

  // Method to print attachments in console
  printAttachments() {
    console.log('Attachments:', this.attachments);
  }

  // Method to send attachments to backend
  sendAttachmentsToBackend() {
    // Write your code to send attachments to the backend
  }

  ngsubmit() {
    console.log('Entered Project Title:', this.projectTitle);
    console.log('Selected value from Project Category:', this.selectedValue1);
    console.log('Entered Project Duration:', this.selectedValue2);
    console.log('Entered Freelancer Type:', this.selectedValue3);
    console.log('Entered Freelancer Level:', this.selectedValue4);
    console.log('Enterd deadline date:', this.deadline_date);

    console.log('Entered Skills:', this.skillSet);
    console.log('Entered Languages:', this.languages);
    console.log('Language Fluency:', this.selectedValue4);
    console.log('Description:', this.description);
    console.log('Attachments:', this.attachments);
    console.log('Number of files attached:', this.attachments.length);

    if (typeof this.skillSetInput === 'string') {
      // Split the skillSetInput string into an array of skills
      const skillsArray = this.skillSetInput.split(',');

      // Remove any leading or trailing whitespace from each skill
      this.cleanedSkillsArray = skillsArray.map(skill => skill.trim());

      // Print the cleaned skills array in the console
      console.log('Entered Skills:', this.cleanedSkillsArray);

      // Perform other form submission logic here

    } else {
      console.error('Skill Set must be a string');
    }

    this.tags = this.tagsString.split(',').map(tag => tag.trim());
    console.log('Entered Tags:', this.tags);

    console.log('Selected Budget Type:', this.activeRate);
    if (this.activeRate === 'hourly') {
      console.log(
        'Hourly Rate - From:',
        this.hourlyRateFrom,
        'To:',
        this.hourlyRateTo
      );
    } else if (this.activeRate === 'fixed') {
      console.log('Fixed Budget:', this.fixedRate);
    }

    this.projectservice.project_title = this.projectTitle;
    this.projectservice.project_category = this.selectedValue1;
    this.projectservice.project_duration = this.selectedValue2;
    this.projectservice.freelancer_type = this.selectedValue3;
    this.projectservice.freelancer_level = this.selectedValue4;
    this.projectservice.deadline_date = this.deadline_date,
      this.projectservice.tags = this.tags;
    this.projectservice.languages = this.languages;
    this.projectservice.language_fluency = this.selectedValue4;
    this.projectservice.description = this.description;
    this.projectservice.attachments = this.attachments;
    this.projectservice.number_of_files = this.attachments.length;
    this.projectservice.active_rate = this.activeRate;
    this.projectservice.hourly_rate_from = this.hourlyRateFrom;
    this.projectservice.hourly_rate_to = this.hourlyRateTo
    this.projectservice.setTags(this.tags);
    this.projectservice.setSkills(this.cleanedSkillsArray)
    this.projectservice.setAttachments(this.attachments);
    this.projectservice.fixed_rate = this.fixedRate;
    this.router.navigate([routes.projectconfirmation]);
  }

  updateTags() {
    // Implement the logic to update the tags array based on the tagsString
    // For example:
    // this.tags = this.tagsString.split(',').map(tag => tag.trim());
    console.log('Entered Tags:', this.tagsString);
  }
}
