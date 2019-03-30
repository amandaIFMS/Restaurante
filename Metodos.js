var config = {
    apiKey: "AIzaSyBnWEfzlEZdszOYxZ6xKvsmN5S0d4YpVAc",
    authDomain: "pedidos-8aa31.firebaseapp.com",
    databaseURL: "https://pedidos-8aa31.firebaseio.com",
    projectId: "pedidos-8aa31",
    storageBucket: "pedidos-8aa31.appspot.com",
    timestampsInSnapshots: true
}

const fire = firebase.initializeApp(config)
const firestore = firebase.firestore()

console.log(firebase);

function capturar_pedido() {
    var end = document.querySelector("#end").value;
    var cel = document.querySelector("#cel").value;
    var ema = document.querySelector("#email").value;

    var dados = {
        endereço: end,
        celular: cel,
        email: ema

    };

    console.log(dados);
    var pedidos = document.querySelectorAll(".pedir");
    var item = ""
    var preco = 0
    var quant
    var pedido = {
        precoTotal: 0,
        items: [],
        forma_pag: null
    }
    for (var i = 0; i < pedidos.length; i++) {
        var quantidade = pedidos[i].querySelector('input').value
        quant = parseInt(quantidade)
        if (quant > 0) {
            pre = pedidos[i].querySelector('.preço').textContent
            preco = parseFloat(pre) * quant
            item = quant + "  " + pedidos[i].querySelector('.item').textContent;
            pedido.items += item + ", "
            pedido.precoTotal += preco;
        } else if (quant < 0) {
            alert("apenas pedidos positivos rsrs")
        }
    }
    var forma;
    if (document.getElementById('dinheiro').checked == true) {
        forma = document.getElementById('dinheiro').value;

    } else if (document.getElementById('cheque').checked = true) {
        forma = document.getElementById('cheque').value;

    } else if (document.getElementById('debito').checked = true) {
        forma = document.getElementById('debito').value;

    } else if (document.getElementById('credito').checked = true) {
        forma = document.getElementById('credito').value;
    }
    pedido.forma_pag = forma
    console.log(pedido)
    var texto = pedido.items;
    var confirma = confirm("Endereço: " + dados.endereço + "\n\nItens: " + texto + "\n\nValor total: R$" + pedido.precoTotal + ",00" + "\n\nForma de pagamento: " + pedido.forma_pag)
    if (confirma == true) {
        var pedido_completo = {
            pedido: pedido,
            dados: dados
        }
        firebase.database().ref('pedidos').push(pedido_completo);
    } else {
        alert("Altere os dados para confirmar o pedido")

    }
};

function mostrarDados() {
    var banco = firebase.database().ref().child("pedidos");
    banco.on("child_added", snap => {
        var obj_p = snap.child("pedido").val();
        var obj_d = snap.child("dados").val();
        console.log(obj_p);
        console.log(obj_d);
        var div = document.createElement('div')
        div.className = "informaçoes"
        var p = document.createElement('p')
        var text_i = document.createTextNode("Pedido: " + obj_p.items)
        var text_p = document.createTextNode("Valor Total: R$" + obj_p.precoTotal + ",00")
        var text_f = document.createTextNode("Forma de pagamento: " + obj_p.forma_pag)
        p.appendChild(text_i)
        div.appendChild(p)
        var p = document.createElement('p')
        p.appendChild(text_p)
        div.appendChild(p)
        var p = document.createElement('p')
        p.appendChild(text_f)
        div.appendChild(p)
        document.getElementById('essa').appendChild(div)
        var text_e = document.createTextNode("Endereço: " + obj_d.endereço)
        var text_c = document.createTextNode("Celular: " + obj_d.celular)
        var text_em = document.createTextNode("Email: " + obj_d.email)
        p2 = document.createElement('p')
        p2.appendChild(text_e)
        div.appendChild(p2)
        p2 = document.createElement('p')
        p2.className ="cel"
        p2.appendChild(text_c)
        div.appendChild(p2)
        p2 = document.createElement('p')
        p2.className = "email"
        p2.appendChild(text_em)
        div.appendChild(p2)
        document.getElementById('essa').appendChild(div)
        // document.getElementById("botão").addEventListener("click", excluir);
    })
}
// function excluir(obj_d) {
//     var banco = firebase.database().ref().child("pedidos");
//     banco.on("child_removed", snap => {
//         var obj_p = snap.child("pedido").val();
//         var obj_d = snap.child("dados").val();
//         console.log(obj_p);
//         console.log(obj_d);
//         var cel = document.createTextNode(obj_d.celular)
//         console.log(cel)
//         ref = '/pedidos/' +cel
//         var excluir = firebase.database().ref(ref).remove(obj_d);

//     })

// }