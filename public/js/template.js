function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function JsTemplate(objects, caption) {
  this.objects = objects;
  this.head    = tmplHead;
  this.body    = tmplBody;
  this.row     = tmplRow;
  this.table   = tmplTable;
  this.caption = caption;
}

// Template head
function tmplHead() {
  var keys = Object.keys(this.objects[0]),
    thead  = document.createElement("thead"),
    tr     = document.createElement("tr"),
    td,
    text,
    i;
  for (i in keys) {
    if (keys.hasOwnProperty(i)) {
      td   = document.createElement("td");
      text = document.createTextNode(capitalize(keys[i]));
      td.appendChild(text);
      tr.appendChild(td);
    }
  }
  thead.appendChild(tr);
  return thead;
}

// Template body
function tmplBody() {
  var tbody = document.createElement("tbody"),
    row,
    i;
  for (i in this.objects) {
    if (this.objects.hasOwnProperty(i)) {
      row = this.row(this.objects[i]);
      tbody.appendChild(row);
    }
  }

  return tbody;
}

// Template row
function tmplRow(row) {
  var tr = document.createElement("tr"),
    td,
    i;
  for (i in row) {
    if (row.hasOwnProperty(i)) {
      td   = document.createElement("td");
      text = document.createTextNode(row[i]);
      td.appendChild(text);
      tr.appendChild(td);
    }
  }
  return tr;
}

function tmplTable() {
  var table     = document.createElement("table"),
    caption     = document.createElement("caption"),
    captionText = document.createTextNode(this.caption);
  caption.appendChild(captionText);
  table.appendChild(caption);
  table.appendChild(this.head());
  table.appendChild(this.body());
  return table;
}

function PlanetJS(args) {
  this.name       = args.name;
  this.radius     = args.radius;
  this.diameter   = args.radius * 2;
  this.aphelion   = args.aphelion;
  this.perihelion = args.perihelion;
}

var mercury  = new PlanetJS({
    'name'      : 'Mercury',
    'radius'    : 2439.7,
    'aphelion'  : 69817445,
    'perihelion': 46001009,
  }),
  venus  = new PlanetJS({
    'name'      : 'Venus',
    'radius'    : 6051.8,
    'aphelion'  : 108942780,
    'perihelion': 107476170,
  }),
  earth    = new PlanetJS({
    'name'      : 'Earth',
    'radius'    : 6371,
    'aphelion'  : 152098233,
    'perihelion': 147098291,
  }),
  mars  = new PlanetJS({
    'name'      : 'Mars',
    'radius'    : 3389.5,
    'aphelion'  : 249232432,
    'perihelion': 206655215,
  }),
  jupiter  = new PlanetJS({
    'name'      : 'Jupiter',
    'radius'    : 69911,
    'aphelion'  : 816001807,
    'perihelion': 740679835,
  }),
  saturn  = new PlanetJS({
    'name'      : 'Saturn',
    'radius'    : 58232,
    'aphelion'  : 1503509229,
    'perihelion': 1349823615,
  }),
  uranus  = new PlanetJS({
    'name'      : 'Uranus',
    'radius'    : 25362,
    'aphelion'  : 3006318143,
    'perihelion': 2734998229,
  }),
  neptune  = new PlanetJS({
    'name'      : 'Neptune',
    'radius'    : 24622,
    'aphelion'  : 4537039826,
    'perihelion': 4459753056,
  }),
  planets  = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune],
  template = new JsTemplate(planets, "Planets");
$('#planet-table').html(template.table());
