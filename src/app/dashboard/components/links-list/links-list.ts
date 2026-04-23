import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-links-list',
  imports: [],
  templateUrl: './links-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksList { }
