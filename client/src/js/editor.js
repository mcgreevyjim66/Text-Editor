// Importing methods to interact with the IndexedDB database from 'database.js'.
import { getDb, putDb } from './database';
import { header } from './header';

// Exporting a default class.
export default class {
  constructor() {
    // Retrieving any saved content from localStorage.
    const localData = localStorage.getItem('content');

    // Checking if CodeMirror, the code editor library, is loaded in the environment.
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    // Initializing CodeMirror editor with specified options.
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '', // Initial content of the editor.
      mode: 'javascript', // Language mode (JavaScript in this case).
      theme: 'monokai', // Editor theme.
      lineNumbers: true, // Display line numbers.
      lineWrapping: true, // Enable line wrapping.
      autofocus: true, // Autofocus on the editor when the page loads.
      indentUnit: 2, // Number of spaces per indentation level.
      tabSize: 2, // Width of a tab character.
    });

    // Retrieving data from IndexedDB and setting it as the editor's content.
    // Falls back to localStorage data or a predefined header if IndexedDB is empty.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

    // Saving current content to localStorage whenever there's a change in the editor.
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // When the editor loses focus, the current content is saved to IndexedDB.
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      let data =localStorage.getItem('content');
      let id = 1;
      putDb(id, data);
    });
  }
}
