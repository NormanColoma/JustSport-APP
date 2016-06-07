/**
 * Created by Norman on 03/06/2016.
 */
var express = require('express');
var app = express();
describe('Backoffice Impart Sport', function() {
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

    it('Should change the view to Impart Sport view',function(){
        browser.get(host+"/backoffice");
        email_field.sendKeys('pepe@gmail.com');
        pass_field.sendKeys('pepe15');
        login_button.click();
        element(by.css('.account-options')).click();
        element(by.css('[name="backoffice"]')).click();
        element(by.id('impart-sport')).click();
        expect(element(by.css('.impart-t')).getText()).toEqual("Impartir Deportes");
    });

    it('Should add the new sport imparted to list', function(){
        element(by.id('input-12')).sendKeys('CrossFit');
        var sp_selected = element(by.id('ul-12'));
        sp_selected.all(by.css('li')).then(function(sp) {
            sp[0].click();
        });
        element(by.id('assoc-sp-btn')).click();
        var alert_content = element(by.css('md-dialog-content'));
        var alert_text = alert_content.element(by.css('p')).getText();
        expect(alert_text).toEqual('Los deportes se han impartido correctamente');
        element(by.css('md-dialog-actions')).element(by.css('button')).click();

    });

    it('Should not add sport that is already added', function(){
        element(by.id('input-12')).sendKeys('Spinning');
        var sp_selected = element(by.id('ul-12'));
        sp_selected.all(by.css('li')).then(function(sp) {
            sp[0].click();
        });
        element(by.id('assoc-sp-btn')).click();
        var alert_content = element(by.css('md-dialog-content'));
        var alert_text = alert_content.element(by.css('p')).getText();
        expect(alert_text).toEqual('Los deportes seleccionados ya están impartidos para este establecimiento');
        element(by.css('md-dialog-actions')).element(by.css('button')).click();
        element(by.css('.account-options')).click();
        element(by.css('[name="logout"]')).click();
    });
});