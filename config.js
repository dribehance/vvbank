module.exports = function(config) {

  // Output directory
  config.dest = 'www';
  
  // Inject cordova script into html
  config.cordova = false;
  
  // Images minification
  config.minify_images = true;

  // Development web server

  config.server.host = '192.168.1.100';
  config.server.port = '9000';
  
  // Set to false to disable it:
  // config.server = false;

  // Weinre Remote debug server
  
  config.weinre.httpPort = 9001;
  config.weinre.boundHost = '192.168.1.100';

  // Set to false to disable it:
  config.weinre = false;
    
  // 3rd party components
  // config.vendor.js.push('./bower_components/jquery/dist/jquery.min.js');
  config.vendor.js.push('./bower_components/ng-flow/dist/ng-flow-standalone.js');
  config.vendor.js.push('./bower_components/angular-timer/dist/angular-timer.min.js');
  config.vendor.js.push('./bower_components/humanize-duration/humanize-duration.js');
  config.vendor.js.push('./bower_components/momentjs/moment.js');
  config.vendor.js.push('./bower_components/d3/d3.min.js');
  config.vendor.js.push('./bower_components/pie-chart/dist/pie-chart.min.js');
  config.vendor.js.push('./bower_components/OwlCarousel/owl-carousel/owl.carousel.min.js');
  config.vendor.js.push('./bower_components/angular-local-storage/dist/angular-local-storage.min.js');
  config.vendor.js.push('./node_modules/china-identity-card/validate.js');
  // config.vendor.js.push('./bower_components/mockjs/dist/mock-min.js');
  // config.vendor.js.push('./src/plugins/angular.carsousel.js');
  // config.vendor.js.push('.bower_components/lib/dist/lib.js');
  // config.vendor.fonts.push('.bower_components/font/dist/*');

};