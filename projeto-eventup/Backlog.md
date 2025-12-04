# Backlog - EventUp  

Backlog de atividades planejadas para as próximas entregas do projeto EventUp.

---

## Atualização Pós-Sprint

### Expectativa do Cliente
- Manter um **menu de navegação claro entre Home e Favoritos**.
- Evoluir a experiência mobile para algo mais próximo de um app nativo.
- Futuramente adotar **React Testing Library** para garantir qualidade.

---

## 1. Funcionalidades Pendentes / Entregues

### 1.1 Busca e Filtros
- [X] Adicionar campo de busca para pesquisar eventos por nome
- [X] Criar filtros para buscar eventos (categoria)
- [X] Implementar compartilhamento em redes sociais
- [X] Implementar filtro por cidade/localização

### 1.2 Melhorias na Visualização
- [X] Adicionar página de detalhes com mais informações
- [X] Melhorar layout dos cards de eventos
- [ ] Adicionar informações de preço quando disponível (API não fornece)
- [ ] Mostrar número de vagas ou ingressos disponíveis (API não fornece)

### 1.3 Funcionalidades de Evento
- [X] Criar funcionalidade de favoritar eventos
- [X] Criar tela/lista de eventos favoritos
- [ ] Tornar o botão "Inscrever-se" funcional
- [ ] Adicionar link para compra de ingressos (quando API permitir)

### 1.4 Paginação e Navegação
- [X] Adicionar paginação na lista de eventos
- [ ] Adicionar indicador de quantidade total de eventos
- [X] Melhorar navegação entre páginas

### 1.5 Experiência Mobile Nativa
- [x] Mapear gestos essenciais (swipe horizontal e vertical)
- [X] Integrar favoritos e detalhes na versão mobile
- [X] Ajustar navegação para padrões nativos

---

## 2. Melhorias Técnicas

### 2.1 Organização do Código
- [x] Organizar estrutura principal de páginas e componentes
- [ ] Separar melhor as responsabilidades dos componentes
- [ ] Criar hooks customizados para lógica reutilizável
- [X] Melhorar nomes de variáveis e funções

### 2.2 Performance
- [X] Otimizar carregamento inicial da aplicação
- [X] Melhorar tempo de resposta ao buscar eventos
- [ ] Otimizar imagens e recursos estáticos
- [ ] Adicionar cache para eventos já carregados

### 2.3 Tratamento de Erros
- [X] Melhorar mensagens de erro para o usuário
- [x] Exibir fallback quando o evento não existir
- [X] Adicionar tratamento quando a API não responder
- [X] Mostrar feedback quando não houver eventos

### 2.4 Validação
- [X] Validar dados recebidos da API
- [X] Verificar se os dados estão completos antes de exibir
- [X] Adicionar validação em campos de busca e filtros

---

## 3. Interface e Experiência do Usuário

### 3.1 Design Visual
- [X] Melhorar cores e tipografia
- [X] Adicionar animações nas transições
- [X] Criar estados visuais melhores (hover, active, etc)
- [X] Adicionar mais ícones e elementos visuais

### 3.2 Responsividade
- [X] Responsividade geral implementada
- [X] Melhorar visualização em tablets
- [X] Otimizar ainda mais para dispositivos móveis
- [X] Testar em diferentes tamanhos de tela
- [X] Garantir que todos os elementos sejam clicáveis no mobile

### 3.3 Feedback ao Usuário
- [X] Mostrar mensagens ao favoritar evento (alert)
- [X] Adicionar confirmação ao remover favorito
- [X] Melhorar indicadores de carregamento
- [X] Adicionar mensagens informativas adicionais

### 3.4 Acessibilidade
- [ ] Adicionar textos alternativos em imagens (API não fornece)
- [X] Melhorar contraste de cores
- [ ] Garantir navegação por teclado
- [ ] Adicionar descrições para elementos interativos

---

## 4. Testes

### 4.1 Testes Básicos
- [X] Criar testes para os principais componentes
- [X] Testar funções de favoritar/desfavoritar
- [x] Testar navegação entre páginas (fluxo manual validado)
- [X] Verificar integração com API

### 4.2 Testes Manuais
- [x] Testar em diferentes navegadores (Chrome, Firefox, Edge)
- [x] Testar em dispositivos móveis
- [x] Validar todos os fluxos principais da aplicação
- [X] Testar casos de erro (sem internet, API indisponível)

---

## 5. Documentação

### 5.1 Documentação do Projeto
- [x] Atualizar README com funcionalidades
- [x] Documentar como usar a aplicação
- [x] Explicar como configurar ambiente
- [x] Adicionar informações sobre tecnologias usadas

### 5.2 Documentação do Código
- [x] Adicionar comentários explicativos
- [x] Documentar funções principais
- [x] Explicar a estrutura de pastas

---

## 6. Deploy e Publicação

### 6.1 Preparação para Deploy
- [x] Otimizar build de produção
- [x] Configurar variáveis de ambiente
- [x] Testar build local
- [x] Preparar arquivos para publicação

### 6.2 Publicação (Futuro)
- [ ] Escolher plataforma de hospedagem  
- [ ] Configurar deploy automático  
- [ ] Publicar aplicação online  
- [ ] Testar aplicação publicada  

---

## 7. Funcionalidades Futuras (Opcional)

### 7.1 Funcionalidades Avançadas
- [ ] Adicionar modo escuro (dark mode)
- [ ] Permitir criar eventos personalizados
- [ ] Adicionar comentários/avaliações
- [ ] Criar sistema de recomendações
- [ ] Integração com calendário

### 7.2 Melhorias Extras
- [ ] Implementar PWA
- [ ] Adicionar notificações
- [ ] Exportar eventos para PDF
- [ ] Mostrar imagens adicionais nos cards

---

## Priorização

### Alta Prioridade
1. Paginação / carregamento   
2. Melhor tratamento de erros  
3. Ajuste de responsividade mobile  
4. Melhorias gerais de performance  
5. Testes automatizados  

### Média Prioridade
1. Função de inscrição  
2. Link de compra  
3. Modo escuro  
4. Melhorias de UX  
5. Acessibilidade  

### Baixa Prioridade (Futuro)
1. Funcionalidades avançadas  
2. PWA e notificações  
3. Sistema de usuários  
4. Recomendações  
5. Integrações extras  

---

## Observações

- Todos os itens que já existem no **código final** foram marcados como concluídos.  
- Funcionalidades que não fazem parte da entrega atual permanecem desmarcadas. 
- Algumas ideias desmarcadas foram deixadas apenas como itens futuros, pois vão além do escopo solicitado pelo TP.

---

**Projeto:** EventUp  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Data:** 2025
