const cache: Record<string, any> = {};
const messagesContainer = document.getElementById("messages") as HTMLDivElement;
const input = document.getElementById("messageInput") as HTMLInputElement;
const button = document.getElementById("sendButton") as HTMLButtonElement; 
let myUsername = "";

window.api.onUsername((username: string) => {
    myUsername = username;
});

if (!messagesContainer) {
    throw new Error("Messages div not found");
}

class RendererState {
    get(key: any) {
        return cache[key];
    }

    async set(key: any, value: any) {
        await window.api.setState(key, value);
    }
}

const renState = new RendererState();


async function copyCache() {
    Object.assign(
        cache,
        await window.api.getAllState()
    );
}

function renderMessages() {

    const messages = cache["messages"];
    messagesContainer.innerHTML = "";

    for (const message of messages) {
        const div = document.createElement("div");
        div.classList.add("message");
        div.textContent = message.text;

        if (message.author === myUsername) {
            div.classList.add("my-message");
        } else {
            div.classList.add("other-message");
        }

    messagesContainer.appendChild(div);

}

}

button.addEventListener("click", async () => {
    const text = input.value.trim();
    if (text === "") {
        return;
    }

    const messages = renState.get("messages") ?? [];

    await renState.set("messages", [
        ...messages,
        {
            author: myUsername,
            text: text
        }
    ]);

    console.log("clicked");
    input.value = "";
});

async function main() {

    await copyCache();
    renderMessages();

    window.api.onStateChanged((key: string, value: any) => {
        cache[key] = value;

        if (key === "messages") {
            renderMessages();
        }

    });

}

main();