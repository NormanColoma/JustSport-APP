/**
 * Created by Norman on 22/05/2016.
 */
var express = require('express');
var app = express();

describe('Destails of establishment', function() {
    var host = 'http://localhost:5000';
    if (app.get('env') === 'test') {
        host = 'https://localhost:5000';
    }

    var sport_field, location_field, search_button;
    beforeEach(function () {
        sport_field = element(by.css('[name="sportField"]'));
        location_field = element(by.css('[name="locationField"]'));
        search_button = element(by.css('.search-ests'));
    });

});