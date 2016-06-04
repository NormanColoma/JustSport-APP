/**
 * Created by Norman on 22/05/2016.
 */
var express = require('express');
var app = express();

describe('Backoffice Panel', function() {
    var host = 'http://localhost:5000';
    if (app.get('env') === 'test') {
        host = 'https://localhost:5000';
    }

    var email_field, pass_field, login_button;
    beforeEach(function () {
        email_field = element(by.css('[name="email"]'));
        pass_field = element(by.css('[name="pass"]'));
        login_button = element(by.id('login_button'));
    });

    it('Should redirect to login page when user tries to navigate to the backoffice panel', function(){
        browser.get(host+"/backoffice");
        expect(browser.getCurrentUrl()).toBe(host+'/account/#/login');
    });

    it('Should allow to user navigates to backoffice', function(){
        email_field.sendKeys('pepe@gmail.com');
        pass_field.sendKeys('pepe15');
        login_button.click();
        element(by.css('.account-options')).click();
        element(by.css('[name="backoffice"]')).click();
        expect(element(by.css('.font-header')).getText()).toBe("Panel de Control");
    });

    it('Should display the 3rd first establishment of owner', function(){
        var estabs = element(by.id('establishments-list-container')).all(by.css('.est-owner-container')).count();
        expect(estabs).toBe(4);
    });

    it('Should fetch more establishment', function(){
        var estabs = element(by.id('establishments-list-container')).all(by.css('.est-owner-container')).count();
        expect(estabs).toBe(4);
        element(by.id('fetch-more-btn')).click();
        estabs = element(by.id('establishments-list-container')).all(by.css('.est-owner-container')).count();
        expect(estabs).toBe(6);
    });

    it('Should delete the establishment correctly', function(){
        var estab = element(by.id('estab-1'));
        var delete_btn = estab.element(by.id('delete-estab'));
        delete_btn.click();
        var accept_dialog = element(by.css('md-dialog')).all(by.css('button')).get(1);
        accept_dialog.click();
        var estabs = element(by.id('establishments-list-container')).all(by.css('.est-owner-container')).count();
        expect(estabs).toBe(5);
        element(by.css('.account-options')).click();
        element(by.css('[name="logout"]')).click();
    });

});