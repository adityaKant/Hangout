(function(){
    'use strict';

    function factory($mdDialog){
        return{
            show: show
        };

        function show(ev,modal){
            var controller, templateUrl;
            if(modal == "logIn"){
                controller = 'SessionController';
                templateUrl = 'angularApp/views/logInModal.html';
            }
            else{
                controller = 'SignUpController';
                templateUrl = 'angularApp/views/signUpModal.html';
            }
            //method to show the modal
            $mdDialog.show({
                controller: controller,
                controllerAs: 'modalCtrl',
                templateUrl: templateUrl,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
                .then(function(answer) {
                    //code to be executed after save
                }, function() {
                    //code to be executed when the dialog is cancelled
                });
        }
    }
    factory.$inject = ['$mdDialog'];

    angular.module('signInModal.service',[
        'SignUp.controller',
        'Session.controller'
    ])
        .factory('$signInModal',factory);
})();
