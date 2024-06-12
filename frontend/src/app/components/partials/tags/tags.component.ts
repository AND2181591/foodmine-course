import { Component, OnInit, inject } from '@angular/core';
import { Tag } from '../../../shared/models/Tag';
import { FoodService } from '../../../services/food.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {
  public tags?: Tag[];

  public foodService = inject(FoodService);

  ngOnInit(): void {
    this.foodService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
    });
  }
}
