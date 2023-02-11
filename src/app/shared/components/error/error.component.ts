import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {
  @Input() text!: string;
  @Output() animationEnd: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('errorTag', {static: false}) errorTag!: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  setOutAnimation() {
    this.errorTag.nativeElement.style.animation = 'errorOut 0.3s';
  }

  animationDone() {
    this.animationEnd.emit();
  }
}
