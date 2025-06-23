# Organo Planner

Organo Planner é um planner semanal desenvolvido em React, com backend integrado, que permite o gerenciamento completo de tarefas (CRUD) de forma simples e visual.

## Funcionalidades
- **Adicionar tarefa**: Crie tarefas com título, descrição, imagem, categoria (dia da semana).
- **Editar tarefa**: Altere qualquer campo de uma tarefa existente.
- **Excluir tarefa**: Remova tarefas do planner.
- **Concluir tarefa**: Marque tarefas como concluídas (visual acinzentado).
- **Visualização por dia**: As tarefas são organizadas por dias da semana, cada um com sua cor.
- **Feedback visual**: Cards de tarefas concluídas ficam acinzentados, mantendo a cor secundária do dia.
- **Integração total com backend**: Todas as operações refletem imediatamente no backend e na interface.


## Design Figma do Projeto
https://www.figma.com/design/cWzrT7FnzgYaQuRieZaxMe/OrganoPlanner?node-id=134-128&p=f&t=RgwbHmjGdPYhCLz6-0


## Estrutura do Projeto

```
organo-planner/
├── public/
│   └── ...
├── src/
│   ├── api.js           # Funções de integração com o backend (fetch, add, update, delete)
│   ├── App.js           # Componente principal, roteamento e lógica global
│   ├── index.js         # Ponto de entrada do React
│   ├── index.css        # Estilos globais
│   └── components/
│       ├── AboutUs/     # Página sobre
│       ├── Banner/      # Banner do topo
│       ├── Button/      # Botão reutilizável
│       ├── DropdownList/# Lista suspensa de categorias
│       ├── Footer/      # Rodapé
│       ├── TaskCard/    # Card de tarefa individual
│       ├── TaskForm/    # Formulário de criação/edição de tarefa
│       ├── TaskList/    # Lista de tarefas por dia
│       └── TextField/   # Campo de texto reutilizável
├── package.json
└── README.md            # Este arquivo
```

## Como rodar o projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Inicie o backend** (certifique-se de que o backend está rodando na porta 3000, endpoint `/tarefa`).
3. **Inicie o frontend:**
   ```bash
   npm start
   ```
4. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Endpoints esperados pelo frontend
- `GET    /tarefa`         → Lista todas as tarefas
- `POST   /tarefa`         → Cria uma nova tarefa
- `PUT    /tarefa/:id`     → Atualiza uma tarefa existente
- `DELETE /tarefa/:id`     → Remove uma tarefa

## Principais arquivos e responsabilidades
- **App.js**: Controla o estado global das tarefas, roteamento e handlers principais.
- **api.js**: Funções para comunicação com o backend usando fetch.
- **TaskList/**: Lista de tarefas de cada dia, permite editar/concluir/excluir.
- **TaskForm/**: Formulário para criar e editar tarefas.
- **TaskCard/**: Exibe visualmente cada tarefa.

## Observações
- O visual é responsivo e pronto para apresentação.
- O projeto pode ser facilmente adaptado para outros backends que sigam o mesmo padrão de endpoints e campos.

## Autores
- Projeto desenvolvido por Jessica Rodrigues e Rafael Alvarenga.
