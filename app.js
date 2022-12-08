// -------- To show stop notification, we have para & button ---------------
const p = document.getElementById('p');
const stopButton = document.getElementById('stopButton');
// ----------------------------------------------------------------


// --------------------------------------------------------------------------------
let jokeBody; //to access actual joke (which is inside a function) everywhere
let notifyInterval; // to stop notification (in clearInterval)
// --------------------------------------------------------------------------------


// --------------- function To get new Joke --------------------------
async function getJoke() {
    const jokeData = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    });
    const joke = await jokeData.json();
    jokeBody = joke.joke;
}
// --------------------------------------------------------------------


// ---- function To create new Notification with Audio -----------
async function showNotification() {
    await getJoke();
    new Notification("Joke :)", {
        body: jokeBody,
        icon: 'https://icanhazdadjoke.com/static/smile.svg'
    });
    new Audio('audio.mp3').play();
}
// ---------------------------------------------------------------


// --------------------- function To display notification -----------------------------------
function notifyMe() {

    // showing paragraph to stop notification
    p.classList.add('d-block');
    stopButton.classList.add('d-block');

    if (Notification.permission === "granted") {
        notifyInterval = setInterval(showNotification, 10000);
        // if permission is already granted, we'll get Notification in every 10 sec

    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                notifyInterval = setInterval(showNotification, 10000);
                // after giving permission, we'll get Notification in every 10 sec
            }
        });
    }
}
// -------------------------------------------------------------------------------------------


// ----- function To stop notification ----
function stopNotify() {
    clearInterval(notifyInterval);
}
// ----------------------------------------


// =======================================
// The audio.mp3 is of 8 sec lengthy, so, when we click stopButton, it'll take 8 seconds to stop the audio
