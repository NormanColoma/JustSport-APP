/**
 * Created by Norman on 17/05/2016.
 */
var express = require('express');
var app = express();

describe('Destails of establishment', function() {
    var host = 'http://localhost:5000';
    if (app.get('env') === 'test') {
        host = 'https://localhost:5000';
    }

    var sport_field, location_field, search_button;
    beforeEach(function(){
        sport_field = element(by.css('[name="sportField"]'));
        location_field= element(by.css('[name="locationField"]'));
        search_button = element(by.css('.search-ests'));
    });

    it('should display the details of establishment selected', function(){
        browser.get(host);
        var desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod " +
            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation " +
            "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate " +
            "velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa " +
            "qui officia deserunt mollit anim id est laborum";
        sport_field.click();
        var sport_list = element(by.id('ul-0'));
        sport_field.sendKeys('Spinning');
        sport_list.all(by.css('li')).then(function(sports) {
            sports[0].click();
        });
        location_field.sendKeys('Alicante');
        browser.sleep(1500);
        var location_list = element(by.id('ul-1'));
        location_list.all(by.css('li')).then(function(location) {
            location[0].click();
        });
        search_button.click();
        element(by.id('est-details-1')).click();
        expect(element(by.css('.est-title')).getText(),"Nombre Gym");
        expect(element(by.css('.est-desc')).getText(),desc);
        expect(element(by.css('.est-addr')).getText(),"Esta es la dirección , Alicante");
        expect(element(by.css('.est-phone')).getText(),"965660427");
        expect(element(by.css('.est-website')).getText(),"www.pagina.com");
    });

    it('should display the commentaries of establishment', function(){
        var commentaries = element(by.css('.est-commentaries'));
        expect(commentaries.all(by.css('md-list-item')).count()).toBe(2);
        commentaries.all(by.css('md-list-item')).then(function(comm) {
            expect(comm[0].element(by.css('.est-comm-user')).getText(), "Norman");
            expect(comm[0].element(by.css('.est-comm-text')).getText(), "El ambiente del gimnasio es increíble");
            expect(comm[0].element(by.css('.est-comm-date')).getText(), "12 de Mayo 2016, 00:10:43");
            expect(comm[1].element(by.css('.est-comm-user')).getText(), "Norman");
            expect(comm[1].element(by.css('.est-comm-text')).getText(), "El ambiente del gimnasio es increíble. Los monitores son muy profesionales y te ayudan en todo momento.");
            expect(comm[1].element(by.css('.est-comm-date')).getText(), "12 de Mayo 2016, 00:24:49");
        });
        expect(element(by.css('.est-login-message')).getText()).toBe('Para poder comentar, debes estar logueado.');
    });

    it('should display the votes of establishment', function(){
        expect(element(by.css('.like-cnt')).getText()).toBe('1');
    });

    it('should list the courses', function(){
        var courses = element(by.css('.est-courses'));
        expect(courses.all(by.css('li')).count()).toBe(1);
        courses.all(by.css('li')).then(function(course) {
            expect(course[0].element(by.css('a')).getText()).toBe('Curso de Spinning');
        });
    });

    it('should display the info about the course', function(){
        var courses = element(by.css('.est-courses'));
        courses.all(by.css('li')).then(function(course) {
            course[0].element(by.css('a')).click();
        });
        expect(element(by.css('.course-info')).getText()).toBe("Megacompleto");
        expect(element(by.css('.course-instructor')).getText()).toBe("Monitor: Carlos Díaz");
        expect(element(by.css('.course-price')).getText()).toBe("Precio: 17.50 €");
    });

    it('should display the schedule of the course', function(){
        var tabs = element(by.css('md-pagination-wrapper'));
        tabs.all(by.css('md-tab-item')).then(function(tab){
            tab[1].click();
        });
        expect(element(by.css('.schedule-message')).getText()).toBe('Esto son los horarios actualmente disponibles para ' +
            'el curso que has seleccionado. Recuerda que estos, variarán en función del curso seleccionado, ' +
            'aunque estos, sean de la misma actividad.');
        var schedule = element(by.id('schedule-list'));
        expect(schedule.all(by.css('md-list-item')).count()).toBe(6);
    });

    it('should show no commentaries found message', function(){
        browser.get(host);
        sport_field.click();
        var sport_list = element(by.id('ul-0'));
        sport_field.sendKeys('Spinning');
        sport_list.all(by.css('li')).then(function(sports) {
            sports[0].click();
        });
        location_field.sendKeys('Alicante');
        browser.sleep(1500);
        var location_list = element(by.id('ul-1'));
        location_list.all(by.css('li')).then(function(location) {
            location[0].click();
        });
        search_button.click();
        element(by.id('est-details-2')).click();
        expect(element(by.css('.est-no-commentaries')).getText()).toBe('Todavía no se ha realizado ningún comentario. Se el primero en dejar un comentario');
    });

    it('should post new commentary and display it', function(){
        var email_field = element(by.css('[name="email"]'));
        var pass_field = element(by.css('[name="pass"]'));
        var login_button = element(by.id('login_button'))
        browser.get(host+'/account/');
        email_field.sendKeys('pepe@gmail.com');
        pass_field.sendKeys('pepe15');
        login_button.click();
        browser.sleep(3000);
        sport_field.click();
        var sport_list = element(by.id('ul-0'));
        sport_field.sendKeys('Spinning');
        sport_list.all(by.css('li')).then(function(sports) {
            sports[0].click();
        });
        location_field.sendKeys('Alicante');
        browser.sleep(1500);
        var location_list = element(by.id('ul-1'));
        location_list.all(by.css('li')).then(function(location) {
            location[0].click();
        });
        search_button.click();
        element(by.id('est-details-1')).click();
        element(by.css('[name="textField"]')).sendKeys('Esto es un comentario de prueba');
        element(by.css('.new-commentary')).click();
        var commentaries = element(by.css('.est-commentaries'));
        expect(commentaries.all(by.css('md-list-item')).count()).toBe(3);
        commentaries.all(by.css('md-list-item')).then(function(comm) {
            expect(comm[2].element(by.css('.est-comm-user')).getText(), "Norman");
            expect(comm[2].element(by.css('.est-comm-text')).getText(), "Esto es un comentario de prueba");
        });
        element(by.css('.account-options')).click();
    });

});