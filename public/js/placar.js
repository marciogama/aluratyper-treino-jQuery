$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar(){
    let corpoTabela = $(".placar").find("tbody");
    let usuario = $("#usuarios").val();
    let numPalavras = $("#contador-palavras").text();
        
    let linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    
    corpoTabela.prepend(linha); // coloca no início do placar            
    //corpoTabela.append(linha);  // coloca no final do placar
    
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("html, body").animate({
        scrollTop: posicaoPlacar
    }, 1000);
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
    let linha = $(this).parent().parent();

    linha.fadeOut(1000);
    setTimeout(function() {
        linha.remove();
    }, 1000);
};

function mostraPlacar() {
    // $(".placar").css("display", "block");
    // $(".placar").hide();
    // $(".placar").show();
    // $(".placar").toggle();
    // $(".placar").slideUp(600);
    // $(".placar").slideDown(600);
    $(".placar").stop().slideToggle(600);
}

// .text() pega conteudo de tags <p> <ul> etc.
// .val() pega conteudo de tags inputs ex.: <textarea> <input> <select>

function sincronizaPlacar() {
    let placar = [];
    let linhas = $("tbody>tr");
    linhas.each(function(){
        let usuario = $(this).find("td:nth-child(1)").text();
        let palavras = $(this).find("td:nth-child(2)").text();

        let score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    })

    let dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar",dados,function(){
        $(".tooltip").tooltipster("open").tooltipster("content","Sucesso ao sincronizar !");;
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content","Falha ao sincronizar !");
    }).always(function(){
        setTimeout(function(){
            $(".tooltip").tooltipster("close");
        },1200);
    });
}

function atualizaPlacar() {
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            let linha = novaLinha(this.usuario, this.pontos);    
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        });
    });
}