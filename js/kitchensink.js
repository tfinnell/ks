document.getElementById('results').style.display = 'block';
button = document.getElementById('resTitle');
button.onclick = function () {
  resList = document.getElementById('results');
  if (resList.style.display === 'block') {
    resList.style.display = 'none';
  } else {
    resList.style.display = 'block';
  }
};

// Calculates median from array
function median(array) {
  var m, a;
  a = array.sort(function (a, b) {
    return a - b;
  });
  if (a.length % 2 === 1) {
    m = a[(a.length - 1) / 2];
  } else {
    m = (a[(a.length / 2) - 1] + a[a.length / 2]) / 2;
  }
  return m;
}

// Returns the number, given as an argument, in the fibonacci sequence
function fibonacci(num) {
  var a = [0, 1],
    i;
  if (num === 0) { return 0; }
  for (i = 2; i <= num; i += 1) {
    a.push(a[a.length - 1] + a[a.length - 2]);
  }
  return a.pop();
}

// Returns a random number
function random_number(min, max, digits) {
  digits = isNaN(digits) ? 0 : parseInt(digits, 10);

  if (digits < 0) {
    digits = 0;
  } else if (digits > 16) {
    digits = 16;
  }

  var ran,
    rand = Math.random() * (max - min) + min;
  if (digits === 0) {
    ran = Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    ran = parseFloat(rand.toFixed(digits));
  }
  return ran;
}

// Text counter, counts up to whatever number given as arg
function rollInt(num) {
  var i;
  for (i = 0; i <= num; i += 1) {
    if (i % 11111 === 0) {
      setTimeout(writeNum, i / 1000, i);
    }
  }
  setTimeout(writeNum, num / 1000, num);
}

// used by the previous function, prints the number to textRoll div
function writeNum(num) {
  div = document.getElementById('textRoll');
  div.innerHTML = addCommas(num);
}

// used by the previous function to add commas to an integer
function addCommas(nstr) {
  nstr = nstr.toString();
  var x = nstr.split('.'),
    x1 = x[0],
    x2 = x.length > 1 ? '.' + x[1] : '',
    reg = /(\d+)(\d{3})/;
  while (reg.test(x1)) {
    x1 = x1.replace(reg, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

// returns the average length of words on the sentence sent to it
function averageWords(sent) {
  var s = sent.split(" "),
    sum = 0,
    i;
  for (i = 0; i < s.length; i += 1) {
    sum += s[i].length;
  }
  return sum / s.length;
}

// some textbox validation
(function () {
  // sets up the text box
  textBox = document.getElementById('testTextBox');
  textBox.onfocus = function () {
    this.value = '';
    this.onkeyup = function () {
      var ch = this.value;
      validateTest(ch);
    };
  };

  // checks the typed string against a regex and sends a boolean to
  // updateNotifier to update the border color
  function validateTest(ch) {
    var regstr = "javascript".substr(0, ch.length),
      reg = new RegExp('^' + regstr + '$');
    updateNotifier(reg.test(ch));
  }

  // updates the border color if the string passes
  function updateNotifier(ch) {
    var tb = document.getElementById('testTextBox');
    tb.style.borderColor = ch ? '#0F0' : '#F00';
    if (tb.value === '') { tb.style.borderColor = '#000'; }
  }
}());

// calls counter
rollInt(4000000);

// statistics stuff
(function () {

  var rolls,
    counter = 1000,
    j,
    maximum = 0,
    total = 0,
    i,
    m,
    p;

  for (j = 0; j < 10; j += 1) {
    p = document.createElement("p");
    maximum = 0;
    total = 0;
    for (i = 0; i < counter; i += 1) {
      rolls = 0;
      do {
        rolls += 1;
      } while (random_number(1, 6) !== 6);
      maximum = Math.max(rolls, maximum);
      total += rolls;
    }
    average = total / counter;

    m = document.createTextNode(
      "The average is " + average + " and the maximum is  " + maximum
    );
    p.appendChild(m);
    document.getElementById("statistics").appendChild(p);
  }
}());
