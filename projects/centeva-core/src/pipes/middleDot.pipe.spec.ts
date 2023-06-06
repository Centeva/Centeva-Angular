import { MiddleDotPipe } from "./middleDot.pipe";

describe('MiddleDot Pipe tests', () => {
    const text = 'test text';

    it('create an instance', () => {
      const pipe = new MiddleDotPipe();

      expect(pipe).toBeTruthy();
    });

    it('adds a middle dot', () => {
      const pipe = new MiddleDotPipe();

      const dotText = pipe.transform(text, 1);

      expect(dotText).toBe('∙test text');
    });

    it('adds two middle dots', () => {
      const pipe = new MiddleDotPipe();

      const dotText = pipe.transform(text, 2);

      expect(dotText).toBe('∙∙test text');
    });
});
