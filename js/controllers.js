angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicPopup, $ionicScrollDelegate, $ionicSideMenuDelegate, $window, Words,$timeout) {
$scope.opt=[];
inprogress=false;

$scope.notesshow=true;

$scope.opt.wordlength=4;
WordLength=$scope.opt.wordlength;

$scope.opt.info=true;

$scope.data = [];
$scope.options = [];
previous=[];

$scope.options.input=true;
$scope.options.ICON=false;

$scope.options.text='any';
$scope.opt.end= 'to begin!';


$scope.options.wordlength=WordLength;

$scope.newgame = function() {

$timeout(function(){document.getElementById("mahtext").focus();},100)

//document.getElementById("mahtext").focus();

  if(typeof $scope.moves !== 'undefined'){
var sheet = document.createElement('style')
sheet.innerHTML = ".animated {-webkit-animation-duration: 0s !important;animation-duration: 0s !important;-webkit-animation-fill-mode: both;animation-fill-mode: both;}";
document.body.appendChild(sheet);
  }

turnon=true;

  $scope.data = [];
  $scope.options = [];



challenge=false;

  $scope.tit="Word Unknown";

   


  WordLength=$scope.opt.wordlength;

  // $scope.data from $localStorage && realword else
  $scope.options.wordlength=WordLength;
  $scope.options.input=true;

  if (WordLength == 4){
rand=Math.floor(Math.random() * fourletterwords.length)
$scope.realword = fourletterwords[rand];

legal=legalfour;

}else if (WordLength == 5){

rand=Math.floor(Math.random() * fiveletterwords.length)
$scope.realword = fiveletterwords[rand];

legal=legalfive;

}else if (WordLength == 6){

  rand=Math.floor(Math.random() * sixletterwords.length)
$scope.realword = sixletterwords[rand];

legal=legalsix;

}else if (WordLength == 7){

  rand=Math.floor(Math.random() * fourletterwords.length)
$scope.realword = sevenletterwords[rand];

legal=legalseven;

}else if (WordLength == 8){

rand=Math.floor(Math.random() * eightletterwords.length)
$scope.realword = eightletterwords[rand];

legal=legaleight;

}

$scope.options.ICON=false;
$scope.moves=[];

previous=[];

if (WordLength == 8){$scope.options.text='an'}else{
$scope.options.text='any'
}

}

$scope.newgame();


 $scope.showConfirm = function() {

  if ($scope.moves.length){
   
   var confirmPopup = $ionicPopup.confirm({
     title: 'New Game',
     template: 'Are you sure you want to abandon the current game?'
   });
   confirmPopup.then(function(res) {
     if(res) {

      if(challenge==false){
        $scope.newgame();
         
      }else{challenge=false;$scope.dailychall()}

     } else {
       
     }
   });
 }else{if(challenge==false){
        $scope.newgame(); 
      }else{challenge=false;$scope.dailychall()}}
}

$scope.wlength = function() {
  $ionicSideMenuDelegate.toggleLeft();

   if ($scope.moves){
    $ionicSideMenuDelegate.toggleLeft();
    $scope.showConfirm()}else{$scope.newgame()}
}

$scope.challengebutton=function(){

  //if (internet){
challenge=true;
 $scope.showConfirm();
 // }else{"Requires Internet Connection"}
}

$scope.dailychall = function() {

$scope.tit="Daily Challenge!";

$scope.opt.notes=!$scope.notesshow;

date = new Date();
fig=Math.floor((date.getTime()-18000000)/86400000);

$scope.data = [];
$scope.options = [];

  WordLength=$scope.opt.wordlength;

  // $scope.data from $localStorage && realword else
  $scope.options.wordlength=WordLength;
  $scope.options.input=true;


  if (WordLength == 4){
rand=fig % fourletterwords.length
$scope.realword = fourletterwords[rand];

legal=legalfour;

}else if (WordLength == 5){

rand=fig % fiveletterwords.length
$scope.realword = fiveletterwords[rand];

legal=legalfive;

}else if (WordLength == 6){

  rand=fig % sixletterwords.length
$scope.realword = sixletterwords[rand];

legal=legalsix;

}else if (WordLength == 7){

  rand=fig % fourletterwords.length
$scope.realword = sevenletterwords[rand];

legal=legalseven;

}else if (WordLength == 8){

rand=fig % eightletterwords.length
$scope.realword = eightletterwords[rand];

legal=legaleight;

}
   $scope.options.ICON=false;
$scope.moves=[];

previous=[];

if (WordLength == 8){$scope.options.text='an'}else{
$scope.options.text='any'
}


}
  
$scope.example=function(){
$scope.opt.example=false;

}

$scope.opt.example=true;
$scope.info=function(){
  $scope.opt.info=!$scope.opt.info;
  if ($scope.opt.info){
  $scope.opt.example=true
  }
//if (!$scope.opt.example){$scope.opt.example=true}

}
$scope.input=function(){
if (turnon){
var sheet = document.createElement('style')
sheet.innerHTML = ".animated {-webkit-animation-duration: 1.3s !important;animation-duration: 1.3s !important;-webkit-animation-fill-mode: both;animation-fill-mode: both;}";
document.body.appendChild(sheet);
turnon=false;
}
  $scope.data.guess=$scope.data.guess.toLowerCase()

  $scope.data.guess=$scope.data.guess.replace(/\s+/g, '');

if ($scope.data.guess.length == WordLength) { 

  if (legal.indexOf($scope.data.guess)>-1 && previous.indexOf($scope.data.guess)==-1) {
      $scope.options.ICON=true;

previous.push($scope.data.guess);
$scope.options.text='next';
$scope.opt.end='';

inprogress=true;

x=0;
o=0;

// X Calc


doneX=[];
doneO=[];


for (i=0;i<WordLength;i++){
  if ($scope.data.guess.slice(i, i+1) == $scope.realword.slice(i,i+1)){
     x=x+1
     doneX.push(i);
  }
}


for (j=0;j<WordLength;j++){
    if (doneX.indexOf(j)>-1){continue};

  for (k=0;k<WordLength;k++){
    if (doneX.indexOf(k)>-1){continue};
    if (doneO.indexOf(k)>-1){continue};

    if ($scope.data.guess.slice(j, j+1) == $scope.realword.slice(k,k+1)) {

      o=o+1;
      doneO.push(k);
      break;

    }
}
}
exs=0;
ohs=0;
XOXO=''

for (h=0;h<x;h++){

XOXO += "<span style='color:#cc5151'><b>X</b> </span>";
exs=exs+1;
}

for (g=0;g<o;g++){

XOXO += "<span style='color:#51a3cc'><b>O</b> </span>";
ohs=ohs+1
}

if (x == 0 && o == 0){XOXO="<span style='color:#9069ce'><b>––</b></span>"}

ohs=ohs+exs;
$scope.opt.example=false

$scope.moves.push(

  {guess:$scope.data.guess, id: $scope.moves.length + 1, xo: XOXO, num:[exs,ohs]}

  );


$scope.opt.info=false;

$scope.data.guess = '';



if (x==WordLength){

  $scope.options.input=false

  // add post to twitter functionality? 
 // alert('you won in '+ $scope.moves.length +' turns!')
  

    var alertPopup = $ionicPopup.confirm({
     title: 'You <b>Win</b>!',
     subTitle: 'You got <b>"' + $scope.realword +'"</b> in <b>'+ $scope.moves.length +'</b> turns!',
     cancelText:'Try <b>'+(parseInt($scope.opt.wordlength)+1)+'</b> letters',
    okText:'New Game',
    scope: $scope
      })
      alertPopup.then(function(res) {
        if (res){
          $scope.newgame();
        }else{
          if ($scope.opt.wordlength==8){alert('You have conquered Word Unknown!')}
          $scope.opt.wordlength=String(parseInt($scope.opt.wordlength)+1);
          $scope.newgame();
        }
      },function(){});
//()()()


$scope.opt.notes=false;


}



}else{


$scope.data.guess=$scope.data.guess.substr(0,$scope.data.guess.length-1)

}


}



};





//--------------- TODO ---------------------------
$scope.showorhide = function() {
   
            $scope.showhide=!$scope.showhide;
   

//alert($scope.showhide)

};

//---------------------------------------------------

$scope.synonymy=function(){

if (navigator.appVersion.indexOf("iPhone") > 0 ){
$window.open("http://itunes.apple.com/us/app/synonymy-lite/id938998017?ls=1&mt=8");
}else if(navigator.appVersion.indexOf("Android") > 0){
$window.open("http://play.google.com/store/apps/details?id=air.com.jarvisfilms.synonymylite");
}else{
$window.open('http://www.synonymy-game.com/', '_system', 'location=yes')
}

};

      $scope.iconic = function() {
$window.open('https://www.iconicpasswords.com', '_system', 'location=yes')
    };


       $scope.jarvisfilms = function() {
$window.open('http://www.jarvisfilms.com', '_system', 'location=yes')
    };


           $scope.facebook = function() {
$window.open('http://www.facebook.com/iconicpasswords', '_system', 'location=yes')
    };

              $scope.github = function() {
$window.open('https://github.com/ccj242', '_system', 'location=yes')
    };

           $scope.twitter = function() {
$window.open('https://twitter.com/intent/tweet?text=Word%20Unknown%20is%20a%20mix%20of%20hangman%20and%20mastermind.%20Totally%20free!%20www.wordunknown.com', '_system', 'location=yes')
    };

           $scope.stumbleupon = function() {
$window.open('http://bit.ly/1R6IRRD', '_system', 'location=yes')
    };

            $scope.birdsupstairs = function() {
$window.open('http://www.youtube.com/embed/2rI_em4MscE?rel=0&autoplay=1', '_system', 'location=yes')
    };


});