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
        element(by.css('.account-options')).click();
        element(by.css('[name="backoffice"]')).click();
        var tab_list = element(by.css('md-tabs'));
        tab_list.all(by.css('md-tab-item')).then(function(tabs) {
            tabs[1].click();
        });
        var select = element(by.id('list-ests'));
        select.click();
        var ests = element(by.id('select_container_6')).all(by.css('md-option'));
        ests.then(function(l_ests){
            expect(l_ests.length).toBe(3);
            l_ests[0].click();
        });

        var courses_select = element(by.id('list-courses'));
        courses_select.click();
        expect(courses_select.isPresent()).toBeTruthy();
        var courses = element(by.id('select_container_7')).all(by.css('md-option'));
        courses.then(function(l_courses){
            expect(l_courses.length).toBe(3);
        });

    });

});