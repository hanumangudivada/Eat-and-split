const core = require("@actions/core");

const firstGreeting = core.getInput("first-greeting");
const secondGreeting = core.getInput("second-greeting");
const thirdGreeting = core.getInput("third-greeting");

async function run() {
    try {
        console.log(`The first one to be greeted was ${firstGreeting}!`);
        console.log(`The second one to be greeted was ${secondGreeting}!`);
        console.log(`The last one to be greeted was ${thirdGreeting}!`);

        core.setOutput("last-one-greeted", thirdGreeting);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
