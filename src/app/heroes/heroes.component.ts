import { Component, OnInit } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero} from '../hero';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectHero: Hero;

  onSelect(hero: Hero): void {
      this.selectHero = hero;
  }

  heroes: HEROES;

  constructor() { }

  ngOnInit() {
  }

}
