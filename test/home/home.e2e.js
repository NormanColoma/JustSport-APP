/**
 * Created by Norman on 05/04/2016.
 */
var express = require('express');
var app = express();

describe('Home', function() {
    var host = 'http://localhost:5000';
    if(app.get('env') === 'test'){
        host = 'https://localhost:5000';
    }
    var sport_field, location_field, search_button, sport_error, location_error;
    beforeEach(function(){
        sport_field = element(by.css('[name="sportField"]'));
        location_field= element(by.css('[name="locationField"]'));
        search_button = element(by.css('.search-ests'));
        sport_error = element(by.css('.sport-message'));
        location_error = element(by.css('.location-message'));
    });

    it('should have a title', function() {
        browser.get(host);

        expect(browser.getTitle()).toEqual('JustSport');
    });

    it('should show "no results found" alert', function(){
        element(by.id('test')).click();
        expect(sport_field.getAttribute('value')).toBe('');
        expect(location_field.getAttribute('value')).toBe('');
        expect(element(by.css('md-dialog')).isPresent()).toBeFalsy();
        sport_field.click();
        var sport_list = element(by.id('ul-0'));
        var sports = sport_list.all(by.css('li')).count();
        sport_field.sendKeys('Spinning');
        sport_field.sendKeys(protractor.Key.ARROW_UP);
        sport_field.sendKeys(protractor.Key.ENTER);
        expect(sport_field.getAttribute('value')).toBe('Spinning');
        location_field.sendKeys('Valencia');
        location_field.sendKeys(protractor.Key.ARROW_UP);
        location_field.sendKeys(protractor.Key.ENTER);
        expect(location_field.getAttribute('value')).toBe('Valencia');
        search_button.click();
        expect(element(by.css('md-dialog')).isPresent()).toBeTruthy();
    });

    it('should show search form errors', function(){
        browser.get(host);
        search_button.click();
        expect(sport_error.isDisplayed()).toBeTruthy();
        expect(location_error.isDisplayed()).toBeTruthy();
    });

    it('should display the establishments found', function(){
        browser.get(host);
        sport_field.click();
        var sport_list = element(by.id('ul-0'));
        sport_field.sendKeys('Spinning');
        sport_field.sendKeys(protractor.Key.ARROW_UP);
        sport_field.sendKeys(protractor.Key.ENTER);
        location_field.sendKeys('Alicante');
        location_field.sendKeys(protractor.Key.ARROW_UP);
        location_field.sendKeys(protractor.Key.ENTER);
        var estabContainer = element(by.id('establishments-list-container'));
        expect(estabContainer.all(by.css('md-card')).count()).toBe(0);
        search_button.click();
        expect(element(by.css('md-dialog')).isPresent()).toBeFalsy();
        expect(element(by.id('establishments-list-container')).isDisplayed()).toBeTruthy();
        expect(estabContainer.all(by.css('md-card')).count()).toBe(6);
    });
});