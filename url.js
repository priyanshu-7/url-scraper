const puppeteer = require('puppeteer');

async function scrapeUrls(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const urls = await page.evaluate(() => {
    const anchors = document.querySelectorAll('a');
    const urls = [];
    anchors.forEach((anchor) => {
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('http')) {
        urls.push(href);
      }
    });
    return urls;
  });
  console.log('List of URLs:');
  urls.forEach((url) => {
    console.log(url);
  });

  await browser.close();
}
const targetUrl = 'https://www.rentnyrealestate.com/';
scrapeUrls(targetUrl);
