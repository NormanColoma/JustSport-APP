/**
 * Created by Norman on 01/06/2016.
 */
var express = require('express');
var app = express();

describe('Backoffice Add Establishment', function() {
    var host = 'http://localhost:5000';
    if (app.get('env') === 'test') {
        host = 'https://localhost:5000';
    }
    var email_field, pass_field, login_button, add_btn, name, phone, addr, desc, city, province, website;
    beforeEach(function () {
        email_field = element(by.css('[name="email"]'));
        pass_field = element(by.css('[name="pass"]'));
        login_button = element(by.id('login_button'));
    });

    it('Should change the view to Add Establishment view',function(){
        browser.get(host+"/backoffice");
        email_field.sendKeys('pepe@gmail.com');
        pass_field.sendKeys('pepe15');
        login_button.click();
        element(by.css('.account-options')).click();
        element(by.css('[name="backoffice"]')).click();
        element(by.css('[name="add-est"]')).click();
        expect(element(by.css('.add-t')).getText()).toEqual("Añadir Establecimiento");
    });

    it('Should show error messages when trying to post empty Estab', function(){
        add_btn = element(by.id('add-est-btn'));
        add_btn.click();
        expect(element(by.css('[name="rname"]')).getText()).toEqual('El nombre es obligatorio.');
        expect(element(by.css('[name="rphone"]')).getText()).toEqual('El teléfono es obligatorio.');
        expect(element(by.css('[name="rcity"]')).getText()).toEqual('Tienes que seleccionar una ciudad.');
        expect(element(by.css('[name="rprovince"]')).getText()).toEqual('Tienes que seleccionar una provincia.');
        expect(element(by.css('[name="raddr"]')).getText()).toEqual('La dirección es obligatoria.');
        expect(element(by.css('[name="rdesc"]')).getText()).toEqual('La descripción es obligatoria.');
    });

    it('Should show validation errors', function(){
        name = element(by.css('[name="ename"]'));
        phone = element(by.css('[name="ephone"]'));
        addr = element(by.css('[name="eaddr"]'));
        desc = element(by.css('[name="edesc"]'));
        website = element(by.css('[name="eweb"]'));
        city = element(by.css('[name="ecity"]'));
        province = element(by.css('[name="eprovince"]'));

        name.sendKeys('Prueba+');
        phone.sendKeys('655');
        website.sendKeys('http');

        expect(element(by.css('[name="pname"]')).getText()).toEqual('El nombre no es correcto. ' +
            'Solo admite caracteres alfanuméricos.');
        expect(element(by.css('[name="pphone"]')).getText()).toEqual('El teléfono no es correcto.');
        expect(element(by.css('[name="purl"]')).getText()).toEqual('La url del sitio web no es correcta.');
    });

    it('Should add the establishment correctly', function(){
        name.clear();
        name.sendKeys('Estab Prueba');
        phone.clear();
        phone.sendKeys('655142922');
        city.sendKeys('Alicante');
        var city_list = element(by.id('ul-6'));
        city_list.all(by.css('li')).then(function(location) {
            location[0].click();
        });
        province.sendKeys('Alicante');
        var province_list = element(by.id('ul-7'));
        province_list.all(by.css('li')).then(function(location) {
            location[0].click();
        });
        addr.sendKeys('Calle Falsa nº14');
        desc.sendKeys('Estab es la descripción de prueba del establecimiento de prueba');
        website.clear();
        add_btn.click();
        expect(element(by.css('md-dialog')).isPresent()).toBeTruthy();
        element(by.css('md-dialog-actions')).element(by.css('button')).click();
        element(by.css('.account-options')).click();
        element(by.css('[name="logout"]')).click();
    });
});