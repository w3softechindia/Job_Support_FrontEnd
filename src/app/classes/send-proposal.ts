import { AdminPostProject, Milestone } from "../core/models/models";
import { User } from "./user";

export class SendProposal {
    proposal_id!:number;
    proposedPrice!: string;
    estimatedDelivery!: string;
    coverLetter!: string;
    proposalStatus!:string;
    milestones!: Milestone[];

    user!: User;
    admin_post_project!: AdminPostProject;
}
