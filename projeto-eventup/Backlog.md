# Backlog - EventUp

Backlog de atividades planejadas para as próximas entregas do projeto EventUp.

---

## Atualização Pós-Sprint

### Expectativa do Cliente
- Manter um **menu de navegação claro entre Home e Favoritos**.
- **Implementar gestos dedicados** no mobile e seguir rumo a uma experiência de app nativo.
- **Adotar React Testing Library** para garantir qualidade antes da liberação final.

### Entregas do TP4
- Menu responsivo com links ativos e contador de favoritos.
- Hook `useGestureNavigation` habilitando swipes (Home ⇄ Favoritos e voltar dos detalhes).
- Primeira bateria de testes com **Vitest + RTL** cobrindo navegação via menu e gestos.
- Protótipo inicial para reutilizar lógica no app mobile (Expo).

### Plano TP5 (ordenado por prioridade)
1. Finalizar tela inicial no **Expo** consumindo os mesmos eventos do web e replicando os gestos.
2. Padronizar navegação (menus e gestures) entre web e mobile, garantindo acessibilidade.
3. Expandir a suíte de testes (favoritos, detalhes e fluxos de erro) usando React Testing Library.
4. Ajustar documentação e onboarding para o cenário web + mobile (README e guias rápidos).
5. Validar a experiência mobile em dispositivos reais e registrar feedbacks do usuário.

---

## 1. Funcionalidades Pendentes

### 1.1 Busca e Filtros
- [ ] Adicionar campo de busca para pesquisar eventos por nome
- [ ] Criar filtros para buscar eventos por categoria
- [ ] Adicionar filtro por data (eventos futuros, passados, por período)
- [ ] Implementar filtro por cidade/localização
- [ ] Adicionar opção para ordenar eventos (por data, alfabética, etc)

### 1.2 Melhorias na Visualização
- [ ] Mostrar imagens dos eventos nos cards (quando disponível na API)
- [ ] Adicionar página de detalhes mais completa com mais informações
- [ ] Melhorar layout dos cards de eventos
- [ ] Adicionar informações de preço quando disponível
- [ ] Mostrar número de vagas ou ingressos disponíveis

### 1.3 Funcionalidades de Evento
- [ ] Tornar o botão "Inscrever-se" funcional (salvar interesse)
- [ ] Implementar funcionalidade de compartilhar evento
- [ ] Adicionar link para compra de ingressos (se disponível na API)
- [ ] Criar notificações de lembrete para eventos favoritos

### 1.4 Paginação e Navegação
- [ ] Adicionar paginação na lista de eventos
- [ ] Implementar botão "Carregar mais eventos"
- [ ] Adicionar indicador de quantidade total de eventos
- [x] Melhorar navegação entre páginas

### 1.5 Experiência Mobile Nativa
- [x] Mapear gestos essenciais (swipe horizontal e vertical)
- [ ] Publicar o app Expo com as telas principais
- [ ] Integrar favoritos e detalhes na versão mobile
- [ ] Ajustar navegação para padrões nativos (stack/tab)

---

## 2. Melhorias Técnicas

### 2.1 Organização do Código
- [ ] Separar melhor as responsabilidades dos componentes
- [ ] Criar hooks customizados para lógica reutilizável
- [ ] Organizar melhor a estrutura de pastas
- [ ] Melhorar nomes de variáveis e funções

### 2.2 Performance
- [ ] Otimizar carregamento inicial da aplicação
- [ ] Melhorar tempo de resposta ao buscar eventos
- [ ] Otimizar imagens e recursos estáticos
- [ ] Adicionar cache para eventos já carregados

### 2.3 Tratamento de Erros
- [ ] Melhorar mensagens de erro para o usuário
- [ ] Adicionar tratamento quando a API não responder
- [ ] Validar dados antes de exibir na tela
- [ ] Mostrar feedback quando não houver eventos

### 2.4 Validação
- [ ] Validar dados recebidos da API
- [ ] Verificar se os dados estão completos antes de exibir
- [ ] Adicionar validação em campos de busca e filtros

---

## 3. Interface e Experiência do Usuário

