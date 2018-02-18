class Game {

    constructor() {
        // Propriétés propre au jeu
        this.containerGame = $("#game-container");
        this.score = 0;
        this.currentLevel  = 0;
        this.nbLevels = 2;

        /** 
         * Charge le niveau suivant 
         */
        this.nextLevel = () => {
            if (this.currentLevel + 1 <= this.nbLevels) {
                this.currentLevel++;
                this.loadLevel(this.currentLeve); 
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
                this.loadLevel(this.currentLeve);  
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