// 1st level game's logic
$(function() {
    console.log();
    renderMathInElement(document.body);
    var btnStartQuizz = $('#btn-start-quizz-level-1');
    var theory        = $('.theory');
    var containerQuestions = $('#container-questions-level-1');
    var containerActions   = $('#container-actions-questions');
    var btnNextQuestion = $('#btn-next-question');

    // On charge les questions du level -- les questions sont dans le fichier XML
    var level = new Level(loadQuestions($('#xml-content')));
    
    // On démarre 
    btnStartQuizz.on("click", (event) => {
        var newClassTheory = theory.attr('class').replace("bounceInUp", "bounceOutUp");
        theory.attr('class', newClassTheory);
        
        setTimeout(() => {
            // On fait disparaitre le bloc théorique
            theory.addClass('d-none');
            // On fait apparaitre la première question
            containerQuestions.html(level.currentQuestion());
            renderMathInElement(document.body);
            // Ainsi que les actions possibles
            containerActions.removeClass('d-none');
            // On démarre le timer pour les score
            level.startTimer();
        }, 1000);
    });

    btnNextQuestion.on('click', (event) => {
        // On fait apparaitre la question suivante
        containerQuestions.html(level.nextQuestion());
        // On render le latex s'il y en a
        renderMathInElement(document.body);
        // Ainsi que les actions possibles
        containerActions.removeClass('d-none');
    });

    $('#btn-finish-level').on("click", (event) => {
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


var good = function() {
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
