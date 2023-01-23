import { readFile } from "./file.js";

export async function parse(input) {
  const data = await readFile(input, {encoding: 'latin1'});

  if (!data) {
    return null;
  }

  const splitData = data.split('\n');
  const results = [];

  const regexEiningar = new RegExp("^[0-9]*[,]?[0-9]?$");
  const regexMisseri = new RegExp("^Vor|Sumar|Haust$");

  for (const line in splitData) {
    const moreSplitted = splitData[line].split(';');

    if (moreSplitted[0] === '' || moreSplitted[4] === '') {
      continue;
    }

    // Athuga hvort að misseri sé Vor/Sumar/Haust
    if(!regexMisseri.test(moreSplitted[3])) {
      continue;
    }

    // Athuga hvort einingar séu á forminu x,x/x => Samþykkir ekki einingafjölda með .
    if (!regexEiningar.test(moreSplitted[2])) {
      continue;
    }

    const numer = moreSplitted[0];
    const nafn = moreSplitted[1];
    const einingar = moreSplitted[2];
    const misseri = moreSplitted[3];
    const namsstig = moreSplitted[4];
    const vefslod = moreSplitted[5];

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
  return results;
}
