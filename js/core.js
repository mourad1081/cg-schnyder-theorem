class Game {

    constructor() {
        this.containerGame = $("#game-container");
        this.currentLevel  = 0;
        this.nbLevels = 2;
        
        /** 
         * Charge le niveau suivant 
         */
        this.nextLevel = () => {
            if (this.currentLevel + 1 <= this.nbLevels) {
                this.currentLevel++;
                this.loadLevel(); 
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
                this.loadLevel();  
            } else {
                swal("Premier niveau atteint.");
            }
           
        }

        /** 
         * Charge le niveau courant de manière asynchrone 
         */
        this.loadLevel = () => {
            $.ajax({
                url: "/cg-schnyder-theorem/views/level-" + this.currentLevel + ".php",
                type: "GET",
                async: true
            }).done((data) => {
                this.containerGame.html(data);
            });

            $.getScript("/cg-schnyder-theorem/js/level-" + this.currentLevel + ".js", (data, textStatus, jqxhr) => {
                console.log(data); // Data returned
                console.log(textStatus); // Success
                console.log(jqxhr.status); // 200
                console.log("Load was performed.");
            });
        };
    }
}