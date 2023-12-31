const scriptTag = document.currentScript;
const projectId = scriptTag.getAttribute('data-project-id');
let apiUrl = scriptTag.getAttribute('data-api-url');
const divId = scriptTag.getAttribute('data-div-id');
const userToken = scriptTag.getAttribute('data-user-token');

console.log("integratly.ai: initializing project ", projectId);

// CSS styles for the button and icon
const styles = `
.aibot {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    background-color: transparent !important;
    z-index: 99999 !important;
    @media (min-width: 991px) {
        width: 70% !important;
        height: calc(100% - 128px) !important;
        max-width: 600px !important;
        max-height: 800px !important;
        top: auto !important;
        bottom: 5% !important;
        left: auto !important;
        right: 5% !important;
        box-shadow: 0px 0px 20px rgba(0,0,0,0.2) !important;
        border-radius: 10px !important;
    }
}

.integratly-launcher {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: integratly-slide-in 0.5s;
    align-self: flex-end;
    background-color: rgb(76, 139, 247);
    border: 0;
    border-radius: 50%;
    box-shadow: 0px 2px 10px 1px #ccc;
    height: 60px;
    margin: 20px;
    cursor: pointer;
    width: 60px;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 1000;
    transition: transform 0.3s;
}

.integratly-launcher img {
    width: 40px;
    height: 40px;
}

@keyframes integratly-slide-in {
    from {
        transform: translateY(100px);
    }
    to {
        transform: translateY(0);
    }
}

@keyframes integratly-rotation-lr {
    from {
        transform: rotate(-90deg);
    }
    to {
        transform: rotate(0);
    }
}

@keyframes integratly-rotation-rl {
    from {
        transform: rotate(90deg);
    }
    to {
        transform: rotate(0);
    }
}
`;

// Function to create a button on the page
function createChatLauncher() {
    console.log("integratly.ai: Creating chat launcher...");

    // Add styles to the page
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Create the button
    const launcher = document.createElement('button');
    launcher.id = 'integratly-launcher';
    launcher.className = 'integratly-launcher';
    launcher.innerHTML = `<img src="https://raw.githubusercontent.com/vsmelov/chatwidget-assets/main/static/launcher_button.svg" alt="Open Chat" />`;

    launcher.onclick = handleLauncherClick;

    document.body.appendChild(launcher);

    console.log("integratly.ai: Chat launcher created!");
}

function appendIframe(iframe) {
    if (divId) {
        let divContainer;
        if (document.getElementById(divId)) {
            console.log("integratly.ai: divId found. Creating a new div... divId =", divId);
            divContainer = document.getElementById(divId);
        } else {
            console.log("integratly.ai: divId not found. Creating a new div... divId =", divId);
            divContainer = document.createElement('div');
            divContainer.id = divId;
            divContainer.className = 'aibot';
            document.body.appendChild(divContainer);
        }
        divContainer.style.position = 'relative';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        divContainer.appendChild(iframe);
        console.log(`integratly.ai: included webchat in ${divId}`);
    } else {
        document.body.appendChild(iframe);
        console.log("integratly.ai: added webchat as a new iframe");
    }
}


function createHiddenChatWidget() {
    if (!divId) {
        return null;
    }
    const existingDiv = document.getElementById(divId);
    if (existingDiv) {
        return existingDiv;
    }
    const divContainer = document.createElement('div');
    divContainer.id = divId;
    divContainer.className = 'aibot';
    const iframe = document.createElement('iframe');
    iframe.id = 'integratly-iframe';
    iframe.style.width = '600px';
    iframe.style.height = '600px';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '20px';
    iframe.style.right = '20px';
    iframe.style.borderRadius = '10px';
    iframe.style.boxShadow = '0px 2px 10px 1px #ccc';
    iframe.style.zIndex = '99999';
    iframe.src = 'https://polished-hill-7509.on.fleek.co/?projectId=' + encodeURIComponent(projectId) + '&apiUrl=' + encodeURIComponent(apiUrl) + '&userToken=' + encodeURIComponent(userToken);

    iframe.style.display = 'none';
    divContainer.style.display = 'none';

    divContainer.appendChild(iframe);
    divContainer.style.position = 'fixed';
    divContainer.style.top = '0';
    divContainer.style.left = '0';
    divContainer.style.width = '100%';
    divContainer.style.height = '100%';
    divContainer.style.backgroundColor = 'transparent';
    divContainer.style.zIndex = '99999';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    document.body.appendChild(divContainer);
    return divContainer;
}


