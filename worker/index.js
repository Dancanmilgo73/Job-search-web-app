const fetchGithub = require('./tasks/fetch-github')
var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');
job.start();