import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationHandler } from './notification-handler';

describe('NotificationHandler', () => {
  let service: NotificationHandler;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        NotificationHandler,
        { provide: MatSnackBar, useValue: spy }
      ]
    });
    service = TestBed.inject(NotificationHandler);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('debería crearse', () => {
    expect(service).toBeTruthy();
  });

  it('debería llamar a snackBar.open con la configuración de éxito', () => {
    service.success('Operación exitosa');
    expect(snackBarSpy.open).toHaveBeenCalledWith('✅ Operación exitosa', '', {
      duration: 3500,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['snack-success'],
    });
  });

  it('debería llamar a snackBar.open con la configuración de error', () => {
    service.error('Algo salió mal');
    expect(snackBarSpy.open).toHaveBeenCalledWith('❌ Algo salió mal', '', {
      duration: 3500,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['snack-error'],
    });
  });
});
