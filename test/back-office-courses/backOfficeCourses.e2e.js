/**
 * Created by Norman on 08/06/2016.
 */
var express = require('express');
var app = express();

describe('Courses Backoffice', function() {
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

    it('Should display the courses correctly', function(){
        browser.get(host+"/backoffice");
        email_field.sendKeys('pepe@gmail.com');
        pass_field.sendKeys('pepe15');
        login_button.click();
        var acc = element(by.css('.account-options')).click();
        element(by.css('[name="backoffice"]')).click();
        var tab_list = element(by.css('md-tabs'));
        tab_list.all(by.css('md-tab-item')).then(function(tabs) {
            tabs[1].click();
        });
        var select = element(by.id('list-ests'));
        select.click();
        var ests = element(by.css('.md-select-menu-container.md-active')).all(by.css('md-option'));
        ests.then(function(l_ests){
            expect(l_ests.length).toBe(3);
            l_ests[0].click();
        });

        var courses_select = element(by.id('list-courses'));
        courses_select.click();
        expect(courses_select.isPresent()).toBeTruthy();
        var courses = element(by.css('.md-select-menu-container.md-active')).all(by.css('md-option'));
        courses.then(function(l_courses){
            l_courses[1].click();
        });
    });

    it('Should show validations errors',function(){
        var ins = element(by.css('[name="cins"]'));
        var price = element(by.css('[name="cprice"]'));
        var p_ins = element(by.css('[name="pins"]'));
        var p_price = element(by.css('[name="pprice"]'));
        ins.clear();
        price.clear();
        ins.sendKeys('Pepe12');
        price.sendKeys('-1');
        expect(p_ins.getText()).toEqual("El nombre del instructor no es correcto. Solo admite caracteres alfanuméricos.");
        expect(p_price.getText()).toEqual("El precio del curso debe ser por lo menos 1.");
    });

    it('Should update the course correclty', function(){
        var ins = element(by.css('[name="cins"]'));
        var price = element(by.css('[name="cprice"]'));
        var update_btn = element(by.id('update-course-btn'));
        ins.clear();
        price.clear();
        ins.sendKeys('Pepe Castaño');
        price.sendKeys('20.75');
        update_btn.click();
        var alert_content = element(by.css('md-dialog-content'));
        var alert_text = alert_content.element(by.css('p')).getText();
        expect(alert_text).toEqual('La información del curso ha sido actualizada.');
        element(by.css('md-dialog-actions')).element(by.css('button')).click();
    });

    it('Should delete the course correctly', function(){
        var tab_list = element(by.css('md-tabs'));
        tab_list.all(by.css('md-tab-item')).then(function(tabs) {
            tabs[1].click();
        });
        var select = element(by.id('list-ests'));
        select.click();
        var ests = element(by.css('.md-select-menu-container.md-active')).all(by.css('md-option'));
        ests.then(function(l_ests){
            l_ests[0].click();
        });

        var courses_select = element(by.id('list-courses'));
        courses_select.click();
        expect(courses_select.isPresent()).toBeTruthy();
        var courses = element(by.css('.md-select-menu-container.md-active')).all(by.css('md-option'));
        courses.then(function(l_courses){
            l_courses[1].click();
        });
        element(by.id('delete-course-btn')).click();
        var alert_content = element(by.css('md-dialog-content'));
        var alert_text = alert_content.element(by.css('p')).getText();
        expect(alert_text).toEqual('El curso y sus horarios asociados, han sido eliminados correctamente.');
        element(by.css('md-dialog-actions')).element(by.css('button')).click();
    });

    it('Should show establishment errors', function(){
        element(by.id('addCourse')).click();
        var add_btn = element(by.css('[name="add-course-btn"]'));
        add_btn.click();
        expect(element(by.css('[name="rprice"]')).getText()).toEqual("El precio es obligatorio.");
        expect(element(by.css('[name="rest"]')).getText()).toEqual("El establecimiento es obligatorio.");
        expect(element(by.css('[name="rsp"]')).getText()).toEqual("El deporte es obligatorio.");
        element(by.css('.account-options')).click();
        element(by.css('[name="logout"]')).click();
    });
});