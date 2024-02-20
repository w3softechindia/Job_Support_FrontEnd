import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';


@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent  {
  public routes = routes
 
}
