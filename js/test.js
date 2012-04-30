/* Test Suite */

(function () {
  var queue = [], paused = false, results;

  this.assert = function assert(value, desc) {
    var li = document.createElement('li'),
      resDev = document.getElementById('results');
    li.appendChild(document.createTextNode(desc));
    results.appendChild(li);
    if (!value) {
      li.parentNode.className = "fail";
      li.className = "fail";
    } else if (li.parentNode.className !== 'fail') {
      if (li.parentNode !== resDev) {
        li.parentNode.className = "pass";
      }
      li.className = "pass";
    } else { li.className = "pass"; }
    return li;
  };

  this.test = function test(name, fn) {
    queue.push(function () {
      results = document.getElementById("results");
      results = assert(true, name).appendChild(
        document.createElement("ul")
      );
      fn();
    });
    runTest();
  };

  this.pause = function () {
    paused = true;
  };

  this.resume = function () {
    paused = false;
    setTimeout(runTest, 1);
  };

  function runTest() {
    if (!paused && queue.length) {
      queue.shift()();
      if (!paused) {
        resume();
      }
    }
  }

  this.toggleVis = function toggleVis(bool) {
    var vis = bool ? "block" : "none";
    document.getElementById("resultsOfTests").style.display = vis;
  };

  this.togglePassVis = function togglePassVis(bool) {
//    var s = document.styleSheets[0].cssRules[3].style.display;
//    s = bool ? 'block' : 'none';
  };
}());

window.onload = function () {
  toggleVis(true);
  togglePassVis(true);

  test("Custom Functions", function () {
    assert(false, "Fail test");
    assert((function () {
      var testGrade,
        n = random_number(1, 6);
      if (n >= 1 && n <= 6) {
        testGrade = true;
      } else {
        testGrade = false;
      }
      return testGrade;
    }()), "random_number(1,6) returns a number between 1-6");
    assert((function () {
      var testGrade,
        m = median([4, 5, 2, 8, 7]);
      if (m === 5) {
        testGrade = true;
      } else {
        testGrade = false;
      }
      return testGrade;
    }()), "median([4,5,2,8,7]) returns 5");
    assert((function () {
      var testGrade,
        m = median([3, 5, 2, 8, 7, 2, 6, 3]);
      if (m === 4) {
        testGrade = true;
      } else {
        testGrade = false;
      }
      return testGrade;
    }()), "median([3,5,2,8,7,2,6,3]) returns 4");
    assert((function () {
      var testGrade,
        f = fibonacci(0);
      if (f === 0) {
        testGrade = true;
      } else {
        testGrade = false;
      }
      return testGrade;
    }()), "fibonacci(0) returns 0");
    assert((function () {
      var testGrade,
        f = fibonacci(10);
      if (f === 55) {
        testGrade = true;
      } else {
        testGrade = false;
      }
      return testGrade;
    }()), "fibonacci(10) returns 55");
    assert((function () {
      var testGrade,
        n = averageWords("average average average");
      if (n === 7) {
        testGrade = true;
      } else {
        testGrade = false;
      }
      return testGrade;
    }()), "averageWords('average average average') returns 7");
    assert((function () {
      var testGrade,
        s = addCommas(1000);
      if (s === '1,000') {
        testGrade = true;
      } else {
        testGrade = false;
      }
      return testGrade;
    }()), "addCommas(1000) returns 1,000");
    assert((function () {
      var testGrade;
      if (reverse('hello') === "olleh") {
        testGrade = true;
      } else {
        testGrade = false;
      }
      return testGrade;

    }()), "reverse('hello') returns 'olleh'");
    assert((function () {
      var testGrade;
      if (compareReverseStrings("hi", "hi") === 0) {
        testGrade = true;
      } else {
        testGrade = false;
      }
      return testGrade;
    }()), "compareReverseStrings('hi', 'hi') returns 0");
    assert((function () {
      var testGrade;
      if (compareReverseStrings("b", "a") === 1) {
        testGrade = true;
      } else {
        testGrade = false;
      }
      return testGrade;
    }()), "compareReverseStrings('b', 'a') returns 1");
    assert((function () {
      var testGrade;
      if (compareReverseStrings("a", "b") === -1) {
        testGrade = true;
      } else {
        testGrade = false;
      }
      return testGrade;
    }()), "compareReverseStrings('a', 'b') returns -1");
    assert((function () {
      var testGrade,
        strArr = ["z", "t", "d", "q"],
        e = ['d', 'q', 't', 'z'],
        s = reverseStringSort(strArr);
      if (s[0] == e[0] &&
        s[1] === e[1] &&
        s[2] === e[2] &&
        s[3] === e[3]) {
        testGrade = true;
      } else {
        testGrade = false;
      }
      return testGrade;
    }()), "reverseStringSort(['z', 't', 'd', 'q']) returns ['d', 'q', 't', 'z']");
    assert((function () {
      var testGrade,
        strArr = ["az", "za"],
        e = ['za', 'az'],
        s = reverseStringSort(strArr);
      if (s[0] == e[0] &&
        s[1] === e[1]) {
        testGrade = true;
      } else {
        testGrade = false;
      }
      console.log(s);
      return testGrade;
    }()), "reverseStringSort(['za', 'az']) returns ['za', 'az']");
  });

  test("HTML Page Structure", function () {
    assert((function () {
      if (document.getElementsByTagName('head')[0]) {
        return true;
      }
    }()), "Page Has Head");

    assert((function () {
      if (document.getElementsByTagName('body')[0]) {
        return true;
      }
    }()), "Page Has Body");

    assert((function () {
      if (document.getElementById('resultsOfTests')) {
        return true;
      }
    }()), "Page Has Test Div");
  });

  test("Test Visibility & Hide", function () {
    assert((function () {
      var testGrade;
      if (document.getElementById("results").style.display === "block") {
        testGrade = true;
      } else {
        testGrade = false;
      }
      return testGrade;
    }()), "Test list is visible");
  });

  test("Input elements", function () {
    assert((function () {
      var testGrade,
        select = document.getElementById("testSelect");
      if (select.options.length === 3) {
        testGrade = true;
      } else {
        testGrade = false;
      }
      return testGrade;
    }()), "Select has 3 options.");

    assert((function () {
      var testGrade,
        textBox = document.getElementById("testTextBox");
      if (textBox.defaultValue === "Default text") {
        testGrade = true;
      } else {
        testGrade = false;
      }
      return testGrade;
    }()), "Text box has default value");
  });

  test("Async Tests", function () {
    pause();
    setTimeout(function () {
      assert(true, "Timeout 100ms");
      resume();
    }, 100);
  });

  test("Async / Input Tests", function () {
    pause();
    document.getElementById("testbutton").onclick = function () {
      assert(true, "Button was clicked");
      resume();
    };
  });
};

function log() {
  try {
    console.log.apply(console, arguments);
  } catch (e) {
    try {
      opera.postError.apply(opera, arguments);
    } catch (er) {
      alert(Array.prototype.join.call(arguments, "  "));
    }
  }
}
