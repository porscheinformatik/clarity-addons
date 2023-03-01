import { ClrAlignment, ClrAxis, ClrPopoverPosition, ClrSide } from '@clr/angular';

/**
 * Popover positions.
 * https://github.com/vmware-clarity/ng-clarity/blob/f1a668086bf88bcf5ef1cd36b0d150e45e88def7/projects/angular/src/utils/popover/enums/positions.enum.ts
 */
export class PopoverPositions {
  public static 'top-right': ClrPopoverPosition = {
    axis: ClrAxis.VERTICAL,
    side: ClrSide.BEFORE,
    anchor: ClrAlignment.END,
    content: ClrAlignment.END,
  };

  public static 'top-left': ClrPopoverPosition = {
    axis: ClrAxis.VERTICAL,
    side: ClrSide.BEFORE,
    anchor: ClrAlignment.START,
    content: ClrAlignment.START,
  };

  public static 'bottom-right': ClrPopoverPosition = {
    axis: ClrAxis.VERTICAL,
    side: ClrSide.AFTER,
    anchor: ClrAlignment.END,
    content: ClrAlignment.END,
  };

  public static 'bottom-left': ClrPopoverPosition = {
    axis: ClrAxis.VERTICAL,
    side: ClrSide.AFTER,
    anchor: ClrAlignment.START,
    content: ClrAlignment.START,
  };

  public static 'right-top': ClrPopoverPosition = {
    axis: ClrAxis.HORIZONTAL,
    side: ClrSide.AFTER,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.END,
  };

  public static 'right-bottom': ClrPopoverPosition = {
    axis: ClrAxis.HORIZONTAL,
    side: ClrSide.AFTER,
    anchor: ClrAlignment.START,
    content: ClrAlignment.START,
  };

  public static 'left-top': ClrPopoverPosition = {
    axis: ClrAxis.HORIZONTAL,
    side: ClrSide.BEFORE,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.END,
  };

  public static 'left-bottom': ClrPopoverPosition = {
    axis: ClrAxis.HORIZONTAL,
    side: ClrSide.BEFORE,
    anchor: ClrAlignment.START,
    content: ClrAlignment.START,
  };
}
