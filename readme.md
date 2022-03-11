# Prova sobre o Adonis V5 - Trilha dev backend - LabLub
Resolução da prova sobre o Adonis V5 proposto da trilha dev backend da LabLuby.
Que é a construção de uma API com o Adonis V5 e Docker para armazenar apostas e jogos de sorte.

## Banco de dados
Comando utilizado para criar o container do Docker
docker run --name ProvaAdonisV5LabLuby -e POSTGRES_DB=ProvaAdonisV5LabLubyDB -e POSTGRES_USER=ProvaAdonisV5LabLuby -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
