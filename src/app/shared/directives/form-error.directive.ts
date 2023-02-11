import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  Inject, Injector,
  Input,
  Output, Renderer2, Self, ViewContainerRef
} from '@angular/core';
import {ErrorComponent} from "../components/error/error.component";
import {NgControl} from "@angular/forms";
import {FORM_ERRORS} from "../services/error-handler";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Directive({
  selector: '[appFormError]'
})
export class FormErrorDirective {
  text!: string;
  compRef!: ComponentRef<ErrorComponent> | undefined;
  @Input() autoGeneratedError: boolean = true;
  @Input() appendedInput: boolean = false;
  @Input() needSpace : boolean = false;
  @Output() errorStatusChanged: EventEmitter<string | null> = new EventEmitter<string | null>();
  @Input() moreCheckRequired: boolean = false;

  constructor(@Self() private control: NgControl,
              @Inject(FORM_ERRORS) private errors: any,
              private elementRef: ElementRef,
              private injector: Injector,
              private resolver: ComponentFactoryResolver,
              private renderer2: Renderer2,
              private vcr: ViewContainerRef) {
  }

  removeError() {
    if (this.compRef) {
      this.compRef.instance?.setOutAnimation();
      this.compRef.instance?.animationEnd
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          if (this.compRef) {
            this.compRef.destroy();
            this.compRef = undefined;
          }
        });
    }
  }

  setError(text: string) {
    if (this.autoGeneratedError) {
      if (!this.compRef) {
        const factory = this.resolver.resolveComponentFactory(ErrorComponent);
        this.compRef = this.vcr.createComponent(factory);
        const loaderComponentElement = this.compRef.location.nativeElement;
        let targetElement: HTMLElement;
        if (this.appendedInput) {
          targetElement = loaderComponentElement.parentNode.parentNode;
        } else {
          targetElement = loaderComponentElement.parentNode;
        }
        targetElement.insertAdjacentElement('beforeend', loaderComponentElement);
      }
      this.compRef.instance.text = text;
    }
  }

  setErrorStyleForInput() {
    this.renderer2.addClass(this.elementRef.nativeElement, 'input-error');
  }

  removeErrorStyleForInput() {
    this.renderer2.removeClass(this.elementRef.nativeElement, 'input-error');
  }

  ngOnInit(): void {
    if (this.moreCheckRequired) {
      this.control.statusChanges?.pipe(untilDestroyed(this))
        .subscribe(() => {
          const controlErrors = this.control.errors;
          if (controlErrors) {
            const firstKey = Object.keys(controlErrors)[0];
            const getError = this.errors[firstKey];
            const text = getError(controlErrors[firstKey]);
            this.formInvalid(text);
          } else if (this.compRef) {
            this.formValid();
          } else {
            this.formValid();
          }
        });
    }


    this.control.valueChanges?.pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      const controlErrors = this.control.errors;
      if (controlErrors) {
        const firstKey = Object.keys(controlErrors)[0];
        const getError = this.errors[firstKey];
        const text = getError(controlErrors[firstKey]);
        this.formInvalid(text);
      } else if (this.compRef) {
        this.formValid();
      } else {
        this.formValid();
      }
    });
  }


  private formInvalid(text: any) {
    this.errorStatusChanged.emit(text);
    this.setErrorStyleForInput();
    this.setError(text);
  }

  private formValid() {
    this.errorStatusChanged.emit(null);
    this.removeErrorStyleForInput();
    this.removeError();
  }
}
