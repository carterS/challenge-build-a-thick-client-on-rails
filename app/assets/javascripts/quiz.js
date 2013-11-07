
var Quiz = {

  currentQuestionId: 0,

  init: function(){
    var self = this;
    $('button#get-quiz').on('click', function() { self.getQuiz(); } );
    $('#start-quiz').on('click', function() { self.getQuestion(); } );
  },

  getQuiz: function () {
    var self = this;
    $.ajax({
      url: '/quizzes.json',
      type: 'GET',
    })
    .done(function(quiz_json) {
      self.displayQuiz(quiz_json);
    })
    .fail(function() {
      console.log("error");
    });
  },

  displayQuiz: function(quizInfo){
    var self = this;
    $('#selected-quiz').removeClass('hidden').prepend(quizInfo.quizzes[0].name);
    this.currentQuestionId = quizInfo.quizzes[0].quiz_id;
    console.log(quizInfo.quizzes[0].name);
  },

  getQuestion: function() {
    var self = this;
    $.ajax({
      url: '/quizzes/'+self.currentQuestionId+'/questions/next.json',
      type: 'GET',
      data: {session_key: '123456789012345'},
    })
    .done(function(quiz_question) {
      self.displayQuestion(quiz_question);
    })
    .fail(function() {
      console.log("error");
    });
  },

  displayQuestion: function(currentQuestion){
    $('#current-question-title').append(currentQuestion.question.question);
    $.each(currentQuestion.question.choices, function( index, value ) {
      $('#template span').html(value.choice);
      var $choices = $('#template').clone();
      $choices.removeAttr('id').removeClass('hidden');
      $('#display-choices').append($choices);
    });
  }
};

$(document).ready(function() {
  Quiz.init();
});
