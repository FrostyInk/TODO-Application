document.getElementById('add').addEventListener('click', function() {
  var value = document.getElementById('item').value;

  if (value) {
    value = titleCase(value);
    console.log(value);
  }
});


function titleCase(str) {
  var split = str.split(" ");
  var a = [];
  for (var i = 0; i < split.length; i++) {
    var temp = split[i];
    var word = "";
    for (var y = 0; y < temp.length; y++) {
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

function isAlpha(char) {
  return char.length === 1 && char.match(/[a-z]/i);
}