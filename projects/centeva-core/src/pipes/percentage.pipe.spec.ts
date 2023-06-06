import { PercentagePipe } from "./percentage.pipe";

describe('Percentage Pipe tests', () => {
    it('create an instance', () => {
      const pipe = new PercentagePipe();

      expect(pipe).toBeTruthy();
    });

    it('turns number into percentage', () => {
      const pipe = new PercentagePipe();
      const number1 = .452;
      const number2 = .006;
      const number3 = 1;

      const result1 = pipe.transform(number1);
      const result2 = pipe.transform(number2);
      const result3 = pipe.transform(number3);

      expect(result1).toBe(45);
      expect(result2).toBe(1);
      expect(result3).toBe(100);
    });
});
