import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable} from 'rxjs/Observable';
import {of} from "rxjs/observable/of";
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'; //

@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes'; // URL to web api
    constructor(private http: HttpClient, private messageService: MessageService) {

    }

    getHero(id: number): Observable<Hero> {
        this.messageService.add(`HeroService: fetched hero id=${id}`);
        return of(HEROES.find(hero => hero.id === id));
    }

    /** GET heroes from the server */
    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                catchError(this.handleError('getHeroes', []))
            );
        //pipe like try-catch, throws Exceptions
    }

    /**
     * Log a HeroService message with the MessageService
     */
    private log(message: string) {
        this.messageService.add('HeroService: ' + message);
    }

}
