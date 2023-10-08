build-app:
	sudo docker build app -t aprende-ya-app

build-api:
	sudo docker build api -t aprende-ya-api

build: build-app build-api

run-api: build-api
	sudo docker run -p 8000:8000 aprende-ya-api

run-app: build-app
	sudo docker run -p 3000:3000 aprende-ya-app

run:
	sudo docker-compose up --build

