// Sélection des éléments HTML nécessaires
const userInput = document.getElementById("user-input"); // Champ où l'utilisateur tape son message
const chatBox = document.querySelector(".chat-box"); // Zone où s'affichent les messages
const btnMode = document.getElementById("mode");
const submit = document.getElementById("submit");

// change mode
btnMode.addEventListener("click", () => {
  if (document.body.classList.contains("darkmode")) {
    document.body.classList.remove("darkmode");
    btnMode.textContent = "dark";
  } else {
    document.body.classList.add("darkmode");
    btnMode.textContent = "light";
  }
});

// Fonction pour envoyer la question à l'API et obtenir une réponse
async function getResponse() {
  const apiKey = "AIzaSyAmzItPdnxMCDJnI8GohFnz3AS9-M6gavA"; // clé API
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  // Création de l'objet qui contient la question et les instructions pour l'IA
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

              dans tes reponse tu peux mettre des emoji aussi pour faire plus beau
          `,
          },
          { text: userInput.value }, // Ajoute la question de l'utilisateur
        ],
      },
    ],
  };

  try {
    // Envoi de la requête à l'API
    const response = await fetch(apiUrl, {
      method: "POST", // Méthode HTTP pour envoyer des données
      headers: { "Content-Type": "application/json" }, // Indique que l'on envoie du JSON
      body: JSON.stringify(requestBody), // Convertit l'objet JS en JSON
    });
    const result = await response.json(); // Convertit la réponse en objet JS
    return result;
  } catch (error) {
    console.log(error); // Affiche l'erreur dans la console si quelque chose ne va pas
  }
}

// Gestion de l'événement d'envoi du formulaire
submit.addEventListener("click", (event) => {
  event.preventDefault(); // Empêche le rechargement de la page
  if (userInput.value.trim()) {
    document.querySelector(".welcome").style.display = "none";
    chatBox.classList.add("chatbx");
    displayContent();
  } // Affiche le message de l'utilisateur et attend la réponse
});

userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // Empêche le retour à la ligne
    submit.click(); // Simule un clic sur le bouton submit
  }
});

// Fonction pour formater la réponse de manière élégante
function formatResponse(text) {
  // 1. Mettre les numéros en gras
  text = text.replace(/^(\d+)\.\s+/gm, "<strong>$1-</strong> ");

  // 2. Mettre les noms des joueurs en gras (tout ce qui est entre **)
  text = text.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

  // 3. Ajouter des balises <p> autour du texte pour chaque paragraphe
  text = text.replace(/\n/g, "</p><p style='margin-bottom: 10px'>");

  // 4. Encapsuler le texte entier dans une balise <p>
  return "<p>" + text + "</p>";
}

// Fonction pour afficher le message de l'utilisateur et la réponse du bot
async function displayContent() {
  // Création du message utilisateur et ajout à la boîte de chat
  const userMessage = document.createElement("div");
  userMessage.className = "message-user user";
  userMessage.innerHTML = `<div class="message-content">${userInput.value}</div><i class="fa-solid fa-circle-user"></i>`;
  chatBox.appendChild(userMessage);

  // Création d'un message temporaire du bot (il affichera "..." en attendant la réponse)
  const botMessage = document.createElement("div");
  botMessage.className = "message-bot bot";
  botMessage.innerHTML = `<i class="fa-solid fa-robot"></i><div class="message-content">loading ...</div>`;
  chatBox.appendChild(botMessage);

  chatBox.scrollTop = chatBox.scrollHeight; // Fait défiler la boîte de chat vers le bas

  try {
    const result = await getResponse(); // Attend la réponse de l'API
    console.log(result);
    if (result && result.candidates && result.candidates.length > 0) {
      const response = result.candidates[0].content.parts[0].text; // Récupère la réponse texte

      // Formate la réponse avant de l'afficher
      let formattedResponse = formatResponse(response);

      let index = 0;
      // Affichage progressif de la réponse, lettre par lettre
      const intervalId = setInterval(() => {
        botMessage.innerHTML = `<i class="fa-solid fa-robot"></i><div class="message-content">${formattedResponse.slice(
          0,
          index++
        )}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight; // Fait défiler la boîte de chat vers le bas
        if (index > formattedResponse.length) {
          clearInterval(intervalId); // Arrête l'affichage progressif quand tout est affiché
        }
      }, 10);
    } else {
      // Si l'IA ne répond pas correctement, affiche un message d'erreur formaté
      botMessage.innerHTML = `<div class="message-content">Je n'ai pas compris la question, mais assure-toi que ta question porte sur le football.</div>`;
    }

    chatBox.appendChild(botMessage);
  } catch (error) {
    // En cas d'erreur, affiche un message d'erreur formaté
    chatBox.removeChild(botMessage);
    botMessage.innerHTML = `<div class="message-content">Erreur: ${error.message}</div>`;
    chatBox.appendChild(botMessage);
  }

  userInput.value = ""; // Vide le champ de saisie après l'envoi
}
