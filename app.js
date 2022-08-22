// function To create new Notification with Audio
function showNotification() {
    new Notification("Hello!", {
        body: 'Hey there, How u doin?',
        icon: 'https://icanhazdadjoke.com/static/smile.svg'
    });
    new Audio('audio-2.mp3').play();
}

function notifyMe() {
    if (Notification.permission === "granted") {
        setInterval(showNotification, 3000);
        // if permission is already granted, we'll get Notification in every 3 sec

    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                setInterval(showNotification, 5000);
                // after giving permission, we'll get Notification in every 5 sec
            }
        });
    }
}