### 3.1 Design Visual
- [ ] Melhorar cores e tipografia
- [ ] Adicionar animações simples nas transições
- [ ] Criar estados visuais melhores (hover, active, etc)
- [ ] Adicionar mais ícones e elementos visuais

### 3.2 Responsividade
- [ ] Melhorar visualização em tablets
- [ ] Otimizar ainda mais para dispositivos móveis
- [ ] Testar em diferentes tamanhos de tela
- [ ] Garantir que todos os elementos sejam clicáveis no mobile

### 3.3 Feedback ao Usuário
- [ ] Mostrar mensagens de sucesso ao favoritar evento
- [ ] Adicionar confirmação ao remover favorito
- [ ] Melhorar indicadores de carregamento
- [ ] Adicionar mensagens informativas quando necessário

### 3.4 Acessibilidade
- [ ] Adicionar textos alternativos em imagens
- [ ] Melhorar contraste de cores
- [ ] Garantir navegação por teclado
- [ ] Adicionar descrições para elementos interativos

---

## 4. Testes

### 4.1 Testes Básicos
- [ ] Criar testes para os principais componentes
- [ ] Testar funções de favoritar/desfavoritar
- [x] Testar navegação entre páginas
- [ ] Verificar se a integração com API funciona corretamente

### 4.2 Testes Manuais
- [ ] Testar em diferentes navegadores (Chrome, Firefox, Edge)
- [ ] Testar em dispositivos móveis
- [ ] Validar todos os fluxos principais da aplicação
- [ ] Testar casos de erro (sem internet, API indisponível)

---

## 5. Documentação

### 5.1 Documentação do Projeto
- [x] Atualizar README com novas funcionalidades
- [x] Documentar como usar a aplicação
- [x] Explicar como configurar o ambiente de desenvolvimento
- [x] Adicionar informações sobre as tecnologias usadas

### 5.2 Documentação do Código
- [ ] Adicionar comentários explicativos no código
- [ ] Documentar funções principais
- [ ] Explicar a estrutura de pastas

---

## 6. Deploy e Publicação

### 6.1 Preparação para Deploy
- [ ] Otimizar build de produção
- [ ] Configurar variáveis de ambiente
- [ ] Testar build local antes de publicar
- [ ] Preparar arquivos para publicação

### 6.2 Publicação
- [ ] Escolher plataforma de hospedagem (Netlify, Vercel, etc)
- [ ] Configurar deploy automático
- [ ] Publicar aplicação online
- [ ] Testar aplicação publicada

---

## 7. Funcionalidades Futuras (Opcional)

### 7.1 Funcionalidades Avançadas
- [ ] Adicionar modo escuro (dark mode)
- [ ] Permitir criar eventos personalizados
- [ ] Adicionar comentários/avaliações nos eventos
- [ ] Criar sistema de recomendações
- [ ] Adicionar integração com calendário

### 7.2 Melhorias Extras
- [ ] Implementar PWA (aplicativo instalável)
- [ ] Adicionar notificações
- [ ] Criar sistema de usuários/login
- [ ] Adicionar exportar eventos para PDF
- [ ] Implementar compartilhamento em redes sociais

---

## Priorização

### Alta Prioridade (Próximas Entregas)
1. Consolidar app mobile (Expo) com gestos equivalentes ao web
2. Expandir testes automatizados com React Testing Library
3. Ajustar documentação para web + mobile
4. Sistema de autenticação
5. Melhorias na responsividade mobile

### Média Prioridade
1. Funcionalidades de evento (inscrever-se, compartilhar)
2. Melhorias de performance
3. Tratamento de erros melhorado
4. Busca e filtros básicos
5. Melhorias visuais e de UX

### Baixa Prioridade (Futuro)
1. Funcionalidades avançadas
2. Sistema de usuários
3. PWA e notificações
4. Integrações extras
5. Funcionalidades opcionais

---

## Observações

- Este backlog pode ser atualizado conforme o desenvolvimento avança
- As prioridades podem mudar de acordo com as necessidades do projeto
- Algumas tarefas podem ser realizadas em conjunto
- Focar primeiro nas funcionalidades de alta prioridade

---

**Projeto:** EventUp  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Data:** 2025

