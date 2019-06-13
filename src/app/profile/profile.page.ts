import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public userEmail:string;

  constructor(
    private authService:AuthService,
    private router:Router
) { 
}

  ngOnInit() {
    //put user
    this.userEmail= this.authService.getUserEmail();
  }

  signOut(){
    this.authService.signOut()
    .then(() => this.router.navigate(['../signin']))
    .catch();
  }

}
