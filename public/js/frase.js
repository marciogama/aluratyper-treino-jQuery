$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function() {
        $("#erro").show();
        setTimeout(function() {
            $("#erro").hide();
        }, 1500)
    })
    .always(function() {
        $("#spinner").toggle();
    });
};

function trocaFraseAleatoria(data) {
    
    let frase = $(".frase");
    let numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto)
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
    
};