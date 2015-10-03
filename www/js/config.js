var app = angular.module('app', ['ngMaterial', 'ngRoute']);

app.config(function($mdThemingProvider, $mdIconProvider, $routeProvider, $mdGestureProvider){
	
	$routeProvider.
		when('/home', {
			templateUrl: 'partials/home.html',
		}).
		when('/fly', {
			templateUrl: 'partials/fly.html'
		}).
		otherwise({
			redirectTo: '/home'
		});

	/*$mdThemingProvider.definePalette('orange', {
		'50': 'FFF3E0',
		'100': 'FFE0B2',
		'200': 'FFCC80',
		'300': 'FFB74D',
		'400': 'FFA726',
		'500': 'FF9800',
		'600': 'FB8C00',
		'700': 'F57C00',
		'800': 'EF6C00',
		'900': 'E65100'
	});*/
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('indigo')
		.backgroundPalette('grey');
	
	$mdIconProvider
		.icon('rocket', '/svg/rocket20.svg');

});
