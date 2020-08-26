import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { User } from '../../models';
import { UserService } from '../../services';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  user: User;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.userService.get(this.id).subscribe((user) => {
      this.user = user;
    });
  }
}
