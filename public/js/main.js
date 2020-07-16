let frase = $(".frase").text();
let numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase")

tamanhoFrase.text(numPalavras);

let campo = $(".campo-digitacao");
campo.on("input",function(){
    let conteudo = campo.val();

    let qtdPalavras = conteudo.split(/\S+/).length-1;
    $("#contador-palavras").text(qtdPalavras);

    let qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);
});


// .text() pega conteudo de tags <p> <ul> etc.
// .val() pega conteudo de tags inputs ex.: <textarea> <input> <select>