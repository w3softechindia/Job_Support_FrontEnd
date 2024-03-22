import { AdminPostProject, Milestone } from "../core/models/models";
import { User } from "./user";

export class SendProposal {
    proposedPrice!: string;
    estimatedDelivery!: string;
    coverLetter!: string;
    milestones!: Milestone[];

    user!: User;
    admin_post_project!: AdminPostProject;
}
