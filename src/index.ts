// Generated by Selenium IDE
import { Builder, By, Key } from 'selenium-webdriver'

import { config } from 'dotenv'
import { join } from 'path'
import { Options } from 'selenium-webdriver/chrome.js'

config({
	path: join(__dirname, '..', '.env'),
})

const executionStatus = process.env.EXECUTION_STATUS ?? ''

const sleep = async (timeout = 3000) => {
	return await new Promise((resolve) => setTimeout(resolve, timeout))
}
const run = async () => {
	const options = new Options()
	options.addArguments('--incognito')
	options.addArguments('--headless')

	const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()

	await driver.get(
		'https://accounts.zoho.in/signin?servicename=zohopeople&signupurl=https://www.zoho.in/people/signup.html'
	)
	await driver.manage().window().setRect({ width: 1440, height: 900 })
	await sleep(1000)
	await driver.findElement(By.id('login_id')).sendKeys(process.env.ZOHO_EMAIL!)
	await sleep(1000)

	await driver.findElement(By.id('login_id')).sendKeys(Key.ENTER)
	await sleep(1000)

	await driver.findElement(By.id('password')).sendKeys(process.env.ZOHO_PASSWORD!)
	await sleep(1000)

	await driver.findElement(By.id('password')).sendKeys(Key.ENTER)
	await sleep(1000)

	const current_status = await driver.findElement(By.id('ZPD_Top_Att_Stat'))
	await sleep(1000)
	await sleep(1000)
	if ((await current_status.getText()).toLowerCase() === executionStatus.toLowerCase()) {
		console.log('executing:', executionStatus)
		await driver.findElement(By.css('.chlodIng')).click()
	}

	await sleep(1000)
	await driver.close()
}

run()
	.then(() => {
		console.log('Success!')
	})
	.catch((err) => {
		console.log(err)
	})
