import { TestBed } from '@angular/core/testing';

import { HandlerHeroData } from './handler-hero-data';
import { Hero } from '../interface/hero.interface';
import { HttpTestingController } from '@angular/common/http/testing';

describe('HandlerHeroData', () => {
  let service: HandlerHeroData;
  let httpMock: HttpTestingController;

  const mockHeroes: Hero[] = [
    { id: '1', name: 'Batman', description: 'Dark Knight', age: 35, power: 'Rich' },
    { id: '2', name: 'Superman', description: 'Man of Steel', age: 30, power: 'Flight' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [service]
    });
    service = TestBed.inject(HandlerHeroData);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('debería crear y cargar los datos iniciales', () => {
    const req = httpMock.expectOne('database/hero-db.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);

    expect(service.heroes().length).toBe(2);
    expect(service.heroes()).toEqual(mockHeroes);
  });
});
