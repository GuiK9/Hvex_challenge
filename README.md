# Challenge proposed by Hvex for hiring

 Desafio proposto para a vaga de desenvolvedor  back-end júnior.

## Hvex_challenge

 O teste será composto apenas pelo back-end, não precisando de nenhuma página em html, será necessário somente implementar as rotas. Para captura de dados utilizar a api do Mercado Livre <https://api.mercadolibre.com/sites/MLB/>, as informações salvas devem estar de acordo com o modelo do banco de dados proposto. 
Obs.: Devem ser salvos pelo menos 4 produtos de cada categoria.
Devem ser implementadas as seguintes rotas:
Importe automático de dados vindo da api de pelo menos 4 produtos de cada categoria;
* Cadastros: Implementar rota de cadastro de usuário com um campo para e-mail e outro para senha;
* Login:  O usuário dever ser salvo no banco de dados e como autenticação deve ser implementado o JWT (Json Web Token). Após o cadastro  deve ser possível fazer o login utilizando o e-mail e senha cadastrado com o jwt, deve retornar um token, que será usado para  autenticar demais rotas;
* Categoria: Retornar uma lista de categorias contendo os seguintes valores:
    * Câmeras e Acessórios
    * Celulares e Telefones
    * Eletrônicos, Áudio e Vídeo
    * Games
* Produtos: Deve retornar uma lista dos produtos de determinada categoria, o identificador da categoria deve ser passado por parâmetro.
* Produto: Deve retornar um produto passando por parâmetro de identificação.
* Preços: Deve retorna uma lista de produtos  de uma única categoria ordenados pelo menor preço.
* Pedidos: Deve retornar uma lista de produtos com o nome do usuário

### Modelo do banco de dados

![Modelo do banco de dados.](./README_Assets/modeloDB)

### Requisitos essenciais(obrigatórios)
* Código escrito em NodeJs
* Banco de dados relacional ( Postgres/MySql). Deve ser enviado a DDL do banco e tabelas com campos de timestamp (created_at e updated_at).


### Diferenciais
* Utilização de Typescript/NestJs;
* Docker
* Código bem estruturado e comentado.
* Uso de outras tecnologias,além das obrigatórias, para a realização do teste.


### Observações
* Caso o usuário entre com um e-mail e/ou senha inválidos ele deverá retornar o código de erro apropriado para erros do cliente.
* Deve ser enviado o link do repositório do GitHub com as instruções de como rodar o projeto localmente.
