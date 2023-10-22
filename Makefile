build-app:
	docker build app -t aprende-ya-app

build-api:
	docker build api -t aprende-ya-api

build: build-app build-api

run-api: build-api
	docker run -p 8000:8000 aprende-ya-api

run-app: build-app
	docker run -p 3000:3000 aprende-ya-app

run:
	docker-compose up --build

