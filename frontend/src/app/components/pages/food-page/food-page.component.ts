import { Component, OnInit, inject } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { CartService } from '../../../services/cart.service';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, RouterLink, NotFoundComponent],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent implements OnInit {
  public food!: Food;

  public activatedRoute = inject(ActivatedRoute);
  public foodService = inject(FoodService);
  private cartService = inject(CartService);
  private router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if (params.id) {
        this.foodService.getFoodById(params.id).subscribe(serverFood => {
          this.food = serverFood;
        });
      }
    })
  }

  public addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
