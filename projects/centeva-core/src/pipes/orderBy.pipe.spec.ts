import { OrderByPipe } from "./orderBy.pipe";

describe('OrderBy Pipe tests', () => {
    const greenHat = { name: 'hat', color: 'green', number: 3};
    const purpleShirt = { name: 'shirt', color: 'purple', number: 1};
    const bluePants = { name: 'pants', color: 'blue', number: 2};
    const testArray = [ greenHat, purpleShirt, bluePants];

    it('create an instance', () => {
      const pipe = new OrderByPipe();

      expect(pipe).toBeTruthy();
    });


    it('sorts by name', () => {
      const pipe = new OrderByPipe();

      const sortedArray = pipe.transform(testArray, 'name');

      expect(sortedArray[0]).toBe(greenHat);
      expect(sortedArray[1]).toBe(bluePants);
      expect(sortedArray[2]).toBe(purpleShirt);
    });

    it('sorts by color', () => {
      const pipe = new OrderByPipe();

      const sortedArray = pipe.transform(testArray, 'color');

      expect(sortedArray[0]).toBe(bluePants);
      expect(sortedArray[1]).toBe(greenHat);
      expect(sortedArray[2]).toBe(purpleShirt);
    });

    it('sorts by number', () => {
      const pipe = new OrderByPipe();

      const sortedArray = pipe.transform(testArray, 'number');

      expect(sortedArray[0]).toBe(purpleShirt);
      expect(sortedArray[1]).toBe(bluePants);
      expect(sortedArray[2]).toBe(greenHat);
    });
});
