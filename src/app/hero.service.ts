import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Class
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
// Service
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    private heroesUrl = 'api/heroes';  // Web APIのURL

    constructor(
        private messageService: MessageService,
        private http: HttpClient
    ) {}

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }

    getHeroes(): Observable<Hero[]> {
        // this.messageService.add('HeroService: ヒーロー達が呼び出された');
        // return of(HEROES);
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                tap(heroes => this.log('fetched heroes')),
                catchError(this.handleError('getHeroes', []))
            );
    }

    getHero(id: number): Observable<Hero> {
        this.messageService.add(`HeroService: 呼び出されたヒーローのID=${id}`);
        return of(HEROES.find(hero => hero.id === id));
    }

    /**
     * 失敗したHttp操作を処理します。
     * アプリを持続させます。
     * @param operation - 失敗した操作の名前
     * @param result - observableな結果として返す任意の値
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: リモート上のロギング基盤にエラーを送信する
            console.error(error); // かわりにconsoleに出力

            // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
            this.log(`${operation} failed: ${error.message}`);

            // 空の結果を返して、アプリを持続可能にする
            return of(result as T);
        };
    }
}
