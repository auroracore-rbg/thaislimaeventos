# Thais Lima Eventos — Site Profissional

## 🌸 Sobre o Projeto

Site profissional para **Thais Lima Eventos**, empresa de Assessoria e Cerimonial de casamentos e eventos especiais. Design sofisticado com paleta champagne/dourado, tipografia elegante e layout completamente responsivo.

---

## ✅ Funcionalidades Implementadas

- **Hero Section** com imagem de fundo, zoom animado e parallax suave
- **Preloader** animado com identidade visual da marca
- **Navegação fixa** com efeito de scroll, links ativos e menu mobile hambúrguer
- **Seção Sobre** com grid de imagens sobrepostas e badge de anos de experiência
- **6 Cards de Serviços** com efeito hover e animações
- **Portfólio** com filtros animados por categoria (Casamentos, Festas, Corporativos)
- **Banner Diferenciais** com imagem parallax e 4 cards de destaque
- **Slider de Depoimentos** com drag/swipe, auto-play e controles de navegação
- **Formulário de Contato** com:
  - Validação client-side
  - Máscara de telefone automática
  - Salvamento de leads na tabela `contatos`
  - Redirecionamento automático para WhatsApp após envio
- **Botão flutuante WhatsApp** com animação de pulso
- **Botão Voltar ao Topo**
- **Counter Animation** nos números estatísticos do hero
- **Reveal Animations** via IntersectionObserver em todas as seções
- **Cursor glow** decorativo (apenas desktop)
- **Footer completo** com links, redes sociais e informações de contato

---

## 📁 Estrutura de Arquivos

```
index.html           → Página principal
css/
  style.css          → Estilos completos (responsivo, animações, tema)
js/
  main.js            → JavaScript (interatividade, slider, form, animações)
README.md            → Documentação do projeto
```

---

## 🎨 Design System

| Token | Valor | Uso |
|-------|-------|-----|
| `--gold` | `#C9A96E` | Cor principal / CTAs |
| `--gold-dark` | `#A07840` | Hover states |
| `--gold-light` | `#E8D5B0` | Backgrounds suaves |
| `--cream` | `#FAF8F4` | Background principal |
| `--dark` | `#1A1008` | Textos e dark sections |
| Font Serif | Cormorant Garamond | Títulos e destaques |
| Font Sans | Jost | Corpo de texto e UI |

---

## 🗃️ Tabela de Dados

### `contatos`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | text | ID único |
| `nome` | text | Nome completo do cliente |
| `email` | text | E-mail |
| `telefone` | text | WhatsApp |
| `tipo` | text | Tipo de evento |
| `data` | text | Data prevista |
| `mensagem` | rich_text | Mensagem |
| `enviadoEm` | text | Timestamp do envio |

---

## 🔗 URLs e Endpoints

| Rota | Descrição |
|------|-----------|
| `/` → `index.html` | Página principal |
| `tables/contatos` | API de leads (POST) |

---

## 📱 Responsividade

- **Desktop** → layout full com 3 colunas
- **Tablet** → 2 colunas, ajuste de grids
- **Mobile** → 1 coluna, menu hambúrguer, slider simplificado

---

## 🚀 Deploy

Para publicar o site, acesse a aba **Publish** e clique em **Publish Project**.

---

## 💡 Próximos Passos Sugeridos

- [ ] Adicionar galeria lightbox para o portfólio
- [ ] Integrar Google Analytics / Meta Pixel
- [ ] Adicionar página de blog com dicas de casamento
- [ ] Implementar chat ao vivo
- [ ] Criar página de pacotes e preços
- [ ] Adicionar mapa de localização (Google Maps embed)
- [ ] Integrar com CRM para gestão de leads

---

*Desenvolvido com elegância para celebrar momentos únicos. 💛*
