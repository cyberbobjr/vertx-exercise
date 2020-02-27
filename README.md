# exercice

## Pré-requis
Assurez-vous d'avoir [node](https://www.nodejs.org) installé.
[GraalVM](https://www.graalvm.org) est optionnel.

## Build

Utilisez votre gestionnaire de paquets pour constuire l'application :

```sh
npm install
```

ou

```sh
yarn install
```

## Lancement

```sh
npm start
```

L'application est disponible sur http://localhost:8080

### Architecture

#### Côté back
La classe "Application" est chargée de gérer l'initialisation de l'application, des widgets et le bus de données.

Chaque widget côté back respecte une interface d'initialisation (basée sur une classe abstraite).

La liste des widgets à initialiser est statique, mais peut être embarquée dans une BDD par exemple.

Au démarrage, l'application charge les widgets, puis les initialise un par un pour la prise en compte des routes.

Cette gestion des widgets est assurée par la classe WidgetManager.

Chaque widget est autonome dans sa gestion de ses routes. La classe de base initialise les routes prises en compte à partir d'un tableau de route interne à chaque Widget. Chaque widget possède également son propre prefixe de route.

Le WidgetManager est lui-même un widget :) ce qui permet de lancer ou stopper des widgets.

Stopper ou lancer un widget ne change que l'état interne d'un widget, mais on peut imaginer tout un workflow.

__Création d'un widget__

Les widgets se trouvent dans le répertoire src/apps

Le widget doit étendra la classe *Widget* et implémenter les 3 propriétés suivantes :

```
 static appName: string = 'ActivityComponent'; // Nom du component côté Front
 protected rootApiUrl: string = '/activity'; // préfixe de l'url du widget
 protected routes: Array<AppRoute> = [
        {path: '/', method: HttpMethod.GET, handler: this.getLogs.bind(this)}, 
    ]; // tableau contenant les définitions des routes prises en charge par le widget
```

la méthode handler prends en paramètre l'objet *RoutingContext* afin de récupérer les informations de la requête ou la réponse.
Le résultat de la requête est de type *any*, elle peut renvoyer ce qu'elle veut, le résultat sera converti en JSON.


## Côté front

Côté front, le mécanisme utilisé est l'utilisation du ComponentResolverFactory afin de créer dynamiquement les widgets dans le DOM.

Une souscription au bus de données permet également d'être notifié des informations en temps réel côté back.

A suivre...