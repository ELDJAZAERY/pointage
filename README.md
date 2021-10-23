## Node.js/Typescript  API server - [Système de pointage](./docs/Test_descriptions.md)

Il s'agit d'un serveur Node.js express avec typescript basé sur l'architecture modulaire, où chaque feature a son propre module de 3 couches, modèles (pour toute communication avec la base de données), service (représente la couche métier), contrôleur (l'interface qui expose les services au client final comme une API REST FULL).

Cette solution prend en compte certaines anomalies telles que 
- le cas le plus courant, lorsque le marqueur détecte une caisse deux fois de suite par erreur.
- l'employé fait un check-in après avoir oublié de faire un check-out 
- l'employé fait un check-out après avoir oublié de faire un check-in. 

## Doumentations

[API DOCS](https://abc-pointage.herokuapp.com/api/v1/api-docs/#/)


## La structure de fichiers

[structure de fichiers](./docs/files.structur.txt)

## Requirements

- NodeJS 12+
- Typescript ^4.\*
- PostgreSQL 11.X

OR 

- Docker 
- Docker-compose

## Dependencies

- Express ^4.\*
- Express-async-errors
- TypeORM
- Jest
- cors : "^2.8.5"
- class-transformer : "^0.2.3"
- class-validator : "^0.10.0"

## Installation

```
 yarn install

 OR

 npm run install

 OR

 mad install
```

## RUN APP

```

yarn start

OR 

npm run strat

OR 

make start
```

## RUN TESTS

```
yarn test

OR

npm run test

OR

mad test
```

## RUN TESTS COVERAGE

```
yarn coverage

OR

yarn run coverage

OR

mad coverage
```
