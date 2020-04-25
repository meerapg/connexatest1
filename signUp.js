/*
 * Validates the SignUp functionality of Connexa
 * Created Date : 25-09-19
 */

let GetUrl = require('./funcs/getURL');

describe("SigUp:", () => {

    // To be done before each test case
    beforeEach(() => {
        // Access Connexa URL
        GetUrl.get();

        // Access Signup link
        element(by.css("html > body > app-root > div > app-login > div.lhs-grid > div > a")).click();
    });

    it("Signup with Valid Credentials", function() {
        // Enter all the field values            
        element(by.css("*[id='firstName']")).sendKeys("QA");
        element(by.css("*[id='lastName']")).sendKeys("Test");
        element(by.css("*[id='email']")).sendKeys("qa_test1@mailinator.com");
        element(by.css("*[id='password']")).sendKeys("qatest123");
        element(by.css("*[id='confirmPassword']")).sendKeys("qatest123");

        element(by.css("*[id='companyName']")).sendKeys("Company QA");
        element(by.css("*[id='companyEmail']")).sendKeys("satest@test.in");
        element(by.css("*[id='companyPhone']")).sendKeys("123456");

        element(by.css("*[id='billingAddressStreet']")).sendKeys("Street A");
        element(by.css("*[id='billingAddressCity']")).sendKeys("City A");
        element(by.css("*[id='billingAddressState']")).sendKeys("State A");

        element(by.css("*[id='billingAddressZip']")).sendKeys("ABC123");

        //Code added on 04/03/2020 to resolve error 'coz of chrome version update
        let ele = element(by.css("html > body > app-root > div > app-signup > div.rhs-grid > div > div:nth-of-type(2) > form > div:nth-of-type(2) > div:nth-of-type(7) > label > span"));
        browser.driver.sleep('3000');

        browser.executeScript("arguments[0].click()", ele);

        let sub = element(by.css("html > body > app-root > div > app-signup > div.rhs-grid > div > div:nth-of-type(2) > form > div:nth-of-type(2) > div:nth-of-type(8) > button"));
        browser.driver.sleep('3000');
        browser.executeScript("arguments[0].click()", sub);

        // Validates the success message
        expect(element(by.css("*[id='swal2-title']")).getText()).toBe('User Registration successful!');

        element(by.css("html > body > div > div > div.swal2-actions > button.swal2-confirm.swal2-styled")).click();

    });

});