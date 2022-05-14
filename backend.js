const { query } = require("express");
var express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

var site = express();

// variavel que verifica se 
let hasAnyoneLogged = false;

site.use(session({
    secret: "supercalifragilisticexpialidocious",
    resave: false,
    saveUninitialized: true
}));
let alert = require('alert');
site.use(bodyParser.urlencoded({
    extended: true
}));
site.use(bodyParser.json());


/* localhost */ 
var server = site.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("servidor a ser executado em " + host + ":" + port);
});

// pasta a partir da qual se pode aceder a páginas estáticas (não gerados pelo Node.js) e a outros ficheiros, como, por exemplo, ficheiros CSS
site.use(express.static("html"));

var mysql = require("mysql");
const { send } = require("process");

// dados para estabeler a ligação ao servidor MySQL
var pool = mysql.createPool({
    host: "saturno.esec.pt",
    user: "a2019133914",
    password: "fbdcdm",
    database: "a2019133914",
    charset: "utf8",
    multipleStatements: true
});

// topo dos ficheiros HTML gerados para cada página
var topo = "";
topo += "<!DOCTYPE html>\n";
topo += "<html>\n";
topo += "<head>\n";
topo += "<title>Floco</title>\n";
topo += "<meta charset='utf8'>\n";
topo += "<link rel='stylesheet' href='prod.css'>\n";
/*topo += "<h1><a href='/'>Floco</a></h1>\n";
topo += "<a href='/sessao'> aqui </a>\n"
topo += "<a href='/produtos'> produtos todos </a> \n"
topo += "<a href='/teste'> homepage </a>"*/
topo += "<nav>";
topo += "<svg id='fundonav' width='1603' height='120'>";
topo += "<rect width='1603' height='120' style='fill:#273d3f6b;stroke-width:0;stroke:#273d3f6b'> </svg>";
topo += "<div class='nav'>";
topo += "<a id='cata' href='/produtos'>CATÁLOGO</a>";
topo += "<a id='is' href='/sessao'>INICIAR SESSÃO</a>";
/*topo += "<a id='p' href='/perfil'>PERFIL</a>";*/
topo += "<a id='c2' href='/mostra_carrinho'>CARRINHO</a>";
topo += "</div>";
topo += "</nav>"
topo += "</head>\n";
topo += "<body>\n";



// fundo dos ficheiros HTML gerados para cada página
var fundo = "";
fundo += "</body>\n";
fundo += "</html>\n";

site.get("/teste", function(req,res){
    var html = "";
    html += topo;
    html += fundo;
    res.send(html);
});

/* pagina dos produtos  do funcionario  PARTE DA INES!!!!!!!!!! */
/*site.get("/prod_func", function(req,res){
    var query = "SELECT id_prod, nome_prod from Produtos ";
    runQuery(query, function(err, result, fields){
        var html = "";
        html += topo;
        if(hasAnyoneLogged){
            loggedin += `<h4>Olá ${username}</h4>`;
            html += loggedin;
        }
        else{}
        html += "<button><h2>Produtos</h2></button>\n";
        html += "<table>\n";
        html += "<tr><th>id_prod</th><th>nome_prod</th></tr>\n";
        for (var i = 0; i < result.length; i++) {
            html += "<tr><td>" + result[i].id_prod + "</td><td>" + result[i].nome_prod + "\n";
        }
        html += "</table>\n";

        html += fundo;
        res.send(html);
    });
});*/

// função para a execução das queries, garantindo que o código que depende dos seus resultados aguarda pelos mesmos
function runQuery(query, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
        }
        connection.query(query, function (err, result, fields) {
            if (err) {
                console.error(err);
            }
            connection.release();
            return callback(err, result, fields);
        });
    });
}

/* página de iniciar sessão  */
site.get("/sessao", function(req, res){
    if(req.session.id_cliente){
        //DIRECIONA O UTILIZADOR PARA A PAGINA DO PERFIL SE JA TIVER A SESSAO INICIADA
        res.redirect("/perfil");
    }else{
        //PAGINA HTML SEPARADA
        res.sendFile('html/sessao.html', { root:__dirname});
    }
        
});


site.post("/sessao", function(req,res){
    //var query = `SELECT id_cliente, mail_cliente, pass_cliente from  Clientes WHERE mail_cliente = '${req.body.np_input}' and 
    //pass_cliente = '${req.body.pp_input}'`;
    var query = "SELECT id_cliente FROM Clientes WHERE mail_cliente = '"+req.body.np_input+"'";
    runQuery(query, function(err, result, fields){
        if(!result.length){
            /* caso nao seja cliente nem funcionario e depois no else a ser funcionario */
            var q = `SELECT id_func from  Funcionários WHERE mail_func = '${req.body.np_input}' and 
            pass_func = '${req.body.pp_input}'`;
            runQuery(q, function(err,result,fields){
                if(!result.length){
                    alert('Nao esta registado no nosso website');
                    res.redirect('/registo');
                    console.log("nao sou nenhum");
                }
                else{
                    req.session.id_funcionario = result[0].id_func;
                    hasAnyoneLogged =true;
                    res.redirect('/principal_func');
                    console.log("sou funcionario");
                }
            });
        }
        else{
            req.session.id_cliente = result[0].id_cliente;
            console.log(result[0].id_cliente);
            hasAnyoneLogged =true;
            res.redirect('/perfil');
            console.log("sou cliente");
        }

    });

}); 

