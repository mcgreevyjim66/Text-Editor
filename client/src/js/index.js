// Importing required modules and styles.
import { Workbox } from 'workbox-window'; // Importing Workbox for service worker functionality.
import Editor from './editor'; // Importing a custom Editor class.
import './database'; // Importing the database module.
import '../css/style.css'; // Importing CSS styles.

// Selecting the main DOM element where the app will render its content.
const main = document.querySelector('#main');
main.innerHTML = ''; // Clearing any existing content in the main element.

// Defining a function to load a spinner (visual cue for loading state).
const loadSpinner = () => {
  const spinner = document.createElement('div'); // Creating a new div element for the spinner.
  spinner.classList.add('spinner'); // Adding a 'spinner' class for styling.
  // Setting the inner HTML of the spinner, creating a container and a spinner element.
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner); // Appending the spinner to the main element.
};

// Creating an instance of the Editor class.
const editor = new Editor();

// Check if the editor instance is undefined and, if so, load the spinner.
if (typeof editor === 'undefined') {
  loadSpinner();
}

// Checking if the current browser supports service workers.
if ('serviceWorker' in navigator) {
  // Creating an instance of Workbox pointing to the service worker file.
  const workboxSW = new Workbox('/src-sw.js');

  workboxSW.register(); // Registering the service worker using Workbox.
} else {
  // Logging an error message if service workers are not supported.
  console.error('Service workers are not supported in this browser.');
}
