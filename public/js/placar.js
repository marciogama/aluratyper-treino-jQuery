function inserePlacar(){
    let corpoTabela = $(".placar").find("tbody");
    let usuario = "Pedro";
    let numPalavras = $("#contador-palavras").text();
        
    let linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    
    corpoTabela.prepend(linha); // coloca no início do placar            
    //corpoTabela.append(linha);  // coloca no final do placar
}

function novaLinha(usuario, palavras){
    let linha = $("<tr>");
    let colunaUsuario = $("<td>").text(usuario);
    let colunaPalavras = $("<td>").text(palavras);
    let colunaRemover = $("<td>");

    let link = $("<a>").addClass("botao-remover").attr("href","#");
    let icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    // Icone dentro do <a>
    link.append(icone);

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(){
    event.preventDefault();
    $(this).parent().parent().remove();
};

// .text() pega conteudo de tags <p> <ul> etc.
// .val() pega conteudo de tags inputs ex.: <textarea> <input> <select>