// Icons
let removeSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <path class="fill" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z" /></svg>';
let completeSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"> <path class="fill" d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z" /> </svg>';

// Remove all the stored data
// localStorage.removeItem('todoList');

// Settings
let siteWidth = 400;
let scale = getScale();
let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  todo: [],
  complete: []
};

function getScale() {
  // Checks if the device is in the landscape mode and scales it accordingly
  if (window.innerHeight > window.innerWidth) {
    return screen.width / siteWidth;
  }

  // Checks if the device is in the portrait mode and scales it accordingly
  if (window.innerHeight < window.innerWidth) {
    return screen.height / siteWidth;
  }
}

init();

// Set the scale of the app
document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=' + siteWidth + ', initial-scale=' + scale + '');

// Initialize the todo app with the stored data
function init() {
  if (!data.todo.length && !data.complete.length) {
    console.log("No data saved. Hello! :)");
    return;
  }

  console.log("Found saved data... I'll fetch it right now!");
  sortData(data.todo);
  sortData(data.complete, true);
}

// Sorts the saved data into todo and complete lists
function sortData(array, completed) {
  for (let i = 0; i < array.length; i++) {
    let value = array[i];
    createContainer(value, completed);
  }
}

// Detect click and AddItem when we press the '+' button
document.getElementById('add').addEventListener('click', function() {
  addItem();
});

// Detect enter and press the '+' button
document.body.addEventListener('keyup', function(e) {
  if (e.keyCode == 13) {
    addItem();
  }
});

// Get the value from the input field and add to the list
function addItem() {
  let value = document.getElementById('item').value;

  if (value) {
    value = capitalizeFirst(value);
    createContainer(value);
    document.getElementById('item').value = '';

    // Add the text into todo array
    data.todo.push(value);

    updated();
  }
}

// Remove an item from the list
function removeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let text = item.innerText;

  // Remove the item from either todo or the complete list
  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(text), 1);
  } else {
    data.complete.splice(data.complete.indexOf(text), 1);
  }

  updated();
  parent.removeChild(item);
}

// Move the item to complete list
function completeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let text = item.innerText;

  // If the id is todo add it to the todo array, otherwise add it to the complete data array
  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(text), 1);
    data.complete.push(text);
  } else {
    data.complete.splice(data.complete.indexOf(text), 1);
    data.todo.push(text);
  }

  updated();
  // Check if the item should be added to completed or added to todo
  let target = (id === 'todo') ? document.getElementById('complete') : document.getElementById('todo');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);

}

// Create the container for our item
function createContainer(text, isCompleted) {
  let list = (isCompleted) ? document.getElementById('complete') : document.getElementById('todo');

  let item = document.createElement('li');
  item.innerText = text;

  let buttons = document.createElement('div');
  buttons.classList.add('buttons');

  let remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  remove.addEventListener('click', removeItem);

  let complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;

  complete.addEventListener('click', completeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}

function updated() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

// Capitalizes every first letter of a word in a string
function titleCase(str) {
  let split = str.split(" ");
  let a = [];
  for (let i = 0; i < split.length; i++) {
    let temp = split[i];
    let word = "";
    for (let y = 0; y < temp.length; y++) {
      if (y == 0 && isAlpha(temp[y])) {
        word += temp[y].toUpperCase();
        continue;
      }

      word += temp[y];
    }

    a.push(word);
  }

  return a.join(" ");
}

// Capitalizes first letter of a string
function capitalizeFirst(str) {
  // Split the string into an array of strings
  let splittedArray = str.split(" ");
  let a = [];

  // Loop through all the strings in the array
  for (let i = 0; i < splittedArray.length; i++) {
    let currentString = splittedArray[i];

    // If we are currently at the first string of the array (First word of the sentence)
    if (i == 0) {

      // temporary string
      tempString = "";

      // Get the first letter of the string and capitalize it
      tempString += currentString[i][0].toUpperCase();

      // Loop through the string and
      // add the rest of the letters to tempString
      for (let y = 1; y < currentString.length; y++) {
        tempString += currentString[y];
      }

      // Set our current string with the new (capitalized) string
      currentString = tempString;
    }

    // Add it to the array
    a.push(currentString);
  }

  // Combine the array into one string
  return a.join(" ");
}

// Checks if the character is an alphabetic letter (i.e not a number)
function isAlpha(char) {
  return char.length === 1 && char.match(/[a-z]/i);
}