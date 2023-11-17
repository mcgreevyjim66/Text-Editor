// Retrieving the installation button element from the document.
const butInstall = document.getElementById('buttonInstall');

// Listening for the 'beforeinstallprompt' event on the window object.
window.addEventListener('beforeinstallprompt', (event) => {
    // Storing the event for later use in triggering the install prompt.
    window.deferredPrompt = event;
    // Making the install button visible by toggling the "hidden" class.
    butInstall.classList.toggle("hidden", false);
});

// Adding an event listener to the install button for the click event.
butInstall.addEventListener('click', async () => {
    // Retrieving the deferred install prompt event.
    const promptEvent = window.deferredPrompt;
    // Exiting the function if no prompt event is available.
    if (!promptEvent) {
        return;
    }
    // Showing the install prompt to the user.
    promptEvent.prompt();
    // Resetting the deferred prompt variable to prevent reuse.
    window.deferredPrompt = null;
    // Hiding the install button after the prompt is shown.
    butInstall.classList.toggle("hidden", true);
});

// Listening for the 'appinstalled' event on the window object.
window.addEventListener('appinstalled', (event) => {
    // Resetting the deferred prompt variable when the app is installed.
    window.deferredPrompt = null;
});
