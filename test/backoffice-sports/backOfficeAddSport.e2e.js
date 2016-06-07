/**
 * Created by Norman on 07/06/2016.
 */
var express = require('express');
var app = express();

fdescribe('Backoffice Add Establishment', function() {
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

    it('Should add the new sport correctly',function(){
        browser.get(host+"/backoffice");
        email_field.sendKeys('pepe@gmail.com');
        pass_field.sendKeys('pepe15');
        login_button.click();
        element(by.css('.account-options')).click();
        element(by.css('[name="backoffice"]')).click();
        var tab_list = element(by.css('md-tabs'));
        tab_list.all(by.css('md-tab-item')).then(function(tabs) {
            tabs[3].click();
        });
        element(by.css('[name="sport_name"]')).sendKeys("Natación");
        element(by.css('[name="add-sport-btn"]')).click();
        expect(element(by.css('md-dialog')).isPresent()).toBeTruthy();
        var alert_content = element(by.css('md-dialog-content'));
        var alert_text = alert_content.element(by.css('p')).getText();
        expect(alert_text).toEqual('El deporte con nombre "Natación" ha sido añadido correctamente.');
        element(by.css('md-dialog-actions')).element(by.css('button')).click();
    });

    it('Should not add the new sport', function(){
        element(by.css('[name="sport_name"]')).sendKeys("Spinning");
        element(by.css('[name="add-sport-btn"]')).click();
        expect(element(by.css('md-dialog')).isPresent()).toBeTruthy();
        var alert_content = element(by.css('md-dialog-content'));
        var alert_text = alert_content.element(by.css('p')).getText();
        expect(alert_text).toEqual('El deporte con nombre "Spinning" ya existe en JustSport.');
        element(by.css('md-dialog-actions')).element(by.css('button')).click();
        element(by.css('.account-options')).click();
        element(by.css('[name="logout"]')).click();
    });
});