import { getMediaOrientation, getMediaSizeMatch, MEDIA_SIZE_VALUES, type MediaSize } from "./utillity-media";

describe('utility-media', () => {
    let screenWidth = 1024;
    let screenOrientation = 'landscape';
  // Mock window.matchMedia for each test to control its behavior
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => {
        const widthMatch = query.match(/min-width: (\d+)px/);
        const orientMatch = query.match(/orientation: (\w+)/);
        let match = false;
        let checkWidth = false;
        let checkOrient = false;
        let widthValue = false;
        let orientValue = false;
        if (widthMatch) {
            checkWidth = true;
            widthValue = !!Object.keys(MEDIA_SIZE_VALUES).find((breakpoint: MediaSize) => (screenWidth >= widthMatch[1]));
        }
        if (orientMatch) {
            checkOrient = true;
            orientValue = screenOrientation === orientMatch[1];
        }
        if (checkWidth && checkOrient) {
            match = widthValue && orientValue;
        } else if (checkWidth) {
            match = widthValue;
        } else if (checkOrient) {
            match = orientValue;
        }

        return {
        matches: match,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }}),
    });
  });

  it('getMediaSizeMatch', () => {
    Object.keys(MEDIA_SIZE_VALUES).forEach((breakpoint: MediaSize) => {
        const size = MEDIA_SIZE_VALUES[breakpoint];
        screenWidth = size;
        expect(getMediaSizeMatch()).toBe(breakpoint);
    });
  });
  it('getMediaOrientation', () => {
    screenOrientation = 'landscape';
    expect(getMediaOrientation()).toBe('landscape');
    screenOrientation = 'portrait';
    expect(getMediaOrientation()).toBe('portrait');
  });

  it('getMediaSizeMatch with orientation', () => {
    screenWidth = MEDIA_SIZE_VALUES.md;
    screenOrientation = 'landscape';
    expect(getMediaSizeMatch()).toBe('md');
    screenOrientation = 'portrait';
  });
});