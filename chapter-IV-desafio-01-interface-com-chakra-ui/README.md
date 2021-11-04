# 💻 Sobre o desafio

Nesse desafio, você deverá criar uma aplicação para treinar o que aprendeu até agora no ReactJS

Essa será uma aplicação onde você tem dois objetivos principais. O primeiro é desenvolver toda a interface usando como base o Chakra UI. O outro é que você deve trabalhar o responsivo da aplicação (e é aqui que sua criatividade pode brilhar ainda mais).

Você vai iniciar uma aplicação Next.js do zero na sua própria máquina e implementar a interface conforme o layout do Figma.

A seguir veremos com mais detalhes o que e como precisa ser feito 🚀

# Se preparando para o desafio

Para esse desafio, iremos reforçar alguns pontos e apresentar algumas libs para te ajudar no desevolvimento.

Dessa forma, antes de ir diretamente para o código do desafio, explicaremos um pouquinho de:

- Figma;
- Chakra UI;
- Swiper.

Vamos nessa?

## Figma

Um ponto muito importante desse desafio que queremos que você exercite é a implementação de uma interface a partir de um layout do Figma, como se você tivesse recebido isso das mãos de um designer.

Nesse desafio, você deve implementar o layout das páginas `Web` \*\*\*\*e `Mobile`.

Para utilizar o Figma, não possui muito mistério. Vamos deixar abaixo os passos para criar uma conta, duplicar o layout e exportar imagens.

### Criando uma conta no Figma

