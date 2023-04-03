# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Essa é aplicação Front-End do **Senac Stock**, que é um projeto de controle de estoque avançado e pronto para um usuário final. Esse projeto é do curso de nível técnico de Informática para Internet do centro de ensino Serviço Nacional de Aprendizagem ao Comércio (Senac). Objetivo desse projeto é para que o aluno possa dominar a biblioteca React Js, responsividade, paginação por demanda, relatórios avançados, gráficos, roteamento de páginas e tudo que o mercado de trabalho exige de conhecimento para um desenvolvedor Front-End. Essa aplicação possui uma Rest API onde é realizada toda regra de negócio e persistência na base de dados (O nas evidências abaixo mostra o Front-End se comunicando com o Back-End). 

**Tela principal**:

![002](https://user-images.githubusercontent.com/73559672/229520008-8d35b295-4f00-4f4b-b1eb-4d5d1c467529.png)

Produtos cadastrados. Aqui é possível bloquear/desbloquear produto para que ele fiquei inacessível em todo sistema:

![003](https://user-images.githubusercontent.com/73559672/229520627-c8cbc9e4-6797-4fd9-9281-42e566d45ebd.png)

**Cadastro de produto**:

![004](https://user-images.githubusercontent.com/73559672/229520743-d3a1259d-de9b-4578-946c-dbfc3d6c35b6.png)

**Departamentos cadastrados**:

![005](https://user-images.githubusercontent.com/73559672/229520490-32e9ec06-2f03-493a-89a7-5b11d272338a.png)

**Cadastro de departamentos**:

![006](https://user-images.githubusercontent.com/73559672/229521209-ba6d0738-6b29-4f01-a8d4-1c5064275dab.png)

**Usuários cadastrados**:

![007](https://user-images.githubusercontent.com/73559672/229521731-6c0595dd-b6bd-4f95-9c5b-1941e7f43607.png)

**Cadastro de usuário. Nessa tela só é preciso informar um nome e E-mail para o usuário, pois a senha e matrícula será enviado automaticamente para o E-mail informado e com essa senha e matrícula é onde o usuário poderá acessar o sistema**:

![008](https://user-images.githubusercontent.com/73559672/229521841-be54b3ce-cf93-4e66-8fd0-4c09758f426a.png)
![010](https://user-images.githubusercontent.com/73559672/229524665-c82f43e2-76bc-496f-8d1b-2b8b66de6111.png)

**Permissões de usuário. Aqui é possível o um usuário administrador ou que tenha permissão atribuir permissões para o usuário. As permissões são criadas no back-End através de criações de serviços**:

![011](https://user-images.githubusercontent.com/73559672/229525248-3437be1a-ebea-457c-a114-9095d428e9a4.png)

*Retirada de produtos. Aqui é possível o usuário criar uma lista de produtos e realizar uma baixa no estoque dessa lista; é preciso apenas informar o código de barras do produo no único Input apresemtado na interface**: 

![012](https://user-images.githubusercontent.com/73559672/229545460-784120ca-0afd-4692-b134-d58efa4eebc8.png)

**Para cada produto informado é encessário informar uma quantidade que será descontada automaticamente lá no banco de dados através da API**:

![013](https://user-images.githubusercontent.com/73559672/229545234-e2b4752e-0293-4bd0-8e14-84dcbcf02973.png)
![014](https://user-images.githubusercontent.com/73559672/229544905-ff55b78b-67c4-4c6a-a1d6-b4558db67d95.png)

**É possível visualizar todas as baixas que o próprio usuário realizou selecionando a opção Histórico de Movimentações**:

![017](https://user-images.githubusercontent.com/73559672/229546413-4b3e47c1-4667-4646-bd8b-96c1ea3e9061.png)

**É possível ver as Movimentações e também o detalhamento dessa Movimentação**:

![016](https://user-images.githubusercontent.com/73559672/229547142-ec1b36b0-7c38-412d-9893-820679d76129.png)

