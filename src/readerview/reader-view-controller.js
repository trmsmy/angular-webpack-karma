var ReaderCtrl = function (service, $stateParams) {

    console.log("reader view contrl", $stateParams);

    this.mail = service.getMail($stateParams.mailId);


};

ReaderCtrl.$inject = ['ReaderViewService', '$stateParams'];

module.exports = function(app) {
    app.controller('ReaderViewCtrl', ReaderCtrl);
}