/* pagina dos produtos que os clientes veêm */ 
site.get("/produtos", function(req, res){
    var query = " SELECT id_prod,nome_prod, edicao_prod, ref_prod, preco_venda from Produtos ";
    runQuery( query, function(err, result, fields){
        var html = "";
        html += topo ;
        html += "<br><br><br>"
        html += "<h2 id='titulo_prod'> CATÁLOGO</h2>"
        html += "<table id='table'>\n";

        html += "<tr> <th> NOME </th> <th> EDIÇÃO </th> <th> REFERÊNCIA </th> <th> PREÇO </th> <th> COMPRAR </th> </tr>\n";
        for (var i = 0; i < result.length; i++) {
            html += "<tr><td>" + result[i].nome_prod + "</td><td>" + result[i].edicao_prod + "</td><td>" + result[i].ref_prod + "</td><td>" 
            + result[i].preco_venda + "</td> <td>" + "<a href='/adiciona_carrinho?id_prod=" + result[i].id_prod + 
            "'>&#128722;</a>" + "</td></tr>" + "\n";
        }
        
        html += "</table>\n";

        html += fundo;
        res.send(html);

    });
});


/* pagina do registo adiciona novo cliente há bd */ 
site.get("/registo",function(req,res){
    res.sendFile('html/registo.html', { root:__dirname});
});

site.post("/registo",function(req,res){
    var query = `INSERT into Clientes Values(null,'${req.body.nome}','${req.body.dataN}','${req.body.morada}',
    '${req.body.sexo}','${req.body.numeroC}','${req.body.email}','${req.body.password}','${req.body.tel}')`
    runQuery( query, function(err, result, fields){
        if (err) {
            console.error("erro ao executar a inserção");
            throw (err);
        }
        else {
            console.log("resultado da inserção");
            console.log(result.affectedRows);
            console.log(result.insertId);
            res.redirect("/sessao");
        }
    });

});

/* pagina de visualização do perfil  */
site.get("/perfil", function(req,res){
    var query = ` SELECT nome_cliente,dn_cliente, morada_cliente, sexo_cliente, nc_cliente, mail_cliente, nt_cliente
     from Clientes WHERE id_cliente = '${req.session.id_cliente}'`;
     runQuery( query, function(err, result, fields){
         var html = "";
         html += topo;
         html += "<br><br><br>"
         html += "<h2 id='titulo_perfil'> PERFIL </h2>";
         html += "<form meth id='form_ver_perfil'>"
         html += `<label id='label_perfil'>EMAIL:  </label>`;
         html += `<input id='input_perfil_ver' type="text" value="${result[0].mail_cliente}" readonly>`
         html += "<br><br>";
         html += `<label id='label_perfil' >NOME:  </label>`;
         html += `<input id='input_perfil_ver' type="text" value="${result[0].nome_cliente}" readonly>`
         html += `<br><br>`;
         html += `<label id='label_perfil' >DATA DE NASCIMENTO:  </label>`;
         html += `<input id='input_perfil_ver' type="text" value="${result[0].dn_cliente}" readonly>`
         html += `<br><br>`;
         html += `<label id='label_perfil' >MORADA:  </label>`;
         html += `<input id='input_perfil_ver' type="text" value="${result[0].morada_cliente}" readonly>`
         html += '<br><br>'
         html += `<label id='label_perfil' >SEXO:  </label>`;
         html += `<input id='input_perfil_ver' type="text" value="${result[0].sexo_cliente} " readonly>`
         html += `<br><br>`;
         html += `<label id='label_perfil' >NÚMERO CONTRIBUINTE:  </label>`;
         html += `<input id='input_perfil_ver' type="text" value="${result[0].nc_cliente} " readonly>`
         html += `<br><br>`;
         html += `<label id='label_perfil' >NÚMERO TELEMÓVEL:  </label>`;
         html += `<input id='input_perfil_ver' type="text" value="${result[0].nt_cliente} " readonly>`
         html += `<br><br>`;
         html += "</form>";
         html += "<a href='/editarperfil' id='alterar_perfil'>EDITAR PERFIL</a>";
         html += "<br><br>"
         html += "<a href= '/logout' id='fim_sessao'> TERMINAR SESSÃO </a>"
         html += fundo;

         res.send(html);
    });
});
// terminar sessao
site.get("/logout", function (req, res) {
    // destruir variáveis de sessão individualmente
    //req.session.id_funcionario = null;
    // ou destruir a sessão completa
    req.session.destroy();
    res.redirect("/sessao");
});

