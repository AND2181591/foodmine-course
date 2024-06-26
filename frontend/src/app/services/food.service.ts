import { Injectable, inject } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root', 
})
export class FoodService {

  private http = inject(HttpClient);

  constructor() { }

  public getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  public getAllFoodsBySearchTerm(searchTerm: string): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  public getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  public getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag === 'All' ? this.getAll() : 
      this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  public getFoodById(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  }
}
