<?php
    require_once("views/partials/header.php");
?>



<div class="container">
    <h1>Jeu schnyder</h1>
    
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
    Facere deserunt inventore illo aperiam, aspernatur omnis 
    architecto voluptatum quae, vel cumque officia nemo soluta
    itaque voluptates saepe, iste ullam suscipit voluptatibus!

    <hr>

    <button id="btn-next-level" class="btn btn-primary">Generate next level</button>

    <hr>

    <main id="game-container">
        no level
    </main>

    <hr>

</main>

<script>
    $(function() {
        var game = new Game();
        $("#btn-next-level").click((event) => {
            game.nextLevel();
        });
    });
</script>

<?php
    require_once("views/partials/footer.php");
?>