import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-titles-list',
  imports: [],
  templateUrl: './titles-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitlesList { }
