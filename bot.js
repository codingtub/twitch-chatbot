const tmi = require("tmi.js");
const WebSocket = require("ws");

let wsClient, wsReq;

const server = new WebSocket.Server({ port: 3000 });

async function waitForConnection() {
  await server.on("connection", (client, req) => {
    wsClient = client;
    wsReq = req;

    console.log("CONNECTED to client");
  });
}

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [process.env.CHANNEL_NAME]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === "!up") {
    wsClient.send("up");

    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "!down") {
    wsClient.send("down");

    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "!forward") {
    wsClient.send("forward");

    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "!backward") {
    wsClient.send("backward");

    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "!left") {
    wsClient.send("left");

    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "!right") {
    wsClient.send("right");

    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "!d20") {
    const num = rollDice(commandName);
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
async function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  await waitForConnection();
}
