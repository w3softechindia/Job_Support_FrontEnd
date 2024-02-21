import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-employer-membership',
  templateUrl: './employer-membership.component.html',
  styleUrls: ['./employer-membership.component.scss']
})
export class EmployerMembershipComponent {
public routes=routes;
}
