import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable} from 'rxjs/Observable';
import {of} from "rxjs/observable/of";
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {pipe} from "rxjs"; //

@Injectable()
export class HeroService {
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    private heroesUrl = 'api/heroes'; // URL to web api

    constructor(private http: HttpClient, private messageService: MessageService) {

    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url)
            .pipe(
                tap(_ => this.log(`fetched hero id=${id}`)),
                catchError(this.handleError<Hero>(`getHero id=${id}`))
            )
    }

    /** GET heroes from the server */
    /** GET heroes from the server */
    getHeroes (): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                tap(heroes => this.log(`fetched heroes`)),
                catchError(this.handleError('getHeroes', []))
            );
        //pipe is like try-catch to throw Exception
    }

    /**
     * Log a HeroService message with the MessageService
     */
    private log(message: string) {
        this.messageService.add('HeroService: ' + message);
    }


    updateHero(hero: Hero): Observable<any> {
        return this.http.put(this.heroesUrl, hero, httpOptions)
            .pipe(
                tap(_ => this.log(`updated hero id=${hero.id}`)),
                catchError(this.handleError<any>('updateHero')),
            )
    }

    addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
            .pipe(
                tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
                catchError(this.handleError<Hero>('addHero'))
            )
    }

    deleteHero(hero: Hero | number): Observable<Hero> {
        const id = typeof hero === 'number' ? hero : hero.id;
        const url = `${this.heroesUrl}/${id}`;

        return this.http.delete<Hero>(url, httpOptions)
            .pipe(
                tap(_ => this.log(`deleted hero id=${id}`)),
                catchError(this.handleError<Hero>('deleteHero'))
            )
    }

}
