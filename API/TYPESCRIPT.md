## Convertir a TS
tsc --init -> creaa tsconfig.json
ponemos algunas variables en tsconfig.json
yarn add tslint
sudo ./node_modules/.bin/tslint --init -> crea tslint.json
yarn add @types/node
yarn add @types/express
yarn add ts-node -> compila los .ts por mi pero es lento para producccion (Max no lo usa)

var express = require('express');
import  {Express,NextFunction,Request, Response} from 'express';
## creamos types/index.d.ts -> declare global { var db: Pool;}export {};
  const updatedText = (req.body as { text: string }).text; //req.body.text es un string al enviarlo

  #### FALTA POR HACER
  -Tipo del valor de retorno de cada función
  - Variables Function a los let, var y const.
  -fichero externo con los tipos exportables.

