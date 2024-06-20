import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  public cartQuantity = 0;
  public user!: User;

  private cartService = inject(CartService);
  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(newCart => {
      this.cartQuantity = newCart.totalCount;
    });

    this.userService.userObservable.subscribe(newUser => {
      this.user = newUser;
    });
  }

  public logout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  public get isAuth() {
    return this.user.token;
  }
}
