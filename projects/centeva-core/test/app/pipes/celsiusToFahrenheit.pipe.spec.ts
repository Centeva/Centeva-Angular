import { CelsiusToFahrenheitPipe } from "projects/centeva-core/src/pipes/celsiusToFahrenheit.pipe";


describe('CelsiusToFahrenheit Pipe Tests', () => {
    it('Should convert correctly', () => {
        var pipe = new CelsiusToFahrenheitPipe();
        expect(pipe.transform(100)).toEqual(212);
        expect(pipe.transform(0)).toEqual(32);
    })
});