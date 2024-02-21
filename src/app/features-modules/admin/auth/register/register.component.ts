import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


public routes=routes;
 

}
