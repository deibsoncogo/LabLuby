# Prova de microservice com Kafka - Luby Software - Manoel Neto
Criação de uma aplicação com o [Kafka](https://kafka.apache.org/documentation/) para se conectar a aplicação da prova de Adonis V5

## Banco de dados
Cria um container para o banco de dados
docker run --name KafkaLabLuby -e POSTGRES_DB=KafkaLabLubyDB -e POSTGRES_USER=KafkaLabLuby -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

Para executar o Docker Compose
docker-compose up -d

Para acessar um container do Docker
docker exec -it Name bash
