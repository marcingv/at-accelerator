import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

fdescribe('LocalStorageService', () => {
  let service: LocalStorageService;
  const KEY = 'test';

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(LocalStorageService);
    service.clearItem(KEY);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Reading and writing static values', () => {
    it('should initially have empty value for specified key', () => {
      expect(service.hasItem(KEY)).toBeFalse();
      expect(service.getItem(KEY)).toBeNull();
    });

    it('should save value to storage', () => {
      const dataObj = { name: 'Test object' };

      expect(service.hasItem(KEY)).toBeFalse();

      service.setItem(KEY, dataObj);

      expect(service.getItem(KEY)).toBeTruthy();
      expect(service.getItem(KEY)).toEqual(dataObj);
    });

    it('should clear value', () => {
      service.setItem(KEY, 'test value');

      expect(service.hasItem(KEY)).toBeTrue();
      expect(service.getItem(KEY)).toBeTruthy();

      service.clearItem(KEY);

      expect(service.hasItem(KEY)).toBeFalse();
      expect(service.getItem(KEY)).toBeFalsy();
    });
  });

  describe('Reading and writing values as signals', () => {
    it('should initially have empty value for specified key', () => {
      const hasItemSignal = service.hasItemSignal(KEY);
      const getItemSignal = service.getItemSignal(KEY);

      expect(hasItemSignal()).toBeFalse();
      expect(getItemSignal()).toBeNull();
    });

    it('should provide values as signal', () => {
      const dataObj1 = { name: 'Test object' };
      const dataObj2 = { name: 'Updated test object' };

      const hasValueSignal = service.hasItemSignal(KEY);
      const valueSignal = service.getItemSignal(KEY);

      expect(hasValueSignal()).toBeFalse();

      service.setItem(KEY, dataObj1);
      expect(valueSignal()).toEqual(dataObj1);

      service.setItem(KEY, dataObj2);
      expect(valueSignal()).toEqual(dataObj2);
    });

    it('should clear value', () => {
      const hasValueSignal = service.hasItemSignal(KEY);
      const valueSignal = service.getItemSignal(KEY);

      expect(hasValueSignal()).toBeFalse();
      expect(valueSignal()).toBeNull();

      service.setItem(KEY, 'test value');

      expect(hasValueSignal()).toBeTrue();
      expect(valueSignal()).toBeTruthy();

      service.clearItem(KEY);

      expect(hasValueSignal()).toBeFalse();
      expect(valueSignal()).toBeNull();
    });
  });
});