function handleLauncherClick() {
    console.log("integratly.ai: Launcher clicked...");
    const launcher = document.querySelector('#integratly-launcher');

    let iframe = document.querySelector('#integratly-iframe');
    let iframeCreated = false;

    let divContainer;
    if (divId) {
        divContainer = document.getElementById(divId);
    }

    if (!iframe) {
        console.log("integratly.ai: No iframe found. Creating a new one...");
        iframeCreated = true;
        iframe = document.createElement('iframe');
        iframe.id = 'integratly-iframe';
        iframe.style.width = '600px';
        iframe.style.height = '600px';
        iframe.style.position = 'fixed';
        iframe.style.bottom = '20px';
        iframe.style.right = '20px';
        iframe.style.borderRadius = '10px';
        iframe.style.boxShadow = '0px 2px 10px 1px #ccc';
        iframe.style.zIndex = '99999';
        iframe.src = 'https://polished-hill-7509.on.fleek.co/?projectId=' + encodeURIComponent(projectId) + '&apiUrl=' + encodeURIComponent(apiUrl) + '&userToken=' + encodeURIComponent(userToken);

        iframe.onload = function() {
            if (iframeCreated) {
                console.log("integratly.ai: Iframe loaded for the first time. Hiding the launcher...");
                launcher.style.display = 'none'; // Hide the button after iframe loads
            }
        };

        appendIframe(iframe);
    } else if (iframe.style.display === 'none' || iframe.style.display === '') {
        console.log("integratly.ai: Iframe was hidden. Showing it now...");
        iframe.style.display = 'block';
        divContainer.style.display = 'block';

        if (!iframeCreated) {
            console.log("integratly.ai: send toggle to child");
            iframe.contentWindow.postMessage({
                type: "TOGGLE_AI_CHAT"
            }, "*");
            launcher.style.display = 'none'; // If iframe already exists, hide the button
        } else {
            console.log("integratly.ai: (iframe created) Don't send toggle to child...");
        }

    } else {
        console.log("integratly.ai: Iframe was visible. Hiding it now...");
        divContainer.style.display = 'none';
        iframe.style.display = 'none';
        launcher.style.display = 'block'; // Show the button
        launcher.style.animation = 'integratly-rotation-rl 0.5s';
        launcher.innerHTML = `<img src="https://raw.githubusercontent.com/vsmelov/chatwidget-assets/main/static/launcher_button.svg" alt="Open Chat" />`;
        console.log("close");
    }

    if (iframe.chatActiveInterval === undefined){
        iframe.chatActiveInterval = setInterval(() => {
            iframe.contentWindow.postMessage({
                type: "chatActive"
            }, "*");
        }, 100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("integratly.ai: All scripts executed. Waiting for 100ms...");

    setTimeout(function() {
        console.log("integratly.ai: 100ms passed. Initializing chat launcher...");
        createHiddenChatWidget();
        createChatLauncher();
    }, 100);
});

function closeIframeAndResetLauncher() {
    console.log("integratly.ai: Closing iframe and resetting launcher...");
    const iframe = document.querySelector('#integratly-iframe');
    if (iframe) {
        iframe.style.display = 'none';
    }

    if (divId) {
        const divContainer = document.getElementById(divId);
        if (divContainer) {
            divContainer.style.display = 'none';
        }
    }

    const launcher = document.querySelector('#integratly-launcher');
    launcher.style.display = 'block'; // Show the button
    launcher.style.animation = 'integratly-rotation-rl 0.5s';
    launcher.innerHTML = `<img src="https://raw.githubusercontent.com/vsmelov/chatwidget-assets/main/static/launcher_button.svg" alt="Open Chat" />`;
}

window.addEventListener("message", function(event) {
    if (event.data.type === "AI_CHAT_CLOSED") {
        console.log("integratly.ai: AI chat closed. Handling event...");
        closeIframeAndResetLauncher();
    } else if (event.data.type === "AI_CHAT_OPENED") {
        console.log("integratly.ai: AI chat opened. No additional actions for now.");
    }
});