/*  pagina de alterar perfil */
site.get("/editarperfil", function(req,res){
    var query = ` SELECT nome_cliente,dn_cliente, morada_cliente, sexo_cliente, nc_cliente, mail_cliente, nt_cliente
     from Clientes WHERE id_cliente = '${req.session.id_cliente}'`;
     runQuery( query, function(err, result, fields){
         var html = "";
         html += topo;
         html += "<br><br><br>"
         html += "<h2 id='titulo_perfil'> PERFIL </h2>";
         html += " <form method='POST' action='/editarperfil' id='form_alterar_perfil'>"
         html += `<label>EMAIL:  </label>`;
         html += `<input id= 'input_perfil_alterar' type="text" value="${result[0].mail_cliente}" name="mail_cliente">`
         html += "<br><br>";
         html += `<label>NOME:  </label>`;
         html += `<input id= 'input_perfil_alterar' type="text" value="${result[0].nome_cliente}"name="nome_cliente">`
         html += `<br><br>`;
         html += `<label>DATA DE NASCIMENTO:  </label>`;
         html += `<input id= 'input_perfil_alterar' type="text" value="${result[0].dn_cliente}"name="dn_cliente">`
         html += `<br><br>`;
         html += `<label>MORADA:  </label>`;
         html += `<input id= 'input_perfil_alterar' type="text" value="${result[0].morada_cliente} "name="morada_cliente">`
         html += `<br><br>`;
         html += `<label>SEXO:  </label>`;
         html += `<input id= 'input_perfil_alterar' type="text" value="${result[0].sexo_cliente} "name="sexo_cliente">`
         html += `<br><br>`;
         html += `<label>NÚMERO CONTRIBUINTE:  </label>`;
         html += `<input id= 'input_perfil_alterar' type="text" value="${result[0].nc_cliente} "name="nc_cliente">`
         html += `<br><br>`;
         html += `<label>NÚMERO TELEMÓVEL: </label>`;
         html += `<input id= 'input_perfil_alterar' type="text" value="${result[0].nt_cliente} "name="nt_cliente">`
         html += `<br><br>`;
         html += "<input  type='submit' id='guardar_perfil' value='GUARDAR ALTERAÇÕES'>";
         html += "</form>";
         
         html+="<a id='apagar_perfil' href='/apagarperfil'>APAGAR</a>"
    
         html += fundo;

         res.send(html);
    });
});

// apagar a conta
site.get("/apagarperfil",function(req,res){
    var query = "DELETE FROM Clientes WHERE id_cliente = " +req.session.id_cliente;
    runQuery(query, function (err, result, fields) {
        console.log(result.affectedRows);
        console.log(result.insertId);
        hasAnyoneLogged = false;
        res.redirect("/");
    })

})

/* ao clicar no botão guardar faz update aos valores nos inputs e volta á pagina de visualização do perfil */
site.post("/editarperfil",function(req,res){
    var query = `UPDATE Clientes SET nome_cliente = '${req.body.nome_cliente}', morada_cliente='${req.body.morada_cliente}'
    ,sexo_cliente = '${req.body.sexo_cliente}',nc_cliente = '${req.body.nc_cliente}',mail_cliente = '${req.body.mail_cliente}'
    ,nt_cliente='${req.body.nt_cliente}' WHERE id_cliente = '${req.session.id_cliente}'`;
    
    runQuery( query, function(err, result, fields){
        if (err) {
            console.error("erro ao executar a inserção");
            throw (err);
        }
        else {
            console.log("resultado da inserção");
            console.log(result.affectedRows);
            console.log(result.insertId);
            res.redirect("/perfil");
        }
    });
});

/* pagina principal */
site.get("/",function(req,res){
    res.sendFile('html/casa.html', { root:__dirname});
});

/* pagina para o cliente escolher continuar a comprar ou ir para os produtos */ 
site.get("/adiciona_carrinho", function (req, res) {
    if (req.session.id_cliente) {
        var html = "";
        html += topo;
        html += "<br><br><br>"
        html += "<div id='produto_adicionado'>";
        html += "<h2>ADICIONAR AO CARRINHO</h2>\n";
        html += "<br>";
        if (req.query.id_prod) {
            if (!req.session.carrinho) {
                req.session.carrinho = new Array();
            }
            if (req.session.carrinho[req.query.id_prod]) {
                req.session.carrinho[req.query.id_prod]++;
            }
            else {
                req.session.carrinho[req.query.id_prod] = 1;
            }
            html += "<p>GLOBO ADICIONADO COM SUCESSO AO CARRINHO</p>\n";
        }
        else {
            html += "<p>GLOBO A ADICIONAR AO CARRINHO NÃO ESPECIFICADO</p>\n";
        }
        html += "<br>";
        html += "<p><a href='/produtos' id='continuar_comprar' >CONTINUAR A COMPRAR</a></p>\n";
        html += "<br>";
        html += "<p><a href='mostra_carrinho' id='mostrar_carrinho'>MOSTRAR O CARRINHO</a></p>\n";
        html += "</div>"
        html += fundo;
        res.send(html);
    }
    else {
        var html = "";
        html += topo;
        html += "<br><br><br>"
        html += "<h2 id='carrinho_text'>CARRINHO</h2>\n";
        html += "<p id='carrinho_vazio'> UTILIZADOR NÃO AUTENTICADO</p>\n";
        html += fundo;
        res.send(html);
    }
});

