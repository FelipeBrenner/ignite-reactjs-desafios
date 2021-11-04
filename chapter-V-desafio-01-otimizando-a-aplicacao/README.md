<h1 align="center">
  <img alt="ignite-reactjs" title="ignite-reactjs" src="../.github/cover-reactjs.png">
</h1>

# 💻 Sobre o desafio

Nesse desafio você deverá performar uma aplicação React utilizando das ferramentas e dicas aprendidas durante o módulo **Performando apps com ReactJS**.

Se você fez o desafio opcional [Componentizando a aplicação](https://www.notion.so/Desafio-02-Componentizando-a-aplica-o-b9f0f025c95b437699d0c3115f55b0f1) deve lembrar que se trata de uma aplicação que exibe uma listagem de filmes por categoria com base na categoria selecionada e que esses dados vem de uma API (fake API com JSON Server).

Com essa aplicação componentizada, você deve aplicar os conceitos de performance no React para melhorar esse app.

---

_Mas eu não fiz o desafio opcional. Preciso fazer ele antes para conseguir fazer esse?_

Se você não fez o desafio opcional, não precisa voltar atrás para concluir ele antes de fazer esse (apesar de que prática nunca é demais 😉). Para isso, estará disponibilizado aqui um template com o código componentizado, de onde você pode partir para realizar esse desafio.

A seguir veremos com mais detalhes o que e como precisa ser feito 🚀

## Template da aplicação

Como mencionado acima, se você não fez o desafio [Componentizando a aplicação](https://www.notion.so/Desafio-02-Componentizando-a-aplica-o-b9f0f025c95b437699d0c3115f55b0f1), pode usar o seguinte template como ponto de partida para esse desafio. Caso contrário, é possível apenas aprimorar o seu código a partir do que já foi feito.

O template está disponível na seguinte URL:

[GitHub - danilo-vieira/ignite-template-otimizando-a-aplicacao](https://github.com/danilo-vieira/ignite-template-otimizando-a-aplicacao)

**Dica**: Caso não saiba utilizar repositórios do GitHub como template, temos um guia em **[nosso FAQ](https://www.notion.so/FAQ-Desafios-ddd8fcdf2339436a816a0d9e45767664).**

## Se preparando para o desafio

Para esse desafio, além dos conceitos vistos em aula utilizaremos algumas coisa para deixar a nossa aplicação ainda melhor. Por isso, antes de ir diretamente para o código do desafio, explicaremos um pouquinho sobre Fake API com JSON Server (se você já entende o que é e como funciona o JSON Server, pode pular [para a próxima seção](https://www.notion.so/Desafio-01-Otimizando-a-aplica-o-2942004b422d455891756300d88d0b9a)).

### Fake API com JSON Server

Nesse desafio vamos utilizar o JSON Server para simular uma API que possui as informações de gêneros e filmes.

Navegue até a pasta criada, abra no Visual Studio Code e execute os seguintes comandos no terminal:

```bash
yarn # instala as dependências
yarn server # inicia o servidor com o JSON Server na porta 3333
```

Em seguida, você vai ver a mensagem:

<img src="https://efficient-sloth-d85.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1abc3356-2936-4106-a4fe-a3fc8efd1373%2FUntitled.png?table=block&id=77cee6a1-aaa0-4e9d-b71e-23cc8b7e7872&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=1420&userId=&cache=v2">

Perceba que ele iniciou uma fake API com os recursos `/genres` e `/movies` em `localhost` na porta `3333` a partir das informações do arquivo [server.json](https://github.com/danilo-vieira/ignite-template-otimizando-a-aplicacao/blob/main/server.json) localizado na raiz do seu projeto.

Acessando essas rotas no seu navegador, você consegue ver o retorno das informações já em JSON (dando um clique duplo, a imagem se expandirá):

<img src="https://efficient-sloth-d85.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F12a3c689-264b-4bd4-8515-730dfe8dd407%2FUntitled.png?table=block&id=77faac3c-05b4-49ab-92bf-2d3c85ad8fad&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=770&userId=&cache=v2" width='300'>

<img src="https://efficient-sloth-d85.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F400b84d4-2de4-4cd3-aef2-139f3103e9f6%2FUntitled.png?table=block&id=341fba1e-37f7-46f5-8b31-4f542268af29&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=1340&userId=&cache=v2" width="300" >

Dessa forma, basta consumir essas rotas da API normalmente com o Axios.

Caso queira estudar mais sobre o **JSON Server**, dê uma olhada aqui:

[typicode/json-server](https://github.com/typicode/json-server)

## O que devo editar na aplicação?

Com o template já clonado, as dependências instaladas e a fake API rodando, você deve começar implementar as estratégias de otimização para a aplicação.

Aqui estão os dois principais arquivos que devem ser editados:

- **[src/App.tsx](https://github.com/danilo-vieira/ignite-template-otimizando-a-aplicacao/blob/main/src/App.tsx)**
  Esse é o componente principal da aplicação e contém toda a lógica da aplicação como chamadas à API e controle de estados dos componentes Content e SideBar.
- **[src/components/Content.tsx](https://github.com/danilo-vieira/ignite-template-otimizando-a-aplicacao/blob/main/src/components/Content.tsx)**
  Esse componente, possui toda a lógica e corpo responsável pelo header e conteúdo da aplicação (seção contornada em vermelho):

<img src="https://efficient-sloth-d85.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fff7c8a12-50d1-4a20-a680-9085d0bd6823%2Fexample.png?table=block&id=8e2b5fb2-1909-4775-8c04-9f621153a2df&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=1250&userId=&cache=v2" >

- **[src/components/SideBar.tsx](https://github.com/danilo-vieira/ignite-template-otimizando-a-aplicacao/blob/main/src/components/SideBar.tsx)**
  Esse componente possui toda a lógica e corpo responsável pela seção que contém o título do site e a parte de navegação à esquerda da página (seção contornada em vermelho):

<img src="https://efficient-sloth-d85.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F88f057c2-d29a-4b0d-b9ed-f11385e09030%2Fexample.png?table=block&id=9e97c837-e305-478a-8c69-2a6d0a16f7a3&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=1340&userId=&cache=v2">

Se você preferir, pode também componentizar algumas outras partes da aplicação como, por exemplo, o header, mas esse não está como requisito deste desafio 🚀

## Dicas

Lembre-se de usar corretamente as funcionalidades do React para prover mais performance para a aplicação:

memo;

useMemo;

useCallback;

Virtualização.

Mesmo que a aplicação não precise de alguns pontos de otimização, sinta-se livre para usar as ferramentas a sua disposição como forma de aprendizado mas continue tomando cuidado com otimizações desnecessárias ao trabalhar com algum projeto real 💜.

## Como deve ficar a aplicação ao final?

Está com dúvidas (ou curioso 👀) para ver como deve ficar a aplicação ao final do desafio? Deixamos este [vídeo](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/10783a0f-e3a7-4991-8bb5-43f73508431f/demo.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211104T133248Z&X-Amz-Expires=86400&X-Amz-Signature=01965c6033378cadf2dcd05a61e9d531198fc0b66ddbdac190fc0086350ce946&X-Amz-SignedHeaders=host) mostrando as principais funcionalidades que você deve implementar para te ajudar (ou matar sua curiosidade 👀).

# 📅 Entrega

Esse desafio deve ser entregue a partir da plataforma da Rocketseat. Envie o link do repositório que você fez suas alterações. Após concluir o desafio, além de ter mandado o código para o GitHub, fazer um post no LinkedIn é uma boa forma de demonstrar seus conhecimentos e esforços para evoluir na sua carreira para oportunidades futuras.

## 📖 [Notion](https://www.notion.so/Desafio-01-Otimizando-a-aplica-o-2942004b422d455891756300d88d0b9a)
