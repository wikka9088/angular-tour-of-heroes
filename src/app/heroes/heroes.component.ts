import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

    heroes: Hero[];

    //When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService.
    constructor(private heroService: HeroService) {

    }

    //call getHeroes() inside the ngOnInit lifecycle hook and let Angular call ngOnInit at an appropriate time after constructing a HeroesComponent instance.
    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void {
        // If this function just fetched synchronously: this.heroes = this.heroService.getHeroes(); The HeroService must wait for the server to respond, getHeroes() cannot return immediately with hero data, and the browser will not block while the service waits.
        // So HeroService.getHeroes() must have an asynchronous signature of some kind.
        // The new version waits for the Observable to emit the array of heroes— which could happen now or several minutes from now. Then subscribe passes the emitted array to the callback, which sets the component's heroes property.
        // This asynchronous approach will work when the HeroService requests heroes from the server.
        this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
    }

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.addHero({name} as Hero).subscribe(hero => {this.heroes.push(hero);})
    }

    delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero).subscribe();
    }
}
