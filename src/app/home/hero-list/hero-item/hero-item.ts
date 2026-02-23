import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { HandlerHeroData } from '../../../features/entities/hero/services/handler-hero-data';
import { MatDialog } from '@angular/material/dialog';
import { NotificationHandler } from '../../../features/shared/notification-handler';
import { HeroFormDialog } from '../hero-form-dialog/hero-form-dialog';
import { ConfirmModal } from '../../../features/shared/confirm-modal/confirm-modal';

@Component({
  selector: 'app-hero-item',
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './hero-item.html',
  styleUrl: './hero-item.scss',
})
export class HeroItem {

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly handlerHeroDataService = inject(HandlerHeroData);
  private readonly dialog = inject(MatDialog);
  private readonly notify = inject(NotificationHandler);

  protected readonly hero = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? this.handlerHeroDataService.getHeroById(id) : undefined;
  })

  openUpdate(): void {
    const hero = this.hero();
    if (!hero) return;

    this.dialog.open(HeroFormDialog, {
      data: { mode: 'update', hero},
      panelClass: 'dark-dialog',
      backdropClass: 'dark-backdrop',
    }).afterClosed().subscribe(result => {
      if (result) {
        this.handlerHeroDataService.updateHero(result);
        this.notify.success('Heroe actualizado exitosamente!');
      }
    })
  }

  openDelete(): void {
    const hero = this.hero();
    if (!hero) return;

    this.dialog.open(ConfirmModal, {
      data: { heroName: hero.name },
      panelClass: 'dark-dialog',
      backdropClass: 'dark-backdrop',
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.handlerHeroDataService.deleteHero(hero.id);
        this.notify.success(`${hero.name} ha sido eliminado del universo.`);
        this.router.navigate(['/home']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

}
