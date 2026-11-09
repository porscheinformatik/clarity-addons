/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { ClrImageGallery, ClrImageGalleryImage } from './image-gallery';

const DATA_URI =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const URL_IMAGE = 'https://example.com/image-1.jpg';

describe('ClrImageGallery', () => {
  let fixture: ComponentFixture<ClrImageGallery>;
  let component: ClrImageGallery;
  let componentRef: ComponentRef<ClrImageGallery>;

  const setImages = (images: ClrImageGalleryImage[]) => {
    componentRef.setInput('images', images);
    fixture.detectChanges();
  };

  const query = (testId: string): DebugElement => fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));

  const usesNgOptimizedImage = (el: DebugElement): boolean => !!el.injector.get(NgOptimizedImage, null);

  const isDataUri = (src: string | null | undefined): boolean =>
    (component as unknown as { isDataUri: (s: string | null | undefined) => boolean }).isDataUri(src);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrImageGallery],
    }).compileComponents();

    fixture = TestBed.createComponent(ClrImageGallery);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isDataUri()', () => {
    it('should return true for data URIs', () => {
      expect(isDataUri(DATA_URI)).toBe(true);
    });

    it('should be case-insensitive and ignore leading whitespace', () => {
      expect(isDataUri('  DATA:image/png;base64,abc')).toBe(true);
    });

    it('should return false for http(s) and relative URLs', () => {
      expect(isDataUri(URL_IMAGE)).toBe(false);
      expect(isDataUri('/assets/image.jpg')).toBe(false);
    });

    it('should return false for empty, null and undefined values', () => {
      expect(isDataUri('')).toBe(false);
      expect(isDataUri(null)).toBe(false);
      expect(isDataUri(undefined)).toBe(false);
    });
  });

  describe('spotlight image', () => {
    it('should not render a spotlight image when there are no images', () => {
      expect(query('image-gallery-spotlight-image')).toBeNull();
    });

    it('should render a data URI with a plain src binding (no NgOptimizedImage)', () => {
      setImages([{ src: DATA_URI, alt: 'Uploaded' }]);

      const img = query('image-gallery-spotlight-image');
      expect(img).not.toBeNull();
      expect(usesNgOptimizedImage(img)).toBe(false);
      expect((img.nativeElement as HTMLImageElement).getAttribute('src')).toBe(DATA_URI);
      expect((img.nativeElement as HTMLImageElement).alt).toBe('Uploaded');
    });

    it('should render a URL image with NgOptimizedImage', () => {
      setImages([{ src: URL_IMAGE, alt: 'Remote' }]);

      const img = query('image-gallery-spotlight-image');
      expect(img).not.toBeNull();
      expect(usesNgOptimizedImage(img)).toBe(true);
    });
  });

  describe('thumbnails', () => {
    it('should not render thumbnails for a single image', () => {
      setImages([{ src: DATA_URI }]);

      expect(query('image-gallery-thumbnails')).toBeNull();
    });

    it('should render each thumbnail with the matching strategy for mixed sources', () => {
      setImages([{ src: URL_IMAGE }, { src: DATA_URI }, { src: 'https://example.com/image-2.jpg' }]);

      const dataThumb = query('image-gallery-thumbnail-image-1');
      const urlThumb = query('image-gallery-thumbnail-image-2');
      expect(usesNgOptimizedImage(dataThumb)).toBe(false);
      expect((dataThumb.nativeElement as HTMLImageElement).getAttribute('src')).toBe(DATA_URI);
      expect(usesNgOptimizedImage(urlThumb)).toBe(true);
    });

    it('should render only data URI thumbnails without NgOptimizedImage', () => {
      setImages([{ src: DATA_URI }, { src: DATA_URI }, { src: DATA_URI }]);

      const imgs = fixture.debugElement.queryAll(By.css('.clr-image-gallery__thumb-img'));
      expect(imgs.length).toBe(2);
      imgs.forEach(img => expect(usesNgOptimizedImage(img)).toBe(false));
    });

    it('should show the remaining count overlay for data URI images', () => {
      setImages(Array.from({ length: 7 }, () => ({ src: DATA_URI })));

      expect(query('image-gallery-remaining-count').nativeElement.textContent.trim()).toBe('2+');
    });
  });

  it('should open the built-in modal with the carousel when a data URI image is clicked', () => {
    setImages([{ src: DATA_URI }, { src: URL_IMAGE }]);

    query('image-gallery-spotlight').nativeElement.click();
    fixture.detectChanges();

    expect(query('image-gallery-dialog')).not.toBeNull();
    expect(query('image-carousel-active-image').nativeElement.getAttribute('src')).toBe(DATA_URI);
  });
});
