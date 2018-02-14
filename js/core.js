class Game {

    constructor() {
        this.containerGame = $("#game-container");
        this.currentLevel  = 0;

        this.nextLevel = () => {
            this.currentLevel++;
            
            // we load the next level
            $.ajax({
                url: "/cg-schnyder-theorem/views/level-" + this.currentLevel + ".php",
                type: "GET"
            }).done((data) => {
                console.log("done", data);
                this.containerGame.html(data);
            });
        }
    }
}