class Game {

    constructor() {
        // Propriétés propre au jeu
        this.containerGame = $("#game-container");
        this.score = 0;
        this.currentLevel  = 1;
        this.nbLevels = 5;

        /** 
         * Charge le niveau suivant 
         */
         this.nextLevel = () => {
            if (this.currentLevel + 1 <= this.nbLevels) {
                this.currentLevel++;
                this.loadLevel(this.currentLevel);
                $($('.level-button')[this.currentLevel - 1]).removeClass('level-locked');
            } else {
                swal('fin', 'fin de la première partie !');
                $("#main-container").fadeOut();
                setTimeout(() => {
                    $("#ending").addClass('animated fadeInUp').removeClass("d-none");
                }, 500);
                // bouncingTransition($('#game-container'), $('#play').parent());
            }
        }

        /**
         * Charge le niveau précédent
         */
         this.previousLevel = () => {
            if (this.currentLevel - 1 > 0) {
                this.currentLevel--;
                this.loadLevel(this.currentLevel);  
            } else {
                swal("Premier niveau atteint.");
            }
        }

        /** 
         * Charge le niveau courant de manière asynchrone 
         */
         this.loadLevel = (level) => {
            this.currentLevel = level;
            $.ajax({
                url: "views/level-" + level + ".php",
                type: "GET",
                async: false
            }).done((data) => {
                this.containerGame.html(data);
                renderMathInElement(document.body);

                $.getScript("js/level-" + level + ".js", function() {
                    console.log("Script loaded.");
                }); 
            });  
        };
    }
}


class Question {

   /**
    * Creates a question
    * @param {string} title 
    * @param {string[]} answers
    * @param {numeric} rightAnswer 
    */
    constructor(title, answers, rightAnswer, type, number, placeholder, explanation) {
        this.title = title;
        this.answers = answers;
        this.rightAnswer = rightAnswer;
        this.type = type;
        this.number = number;
        this.placeholder = placeholder;
        this.explanation = explanation;

        this.isCorrect = function(indexAnswer) {
            return indexAnswer === this.rightAnswer;
        }
        
        this.getExplanation = () => {
            return this.explanation;
        }

        this.toHTML = (level) => {
            var html = "";
            console.log("type = " + this.type);
            switch(this.type){
                case "1":
                    console.log("Question à réponse libre");
                    html = '<p class="question text-center col-12 animated bounceInUp"><em>Question</em><br>' + this.title + '</p>';
                    var cpt = 0.2;
                    html += '<div class="col-12 animated bounceInUp text-center" style="animation-delay:' + cpt + 's">' +
                                '{ <input type="text" id="text-answer-'+ number +'-level-'+level+'" placeholder="' + this.placeholder + '"> </input> }'  +
                                '<button id="check-answer-'+number+'-level-'+level+'" class="btn small-button">Check</button>'      
                           + '</div>';
                    break;
                case "2":
                     html = '<p class="question text-center col-12 animated bounceInUp">'+ '<em>Question</em><br>' + this.title + '</p>';
                     var cpt = 0.2;
                     break;
                default:
                    html = '<p class="question text-center col-12 animated bounceInUp"><em>Question</em><br>' + this.title + '</p>';
                    var cpt = 0.0;
                    for(var i in this.answers) {
                        cpt += 0.2;
                        var funcAnswer = (i == rightAnswer)? "true" : "false";
                        html += '<div class="col-12 animated bounceInUp" style="animation-delay:' + cpt + 's">' +
                        '<button good-answer="' + funcAnswer + '" class="answer answer-level-'+ level + ' w-100" onClick="' + funcAnswer + '">' 
                        + this.answers[i] + 
                        '</button>' +
                        '</div>';
                    }
            }
            return html;
        };


    }
}


