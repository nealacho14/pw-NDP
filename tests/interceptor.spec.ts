import { test, expect } from '@playwright/test';
import { LoginPage } from './POM/LoginPage';

test('interceptor test', async ({ page }, testInfo) => {
    await page.on("request", req=>{
        console.log(req.url())
    })

    await page.route(
        "**/*.{png,jpg,jpeg,svg}",
    (route)=>route.abort());

    /*await page.route("https://www.saucedemo.com/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg",
    (route)=>route.abort());

    await page.route("https://www.saucedemo.com/static/media/bike-light-1200x1500.37c843b0.jpg",
    (route)=>route.abort());

    await page.route("https://www.saucedemo.com/static/media/bolt-shirt-1200x1500.c2599ac5.jpg",
    (route)=>route.abort());

    await page.route("https://www.saucedemo.com/static/media/sauce-pullover-1200x1500.51d7ffaf.jpg",
    (route)=>route.abort());*/

    await page.goto('https://www.saucedemo.com/');
    const instLoginPage = new LoginPage(page);

    await instLoginPage.fillUser('standard_user')
    await instLoginPage.fillPass('secret_sauce')
    await instLoginPage.clickLoginButton()
    await instLoginPage.checkIsLogged()
    /*await testInfo.attach('home',{
        body: await page.screenshot(),
        contentType: 'image/png'
    })*/
    await page.screenshot({path:'screenshots/login.png', fullPage:true})
  });

  test('sourceDemo purchase an item 2', async ({ page }, testInfo) => {
    await page.route(
        "https://demoqa.com/BookStore/v1/Books",
    (route)=>{
        route.fulfill({
            status: 304,
            headers: {
                'Content-Type':'application/json'
            },
            body: `
            {
                "books": [
                    {
                        "isbn": "9781449325862",
                        "title": "Este es mi libro",
                        "subTitle": "Probemos mi librito",
                        "author": "Nealachito",
                        "publish_date": "2024-08-14T08:48:39.000Z",
                        "publisher": "Editora chupameestepenco",
                        "pages": 10,
                        "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                        "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                    }
                ]
            }
            `
        })
    });
    await page.goto('https://demoqa.com/books')
    await page.screenshot({path:'screenshots/books.png', fullPage:true})
    await page.pause()
  });