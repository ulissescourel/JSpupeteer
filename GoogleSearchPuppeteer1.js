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

        const allResults = await page.$$('.g');
        resultsCount = allResults.length;

        // Get the top N results
        for (let i = 0; i < numResults && i < resultsCount; i++) {
        const result = await allResults[i].$('.r a');
        results.push(await result.getProperty('href'));
        }
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await browser.close();
    }

    return { resultsCount, results };
}