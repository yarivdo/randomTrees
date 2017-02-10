var DS;
var C1;
var C2;
var Rows;
var Columns;
var normalTrees;
var lanes = [];
var myColumn = [];
var thisRow = "";
var counterRow = 0;
var counterColumn = 0;

$(document).ready(startHere);

function startHere() {
    
    $("#btnRandomize").on("click", randomizeMe);
}

function randomizeMe() {
    
    DS = $("#txtDS").val();
    C1 = $("#txtC1").val();
    C2 = $("#txtC2").val();
    Rows = $("#txtRows").val();
    Columns = $("#txtColumns").val();

    /*JUst for testing
    DS = 5;
    C1 = 5;
    C2 = 5;
    Rows = 50;
    Columns = 50;
    */


    normalTrees = (Rows * Columns) - (DS + C1 + C2);

    // STARTS HERE 
    for (i = 0; i < Columns; i++) {
        var thisRow = [];
        thisRow = populateRow();

        var checkedRow = [];
        checkedRow = checkThisRow(thisRow);

        lanes.push(checkedRow);

    }
    
    printOutput();

}

function populateRow() {

    var myRow = [];

    while (myRow.length < Rows) {
        var rnd = Math.floor((Math.random() * 4) + 1);

        if (rnd == 1) {
            if (DS != 0) {
                DS -= 1;
                myRow.push("DS");
            } else {
                rnd = 2;
            }
        }

        if (rnd == 2) {
            if (C1 != 0) {
                C1 -= 1;
                myRow.push("C1");
            } else {
                rnd = 4;
            }
        }

        if (rnd == 4) {
            if (normalTrees != 0) {
                normalTrees -= 1;
                myRow.push("*");

            }
        }

        if (rnd == 3) { // This is the case for C2 positioning, which needs the entire row to be just C@ or *
            if (C2 != 0) {
                C2 -= 1;
                myRow.push("C2");
            }
        }
    }

    return myRow;


}

function checkThisRow(_row) {

    var anotherRow = [];
    var isC2 = false;

    _row.forEach(function (tree) {
        if (tree == "C2") {
            isC2 = true;
        }
    });

    if (isC2) {
        _row.forEach(function (tree) {
                if (tree == "C1") {
                    C1 += 1;
                    normalTrees -= 1;
                    anotherRow.push("*");
                } else if (tree == "DS") {
                    DS += 1;
                    normalTrees -= 1;
                    anotherRow.push("*");
                } else if (tree == "*") {
                    anotherRow.push("*");
                } else {
                    anotherRow.push("C2");
                }

            }


        )
    } else {
        anotherRow = _row;
    }

    return anotherRow;
}

function printOutput() {
    var outputString = "";
    
    for (i=0; i<lanes.length; i++) {
        var thisRow = lanes[i];
        
        thisRow.forEach(function(element){
            outputString = outputString + element + " ";
        });
        outputString = outputString + "\n";
        
    };
    
    $("#result").html(outputString);
}
