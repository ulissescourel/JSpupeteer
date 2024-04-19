const puppeteer = require('puppeteer');

async function searchAndCountResults(searchUrl, numResults) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let resultsCount = 0;
  let results = [];

  try {
    await page.goto('https://www.google.com');
    await page.type('#lst-ib', searchUrl);
    await page.keyboard.press('Enter');

    await page.waitForSelector('.g');

    results = await page.$$('.g');
    resultsCount = results.length;

    // Get the top numResults results
    results = results.slice(0, numResults);

    // Extract the title and link from each result
    results = await Promise.all(results.map(async result => {
      const title = await page.evaluate(el => el.querySelector('h3').textContent, result);
      const link = await page.evaluate(el => el.querySelector('a').href, result);
      return { title, link };
    }));
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await browser.close();
  }

  return { resultsCount, results };
}
