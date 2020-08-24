var fetch = require('node-fetch');

const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

const baseURL ='https://jobs.github.com/positions.json';

async function fetchGithub(){
    resultCount = 1, onPage = 0;
    const allJobs = [];
    while(resultCount>0){
        const res = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs);
        resultCount = jobs.length;
        console.log("got", resultCount, "jobs");
        onPage++;

    }

    const jrJobs = allJobs.filter( job => {
        const jobTitle = job.title.toLowerCase();

        if (jobTitle.includes('senior') || jobTitle.includes('manager') ||
             jobTitle.includes('architect') || jobTitle.includes('sr.')){
                return false;
             }
             return true;        
    })

    console.log('filtered down to', jrJobs.length);

    console.log("total of ", allJobs.length, 'jobs haha');
    const success = await setAsync('github', JSON.stringify(jrJobs));

    console.log({success});
    }

fetchGithub();
module.exports = fetchGithub;