import { Component, Input} from '@angular/core';
import { AuthService } from '../../services/auth.service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  
  @Input() isSideBarOpen: boolean= false;
    
  constructor(private authService: AuthService) {}

}
