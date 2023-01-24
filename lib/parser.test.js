import { expect, it, describe } from '@jest/globals';
import { parse } from './parser';

describe('parser', () => {
  describe('parse', () => {
    it('should return null', async () => {
      expect(await parse('')).toEqual(null);
    });

    it('should return an array with one object', async () => {
      expect(
        await parse('HBV101;Afangi;6;Haust;Grunnám;https://ugla.hi.is')
      ).toEqual([
        {
          einingar: '6',
          misseri: 'Haust',
          nafn: 'Afangi',
          namsstig: 'Grunnám',
          numer: 'HBV101',
          vefslod: 'https://ugla.hi.is',
        },
      ]);
    });

    it('should return an array with two objects', async () => {
      expect(
        await parse(
          'HBV101;Afangi;6;Haust;Grunnám;https://ugla.hi.is\nHBV102;Afangi2;4;Vor;Framhaldsnám;https://ugla.hi.is'
        )
      ).toEqual([
        {
          einingar: '6',
          misseri: 'Haust',
          nafn: 'Afangi',
          namsstig: 'Grunnám',
          numer: 'HBV101',
          vefslod: 'https://ugla.hi.is',
        },
        {
          einingar: '4',
          misseri: 'Vor',
          nafn: 'Afangi2',
          namsstig: 'Framhaldsnám',
          numer: 'HBV102',
          vefslod: 'https://ugla.hi.is',
        },
      ]);
    });

    it('should return null', async () => {
      expect(await parse('dsk;ksdjfk;asdf;ksdjf;kasdj;d')).toEqual(null);
    });
  });
});
