import { PhoneNumberPipe } from "projects/centeva-core/src/public-api";

describe('PhoneNumber Pipe tests', () => {
  it('creates an instance', () => {
    const pipe = new PhoneNumberPipe();

    expect(pipe).toBeTruthy();
  });

  it('Identifies 7 digit phone number without dash', () => {
    const pipe = new PhoneNumberPipe();
    const phoneNumber = '1234567';

    const cleanedNumber = pipe.transform(phoneNumber);

    expect(cleanedNumber).toBe('123-4567');
  });

  it('Identifies 7 digit phone number with dash', () => {
    const pipe = new PhoneNumberPipe();
    const phoneNumber = '123-4567';

    const cleanedNumber = pipe.transform(phoneNumber);

    expect(cleanedNumber).toBe('123-4567');
  });

  it('Identifies 10 digit phone number without dashes', () => {
    const pipe = new PhoneNumberPipe();
    const phoneNumber = '1234567890';

    const cleanedNumber = pipe.transform(phoneNumber);

    expect(cleanedNumber).toBe('(123)456-7890');
  });

  it('Identifies 10 digit phone number with dashes', () => {
    const pipe = new PhoneNumberPipe();
    const phoneNumber = '123-456-7890';

    const cleanedNumber = pipe.transform(phoneNumber);

    expect(cleanedNumber).toBe('(123)456-7890');
  });

  it('Identifies 11 digit phone number', () => {
    const pipe = new PhoneNumberPipe();
    const phoneNumber = '12345678901';

    const cleanedNumber = pipe.transform(phoneNumber);

    expect(cleanedNumber).toBe('1(234)567-8901');
  });

  it('Returns cleaned invalid phone number', () => {
    const pipe = new PhoneNumberPipe();
    const phoneNumber = '1-2-3-4-5-6';

    const cleanedNumber = pipe.transform(phoneNumber);

    expect(cleanedNumber).toBe('123456');
  });
});
