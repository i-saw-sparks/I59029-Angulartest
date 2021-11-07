import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string, scoreText : string): void {
    let score = parseInt(scoreText);
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name, score } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.heroes.sort((a,b)=> {
          if(a.score > b.score){
            return -1;
          }else if(a.score < b.score){
            return 1;
          }
          return 0;
        })
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}