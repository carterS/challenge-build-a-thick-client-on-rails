
var Quiz = {


  init: function(){
    var self = this;
    $('button#get-quiz').on('click', function() { self.getQuiz() } );
  },

  getQuiz: function () {
    var self = this;
    $.ajax({
      url: '/quizzes.json',
      type: 'GET',
    })
    .done(function(quiz_json) {
      console.log(quiz_json);
      self.displayQuiz(quiz_json);
      
    })
    .fail(function() {
      console.log("error");
    });
  },

  displayQuiz: function(quizInfo){
    $('#display-quiz').append(quizInfo.quizzes[0].name);
    console.log(quizInfo.quizzes[0].name);
  }
};

$(document).ready(function() {
  Quiz.init();
});
