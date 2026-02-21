import { Component, inject } from '@angular/core';
import { HandlerHeroData } from '../../features/entities/hero/services/handler-hero-data';

@Component({
  selector: 'app-hero-list',
  imports: [],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.scss',
})
export class HeroList {

  private handlerHeroDataService= inject(HandlerHeroData);

}
