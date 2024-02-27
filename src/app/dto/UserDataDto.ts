import { Skills, Education, Experience, Certification, Language } from "../core/models/models";

export interface UserDataDto {
    skills: Skills[];
    education: Education[];
    experience: Experience[];
    certification: Certification[];
    language: Language[];
}