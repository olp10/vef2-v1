import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { direxists, readFile } from '../lib/file.js';
import { indexTemplate, statsTemplate } from '../lib/html.js';
import { parse } from '../lib/parser.js';

const DATA_DIR = './data';
const OUTPUT_DIR = './dist';

async function main() {
  if (!(await direxists(OUTPUT_DIR))) {
    await mkdir(OUTPUT_DIR);
  }

  const jsonData = await readFile('./data/index.json', 'utf-8');
  const parsed = JSON.parse(jsonData);

  const results = [];

  for (const file of parsed) {
    const name = Object.values(file)[0];
    const title = Object.values(file)[2];
    const description = Object.values(file)[1];
    const csv = Object.values(file)[2];

    if (file) {
      const filename = `${title}.html`;
      const content = await readFile(join(DATA_DIR, title), {
        encoding: 'latin1',
      });
      const afangar = await parse(content);

      if (!afangar || afangar.length !== 0 || afangar === null) {
        const result = {
          name,
          filename,
          title,
          afangar,
          description,
          csv,
        };

        if (result.afangar) {
          results.push(result);
          const filepath = join(OUTPUT_DIR, filename);
          const template = statsTemplate(name, result);
          await writeFile(filepath, template, { flag: 'w+' });
        }
      }
    }
  }

  const filepath = join(OUTPUT_DIR, 'index.html');
  const template = indexTemplate(results);

  await writeFile(filepath, template, { flag: 'w+' });
}

main().catch((err) => console.error(err));
