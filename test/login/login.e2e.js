/**
 * Created by Norman on 14/04/2016.
 */
var express = require('express');
var app = express();

xdescribe('Home', function() {
    var host = 'http://localhost:5000';
    if (app.get('env') === 'test') {
        host = 'https://localhost:5000';
    }
    var email_field, pass_field, login_button, email_error, pass_error;
    beforeEach(function () {
        email_field = element(by.css('[name="email"]'));
        pass_field = element(by.css('[name="pass"]'));
        login_button = element(by.id('login_button'));
        email_error = element(by.css('.email-message'));
        pass_error = element(by.css('.pass-message'));
    });

    it('Should log in correctly', function(){
        browser.get(host+'/account/');
        email_field.sendKeys('pepe@gmail.com');
        pass_field.sendKeys('pepe15');
        login_button.click();
        browser.sleep(3000);
        expect(element(by.css('.account-options')).isDisplayed()).toBeTruthy();
        expect(browser.getCurrentUrl()).toBe(host+'/');
    });

    it('Should log out correctly', function(){
        expect(element(by.css('.account-options')).isDisplayed()).toBeTruthy();
        element(by.css('.account-options')).click();
        expect(element(by.css('.account-options')).isDisplayed()).toBeFalsy();
    });

    it('should failed when trying to log in with incorrect user', function(){
        browser.get(host+'/account/');
        expect(element(by.css('md-dialog')).isPresent()).toBeFalsy();
        email_field.sendKeys('pepis@gmail.com');
        pass_field.sendKeys('pepe23');
        login_button.click();
        expect(browser.getCurrentUrl()).toBe(host+'/account/#/login');
        expect(element(by.css('md-dialog')).isPresent()).toBeTruthy();
        expect(element(by.css('md-dialog')).isDisplayed()).toBeTruthy();
    });

});