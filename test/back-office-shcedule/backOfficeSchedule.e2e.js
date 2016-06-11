/**
 * Created by Norman on 11/06/2016.
 */
var express = require('express');
var app = express();

describe('Schedule Backoffice', function() {
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

    it('Should display the schedule', function () {
        browser.get(host + "/backoffice");
        email_field.sendKeys('pepe@gmail.com');
        pass_field.sendKeys('pepe15');
        login_button.click();
        element(by.css('.account-options')).click();
        element(by.css('[name="backoffice"]')).click();
        var tab_list = element(by.css('md-tabs'));
        tab_list.all(by.css('md-tab-item')).then(function (tabs) {
            tabs[2].click();
        });
        var select = element(by.id('list-ests-sched'));
        select.click();
        var ests = element(by.css('.md-select-menu-container.md-active')).all(by.css('md-option'));
        ests.then(function (l_ests) {
            l_ests[0].click();
        });

        var courses_select = element(by.id('list-courses-sched'));
        courses_select.click();
        expect(courses_select.isPresent()).toBeTruthy();
        var courses = element(by.css('.md-select-menu-container.md-active')).all(by.css('md-option'));
        courses.then(function (l_courses) {
            l_courses[0].click();
        });
        expect(element(by.id('establishments-list-schedule-container')).isDisplayed()).toBeTruthy();
        var schedule = element(by.id('schedule-list-backoffice'));
        var schedules = schedule.all(by.css('md-list-item'));
        schedules.then(function(l_sched){
            expect(l_sched.length).toBe(6);
        });
    });

    it('Should delete the schedule correctly', function(){
        element(by.id('delete-schedule-1')).click();
        var alert_content = element(by.css('md-dialog-content'));
        var alert_text = alert_content.element(by.css('p')).getText();
        expect(alert_text).toEqual('El horario seleccionado, ha sido eliminado correctamente.');
        element(by.css('md-dialog-actions')).element(by.css('button')).click();
        var schedule = element(by.id('schedule-list-backoffice'));
        var schedules = schedule.all(by.css('md-list-item'));
        schedules.then(function(l_sched){
            expect(l_sched.length).toBe(5);
        });
        element(by.css('.account-options')).click();
        element(by.css('[name="logout"]')).click();
    });
});