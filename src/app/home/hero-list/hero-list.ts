import { Component, inject, OnInit } from '@angular/core';
import { HandlerHeroData } from '../../features/entities/hero/services/handler-hero-data';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSpinner } from '@angular/material/progress-spinner';
import { HeroFormDialog } from './hero-form-dialog/hero-form-dialog';
import { NotificationHandler } from '../../features/shared/notification-handler';

@Component({
  selector: 'app-hero-list',
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSpinner, 
  ],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.scss',
})
export class HeroList {

  handlerHeroDataService= inject(HandlerHeroData);
  private readonly route = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly notify = inject(NotificationHandler);


  searchControl = new FormControl('', { nonNullable: true})

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(220),
      distinctUntilChanged(),
      takeUntilDestroyed(),
    ).subscribe(term => this.handlerHeroDataService.setSearchTerm(term));
  }

  clearSearch() {
    this.searchControl.setValue('');
  }

  openCreateModal(): void {
    this.dialog.open(HeroFormDialog, {
      data: { mode: 'create' },
      panelClass: 'dark-dialog',
      backdropClass: 'dark-backdrop',
    }).afterClosed().subscribe(result => {
      if (result) {
        this.handlerHeroDataService.createHero(result);
        this.notify.success('Heroe reclutado exitosamente!');
      }
    })
  }

  goTo(path: string): void {
    this.route.navigate([path]);
  }

}
