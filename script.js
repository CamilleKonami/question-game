(function() {

  function logger() {
    var loggerEl = document.getElementById('logger');
    return function(str) {
      loggerEl.innerHTML += str + '\n';
    }
  }

  var log = logger();


  // Constructor Question
  var Question = function(question, answers, correctAnswerId) {
    this.question = question;
    this.answers = answers;
    this.correctAnswerId = correctAnswerId;
    this.display = function() {
      var text = '';
      text += this.question + '\n';
      for (var i=0; i < this.answers.length; i++) {
        text += i + ': ' + this.answers[i] + '\n';
      }
      return text;
    }
    this.check = function(res) {
      return parseInt(res) === this.correctAnswerId;
    }
  }

  var Game = function(score) {
    this.score = score;
    //Store the questions
    this.questions = [
      new Question(
        'what\'s the color of a banana?',
        ['blue', 'green', 'yellow'],
        2
      ),
      new Question(
        'what\'s the color of a strawberry?',
        ['pink', 'grey', 'blue', 'red'],
        3
      ),
      new Question(
        'what\'s the color of a kiwi?',
        ['green', 'orange', 'yellow'],
        0
      ),
    ];
    this.currentQuestion = null;

    this.nextQuestion = function() {
        this.currentQuestion =
          this.questions[Math.floor(Math.random() * this.questions.length)];
    }
    this.incrScore = function() {
      this.score += 1;
    }
  }

  var validateEl = document.getElementById('validate');
  var answerEl = document.getElementById('answer');
  var scoreEl = document.getElementById('score');

  // Start the game
  var game = new Game(0);
  game.nextQuestion();
  log(game.currentQuestion.display());

  validateEl.addEventListener('click', function() {
    var answer = answerEl.value;
    answerEl.value = '';
    if (game.currentQuestion.check(answer)) {
        log('well done!\n\n');
        game.incrScore();
        scoreEl.innerHTML = game.score;
      } else {
        log('Nope, try again.\n\n');
      }
    game.nextQuestion();
    log(game.currentQuestion.display());
  });

})();
