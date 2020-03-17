const request = require('request');

const statuses = [];
const button = document.querySelector('.btn');
const mainBody = document.getElementsByClassName('main-container');

function getStatus() {
  request('https://www.githubstatus.com/',  { json: true }, (err, res, body) => {  
    const components = body.components;
    for(let i=0; i<components.length; i++) {
      if(components[i].showcase) {
        statuses.push({
          "name": components[i].name,
          "status": components[i].status
        });
      }
    }

    const gsNames = document.getElementsByClassName('git_status__name');
    const gsFlags = document.getElementsByClassName('git_status__flag');

    for(let j=0; j<gsNames.length; j++) {
      gsNames[j].innerHTML = statuses[j].name;
      gsFlags[j].innerHTML = statuses[j].status;

      if(statuses[j].status !== "operational") {
        gsFlags[j].classList.add(".git_status__flag--err");
      }

    }
  });
}

getStatus();

button.addEventListener("click", () => {
  getStatus();
  mainBody[0].style.display = 'block';
});