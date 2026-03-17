function abrirModal() {
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;

  if (!nome || !cpf) {
    alert("Preencha nome e CPF");
    return;
  }

  document.getElementById("modal").classList.remove("hidden");
}

function fecharModal() {
  document.getElementById("modal").classList.add("hidden");
}

function gerarDocumento() {
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;

  const lesao = document.getElementById("lesao").checked;
  const boletim = document.getElementById("boletim").checked;
  const culpa = document.getElementById("culpa").checked;

  let texto = "";

  texto += `Cliente: ${nome}\nCPF: ${cpf}\n\n`;

  texto += "DOS FATOS\n";
  texto += `${nome} esteve envolvido em um acidente de trânsito.\n`;

  if (lesao) {
    texto += "O acidente resultou em lesões corporais.\n";
  }

  if (boletim) {
    texto += "Foi registrado boletim de ocorrência.\n";
  }

  texto += "\n";

  texto += "DA RESPONSABILIDADE\n";

  if (culpa) {
    texto += "Fica evidente a culpa do réu pelo ocorrido.\n";
  } else {
    texto += "A responsabilidade será apurada no decorrer do processo.\n";
  }

  texto += "\n";

  texto += "DOS PEDIDOS\n";
  texto += "Diante do exposto, requer a devida indenização.\n";

  if (lesao) {
    texto += "Incluindo danos decorrentes das lesões sofridas.\n";
  }

  document.getElementById("resultado").innerText = texto;

  fecharModal();
}
