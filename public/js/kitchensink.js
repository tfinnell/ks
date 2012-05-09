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

// reverses a string
function reverse(str) {
  if (str === undefined) { return "str is undefined"; }
  var reversedString = '',
    i;
  for (i = (str.length - 1); i >= 0; i -= 1) {
    reversedString += str[i];
  }
  return reversedString;
}

// compares two strings and returns a value that can be used by sort()
function compareReverseStrings(s1, s2) {
  var revS1 = reverse(s1),
    revS2 = reverse(s2),
    returnValue;

  if (revS1 > revS2) {
    returnValue = 1;
  } else if (revS1 < revS2) {
    returnValue = -1;
  } else {
    returnValue = 0;
  }
  return returnValue;
}

// feed it an array, it uses compareReverseStrings() as a callback for sort.
// reverses the strings in an array and sorts them by their reverse
function reverseStringSort(sA) {
  return sA.sort(compareReverseStrings);
}

// returns a string list of an objects innards
function viewer(obj) {
  var names = "",
    name;
  for (name in obj) {
    if (obj.hasOwnProperty(name)) {
      if (typeof obj[name] === 'object') {
        names += viewer(obj[name]);
      } else {
        names += name + " : " + obj[name] + "\n";
      }
    }
  }
  return names;
}

var demoObj = {
  sup: "hi",
  blah: "whats this",
  hihi: 2,
  dfsdf: {
    ssdfub: "sub object is this string"
  },
  asdfa: "after the subobject"
};

console.log(viewer(demoObj));

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

function sortPractice() {
  var members = [];

  members.general = ["tableName",
    "foreignKey",
    "foreignValue",
    "security"];
  members.url = members.general;
  members.newnotes = members.general;
  members.factoids = members.general;

  members.general.sort(compareReverseStrings);
  return members;
}

sortPractice();

function hypoSort(a, b) {
  return b.hypotenuse - a.hypotenuse;
}

// Triangles!
function RightTriangle(b, h) {
  this.base = b;
  this.height = h;
  this.hypo();
  this.angles();
}

RightTriangle.prototype.hypo = function () {
  this.hypotenuse = Math.sqrt(
    Math.pow(this.base, 2) + Math.pow(this.height, 2)
  ).toFixed(2);
};

RightTriangle.prototype.angles = function () {
  var adjustment = Math.PI / 180;
  this.alpha = (Math.atan(this.height / this.base) / adjustment).toFixed(2);
  this.beta = (90 - this.alpha).toFixed(2);
};

// using the triangles stuff!
(function () {
  var res = $.ajax('/triangles'),
    triangles = [];
  $('#redis-triangles').ajaxComplete(function (e) {
    var response = JSON.parse(res.responseText),
      i,
      b,
      h;
    for (i = 0; i < response.length; i += 1) {
      b = response[i].base;
      h = response[i].height;
      triangles.push(new RightTriangle(b, h));
    }
    triangles.sort(hypoSort);
    $(this).children('tbody').append(trianglesTable(triangles));
  });

  function trianglesTable(triangles) {
    var i,
      html = "<tr>";
    for (i = 0; i < triangles.length; i += 1) {
      html += "<td>" + (i + 1)                 + "</td>";
      html += "<td>" + triangles[i].base       + "</td>";
      html += "<td>" + triangles[i].height     + "</td>";
      html += "<td>" + triangles[i].hypotenuse + "</td>";
      html += "<td>" + triangles[i].alpha      + "</td>";
      html += "<td>" + triangles[i].beta       + "</td>";
      html += "</tr>";
    }
    return html;
  }
}());

// in class table template
function triangleTable(triangles) {
  var tableHeader = [],
    tableHtml = "";
  tableHeader[0] = '<table>';
  tableHeader[1] = '<tbody>';
  tableHeader[2] = '<tr><th class="header">Base</th>';
  tableHeader[3] = '<th class="header">Height</th>';
  tableHeader[4] = '<th class="header">Hypotenuse</th>';
  tableHeader[5] = '<th class="header">Alpha</th>';
  tableHeader[6] = '<th class="header">Beta</th></tr>';

  tableHtml = tableHeader.join("");
  tableHtml += tableWrapper(tableRowTemplate, triangles);
  return tableHtml;
}

function tableRowTemplate(tableObject) {
  var html = "",
    property = "";
  html = "<tr>";
  for (property in tableObject) {
    if (tableObject.hasOwnProperty(property)) {
      html += '<td class="' + property + '">~' + property + '~</td>';
    }
  }
  html += "</tr>";
  return html;
}

function rowWrapper(template, objToWrap) {
  var template = template.toString(),
    pieces = template.split('~'),
    i,
    len = pieces.length;

  for (i = 1; i < len; i += 2) {
    pieces[i] = objToWrap[pieces[i]];
  }
  return pieces.join("");
}

function tableWrapper(rowTemplate, arrayOfObjs) {
  var len = arrayOfObjs.length,
    html = "",
    i;
  for (i = 0; i < len; i += 1) {
    html += rowWrapper(rowTemplate, arrayOfObjs[i]);
  }
  return html;
}

var inClassTriangles = [];
inClassTriangles[0] = new RightTriangle(2,7);
inClassTriangles[1] = new RightTriangle(9,5);
inClassTriangles[2] = new RightTriangle(4,3);
inClassTriangles[3] = new RightTriangle(6,7);
inClassTriangles[4] = new RightTriangle(1,5);
inClassTriangles[5] = new RightTriangle(8,3);

$('#statbutton').click(function () {
  console.log('first click');
  $('#statistics').hide();
  $('#statistics').children().remove();
  $('#statbutton').html('Show Triangle Table')
    .unbind("click")
    .click(function () {
      console.log('second click');
      $('#statistics')
        .html(triangleTable(inClassTriangles))
        .show();
    });
});

// planetary system model
// measurements in KM
// (function () {
//   function Orbit(orbit) {
//     this.aphelion   = orbit.aphelion;
//     this.perihelion = orbit.perihelion;
//   }
// 
//   function Planet(radius, orbit) {
//     this.radius = radius;
//     if (orbit) { this.orbit = new Orbit(orbit); }
//   }
// 
//   function Star(radius) {
//     this.radius = radius;
//   }
// 
//   function Belt() {}
// 
//   var sun   = new Star(695508),
//     mercury = new Planet(2439.7,
//       {'aphelion': 69817445, 'perihelion': 46001009}),
//     venus   = new Planet(6051.8,
//       {'aphelion': 108942780, 'perihelion': 107476170}),
//     earth   = new Planet(6371,
//       {'aphelion': 152098233, 'perihelion': 147098291}),
//     mars    = new Planet(3389.5,
//       {'aphelion': 249232432, 'perihelion': 206655215}),
//     astroid = new Belt(),
//     jupiter = new Planet(69911,
//       {'aphelion': 816001807, 'perihelion': 740679835}),
//     saturn  = new Planet(58232,
//       {'aphelion': 1503509229, 'perihelion': 1349823615}),
//     uranus  = new Planet(25362,
//       {'aphelion': 3006318143, 'perihelion': 2734998229}),
//     neptune = new Planet(24622,
//       {'aphelion': 4537039826, 'perihelion': 4459753056}),
//     kuiper  = new Belt(),
//     planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune],
// }());

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
