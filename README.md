# FootballBot - Chatbot sur le Football ⚽

**FootballBot** est un chatbot interactif conçu pour répondre à toutes vos questions liées au football. Que ce soit des informations sur les joueurs, les équipes, les matchs ou les statistiques FootballBot est là pour vous fournir des réponses précises et concises.

---

## Fonctionnalités 🚀

1. **Réponses factuelles et précises** : FootballBot utilise l'API Gemini pour fournir des réponses basées sur des faits et des statistiques.
2. **Interface conviviale** : Une interface utilisateur simple et intuitive pour interagir avec le chatbot.
3. **Mode sombre/clair** : Basculez entre le mode sombre et le mode clair pour un confort visuel optimal.
4. **Réponses en temps réel** : Les réponses sont affichées progressivement pour une expérience utilisateur fluide.
5. **Restriction au football** : Le chatbot est strictement conçu pour répondre aux questions sur le football. Si la question n'est pas liée au football, il vous le fera savoir.

---

## Technologies utilisées 🛠️

- **HTML** : Structure de la page web.
- **CSS** : Style et mise en page, y compris le mode sombre/clair.
- **JavaScript** : Gestion des interactions utilisateur et communication avec l'API Gemini.
- **API Gemini** : Utilisée pour générer des réponses intelligentes et précises sur le football.

---

## Comment utiliser FootballBot ? 🤖

1. **Ouvrez le projet** : Ouvrez le fichier `index.html` dans votre navigateur.
2. **Posez votre question** : Tapez votre question dans la zone de texte en bas de la page.
3. **Envoyez la question** : Cliquez sur le bouton d'envoi ou appuyez sur `Entrée` pour obtenir une réponse.
4. **Basculer le mode** : Utilisez le bouton en haut à droite pour basculer entre le mode sombre et le mode clair.

---

## Structure du projet 📂

footballbot/

- ├── index.html
- ├── style.css
- ├── script.js
- ├── images/
- │ ├── lightbg.jpg
- │ └── darkbg.jpg

---

## Ressources utilisées 📚

- **API Gemini** : Pour générer des réponses intelligentes. [Documentation de l'API Gemini](https://ai.google.dev/gemini-api/docs/api-key)
- **Google Fonts** : Utilisation de la police "Poppins"
- **Font Awesome** : Pour les icônes utilisées dans l'interface.
- **Images d'arrière-plan** : Utilisées pour les modes clair et sombre.

---

## Installation et configuration ⚙️

1. **Cloner le projet** :

```bash
	git clone https://github.com/Issa-WebDev/footballBot.git
```

2. **Ouvrir le projet** :

- Ouvrez le dossier du projet dans votre éditeur de `code`.
- Ouvrez le fichier `index.html` dans votre navigateur.

3. **Configurer l'API** :

Remplacez la clé API dans le fichier `script.js` par votre propre clé API Gemini :

```javascript
const apiKey = "VOTRE_CLE_API";
```

---

## Exemples de questions ❓

- Qui a remporté la Coupe du Monde 2022 ?
- Qui est le meilleur buteur de l histoire de la Champions League ?

## Explication du code 💻

### HTML `(index.html)`

Le fichier HTML structure la page web. Il contient :

- Un en-tête avec le titre du chatbot et un `bouton` pour basculer entre le mode sombre et clair.
- Une zone principale `(main)` pour afficher les messages du chatbot et de l'utilisateur.
- Un `formulaire` pour saisir les questions.
- Un `pied` de page avec les crédits.

### CSS `(style.css)`

Le fichier CSS gère le style et la mise en page :

- **Mode sombre/clair** : Utilisation de variables CSS (`:root` et `.darkmode`) pour gérer les couleurs et les images d'arrière-plan.
- **Disposition** : Flexbox est utilisé pour aligner les éléments de manière responsive.
- **Animations** : Transition douce pour le changement de mode et l'affichage des messages.

### JavaScript `(script.js)`

Le fichier JavaScript gère la logique du chatbot :

- **Changement de mode** : Un écouteur d'événement sur le bouton #mode permet de basculer entre le mode sombre et clair en ajoutant/supprimant la classe `.darkmode` sur le body.

- **Envoi des questions** : Lorsque l'utilisateur envoie une question (via le bouton ou la touche Entrée), la fonction `getResponse()` est appelée.

  - Cette fonction envoie la question à l'`API Gemini` et récupère la réponse.

- **Affichage des messages** : Les messages de l'utilisateur et du chatbot sont ajoutés dynamiquement à la zone de chat `(chat-box)`.

  - Les réponses du chatbot sont affichées progressivement (avec `setInterval()` et `slice()`) pour une expérience plus interactive.

- **Formatage des réponses** : La fonction `formatResponse()` formate les réponses pour améliorer la lisibilité :

  - Les numéros sont mis en gras.
  - Les noms des joueurs (entre \*\*) sont mis en gras.
  - Les paragraphes sont séparés par des balises <p>.

- **Gestion des erreurs** : En cas d'erreur (par exemple, si l'API ne répond pas), un message d'erreur est affiché.

# Aperçu du projet 🖼️

### Interface de FootballBot en mode clair.

![Aperçu de FootballBot](/thums/footballBot-lightMode.png)

### Interface de FootballBot en mode sombre.

![Aperçu de FootballBot](/thums/footballBot-darkMode.png)

# Auteur 👤

- **KONE ISSA**
  Projet réalisé dans le cadre de la formation Simplon CI 2025.

# Licence 📜

Ce projet est sous licence MIT. Pour plus de détails, consultez le fichier LICENSE.

# bonne journée a vous ✅❤️‍🔥
