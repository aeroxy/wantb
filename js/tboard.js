var app = angular.module('WCTB',['ngMaterial', 'ngMessages']);
app.controller('AppCtrl',function($scope, $http, $sce){
  $http.get('main.json').then(function(response){
    $http.get('list.json').then(function(listresponse){
      $scope.main = response.data;
      $scope.bname = listresponse.data.name;
      $scope.overviews = [
        {
          "name": "交易笔数",
          "volume": $sce.trustAsHtml($scope.main.volume + '<span>笔</span>')
        },{
          "name": "支付宝交易笔数",
          "volume": $sce.trustAsHtml($scope.main.alipay_volume + '<span>笔</span>')
        },{
            "name": "微信交易笔数",
            "volume": $sce.trustAsHtml($scope.main.wechat_volume + '<span>笔</span>')
        },{
            "name": "交易总金额",
            "volume": $sce.trustAsHtml($scope.main.total + '<span>元</span>')
        },{
            "name": "支付宝交易总金额",
            "volume": $sce.trustAsHtml($scope.main.alipay_total + '<span>元</span>')
        },{
            "name": "微信交易总金额",
            "volume": $sce.trustAsHtml($scope.main.wechat_total + '<span>元</span>')
        },{
            "name": "活跃门店数",
            "volume": $sce.trustAsHtml($scope.main.store + '<span>个</span>')
        },
      ];
      $scope.lists = $scope.main.list;
      function addlist(){
        var newlist = [];
        var currentdate = new Date();
        var currenttime = pad(currentdate.getHours(),2) + ":" + pad(currentdate.getMinutes(),2) + ":" + pad(currentdate.getSeconds(),2);
        newlist.push(currenttime);
        newlist.push($scope.bname[getRandomInt(0,133)]);
        newlist.push(getRandomDouble(1,133));
        $scope.main.total = (parseFloat($scope.main.total) + parseFloat(newlist[2])).toFixed(2);
        // console.log($scope.main.total);
        $scope.main.volume++;
        // console.log($scope.main.volume);
        newlist.push(getRandomInt(0,3));
        if (newlist[3]==1){
          $scope.main.wechat_total = (parseFloat($scope.main.wechat_total) + parseFloat(newlist[2])).toFixed(2);
          $scope.main.wechat_volume++;
        } else if (newlist[3]==2){
          $scope.main.alipay_total = (parseFloat($scope.main.alipay_total) + parseFloat(newlist[2])).toFixed(2);
          $scope.main.alipay_volume++;
        }
        newlist.push(0);
        $scope.lists.unshift(newlist);
        if ($scope.lists.length > 30) {$scope.lists.splice(-1,1)}
        $scope.overviews = [
          {
            "name": "交易笔数",
            "volume": $sce.trustAsHtml($scope.main.volume + '<span>笔</span>')
          },{
            "name": "支付宝交易笔数",
            "volume": $sce.trustAsHtml($scope.main.alipay_volume + '<span>笔</span>')
          },{
              "name": "微信交易笔数",
              "volume": $sce.trustAsHtml($scope.main.wechat_volume + '<span>笔</span>')
          },{
              "name": "交易总金额",
              "volume": $sce.trustAsHtml($scope.main.total + '<span>元</span>')
          },{
              "name": "支付宝交易总金额",
              "volume": $sce.trustAsHtml($scope.main.alipay_total + '<span>元</span>')
          },{
              "name": "微信交易总金额",
              "volume": $sce.trustAsHtml($scope.main.wechat_total + '<span>元</span>')
          },{
              "name": "活跃门店数",
              "volume": $sce.trustAsHtml($scope.main.store + '<span>个</span>')
          },
        ];
        $scope.$apply();
      }
      setInterval(function(){
        setTimeout(addlist(),getRandomInt(0,1000));
      },2000);
      // console.log($scope.lists);
      angular.forEach($scope.lists,function(list,index){
        var currentdate = new Date();
        if (currentdate.getSeconds()>index){
          var currenttime = pad(currentdate.getHours(),2) + ":" + pad(currentdate.getMinutes(),2) + ":" + pad((currentdate.getSeconds() - index),2);
        } else if (currentdate.getMinutes()>index) {
          var currenttime = pad(currentdate.getHours(),2) + ":" + pad((currentdate.getMinutes() - index),2) + ":" + pad(currentdate.getSeconds(),2);
        } else {
          var currenttime = pad((currentdate.getHours() - index),2) + ":" + pad((currentdate.getMinutes() - index),2) + ":" + pad(currentdate.getSeconds(),2);
        }
        list[0] = currenttime;
      });
      function create(){
        var currentdate = new Date();
        var currenttime = (currentdate.getHours() * 6) + Math.floor(currentdate.getMinutes() / 10);
        var currentyear = currentdate.getFullYear();
        var currentmonth = currentdate.getMonth();
        var today = currentdate.getDate();
        // function getLastWeek(){
        //   let today = new Date();
        //   let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        //   return lastWeek ;
        // }
        // var lastWeek = getLastWeek();
        // var lastWeekMonth = lastWeek.getMonth();
        // var lastWeekDay = lastWeek.getDate();
        // var lastWeekYear = lastWeek.getFullYear();
        var datanow = [];
        var datathen = [];
        var datanow_total = [];
        var datathen_total = [];
        for (i = 0; i < currenttime; i++) {
          var ran = getRandomInt(1,600);
          ran = ran + 72 - Math.abs(i - 72);
          datanow.push(ran);
          datathen.push(Math.abs(ran - getRandomInt(1,100)));
          datanow_total.push(ran*getRandomInt(1,100));
          datathen_total.push(Math.abs(ran - getRandomInt(1,100))*getRandomInt(1,100));
        }
        Highcharts.chart('volume',{
          chart: {
            type: 'line',
          },
          title: {
            text: '',
          },
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            floating: false,
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
              day: '%H:%M'
            },
          },
          yAxis: {
            title: {
              text: '交易笔数',
              enabled: false,
            }
          },
          tooltip: {
            shared: true,
            valueSuffix: '笔'
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            line: {
              animation: false,
            }
          },
          series: [{
            name: '上周同期',
            data: datathen,
            pointStart: Date.UTC(currentyear, currentmonth, today),
            pointInterval: 604000,
            color: '#00a1af',
          }, {
            name: '今天',
            data: datanow,
            pointStart: Date.UTC(currentyear, currentmonth, today),
            pointInterval: 604000,
            color: '#ff6c36',
          }]
        });
        Highcharts.chart('total',{
          chart: {
            type: 'line',
          },
          title: {
            text: '',
          },
          legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#DDDDDD'
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
              day: '%H:%M'
            },
          },
          yAxis: {
            title: {
              text: '交易金额',
              enabled: false,
            }
          },
          tooltip: {
            shared: true,
            valueSuffix: '元'
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            line: {
              animation: false,
            }
          },
          series: [{
            name: '上周同期',
            data: datathen_total,
            pointStart: Date.UTC(currentyear, currentmonth, today),
            pointInterval: 604000,
            color: '#00a1af',
          }, {
            name: '今天',
            data: datanow_total,
            pointStart: Date.UTC(currentyear, currentmonth, today),
            pointInterval: 604000,
            color: '#ff6c36',
          }]
        });
      }
      // create();
      setTimeout(function(){create();},0);
      // setInterval(function(){ create();},1000);
    });
  });
});
app.filter('paymethod', function(){
  return function(input) {
    var output;
    if (input==0){
      output = '银行卡';
    } else if (input==1){
      output = '微信';
    } else if (input==2){
      output = '民生-支付宝';
    } else {
      output = '未知';
    }
    return output;
  }
});
app.filter('terminal', function(){
  return function(input) {
    var output;
    if (input==0){
      output = '银行卡';
    } else if (input==1){
      output = '扫码';
    } else if (input==2){
      output = '扫码';
    } else {
      output = '未知';
    }
    return output;
  }
});
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomDouble(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.random() * (max - min)).toFixed(2) + min;
}
function pad(num, size) {
  var s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}
$(window).on('load',function(){
  $('html').removeClass('loading');
  $('#loading').remove();
});