/* pagina do carrinho */
site.get("/mostra_carrinho", function (req, res) {
    if (req.session.id_cliente) {
        if (req.session.carrinho) {
            if (req.query.operacao == "aumentar") {
                req.session.carrinho[req.query.id_album]++;
            }
            else if (req.query.operacao == "diminuir") {
                req.session.carrinho[req.query.id_album]--;
            }
            else if (req.query.operacao == "apagar") {
                req.session.carrinho[req.query.id_album] = null;
            }
            
            var listaProdsCarrinho = new Array();
            for (var i = 0; i < req.session.carrinho.length; i++) {
                if (req.session.carrinho[i]) {
                    listaProdsCarrinho.push(i);
                }
            }
            if (listaProdsCarrinho.length > 0) {
                var query = "SELECT id_prod, nome_prod, edicao_prod, stock_prod, preco_venda FROM Produtos WHERE id_prod IN (";
                for (var i = 0; i < listaProdsCarrinho.length - 1; i++) {
                    query += listaProdsCarrinho[i] + ", ";
                }
                query += listaProdsCarrinho[listaProdsCarrinho.length - 1] + ");";
                runQuery(query, function (err, result, fields) {
                    var precoTotal = 0;
                    var html = "";
                    html += topo;
                    html += "<br><br><br>"
                    html += "<h2 id='carrinho_text'>CARRINHO</h2>\n";
                    if (result && result.length > 0) {
                        html += "<table>";
                        html += "<tr><th> GLOBO </th><th> PREÇO </th><th colspan='3'> QUANTIDADE </th><th> PREÇO PARCIAL</th><th> APAGAR </th></tr>\n";
                        for (var i = 0; i < result.length; i++) {
                            // limitar a quantidade máxima de cada álbum ao respectivo stock
                            if (req.session.carrinho[result[i].id_prod] > result[i].stock_prod) {
                                req.session.carrinho[result[i].id_prod] = result[i].stock_prod;
                            }
                            html += "<tr><td>" + result[i].nome_prod + "</td><td>&euro;" + result[i].preco_venda +
                             "</td><td><a href='mostra_carrinho?id_album=" + result[i].id_prod + 
                             "&operacao=aumentar'>&plus;</a></td><td>" + req.session.carrinho[result[i].id_prod] +
                              "</td><td><a href='mostra_carrinho?id_album=" + result[i].id_prod +
                               "&operacao=diminuir'>&minus;</a></td><td>&euro;" + 
                               (req.session.carrinho[result[i].id_prod] * result[i].preco_venda) + 
                               "</td><td><a href='mostra_carrinho?id_album=" + result[i].id_prod + 
                               "&operacao=apagar'>&#10007;</a></td></tr>\n";
                            precoTotal += req.session.carrinho[result[i].id_prod] * result[i].preco_venda;
                            req.session.preco_total = precoTotal;
                        }
                        html += "</table>\n";
                        html += "<br><br>"
                        html += "<p id='preco_total'><strong>PREÇO TOTAL: " + precoTotal + " &euro;&nbsp; </strong></p>\n";
                        html += "<br><br>"
                        html += "<p><a href='processa_insere_venda' id='botao_final_compra'>FINALIZAR COMPRA</a></p>\n";
                    }
                    else {
                        html += "<br><br><br>"
                        html += "<p id='carrinho_vazio'>CARRINHO VAZIO</p>\n";
                    }
                    html += fundo;
                    res.send(html);
                });
            }
            else {
                var html = "";
                html += topo;
                html += "<br><br><br>"
                html += "<h2 id='carrinho_text'>CARRINHO</h2>\n";
                html += "<p id='carrinho_vazio'>CARRINHO VAZIO</p>\n";
                html += fundo;
                res.send(html);
            }
        }
        else {
            var html = "";
            html += topo;
            html += "<br><br><br>"
            html += "<h2 id='carrinho_text'>CARRINHO</h2>\n";
            html += "<p id='carrinho_vazio'>CARRINHO VAZIO</p>\n";
            html += fundo;
            res.send(html);
        }
    }
    else {
        var html = "";
        html += topo;
        html += "<br><br><br>"
        html += "<h2 id='carrinho_text'>CARRINHO</h2>\n";
        html += "<p id='carrinho_vazio'> UTILIZADOR NÃO AUTENTICADO</p>\n";
        html += fundo;
        res.send(html);
    }
});

