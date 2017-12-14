'use strict';

const express = require('express');
const router = express.Router();
const cache = require('memory-cache');
const app = require('../index');
//const PersonalHistoryDb = require('../service/personalHistoryDb');
const db = require("../service/salesforce");
const debug = require("debug")("bot-epxress:route");

router.get('/person/:user_id/diet_history/today', (req, res, next) => {
    return db.get_today_history(req.params.user_id).then((history) => {
        debug("Responding following diet history.");
        debug(history);
        return res.json(history);
    }).catch((error) => {
        debug(error);
        return res.json(error);
    });
    /*
    PersonalHistoryDb.getTodayHistory(req.params.user_id)
    .then(
        function(history){
            res.json(history);
        },
        function(error){
            res.json(error);
        }
    );
    */
});

module.exports = router;
