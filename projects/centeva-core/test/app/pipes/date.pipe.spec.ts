import { DatePipe } from "projects/centeva-core/src/pipes/date.pipe";
import { DateTime } from "luxon";

describe('DatePipe', () => {
    const exampleDate = DateTime.local(2000, 1, 1);

    it('create an instance', () => {
      const pipe = new DatePipe();

      expect(pipe).toBeTruthy();
    });

    it('converts date to default yyyy-MM-dd', () => {
      const pipe = new DatePipe();

      const formattedDate = pipe.transform(exampleDate);

      expect(formattedDate).toBe('2000-01-01');
    });

    it('format date to MM/dd/yyyy', () => {
      const pipe = new DatePipe();

      const formattedDate = pipe.transform(exampleDate, 'MM/dd/yyyy');

      expect(formattedDate).toBe('01/01/2000');
    });

    it('format date to M/d/yyyy', () => {
      const pipe = new DatePipe();

      const formattedDate = pipe.transform(exampleDate, 'M/d/yyyy');

      expect(formattedDate).toBe('1/1/2000');
    });

    it('format date to MMMM dd, yyyy', () => {
      const pipe = new DatePipe();

      const formattedDate = pipe.transform(exampleDate, 'MMMM dd, yyyy');

      expect(formattedDate).toBe('January 01, 2000');
    });
});
