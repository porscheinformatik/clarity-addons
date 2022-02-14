import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClrDropdownModule, ClrIconModule } from '@clr/angular';
import { Observable, of } from 'rxjs';
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
      imports: [ClrIconModule, ClrDropdownModule],
      providers: [{ provide: CONTENT_PROVIDER, useClass: TestContentProvider }],
    }).compileComponents();

    /* create component and test fixture */
    fixture = TestBed.createComponent<LocationBarComponent<TestNodeId>>(LocationBarComponent);
    component = fixture.componentInstance;
    spyOn(component.selectionChanged, 'emit');
  });

  it(
    'Render selectable node',
    waitForAsync(() => {
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
    })
  );

  it(
    'Render not selectable node',
    waitForAsync(() => {
      /* GIVEN */
      const nodeId = new TestNodeId(Math.floor(Math.random() * 1000).toString());
      component.roots = [new LocationBarNode(nodeId, 'Global Root Node', false)];

      /* WHEN */
      fixture.detectChanges();

      /* THEN */
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const span = fixture.debugElement.query(By.css('.unselectable-node'));
        expect(span).toBeTruthy();
        const button: HTMLSpanElement = span.nativeElement;
        expect(button.textContent).toContain('Global Root Node');
      });
    })
  );

  it(
    'Select node',
    waitForAsync(() => {
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
    })
  );
});