/* finalizar compras */
site.get("/processa_insere_venda", function (req, res) {
        if (req.session.id_cliente) {
            if (req.session.carrinho) {
                var listaProdsCarrinho = new Array();
                for (var i = 0; i < req.session.carrinho.length; i++) {
                    if (req.session.carrinho[i]) {
                        listaProdsCarrinho.push(i);
                    }
                }
                var query = "INSERT INTO Vendas VALUES (null, NOW(),'"+req.session.id_cliente+"','"
                +req.session.preco_total+"','"+req.session.id_cliente+
                "',null);";
                for (var i = 0; i < listaProdsCarrinho.length; i++) {
                    query += "INSERT INTO Vendas_has_Produtos VALUES (null,(SELECT MAX(id_vendas) FROM Vendas),'"
                    + req.session.id_cliente+"','"+listaProdsCarrinho[i]+"');"
                }
                //res.send(query);
                runQuery(query, function (err, result, fields) {
                    var html = "";
                    html += topo;
                    html += "<br><br><br>"
                    html += "<h2 id='venda_feita'>VENDA FINALIZADA</h2>\n";
                    if (result) {
                        if (result.length > 0) {
                            html += "<p id='venda_feita' >VENDA FINALIZADA COM SUCESSO </p>\n";
                        }
                        for (var i = 1; i < result.length; i++) {
                            if (result[i].affectedRows > 0) {
                                html += "<p id='venda_feita'> GLOBO ADICIONADO Á VENDA </p>\n";
                            }
                            else {
                                html += "<p id='venda_feita'> FALHA AO ADICIONAR GLOBO Á VENDA </p>\n";
                            }
                        }
                    }
                    else {
                        html += "<p id='venda_feita'> FALHA AO INSERIR GLOBO </p>\n";
                    }
                    html += fundo;
                    res.send(html);
                });
            }
            else {
                var html = "";
                html += topo;
                html += "<h2 id='venda_feita'> COMPRAS </h2>\n";
                html += "<p id='venda_feita'> CARRINHO DE COMPRAS VAZIO </p>\n";
                html += fundo;
                res.send(html);
            }
        }
        else {
            var html = "";
            html += topo;
            html += "<h2 id='venda_feita'> COMPRAS </h2>\n";
            html += "<p id='venda_feita'> CLIENTE NÃO IDENTIFICADO </p>\n";
            html += fundo;
            res.send(html);
        }
});

/* paginas de backend para os funcionarios */

site.get("/principal_func", function(req,res){
    var html = "";
    html += "<!DOCTYPE html>\n";
    html += "<html>\n";
    html += "<head>\n";
    html += "<title>Floco</title>\n";
    html += "<meta charset='utf8'>\n";
    html += "<link rel='stylesheet' href='prod.css'>\n";
    html += "</head>\n";
    html += "<body>\n";
    html += "<div id='hey'>\n";
    html += "<h1><a id='ava' href='/avaliacoesfunc'>Avaliações</a></h1>\n";
    html += "<h1><a id='cli' href='/clientesfunc'>Clientes</a></h1>\n";
    html += "<h1><a id='com' href='/comprasfunc'>Compras</a></h1>\n";
    html += "<h1><a id='ven' href='/vendasfunc'>Vendas</a></h1><br>\n";
    html += "<br>\n";
    html += "<h1><a id='fab' href='/fabricantesfunc'>Fabricantes</a></h1>\n";
    html += "<h1><a id='fun' href='/funcionariosfunc'>Funcionários</a></h1>\n";
    html += "<h1><a id='pro' href='/produtosfunc'>Produtos</a></h1>\n";
    html += "<br><br>";
    html += "<a href= '/logout' id='fim_sessao2'> TERMINAR SESSÃO </a>";
    html += "<p id='clica'>Escolhe uma consulta para iniciar</p>\n";
    html += "</div>";
    html += fundo;
    res.send(html);
});
site.get("/avaliacoesfunc", function(req,res){
    var query = "SELECT id_avaliacao, id_cliente, id_prod, avaliacao from Avaliação";
    runQuery(query, function(err, result, fields){
        var html = "";
        html += "<!DOCTYPE html>\n";
        html += "<html>\n";
        html += "<head>\n";
        html += "<title>Floco</title>\n";
        html += "<meta charset='utf8'>\n";
        html += "<link rel='stylesheet' href='prod.css'>\n";
        html += "</head>\n";
        html += "<body>\n";
        html += "<div id='hey'>\n";
        html += "<h1><a id='ava' href='/avaliacoesfunc'>Avaliações</a></h1>\n";
        html += "<h1><a id='cli' href='/clientesfunc'>Clientes</a></h1>\n";
        html += "<h1><a id='com' href='/comprasfunc'>Compras</a></h1>\n";
        html += "<h1><a id='ven' href='/vendasfunc'>Vendas</a></h1><br>\n";
        html += "<br>\n";
        html += "<h1><a id='fab' href='/fabricantesfunc'>Fabricantes</a></h1>\n";
        html += "<h1><a id='fun' href='/funcionariosfunc'>Funcionários</a></h1>\n";
        html += "<h1><a id='pro' href='/produtosfunc'>Produtos</a></h1>\n";
        html += "</div>";
        html += "<br><br>";
        html += "<a href= '/logout' id='fim_sessao2'> TERMINAR SESSÃO </a>";
        html += "<h2 id='avaa'>Avaliações</h2>\n";
        html += "<table>\n";
        html += "<tr><th>ID Avaliação</th><th>ID Cliente</th><th>ID Produto</th><th>Avaliação</th></tr>\n";
        for (var i = 0; i < result.length; i++) {
            html += "<tr><td>" + result[i].id_avaliacao + "</td><td>" + result[i].id_cliente + "</td><td>" + result[i].id_prod + "</td><td>" + result[i].avaliacao +"\n";
        }
        html += "</table>\n";
        html += fundo;
        
        res.send(html);
    });
});

