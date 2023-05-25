import { OpenedDatepickersTrackerService } from './opened-datepickers-tracker.service';

describe('Service: OpenedDatepickersTrackerService', () => {
  it('should emit change event and return `true` after tracking an opened datepicker', () => {
    // Arrange.
    const service = new OpenedDatepickersTrackerService();
    const spy = jasmine.createSpy();
    service.valueChange.subscribe(spy);

    // Act.
    service.track(true);

    // Assert.
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should emit change event and return `false` after tracking closed datepickers', () => {
    // Arrange.
    const service = new OpenedDatepickersTrackerService();
    const spy = jasmine.createSpy();
    service.valueChange.subscribe(spy);

    // Act.
    service.track(true);
    service.track(false);
    service.track(false);
    service.track(false);

    // Assert.
    expect(spy).toHaveBeenCalledWith(false);
  });
});
