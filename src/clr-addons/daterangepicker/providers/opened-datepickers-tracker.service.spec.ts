import { OpenedDatepickersTrackerService } from './opened-datepickers-tracker.service';

describe('Service: OpenedDatepickersTrackerService', () => {
  it('should emit change event and return `true` after tracking an opened datepicker', () => {
    // Arrange.
    const service = new OpenedDatepickersTrackerService();
    let emittedOpenedStateValue: boolean;
    service.valueChange.subscribe(openedState => (emittedOpenedStateValue = openedState));

    // Act.
    service.track(true);

    // Assert.
    expect(emittedOpenedStateValue).toBeTrue();
  });

  it('should emit change event and return `false` after tracking closed datepickers', () => {
    // Arrange.
    const service = new OpenedDatepickersTrackerService();
    let emittedOpenedStateValue: boolean;
    service.valueChange.subscribe(openedState => (emittedOpenedStateValue = openedState));

    // Act.
    service.track(true);
    service.track(false);
    service.track(false);
    service.track(false);

    // Assert.
    expect(emittedOpenedStateValue).toBeFalse();
  });
});
