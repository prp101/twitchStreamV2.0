var app = angular.module('MyApp', []);
/*  Controller za dohvaćanje streamova sa funkcijom za load more   */
app.controller('Streamovi', function($scope, $http) {

/*  Funkcija za resetiranje filtera nakon što se odznači */ 
   $scope.watch= function(){
        if($scope.selected==false){
            $scope.lang= {"channel":{"broadcaster_language":"","language":""}} ;
        }
    };
/* iniciranje varijabli u koje spremamo koji je check box aktivan, jezik i tako dalje */	
  $scope.selected = '';
  $scope.lang = { };
  $scope.filters = { };
  $scope.x=0;
  $scope.myName = [];
  /* funkcija za dohvaćanje streamova */
$scope.loadData = function () {

 $http.get("https://api.twitch.tv/kraken/streams?limit=9&offset=" + $scope.x).then(function(response) {
    // add streams to existing array
    Array.prototype.push.apply($scope.myName, response.data.streams);

    $scope.link="http://player.twitch.tv/?channel=";
     return $scope.x=$scope.x + 9;
	 }); 
	 }; 
    //initial load
    $scope.loadData();
	/* izvlači top 30 Igrice  */
   $http.get("https://api.twitch.tv/kraken/games/top?limit=30" ).then(function(response) {
        $scope.myGames = response.data.top;
    });
 
 
});

/*  filter za propuštanje streamova sa twitcha */
app.filter('trustThisUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);

$(document).ready(function(){
		/*   Za menu igrica     */
	 $(".menu").click(function(){
        $(this).hide();
		$(".games, #close2").show();
    });
	$("#close2").click(function(){
        $("#close2, .games").hide();
		$(".menu").show();
    });
	
	$('#close2').click(function(){$('.container-fluid').toggleClass('active2');});
    $('.menu').click(function(){$('.container-fluid').toggleClass('active2');});
	
	/*       za filter po jeziku           */
    $(".filter").click(function(){
        $(this).hide();
		$(".lang, #close").show();
    });
	$("#close").click(function(){
        $("#close, .lang").hide();
		$(".filter").show();
    });
	
	$('#close').click(function(){$('.container-fluid').toggleClass('active');});
    $('.filter').click(function(){$('.container-fluid').toggleClass('active');});
	
/* Fancybox popup iniciranje i modifikacija  */
$(".various").fancybox({
		maxWidth	: 900,
		maxHeight	: 900,
		fitToView	: false,
		width		: '80%',
		height		: '90%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		padding:0,
		margin : [100,0,0,0],
		helpers : {
        overlay : {
            css : {
                'background' : 'rgba(0, 0, 0, 0)'
            }
        }
    }
	});

});

