import { Component, OnInit, inject } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/CartItem';
import { TitleComponent } from '../../partials/title/title.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [TitleComponent, RouterLink, CommonModule, NotFoundComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  public cart!: Cart;

  private cartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  public removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  public changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
}
