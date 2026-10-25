/* ==========================================================================
   Pergunte ao portfólio — perguntas, respostas e busca por palavras-chave.
   As respostas contam o que cada sistema faz e para quem, sem detalhar como
   ele foi construído por dentro.
   ========================================================================== */
((root, factory) => {
  const api = factory()
  if (typeof module === 'object' && module.exports) module.exports = api
  if (root) root.PortfolioKB = api
})(typeof window !== 'undefined' ? window : null, () => {
  'use strict'

  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

  // Ordem importa no desempate: perguntas específicas vêm antes das gerais.
  const KB = [
    // --- Quem é ----------------------------------------------------------------
    { id: 'resumo', q: 'Resumo em 30 segundos', keys: ['resumo', 'quem e voce', 'sobre voce', 'perfil', 'apresenta', '30', 'curriculo'], src: [['início', '#inicio'], ['carreira', '#carreira']],
      a: 'Sou o Rafael, engenheiro de software full stack de Ourinhos, SP. Desenvolvo desde 2020: quase quatro anos em microsserviços do Itaú Unibanco pela TCS (antifraude, pagamentos, dados BACEN e limite da conta), depois uma plataforma de seguro de vida orientada a eventos na AWS e, desde outubro de 2025, IA generativa na Cadastra, onde desenvolvo agentes e integrações da AstraOS. Também criei três produtos completos: OrdenaHub, Vetnix e Mix Awards. O currículo completo em PDF está na seção de contato.' },
    { id: 'diferencial', q: 'Qual seu diferencial?', keys: ['diferencial', 'por que voce', 'por que contratar', 'ponto forte', 'destaca', 'vantagem'], src: [['início', '#inicio'], ['carreira', '#carreira']],
      a: 'Juntar três coisas que raramente andam juntas: anos em sistemas onde falhar custa caro, como os do Itaú, IA generativa em produção na Cadastra e produtos que eu levei sozinho do banco de dados à tela. E vim do suporte técnico, então penso na operação e em quem vai usar o sistema desde o primeiro dia.' },
    { id: 'local', q: 'Onde você mora?', keys: ['onde voce mora', 'mora', 'cidade', 'ourinhos', 'remoto', 'presencial', 'hibrido', 'mudar de cidade', 'localizacao'], src: [['início', '#inicio'], ['contato', '#contato']],
      a: 'Moro em Ourinhos, no interior de São Paulo. Para conversar sobre o formato de trabalho, seja remoto, híbrido ou presencial, o melhor caminho é o e-mail ou o LinkedIn na seção de contato.' },

    // --- Carreira --------------------------------------------------------------
    { id: 'carreira', q: 'Onde você já trabalhou?', keys: ['trabalhou', 'empresas', 'carreira', 'historico', 'passou', 'experiencias anteriores'], src: [['carreira', '#carreira']],
      a: 'Cadastra (desde out/2025), como Full Stack Pleno na plataforma de IA AstraOS. Mercadinho do Zé (jul/2024 a out/2025), como Backend Pleno na plataforma de seguro de vida. Tata Consultancy Services (dez/2020 a jul/2024), alocado no Itaú Unibanco, de trainee a pleno. Antes disso, cinco anos em suporte e infraestrutura de TI. Formado pela FATEC Ourinhos.' },
    { id: 'cadastra', q: 'O que você faz na Cadastra?', keys: ['cadastra', 'faz na cadastra', 'trabalho atual', 'emprego atual', 'atualmente', 'hoje'], src: [['carreira', '#job-cadastra'], ['IA', '#ia']],
      a: 'Desde outubro de 2025 sou Desenvolvedor Full Stack Pleno na Cadastra. Trabalho na AstraOS, a plataforma de IA generativa da empresa, no time que constrói as integrações e os agentes: servidores MCP que conectam modelos a dados corporativos, soluções de RAG, APIs REST e autenticação. Também atuei no sistema de reservas de escritórios. No dia a dia uso Node.js, TypeScript, Python, React, Svelte, Vue.js, PostgreSQL, Redis, AWS e GCP.' },
    { id: 'mercadinho', q: 'O que você fez no Mercadinho do Zé?', keys: ['mercadinho', 'ze', 'seguro de vida', 'apolice', 'backend pleno'], src: [['carreira', '#job-seguros']],
      a: 'De julho de 2024 a outubro de 2025 fui Desenvolvedor Backend Pleno na plataforma de seguro de vida da empresa. Cuidei das integrações com APIs de parceiros, plataformas de pagamento e gestão de apólices, e dos fluxos assíncronos com filas e eventos na AWS, para que operações financeiras fossem confiáveis e rastreáveis. Stack: Node.js, TypeScript, AdonisJS, PostgreSQL, DynamoDB, Lambda, SQS, EventBridge e Jenkins.' },
    { id: 'tcs', q: 'Como foi sua passagem pela TCS?', keys: ['tcs', 'tata', 'trainee', 'junior', 'londrina', 'limite da conta'], src: [['carreira', '#job-tcs']],
      a: 'Foram 3 anos e 8 meses, de dezembro de 2020 a julho de 2024, alocado no Itaú Unibanco. Entrei como trainee, com formação em engenharia de software corporativa em Londrina. Como júnior, trabalhei em Antifraude, Pagamentos e Dados BACEN. Como pleno, no Limite da Conta, com automações na AWS e infraestrutura com Terraform. Foi onde aprendi a construir sistemas de missão crítica.' },
    { id: 'fin', q: 'Experiência com sistemas financeiros?', keys: ['financeir', 'banco', 'bancari', 'itau', 'pagamento', 'antifraude', 'bacen', 'fintech', 'missao critica'], src: [['carreira', '#job-tcs']],
      a: 'Sim, é a base da minha carreira. No Itaú Unibanco atuei nas frentes de Antifraude, Pagamentos, Dados BACEN e Limite da Conta, com microsserviços Java/Spring, Kafka, SQS e arquitetura hexagonal, monitorados com Grafana, Splunk e CloudWatch. Depois, numa plataforma de seguro de vida, projetei fluxos assíncronos com Lambda, SQS e EventBridge para dar confiabilidade e rastreabilidade a operações financeiras.' },
    { id: 'suporte', q: 'Como você começou na tecnologia?', keys: ['como voce comecou', 'comecou', 'suporte', 'infraestrutura', 'escolpi', 'prefeitura', 'tecbit', 'origem', 'primeiro emprego'], src: [['carreira', '#carreira']],
      a: 'Comecei em 2015 no suporte técnico da TecBit. Depois passei pela Prefeitura Municipal de Ourinhos (2018 a 2019) e fui especialista em suporte de TI na Escolpi Informática (2019 a 2020). Foram anos resolvendo problemas reais de usuários, redes e máquinas antes do primeiro microsserviço, e é daí que vem o meu cuidado com a operação e com quem usa o sistema.' },
    { id: 'tempo', q: 'Quanto tempo de experiência?', keys: ['anos', 'tempo', 'senior', 'nivel', 'quanto'], src: [['em números', '#numeros'], ['carreira', '#carreira']],
      a: 'Desenvolvo profissionalmente desde dezembro de 2020, quase seis anos, de trainee a pleno no Itaú via TCS e atuando como pleno desde então. Trabalho com tecnologia desde 2015, quando comecei no suporte técnico.' },
    { id: 'formacao', q: 'Qual sua formação?', keys: ['formacao', 'faculdade', 'fatec', 'graduacao', 'estudou', 'curso', 'certifica', 'diploma'], src: [['contato', '#contato']],
      a: 'Sou formado em Engenharia de Software pela FATEC Ourinhos (2016 a 2019). Tenho a certificação AWS Certified Cloud Practitioner (2022) e cursos de Spring Framework 5 e Spring Boot 2, Arquitetura Hexagonal (Ports and Adapters) e Angular 10 com Spring Boot 2.' },

    // --- Técnica ---------------------------------------------------------------
    { id: 'ia', q: 'Qual sua experiência com IA?', keys: ['ia', 'inteligencia', 'llm', 'agente', 'gpt', 'mcp', 'rag', 'artificial', 'generativa'], src: [['IA', '#ia'], ['carreira', '#job-cadastra']],
      a: 'Na Cadastra, desenvolvo a AstraOS, a plataforma de IA generativa da empresa. Sou responsável pela arquitetura e implementação de servidores MCP que conectam modelos generativos a dados corporativos em tempo real, além de soluções de RAG, integrações com plataformas e autenticação. Trabalho com orquestração multiagente, tool calling, skills sob demanda e geração de artefatos como dashboards, apresentações e planilhas.' },
    { id: 'astra', q: 'O que é a AstraOS?', keys: ['astraos', 'astra', 'plataforma de ia'], src: [['IA', '#ia']],
      a: 'A AstraOS é a plataforma de IA generativa da Cadastra, um produto e uma marca da empresa. Ela reúne, numa interface de conversa, agentes que consultam dados de marketing, analisam campanhas e produzem entregáveis prontos. Um orquestrador divide cada pedido entre agentes especialistas. Eu atuo como desenvolvedor no time que constrói as integrações e os agentes.' },
    { id: 'java', q: 'Você trabalha com Java?', keys: ['java', 'spring', 'jpa', 'hibernate', 'kafka'], src: [['carreira', '#job-tcs'], ['conhecimentos', '#stack']],
      a: 'Sim. Foi minha base por quase quatro anos no Itaú Unibanco: Java 8 e 11, Spring Boot, JPA e Hibernate, Kafka e SQS em microsserviços com arquitetura hexagonal, Terraform e GitHub Actions. Hoje trabalho mais com Node.js, TypeScript e Python, mas transito bem entre os dois mundos.' },
    { id: 'stack', q: 'Quais tecnologias você usa?', keys: ['tecnologia', 'stack', 'linguagem', 'ferramenta', 'framework', 'domina', 'node', 'typescript', 'react', 'python'], src: [['conhecimentos', '#stack']],
      a: 'No back-end, Node.js com TypeScript (AdonisJS, Express e Fastify), Java com Spring Boot e Python. No front-end, React, Svelte e Vue.js com Tailwind. Dados em PostgreSQL, DynamoDB, MongoDB e Redis. Mensageria com Kafka, SQS e EventBridge, nuvem AWS e GCP. A seção de conhecimentos mostra onde usei cada uma.' },
    { id: 'formacao-aws', q: 'Tem certificação na AWS?', keys: ['certificacao aws', 'aws certified', 'cloud practitioner'], src: [['contato', '#contato']],
      a: 'Tenho a AWS Certified Cloud Practitioner, de 2022. Na prática, uso AWS desde o Itaú, com Lambda, SQS, EC2, S3, CloudWatch e Terraform, e continuei usando na plataforma de seguros e na Cadastra.' },
    { id: 'nuvem', q: 'Tem experiência com nuvem?', keys: ['aws', 'nuvem', 'cloud', 'gcp', 'terraform', 'docker', 'devops', 'ec2', 'deploy'], src: [['conhecimentos', '#stack']],
      a: 'Sim. No Itaú usei Lambda, SQS, EC2, S3 e CloudWatch, com infraestrutura em Terraform e pipelines no GitHub Actions. Na plataforma de seguros, Lambda, SQS, EventBridge, RDS, DynamoDB e S3. Na Cadastra trabalho com AWS e GCP. Meus produtos rodam em servidor próprio que eu mesmo mantenho.' },
    { id: 'arquitetura', q: 'Que arquitetura você usa?', keys: ['arquitetura', 'hexagonal', 'microsservico', 'orientad', 'mensageria', 'design de sistema'], src: [['conhecimentos', '#stack'], ['carreira', '#carreira']],
      a: 'Escolho pela necessidade do problema. No Itaú, microsserviços com arquitetura hexagonal e mensageria com Kafka e SQS. Na plataforma de seguros, arquitetura orientada a eventos na AWS. Nos meus produtos, SaaS multiempresa com cada cliente isolado. Em todos, o foco é confiabilidade, rastreabilidade e um código que outra pessoa consiga manter.' },
    { id: 'seguranca', q: 'Como você cuida de segurança?', keys: ['seguranca', 'autenticacao', 'jwt', 'oauth', 'permissao', 'lgpd', 'protecao'], src: [['IA', '#ia'], ['carreira', '#job-cadastra']],
      a: 'Autenticação com JWT, OAuth2 e Google, permissões respeitadas por usuário e acesso bloqueado por padrão. Nenhum segredo fica no código. Nos meus produtos, cada empresa só enxerga os próprios dados, e documentos importantes não são apagados, apenas cancelados, para manter o histórico.' },

    // --- Sistemas próprios -------------------------------------------------------
    { id: 'solo', q: 'Você fez os sistemas sozinho?', keys: ['sozinho', 'sozinha', 'quem fez', 'quem desenvolveu', 'sem equipe'], src: [['projetos', '#projetos']],
      a: 'Sim. Os três produtos foram concebidos, desenhados e desenvolvidos por mim, do banco de dados à interface, em paralelo ao meu trabalho. Nas empresas, trabalho em times, e gosto dos dois formatos.' },
    { id: 'tempo-sistemas', q: 'Quanto tempo levou para fazer os sistemas?', keys: ['quanto tempo levou', 'levou', 'demorou', 'prazo', 'tempo de desenvolvimento', 'commits'], src: [['projetos', '#projetos']],
      a: 'O Mix Awards foi o primeiro: de setembro de 2025 a julho de 2026, com 82 commits. O Vetnix foi de junho a setembro de 2026. O OrdenaHub começou em julho de 2026, já passa de 137 commits e continua evoluindo. Todos foram feitos em paralelo ao meu trabalho.' },
    { id: 'codigo', q: 'Posso ver o código dos sistemas?', keys: ['codigo', 'github', 'repositorio', 'open source', 'demo', 'demonstracao', 'testar'], src: [['projetos', '#projetos'], ['contato', '#contato']],
      a: 'O código dos produtos é privado, porque são sistemas comerciais. Nas seções de projetos há demonstrações com dados ilustrativos de como cada um funciona. Meu GitHub é raelcarvalho, e se quiser ver um sistema rodando, me chame pelo e-mail ou LinkedIn que eu marco uma demonstração.' },
    { id: 'produtos', q: 'Quais sistemas você criou?', keys: ['sistemas', 'produtos', 'criou', 'seus projetos', 'projetos proprios'], src: [['projetos', '#projetos']],
      a: 'Três produtos completos. O OrdenaHub é um ERP em nuvem para pequenas e médias empresas. O Vetnix é um sistema de gestão para clínicas e hospitais veterinários, com um portal para o tutor do pet. O Mix Awards é uma plataforma para uma comunidade de jogadores da GamersClub. Cada um resolve a operação de um setor diferente.' },
    { id: 'oh-fiscal', q: 'O OrdenaHub emite nota fiscal?', keys: ['nota fiscal', 'nf-e', 'nfe', 'nfc-e', 'nfce', 'nfs-e', 'nfse', 'danfe', 'sefaz', 'emite'], src: [['OrdenaHub', '#ordenahub']],
      a: 'Emite. O OrdenaHub gera NF-e, NFC-e e NFS-e direto do sistema, com prévia da DANFE antes de emitir e um plano de contingência quando a SEFAZ fica fora do ar. A nota da mensalidade de cada assinante também sai automaticamente.' },
    { id: 'oh-quem', q: 'Para quem é o OrdenaHub?', keys: ['quem usa o ordenahub', 'para quem e o ordenahub', 'assistencia', 'usinagem', 'comercio', 'ramo'], src: [['OrdenaHub', '#ordenahub']],
      a: 'Para pequenas e médias empresas que precisam organizar a operação. Ele nasceu para assistências técnicas controlarem ordens de serviço e hoje atende também usinagens e comércio. Cada empresa usa o sistema com a própria marca e vê só os módulos que fazem sentido para o seu ramo.' },
    { id: 'oh', q: 'O que é o OrdenaHub?', keys: ['ordenahub', 'erp', 'saas', 'ordem de servico', 'orcamento', 'estoque'], src: [['OrdenaHub', '#ordenahub']],
      a: 'É um ERP em nuvem, multiempresa, que eu criei. Cada empresa contratante opera no próprio endereço e só vê os módulos do seu ramo: ordens de serviço, orçamentos, vendas, compras, estoque, financeiro com conciliação bancária e DRE, e emissão de notas fiscais. É vendido por assinatura mensal.' },
    { id: 'vet-tutor', q: 'Como o tutor acompanha o pet no Vetnix?', keys: ['tutor', 'acompanha', 'carteira', 'vacina', 'boletim', 'whatsapp', 'portal'], src: [['Vetnix', '#vetnix']],
      a: 'Pelo portal do tutor, com a carteira digital do pet: vacinas, próximas doses, consultas e boletins sempre atualizados. Quando o animal está internado, o tutor recebe pelo WhatsApp um boletim escrito em linguagem humana, sem termos técnicos.' },
    { id: 'vet', q: 'O que é o Vetnix?', keys: ['vetnix', 'vet', 'veterinar', 'plantao', 'clinica', 'animal', 'pet'], src: [['Vetnix', '#vetnix']],
      a: 'É um sistema de gestão para clínicas e hospitais veterinários: agenda, prontuário, internação, prescrições, receituário em PDF, hotel, orçamentos e cobranças. A equipe de plantão vê o que aconteceu e o que falta fazer em cada turno. Do outro lado, o tutor acompanha o próprio animal pelo portal.' },
    { id: 'mix', q: 'Como funciona o Mix Awards?', keys: ['mix', 'awards', 'game', 'jogo', 'gamersclub', 'gamifica', 'figurinha', 'cs'], src: [['Mix Awards', '#mixawards']],
      a: 'É uma plataforma para uma comunidade de jogadores da GamersClub. As partidas viram estatísticas, gráficos e ranking, e o bom desempenho rende recompensas colecionáveis ao longo da temporada, que termina com a cerimônia Mix Awards. Dá para abrir um pacote de figurinhas na seção dele.' },

    // --- Contratação e o site -----------------------------------------------------
    { id: 'medida', q: 'Você faz sistema sob medida?', keys: ['medida', 'negocio', 'entrega', 'entrego', 'projeto para', 'contratar um sistema', 'orcamento de sistema'], src: [['projetos', '#projetos'], ['contato', '#contato']],
      a: 'Faço. Começo entendendo a operação: quem faz o quê, onde o trabalho trava e o que hoje vive em planilha ou no WhatsApp. Depois entrego em partes que já funcionam, do banco de dados à tela, com o sistema no ar e documentado. Foi assim que nasceram o OrdenaHub e o Vetnix.' },
    { id: 'disp', q: 'Está disponível?', keys: ['disponivel', 'vaga', 'contrat', 'freela', 'proposta', 'oportunidade', 'contato', 'email', 'e-mail', 'falar', 'pdf', 'baixar', 'linkedin'], src: [['contato', '#contato']],
      a: 'Estou aberto a posições de engenharia de software, principalmente em times que constroem produtos com IA, e a projetos sob medida. O caminho mais rápido é o e-mail rafael.carvalho.xd1@gmail.com ou o LinkedIn. O currículo em PDF está na seção de contato.' },
    { id: 'site', q: 'Como este site funciona?', keys: ['site', 'portfolio', 'feito', 'memoria', 'lembra', 'privacidade', 'cookie'], src: [['contato', '#contato']],
      a: 'Foi feito do zero com HTML, CSS e JavaScript. Ele lembra, só no seu navegador, o modo de leitura escolhido, as seções que você viu, onde parou e o que perguntou aqui. Nada é enviado, e o botão "Esquecer minha visita" no rodapé apaga tudo.' },
    { id: 'ajuda', q: 'O que posso perguntar?', keys: ['o que posso perguntar', 'perguntar', 'ajuda', 'o que voce sabe', 'topicos', 'opcoes'], src: [['início', '#inicio']],
      a: 'Pode perguntar sobre a minha carreira (Cadastra, Mercadinho do Zé, TCS no Itaú e o começo no suporte), formação e certificações, tecnologias, IA, nuvem e arquitetura, sobre o OrdenaHub, o Vetnix e o Mix Awards, quanto tempo levou cada um, e sobre disponibilidade e contato.' },
  ]

  // Palavras-chave em inglês, para quem pergunta no site traduzido.
  const KEYS_EN = {
    resumo: ['summary', 'who are you', 'about you', 'profile', 'resume', 'cv'], diferencial: ['sets you apart', 'why hire', 'strength', 'stand out', 'different'],
    local: ['where do you live', 'live', 'city', 'remote', 'on-site', 'hybrid', 'relocate', 'location'], carreira: ['worked', 'companies', 'career', 'experience at', 'history'],
    cadastra: ['cadastra', 'current job', 'currently', 'today', 'nowadays'], mercadinho: ['mercadinho', 'life insurance', 'policies', 'backend developer'],
    tcs: ['tcs', 'tata', 'trainee', 'junior', 'londrina', 'account limit'], fin: ['financial', 'bank', 'banking', 'itau', 'payment', 'antifraud', 'fraud', 'fintech', 'mission critical'],
    suporte: ['how did you start', 'get started', 'started', 'it support', 'origin', 'first job'], tempo: ['years', 'how much experience', 'seniority', 'level', 'how long have you'],
    formacao: ['education', 'degree', 'college', 'university', 'fatec', 'studied', 'course'], ia: ['ai', 'artificial intelligence', 'llm', 'agent', 'mcp', 'rag', 'generative'],
    astra: ['astraos', 'astra', 'ai platform'], java: ['java', 'spring', 'jpa', 'hibernate', 'kafka'], stack: ['technologies', 'tech stack', 'stack', 'languages', 'tools', 'framework'],
    'formacao-aws': ['aws certification', 'certified', 'cloud practitioner', 'certification'], nuvem: ['aws', 'cloud', 'gcp', 'terraform', 'docker', 'devops', 'deploy'],
    arquitetura: ['architecture', 'hexagonal', 'microservice', 'event-driven', 'system design'], seguranca: ['security', 'authentication', 'jwt', 'oauth', 'permissions'],
    solo: ['alone', 'by yourself', 'on your own', 'solo', 'who built'], 'tempo-sistemas': ['how long did it take', 'take to build', 'took', 'timeline', 'commits'],
    codigo: ['code', 'github', 'repository', 'source', 'open source', 'demo'], produtos: ['systems', 'products', 'built', 'your projects', 'side projects'],
    'oh-fiscal': ['tax invoice', 'invoice', 'nf-e', 'nfe', 'nfc-e', 'nfs-e', 'sefaz', 'issue'], 'oh-quem': ['who is ordenahub for', 'repair shop', 'machining', 'retail', 'industry'],
    oh: ['ordenahub', 'erp', 'saas', 'work order', 'inventory'], 'vet-tutor': ['owner', 'follow', 'pet card', 'vaccine', 'whatsapp', 'portal'],
    vet: ['vetnix', 'vet', 'veterinary', 'clinic', 'animal', 'pet'], mix: ['mix', 'awards', 'game', 'gamersclub', 'sticker', 'cs'],
    medida: ['custom', 'tailor', 'build me', 'hire you for a project', 'deliver'], disp: ['available', 'availability', 'hire', 'job', 'freelance', 'contact', 'email', 'linkedin', 'pdf'],
    site: ['this site', 'website', 'portfolio', 'memory', 'remember', 'privacy', 'cookie'], ajuda: ['what can i ask', 'ask', 'help', 'topics', 'options'],
  }

  const SUGGEST = {
    rec: ['resumo', 'carreira', 'tempo', 'formacao', 'diferencial', 'cadastra', 'tcs', 'disp'],
    dev: ['java', 'stack', 'arquitetura', 'ia', 'nuvem', 'produtos', 'codigo', 'fin'],
    cli: ['medida', 'produtos', 'oh', 'vet', 'oh-fiscal', 'solo', 'tempo-sistemas', 'disp'],
  }

  // Palavras curtas ("ia", "cs", "ze") só valem como palavra inteira; expressões
  // com mais de uma palavra pesam o dobro por serem mais específicas.
  function score(entry, text) {
    const hits = [...entry.keys, ...(KEYS_EN[entry.id] || [])].reduce((total, key) => {
      const k = norm(key)
      const found = k.length <= 3
        ? new RegExp(`(^|[^a-z0-9])${k}([^a-z0-9]|$)`).test(text)
        : text.includes(k)
      return total + (found ? (k.includes(' ') ? 2 : 1) : 0)
    }, 0)
    return hits + (norm(entry.q) === text ? 3 : 0)
  }

  function answer(question) {
    const text = norm(String(question || '')).trim()
    let best = null
    let top = 0
    for (const entry of KB) {
      const value = score(entry, text)
      if (value > top) { top = value; best = entry }
    }
    if (!best) {
      return { id: null, a: 'Essa eu ainda não sei responder por aqui. Tente uma das sugestões abaixo ou fale direto comigo pelo e-mail na seção de contato.', src: [['contato', '#contato']], conf: 'baixa' }
    }
    return { id: best.id, a: best.a, src: best.src, conf: top >= 2 ? 'alta' : 'média' }
  }

  // Quatro sugestões por modo de leitura, mostrando antes as ainda não perguntadas.
  function suggestions(lens, askedIds) {
    const list = SUGGEST[lens] || SUGGEST.rec
    const asked = new Set(askedIds || [])
    return [...list.filter((id) => !asked.has(id)), ...list.filter((id) => asked.has(id))].slice(0, 4)
  }

  return { KB, SUGGEST, answer, suggestions, norm }
})
