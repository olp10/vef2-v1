function template(title, content) {
  return `<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <link rel="stylesheet" href="../public/styles.css">
  </head>
  <body>${content}</body>
</html>`;
}

export function subResults(division, results) {
  const list = results
    .map(
      (result) => `
  <tr>
    <td>${result.numer}</td>
    <td><a href="${result.vefslod}">${result.nafn}</a></td>
    <td>${result.einingar}</td>
    <td>${result.misseri}</td>
    <td>${result.namsstig}</td>
    </tr>
  `
    )
    .join('\n');

  return `
    <h1>${division.name}</h1>
    <h4>${division.description}</h4>
    <section>
      <table id="table">
        <tr>
          <th onclick="sortTable(0)">Númer</th>
          <th onclick="sortTable(1)">Heiti</th>
          <th onclick="sortTable(2)">Einingar</th>
          <th onclick="sortTable(3)">Misseri</th>
          <th onclick="sortTable(4)">Námsstig</th>
        </tr>
        ${list}
      </table>
      <script src="../public/sort-table.js"></script>
    </section>
  `;
}

function index(results) {
  const list = results
    .map(
      (result) => `
<li>
  <a href="${result.filename}">${result.name}</a>
  <p>${result.description} tölur</p>
</li>`
    )
    .join('\n');

  return `<section>
  <h1>Gagnavinnsla</h1>
  <ul>${list}</ul>
</section>
`;
}

export function indexTemplate(results) {
  return template('Gagnavinnsla', index(results));
}

export function statsTemplate(title, result) {
  return template(title, subResults(result, result.afangar));
}
