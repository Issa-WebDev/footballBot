// ===============  HTML ELEMENTS ===============================================================
const userInput = document.getElementById("user-input");
const chatBox = document.querySelector(".chat-box");
const btnMode = document.getElementById("mode");
const submit = document.getElementById("submit");

// ==============  CHANGER DE MODE  ==================================================================
btnMode.addEventListener("click", () => {
  if (document.body.classList.contains("darkmode")) {
    document.body.classList.remove("darkmode");
    btnMode.textContent = "dark";
  } else {
    document.body.classList.add("darkmode");
    btnMode.textContent = "light";
  }
});

// ========== ENVOIE DE LA QUESTION ================================================================
submit.addEventListener("click", (event) => {
  event.preventDefault();
  if (userInput.value.trim()) {
    document.querySelector(".welcome").style.display = "none";
    chatBox.classList.add("chatbx");
    displayContent();
    userInput.value = "";
  }
});
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    submit.click();
  }
});

// ========== AVOIR LA REPONSE DE L'API ==========================================================
async function getResponse() {
  const apiKey = "AIzaSyAmzItPdnxMCDJnI8GohFnz3AS9-M6gavA";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `
              Tu es un expert en football, et ta seule mission est de répondre aux questions strictement liées au football.
              Réponds uniquement aux questions sur le football, sans exception. Si la question n’est pas liée au football, réagis avec une réponse générique du type "Je suis ici pour répondre aux questions sur le football uniquement."
              Sois factuel et concis : chaque réponse doit se limiter à l'essentiel, sans ajout d'opinions personnelles, d'interprétations ou d'informations non vérifiées.
              Privilégie les statistiques : lorsque des chiffres ou des données sont demandés, utilise les chiffres exacts et les informations les plus récentes disponibles.
              Ne donne aucune analyse personnelle ou opinion subjective : les réponses doivent être purement objectives, basées sur des faits historiques ou des données de matchs.
              Ton strict et professionnel : parle de manière formelle et évite les familiarités ou le jargon excessif.
              Si une question concerne plusieurs aspects du football, réponds de manière séquencée pour aborder chaque point avec précision.
              Si une question n'a pas de réponse claire ou est ambiguë, indique clairement que la réponse n'est pas disponible ou est incertaine, plutôt que de spéculer.
              Ne dévie jamais du sujet du football : même si une question est proche, reste focalisé sur le sport, ne t'aventure pas à donner des conseils généraux ou personnels.

              dans tes reponse tu peux mettre des emoji aussi pour faire plus beau en fonctions des mots

          `,
          },
          { text: userInput.value },
        ],
      },
    ],
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

// ============= FORMATAGE DE LA REPONSE DE L'AI ====================================================
function formatResponse(text) {
  //  Mettre les numéros en gras
  text = text.replace(/^(\d+)\.\s+/gm, "<strong>$1-</strong> ");
  //  Mettre les noms des joueurs en gras (tout ce qui est entre **)
  text = text.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
  //  Ajouter des balises <p> autour du texte pour chaque paragraphe
  text = text.replace(/\n/g, "</p><p style='margin-bottom: 10px'>");
  //  Encapsuler le texte entier dans une balise <p>
  return "<p>" + text + "</p>";
}

// ========= AFFICHAGE DES MESSAGES ===============================================================
async function displayContent() {
  const userMessage = document.createElement("div");
  userMessage.className = "message-user user";
  userMessage.innerHTML = `<div class="message-content">${userInput.value}</div><i class="fa-solid fa-circle-user"></i>`;
  chatBox.appendChild(userMessage);

  chatBox.scrollTop = chatBox.scrollHeight; 

  const botMessage = document.createElement("div");
  botMessage.className = "message-bot bot";


  // =================  GESTION DES ERREUR AVEC TRY/CATCH ==========================================
  try {
    const result = await getResponse();
    console.log(result);
    if (result && result.candidates && result.candidates.length > 0) {
      const response = result.candidates[0].content.parts[0].text;

      let formattedResponse = formatResponse(response);

      let index = 0;
      setTimeout(() => {
        chatBox.appendChild(botMessage);

        const intervalId = setInterval(() => {
          botMessage.innerHTML = `<i class="fa-solid fa-robot"></i><div class="message-content">${formattedResponse.slice(
            0,
            index++
          )}</div>`;
          chatBox.scrollTop = chatBox.scrollHeight; 
          if (index > formattedResponse.length) {
            clearInterval(intervalId);
          }
        }, 10);
      }, 80);
    } else {
      botMessage.innerHTML = `<i class="fa-solid fa-robot"></i><div class="message-content" id="error">une erreur s'est produite</div>`;
      chatBox.appendChild(botMessage);
    }
  } catch (error) {
    botMessage.innerHTML = `<div class="message-content" id="error>Erreur: ${error.message}</div>`;
    chatBox.appendChild(botMessage);
  }
}

// ====================== FIN DE CODE ==============================================================
