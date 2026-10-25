# Rafael Carvalho — Portfólio

Site pessoal de Rafael Carvalho, engenheiro de software full stack. Reúne a trajetória profissional (Itaú Unibanco via TCS, seguros e IA generativa na Cadastra), os produtos que criei (OrdenaHub, Vetnix e Mix Awards), conhecimentos técnicos e contato.

**Acesse:** https://raelcarvalho.github.io

## Destaques

- **Bilíngue (PT/EN)**, com tradução feita no próprio navegador, sem recarregar a página.
- **Assistente "Pergunte"** (`Ctrl K`), que responde sobre carreira, projetos e disponibilidade a partir de uma base de conhecimento local.
- **Demos interativas dos produtos**, com dados ilustrativos:
  - **[OrdenaHub](https://www.ordenahub.com.br)**: ERP multiempresa, com o fluxo de cada ramo andando etapa por etapa até a nota fiscal.
  - **Vetnix**: plantão veterinário e carteira digital do pet.
  - **[Mix Awards](https://www.mixawards.com.br)**: partida importada da GamersClub e abertura de pacote de figurinhas.
- **Modos de leitura** (Recrutador, Dev, Cliente), que mudam o conteúdo em destaque.
- Respeita `prefers-reduced-motion` e funciona bem no celular.

## Tecnologias

HTML, CSS e JavaScript puros, sem framework e sem etapa de build. Fontes do Google Fonts. Testes com o test runner nativo do Node.js.

## Estrutura

```
.
├── index.html               # página única
├── assets/
│   ├── css/
│   │   ├── tokens.css       # design tokens (cores, tipografia, espaçamento)
│   │   └── styles.css       # estilos da página
│   ├── js/
│   │   ├── portfolio-kb.js  # base de conhecimento do assistente
│   │   ├── i18n.js          # dicionário e tradução PT/EN
│   │   ├── career-blueprint.js
│   │   └── app.js           # interações e demos
│   ├── img/stickers/        # figurinhas usadas na demo do Mix Awards
│   └── docs/                # currículo em PDF
├── tests/                   # testes (node --test)
├── .nojekyll                # publica os arquivos como estão no GitHub Pages
└── package.json
```

## Rodar localmente

Requer Node.js 22 ou superior.

```bash
npm start    # serve o site em http://localhost:8080
npm test     # roda os testes
```

Também funciona com qualquer servidor estático, por exemplo `python -m http.server`.

## Publicação

O GitHub Pages publica a branch `main` a partir da raiz (`Settings → Pages → Deploy from a branch → main / root`).

## Contato

- LinkedIn: [rafah-carvalho](https://www.linkedin.com/in/rafah-carvalho/)
- GitHub: [raelcarvalho](https://github.com/raelcarvalho)

---

O código dos produtos (OrdenaHub, Vetnix e Mix Awards) é privado. As demos deste site usam dados ilustrativos. AstraOS é um produto e uma marca da Cadastra.
