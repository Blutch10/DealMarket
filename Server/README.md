# Etapes pour développement du serveur en Node.js

1. Installer Node.js : https://nodejs.org/en/download/
1. Dans la console, se placer dans le répertoire Server.
1.Taper : npm install (ça devrait installer les dépendances du projet qui sont indiquées dans cnfig.json)
1. Pour lancer l'application : npm start (le module nodemon installé relance le serveur automatiquement après chaque sauvegarde Ctrl+S)
1. Pour tester le serveur : CURL ou bien Postman

# Sur le code

* Les parties du code encore à faire sont indiquées par des commentaires ToDo.
* Les parties du code présentes uniquement pour le debug sont indiquées par des commentaires DEBUG.

# Ce qu'il faut faire

* Faire du "input sanitation" pour la sécurité
* Stocker les mots de passe sous forme de hash et salt
