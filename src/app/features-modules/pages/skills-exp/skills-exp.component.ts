import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';


@Component({
  selector: 'app-skills-exp',
  templateUrl: './skills-exp.component.html',
  styleUrls: ['./skills-exp.component.scss']
})
export class SkillsExpComponent {
  skillsForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.skillsForm = this.fb.group({
      skills: this.fb.array([this.createSkill()])
    });
  }

  createSkill(): FormGroup {
    return this.fb.group({
      skill: [''],
      level: ['']
    });
  }

  get skills(): FormArray {
    return this.skillsForm.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.createSkill());
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  submitForm(): void {
    console.log(this.skillsForm.value);
    // Here you can send the form data to your backend
  }
}
