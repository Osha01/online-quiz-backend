export default function(room, event, message) {
    const Pusher = require("pusher");
    const pusher = new Pusher({
        appId: "1679697",
        key: "cefecd31795a4e419288",
        secret: "69192cf5d43c8f457530",
        cluster: "eu",
        useTLS: true
    });

    pusher.trigger(room, event, message);
}