class Level {
    constructor(listOfQuestions) {
        this.questions = listOfQuestions;
        this.indexCurrentQuestion = 0;
        this.timer = null;
        this.score = 10000;

        this.nextQuestion = function(level) {
            // C'est cyclique. La question après la dernière est la première genre.
            this.indexCurrentQuestion = (this.indexCurrentQuestion + 1) % listOfQuestions.length;
            return this.questions[this.indexCurrentQuestion].toHTML(level);
        }

        this.previousQuestion = function(level) {
            this.indexCurrentQuestion = (this.indexCurrentQuestion - 1) % listOfQuestions.length;
            return this.questions[this.indexCurrentQuestion].toHTML(level);
        }

        this.currentQuestion = function(level) {
            return this.questions[this.indexCurrentQuestion].toHTML(level);
        }

        this.startTimer = () => {
            this.timer = setTimeout(() => {
                this.decrementScore();
            }, 100);
        }

        this.goodAnswer = () => {
            this.stopTimer();
            var scoreNode = $('#value-current-score');
            var currentScore = parseInt(scoreNode.text());
            // On incrémente le score du gars.
            scoreNode.text(currentScore + this.score);
            // On réinitialise le score qui diminue en
            // fonction du temps (comme QuizzUp)
            this.score = 10000;
            // Cette question ayant été répondue, 
            // on la retire de la liste des questions
            this.questions.splice(this.indexCurrentQuestion, 1);
            // On indique combien il reste de questions
            // à répondre.
            return this.questions.length;
        }

        this.badAnswer = () => {
            this.stopTimer();
            var scoreNode = $('#value-current-score');
            var currentScore = parseInt(scoreNode.text());
            swal({
                title: "Mauvaise réponse :-(",
                content: $("<div>" + this.questions[this.indexCurrentQuestion].getExplanation() + "</div>")[0],
                className: 'bad-answer'
            })  ;
            // On met à jour le score du gars.
            scoreNode.text(currentScore - 10000);
            // On réinitialise le score qui diminue en
            // fonction du temps (comme QuizzUp)
            this.score = 10000;
            // Cette question ayant été répondue, 
            // on la retire de la liste des questions
            this.questions.splice(this.indexCurrentQuestion, 1);
            // On indique combien il reste de questions
            // à répondre.
            return this.questions.length;
        };

        this.stopTimer = () => {
            if (this.timer != null)
                clearTimeout(this.timer);
        }

        this.decrementScore = () => {
            this.score -= (100 + getRandomInt(10));
            this.timer = setTimeout(() => {
                this.decrementScore();
            }, 500);
        };

    }
}

var getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Cette fonction retourne un array de Question basé sur l'XML
 * @param {JQuery} xmlContent 
 */
var loadQuestions = function(xmlContent, level) {
    var xml = $(xmlContent.html());
    xml = $(xml.find("level")[level]);

    var questions = [];

    xml.find("question").each((i, question) => {
        var answers = [];

        $(question).find("answer").each((j, answer) => {
            answers.push($(answer).text());
        });
        
        questions.push(new Question(
            $(question).find("title").text(), 
            answers, 
            $(question).attr('correct-answer'),
            $(question).attr('type'),
            i+1,
            $(question).find("placeholder").text(),
            $(question).find("explanation").html()
            )
        );
    });
    console.log(questions);
    return questions;
}

/**
 * 
 * @param {JQuery} elementToHide 
 * @param {JQuery} elementToShow 
 */
var fadingTransition = (elementToHide, elementToShow) => {
    elementToHide.removeClass('animated fadeInDown').addClass('animated fadeOutUp');
    setTimeout(() => {
        elementToShow.removeClass('animated fadeOutUp').addClass('animated fadeInDown').removeClass('d-none');
        setTimeout(() => {
            elementToHide.addClass('d-none');
        }, 300);
    }, 500);
}

var bouncingTransition = (elementToHide, elementToShow) => {
    elementToHide.removeClass('animated bounceInDown').addClass('animated bounceOutDown');
    setTimeout(() => {
        elementToShow.removeClass('animated bounceOutUp').addClass('animated bounceInDown').removeClass('d-none');
        setTimeout(() => {
            elementToHide.addClass('d-none');
        }, 300);
    }, 500);
}