/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gravility.controller('CubeController', ['$scope', function ($scope) {
        $scope.cube = null;
        $scope.title = "Cube Summation";
        $scope.input = null;
        $scope.createCube = function () {
            if ($scope.input !== null) {
                var lines = $scope.input.split('\n');
                var t = parseInt(lines[0]);
                var i = 1;
                var n_m = null;
                var n = null;
                var m = null;
                if (/^[1-9]$|^[0-1][0-9]$|^50$/.test(t)) {
                    while (i < lines.length) {
                        if (/^(\d{1,3})\s(\d{1,4})$/.test(lines[i].trim())) {
                            n_m = lines[i].split(' ');
                            n = parseInt(n_m[0]);
                            m = parseInt(n_m[1]);
                            i++;
                            if(n >= 1 && n <= 100){
                                $scope.cube = initCube(n);
                                console.log($scope.cube);
                                if(m >= 1 && m <= 1000){
                                    var test = lines.slice(i, i+m);
                                    i=i+m;
                                    test.forEach(function(e){
                                        if(/^(^UPDATE|update)\s(\d{0,3}\s\d{0,3}\s\d{0,3}\s(-?\d*\.{0,1}\d+))$/.test(e)){
                                            var update = e.split(' ');
                                            if((parseInt(update[1]) <= n && parseInt(update[1])>=1)
                                                    && (parseInt(update[2]) <= n && parseInt(update[2])>=1)
                                                    && (parseInt(update[3]) <= n && parseInt(update[3])>=1)
                                                    && (parseInt(update[4])>= Math.pow(-10, 9) 
                                                    && parseInt(update[4])<=Math.pow(10,9))){
                                                $scope.cube[update[1]-1][update[2]-1][update[3]-1] = update[4];
                                            }
                                        }else if(/^(^QUERY|query)\s(\d{0,3}\s\d{0,3}\s\d{0,3}\s\d{0,3}\s\d{0,3}\s\d{0,3})$/.test(e)){
                                            
                                        }else{
                                            console.log('Format command not valid');
                                            throw('Format command not valid');
                                        }
                                    });
                                }else{
                                    console.log('Query numbers not valid, try again');
                                    break;
                                }
                            }else{
                                console.log('Cube size not valid, try again');
                                break;
                            }
                        } else {
                            console.log('Not valid format for test case');
                            break;
                        }
                    }
                    console.log($scope.cube);
                } else {
                    console.log('Not valid Test cases');
                }
            }
        };
        
        var initCube = function(n){
            var cube = new Array();
            for(var i = 0; i < n; i++){
                cube[i] = new Array();
                for(var j =0; j < n; j++){
                    cube[i][j]=new Array();
                    for(var k = 0; k < n; k++){
                        cube[i][j][k] = 0;
                    }
                }
            }
            return cube;
        };
    }]);