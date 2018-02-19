// 1st level game's logic
$(function() {
    renderMathInElement(document.body);
    var btnStartQuizz = $('#btn-start-quizz-level-1');
    var theory = $('.theory');
    var containerQuestions = $('#container-questions-level-1');

    btnStartQuizz.on("click", (event) => {
        var newClassTheory = theory.attr('class').replace("bounceInUp", "bounceOutUp");
        theory.attr('class', newClassTheory);
        
        setTimeout(() => {
            theory.addClass('d-none');

            var question = new Question(
                "Let \\(E = \\{ 0, 2, 1, 5, (2, 1) \\} \\). Has this set a relation of order ?",
                ["Totally", "Absolutely not", "Well, there is an order but only for some elements."], 1
                );
            containerQuestions.html(question.toHTML());
            containerQuestions.append('<div class="theory-explanations"> </div>');
            renderMathInElement(document.body);
        }, 1000);

    });


    $('#btn-next-level-1').on("click", (event) => {
        //game = new Game();
        game.nextLevel();
    });
});

// Une variable pour afficher ou des-afficher la theorie dans le quizz
var toggle = false;

// Fonction pour bounceIn ou bounceOut l'aide dans le quizz 
var displayTheory = function(){
    var explain =  $('.theory-explanations');
    var btn = $('#show-theory');
    if(!toggle){
        $('.theory-explanations').html($(".explanations"));

        // Si c'est la 1er fois, on ajoute l'animation, sinon on change l'animation
        var newClass = (explain.attr('class').indexOf('animated') == -1)? explain.attr('class') + ' animated bounceInUp' : explain.attr('class').replace('bounceOutDown', 'bounceInUp');
        explain.attr('class', newClass);
        toggle = !toggle;
    } else {
        var newClass = explain.attr('class').replace('bounceInUp', 'bounceOutDown');
        explain.attr('class', newClass);
        toggle = !toggle;
    }
};


var good = function(){
    var containerQuestions = $('#container-questions-level-1');
    var containerCongrat = $('#congratulations-level-1');
    var newClass = containerQuestions.attr('class') + ' animated bounceOutUp';
    containerQuestions.attr('class', newClass);

    setTimeout(() => {
        containerQuestions.addClass('d-none');
        var newClass = containerCongrat.attr('class').replace('d-none', '') + " animated bounceInUp";
        containerCongrat.attr('class', newClass);
    }, 1000);
}

var bad = function(){
    swal('Mauvaise réponse');
}
