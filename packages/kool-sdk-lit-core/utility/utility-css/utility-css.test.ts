import { getColorHex, getCssClass, getCssVar, getCssVars, getCssPrefixClass, getResolvedCssVar, getValidCssVar, setCssVar, setCssVars } from './utility-css'
import { getTestMockCssVar } from '../../../test/mock/css-var.test.util'

describe('utility-css', () => {
  it('getCssClass string', () => {
    expect(getCssClass('k-card', 'k-card-panel')).toBe('k-card k-card-panel')
  })
  it('getCssClass array', () => {
    expect(getCssClass(['k-card', 'k-card-panel'])).toBe('k-card k-card-panel')
  })
  it('getCssClass conditional boolean', () => {
    expect(getCssClass('k-card3', { 'k-card-panel3': true })).toBe('k-card3 k-card-panel3')
  })

  it('setCssVar and getCssVar', () => {
    const color = '#113322'
    const [mockElement, mockSetProperty] = getTestMockCssVar()
    setCssVar('--bg', color, mockElement as HTMLElement)
    expect(mockSetProperty).toHaveBeenCalled()
    const bg = getCssVar('--bg')
    expect(bg).toBe(color)
  })

  it('setCssVars and getCssVars by array', () => {
    const colors = {
        '--c1': '#113322',
        '--c2': '#332211',
        '--c3': '#FF00FF',
        '--c4': '#33FF33',
    };

    const [mockElement, mockSetProperty] = getTestMockCssVar()
    setCssVars(colors, mockElement as HTMLElement)
    expect(mockSetProperty).toHaveBeenCalled()
    const colorValues = getCssVars(['--c1', '--c2', '--c3', '--c4', ]);
    expect(colorValues).toStrictEqual(colors);
  });

  it('setCssVars and getCssVars by object', () => {
    const colors = {
        '--c1': '#113322',
        '--c2': '#332211',
        '--c3': '#FF00FF',
        '--c4': '#33FF33',
    };

        const colorsGet = {
        '--c1': '#133222',
        '--c2': '#322112',
        '--c3': '#F00FF2',
        '--c4': '#3FF332',
    };

    const [mockElement, mockSetProperty] = getTestMockCssVar()
    setCssVars(colors, mockElement as HTMLElement)
    expect(mockSetProperty).toHaveBeenCalled()
    const colorValues = getCssVars(colorsGet);
    expect(colorValues).toStrictEqual(colors);
  });

  it('getResolvedCssVar recursive value', () => {
    const surface01 = '#F36534';
    const [mockElement, mockSetProperty] = getTestMockCssVar({
        '--bg': 'var(--color-input-bg)',
        '--color-input-bg': 'var(--surface01)',
        '--surface01': surface01,
    });
    const color = getResolvedCssVar('--bg', mockElement as HTMLElement);
    expect(color).toBe(surface01);
  });

  it('getResolvedCssVar recursive invalid', () => {
    const surface01 = '#F36534';
    const [mockElement, mockSetProperty] = getTestMockCssVar({
        '--bg': 'var(--color-input-bg)',
        '--color-input-bg': 'var(--surface01)',
        '--surface01': 'var(--bg)',
    });
    const color = getResolvedCssVar('--bg', mockElement as HTMLElement);
    expect(color).toBe('--bg');
  });

  it('getColorHex value', () => {
    expect(getColorHex(0)).toBe('00');
    expect(getColorHex(135)).toBe('87');
    expect(getColorHex(255)).toBe('ff');
  });

    it('getColorHex percent', () => {
    expect(getColorHex(0, true)).toBe('00');
    expect(getColorHex(50, true)).toBe('7f');
    expect(getColorHex(75, true)).toBe('bf');
    expect(getColorHex(100, true)).toBe('ff');
  });

  it('getValidCssVar CSS vars without beginning --', () => {
    expect(getValidCssVar('bg')).toBe('--bg');
  });

  it('getCssPrefixClass with string classes', () => {
    expect(getCssPrefixClass('title', 'header')).toBe('k-title-header');
  });

  it('getCssPrefixClass remove empty strings, null and undefined', () => {
    expect(getCssPrefixClass('', 'title', undefined, null, 'header')).toBe('k-title-header');
  });

  it('getCssPrefixClass flattens array', () => {
    expect(getCssPrefixClass('', [undefined, 'title'], 'header')).toBe('k-title-header');
    // expect(getCssPrefixClass('', ['title', undefined], null, 'header')).toBe('k-title-header');
  });
})
