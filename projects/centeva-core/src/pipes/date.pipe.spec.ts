import { DateTime } from "luxon";
import * as moment from "moment";
import { DatePipe } from "./date.pipe";

describe('DatePipe', () => {
    const exampleDate = DateTime.local(2000, 1, 1);
    const pipe = new DatePipe();

    it('create an instance', () => {
      expect(pipe).toBeTruthy();
    });

    it('converts date to default yyyy-MM-dd', () => {
      const formattedDate = pipe.transform(exampleDate, 'yyyy-MM-dd');

      expect(formattedDate).toBe('2000-01-01');
    });

    it('format date to MM/dd/yyyy', () => {

      const formattedDate = pipe.transform(exampleDate, 'MM/dd/yyyy');

      expect(formattedDate).toBe('01/01/2000');
    });

    it('format date to M/d/yyyy', () => {
      const formattedDate = pipe.transform(exampleDate, 'M/d/yyyy');

      expect(formattedDate).toBe('1/1/2000');
    });

    it('format date to MMMM dd, yyyy', () => {
      const formattedDate = pipe.transform(exampleDate, 'MMMM dd, yyyy');

      expect(formattedDate).toBe('January 01, 2000');
    });

    it('should be able to format js date', () => {
      expect(pipe.transform(new Date('2020-01-01 MST'), 'MM-dd-yyyy')).toBe('01-01-2020');
    });
    it ('should be able to handle moment date', () => {
      expect(pipe.transform(moment('2020-01-01 MST'), 'MM-dd-yyyy')).toBe('01-01-2020');
    });
    it ('should be able to string date format', () => {
      expect(pipe.transform('2020-01-01 MST', 'MM-dd-yyyy')).toBe('01-01-2020');
    });
});
