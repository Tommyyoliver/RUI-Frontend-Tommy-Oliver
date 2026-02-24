import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroItem } from './hero-item';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HandlerHeroData } from '../../../features/entities/hero/services/handler-hero-data';
import { NotificationHandler } from '../../../features/shared/notification-handler';
import { Hero } from '../../../features/entities/hero/interface/hero.interface';

describe('HeroItem', () => {
  let component: HeroItem;
  let fixture: ComponentFixture<HeroItem>;
  let routerSpy: jasmine.SpyObj<Router>;
  let handlerHeroDataSpy: jasmine.SpyObj<HandlerHeroData>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let notifySpy: jasmine.SpyObj<NotificationHandler>;

  const mockHero: Hero = {
    id: '1',
    name: 'Spiderman',
    description: 'Hero description',
    age: 20,
    power: 'Spider sense'
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    handlerHeroDataSpy = jasmine.createSpyObj('HandlerHeroData', ['getHeroById', 'updateHero', 'deleteHero']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    notifySpy = jasmine.createSpyObj('NotificationHandler', ['success']);

    handlerHeroDataSpy.getHeroById.and.returnValue(mockHero);

    await TestBed.configureTestingModule({
      imports: [HeroItem],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: HandlerHeroData, useValue: handlerHeroDataSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: NotificationHandler, useValue: notifySpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('deberia obtener el héroe por ID al inicializar', () => {
    expect(handlerHeroDataSpy.getHeroById).toHaveBeenCalledWith('1');
  });

  it('goBack deberia navegar a /home', () => {
    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  describe('openUpdate', () => {
    it('debería abrir el diálogo y actualizar el héroe si se confirma', () => {
      const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(mockHero) });
      dialogSpy.open.and.returnValue(dialogRefSpy);

      component.openUpdate();

      expect(dialogSpy.open).toHaveBeenCalled();
      expect(handlerHeroDataSpy.updateHero).toHaveBeenCalledWith(mockHero as any);
      expect(notifySpy.success).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('no debería hacer nada si se cancela el dialog', () => {
      const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(null) });
      dialogSpy.open.and.returnValue(dialogRefSpy);

      component.openUpdate();

      expect(handlerHeroDataSpy.updateHero).not.toHaveBeenCalled();
    });
  });

  describe('openDelete', () => {
    it('debería abrir el dialog de confirmación y eliminar el héroe si se confirma', () => {
      const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(true) });
      dialogSpy.open.and.returnValue(dialogRefSpy);

      component.openDelete();

      expect(dialogSpy.open).toHaveBeenCalled();
      expect(handlerHeroDataSpy.deleteHero).toHaveBeenCalledWith(mockHero.id);
      expect(notifySpy.success).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('no debería eliminar si se cancela el dialog', () => {
      const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(false) });
      dialogSpy.open.and.returnValue(dialogRefSpy);

      component.openDelete();

      expect(handlerHeroDataSpy.deleteHero).not.toHaveBeenCalled();
    });
  });
});
