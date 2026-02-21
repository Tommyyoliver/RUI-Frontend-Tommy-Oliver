import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { Hero } from '../interface/hero.interface';
import { firstValueFrom } from 'rxjs';
import { HeroCreateDto } from '../dto/hero-create.dto';
import { HeroUpdateDto } from '../dto/hero-update.dto';

@Injectable({
  providedIn: 'root',
})
export class HandlerHeroData implements OnInit {
  
  private readonly http = inject(HttpClient);
  private readonly dbPath = 'database/hero-db.json';
  
  private _heroes = signal<Hero[]>([]);
  public heroes = this._heroes.asReadonly();

  ngOnInit(): void {
    this.loadInitialData();
  }


  private async loadInitialData(): Promise<void> {
    try {
      const data = await firstValueFrom(this.http.get<Hero[]>(this.dbPath));
      this._heroes.set(data);
      console.log('Datos iniciales cargados:', data);
    } catch (err) {
      console.error('Error al cargar los datos iniciales:', err);
      this._heroes.set([]);
    }
  }

  getAllHeroes(): Hero[] {
    return this._heroes();
  }

  getHeroById(id: string): Hero | undefined {
    return this._heroes().find((hero) => hero.id === id);
  }

  searchHeroes(term: string): Hero[] {
    const normalizedTerm = term.toLowerCase();
    return this._heroes().filter(h => h.name.toLowerCase().includes(normalizedTerm));
  }

  createHero(heroDto: HeroCreateDto): Hero {
    const newHero: Hero = {
      id: crypto.randomUUID(),
      ...heroDto,
      age: parseInt(heroDto.age),
    }
    this._heroes.update(heroes => [...heroes, newHero]);
    return newHero;
  }

  updateHero(heroDto: HeroUpdateDto): Hero {
    const currentHeroes = this._heroes();
    const index = currentHeroes.findIndex(h => h.id === heroDto.id);
    
    if( index !== 1 ) {
      const updatedHeroes = [...currentHeroes];
      updatedHeroes[index] = { ...updatedHeroes[index], ...heroDto, age: parseInt(heroDto.age)};
      this._heroes.set(updatedHeroes);
      return updatedHeroes[index];
    }
    throw new Error('Heroe no encontrado');
  }

  deleteHero(id: string): boolean {
    const initialLenght = this._heroes().length;
    this._heroes.update(heroes => heroes.filter(h => h.id !== id));
    return initialLenght !== this._heroes().length;
  }

}
