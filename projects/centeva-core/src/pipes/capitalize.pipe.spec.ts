import { CapitalizePipe } from "./capitalize.pipe";

describe('Capitalize Pipe Tests', () => {
    it('Should capitalize correctly', () => {
        var pipe = new CapitalizePipe();
        expect(pipe.transform('test')).toEqual('Test');
        expect(pipe.transform('test ya')).toEqual('Test Ya');
    })
});
