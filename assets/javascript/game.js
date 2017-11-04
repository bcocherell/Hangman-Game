var hangman = {
  bands: [
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
  ],
  wiki: [
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
  ],
  youtube: [
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
  ],
  band: [],
  maskedBand: [],
  guesses: [],
  numberGuesses: 15,
  wins: 0,
  selection: 0,

  
  // Set value of maskedBand and display on screen
  renderBand: function() {
  
    for (var i = 0; i < this.band.length; i++){
      if (this.guesses.indexOf(this.band[i]) >= 0 || this.band[i] === ' '){
        this.maskedBand[i] = this.band[i];
      }
      else {
        this.maskedBand[i] = '_';
      }
    }
    document.querySelector('#game').innerHTML = this.maskedBand.toString().replace(/,/g,'&nbsp;');
  },

  // Display this round's guesses
  renderGuesses: function() {
    document.querySelector('#guesses').innerHTML = this.guesses.toString().replace(/,/g,',&nbsp;');
  },

  // Display current number of wins
  renderScore: function() {
    document.querySelector('#wins').innerHTML = this.wins;
  },

  // Display current number of guesses left
  renderNumberOfGuesses: function() {
    document.querySelector('#guesses-remaining').innerHTML = this.numberGuesses;
  },

  // Display wiki section
  renderWiki: function() {
    document.querySelector('#wiki').innerHTML = '<a class="embedly-card" data-card-controls="0" href="' + this.wiki[this.selection] + '"></a>';
  },

  // Display youtube section
  renderYoutube: function() {
    document.querySelector('#youtube').innerHTML = '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="' + this.youtube[this.selection] + '"></iframe></div>';
  },

  // Setup and reset game
  resetGame: function() {
    this.selection = Math.floor(Math.random() * this.bands.length);
    this.band = this.bands[this.selection].split('');

    this.maskedBand = [];
    this.guesses = [];
    this.numberGuesses = 15;

    this.renderBand();
    this.renderGuesses();
    this.renderScore();
    this.renderNumberOfGuesses();
  }
};

// Main process
// ==============================================================================
// Initial reset then captures keyboard input
hangman.resetGame();

document.onkeyup = function(event) {

  // Captures the key press, converts it to lowercase, and saves it to a variable.
  var letter = String.fromCharCode(event.keyCode).toLowerCase();

  // Check if letter already seleted
  if (hangman.guesses.indexOf(letter) === -1 && letter.match(/[a-z]/i)){
    hangman.guesses.push(letter);
    hangman.numberGuesses--;
    hangman.renderBand();
    hangman.renderGuesses();
    hangman.renderNumberOfGuesses();
  }

  if (hangman.maskedBand.indexOf('\_') === -1){
    hangman.wins++;
    hangman.renderWiki();
    hangman.renderYoutube();
    hangman.resetGame();
  }

  if (hangman.numberGuesses === 0) {
    hangman.resetGame();
  }
  
};