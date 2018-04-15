<?php
require_once("views/partials/header.php");
?>



<div  class="container">

    <div style="position: absolute; top: 0; left: 20px; top: 20px">
        <p class="current-score">
            score : 
            <span id="value-current-score" style="font-weight:600;">0</span> 
            <img src="img/dogecoin.png" alt="points" style="width: 32px;">
        </p>
    </div>

    <img src="img/sound.png"
         alt="sound ON"
         id="icon-sound"
         style="position: absolute; top: 10px; right: 10px; width: 64px; cursor:pointer;"
         onclick="toggleMusic()">
    <audio id="music" autoplay loop>
        <source src="sounds/bg.mp3" type="audio/mpeg"/>
    </audio>

    <h1 class="text-center animated zoomInDown" style="animation-delay: .3s">Schnyder's game</h1>
    <p class="text-center animated zoomInDown" style="animation-delay: .5s">
        Un jeu éducatif qui vous guidera vers la compréhension du
        théorème de Schnyder, les Schnyder woods et leur visualisation en 3D.
    </p>
    <div id="main-container" class="row">
        <div class="col-12">
            <div class="text-center animated bounceIn">
                <button id="play" class="big-button">Play</button>
                <button id="options" class="big-button">Best scores</button>
                <small>(Cliquez en haut à droite sur l'icone de son pour retirer le son.)</small>  
            </div>
            
            <div id="levels" class="text-center d-none">
                <h2 class="animated bounceIn">
                    Select the level
                </h2>
                <hr>
                <h4 class="animated bounceIn">Part I - Schnyder theorem understanding</h4>
                <button class="level-button animated bounceIn" style="animation-delay: 1.0s;">1</button>
                <button class="level-button animated bounceIn" style="animation-delay: 1.2s;">2</button>
                <button class="level-button animated bounceIn" style="animation-delay: 1.4s;">3</button>
                <button class="level-button animated bounceIn" style="animation-delay: 1.6s;">4</button>
                <button class="level-button animated bounceIn" style="animation-delay: 1.8s;">5</button>
                <hr>
                <h4 class="animated bounceIn" style="animation-delay: 2s;">Part II - Schnyder Woods</h4>
                <a  class="level-button animated bounceIn" href="views/schnyder-woods.php" style="animation-delay: 2.2s;">1</a>
                <h4 class="animated bounceIn" style="animation-delay: 2.4s;">Part III - 3D representation</h4>
                <a  class="level-button animated bounceIn" href="views/3d-visualization.php" style="animation-delay: 2.2s;">1</a>
                <button class="select-level-back big-button animated bounceIn" style="animation-delay: 1.1s;">Back</button>
            </div>

            <main id="game-container" class="animated fadeInDown">
                
            </main>
        </div>
    </div>
    <div id="terminal" class="hidden"></div>

    <div id="ending" class="d-none" style="text-align:center;">
        
        <img src="img/end.gif" alt="" style="border: solid orange 5px; border-radius: 50%;">
        <br/>
        <button class="level-button animated bounceIn" style="animation-delay: 1s; width: auto;" onclick="location.href='views/schnyder-woods.php'">Passer a la deuxieme partie</button>


    </div>
   
    <small style="
        position:fixed;
        bottom:10px;
        left:10px;">
        &copy; Daoud & Mourad - Computational Geometry 2017 - 2018.
    </small>
</div>    

<script>
    
    $('#terminal').hide();

    renderMathInElement(document.body);
    // On démarre une instance du jeu -- variable globale
    var game = new Game();

    $(function() {

        // Les boutons du menu principal
        var btnPlay = $('#play');
        var btnOptions = $('#options');
        var btnHackNasa = $('#hack-the-nasa');
        var levelsContainer = $('#levels');
        var btnBackFromLevelSelection = $('.select-level-back');
        

        // Lorsqu'on clik sur un level pas locked, 
        // on charge le niveau en question
        levelsContainer.find('button.level-button:not(.level-locked)').click((event) => {

            levelsContainer.addClass('animated bounceOutUp');
            setTimeout(() => {
                levelsContainer.addClass('d-none');
                game.loadLevel(parseInt(event.target.textContent));
            }, 600);            
        });

        btnBackFromLevelSelection.click((event) => {
            // Pour simuler un délai dans les animations,
            // j'utilise setTimeout()
            bouncingTransition(levelsContainer, btnPlay.parent());
        });
        
        // Lorsqu'on click sur le bouton play, 
        // on démarre une nouvelle partie
        // et on invite le joueur à choisir un level.
        btnPlay.click((event) => {
            btnPlay.parent().removeClass('animated bounceInDown')
                            .addClass('animated bounceOutUp');
            // Pour simuler un délai dans les animations,
            // j'utilise setTimeout()
            setTimeout(() => {
                btnPlay.parent().addClass('d-none');
                levelsContainer.removeClass('animated bounceOutDown')
                               .addClass('animated bounceInUp');
                setTimeout(() => {
                    levelsContainer.removeClass('d-none');
                }, 300);
            }, 500);
        });
        
        btnOptions.click((event) => {
            swal('En cours');
        });

        $(document).on("click", ".btn-finish-level", (event) => {
            game.nextLevel();
        });

        $(document).on('click', '.btn-go-to-home', (event) => {
            swal('En cours');
        });
    });

    var toggleMusic = function() {
        var srcMusic = $('#music').attr('src');
        var iconMusic = $('#icon-sound').attr('src');
        $('#music').attr('src', srcMusic === '' ? 'sounds/A-Bit of Memes.mp3' : '');
        $('#icon-sound').attr('src', iconMusic === 'img/no-sound.png' ? 'img/sound.png' : 'img/no-sound.png');
    }
</script>

<?php
require_once("views/partials/footer.php");
?>