site.get("/clientesfunc", function(req,res){
    var query = "SELECT id_cliente, nome_cliente, dn_cliente, morada_cliente, sexo_cliente, nc_cliente, mail_cliente, pass_cliente, nt_cliente from Clientes";
    runQuery(query, function(err, result, fields){
        var html = "";
        html += "<!DOCTYPE html>\n";
        html += "<html>\n";
        html += "<head>\n";
        html += "<title>Floco</title>\n";
        html += "<meta charset='utf8'>\n";
        html += "<link rel='stylesheet' href='prod.css'>\n";
        html += "</head>\n";
        html += "<body>\n";
        html += "<div id='hey'>\n";
        html += "<h1><a id='ava' href='/avaliacoesfunc'>Avaliações</a></h1>\n";
        html += "<h1><a id='cli' href='/clientesfunc'>Clientes</a></h1>\n";
        html += "<h1><a id='com' href='/comprasfunc'>Compras</a></h1>\n";
        html += "<h1><a id='ven' href='/vendasfunc'>Vendas</a></h1><br>\n";
        html += "<br>\n";
        html += "<h1><a id='fab' href='/fabricantesfunc'>Fabricantes</a></h1>\n";
        html += "<h1><a id='fun' href='/funcionariosfunc'>Funcionários</a></h1>\n";
        html += "<h1><a id='pro' href='/produtosfunc'>Produtos</a></h1>\n";
        html += "</div>";
        html += "<br><br>";
        html += "<a href= '/logout' id='fim_sessao2'> TERMINAR SESSÃO </a>";
        html += "<h2 id='cliee'>Clientes</h2>\n";
        html += "<table>\n";
        html += "<tr><th>ID Cliente</th><th>Nome Cliente</th><th>Data de Nascimento</th><th>Morada</th><th>Género</th><th>Nº Contribuinte</th><th>E-Mail</th><th>Password</th><th>Número de Telemóvel</th></tr>\n";
        for (var i = 0; i < result.length; i++) {
            html += "<tr><td>" + result[i].id_cliente + "</td><td>" + result[i].nome_cliente + "</td><td>" + result[i].dn_cliente +"</td><td>" + result[i].morada_cliente +"</td><td>" + result[i].sexo_cliente +"</td><td>" + result[i].nc_cliente +"</td><td>" + result[i].mail_cliente +"</td><td>" + result[i].pass_cliente +"</td><td>" + result[i].nt_cliente +"\n";
        }
        html += "</table>\n";
        
        html += fundo;
        res.send(html);
    });
});

site.get("/comprasfunc", function(req,res){
    var query = "SELECT id_compras, quant, id_prod, preco_compra, data_compra, id_func, id_fab from Compras";
    runQuery(query, function(err, result, fields){
        var html = "";
        html += "<!DOCTYPE html>\n";
        html += "<html>\n";
        html += "<head>\n";
        html += "<title>Floco</title>\n";
        html += "<meta charset='utf8'>\n";
        html += "<link rel='stylesheet' href='prod.css'>\n";
        html += "</head>\n";
        html += "<body>\n";
        html += "<div id='hey'>\n";
        html += "<h1><a id='ava' href='/avaliacoesfunc'>Avaliações</a></h1>\n";
        html += "<h1><a id='cli' href='/clientesfunc'>Clientes</a></h1>\n";
        html += "<h1><a id='com' href='/comprasfunc'>Compras</a></h1>\n";
        html += "<h1><a id='ven' href='/vendasfunc'>Vendas</a></h1><br>\n";
        html += "<br>\n";
        html += "<h1><a id='fab' href='/fabricantesfunc'>Fabricantes</a></h1>\n";
        html += "<h1><a id='fun' href='/funcionariosfunc'>Funcionários</a></h1>\n";
        html += "<h1><a id='pro' href='/produtosfunc'>Produtos</a></h1>\n";
        html += "</div>";
        html += "<br><br>";
        html += "<a href= '/logout' id='fim_sessao2'> TERMINAR SESSÃO </a>";
        html += "<h2 id='compp'>Compras</h2>\n";
        html += "<table>\n";
        html += "<tr><th>ID Compra</th><th>Quantidade</th><th>ID Produto</th><th>Preço</th><th>Data da Compra</th><th>ID Funcionário</th><th>ID Fabricantes</th></tr>\n";
        for (var i = 0; i < result.length; i++) {
            html += "<tr><td>" + result[i].id_compras + "</td><td>" + result[i].quant + "</td><td>" + result[i].id_prod +"</td><td>" + result[i].preco_compra +"</td><td>" + result[i].data_compra +"</td><td>" + result[i].id_func +"</td><td>" + result[i].id_fab +"\n";
        }
        html += "</table>\n";
       
        html += fundo;
        res.send(html);
    });
});


