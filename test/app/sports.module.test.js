/**
 * Created by Norman on 06/04/2016.
 */
angular
    .module('justSportTest')
    .run(sportTest);

sportTest.$inject = ['$httpBackend'];

function sportTest($httpBackend) {
    var local_api = "https://justsport-api.herokuapp.com/api/";
    var sports = {
        rows: [{id: 1, name: 'Spinning'}, {id: 2, name: 'GAP'}, {id: 3, name: 'BodyJump'}, {id: 4, name: 'Pilates'},
            {id: 5, name: 'CrossFit'}], count: 5
    };
    var Sports = {Sports: sports};
    $httpBackend.whenGET(local_api + '/sports?limit=100').respond(Sports);
}