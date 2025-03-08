**Documentation du Projet Chatbot sur le Football**

# Introduction
Ce projet est un chatbot permettant d'obtenir des informations sur le football. Il utilise une API d'intelligence artificielle pour répondre aux questions des utilisateurs sur ce sujet. Le chatbot est développé avec HTML, CSS et JavaScript et fonctionne avec l'API de Gemini pour générer des réponses automatiques.

# Technologies Utilisées
- **HTML** : Structure de la page web.
- **CSS** : Mise en page et design du chatbot.
- **JavaScript** : Interaction avec l'utilisateur et gestion des requêtes API.
- **API Gemini** : Fournit des réponses automatisées basées sur les questions posées par l'utilisateur.

# Fonctionnalités Principales
1. **Interface utilisateur moderne** :
   - Un champ de saisie pour poser des questions.
   - Une zone d'affichage des messages échangés.
   - Une bannière d'illustration.

2. **Interaction avec l'utilisateur** :
   - L'utilisateur entre une question sur le football.
   - Le chatbot affiche la question et envoie une requête à l'API.
   - La réponse est affichée progressivement dans la boîte de dialogue.

3. **Gestion des erreurs** :
   - Si l'API ne répond pas, un message d'erreur est affiché.
   - Les questions hors sujet ne reçoivent pas de réponse.

# Structure du Code
### **1. HTML (index.html)**
- Contient la structure de la page web.
- Intègre la bannière, le champ de saisie et la boîte de chat.
- Charge les fichiers CSS et JavaScript.

### **2. CSS (style.css)**
- Définit le style du chatbot (couleurs, polices, animations).
- Gère l'affichage des messages utilisateur et chatbot.
- Assure une mise en page responsive.

### **3. JavaScript (script.js)**
- Gère l'envoi des questions et la réception des réponses.
- Communique avec l'API Gemini.
- Affiche les messages utilisateur et chatbot.
- Implémente un effet d'affichage progressif des réponses.

# Explication du Fonctionnement
1. L'utilisateur entre une question et clique sur "Envoyer".
2. Le message est affiché dans la boîte de chat.
3. Un message d'attente est affiché en attendant la réponse de l'API.
4. Une requête est envoyée à l'API Gemini avec la question.
5. L'API renvoie une réponse structurée.
6. La réponse est affichée progressivement à l'écran.
7. Si une erreur survient, un message d'erreur est affiché.


# Conclusion
Ce projet de chatbot sur le football est une application interactive qui permet d'obtenir des réponses rapides et précises sur le sujet. Grâce à l'utilisation de JavaScript et de l'API Gemini, il offre une expérience utilisateur fluide et intuitive. Il peut être enrichi avec de nouvelles fonctionnalités pour améliorer son interactivité et sa pertinence.



