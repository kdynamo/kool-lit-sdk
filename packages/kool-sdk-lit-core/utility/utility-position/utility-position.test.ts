import { getDimensionOnScreen } from "./utility-position"

describe('utility-position', () => {

    it('getDimensionOnScreen inside dimensions', () => {
        const finalX = getDimensionOnScreen(100, 300, 400, true, false)
        expect(finalX).toBe(100);
    });

    it('getDimensionOnScreen keep on screen with negative  dimensions', () => {
        const finalX = getDimensionOnScreen(-100, 300, 400, true, false)
        expect(finalX).toBe(0);
    });

    it('getDimensionOnScreen keep on screen with over right dimensions', () => {
        const finalX = getDimensionOnScreen(200, 300, 400, true, false)
        expect(finalX).toBe(100);
    });

    it('getDimensionOnScreen keep on screen wider than max  dimensions, show left', () => {
        const finalX = getDimensionOnScreen(200, 500, 400, true, true)
        expect(finalX).toBe(0);
    });
});