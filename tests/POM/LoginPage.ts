import { Locator, Page, expect } from "@playwright/test"

export class LoginPage{
    private readonly usernameTextBox: Locator
    private readonly passwordTextBox: Locator
    private readonly loginButton: Locator
    private readonly shoppingCartIcon: Locator

    constructor(page:Page){
        this.usernameTextBox = page.getByRole('textbox',{name:'Username'})
        this.passwordTextBox = page.getByRole('textbox',{name:'Password'})
        this.loginButton = page.getByRole('button',{name:'Login'})
        this.shoppingCartIcon = page.locator("xpath=//a[contains(@class,'shopping_cart_link')]")
    }

    async fillUser(username:string){
        await this.usernameTextBox.fill(username)
    }

    async fillPass(pass:string){
        await this.passwordTextBox.fill(pass)
    }
    
    async clickLoginButton(){
        await this.loginButton.click()
    }

    async checkIsLogged(){ 
        await expect(this.shoppingCartIcon).toBeVisible()
    }
}