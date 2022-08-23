const p = document.getElementById('p');
const stopButton = document.getElementById('stopButton');

// function To get new Joke
let jokeBody;
let notifyInterval;
async function getJoke() {
    const jokeData = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    });
    const joke = await jokeData.json();
    jokeBody = joke.joke;
    // return jokeBody;
    console.log(jokeBody);
}

// function To create new Notification with Audio
async function showNotification() {
    await getJoke();
    new Notification("Joke :)", {
        body: jokeBody,
        icon: 'https://icanhazdadjoke.com/static/smile.svg'
    });
    new Audio('audio-2.mp3').play();
}

function notifyMe() {
    p.classList.add('d-block');
    stopButton.classList.add('d-block');
    if (Notification.permission === "granted") {
        notifyInterval = setInterval(showNotification, 5000);
        // if permission is already granted, we'll get Notification in every 3 sec

    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                notifyInterval = setInterval(showNotification, 5000);
                // after giving permission, we'll get Notification in every 5 sec
            }
        });
    }
}


function stopNotify() {
    clearInterval(notifyInterval);
}