site.get("/vendasfunc", function(req,res){
    var query = "SELECT id_vendas, data_venda, id_cliente, preco_venda, id_prod from Vendas";
    runQuery(query, function(err, result, fields){
        var html = "";
        html += "<!DOCTYPE html>\n";
        html += "<html>\n";
        html += "<head>\n";
        html += "<title>Floco</title>\n";
        html += "<meta charset='utf8'>\n";
        html += "<link rel='stylesheet' href='prod.css'>\n";
        html += "</head>\n";
        html += "<body>\n";
        html += "<div id='hey'>\n";
        html += "<h1><a id='ava' href='/avaliacoesfunc'>Avaliações</a></h1>\n";
        html += "<h1><a id='cli' href='/clientesfunc'>Clientes</a></h1>\n";
        html += "<h1><a id='com' href='/comprasfunc'>Compras</a></h1>\n";
        html += "<h1><a id='ven' href='/vendasfunc'>Vendas</a></h1><br>\n";
        html += "<br>\n";
        html += "<h1><a id='fab' href='/fabricantesfunc'>Fabricantes</a></h1>\n";
        html += "<h1><a id='fun' href='/funcionariosfunc'>Funcionários</a></h1>\n";
        html += "<h1><a id='pro' href='/produtosfunc'>Produtos</a></h1>\n";
        html += "</div>";
        html += "<br><br>";
        html += "<a href= '/logout' id='fim_sessao2'> TERMINAR SESSÃO </a>";
        html += "<h2 id='vendd'>Vendas</h2>\n";
        html += "<table>\n";
        html += "<tr><th>ID Venda</th><th>Data Venda</th><th>ID Cliente</th><th>ID Produto</th><th>Preço Venda</th></tr>\n";
        for (var i = 0; i < result.length; i++) {
            html += "<tr><td>" + result[i].id_vendas + "</td><td>" + result[i].data_venda + "</td><td>" + result[i].id_cliente +"</td><td>"  + result[i].id_prod+ "</td><td>" + result[i].preco_venda+"</td></tr>" + "\n";
        }
        html += "</table>\n";
       
        html += fundo;
        res.send(html);
    });
});

site.get("/fabricantesfunc", function(req,res){
    var query = "SELECT id_fab, nome_fab, morada_fab, mail_fab, nt_fab  from Fabricantes";
    runQuery(query, function(err, result, fields){
        var html = "";
        html += "<!DOCTYPE html>\n";
        html += "<html>\n";
        html += "<head>\n";
        html += "<title>Floco</title>\n";
        html += "<meta charset='utf8'>\n";
        html += "<link rel='stylesheet' href='prod.css'>\n";
        html += "</head>\n";
        html += "<body>\n";
        html += "<div id='hey'>\n";
        html += "<h1><a id='ava' href='/avaliacoesfunc'>Avaliações</a></h1>\n";
        html += "<h1><a id='cli' href='/clientesfunc'>Clientes</a></h1>\n";
        html += "<h1><a id='com' href='/comprasfunc'>Compras</a></h1>\n";
        html += "<h1><a id='ven' href='/vendasfunc'>Vendas</a></h1><br>\n";
        html += "<br>\n";
        html += "<h1><a id='fab' href='/fabricantesfunc'>Fabricantes</a></h1>\n";
        html += "<h1><a id='fun' href='/funcionariosfunc'>Funcionários</a></h1>\n";
        html += "<h1><a id='pro' href='/produtosfunc'>Produtos</a></h1>\n";
        html += "</div>";
        html += "<br><br>";
        html += "<a href= '/logout' id='fim_sessao2'> TERMINAR SESSÃO </a>";
        html += "<h2 id='fabb'>Fabricantes</h2>\n";
        html += "<table>\n";
        html += "<tr><th>ID Facbricantes</th><th>Nome Fábrica</th><th>Morada</th><th>E-Mail</th><th>Número de Telefone</th></tr>\n";
        for (var i = 0; i < result.length; i++) {
            html += "<tr><td>" + result[i].id_fab + "</td><td>" + result[i].nome_fab + "</td><td>" + result[i].morada_fab +"</td><td>" + result[i].mail_fab +"</td><td>" + result[i].nt_fab +"\n";
        }
        html += "</table>\n";
        
        html += fundo;
        res.send(html);
    });
});

