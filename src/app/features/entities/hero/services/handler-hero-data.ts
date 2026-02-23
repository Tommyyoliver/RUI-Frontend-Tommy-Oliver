import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Hero } from '../interface/hero.interface';
import { firstValueFrom } from 'rxjs';
import { HeroCreateDto } from '../dto/hero-create.dto';
import { HeroUpdateDto } from '../dto/hero-update.dto';
import { LoaderHandler } from '../../../shared/loader-handler';

@Injectable({
  providedIn: 'root',
})
export class HandlerHeroData {
  
  private readonly http = inject(HttpClient);
  private readonly dbPath = 'assets/database/hero-db.json';
  private readonly loader = inject(LoaderHandler);

  private _heroes = signal<Hero[]>([]);
  private _loading    = signal<boolean>(false);
  private _searchTerm = signal<string>('');
  
  public heroes = this._heroes.asReadonly();
  readonly loading    = this._loading.asReadonly();
  readonly searchTerm = this._searchTerm.asReadonly();

  readonly filteredHeroes = computed(() => {
    const term = this._searchTerm().trim().toLowerCase();
    if (!term) return this._heroes();
    return this._heroes().filter(h => h.name.toLowerCase().includes(term));
  });

  constructor() {
    this.loadInitialData();
  }


  private async loadInitialData(): Promise<void> {
    this.loader.show();
    try {
      const data = await firstValueFrom(this.http.get<Hero[]>(this.dbPath));
      this._heroes.set(data);
      // console.log('Datos iniciales cargados:', data);
    } catch (err) {
      console.error('Error al cargar los datos iniciales:', err);
      this._heroes.set([]);
    } finally {
      setTimeout(() => {
        this.loader.hide();
      }, 1000)
    }

  }

  getAllHeroes(): Hero[] {
    return this._heroes();
  }

  getHeroById(id: string): Hero | undefined {
    return this._heroes().find((hero) => hero.id === id);
  }

  setSearchTerm(term: string): void {
    this._searchTerm.set(term);
  }

  createHero(heroDto: HeroCreateDto): Hero {
    this.loader.show();
    const newHero: Hero = {
      id: crypto.randomUUID(),
      ...heroDto,
      age: parseInt(heroDto.age),
    }
    this._heroes.update(heroes => [...heroes, newHero]);
    setTimeout(() => {
      this.loader.hide();
    }, 1000)
    return newHero;
  }

  updateHero(heroDto: HeroUpdateDto): Hero {
    this.loader.show();
    const list = this._heroes();
    const index = list.findIndex(h => h.id === heroDto.id);
    
    if( index === -1 ) throw new Error('Heroe no encontrado');
    
    const updatedHeroes = [...list];
    updatedHeroes[index] = { ...updatedHeroes[index], ...heroDto, age: parseInt(heroDto.age)};
    this._heroes.set(updatedHeroes);
    setTimeout(() => {
      this.loader.hide();
    }, 1000)
    return updatedHeroes[index];
  }

  deleteHero(id: string): boolean {
    this.loader.show();
    const initialLenght = this._heroes().length;
    this._heroes.update(heroes => heroes.filter(h => h.id !== id));
    setTimeout(() => {
      this.loader.hide();
    }, 1000)
    return initialLenght !== this._heroes().length;
  }

}
