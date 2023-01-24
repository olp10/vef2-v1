import { describe, expect, it } from '@jest/globals';
import { direxists, readFile, readFilesFromDir } from './file.js';

describe('file', () => {
  describe('check if a directory exists', () => {
    it('should return false', async () => {
      expect(await direxists('')).toEqual(false);
    });

    it('should return true', async () => {
      expect(await direxists('./src/')).toEqual(true);
    });
  });

  describe('readFilesFromDir', () => {
    it('should return []', async () => {
      expect(await readFilesFromDir('./src/')).not.toBe(null);
    });

    it('should return []', async () => {
      expect(await readFilesFromDir('')).toEqual([]);
    });
  });

  describe('readFile', () => {
    it('should return not null', async () => {
      expect(await readFile('./lib/html.js')).not.toEqual(null);
    });

    it('should return null', async () => {
      expect(await readFile('./bull.js')).toEqual(null);
    });
  });
});
