import { ReversePipe } from "./reverse.pipe";

describe('Reverse Pipe tests', () => {

  it('create an instance', () => {
    const pipe = new ReversePipe();

    expect(pipe).toBeTruthy();
  });

  it('reverses array', () => {
    const pipe = new ReversePipe();
    const testArray = [1, 5, 7, 3, 4];

    const reversedArray = pipe.transform(testArray, true);

    expect(reversedArray).toEqual([4, 3, 7, 5, 1]);
  });

  it('does not reverse array', () => {
    const pipe = new ReversePipe();
    const testArray = [1, 5, 7, 3, 4];

    const reversedArray = pipe.transform(testArray, false);

    expect(reversedArray).toEqual([1, 5, 7, 3, 4]);
  });
});
