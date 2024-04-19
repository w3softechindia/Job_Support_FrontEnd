/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostprojectService {

  [x: string]: any;


 
  public skills: string[] = [];
  attachments: File[] = [];
  filenames: string[] = [];
  attachementlenth:number | undefined;
  project_title = '';
  project_category = '';
  project_duration = '';
  
  freelancer_type = '';
  freelancer_level = '';
  public tags: string[] = [];
  active_rate = 'hourly'; // Default active rate is hourly
  hourly_rate_from: string | undefined; // Variable to store hourly rate 'from' value
  hourly_rate_to: string | undefined; // Variable to store hourly rate 'to' value
  fixed_rate: number | undefined;  
  attachmentFiles: FileList | undefined;
  languages = '';
  language_fluency = '';
  description = '';
  number_of_files: number | undefined;
  budget_amount:string| undefined;
  deadline_date: string | undefined; 
  

  project_id:number | undefined
  status='true';
  

  setAttachments(attachments: File[]) {
    this.attachments = attachments;
  }

  getAttachments() {
    return this.attachments;
  }


  setSkills(skills: string[]): void {
    this.skills = skills;
  }

  getSkills(): string[] {
    return this.skills;
  }
  
  setTags(tags: string[]) {
    this.tags = tags;
  }

  getTags(): string[] {
    return this.tags;
  }

  
}
