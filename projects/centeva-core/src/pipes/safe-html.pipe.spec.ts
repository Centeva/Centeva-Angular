import { DomSanitizer } from '@angular/platform-browser'
import { TestBed } from "@angular/core/testing";
import { SafeHtmlPipe } from './safe-html.pipe';

describe('Safe Html Pipe tests', () => {
  let sanitizer: DomSanitizer;
  let pipe: SafeHtmlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomSanitizer]
    })
    .compileComponents();

    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SafeHtmlPipe(sanitizer);
  })

  it('creates an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
