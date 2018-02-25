import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../classes/restaurant';

@Component({
  selector: 'restaurant-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor() { }

  ngOnInit() {
    this.categories = this.restaurant.allCategories.split(",");
  }
  
  private _categories : string[];
  public get categories() : string[] {
    return this._categories;
  }
  public set categories(v : string[]) {
    this._categories = v;
  }
  
}
