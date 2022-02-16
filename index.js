// @ts-check

const { chromium } = require('playwright');

const shops = [
    {
        vendor: 'Microsoft',
        url: 'https://www.xbox.com/es-es/configure/8WJ714N3RBTL',
        checkStock: async ({ page }) => {
            const content = await page.textContent('[aria-label="Finalizar la compra del pack"]');
            return content.includes('Sin existencias') === false;
        }
    }
];

(async () => {
    //const browser = await chromium.launch();
    const browser = await chromium.launch({headless: false});
    
    for( const shop of shops){
        const { checkStock, vendor, url } = shop;

        const page = await browser.newPage();
        await page.goto(url);

        //Hacemos una captura de lo que carga el navegador
        await page.screenshot({ path: `screenshots/${vendor}.png` });

        const hasStock = await checkStock({ page });
        console.log(`${vendor}: ${hasStock ? 'Hay stock' : 'Sin stock'}`);
        await page.close();
    }

    await browser.close();
})()