# exercice
## Énoncé 

Concevoir et implémenter un squelette de portail multi-applications avec Vert.x 3 en
javascript ou typescript. Pour simplifier l’utilisation de vertx en Javascript ou Typescript, vous
pouvez utiliser le projet ES4X .

Aide
* https://reactiverse.io/es4x/
* https://vertx.io/docs/
* https://vertx.io/docs/vertx-core/js/#_verticles
* https://vertx.io/docs/vertx-core/js/#event_bus
* https://vertx.io/docs/vertx-core/js/#_writing_http_servers_and_clients

Fonctionnalités attendues
* un dispositif de gestion du cycle de vie d'une application (démarrage, arrêt, emission
d’un événement)
* un menu dynamique d'accès aux applications
* 3 applications simplissimes
    * 1 app pour saisir son nom
    * 1 app pour charger une photo
    * 1 app "fil d’activités" qui affiche les événements émis par les autres
applications. (En l'occurrence le changement de nom et le changement de
photo)

■ L’affichage d’une nouvelle notification ne devra pas nécessiter de
rechargement de la page.

● Bonus (facultatif)

○ Dans le cas où le navigateur qui affiche le “fil d’activités” est fermé. Il serait
intéressant lorsqu’on ré-ouvre le “fil d’activités” de voir les événements qui se
sont produits pendant que le navigateur était fermé. C.a.d. que les
événements devraient pouvoir être renvoyés avec comme point de départ le
dernier événement reçu par le navigateur.

À concevoir et implémenter

* les modèles et structures fondamentales de données
* le packaging d'application + la gestion du cycle de vie minimale (démarrage, arrêt)
* la diffusion d'événements
* l'extensibilité du système (à prévoir, pas à implémenter)

Remarque : l’IHM peut être minimaliste (ex : un menu de navigation entre les applications)
Livrables

* une implémentation avec Vert.x 3 en utilisant Javascript ou ES4X en Javascript ou
Typescript
* un texte d'explication de vos choix de conception et d'implémentation
Remarques :
* l’implémentation peut être rudimentaire
* Le code doit être livré sous forme d'une archive zip ou via un dépôt git (github, gitlab,
serveur personnel ...)

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

Le source du front se trouve dans le répertoire /client

Côté front, le mécanisme utilisé est l'utilisation du ComponentResolverFactory afin de créer dynamiquement les widgets dans le DOM.

Une souscription au bus de données permet également d'être notifié des informations en temps réel côté back.

Pour créer un nouveau Widget, le composant Angular doit :
* être créé dans le répertoire src/app/widgets
* étendre la classe abstraite *Widget* (celle du front, pas celle du back)
* être déclaré dans le tableau des widgets situé dans le fichier __widgetsList.ts__
* implémenter la propriété statique *widgetName*

Chaque widget devrait auto-porter les services dépendants, ce qui permet une modularité fonctionnelle de l'application.
Le moteur de widgets est déjà codé.