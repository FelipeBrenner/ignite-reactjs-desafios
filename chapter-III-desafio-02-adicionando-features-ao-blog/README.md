<h1 align="center">
  <img alt="ignite-reactjs" title="ignite-reactjs" src="../.github/cover-reactjs.png">
</h1>

# 💻 Sobre o desafio

Nesse desafio, você deverá criar uma aplicação para treinar o que aprendeu até agora no ReactJS

Essa será uma aplicação onde o seu principal objetivo é adicionar features a um projeto já existente. Utilizaremos como base a solução desenvolvida por você do desafio obrigatório:

[Desafio 01 - Criando um projeto do zero](https://www.notion.so/Desafio-01-Criando-um-projeto-do-zero-b1a3645d286b4eec93f5f1f5476d0ff7)

Você deve implementar no projeto as seguintes features:

- Comentários com Utteranc;
- Preview do documento Prismic;
- Navegação entre post anterior e próximo;
- Informação de edição do post.

A seguir veremos com mais detalhes o que e como precisa ser feito 🚀

## Template do Figma

Você vai utilizar o mesmo template do desafio:

[Desafio 01 - Criando um projeto do zero](https://www.notion.so/Desafio-01-Criando-um-projeto-do-zero-b1a3645d286b4eec93f5f1f5476d0ff7)

Porém dessa vez irá se basear na página `Complementar`

[Video](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a4f85d9e-1c1d-4feb-aa1e-ce08535cbbde/complementar.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210627%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210627T153816Z&X-Amz-Expires=86400&X-Amz-Signature=71ebc330b4bac26f925b207317d4ad804e3242986555de073fd268dbe5116296&X-Amz-SignedHeaders=host)

Caso tenha dúvidas de como trabalhar com o Figma, dê uma olhada [aqui](https://www.notion.so/Desafio-01-Criando-um-projeto-do-zero-b1a3645d286b4eec93f5f1f5476d0ff7)

## Comentários com Utteranc

Uma funcionalidade essencial para blogs são os comentários. Por isso, utilizaremos o Utteranc para adicionar essa feature ao nosso projeto.

Basicamente, para realizar essa implementação, você precisa:

- Ter um repositório público no github com o Utteranc app instalado. Ele será o responsável por armazernar os comentários;
- Injetar o `script` do Utteranc com as configurações que deseja.

Para isso, sugerimos que vocês se baseem nas informações da documentação oficial para criar/configurar o repositório e script do Utteranc:

[utterances](https://utteranc.es/)

E nessa issue do repositório oficial sobre como implementar o Utteranc no React:

[example for react use · Issue #161 · utterance/utterances](https://github.com/utterance/utterances/issues/161)

## Preview do documento Prismic

Outra funcionalidade essencial é poder visualizar como a aplicação irá ficar sem ter que publicar as informações em produção no CMS. Por isso, iremos implementar o modo Preview no Next.js + Prismic para adicionar essa feature ao projeto.

Como essa funcionalidade vai precisar que façamos vários passos, vamos entendendo um por um em vez de passar direto para o código final.

1. A primeira coisa que você precisa fazer é criar uma `ACCESS_KEY` nas configurações do Prismic como visto em aula e passar esse valor para o seu cliente Prismic no momento da criação, exemplo:

   <img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3c96d7c6-147a-4cc3-8d3b-a4ad3145a10a%2FUntitled.png?table=block&id=284f6481-ed18-4d1f-a1d7-4c1a3e5d4f80&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=2300&userId=&cache=v2">

   ```tsx
   import Prismic from '@prismicio/client';
   import { DefaultClient } from '@prismicio/client/types/client';

   export function getPrismicClient(req?: unknown): DefaultClient {
     const prismic = Prismic.client(process.env.PRISMIC_API_ENDPOINT, {
       req,
       accessToken: process.env.PRISMIC_ACCESS_TOKEN,
     });

     return prismic;
   }
   ```

2. Em seguida, você precisa configurar as `Previews` na sua API do Prismic. Em `Settings->Previews` configure a Preview com as seguintes informações:
   1. Site Name: Esse é o nome que você quer dar para essa Preview. É puramente estético, então coloque o que preferir (ex.: Development);
   2. Domain: Essa é a url que você quer renderizar a Preview. Como vocês estão trabalhando localmente na porta 3000, sugerimos colocar `http://localhost:3000`;
   3. Link Resolver: Essa é a rota da nossa API Next.js que vai receber a requisição e os query params para então retornar a url daquele documento. Como a ideia é criar um arquivo `api/preview.ts` informe o valor `/api/preview`.
3. O próximo passo é criar as rotas para iniciar e finalizar o modo Preview. Crie os arquivos `/api/preview.ts` e `/api/exit-preview.ts`. A ideia de cada arquivo é

   1. preview.ts: Receber a requisição da API do Prismic com as query params `documentID` e `token`, gerar a url, setar as informações do documento de acordo com o Preview e redirecionar o usuário para a url gerada;
   2. exit-preview.ts: Limpar as informações de Preview e redirecionar o usuário para a página principal.

   Para conseguir implementar essas funcionalidades, dê uma olhada nos trechos **[The preview.js file](https://prismic.io/docs/technologies/previews-nextjs)** e **[The exit-preview.js file](https://github.com/prismicio/nextjs-blog/tree/master/pages/api)** da documentação oficial.

   Perceba que no primeiro exemplo ele faz a importação do linkResolver. Você pode utilizar como linkResolver dentro do seu arquivo `preview.ts` a seguinte função:

   `import { Document } from '@prismicio/client/types/documents'; function linkResolver(doc: Document): string { if (doc.type === 'posts') { return `/post/${doc.uid}`; } return '/'; }`

4. Por fim, é preciso que as páginas da aplicação tratem essas informações do Preview corretamente. Para isso, no seu método `getStaticProps` você vai trabalhar com duas variáveis recebidas como argumento:

   1. preview: Uma variável booleana que você deve retornar dentro das props. Ela será utilizada para, caso esteja no modo Preview, renderizar o botão que irá chamar a rota `api/exit-preview.ts` para finalizar esse modo. É importante configurar o valor padrão dela como `false`;
   2. previewData: Uma variável que possui um cookie. Ela será repassada na propriedade `ref` dentro das opções das suas `queries` no Prismic.

   ```tsx
   export default function Home({
     ...,
     preview,
   }: HomeProps): JSX.Element {
   	...

   	return {
   		...

   		{preview && (
   			<aside>
   				<Link href="/api/exit-preview">
   			    <a>Sair do modo Preview</a>
   				</Link>
         </aside>
   		)}
   	}

   }

   export const getStaticProps: GetStaticProps<HomeProps> = async ({
     preview = false,
     previewData,
   }) => {
   	...
   	const postsResponse = await prismic.query(
   	    ...,
   	    {
   	      ...
   	      ref: previewData?.ref ?? null,
   	    }
   	  );

   	return {
   		props: {
   			...,
   			preview
   		}
   	}
   }
   ```

Com essas configurações, seu modo de Preview deve funcionar de acordo com o esperado. Caso ainda tenha dúvidas de como implementar, dê uma olhada na documentação oficial:

[Getting Started Next.js without Slice Machine](https://prismic.io/docs/technologies/getting-started-examples-simple-nextjs)

## Navegação entre post anterior e próximo

Você deve renderizar na página `post/[slug].tsx` links com a informação do título do post que, quando clicados, devem realizar a navegação até o post selecionado.

É necessário ter um link para o post diretamente mais antigo que o da página atual e um link para post diretamente mais recente que o da página atual (ou seja, os posts "vizinhos").

Além disso, você não deve exibir os links caso não existam posts mais antigos e/ou mais novos que o atual.

Por fim, você deve renderizar também uma linha divisória entre o final do conteúdo do post e os links.

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa02129a9-5dc4-4470-beb4-5fa765ab2a45%2FUntitled.png?table=block&id=a1c4cef1-67ef-4236-92ca-5ce75f253d91&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=1280&userId=&cache=v2">

## Informação se o post foi editado

Você deve renderizar na página `post/[slug].tsx` a informação de edição do post caso exista. Ela deve estar logo abaixo das informações de autor, data de criação e tempo estimado de leitura como mostrado no layout.

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0e0e3620-e2a1-4503-8cb7-46af7eb100cc%2FUntitled.png?table=block&id=a832e7f1-2563-4909-88c8-696823e0809c&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=670&userId=&cache=v2">

Dica: Utilize o campo `last_publication_date` retornado pelo Prismic.

Aviso: Para formatação da data `last_publication_date`, recomendamos utilizar o date-fns já instalado no template. O uso do Intl pode não formatar corretamente e gerar problemas na correção automatizada pela plataforma.

# 📅 Entrega

Esse desafio deve ser entregue a partir da plataforma da Rocketseat. Envie o link do repositório que você fez suas alterações. Após concluir o desafio, além de ter mandado o código para o GitHub, fazer um post no Linkedin é uma boa forma de demonstrar seus conhecimentos e esforços para evoluir na sua carreira para oportunidades futuras.
