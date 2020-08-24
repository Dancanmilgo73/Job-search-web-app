import React, {useState, useEffect} from 'react';
import './App.css';
import Jobs from './Jobs';
import fetch from 'node-fetch';

const apiURL = 'http://localhost:5000/jobs';

async function fetchJobs(updateCb){
  const res = await fetch(apiURL);
  const json = await res.json();
  updateCb(json);
  console.log(json);

}
function App() {

  const [jobList, updateJobs] = useState([]);
  useEffect(() => {
    fetchJobs(updateJobs);
  },[])
  return (
    <div className="App">
      <Jobs jobs={jobList} />
    </div>
  );
}

export default App;
