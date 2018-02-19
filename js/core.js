class Game {

    constructor() {
        // Propriétés propre au jeu
        this.containerGame = $("#game-container");
        this.score = 0;
        this.currentLevel  = 1;
        this.nbLevels = 3;

        /** 
         * Charge le niveau suivant 
         */
        this.nextLevel = () => {
            if (this.currentLevel + 1 <= this.nbLevels) {
                this.currentLevel++;
                this.loadLevel(this.currentLevel); 
            } else {
                swal("Niveau max atteint.");
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
            $.ajax({
                url: "views/level-" + level + ".php",
                type: "GET",
                async: true
            }).done((data) => {
                this.containerGame.html(data);
            });

            $.getScript("js/level-" + level + ".js", (data, textStatus, jqxhr) => {
                console.log("Load was performed.");
                renderMathInElement(document.body);
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
    constructor(title, answers, rightAnswer) {
        this.title = title;
        this.answers = answers;
        this.rightAnswer = rightAnswer;
        // A counter to know
        this.timer = null;

        this.score = 10000;

        this.startTimer = () => {
            this.timer = setTimeout(() => {
                this.decrementScore();
            }, 100);
        }

        this.stopTimer = () => {
            if (this.timer != null)
                clearTimeout(this.timer);
        }

        this.decrementScore = () => {
            this.score -= 100;
            console.log("score decremented", this.score);

            setTimeout(() => {
                this.decrementScore();
            }, 100);
        };

        this.toHTML = () => {
            var html = '<p class="question text-center col-12 animated bounceInUp">Question<br>' + this.title + '</p>';
            var cpt = 0.0;
            for(var i in this.answers) {
                cpt += 0.2;
                var funcAnswer = (i == rightAnswer)? "good()" : "bad()";
                html += '<div class="col-12 animated bounceInUp" style="animation-delay:' + cpt + 's">' +
                            '<button class="answer w-100" onClick="'+ funcAnswer + '">' + this.answers[i] + '</button>' +
                        '</div>';
            }
            html += '<button id="show-theory" class="btn big-button animated bounceInUp" style="animation-delay:' + cpt + 's" onClick="displayTheory()">help</button>';
            return html;
        };


    }
}