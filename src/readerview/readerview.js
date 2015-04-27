var app = angular.module('ngMailClient').lazyLoader;

console.log('app lazy loader', app);

require('./reader-view-controller')(app);
require('./reader-view-service')(app);

