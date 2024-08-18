import test from "@playwright/test";

test('test we table',async({page})=>{
    await page.goto('https://cosmocode.io/automation-practice-webtable/#google_vignette')

    const tableContainer = await page.locator("xpath=//table[@id='countries']")

    const rows = await tableContainer.locator("xpath=//tr").all()

    const countries: Country[] = []

    //console.log(rows.length)

    /*for(let row of rows) {
        console.log(await row.innerText())
    }*/

    for(let row of rows) {
        let country: Country ={
            name: await row.locator('xpath=//td[2]').innerText(),
            capital: await row.locator('xpath=//td[3]').innerText(),
            currency: await row.locator('xpath=//td[4]').innerText(),
            primaryLanguage: await row.locator('xpath=//td[5]').innerText()
        }
        countries.push(country);
    }

    const encabezado = rows.at(0)
    //const row1 = rows.at(1)

    const countryHead = await encabezado?.locator('xpath=//td[2]').innerText()
    const capitalHead = await encabezado?.locator('xpath=//td[3]').innerText()
    const currencyHead = await encabezado?.locator('xpath=//td[4]').innerText()
    const languageHead = await encabezado?.locator('xpath=//td[5]').innerText()

    // const countryName = await row1?.locator('xpath=//td[2]').innerText()
    // const capitalName = await row1?.locator('xpath=//td[3]').innerText()
    // const currencyName = await row1?.locator('xpath=//td[4]').innerText()
    // const languageName = await row1?.locator('xpath=//td[5]').innerText()


    /*console.log(countryHead, capitalHead, currencyHead, languageHead)
    for(let country of countries){
        console.log(country)
    }
    //console.log(countryName, capitalName, currencyName, languageName)*/

    const countriesWherePeopleSpeakSpanish = countries.filter(country => country.primaryLanguage === 'Spanish');
    console.log(countriesWherePeopleSpeakSpanish.length)
    console.log('Countries where people speak spanish', countriesWherePeopleSpeakSpanish)
})

interface Country{
    name: String
    capital: String
    currency: String
    primaryLanguage: String
}