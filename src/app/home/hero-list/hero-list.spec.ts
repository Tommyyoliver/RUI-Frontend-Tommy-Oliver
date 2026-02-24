import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroList } from './hero-list';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HandlerHeroData } from '../../features/entities/hero/services/handler-hero-data';
import { NotificationHandler } from '../../features/shared/notification-handler';

describe('HeroList', () => {
  let component: HeroList;
  let fixture: ComponentFixture<HeroList>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let handlerSpy: jasmine.SpyObj<HandlerHeroData>;
  let notifySpy: jasmine.SpyObj<NotificationHandler>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    notifySpy = jasmine.createSpyObj('NotificationHandler', ['success']);
    
    handlerSpy = jasmine.createSpyObj('HandlerHeroData', ['setSearchTerm', 'createHero'], {
      searchTerm: jasmine.createSpy('searchTerm').and.returnValue(''),
      heroes: jasmine.createSpy('heroes').and.returnValue([]),
      loading: jasmine.createSpy('loading').and.returnValue(false),
      filteredHeroes: jasmine.createSpy('filteredHeroes').and.returnValue([])
    });

    await TestBed.configureTestingModule({
      imports: [HeroList],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: HandlerHeroData, useValue: handlerSpy },
        { provide: NotificationHandler, useValue: notifySpy }
      ]
    })
    .overrideComponent(HeroList, {
      set: { template: '' }
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('clearSearch debería limpiar el control de búsqueda', () => {
    component.searchControl.setValue('test');
    component.clearSearch();
    expect(component.searchControl.value).toBe('');
  });

  it('goToHero debería navegar a la página del héroe', () => {
    const heroId = '123';
    component.goToHero(heroId);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['home/hero/', heroId]);
  });

  it('openCreateModal debería abrir el diálogo y crear héroe si se confirma', () => {
    const mockResult = { name: 'New Hero' };
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(mockResult) });
    dialogSpy.open.and.returnValue(dialogRefSpy);

    component.openCreateModal();

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(handlerSpy.createHero).toHaveBeenCalledWith(mockResult as any);
    expect(notifySpy.success).toHaveBeenCalled();
  });
});