Para acessar o Layout da aplicação, você primeiramente deve ter uma conta criada na plataforma do Figma, para isso, você pode [clicar aqui](https://www.figma.com/signup).

Então, na página de cadastro, você pode logar diretamente com sua conta do Google ou criar uma conta com o e-mail que você preferir.

### Utilizando o Figma

Após criar sua conta, você pode acessar sua Dashboard do Figma, para isso, basta acessar [https://www.figma.com/](https://www.figma.com/) e ele vai te redirecionar para a Dashboard.

Caso ele não redirecione diretamente para a sua dashboard, existe um botão "Log in" no canto superior direito da tela, que permitirá você acessar a conta que você acabou de criar e, ao logar, você será redirecionado automaticamente.

### Acessando o layout do app

Agora para duplicar os layouts, basta você clicar no link abaixo. Ele adicionará o Layout à sua dashboard do Figma automaticamente, como uma cópia.

[Desafio 1 Módulo 4 ReactJS](https://www.figma.com/file/8QAkMs3BddatXn2fFseyu4/Desafio-1-M%C3%B3dulo-4-ReactJS/duplicate)

### Verificando estilização

Para verificar a estilização de um elemento, basta selecioná-lo e escolhar na barra lateral direita a opção `Inspect` no menu superior direito. Dessa forma você vai ter a maioria das informações que precisa. Caso precise das distâncias em relação a outros elementos, basta colocar o mouse em cima do elemento que deseja pegar a distância.

[Video](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1e292b38-d5a7-4fb2-b3f2-d194d4401662/figma.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211104T133611Z&X-Amz-Expires=86400&X-Amz-Signature=6354f7968c7669d15210a2000f254ee28da39e611a7f3e496ee74cff689211e1&X-Amz-SignedHeaders=host)

### Exportando do Figma

Se você está tendo dificuldades em encontrar o comando `Export` no layout do Figma, siga esses passos:

- Selecione o item que deseja exportar;
- Na sidebar direita, clique na aba `Design`;
- Deslize até o final da sidebar para encontrar a opção `Export`.

[Video](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a3f1b967-3a93-4e83-8abb-d3d22ae5da75/figma2.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211104T133612Z&X-Amz-Expires=86400&X-Amz-Signature=d42dc7eb982a9f0530e04ce1a9eb1b8f17595ffb651bdd3137a144ea5301ae12&X-Amz-SignedHeaders=host)

## Unsplash

Como você pode já ter percebido, o layout que disponibilizamos oferece as imagens apenas para o caso da Europa. Para o restante dos continentes, você vai precisar buscar as imagens desejadas.

E é aí que entra o Unsplash. Sugerimos que você utilize essa plataforma incrível para você conseguir imagens de alta resolução de forma gratuita.

Inclusive, todas as imagens disponibilizadas no nosso layout são do Unsplash, por exemplo o banner da página Home.

[Photo by Warren Wong on Unsplash](https://unsplash.com/photos/fNUNt9w3m-Q)

## Chakra UI

Como já visto nas aulas do módulo 4, o Chakra UI é um design system poderoso e que pode aumentar consideravelmente a sua produtividade ao desenvolver interfaces.

Como a lib é muito grande e é inviável que o Diego mostre todas as opções e possibilidades durante a aula, recomendamos fortemente que vocês utilizem a documentação oficial ao seu favor para escolher os melhores componentes para sua aplicação

[Chakra UI - A simple, modular and accessible component library that gives you the building blocks you need to build your React applications.](https://chakra-ui.com/)

Vamos ver um exemplo para facilitar para vocês. Na página específica do Continente, vemos que temos uma ícone de informação ao final da informação de quantas cidades +100 aquele continente tem.

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F356cc982-b341-43aa-8dd0-5f4750df8308%2FUntitled.png?table=block&id=61c71d04-b666-41fb-a7c3-f096156a13cb&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=380&userId=&cache=v2" width='200'>

Alguns componentes que ficariam bem legais nesse caso são:

- [Tooltip](https://chakra-ui.com/docs/overlay/tooltip)
  <img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6830f6b0-395c-4462-a1aa-595d63b2f642%2FPeek_2021-03-29_12-16.gif?table=block&id=048bd95e-5f1e-4487-ad48-5dcfae09715b&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&userId=&cache=v2">
- [Popover](https://chakra-ui.com/docs/overlay/popover)
  <img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe5c3bae3-80d5-4d9c-a804-6ecc3d9b017a%2FPeek_2021-03-29_12-17.gif?table=block&id=443c3717-e003-435b-aeb1-5360a9fc6d6f&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&userId=&cache=v2">

Dessa forma, utilize a documentação a seu favor e tente aproveitar ao máximo os componentes já criados pelo Chakra UI em vez de tentar desenvolver esses comportamentos manualmente.

## Swiper

Por fim, como o Chakra UI não possui [ainda](https://github.com/chakra-ui/chakra-ui/issues/200) um componente de `slides/carousel`, deixamos como sugestão a lib **Swiper** para implementar essa funcionalidade apresentada na página **Home**.

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1d017f6f-b4de-4fab-8c9a-f453ac248d1a%2FUntitled.png?table=block&id=f23503f7-8bc2-49ce-9862-45d9aa01c041&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=2000&userId=&cache=v2">

**React Guide**

[Swiper React Components](https://swiperjs.com/react)

**Exemplos**

[Swiper Demos](https://swiperjs.com/demos)

# Desenvolvendo o projeto

Agora que já falamos um pouquinho dessas coisas que podem te ajudar, vamos dar uma olhada na interface do Figma.

## Web, mobile e responsividade

A primeira coisa que vocês podem perceber na seção superior esquerda é que temos duas versões do projeto: **Web** e **Mobile**

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fde1691ca-7859-48c6-99a4-e0be9623642e%2FUntitled.png?table=block&id=31e86741-eeee-4877-91e4-5af19b2e6279&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=520&userId=&cache=v2">

Criamos essas duas versões para vocês treinarem a responsividade. Porém, percebam que criamos apenas uma versão para cada caso (1440px Web e 375px Mobile) enquanto na verdade existem uma grande variedade de padrões de telas. Portanto, caso queira, sinta-se à vontade para criar (no figma e na aplicação) mais versões desse projeto para resoluções diferentes (1920px e 768px são exemplos de padrões interessantes).

## Páginas da aplicação

Temos duas páginas para cada versão da aplicação: **Home** e **Continent**.

### Home

Nessa página você tem um Header, um Banner, uma seção mostrando os tipos de viagem e por fim um CTA (call to action) pedindo para você selecionar um dos continentes.

Como há diferentes formas de classificar e dividir o mundo em continentes, sugerimos utilizar:

- América do Norte;
- América do Sul;
- Ásia;
- África;
- Europa;
- Oceania.

### Continente

Nessa página você tem um Header, um Banner, uma seção mostrando informações do continente e por fim uma seção mostrando as cidades +100.

As cidades +100 são as cidades que aquele continente possui que estão entre as 100 cidades mais visitadas do mundo. Você pode popular esse campo com dados fictícios, mas caso queira ser o mais realista possível sugerimos se basear nesses dois sites.

[Infographic: The 100 Most Popular City Destinations](https://www.visualcapitalist.com/the-100-most-popular-city-destinations/)

[The 50 Most Visited Cities in the World in 2019 - Big 7 Travel](https://bigseventravel.com/the-most-visited-cities-world-2019/)

## Dados da aplicação

Por fim, os dados da aplicação (continentes e países) serão criados por você durante o desenvolvimento da aplicação. Fique a vontade para montar da forma que preferir pois o foco do desafio é a interface, mas seria uma oportunidade muito legal de você reforçar seus conhecimentos de Fake API e criar do zero uma API com as informações que precisar para a sua aplicação.

# 📅 Entrega

Esse desafio deve ser entregue a partir da plataforma da Rocketseat. Envie o link do repositório que você fez suas alterações. Após concluir o desafio, além de ter mandado o código para o GitHub, fazer um post no LinkedIn é uma boa forma de demonstrar seus conhecimentos e esforços para evoluir na sua carreira para oportunidades futuras.

Feito com 💜 por Rocketseat 👋 Participe da nossa [comunidade aberta!](https://discord.gg/pUU3CG4Z)

## 📖 [Notion](https://www.notion.so/Desafio-01-Interface-com-Chakra-UI-d1274f7fd7f54283b9173b7fd8003cc6)
