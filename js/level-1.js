// 1st level game's logic
$(function() {
    var btnStartQuizz = $('#btn-start-quizz-level-1');
    var actions = $('#actions-level-1');
    var containerQuestions = $('#container-questions-level-1');
    var explanations = $('.explanations');

    btnStartQuizz.on("click", (event) => {
        $('.explanations').addClass("animated bounceOutUp");
        actions.addClass("animated bounceOutUp");
        
        setTimeout(() => {
            explanations.addClass("d-none");
            actions.addClass("d-none");

            var question = new Question(
                "Let \\(E = \\{ 0, 2, 1, 5, (2, 1) \\} \\). Has this set a relation of order ?",
                ["Totally", "Absolutely not", "Well, there is an order but only for some elements."], 1
            );
            containerQuestions.html(question.toHTML());
            renderMathInElement(document.body);
        }, 1500);

    });
});
