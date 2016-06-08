/**
 * Created by Norman on 08/06/2016.
 */
describe('Back Office Courses Service that handles courses', function() {
    var $httpBackend;
    var baseAPI = 'https://localhost:3000/api/';
    var backOCService;

    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector, backOfficeCoursesService) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        backOCService = backOfficeCoursesService;
    }));
});