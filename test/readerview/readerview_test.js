describe('Reader View Ctrl', function () {

    beforeEach(function () {
        //angular.mock.module('ngMailClient')
        angular.mock.module('ngMailClient');
    });
    //angular.mock.inject(function($rootScope, $controller, $location
    /*beforeEach(angular.mock.inject(function () {

    }));
    */
    beforeEach(function () {
        require('readerview/readerview.js');
     });

    it("should have variable for currect page", function() {

        expect(true).toBe(true);

    });

});