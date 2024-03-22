import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployerProjectIdsForViewProjectService {
  

  private selectedProject: any; 
  private projectIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  

  projectDetails: any;

  setProjectId(id: number) {
    this.projectIdSubject.next(id);
  }

  getProjectId(): Observable<number | null> {
    return this.projectIdSubject.asObservable();
  }


  private selectedProjectSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); // Initialize with null
  selectedProject$: Observable<any> = this.selectedProjectSubject.asObservable();



  setSelectedProject(project: any): void {
    this.selectedProjectSubject.next(project);
  }

  getSelectedProject(): Observable<any> {
    return this.selectedProject$;
  }




 

}

  
  

