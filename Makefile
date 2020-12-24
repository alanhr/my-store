build-mysql:
	- docker-compose down
	- docker-compose up -d --build db