site.get("/funcionariosfunc", function(req,res){
    var query = "SELECT id_func, nome_func, dn_func, morada_func, nt_func, mail_func, pass_func from Funcionários";
    runQuery(query, function(err, result, fields){
        var html = "";
        html += "<!DOCTYPE html>\n";
        html += "<html>\n";
        html += "<head>\n";
        html += "<title>Floco</title>\n";
        html += "<meta charset='utf8'>\n";
        html += "<link rel='stylesheet' href='prod.css'>\n";
        html += "</head>\n";
        html += "<body>\n";
        html += "<div id='hey'>\n";
        html += "<h1><a id='ava' href='/avaliacoesfunc'>Avaliações</a></h1>\n";
        html += "<h1><a id='cli' href='/clientesfunc'>Clientes</a></h1>\n";
        html += "<h1><a id='com' href='/comprasfunc'>Compras</a></h1>\n";
        html += "<h1><a id='ven' href='/vendasfunc'>Vendas</a></h1><br>\n";
        html += "<br>\n";
        html += "<h1><a id='fab' href='/fabricantesfunc'>Fabricantes</a></h1>\n";
        html += "<h1><a id='fun' href='/funcionariosfunc'>Funcionários</a></h1>\n";
        html += "<h1><a id='pro' href='/produtosfunc'>Produtos</a></h1>\n";
        html += "</div>";
        html += "<br><br>";
        html += "<a href= '/logout' id='fim_sessao2'> TERMINAR SESSÃO </a>";
        html += "<h2 id='funcc'>Funcionários</h2>\n";
        html += "<table>\n";
        html += "<tr><th>ID Funcionários</th><th>Nome Funcionário</th><th>Data de Nascimento</th><th>Morada</th><th>Número de Telemóvel</th><th>E-Mail</th><th>Palavra Passe</th></tr>\n";
        for (var i = 0; i < result.length; i++) {
            html += "<tr><td>" + result[i].id_func + "</td><td>" + result[i].nome_func + "</td><td>" + result[i].dn_func +"</td><td>" + result[i].morada_func +"</td><td>" + result[i].nt_func +"</td><td>" + result[i].mail_func +"</td><td>" + result[i].pass_func +"\n";
        }
        html += "</table>\n";
        
        html += fundo;
        res.send(html);
    });
});


site.get("/produtosfunc", function(req,res){
    var query = "SELECT id_prod, nome_prod, edicao_prod, stock_prod, ref_prod, preco_compra, preco_venda from Produtos";
    runQuery(query, function(err, result, fields){
        var html = "";
        html += "<!DOCTYPE html>\n";
        html += "<html>\n";
        html += "<head>\n";
        html += "<title>Floco</title>\n";
        html += "<meta charset='utf8'>\n";
        html += "<link rel='stylesheet' href='prod.css'>\n";
        html += "</head>\n";
        html += "<body>\n";
        html += "<div id='hey'>\n";
        html += "<h1><a id='ava' href='/avaliacoesfunc'>Avaliações</a></h1>\n";
        html += "<h1><a id='cli' href='/clientesfunc'>Clientes</a></h1>\n";
        html += "<h1><a id='com' href='/comprasfunc'>Compras</a></h1>\n";
        html += "<h1><a id='ven' href='/vendasfunc'>Vendas</a></h1><br>\n";
        html += "<br>\n";
        html += "<h1><a id='fab' href='/fabricantesfunc'>Fabricantes</a></h1>\n";
        html += "<h1><a id='fun' href='/funcionariosfunc'>Funcionários</a></h1>\n";
        html += "<h1><a id='pro' href='/produtosfunc'>Produtos</a></h1>\n";
        html += "</div>";
        html += "<br><br>";
        html += "<a href= '/logout' id='fim_sessao2'> TERMINAR SESSÃO </a>";
        html += "<h2 id='proo'>Produtos</h2>\n";
        html += "<table>\n";
        html += "<tr><th>ID Produto</th><th>Nome Produto</th><th>Edição do Produto</th><th>Stock</th><th>Referência</th><th>Preço Compra</th><th>Preço Venda</th></tr>\n";
        for (var i = 0; i < result.length; i++) {
            html += "<tr><td>" + result[i].id_prod + "</td><td>" + result[i].nome_prod + "</td><td>" + result[i].edicao_prod +"</td><td>" + result[i].stock_prod +"</td><td>" + result[i].ref_prod +"</td><td>" + result[i].preco_compra +"</td><td>" + result[i].preco_venda+"\n";
        }
        html += "</table>\n";
        
        html += fundo;
        res.send(html);
    });
});

// função para a execução das queries, garantindo que o código que depende dos seus resultados aguarda pelos mesmos
function runQuery(query, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
        }
        connection.query(query, function (err, result, fields) {
            if (err) {
                console.error(err);
            }
            connection.release();
            return callback(err, result, fields);
        });
    });
}