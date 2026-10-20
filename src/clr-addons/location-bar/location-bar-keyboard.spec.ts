import { Component, provideZoneChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { ClrLocationBarModule } from './location-bar.module';
import { LocationBarNode, NodeId } from './location-bar.model';
import { CONTENT_PROVIDER, LocationBarContentProvider } from './location-bar.provider';
import { SearchResultModel } from './location-bar.search.model';

class TestNodeId extends NodeId {
  constructor(public id: string) {
    super();
  }

  equals(other: TestNodeId): boolean {
    return this.id === other.id;
  }
}

class TestContentProvider extends LocationBarContentProvider<TestNodeId> {
  getLazyChildren(): Observable<LocationBarNode<TestNodeId>[]> {
    return of([]);
  }
}

@Component({
  template: `<clr-location-bar
    [clrRoots]="roots"
    [clrSearchRequest]="searchRequest"
    [clrSearchResultItems]="searchResultItems()"
  ></clr-location-bar>`,
  standalone: false,
})
class HostComponent {
  searchRequest = { placeholder: 'Search' };
  searchResultItems = signal<SearchResultModel[]>([]);
  roots = [createRoot()];
}

function createRoot(): LocationBarNode<TestNodeId> {
  const root = new LocationBarNode(new TestNodeId('root'), 'Root');
  const children = [
    new LocationBarNode(new TestNodeId('child1'), 'Child 1'),
    new LocationBarNode(new TestNodeId('child2'), 'Child 2'),
  ];
  children.forEach(child => child.setChildren([]));
  root.setChildren(children);
  return root;
}

async function settle(fixture: ComponentFixture<unknown>) {
  for (let i = 0; i < 4; i++) {
    fixture.detectChanges(false);
    await fixture.whenStable();
    await new Promise(resolve => setTimeout(resolve, 20));
  }
}

describe('LocationBar keyboard handling', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [ClrLocationBarModule],
      providers: [provideZoneChangeDetection(), { provide: CONTENT_PROVIDER, useClass: TestContentProvider }],
    });
    fixture = TestBed.createComponent(HostComponent);
    document.body.appendChild(fixture.nativeElement);
    await settle(fixture);
  });

  afterEach(() => fixture.nativeElement.remove());

  it('moves to the first search result with arrow down, also after the results were replaced', async () => {
    const triggers = fixture.debugElement.queryAll(By.css('[data-testid="location-bar-dropdown-trigger"]'));
    triggers[triggers.length - 1].nativeElement.click();
    await settle(fixture);
    const input = document.querySelector<HTMLInputElement>('[data-testid="location-bar-search-input"]');

    for (const text of ['abc', 'abcd']) {
      input.value = text;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.componentInstance.searchResultItems.set([
        { name: text + '1' },
        { name: text + '2' },
      ] as SearchResultModel[]);
      await settle(fixture);

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await settle(fixture);

      expect(document.activeElement.getAttribute('data-testid')).toBe('location-bar-search-result-0');
    }
  });
});
