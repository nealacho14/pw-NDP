import { test, expect } from '@playwright/test';
import { LoginPage } from './POM/LoginPage';

test('sourceDemo', async ({ page }, testInfo) => {
    await page.goto('https://www.saucedemo.com/');
    await testInfo.attach('openingPage',{
        body: await page.screenshot(),
        contentType: 'image/png'
    })
    //await page.screenshot({path:'screenshots/openingPage.png'})
    /*await page.getByRole('textbox',{name:'Username'}).fill('standard_user')
    await page.getByRole('textbox',{name:'Password'}).fill('secret_sauce')
    await page.getByRole('button',{name:'Login'}).click()*/

    const instLoginPage = new LoginPage(page);

    await instLoginPage.fillUser('standard_user')
    await testInfo.attach('loginUsername',{
        body: await page.screenshot(),
        contentType: 'image/png'
    })
    await instLoginPage.fillPass('secret_sauce')
    await testInfo.attach('loginPass',{
        body: await page.screenshot(),
        contentType: 'image/png'
    })
    await instLoginPage.clickLoginButton()
    await instLoginPage.checkIsLogged()

    await testInfo.attach('home',{
        body: await page.screenshot(),
        contentType: 'image/png'
    })

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all()
    const ramdomIndex = Math.floor(Math.random()*itemsContainer.length)
    const randomItem = itemsContainer[ramdomIndex]

    const expectedName = await randomItem.locator('.inventory_item_name').innerText()
    const expectedDesc = await randomItem.locator('.inventory_item_desc').innerText()
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()

    await randomItem.getByRole('button',{name:'Add to cart'}).click()

    await page.locator('.shopping_cart_link').click()

    expect(page.getByRole('button',{name:'Checkout'})).toBeVisible()

    expect(await page.locator('.inventory_item_name').innerText()).toEqual(expectedName)
    expect(await page.locator('.inventory_item_desc').innerText()).toEqual(expectedDesc)
    expect(await page.locator('.inventory_item_price').innerText()).toEqual(expectedPrice)

    await page.getByRole('button',{name:'Checkout'}).click()

    await page.getByPlaceholder('First Name').fill('Neal')
    await page.getByPlaceholder('Last Name').fill('De oro')
    await page.getByPlaceholder('Zip/Postal Code').fill('111031')

    await page.getByRole('button',{name:'Continue'}).click()

    expect(await page.locator('.inventory_item_name').innerText()).toEqual(expectedName)

    await page.getByRole('button',{name:'Finish'}).click()

    expect(await page.locator('.complete-header').innerText()).toEqual('Thank you for your order!')
    

  });