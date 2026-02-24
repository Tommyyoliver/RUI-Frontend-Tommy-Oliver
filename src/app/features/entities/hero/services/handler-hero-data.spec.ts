import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { HandlerHeroData } from './handler-hero-data';
import { Hero } from '../interface/hero.interface';
import { HeroCreateDto } from '../dto/hero-create.dto';
import { HeroUpdateDto } from '../dto/hero-update.dto';

describe('HandlerHeroData', () => {
  let service: HandlerHeroData;
  let httpMock: HttpTestingController;

  const mockHeroes: Hero[] = [
    {
      "id": "62530c92-3046-4478-959c-33f769f74486",
      "name": "Spiderman",
      "description": "Tu amigable vecino trepamuros.",
      "age": 17,
      "power": "Sentido arácnido y agilidad proporcional a una araña."
    },
    {
      "id": "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
      "name": "Iron Man",
      "description": "Genio, millonario, playboy, filántropo.",
      "age": 45,
      "power": "Armadura de alta tecnología."
    },
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Wonder Woman",
      "description": "Princesa guerrera de las Amazonas.",
      "age": 800,
      "power": "Fuerza sobrehumana y lazo de la verdad."
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HandlerHeroData,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(HandlerHeroData);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crear y cargar los datos iniciales', fakeAsync(() => {
    const req = httpMock.expectOne('assets/database/hero-db.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
    tick();

    expect(service).toBeTruthy();
    expect(service.heroes().length).toBe(3);
    expect(service.heroes()).toEqual(mockHeroes);
  }));

  it('debería manejar error al cargar datos iniciales', fakeAsync(() => {
    const req = httpMock.expectOne('assets/database/hero-db.json');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
    tick();
    expect(service.heroes()).toEqual([]);
  }));

  describe('Funcionalidades CRUD', () => {
    beforeEach(fakeAsync(() => {
      const req = httpMock.expectOne('assets/database/hero-db.json');
      req.flush(mockHeroes);
      tick();
    }));

    it('getAllHeroes debería retornar todos los héroes', () => {
      expect(service.getAllHeroes()).toEqual(mockHeroes);
    });

    it('getHeroById debería retornar el héroe correcto', () => {
      const hero = service.getHeroById(mockHeroes[0].id);
      expect(hero).toEqual(mockHeroes[0]);
    });

    it('getHeroById debería retornar undefined si no existe', () => {
      const hero = service.getHeroById('999');
      expect(hero).toBeUndefined();
    });

    it('setSearchTerm debería actualizar la señal', () => {
      service.setSearchTerm('Bat');
      expect(service.searchTerm()).toBe('Bat');
    });

    it('filteredHeroes debería filtrar por nombre', () => {
      service.setSearchTerm('Spider');
      const filtered = service.filteredHeroes();
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe('Spiderman');
    });

    it('createHero debería agregar un nuevo héroe', () => {
      const newHeroDto: HeroCreateDto = {
        name: 'Black Widow',
        description: 'Super espía',
        age: '35',
        power: 'Artes marciales'
      };

      const created = service.createHero(newHeroDto);

      expect(created.id).toBeDefined();
      expect(created.name).toBe(newHeroDto.name);
      expect(service.heroes().length).toBe(4);
    });

    it('updateHero debería actualizar un héroe existente', () => {
      const updateDto: HeroUpdateDto = {
        id: mockHeroes[0].id,
        name: 'Spiderman Updated',
        description: 'Updated description',
        age: '18',
        power: 'Updated power'
      };

      const updated = service.updateHero(updateDto);

      expect(updated.name).toBe('Spiderman Updated');
      expect(updated.age).toBe(18);
      
      const heroInList = service.getHeroById(mockHeroes[0].id);
      expect(heroInList?.name).toBe('Spiderman Updated');
    });

    it('updateHero debería lanzar error si el héroe no existe', () => {
      const updateDto: HeroUpdateDto = {
        id: 'non-existent-id',
        name: 'Ghost',
        description: 'Boo',
        age: '0',
        power: 'Invisibility'
      };

      expect(() => service.updateHero(updateDto)).toThrowError('Heroe no encontrado');
    });

    it('deleteHero debería eliminar un héroe y retornar true', () => {
      const result = service.deleteHero(mockHeroes[0].id);
      expect(result).toBeTrue();
      expect(service.heroes().length).toBe(2);
      expect(service.getHeroById(mockHeroes[0].id)).toBeUndefined();
    });

    it('deleteHero debería retornar false si el héroe no existe', () => {
      const result = service.deleteHero('non-existent-id');
      expect(result).toBeFalse();
      expect(service.heroes().length).toBe(3);
    });
  });
});
