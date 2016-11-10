angular.module("dietitian", ["ui.bootstrap"])
.service("state", function(){
    this.requestReloadPerson = false;
    this.person = null;

    this.reloadPerson = function(){
        this.requestReloadPerson = !this.requestReloadPerson;
    }
})
.service("remoting", function(){
    this.isRemoting = false;
    this.status = null;

    this.setIsRemoting = function(isRemoting){
        this.isRemoting = isRemoting;
    }

    this.setStatus = function(status){
        this.status = status;
    }
})
.service("socket", function(){
    this.connect = function(channel){
		this.connection = io(location.protocol + '//' + location.host + '/' + channel);
	}
})
.service("personDb", function($log, $http, $q){
    this.dbPrefix = location.protocol + '//' + location.host + '/personDb';

    this.getPerson = function(lineId){
        var url = this.dbPrefix + "/person/" + lineId;
        return $http({
            url: url,
            method: "get"
        });
    }

    this.updatePerson = function(person){
        var url = this.dbPrefix + "/person/" + person.line_id;
        return $http({
            url: url,
            method: "put",
            data: { person: person }
        });
    }
})
.service("personalHistoryDb", function($log, $http, $q, person){
    this.dbPrefix = location.protocol + '//' + location.host + '/personalHistoryDb';

    this.getTodayHistory = function(){
        var url = this.dbPrefix + "/person/" + person.line_id + "/diet_history/today";
        return $http({
            url: url,
            method: "get"
        });
    }
});
