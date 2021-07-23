import * as _ from 'lodash';

// @dynamic
export class Utils {

  public static UnitedStates = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'District of Columbia',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  public static States = [
    ['Alabama', 'AL'],
    ['Alaska', 'AK'],
    ['Arizona', 'AZ'],
    ['Arkansas', 'AR'],
    ['California', 'CA'],
    ['Colorado', 'CO'],
    ['Connecticut', 'CT'],
    ['Delaware', 'DE'],
    ['Florida', 'FL'],
    ['Georgia', 'GA'],
    ['Hawaii', 'HI'],
    ['Idaho', 'ID'],
    ['Illinois', 'IL'],
    ['Indiana', 'IN'],
    ['Iowa', 'IA'],
    ['Kansas', 'KS'],
    ['Kentucky', 'KY'],
    ['Louisiana', 'LA'],
    ['Maine', 'ME'],
    ['Maryland', 'MD'],
    ['Massachusetts', 'MA'],
    ['Michigan', 'MI'],
    ['Minnesota', 'MN'],
    ['Mississippi', 'MS'],
    ['Missouri', 'MO'],
    ['Montana', 'MT'],
    ['Nebraska', 'NE'],
    ['Nevada', 'NV'],
    ['New Hampshire', 'NH'],
    ['New Jersey', 'NJ'],
    ['New Mexico', 'NM'],
    ['New York', 'NY'],
    ['North Carolina', 'NC'],
    ['North Dakota', 'ND'],
    ['Ohio', 'OH'],
    ['Oklahoma', 'OK'],
    ['Oregon', 'OR'],
    ['Pennsylvania', 'PA'],
    ['Rhode Island', 'RI'],
    ['South Carolina', 'SC'],
    ['South Dakota', 'SD'],
    ['Tennessee', 'TN'],
    ['Texas', 'TX'],
    ['Utah', 'UT'],
    ['Vermont', 'VT'],
    ['Virginia', 'VA'],
    ['Washington', 'WA'],
    ['West Virginia', 'WV'],
    ['Wisconsin', 'WI'],
    ['Wyoming', 'WY'],
  ];

  public static GetStateAndAbbreviationList(): any[] {
    const stateList = [];
    _.forEach(this.States, (s) => {
      stateList.push({state: s[0], abbreviation: s[1]});
    });
    return stateList;
  }
  public static GetStateName(input: string): string {
    input = input.toUpperCase();
    for (let i = 0; i < this.States.length; i++) {
      if (this.States[i][1] === input) {
        return (this.States[i][0]);
      }
    }
  }

  public static GetStateAbbreviation(input: string): string {
    input = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    for (let i = 0; i < this.States.length; i++) {
      if (this.States[i][0] === input) {
        return (this.States[i][1]);
      }
    }
  }

  // Distance in Killometers
  public static straightDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // km radius of earth
    const dLat = this.toRadius(lat2 - lat1);
    const dLon = this.toRadius(lon2 - lon1);
    lat1 = this.toRadius(lat1);
    lat2 = this.toRadius(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
  }

  public static IsValidEmail(email: string) {
    // tslint:disable-next-line:max-line-length
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(email);
  }

  public static IsValidPhoneNumber(number: string) {
    return this.IsValidUSPhoneNumber(number) || this.IsValidIntlPhoneNumber(number);
  }

  private static IsValidUSPhoneNumber(number: string) {
    const raw = String.raw`
      ^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([0-9]1[02-9]|[0-9][02-8]1|[0-9]
      [02-8][02-9])\s*\)|([0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*
      (?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)
      ?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$
    `.replace(/[\s]/g, '');
    const reg = new RegExp(raw, 'g');
    return reg.test(number);
  }

  private static IsValidIntlPhoneNumber(number: string) {
    const raw = String.raw`
      \+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d
      |9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|
      2[70]|7|1)\d{1,14}$
    `.replace(/[\s]/g, '');
    const reg = new RegExp(raw, 'g');
    return reg.test(number);
  }

  public static SortByKey(items: any, key: string): any[] {
    return _.sortBy(items, this.SmartSortFunctions(key));
  }

  public static SmartSortFunctions(key: any) {
    return [
      (i: any) => {
        const test = /\d+/gi.exec(i[key]);
        if (!test || !test[0]) {
          return i[key];
        } else {
          return _.replace(i[key], test[0], '');
        }
      },
      (i: any) => {
        const test = /\d+/gi.exec(i[key]);
        if (!test || !test[0]) {
          return;
        } else {
          return _.toNumber(test[0]);
        }
      },
    ];
  }

  public static buildCSVString(rows: any[][], delimiter?: string) {
    delimiter = delimiter ? delimiter : ',';
    let csvString = '';

    _.forEach(rows, (row, index) => {
      row = _.map(row, (v) => {
        if (v && typeof v === 'string' && (v.indexOf(',') > -1 || v.indexOf('\ ') > -1)) {
          return `"${v}"`;
        } else {
          return v;
        }
      });
      csvString += row.join(delimiter);
      if (index !== rows.length - 1) {
        csvString += '\n';
      }
    });

    return csvString;
  }

  public static buildCSVLink(rows: any[][], filename?: string): HTMLAnchorElement {
    if (rows && rows.length > 0 && rows[0] && rows[0].length > 0) {
      const csvString = this.buildCSVString(rows);
      const newString = 'data:text/csv;charset=UTF-8,';
      const encodedUri = newString + encodeURIComponent(csvString);
      const link = document.createElement('a');

      link.setAttribute('href', encodedUri);
      link.setAttribute('download', filename ? filename : 'download.csv');
      return link;
    }
  }

  private static toRadius(val: number) {
    return val * Math.PI / 180;
  }

}
