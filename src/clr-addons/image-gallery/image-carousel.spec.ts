/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ClrImageCarousel } from './image-carousel';
import { ClrImageGalleryImage } from './image-gallery.types';

const DATA_URI =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const URL_IMAGE = 'https://example.com/image-1.jpg';

describe('ClrImageCarousel', () => {
  let fixture: ComponentFixture<ClrImageCarousel>;
  let component: ClrImageCarousel;
  let componentRef: ComponentRef<ClrImageCarousel>;

  const setImages = (images: ClrImageGalleryImage[]) => {
    componentRef.setInput('images', images);
    fixture.detectChanges();
  };

  const query = (testId: string): DebugElement => fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));

  const activeSrc = (): string | null => query('image-carousel-active-image').nativeElement.getAttribute('src');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrImageCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(ClrImageCarousel);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render the active image or arrows when there are no images', () => {
    expect(query('image-carousel-active-image')).toBeNull();
    expect(query('image-carousel-prev-button')).toBeNull();
    expect(query('image-carousel-next-button')).toBeNull();
  });

  it('should hide the navigation arrows for a single image', () => {
    setImages([{ src: DATA_URI }]);

    expect(query('image-carousel-active-image')).not.toBeNull();
    expect(query('image-carousel-prev-button')).toBeNull();
    expect(query('image-carousel-next-button')).toBeNull();
  });

  it('should show the navigation arrows for multiple images', () => {
    setImages([{ src: DATA_URI }, { src: URL_IMAGE }]);

    expect(query('image-carousel-prev-button')).not.toBeNull();
    expect(query('image-carousel-next-button')).not.toBeNull();
  });

  it('should render a data URI as active image', () => {
    setImages([{ src: DATA_URI, alt: 'Uploaded' }]);

    expect(activeSrc()).toBe(DATA_URI);
    expect(query('image-carousel-active-image').nativeElement.alt).toBe('Uploaded');
  });

  it('should render data URI and URL thumbnails', () => {
    setImages([{ src: DATA_URI }, { src: URL_IMAGE }]);

    expect(query('image-carousel-thumbnail-image-0').nativeElement.getAttribute('src')).toBe(DATA_URI);
    expect(query('image-carousel-thumbnail-image-1').nativeElement.getAttribute('src')).toBe(URL_IMAGE);
  });

  it('should navigate between mixed sources with the arrows (wrapping around)', () => {
    setImages([{ src: DATA_URI }, { src: URL_IMAGE }]);

    query('image-carousel-next-button').nativeElement.click();
    fixture.detectChanges();
    expect(activeSrc()).toBe(URL_IMAGE);

    query('image-carousel-next-button').nativeElement.click();
    fixture.detectChanges();
    expect(activeSrc()).toBe(DATA_URI);

    query('image-carousel-prev-button').nativeElement.click();
    fixture.detectChanges();
    expect(activeSrc()).toBe(URL_IMAGE);
  });

  it('should select an image when its thumbnail is clicked', () => {
    setImages([{ src: URL_IMAGE }, { src: DATA_URI }]);

    query('image-carousel-thumbnail-1').nativeElement.click();
    fixture.detectChanges();

    expect(activeSrc()).toBe(DATA_URI);
  });

  it('should start at the given initial index', () => {
    componentRef.setInput('initialIndex', 1);
    setImages([{ src: URL_IMAGE }, { src: DATA_URI }]);

    expect(activeSrc()).toBe(DATA_URI);
  });
});
