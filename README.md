# aprende-ya


## Como usar con docker

Primero instalar docker + docker compose.

Despues ejecutar:

```sh
make run
```

Levanta la app, api y la base de datos:

* **app:** http://localhost:3000/
* **api:** http://0.0.0.0:8000/
* **db:** postgresql://user:password@db:5432/db

## Como usar la app sin docker

Recomiendo para develop de la app asi los cambios se actualizan directamente y no hay que volver a hacer build.

Primero instalar npm.

Despues instalar dependencias:

```sh
cd app
npm install
```

Para correr:

```sh
npm run
```


