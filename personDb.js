'use strict';

const request = require('request');
const Promise = require('bluebird');
const dbPrefix = 'https://140.86.13.12/apex/demo_gallery_for_nkjm/demo_gallery/dietitian';

module.exports = class personDb {

    set person(value){
        this._person = value;
        this._person.age = Math.floor(((new Date()).getTime() - this._person.birthday * 1000) / (1000 * 60 * 60 * 24 * 365));
    }

    get person(){
        return this._person;
    }

    getPersonList(){
        return new Promise(function(resolve, reject){
            let headers = {
                'Content-Type': 'application/json'
            };
            let url = dbPrefix + '/person/list';
            request({
                url: url,
                method: 'GET',
                headers: headers,
                json: true,
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    if (response.body && response.body.items){
                        resolve(response.body.items);
                    } else {
                        reject({message:'Failed to get person. It seems Person Db is out of order.'});
                    }
                }
            });
        });
    }

    getPerson(lineId){
        return new Promise(function(resolve, reject){
            let headers = {
                'Content-Type': 'application/json'
            };
            let url = dbPrefix + '/person/' + lineId;
            request({
                url: url,
                method: 'GET',
                headers: headers,
                json: true,
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    if (response.body && response.body.items){
                        resolve(response.body.items[0]);
                    } else {
                        reject({message:'Failed to get person. It seems Person Db is out of order.'});
                    }
                }
            });
        });
    }

};
