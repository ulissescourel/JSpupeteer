const puppeteer = require('puppeteer');

async function clickElements(url, elementIds) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the specified URL
    await page.goto(url);

    // Wait for each element to be visible
    for (const elementId of elementIds) {
      await page.waitForSelector(`#${elementId}`);
      try {
        // Click on the element
        await page.click(`#${elementId}`);
        console.log(`Clicked on the element with id: ${elementId} successfully!`);
      } catch (error) {
        console.error(`Error occurred while clicking on the element with id: ${elementId}:`, error);
      }
    }

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('Error occurred:', error);
    await browser.close();
  }

  // Return an array of booleans indicating whether each element was clicked successfully or not
  return elementIds.map(elementId => !error);
}

// Example usage:
const url = 'https://example.com';
const elementIds = ['myButton', 'myLink'];

clickElements(url, elementIds).then(results => {
  console.log('Results:', results);
});