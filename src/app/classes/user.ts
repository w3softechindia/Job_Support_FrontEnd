
// import { Skills, Education, Experience, Certification, Language } from "../core/models/models";

import { Skills, Education, Experience, Certification, Language } from "../core/models/models";

export class User {
        email!: string;
        name!: string;
        password!: string;
        firstname!: string;
        lastname!: string;
        phonenumber!: number;
        role!: string;
        otp!:string;
        verified!:boolean;
        dob!: string;
        jobtitle!: string;
        typeofjob!: string;
        description!: string;
        facebook!: string;
        instagram!: string;
        linkedin!: string;
        persnolurl!: string;
        address!: string;
        city!: string;
        state!: string;
        postcode!: string;
        documentType!: string;
        documentNumber!: string;
        ecompany!: string;
        etagline!: string;
        establishdate!: string;
        ecompanyownername!: string;
        industry!: string;
        ewebsite!: string;
        eteamsize!: string;
        edescribe!: string;
        status!:string;
        photoUrl!: string | ArrayBuffer | null;

        skills!: Skills[];
        education!: Education[];
        experience!: Experience[];
        certification!: Certification[];
        language!: Language[];
}
