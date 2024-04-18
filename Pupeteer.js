const puppeteer = require('puppeteer');

async function clickOnElements(url, elementIds) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const clickResults = [];

  try {
    await page.goto(url);

    for (let i = 0; i < elementIds.length; i++) {
      await page.waitForSelector(elementIds[i]);
      
      try {
        await page.click(elementIds[i]);
        clickResults.push(true);
      } catch (clickError) {
        clickResults.push(false);
      }
    }
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await browser.close();
  }
  
  return clickResults;
}

// Usage
const url = 'https://www.uol.com.br'; // URL to load
const elementIds = ['#myButton1', '#myButton2', '#myButton3']; // List of Element IDs

(async () => {
  const clickResult = await clickOnElements(url, elementIds);
  console.log('Click results:', clickResult);
})();
