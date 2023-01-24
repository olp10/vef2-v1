import { readFile } from './file.js';

/**
 *
 * @param {string} input Slóð á csv skrá sem inniheldur áfanga og upplýsingar um þá
 * @returns array af námskeiðum ef það eru einhver námskeið fyrir námsleiðina, annars []
 */
export async function parse(input) {
  // const data = await readFile(input, { encoding: 'latin1' });

  if (!input) {
    return null;
  }

  const splitData = input.split('\n');
  const results = [];

  const regexEiningar = /^[0-9]*[,]?[0-9]?$/;
  const regexMisseri = /^Vor|Sumar|Haust$/;

  for (const line in splitData) {
    if (line) {
      const moreSplitted = splitData[line].split(';');

      const numer = moreSplitted[0];
      const nafn = moreSplitted[1];
      const einingar = moreSplitted[2];
      const misseri = moreSplitted[3];
      const namsstig = moreSplitted[4];
      const vefslod = moreSplitted[5];

      if (moreSplitted[0] === '' || moreSplitted[4] === '') {
        continue;
      }

      // Athuga hvort að misseri sé Vor/Sumar/Haust
      if (!regexMisseri.test(moreSplitted[3])) {
        continue;
      }

      // Athuga hvort einingar séu á forminu x,x/x => Samþykkir ekki einingafjölda með .
      if (!regexEiningar.test(moreSplitted[2])) {
        continue;
      }

      const result = {
        numer,
        nafn,
        einingar,
        misseri,
        namsstig,
        vefslod,
      };
      results.push(result);
    }
  }
  if (results.length > 0) {
    return results;
  }
  return null;
}
