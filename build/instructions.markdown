# Instruções para rodar o projeto 

## Configurando variáveis de ambiente

No arquivo chamado .env preencha os seguintes campos (preserve as aspas):

* DB_NAME, nome do banco de dados;
* DB_USER, Usuário do banco de dados (tem que ter permissões básicas mínimas de CRUD);
* SERVER_PASSWORD, senha de acesso ao servidor do banco de dados;
* DIALECT, o mesmo do exemplo;
* HOST, onde quer hostear a aplicação;
* PORT_DB, porta de onde o banco ta rodando;
* PORT_SERVER, porta de onde a aplicação vai rodar;
* CODEALGDB, algoritimo de criação de hash para salvar as senhas;
* CODEALGJWT, algoritimo de criação de hash para gerar o tolken JWT;
* PRIVATEKEYJWT, senha privada de geração de tolken JWT;
* CATEGORY1, categorias pedidas na documentação do teste (configurei em variável de ambiente para o projeto poder ser um pouco mais maleável, podendo ser facilmente alterado), o mesmo para as outras 3 categorias;

Abaixo um exemplo com dados fictícios de como o arquivo deve ficar no final.

```
DB_NAME = "database_aplication"  
DB_USER = "bigOwner"  
SERVER_PASSWORD = "12321"  
DIALECT = "postgres"  
HOST = "localhost"  
PORT_DB = 5432  
PORT_SERVER = 2000  
CODEALGDB = "sha256"  
CODEALGJWT,  = "HS384"  
PRIVATEKEYJWT = "P~33/234HKILEsd%"  
CATEGORY1 = "MLB1039"  
CATEGORY2 = "MLB1051"  
CATEGORY3 = "MLB1000"  
CATEGORY4 = "MLB1144"
```

## Configurando o banco de dados

A DDL para a criação do banco de dados está abaixo, bastando apenas colar no psql, minha recomendação pessoal, é que apenas o banco de dados sejam criado manualmente, deixando para o sequelize a criação de tabelas.

```
CREATE DATABASE database_aplication
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'pt_BR.UTF-8'
    LC_CTYPE = 'pt_BR.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;



CREATE TABLE IF NOT EXISTS public.categories
(
    id character varying(20) COLLATE pg_catalog."default" NOT NULL,
    name character varying(70) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.categories
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.orders
(
    id uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    client_id uuid,
    product_id character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT orders_client_id_fkey FOREIGN KEY (client_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT orders_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.orders
    OWNER to postgres;



CREATE TABLE IF NOT EXISTS public.products
(
    id character varying(20) COLLATE pg_catalog."default" NOT NULL,
    title character varying(120) COLLATE pg_catalog."default" NOT NULL,
    price real NOT NULL,
    available_quantity integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
```


## sync de dados da API

Dentro dos arquivos do projeto tem um chamado sync.js a função dele é simples, alimentar o banco de dados, sendo necessário rodá-lo apenas uma vez antes de por a aplicação no ar: `~$ node sync.js`.

## Rodando o projeto

Por último basta apenas passar no seu terminal o comando `~$ npm start`.
