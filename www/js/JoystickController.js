app.controller('JoystickController', function($scope, $rootScope, $interval, $location){

	$rootScope.ws.send(JSON.stringify({ action: 'mainControllerRequest' }));

	$scope.fakeJoystickLeft = new VirtualJoystick({
		mouseSupport	: true,
		limitStickTravel: true,
		stickRadius	: 80
	});

	$scope.fakeJoystickLeft.addEventListener('touchStartValidation', function(event){
		console.log($scope);
		var touch = event.changedTouches[0];
		if (touch.pageX < $('#leftJoystickOverlay').width() + $('#leftJoystickOverlay').offset().left
			&& touch.pageX > $('#leftJoystickOverlay').offset().left
			&& touch.pageY < $('#leftJoystickOverlay').height() + $('#leftJoystickOverlay').offset().top
			&& touch.pageY > $('#leftJoystickOverlay').offset().top){
			return true;
		};
		return false;
	});

	$scope.joystickLeft = new VirtualJoystick({
		strokeStyle		: 'rgba(255, 255, 255, 0)',
		mouseSupport	: true,
		stickRadius	: 80
	});

	$scope.joystickLeft.addEventListener('touchStartValidation', function(event){
		var touch = event.changedTouches[0];
		if (touch.pageX < $('#leftJoystickOverlay').width() + $('#leftJoystickOverlay').offset().left
			&& touch.pageX > $('#leftJoystickOverlay').offset().left
			&& touch.pageY < $('#leftJoystickOverlay').height() + $('#leftJoystickOverlay').offset().top
			&& touch.pageY > $('#leftJoystickOverlay').offset().top){
			return true;
		};
		return false
	});

	$scope.fakeJoystickRight = new VirtualJoystick({
		strokeStyle		: 'orange',
		mouseSupport	: true,
		limitStickTravel: true,
		stickRadius	: 80
	});

	$scope.fakeJoystickRight.addEventListener('touchStartValidation', function(event){
		var touch = event.changedTouches[0];
		if (touch.pageX < $('#rightJoystickOverlay').width() + $('#rightJoystickOverlay').offset().left
			&& touch.pageX > $('#rightJoystickOverlay').offset().left
			&& touch.pageY < $('#rightJoystickOverlay').height() + $('#rightJoystickOverlay').offset().top
			&& touch.pageY > $('#rightJoystickOverlay').offset().top
			){
			return true;
		};
		return false
	});

	$scope.joystickRight = new VirtualJoystick({
		strokeStyle		: 'rgba(255, 255, 255, 0)',
		mouseSupport	: true,
		stickRadius	: 80
	});

	$scope.joystickRight.addEventListener('touchStartValidation', function(event){
		var touch = event.changedTouches[0];
		if (touch.pageX < $('#rightJoystickOverlay').width() + $('#rightJoystickOverlay').offset().left
			&& touch.pageX > $('#rightJoystickOverlay').offset().left
			&& touch.pageY < $('#rightJoystickOverlay').height() + $('#rightJoystickOverlay').offset().top
			&& touch.pageY > $('#rightJoystickOverlay').offset().top
			){
			return true;
		};
		return false
	});

	var i = 0;

	var joystickSocketUpdater = $interval(function(){
		if (i % 10 == 0){
			console.log($scope.ws);
			console.log($scope.fakeJoystickLeft);
		}
		i++
		$scope.joystick = {
			left: {
				deltaX : ((Math.sqrt(Math.pow($scope.joystickLeft.deltaX(), 2))>Math.sqrt(Math.pow($scope.joystickLeft._stickRadius, 2)))
							?(($scope.joystickLeft.deltaX()<0)?-100:100)
							:($scope.joystickLeft.deltaX()/$scope.joystickLeft._stickRadius)*100),
				deltaY : ((Math.sqrt(Math.pow($scope.joystickLeft.deltaY(), 2))>Math.sqrt(Math.pow($scope.joystickLeft._stickRadius, 2)))
							?(($scope.joystickLeft.deltaY()<0)?-100:100)
							:($scope.joystickLeft.deltaY()/$scope.joystickLeft._stickRadius)*100)*(-1)
			},
			right: {
				deltaX : ((Math.sqrt(Math.pow($scope.joystickRight.deltaX(), 2))>Math.sqrt(Math.pow($scope.joystickRight._stickRadius, 2)))
							?(($scope.joystickRight.deltaX()<0)?-100:100)
							:($scope.joystickRight.deltaX()/$scope.joystickRight._stickRadius)*100),
				deltaY : ((Math.sqrt(Math.pow($scope.joystickRight.deltaY(), 2))>Math.sqrt(Math.pow($scope.joystickRight._stickRadius, 2)))
							?(($scope.joystickRight.deltaY()<0)?-100:100)
							:($scope.joystickRight.deltaY()/$scope.joystickRight._stickRadius)*100)*(-1)
			}
		};
		console.log(JSON.stringify($scope.joystick));
		if($scope.ws.readyState == 1){
			$rootScope.ws.send(JSON.stringify({ action: 'rcData', data: $scope.joystick }));
		}
	}, 10);

	$scope.$on('$destroy', function() {
		$scope.fakeJoystickLeft.destroy();
		$scope.joystickLeft.destroy();
		$scope.fakeJoystickRight.destroy();
		$scope.joystickRight.destroy();
		$interval.cancel(joystickSocketUpdater);

		$rootScope.ws.send(JSON.stringify({ action: 'mainControllerRelease' }));
	});


	/*
	$scope.tan = Math.tan;
	$scope.round = Math.round;
	$scope.PI = Math.PI;

	$scope.LJOvelay = new Hammer(document.getElementById('leftJoystickOverlay'));
	$scope.LJOvelay.fromTop = $('#leftJoystickOverlay').offset().top;
	$scope.LJOvelay.fromLeft = $('#leftJoystickOverlay').offset().left;

	$scope.RJOvelay = new Hammer(document.getElementById('rightJoystickOverlay'));
	$scope.RJOvelay.fromTop = $('#rightJoystickOverlay').offset().top;
	$scope.RJOvelay.fromLeft = $('#rightJoystickOverlay').offset().left;
	

	$scope.rightJoystick = false;
	$scope.leftJoystick = false;

	console.log($scope.LJOvelay);
	console.log($scope.RJOvelay);

	$scope.LJOvelay.on('hammer.input', function(ev){
		if (ev.deltaX*ev.deltaX + ev.deltaY*ev.deltaY <= 76*76){
			ev.marginLeft = ev.deltaX+75-15;
		}else{
			console.log(Math.round(ev.angle)*(Math.PI/180));
			ev.marginLeft = ((ev.deltaY>75)?75:ev.deltaY)/(Math.tan(Math.round(ev.angle)*(Math.PI/180)))
		}
		$scope.leftJoystick = ev;
		console.log($scope.leftJoystick);
		$scope.$apply();
	});
	*/

});