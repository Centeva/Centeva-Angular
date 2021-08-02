import { SafeHtmlPipe } from "projects/centeva-core/src/public-api";
import { DomSanitizer } from '@angular/platform-browser'
import { inject, TestBed } from "@angular/core/testing";

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
