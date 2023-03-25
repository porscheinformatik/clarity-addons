import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ClarityModule,
  ClrDateContainer,
  ClrPopoverEventsService,
  ClrPopoverPositionService,
  ClrPopoverToggleService,
} from '@clr/angular';
import { isObservable } from 'rxjs';
import { ClrDaterangepickerModule } from '../../daterangepicker.module';
import { OpenedDatepickersTrackerService } from '../../providers/opened-datepickers-tracker.service';
import { ClrDatepickerComponent } from './datepicker.component';

@Component({
  template: `<clr-datepicker></clr-datepicker>`,
  providers: [OpenedDatepickersTrackerService],
})
class ClrDaterangeTestComponent {}

@Component({
  template: `<clr-date-container><input clrDate /></clr-date-container>`,
  providers: [ClrPopoverEventsService, ClrPopoverPositionService],
})
class ClrDateTestComponent {
  @ViewChild(ClrDateContainer)
  public dateContainerComponent!: ClrDateContainer;
}

describe('Component: ClrDatepickerComponent', () => {
  describe('ClrDatepickerComponent', () => {
    let fixture: ComponentFixture<ClrDaterangeTestComponent>;
    let openedDatepickersTrackerService: OpenedDatepickersTrackerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClrDaterangepickerModule],
        declarations: [ClrDatepickerComponent, ClrDaterangeTestComponent],
      });
      fixture = TestBed.createComponent(ClrDaterangeTestComponent);
      openedDatepickersTrackerService = fixture.debugElement.injector.get(OpenedDatepickersTrackerService);
    });

    it('should trigger event when opening datepicker', () => {
      // Arrange.
      const spy = jasmine.createSpy('OpenedDatepickersTrackerService');
      openedDatepickersTrackerService.valueChange.subscribe(spy);

      // Act.
      fixture.detectChanges();
      const elm = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      elm.click(); // Click on button next to datepicker input to open datepicker popover.

      // Assert.
      expect(spy).toHaveBeenCalledWith(true);
    });
  });

  describe('ClrDate', () => {
    it('should be able to have access to the (private) toggle service', () => {
      // Arrange.
      TestBed.configureTestingModule({
        imports: [ClarityModule],
        declarations: [ClrDateTestComponent],
      });
      const fixture: ComponentFixture<ClrDateTestComponent> = TestBed.createComponent(ClrDateTestComponent);
      const comp: ClrDateTestComponent = fixture.componentInstance;

      // Act.
      fixture.detectChanges();

      // Assert.
      expect('toggleService' in comp.dateContainerComponent).toBeTrue();
      expect(comp.dateContainerComponent['toggleService']).toBeInstanceOf(ClrPopoverToggleService);
      expect('openChange' in comp.dateContainerComponent['toggleService']).toBeTrue();
      expect(isObservable(comp.dateContainerComponent['toggleService'].openChange)).toBeTrue();
    });
  });
});
