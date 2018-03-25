var currentLevel = 4;
 
var toggleLineP5 = false;
var previous = null;
var vertices = [];
var edges = [];
var links = [[], [], [], []];
var myp5 = null;
var canvasHeight = 480;
var canvasWidth = 840;
// 1st level game's logic
$(function() {
 
       
    renderMathInElement(document.body);
    var btnStartQuizz      = $('#btn-start-quizz-level-' + currentLevel);
    var theory             = $('.theory');
    var containerQuestions = $('#container-questions-level-' + currentLevel);
    var containerActions   = $('#container-actions-questions');
    var btnNextQuestion    = $('#btn-next-question');
 
    // On charge les questions du level -- les questions sont dans le fichier XML
    var level = new Level(loadQuestions($('#xml-content'), currentLevel - 1));
   
 
    var sketch = function(canvas) {
 
 
        canvas.setup = function() {
            canvas.createCanvas(canvasWidth, canvasHeight);
            canvas.background(0);
            canvas.noLoop();
            canvas.noFill();
        }
 
        canvas.draw = function() {
            var d = 70;
            canvas.stroke(153);
       
            // ligne de délimitation pour savoir ce que l'utilisateur met en sommet ou en arc
            canvas.line(0, canvasHeight/2, canvasWidth, canvasHeight/2);
            // Event de gestion des cliques
            $('canvas').click(function() {
                console.log('draw func');
                canvas.noFill(153);
                var p = {
                    x: canvas.mouseX,
                    y: canvas.mouseY
                }
                if(toggleLineP5) {
                    if (previous == null) {
                        previous = p;
                    } else {
                        // récupère les points correspondant (arc ou sommet) par rapport au position du clic
                        var link = getLink(previous, p);
                        // Push à l'arc, le sommet
                        var idx = links[link.edge].length;
                        links[link.edge][idx] = link.vertice;
                        // Dessine la liaison
                        canvas.line(previous.x, previous.y, p.x, p.y);
                        // reinitialise le point précédent
                        previous = null;
                    }
                } else {
                    // Le point est un arc
                    if(p.y <= canvasHeight/2) {
                        edges.push(p);
                        canvas.fill('red');
                        canvas.text("e" + edges.length, p.x, p.y);
                    } else {
                        canvas.fill('yellow');
                        vertices.push(p);
                        canvas.text("v" + vertices.length, p.x, p.y);
                    }
                    canvas.noFill(153);
                    canvas.ellipse(p.x, p.y, 20, 20);
                }
            });
        }
    }
 
    // On démarre
    $(document).on("click", '#btn-start-quizz-level-' + currentLevel, (event) => {
        var newClassTheory = theory.attr('class').replace("bounceInUp", "bounceOutUp");
        theory.attr('class', newClassTheory);
       
        setTimeout(() => {
            // On fait disparaitre le bloc théorique
            theory.addClass('d-none');
            // On fait apparaitre la première question
            containerQuestions.html(level.currentQuestion(currentLevel));
 
            // Ajout du graphe de la question
            containerQuestions.append('<img src="img/undirect_graph_level_4.png" style="width:20%; height:20%;">');
 
            // Initialise le canvas de réponse
            myp5 = new p5(sketch, 'container-questions-level-4');
           
            // Ajout des actions correspondantes au canvas de réponse
            containerQuestions.append('<button class="btn-swap-form btn big-button" onclick="swapForm()">ellipse</button>');
            containerQuestions.append('<button class="btn-reset btn big-button" onclick="resetAnswer()">reset</button>');
            containerQuestions.append('<button class="answer-level-4 btn big-button">OK</button>');
            renderMathInElement(document.body);
            containerQuestions.removeClass('d-none');
            // Ainsi que les actions possibles
            containerActions.removeClass('d-none');
            // On démarre le timer pour les scores
            level.startTimer();
        }, 1000);
    });
 
    $(document).on('click', '.answer-level-' + currentLevel, (event) => {
        var isGoodAnswer = event.target.getAttribute('good-answer');
       
        if(checkAnswer()) {
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
                swal('Félicitation ! Vous avez terminé le niveau 4 !');
                game.nextLevel();
            }
        } else {
            swal({
                title: "Mauvaise réponse :-(",
                text: "Pas le bon diagramme de Hasse !",
                className: 'bad-answer'
            });
            resetAnswer();
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
 
   
 
 
});
 
 
    // Permet d'alterner entre ligne et ellipse
    var swapForm = function(){
        toggleLineP5 = !toggleLineP5;
        var newText = (toggleLineP5) ? "ligne" : "ellipse";
        $('.btn-swap-form').text(newText);
    }
 
 
    // Reinitialise le canvas et les data structures de la réponse
    var resetAnswer = () => {
        myp5.clear();
        myp5.background(0);
        myp5.line(0, canvasHeight/2, canvasWidth, canvasHeight/2);
 
        previous = null;
        vertices = [];
        edges = [];
        links = [[], [], [], []];
    }
 
    // Fonction qui permet de vérifier la réponse de l'utilisateur
    function checkAnswer(){
        if(vertices.length != 4 || edges.length != 4)
            return false;
        // on définit la solution
        var soluce = [[1, 2], [1, 3], [1, 4], [3, 4]];
 
        // On compare la solution avec la réponse de l'utilisateur
        for(var i = 0; i < soluce.length; i++){
            var edge = links[i];
            for(var j = 0; j < soluce[i].length; j++){
                var vert = edge[j];
                if(vert != soluce[i][0] && vert != soluce[i][1])
                    return false;
            }
        }
 
        return true;
    }
 
    // Retrouve le point(arc ou sommet) correspondant aux extremité de la ligne
    function getLink(previous, point){
       
        // Trouve si une des 2 extremités est un arc
        var ed = 0;
        for(var i = 0; i < edges.length; i++){
            if(isIn(point, edges[i])){
                ed = i;
                break;
            } else if(isIn(previous, edges[i])){
                ed = i;
                break;
            }
        }
 
        // Trouve si une des 2 extremités est un sommet
        var vert = -1;
        for(var i = 0; i < vertices.length; i++){
            if(isIn(point, vertices[i])){
                vert = (i+1);
                break;
            } else if(isIn(previous, vertices[i])){
                vert = (i+1);
                break;
            }
        }
 
        // renvoie la structure arc-sommet, car on ne peut pas lier arc-arc ou sommet-sommet
        return {edge: ed, vertice:vert};
    }
 
    // Verifie si la position du clic appartient à une ellipse fixée
    function isIn(point, ellipse){
        return Math.abs(point.x - ellipse.x) <= 20 && Math.abs(point.y - ellipse.y) <= 20;
    }
 
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