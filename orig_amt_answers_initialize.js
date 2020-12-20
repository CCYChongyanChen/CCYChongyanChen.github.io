var init_time;
var imgPath;
var imgs = [];
var qIdxs = [];
var responses;
var state = 0;
var i = 1;
var questionsData;
var hitID = '';
var assignmentID = '';
var workerID = '';

var NUM_QS_ZEROPAD = 2;
var MIN_CHARS = 1;
var MAX_CHARS = 100;
var MIN_WORDS = 1;

jsonFile = 'temp.json';

var restrictInput = decode(gup("restrictInput"));

if (restrictInput== "") {
    restrictInput = 1;
} else {
    restrictInput = Number(restrictInput);
}

imgPath = decode(gup("imgPath"));

var imgsSpecified = false
i = 1;

imgs = collect_ordered_QS('img', NUM_QS_ZEROPAD);
var quesIdxListStr = collect_ordered_QS('qIdxs', NUM_QS_ZEROPAD);
var quesIdxList = [];
quesIdxListStr.forEach( function(d) {
    quesIdxList.push(JSON.parse(d));
});

if (imgs.length == 0) {
        imgPath = "https://vision.ece.vt.edu/data/mscoco/images/train2014/";
        imgs = ["COCO_train2014_000000415528.jpg", 
                "COCO_train2014_000000106051.jpg",
                "COCO_train2014_000000045628.jpg",
                "COCO_train2014_000000532310.jpg"
               ];
        qIdxsList = [ [0], [0], [0], [0] ];
}

// ============================================================================
// initialize images
// ============================================================================
responses = [];

for (i=0; i < imgs.length; i++) {
    var response = {};
    response.imgId = imgs[i];
    response.question = [];
    response.answer = [];
    response.ansConf = undefined;
    responses.push(response);
}

// Load questions from JSON
loadJSON(storeQuestionsAndUpdate);

/// ===========================================================
// Functions to help parse the URL query string for AMT data
// ===========================================================
function gup(name) {
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var tmpURL = window.location.href;
    var results = regex.exec(tmpURL);
    if (results == null) {
        return "";
    } else {
        return results[1];
    }
}

function decode(strToDecode) {
    return unescape(strToDecode.replace(/\+/g, " "));
}

function get_random_int(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function zero_pad(num, numZeros) {
    var n = Math.abs(num);
    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
    var zeroString = Math.pow(10,zeros).toString().substr(1);
    if (num < 0) {
        zeroString = '-' + zeroString;
    }

    return zeroString+n;
}

function collect_ordered_QS(param_name, pad) {
    
    var array = []; // Store all the data
    var done = false;
    var i = 1;
    var name = '';
    var val = '';
    
    while (done == false) {
        name = param_name + zero_pad(i, pad);
        val = decode(gup(name));

        if (val == "") {
            done = true;
        } else {
            array.push(val);
        }
        i += 1;
    }
    
    return array;
}

function loadJSON(callback) {
    if (questionsData == undefined) {
        $.getJSON(jsonFile).done( function(data) { callback(data); console.log("Loading JSON succeeded."); } )
                        .fail( function() { console.log("Loading JSON failed."); } );
    } else {
        loadQuestions();
    }
}

function storeQuestionsAndUpdate(result) {
    questionsData = result;
    loadQuestions();
}

function loadQuestions() {
    
    for (var idxImg = 0; idxImg < imgs.length; idxImg++) {
        var curImg = imgs[idxImg];
        var curQuesData = questionsData[imgs[idxImg]];
        
        var curQIdxs = quesIdxList[idxImg];
        var curQs = [];
        for (var idxQ = 0; idxQ < curQIdxs.length; idxQ++) {
            curQs.push(curQuesData[curQIdxs[idxQ]]);
        }
        responses[idxImg].question = curQs;
    }
    render_question();
}

