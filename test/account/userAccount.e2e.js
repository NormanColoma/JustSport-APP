/**
 * Created by Norman on 21/05/2016.
 */
var express = require('express');
var app = express();
describe('User Account', function() {
    var host = 'http://localhost:5000';
    if (app.get('env') === 'test') {
        host = 'https://localhost:5000';
    }

    var email_field, pass_field, login_button, update_btn, old_pass, new_pass;
    beforeEach(function () {
        email_field = element(by.css('[name="email"]'));
        pass_field = element(by.css('[name="pass"]'));
        login_button = element(by.id('login_button'));
        update_btn = element(by.id('update_acc'));
        old_pass = element(by.css('[name="cpass"]'));
        new_pass = element(by.css('[name="npass"]'));
    });

    it('Should redirect to login page when user tries to navigate to his account', function(){
        browser.get(host+"/account/profile");
        expect(browser.getCurrentUrl()).toBe(host+'/account/#/login');
    });

    it('Should allow user navigates to his account once user is logged in', function(){
        email_field.sendKeys('pepe@gmail.com');
        pass_field.sendKeys('pepe15');
        login_button.click();
        expect(element(by.css('.account-options')).isDisplayed()).toBeTruthy();
        expect(browser.getCurrentUrl()).toBe(host+'/');
        element(by.css('.account-options')).click();
        element(by.css('[name="profile"]')).click();
        expect(element(by.css('.font-header')).getText()).toBe("Perfil");
        expect(element(by.css('[name="account-level"]')).getText()).toBe("Usuario");
    });

    it('Should show error messages', function(){
        expect(element(by.css('.required-opass')).isDisplayed()).toBeFalsy();
        expect(element(by.css('.required-npass')).isDisplayed()).toBeFalsy();
        update_btn.click();
        expect(element(by.css('.required-opass')).isDisplayed()).toBeTruthy();
        expect(element(by.css('.required-npass')).isDisplayed()).toBeTruthy();
    });

    it('Should show pass pattern error', function(){
        expect(element(by.css('.pattern-pass')).isDisplayed()).toBeFalsy();
        new_pass.sendKeys("123");
        update_btn.click();
        expect(element(by.css('.pattern-pass')).isDisplayed()).toBeTruthy();
    });

    it('Should update profile correctly', function(){
        browser.get(host+"/account/profile");
        old_pass.sendKeys("123");
        new_pass.sendKeys("Pepito20");
        update_btn.click();
        expect(element(by.css('.required-opass')).isDisplayed()).toBeFalsy();
        expect(element(by.css('.required-npass')).isDisplayed()).toBeFalsy();
        expect(old_pass.getText()).toBe('');
        expect(new_pass.getText()).toBe('');
        element(by.css('md-dialog-actions')).element(by.css('button')).click();
        element(by.css('.account-options')).click();
        element(by.css('[name="logout"]')).click();
        expect(browser.getCurrentUrl()).toBe(host+'/');
    });
});