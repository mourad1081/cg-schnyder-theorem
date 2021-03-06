var currentLevel = 2;

$(function() {
	renderMathInElement(document.body);
	var btnStartQuizz = $('#btn-start-quizz-level-' + currentLevel);
	var theory        = $('.theory');
	var containerQuestions = $('#container-questions-level-' + currentLevel);
	var containerActions   = $('#container-actions-questions');
	var btnNextQuestion = $('#btn-next-question');

    // On charge les questions du level -- les questions sont dans le fichier XML
    var level = new Level(loadQuestions($('#xml-content'), currentLevel - 1));
    
    // On démarre 
    $(document).on("click", '#btn-start-quizz-level-' + currentLevel, (event) => {
    	var newClassTheory = theory.attr('class').replace("bounceInUp", "bounceOutUp");
    	theory.attr('class', newClassTheory);

    	setTimeout(() => {
            // On fait disparaitre le bloc théorique
            theory.addClass('d-none');
            // On fait apparaitre la première question
            containerQuestions.html(level.currentQuestion(currentLevel));
            renderMathInElement(document.body);
            // Ainsi que les actions possibles
            containerActions.removeClass('d-none');
            // On démarre le timer pour les scores
            level.startTimer();
        }, 1000);
    });

    $(document).on('click', '.answer-level-' + currentLevel, (event) => {
    	var isGoodAnswer = event.target.getAttribute('good-answer');

    	var nbQuestionsLeft = isGoodAnswer === 'true' ? level.goodAnswer() : level.badAnswer();

    	if (nbQuestionsLeft > 0) {
            // On fait apparaitre la question suivante
            containerQuestions.html(level.nextQuestion(currentLevel));
            // On render le latex s'il y en a
            renderMathInElement(document.body);
            // Ainsi que les actions possibles
            containerActions.removeClass('d-none');
            level.startTimer();
        } else {
            // On passe au level suivant.
            game.nextLevel();
        }
    });

    $(document).on('click', '#check-answer-2-level-' + currentLevel, (event) => {
    	var answer = $('#text-answer-2-level-' + currentLevel).val();
    	var numbers = answer.replace(",", " ");
    	
        if(numbers.indexOf("1") !== -1 &&
           numbers.indexOf("2") !== -1 && 
           numbers.indexOf("5") !== -1 && 
           numbers.indexOf("4") !== -1)
        {
    		var nbQuestionsLeft = level.goodAnswer();

    		if (nbQuestionsLeft > 0) {
	            // On fait apparaitre la question suivante
	            containerQuestions.html(level.nextQuestion(currentLevel));
	            // On render le latex s'il y en a
	            renderMathInElement(document.body);
	            // Ainsi que les actions possibles
	            containerActions.removeClass('d-none');
	            level.startTimer();
	        } else {
	            // On passe au level suivant.
	            swal('Félicitation ! Vous avez terminé le niveau ' + currentLevel + ' !');
	            game.nextLevel();
	        }
	    } else {
	    	swal('Ce n\'est malheureusement pas la bonne réponse, la bonne réponse est 1, 2, 5, 4.');
	    }
});

    $(document).on('click', '#btn-next-question', (event) => {
        // On fait apparaitre la question suivante
        containerQuestions.html(level.nextQuestion(currentLevel));
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
		$('.theory-explanations').html($(".theory .explanations"));
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