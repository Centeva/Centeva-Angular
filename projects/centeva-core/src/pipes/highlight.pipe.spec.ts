import { HighlightPipe } from "./highlight.pipe";

describe('Highlight Pipe tests', () => {
    const text = 'this is some test text';

    it('create an instance', () => {
      const pipe = new HighlightPipe();

      expect(pipe).toBeTruthy();
    });

    it('Should highlight found text', () => {
      const pipe = new HighlightPipe();

      const searchedTestText = pipe.transform(text, 'test');
      const searchedSomeTestText = pipe.transform(text, 'some test');

      expect(searchedTestText).toBe('this is some <span class="highlight-text">test</span> text');
      expect(searchedSomeTestText).toBe('this is <span class="highlight-text">some</span> <span class="highlight-text">test</span> text');
    });

    it('Should return text upon no matched text', () => {
      const pipe = new HighlightPipe();

      const searchedText = pipe.transform(text, 'bla bla bla');

      expect(searchedText).toBe(text);
    });
});
