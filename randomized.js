
var Randomized = function() {

  // table of randomized numbers and tries
  this.randomTable = [];

  /**
  * Fill random table with random numbers
  * @param int maxNum - maximum random number
  * @param int rows - amount of tries
  * @param int coef - how many times would random be clled on each column in one row
  * @return void
  */
  this.fillRandomTable = function(maxNum, rows, coef) {
    maxNum = maxNum || 100;
    rows = rows || 100;
    coef = maxNum * (coef || 1);

    for(var i = 0; i < rows; i++) {
      // prefill table with zeros
      this.randomTable[i] = new Array(maxNum + 1).join('0').split('').map(parseFloat);

      // fill table with final data
      for(var j = 0; j < coef; j++) {
        // increase counter
        this.randomTable[i][Math.floor((Math.random() * maxNum))]++;
      }
    }
  };

  /**
  * Finds maximum value in array
  * @param array arr - array where max will be searched
  * @return int - maximum value from array
  */
  this.findMaxInArray = function(arr) {
    return Math.max.apply(null, arr);
  };

  /**
  * Calculate accurate color for table cell
  * @param int localMax - maximum of local array values (row)
  * @param int value - current processed value for which we want to find a color
  * @return string - RGB notation of color
  */
  this.getCellColor = function(localMax, value) {
    var ratio = Math.ceil((value / localMax) * 10) / 10;
    return 'rgba(255,0,0,' + ratio + ')';
  };

  /**
  * Print table with results
  * @param string elementId - ID of element in page to append output table
  * @return bool - true if table was printed, else otherwise
  */
  this.printFilledTable = function(elementId) {
    var elem = document.getElementById(elementId);
    if(!elem) {
      // cannot append table to element
      return false;
    }
    var tableRows = this.randomTable.length;
    if(tableRows < 1) {
      // not enough data
      return false;
    }
    // get other dimension of array
    var tableCols = this.randomTable[0].length;

    // table init
    var table = document.createElement('table');

    // table header
    var heading = document.createElement('tr');
    var th = document.createElement('th');
    heading.appendChild(th);

    for(var i = 0; i < tableCols; i++) {
      var th = document.createElement('th');
      var text = document.createTextNode(i);

      th.appendChild(text);
      heading.appendChild(th);
    }

    table.appendChild(heading);

    // fill table with final data
    for(var i = 0; i < tableRows; i++) {
      var row = document.createElement('tr');

      var th = document.createElement('th');
      var text = document.createTextNode(i);

      th.appendChild(text);
      row.appendChild(th);

      var cols = this.randomTable[i].length;
      // local maximum from array
      var localMax = this.findMaxInArray(this.randomTable[i]);
      for(var j = 0; j < cols; j++) {
        var td = document.createElement('td');
        var style = document.createAttribute('style');

        style.value = 'background-color: ' + this.getCellColor(localMax, this.randomTable[i][j])

        td.setAttributeNode(style);

        // write final sum of randomized data
        var text = document.createTextNode(this.randomTable[i][j]);

        td.appendChild(text);
        row.appendChild(td);
      }
      table.appendChild(row);
    }

    elem.appendChild(table);
  };
};
