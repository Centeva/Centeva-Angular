import * as assert from 'assert';
import * as _ from 'lodash';
import { Utils } from '../../src/common/utils/utils';


describe('Utils Tests', () => {

  describe('SortByName', () => {

    it('Should be able to sort a simple list', () => {
      const list = [
        {name: '103'},
        {name: '102'},
        {name: '104'},
        {name: '105'},
        {name: '101'},
      ];
      const sortedList = Utils.SortByName(list);
      expect(sortedList[0].name).toBe('101');
      expect(sortedList[1].name).toBe('102');
      expect(sortedList[2].name).toBe('103');
      expect(sortedList[3].name).toBe('104');
      expect(sortedList[4].name).toBe('105');
    });

    it('Should sort a more complicated case (numbers are not same length)', () => {
      const list = [
        {name: '10'},
        {name: '3'},
        {name: '1'},
        {name: '2'},
        {name: '11'},
        {name: '101' },
      ];
      const sortedList = Utils.SortByName(list);
      expect(sortedList[0].name).toBe('1');
      expect(sortedList[1].name).toBe('2');
      expect(sortedList[2].name).toBe('3');
      expect(sortedList[3].name).toBe('10');
      expect(sortedList[4].name).toBe('11');
      expect(sortedList[5].name).toBe('101');
    });

  });

  describe('Phone Validating', () => {
    it('Should validate a valid phone number', () => {
        expect(Utils.IsValidPhoneNumber('(435)555-4444')).toBeTruthy();
        expect(Utils.IsValidPhoneNumber('4355554444')).toBeTruthy();
        expect(Utils.IsValidPhoneNumber('435-555-4444')).toBeTruthy();
        expect(Utils.IsValidPhoneNumber('14355554444')).toBeTruthy();
    });
    it('Should reject invalid phone numbers', () => {
        expect(Utils.IsValidPhoneNumber('abcdefg')).toBeFalsy();
        expect(Utils.IsValidPhoneNumber('1-800-FREETHEBIRDS')).toBeFalsy();
    });
  });

  describe('Email Validating', () => {
    it('Should validate a valid email', () => {
        expect(Utils.IsValidEmail('validEmail@valid.com')).toBeTruthy();
        expect(Utils.IsValidEmail('valid@val.net')).toBeTruthy();
        expect(Utils.IsValidEmail('valid@validity-valid.org')).toBeTruthy();
    });
    it('Should reject invalid emails', () => {
        expect(Utils.IsValidEmail('fake')).toBeFalsy();
        expect(Utils.IsValidEmail('fake@fake')).toBeFalsy();
        expect(Utils.IsValidEmail('fake@')).toBeFalsy();
        expect(Utils.IsValidEmail('@fake.com')).toBeFalsy();
    });
  });

  
  describe('Straight Distance', () => {
    it('Should be able to calculate the distance between coordinates', () => {
        const dist = Utils.straightDistance(42.990967, -71.463767, 0.0, 0.0);
        expect(dist).toBeGreaterThan(8511);
        expect(dist).toBeLessThan(8513);
    });

    it('Should calculate a distance of 0', () => {
      assert.equal(Utils.straightDistance(1, 1, 1, 1), 0);
    });
  });

  describe('States', () => {
    it('Should provide a list of states with their abbreviations', () => {
      const statesAndAbbreviationList = Utils.GetStateAndAbbreviationList();
      _.forEach(statesAndAbbreviationList, (s) => {
          expect(s.state).toBeDefined();
          expect(s.abbreviation).toBeDefined();
      });
    });

    it('Should provide a state name given its abbreviation', () => {
      const state = Utils.GetStateName('UT');
      expect(state).toEqual('Utah');
      expect(Utils.GetStateName('QW')).toBeUndefined();
    });

    it('Should provide a state abbreviation given its name', () => {
      const abbreviation = Utils.GetStateAbbreviation('Utah');
      expect(abbreviation).toEqual('UT');
      expect(Utils.GetStateAbbreviation('Pawnee')).toBeUndefined();

    });
  });

  describe('Build CSV String', () => {
    const fakeCSV = [['Header 1', 'Header 2'], ['Value 1', 'Value 2']];
    it('Should be able to build a CSV string from empty rows', () => {
      const csvString = Utils.buildCSVString([]);
      expect(csvString).toEqual('');
    });

    it('Should be able to build a CSV string from empty rows using a delimiter', () => {
      const csvString = Utils.buildCSVString([], ' ');
      expect(csvString).toEqual('');
    });

    it('Should be able to build a CSV string with default delimiter', () => {
      const expectedCSVStringCommas = `"Header 1","Header 2"\n"Value 1","Value 2"`;
      const csvString = Utils.buildCSVString(fakeCSV);
      expect(csvString).toEqual(expectedCSVStringCommas);
    });

    it('Should be able to build a CSV string with space delimiter', () => {
      const expectedCSVStringSpace = `"Header 1" "Header 2"\n"Value 1" "Value 2"`;
      const csvString = Utils.buildCSVString(fakeCSV, ' ');
      expect(csvString).toEqual(expectedCSVStringSpace);
    });

    it('Should be able to build a short CSV with no , or spaces', () => {
      const csvString = Utils.buildCSVString([['Header'], ['Value']]);
      expect(csvString).toEqual('Header\nValue');
    });
  });

  describe('Build CSV Link', () => {
    const fakeCSV = [['Header 1', 'Header2'], ['Value1', 'Value 2']];
    it('Should return with empty rows and no filename', () => {
      const link = Utils.buildCSVLink([[]]);
      expect(link).toBeUndefined();
    });
    it('Should return link with rows and no filename', () => {
      const link = Utils.buildCSVLink(fakeCSV);
      expect(link.download).toBe('download.csv');
      expect(link.href).toContain('data:text/csv;charset=UTF-8,');
    });
    it('Should return link', () => {
      const link = Utils.buildCSVLink(fakeCSV, 'explode.csv');
      expect(link.download).toBe('explode.csv');
      expect(link.href).toContain('data:text/csv;charset=UTF-8,');
    });
  });
});
