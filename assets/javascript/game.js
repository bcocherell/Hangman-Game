// Variables
// ==========================================================================
var bands = [
  'arcade fire',
  'beck',
  'broken social scene',
  'car seat headrest',
  'cloud nothings',
  'deerhunter',
  'grizzly bear',
  'lcd soundsystem',
  'my morning jacket',
  'radiohead',
  'spiritualized',
  'spoon',
  'st vincent',
  'the flaming lips',
  'the killers',
  'the national',
  'the walkmen',
  'war on drugs',
  'wolf parade',
  'yo la tengo'
];
var wiki = [
  'https://en.wikipedia.org/wiki/Arcade_Fire',
  'https://en.wikipedia.org/wiki/Beck',
  'https://en.wikipedia.org/wiki/Broken_Social_Scene',
  'https://en.wikipedia.org/wiki/Car_Seat_Headrest',
  'https://en.wikipedia.org/wiki/Cloud_Nothings',
  'https://en.wikipedia.org/wiki/Deerhunter',
  'https://en.wikipedia.org/wiki/Grizzly_Bear_(band)',
  'https://en.wikipedia.org/wiki/LCD_Soundsystem',
  'https://en.wikipedia.org/wiki/My_Morning_Jacket',
  'https://en.wikipedia.org/wiki/Radiohead',
  'https://en.wikipedia.org/wiki/Spiritualized',
  'https://en.wikipedia.org/wiki/Spoon_(band)',
  'https://en.wikipedia.org/wiki/St._Vincent_(musician)',
  'https://en.wikipedia.org/wiki/The_Flaming_Lips',
  'https://en.wikipedia.org/wiki/The_Killers',
  'https://en.wikipedia.org/wiki/The_National_(band)',
  'https://en.wikipedia.org/wiki/The_Walkmen',
  'https://en.wikipedia.org/wiki/The_War_on_Drugs_(band)',
  'https://en.wikipedia.org/wiki/Wolf_Parade',
  'https://en.wikipedia.org/wiki/Yo_La_Tengo'
];
var youtube = [
  'https://www.youtube.com/embed/NuSbELCNloc?rel=0',
  'https://www.youtube.com/embed/Tj08Ni3tklw?rel=0',
  'https://www.youtube.com/embed/mxfkCDpCInQ?rel=0',
  'https://www.youtube.com/embed/bEsItsZphwQ?rel=0',
  'https://www.youtube.com/embed/rt9N_yHvwyM?rel=0',
  'https://www.youtube.com/embed/CG6jk5Q90DA?rel=0',
  'https://www.youtube.com/embed/BDQ7KgvwfaQ?rel=0',
  'https://www.youtube.com/embed/lqq3BtGrpU8?rel=0',
  'https://www.youtube.com/embed/3LGDI_oz1Dg?rel=0',
  'https://www.youtube.com/embed/yI2oS2hoL0k?rel=0',
  'https://www.youtube.com/embed/mIhdc6Vbm_U?rel=0',
  'https://www.youtube.com/embed/IpT5SBg1Mmk?rel=0',
  'https://www.youtube.com/embed/TAdARF4rGcQ?rel=0',
  'https://www.youtube.com/embed/lPXWt2ESxVY?rel=0',
  'https://www.youtube.com/embed/gGdGFtwCNBE?rel=0',
  'https://www.youtube.com/embed/GwZvip416NU?rel=0',
  'https://www.youtube.com/embed/6QaFK_GvO_s?rel=0',
  'https://www.youtube.com/embed/xWDVFLDnv74?rel=0',
  'https://www.youtube.com/embed/7G1eLTV89dM?rel=0',
  'https://www.youtube.com/embed/KJyjzHIgqr4?rel=0'
];
var guesses = [];
var wins = 0;
var numberGuesses;

var band = [];
var maskedBand = [];
var selection;

var html;

// Functions
// ==============================================================================

// Render current state of band chosen
function renderBand() {
  
  for (i = 0; i < band.length; i++){
    if (guesses.indexOf(band[i]) >= 0 || band[i] === ' '){
      maskedBand[i] = band[i];
    }
    else {
      maskedBand[i] = '_';
    }
  }
  document.querySelector('#game').innerHTML = maskedBand.toString().replace(/,/g,'&nbsp;');
}

function renderGuesses() {
  document.querySelector('#guesses').innerHTML = guesses.toString().replace(/,/g,',&nbsp;');
}

function renderScore() {
  document.querySelector('#wins').innerHTML = wins;
}

function renderNumberOfGuesses() {
  document.querySelector('#guesses-remaining').innerHTML = numberGuesses;
}

function renderWiki() {
  document.querySelector('#wiki').innerHTML = '<a class="embedly-card" data-card-controls="0" href="' + wiki[selection] + '"></a>';
}

function renderYoutube() {
  document.querySelector('#youtube').innerHTML = '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="' + youtube[selection] + '"></iframe></div>';
}

function resetGame() {
  selection = Math.floor(Math.random() * bands.length);
  band = bands[selection].split('');

  console.log(band);


  maskedBand = [];
  guesses = [];
  numberGuesses = 15;

  renderBand();
  renderGuesses();
  renderScore();
  renderNumberOfGuesses();
}

// Main process
// ==============================================================================
// Initial reset then captures keyboard input
resetGame();

document.onkeyup = function(event) {

  // Captures the key press, converts it to lowercase, and saves it to a variable.
  var letter = String.fromCharCode(event.keyCode).toLowerCase();

  // Check if letter already seleted
  if (guesses.indexOf(letter) === -1 && letter.match(/[a-z]/i)){
    guesses.push(letter);
    numberGuesses--;
    renderBand();
    renderGuesses();
    renderNumberOfGuesses();
  }

  if (maskedBand.indexOf('\_') === -1){
    wins++;
    renderWiki();
    renderYoutube();
    resetGame();
  }

  if (numberGuesses === 0) {
    resetGame();
  }
  
};