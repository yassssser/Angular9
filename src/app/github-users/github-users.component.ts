import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-github-users',
  templateUrl: './github-users.component.html',
  styleUrls: ['./github-users.component.css']
})
export class GithubUsersComponent implements OnInit {

  users: any = [];
  oldUsers: any =[]
  search : string = ""

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }
  
  getAllUsers(){
    this.userService.getUsers().subscribe((res: any[]) => {
        this.oldUsers = this.users = res;
    })
  }

  searchUsers(){
    if(this.search === ""){
      this.users = this.oldUsers
      return;
    } else {
    this.userService.searchUser(this.search).subscribe((res: any[]) => {
        this.users = res['items'] 
    })
    } 
  }

  
}
