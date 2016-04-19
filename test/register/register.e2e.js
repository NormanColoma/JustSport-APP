/**
 * Created by Norman on 19/04/2016.
 */
var express = require('express');
var app = express();

describe('Register', function() {
    var host = 'http://localhost:5000';
    if (app.get('env') === 'test') {
        host = 'https://localhost:5000';
    }
    var email_field, pass_field, name_field , lname_field, gender_field, role_field, register_button,
        email_error, pass_error, name_error, lname_error, gender_error;
    beforeEach(function () {
        email_field = element.all(by.css('[name="email"]')).get(1);
        pass_field = element.all(by.css('[name="pass"]')).get(1);
        name_field = element(by.css('[name="name"]'));
        lname_field = element(by.css('[name="lname"]'));
        gender_field = element(by.css('.md-visually-hidden'));
        role_field = element(by.css('[name="role"]'));
        register_button = element(by.id('register_button'));
        email_error = element(by.css('.email-register-message'));
        pass_error = element(by.css('.pass-register-message'));
        name_error = element(by.css('.name-register-message'));
        lname_error = element(by.css('.lname-register-message'));
        gender_error = element(by.css('.gender-register-message'));
    });

    it('should display required messages when try to submit the from with empty fields', function(){
        browser.get(host+'/account/#/register');
        expect(email_error.isDisplayed()).toBeFalsy();
        expect(pass_error.isDisplayed()).toBeFalsy();
        expect(name_error.isDisplayed()).toBeFalsy();
        expect(lname_error.isDisplayed()).toBeFalsy();
        expect(gender_error.isDisplayed()).toBeFalsy();
        register_button.click();
        expect(email_error.isDisplayed()).toBeTruthy();
        expect(pass_error.isDisplayed()).toBeTruthy();
        expect(name_error.isDisplayed()).toBeTruthy();
        expect(lname_error.isDisplayed()).toBeTruthy();
        expect(gender_error.isDisplayed()).toBeTruthy();
    });

    it('should display validations messages when try to submit the from with not valid fields', function(){
        browser.get(host+'/account/#/register');
        expect(email_error.isDisplayed()).toBeFalsy();
        expect(pass_error.isDisplayed()).toBeFalsy();
        expect(name_error.isDisplayed()).toBeFalsy();
        expect(lname_error.isDisplayed()).toBeFalsy();
        expect(gender_error.isDisplayed()).toBeFalsy();
        email_field.sendKeys('123');
        pass_field.sendKeys('123');
        name_field.sendKeys('123');
        lname_field.sendKeys('123');
        register_button.click();
        expect(email_error.isDisplayed()).toBeTruthy();
        expect(pass_error.isDisplayed()).toBeTruthy();
        expect(name_error.isDisplayed()).toBeTruthy();
        expect(lname_error.isDisplayed()).toBeTruthy();
        expect(gender_error.isDisplayed()).toBeTruthy();
        expect(email_error.getText()).toBe('El email no es válido.');
        expect(pass_error.getText()).toBe('La contraseña no es correcta.');
        expect(name_error.getText()).toBe('El nombre no es válido.');
        expect(lname_error.getText()).toBe('Los apellidos no son válidos.');
    });

    it('should display error dialog when try to register a user that already exists', function(){
        browser.get(host+'/account/#/register');
        email_field.sendKeys('pepe@gmail.com');
        pass_field.sendKeys('Adi2016');
        name_field.sendKeys('Pepe');
        lname_field.sendKeys('Gómez Sánchez');
        gender_field.all(by.tagName('option')).then(function(options){
            options[1].click();
        });
        expect(element(by.css('md-dialog')).isPresent()).toBeFalsy();
        register_button.click();
        expect(element(by.css('md-dialog')).isPresent()).toBeTruthy();
        expect(element(by.css('md-dialog')).isDisplayed()).toBeTruthy();
    });

    it('should display registered dialog when try to register', function(){
        browser.get(host+'/account/#/register');
        email_field.sendKeys('pepis@gmail.com');
        pass_field.sendKeys('Adi2016');
        name_field.sendKeys('Pepis');
        lname_field.sendKeys('Gómez Sánchez');
        gender_field.all(by.tagName('option')).then(function(options){
            options[1].click();
        });
        expect(element(by.css('md-dialog')).isPresent()).toBeFalsy();
        register_button.click();
        expect(element(by.css('md-dialog')).isPresent()).toBeTruthy();
        expect(element(by.css('md-dialog')).isDisplayed()).toBeTruthy();
        expect(browser.getCurrentUrl()).toBe(host+'/account/#/login');
    });

});
