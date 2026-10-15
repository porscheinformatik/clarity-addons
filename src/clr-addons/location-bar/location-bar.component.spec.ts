import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClrDropdownModule, ClrIcon } from '@clr/angular';
import { Observable, of, Subject, throwError } from 'rxjs';
import { LocationBarNodeComponent } from './location-bar-node/location-bar-node.component';
import { LocationBarComponent } from './location-bar.component';
import { LocationBarNode, NodeId } from './location-bar.model';
import { CONTENT_PROVIDER, LocationBarContentProvider } from './location-bar.provider';

class TestNodeId extends NodeId {
  constructor(public id: string) {
    super();
  }

  equals(other: TestNodeId): boolean {
    return this.id === other.id;
  }
}

class TestContentProvider extends LocationBarContentProvider<TestNodeId> {
  getLazyChildren(node: LocationBarNode<TestNodeId>): Observable<LocationBarNode<TestNodeId>[]> {
    if (node.id.id === 'lazy') {
      return of([new LocationBarNode(new TestNodeId('lazyChild'), 'Lazy child')]);
    }
    return of([]);
  }
}

describe('LocationBarComponent', () => {
  let component: LocationBarComponent<TestNodeId>;
  let fixture: ComponentFixture<LocationBarComponent<TestNodeId>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationBarComponent, LocationBarNodeComponent],
      imports: [ClrIcon, ClrDropdownModule],
      providers: [{ provide: CONTENT_PROVIDER, useClass: TestContentProvider }],
    }).compileComponents();

    /* create component and test fixture */
    fixture = TestBed.createComponent<LocationBarComponent<TestNodeId>>(LocationBarComponent);
    component = fixture.componentInstance;
    spyOn(component.selectionChanged, 'emit');
  });

  it('Render selectable node', waitForAsync(() => {
    /* GIVEN */
    const nodeId = new TestNodeId(Math.floor(Math.random() * 1000).toString());
    component.roots = [new LocationBarNode(nodeId, 'Global Root Node')];

    /* WHEN */
    fixture.detectChanges();

    /* THEN */
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const buttonDebug = fixture.debugElement.query(By.css('button'));
      expect(buttonDebug).toBeTruthy();
      const button: HTMLButtonElement = buttonDebug.nativeElement;
      expect(button.textContent).toContain('Global Root Node');
      expect(button.disabled).toBeFalsy();
    });
  }));

  it('Render not selectable node', waitForAsync(() => {
    /* GIVEN */
    const nodeId = new TestNodeId(Math.floor(Math.random() * 1000).toString());
    component.roots = [new LocationBarNode(nodeId, 'Global Root Node', false)];

    /* WHEN */
    fixture.detectChanges();

    /* THEN */
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const span = fixture.debugElement.query(By.css('.locationbar-unselectable-node'));
      expect(span).toBeTruthy();
      const button: HTMLSpanElement = span.nativeElement;
      expect(button.textContent).toContain('Global Root Node');
    });
  }));

  it('Select node', waitForAsync(() => {
    /* GIVEN */
    const nodeId = new TestNodeId(Math.floor(Math.random() * 1000).toString());
    component.roots = [new LocationBarNode(nodeId, 'Global Root Node', true)];

    /* WHEN */
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const buttonDebug = fixture.debugElement.query(By.css('button'));
      expect(buttonDebug).toBeTruthy();
      buttonDebug.nativeElement.click();

      /* THEN */
      expect(component.selectionChanged.emit).toHaveBeenCalledWith([nodeId]);
    });
  }));

  it('Shows a spinner while lazy children are loading and hides it afterwards', waitForAsync(() => {
    /* GIVEN */
    const provider = TestBed.inject(CONTENT_PROVIDER) as TestContentProvider;
    const children$ = new Subject<LocationBarNode<TestNodeId>[]>();
    spyOn(provider, 'getLazyChildren').and.returnValue(children$);
    component.roots = [new LocationBarNode(new TestNodeId('root'), 'Root')];

    /* WHEN */
    fixture.detectChanges();

    /* THEN */
    const loadingSelector = '[data-testid="location-bar-loading-spinner"]';
    fixture
      .whenStable()
      .then(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(loadingSelector))).toBeTruthy();

        children$.next([new LocationBarNode(new TestNodeId('child'), 'Child')]);
        children$.complete();
        return fixture.whenStable();
      })
      .then(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(loadingSelector))).toBeNull();
      });
  }));

  it('Shows a spinner until roots are available, but not for an empty root list', () => {
    const rootsSpinner = '[data-testid="location-bar-roots-spinner"]';
    component.roots = null;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(rootsSpinner))).toBeTruthy();

    component.roots = [];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(rootsSpinner))).toBeNull();

    component.roots = [new LocationBarNode(new TestNodeId('root'), 'Root')];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(rootsSpinner))).toBeNull();
  });

  it('Hides the spinner when loading the children fails', waitForAsync(() => {
    const provider = TestBed.inject(CONTENT_PROVIDER) as TestContentProvider;
    spyOn(provider, 'getLazyChildren').and.returnValue(throwError(() => new Error('boom')));
    component.roots = [new LocationBarNode(new TestNodeId('root'), 'Root')];
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('[data-testid="location-bar-loading-spinner"]'))).toBeNull();
    });
  }));

  it('Does not fail when the view is destroyed before the children arrive', waitForAsync(() => {
    const provider = TestBed.inject(CONTENT_PROVIDER) as TestContentProvider;
    const children$ = new Subject<LocationBarNode<TestNodeId>[]>();
    spyOn(provider, 'getLazyChildren').and.returnValue(children$);
    component.roots = [new LocationBarNode(new TestNodeId('root'), 'Root')];
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.destroy();
      expect(() => children$.next([])).not.toThrow();
      return fixture.whenStable();
    });
  }));
});
