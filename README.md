# Cómo configurar un proyecto Node con Typescript

## 1. Crear el proyecto

A continuación, inícielo como proyecto npm:

```bash
npm init -y
```

## 2. Instalar dependencias

Con un proyecto npm vacío iniciado, el siguiente paso es instalar las dependencias que se necesitan para ejecutar TypeScript.

Ejecute los siguientes comandos desde el directorio de su proyecto para instalar las dependencias:

```bash
npm i -D typescript @types/node ts-node nodemon
```

Ahora es el momento de instalar el marco Express:

```bash
    npm i express
    npm i -D @types/express
```

El segundo comando instala los tipos de Express para la compatibilidad con TypeScript. Los Tipos de TypeScript son archivos, normalmente con una extensión .d.ts. Los archivos se usan para proporcionar información de tipo sobre una API, en este caso el marco Express.

Este paquete es necesario porque TypeScript y Express son paquetes independientes. Sin el paquete @typ/express, no hay forma de que TypeScript sepa sobre los tipos de clases Express.

## 3. Crear el archivo de configuración de Typescript

```bash
npx tsc --init
```

## 4. Configurar el archivo tsconfig.json

En esta sección, configurará TypeScript y configurará un linting para TypeScript. TypeScript utiliza un archivo llamado tsconfig.json para configurar las opciones del compilador para un proyecto. Cree un archivo tsconfig.json en la raíz del directorio del proyecto y péguelo en el siguiente fragmento de código:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "lib": ["es2015"]
}
```

Vamos a repasar algunas de las claves del fragmento de código JSON anterior:

module: Especifica el método de generación de código del módulo. Node utiliza commonjs.
target: Especifica el nivel de lenguaje de salida.
moduleResolution: Esto ayuda al compilador a averiguar a qué se refiere una importación. El valor node imita al mecanismo de resolución del módulo de Node.
outDir: Esta es la ubicación para los archivos .js tras la transpilación. En este caso, lo guardará como dist.

## 5. Crear el script de ejecución

A continuación, agregue un script de ejecución a package.json. Abra package.json y agregue el siguiente fragmento de código al objeto scripts:

```json
"scripts": {
    "start": "npx nodemon src/index.ts"
  },
```

Ahora puede ejecutar el script de inicio con el siguiente comando:

```bash
npm start
```
