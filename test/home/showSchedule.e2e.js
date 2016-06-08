/**
 * Created by Norman on 26/04/2016.
 */
var express = require('express');
var app = express();

describe('Home Schedule Dialog', function() {
    var host = 'http://localhost:5000';
    if (app.get('env') === 'test') {
        host = 'https://localhost:5000';
    }
    var sport_field, location_field, search_button, schedule_button;
    beforeEach(function () {
        sport_field = element(by.css('[name="sportField"]'));
        location_field = element(by.css('[name="locationField"]'));
        search_button = element(by.css('.search-ests'));
        schedule_button = element(by.id('showSchedule'));
    });

    it('Should show the schedule that user asks', function(){
        browser.get(host);
        element(by.id('test')).click();
        sport_field.click();
        var sport_list = element(by.id('ul-0'));
        sport_field.sendKeys('Spinning');
        sport_field.sendKeys(protractor.Key.ARROW_UP);
        sport_field.sendKeys(protractor.Key.ENTER);
        location_field.sendKeys('Alicante');
        location_field.sendKeys(protractor.Key.ARROW_UP);
        location_field.sendKeys(protractor.Key.ENTER);
        search_button.click();
        browser.executeScript('window.scrollTo(0,0);');
        var estabContainer = element(by.id('establishments-list-container'));
        estabContainer.all(by.css('md-card')).then(function(estab){
            estab[0].element(by.id('showSchedule')).click();
        });
        var schedule = element(by.css('[name="scheduleForm"'));
        expect(schedule.isPresent()).toBeTruthy();
        expect(schedule.isDisplayed()).toBeTruthy();
        element(by.id('hide-schedule-dialog')).click();
    });

    it('Should show the dialog alert when user tries to retrieve a schedule from establishment that it has not one', function(){
        var estabContainer = element(by.id('establishments-list-container'));
        estabContainer.all(by.css('md-card')).then(function(estab){
            estab[1].element(by.id('showSchedule')).click();
        });
        var no_schedule = element(by.id('no-schedule-dialog'));
        expect(no_schedule.isDisplayed()).toBeTruthy();
        element(by.id('dismiss-schedule-aler')).click();
    });

    it('Should show course information, when user asks for it', function(){
        var estabContainer = element(by.id('establishments-list-container'));
        estabContainer.all(by.css('md-card')).then(function(estab){
            estab[0].element(by.id('showSchedule')).click();
        });
        var schedule_list = element(by.id('schedule-list'));
        schedule_list.all(by.css('md-list-item')).then(function(item){
            item[0].element(by.id('show-course')).click();
        });
        var course = element(by.id('course-container'));
        expect(course.isDisplayed()).toBeTruthy();
    });
});