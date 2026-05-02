

/**
 * Media Breakpoint sizes
 * lt: largest,
 * lr: larger,
 * lg: large,
 * md: medium
 * sm: small,
 * sr: smaller
 */
export type MediaSize = 'lt' | 'lr' | 'lg' | 'md' | 'sm' | 'sr';

/**
 * Sets the breakpoints
 */
export const MEDIA_SIZE_VALUES: Record<MediaSize, number> = {
 sr: 0,
 sm: 576,
 md: 1025,
 lg: 1366,
 lr: 1536,
 lt: 1920,
};

/**
 * Sets array of available breakpoints
 */
export const MEDIA_SIZE: MediaSize[] = ['lt', 'lr', 'lg', 'md', 'sm', 'sr'];


/**
 * Find the current breakpoint and returns the size
 * @returns the breakpoint size or undefined if the match fails
 */
export const getMediaSizeMatch = (): MediaSize | undefined =>
 MEDIA_SIZE.find((mediaSize: MediaSize) => {
   const mediaSizeValue: number = MEDIA_SIZE_VALUES[mediaSize];
   return window.matchMedia(`screen and (min-width: ${mediaSizeValue}px)`).matches;
 });

/**
 * Current Media orientation
 * * portrait: width < height
 * * langscepe: width > height
 */
export type MediaOrientation = 'landscape' | 'portrait';

/**
 * Determines the current media orientation
 * 
 * @returns 'landscape' or 'portrait' 
 */
export const getMediaOrientation = (): MediaOrientation => {
 let landscape = window.matchMedia('screen and orientation: landscape').matches;
 if (!landscape) {
   if (window.matchMedia('screen and orientation: portrait').matches) {
     landscape = false;
   } else {
     landscape = window.innerHeight < window.innerWidth;
   }
 }
 return landscape ? 'landscape' : 'portrait';
};

