<h1 align="center">
  <img alt="ignite-reactjs" title="ignite-reactjs" src="../.github/cover-reactjs.png">
</h1>

# 💻 Sobre o desafio

Nesse desafio, você deverá criar uma aplicação para treinar o que aprendeu até agora no ReactJS

Essa será uma aplicação onde o seu principal objetivo é refatorar uma página para listagem de filmes de acordo com gênero.

A aplicação já está totalmente funcional mas grande parte do seu código está diretamente no arquivo `App.tsx`. Para resolver isso da melhor forma, é necessário dividir a aplicação em **pelo menos** duas partes principais: sidebar e o conteúdo principal que possui o header e a listagem de filmes.

- A aplicação possui apenas uma funcionalidade principal que é a listagem de filmes;
- Na sidebar é possível selecionar qual categoria de filmes deve ser listada;
- A primeira categoria da lista (que é "Ação") já deve começar como marcada;
- O header da aplicação possui apenas o nome da categoria selecionada que deve mudar dinamicamente.

A seguir veremos com mais detalhes o que e como precisa ser feito 🚀

## Template da aplicação

Para te ajudar nesse desafio, criamos para você esse modelo que você deve utilizar como um template do GitHub.

O template está disponível na seguinte [URL](https://github.com/rocketseat-education/ignite-template-componentizando-a-aplicacao).

**Dica**: Caso não saiba utilizar repositórios do GitHub como template, temos um guia em **[nosso FAQ](https://www.notion.so/FAQ-Desafios-ddd8fcdf2339436a816a0d9e45767664).**

## Se preparando para o desafio

Para esse desafio, além dos conceitos vistos em aula utilizaremos algumas coisa novas para deixar a nossa aplicação ainda melhor. Por isso, antes de ir diretamente para o código do desafio, explicaremos um pouquinho sobre Fake API com JSON Server.

### Fake API com JSON Server

Assim como utilizamos o MirageJS no módulo 2 para simular uma API com os dados das transações da aplicação dt.money, vamos utilizar o JSON Server para simular uma API que possui as informações de gêneros e filmes.

Navegue até a pasta criada, abra no Visual Studio Code e execute os seguintes comandos no terminal:

```bash
yarn
yarn server
```

Em seguida, você vai ver a mensagem:

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1abc3356-2936-4106-a4fe-a3fc8efd1373%2FUntitled.png?table=block&id=7fe88f6f-62c6-45c7-a898-d1672dbbe6bd&width=1420&userId=c2f20f93-e6f2-4785-879d-55dde28c4d2e&cache=v2">

Perceba que ele iniciou uma fake API com os recursos `/genres` e `/movies` em `localhost` na porta `3333` a partir das informações do arquivo [server.json](https://github.com/rocketseat-education/ignite-template-componentizando-a-aplicacao/blob/main/server.json) localizado na raiz do seu projeto. Acessando essas rotas no seu navegador, você consegue ver o retorno das informações já em JSON (dando um clique duplo, a imagem se expandirá):

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F12a3c689-264b-4bd4-8515-730dfe8dd407%2FUntitled.png?table=block&id=e27d872a-13a6-4c37-ba61-34b7fb2f74dd&width=850&userId=c2f20f93-e6f2-4785-879d-55dde28c4d2e&cache=v2">
<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F400b84d4-2de4-4cd3-aef2-139f3103e9f6%2FUntitled.png?table=block&id=c2e1b5cd-c028-45b6-9319-b88aab9b0ece&width=670&userId=c2f20f93-e6f2-4785-879d-55dde28c4d2e&cache=v2">

Dessa forma, basta consumir essas rotas da API normalmente com o Axios. Caso queira estudar mais sobre o **JSON Server**, dê uma olhada [aqui](https://github.com/typicode/json-server).

## O que devo editar na aplicação?

Com o template já clonado, as dependências instaladas e a [fake API rodando](https://www.notion.so/Desafio-01-Criando-um-hook-de-carrinho-de-compras-5769216778794019a83f544e79167b12), você deve criar **pelo menos** os componentes SideBar e Content que já estão com os arquivos criados.
Os arquivos a serem editados são:

- **src/App.tsx**
  Esse componente contém toda a aplicação com exceção do componente `Button` que não precisa ser alterado e `Icon` que também não precisa de alteração.
- **src/components/Content.tsx**
  Esse componente, ainda vazio, deve possuir toda a lógica e corpo responsável pelo header e conteúdo da aplicação (seção contornada em vermelho):

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fff7c8a12-50d1-4a20-a680-9085d0bd6823%2Fexample.png?table=block&id=641fa56e-763e-48f3-8a2b-1bf93007de1b&width=1250&userId=c2f20f93-e6f2-4785-879d-55dde28c4d2e&cache=v2">

- **src/components/SideBar.tsx**
  Esse componente, também vazio, deve possuir toda a lógica e corpo responsável pela seção que contém o título do site e a parte de navegação à esquerda da página (seção contornada em vermelho):

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F88f057c2-d29a-4b0d-b9ed-f11385e09030%2Fexample.png?table=block&id=673530e2-c5dc-4813-97f2-37c4dfabc170&width=1340&userId=c2f20f93-e6f2-4785-879d-55dde28c4d2e&cache=v2">

Se você preferir, pode também componentizar algumas outras partes da aplicação como, por exemplo, o header, mas esse não está como requisito deste desafio 🚀

## Como deve ficar a aplicação ao final?

Está com dúvidas (ou curioso 👀) para ver como deve ficar a aplicação ao final do desafio? Deixamos este [vídeo](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/10783a0f-e3a7-4991-8bb5-43f73508431f/demo.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211104T140248Z&X-Amz-Expires=86400&X-Amz-Signature=0eeda58a3feaa62dd7368763defc1930e55741d4e9db01a00b914dc9825a5d51&X-Amz-SignedHeaders=host) mostrando as principais funcionalidades que você deve implementar para te ajudar (ou matar sua curiosidade 👀).

# 📅 Entrega

Esse desafio deve ser entregue a partir da plataforma da Rocketseat. Envie o link do repositório que você fez suas alterações. Após concluir o desafio, além de ter mandado o código para o GitHub, fazer um post no LinkedIn é uma boa forma de demonstrar seus conhecimentos e esforços para evoluir na sua carreira para oportunidades futuras.

## 📖 [Notion](https://www.notion.so/Desafio-02-Componentizando-a-aplica-o-b9f0f025c95b437699d0c3115f55b0f1)
