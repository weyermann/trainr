import { Workout } from './../../../../model/workout';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  @Input() workouts: Observable<Workout[]>;

  constructor() { }

  ngOnInit() {
  }

}
