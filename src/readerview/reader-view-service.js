var ReaderViewService = function ($stateParams) {

    console.log("reader view contrl", $stateParams);

    var _getMail = function(id) {

        return {
            id : id,
            subject: 'subjet from reader view ctrl',
            body : 'lkjlkj ' +
            'klkjl ' +
            'lkjslkj j lkjdsa ' +
            ' kl jdskjl'
        }

    };

    return  {
        getMail : _getMail
    };
};

ReaderViewService.$inject = ['$stateParams'];

module.exports = function(app) {
    app.factory('ReaderViewService', ReaderViewService);
}