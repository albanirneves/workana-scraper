# Workana Scraper

Um serviço NodeJS em que você recebe por email projetos workana em tempo real baseados nos seus critérios, utilizando a técnica de scraper.

## Installation


```bash
npm install
npm start
```

## Configurações

Você precisa criar o arquivo ```src/config.json``` com as seguintes especificações:

```
{
    "checkInterval": 60000,
    "sendTo": "seuemail@email.com, email2@email.com",
    "nodemailerConfig": {
        "host": "smtp.email.com",
        "port": 587,
        "auth": { 
            "user": "webmaster@email.com", 
            "pass": "******" 
        }
    },
    "exclusions": [ "phyton", "php" ],
    "inclusions": [ "NodeJS", "Javascript" ]
}
```

### Detalhes
```checkInterval```: Tempo de checagem e envio de email em milissegundos.

```sendTo```: Emails que receberão as notificações

```nodemailerConfig```: Configuração do servidor de emails de envio.

```exclusions```: Caso estas palavras estejam no título ou descrição, o projeto não retornará nas notificações.


```inclusions```: Caso estas palavras estejam no título ou descrição, você sempre será notificado, ignorando as ```exclusions```


Pull requests são bem-vindos. É preciso contornar algumas limitações, como checar mais do que apenas a primeira página, para o caso de o intervalo de checagem ser muito grande.

## License
[MIT](https://choosealicense.com/licenses/mit/)