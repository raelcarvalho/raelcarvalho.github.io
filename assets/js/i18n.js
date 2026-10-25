/* ==========================================================================
   Idioma do portfólio: português (original) e inglês.
   O HTML continua em português; em inglês, cada texto é trocado pelo
   equivalente do dicionário, inclusive o que o app.js gera depois.
   ========================================================================== */
((root, factory) => {
  const api = factory(root)
  if (typeof module === 'object' && module.exports) module.exports = api
  if (root) root.I18N = api
})(typeof window !== 'undefined' ? window : null, (win) => {
  'use strict'

  const clean = (s) => String(s).replace(/\s+/g, ' ').trim()
  const LENS = { Recrutador: 'Recruiter', Dev: 'Dev', Cliente: 'Client' }

  // --- Textos fixos ------------------------------------------------------------
  const DICT = {
    // Cabeçalho, navegação e abertura
    'Pular para o conteúdo': 'Skip to content',
    'Carreira': 'Career', 'IA': 'AI', 'Projetos': 'Projects', 'Conhecimentos': 'Skills', 'Contato': 'Contact',
    'Perguntar': 'Ask', 'Seções': 'Sections', 'Rolar para baixo': 'Scroll down', 'Rafael Carvalho, início': 'Rafael Carvalho, home',
    'Idioma': 'Language',
    'carregando trajetória…': 'loading journey…', 'carregando carreira…': 'loading career…', 'conectando agentes…': 'connecting agents…', 'pronto.': 'ready.',
    'retomando de onde você estava…': 'picking up where you left off…',
    'Aberto a novas oportunidades': 'Open to new opportunities',
    'desde 2020 desenvolvendo · 384 contribuições no último ano': 'building software since 2020 · 384 contributions last year',
    'Engenheiro de software full stack': 'Full stack software engineer', 'IA generativa': 'Generative AI', 'Sistemas financeiros': 'Financial systems',
    'Construo': 'I build',
    'sistemas financeiros.': 'financial systems.', 'produtos SaaS.': 'SaaS products.', 'agentes de IA.': 'AI agents.', 'integrações que não falham.': 'integrations that don’t fail.',
    'Mais de cinco anos construindo software onde falhar custa caro. Passei pelos microsserviços de antifraude, pagamentos e dados regulatórios do': 'More than five years building software where failure is expensive. I worked on the antifraud, payments and regulatory data microservices of',
    ', por uma plataforma de seguros integrada a meios de pagamento e, hoje, desenvolvo agentes de IA generativa na': ', on an insurance platform integrated with payment providers and, today, I build generative AI agents at',
    '. Em paralelo, criei três produtos completos, do banco de dados à interface.': '. On the side, I built three complete products, from the database to the interface.',
    'Java e Spring Boot': 'Java and Spring Boot', 'com Kafka em microsserviços bancários.': 'with Kafka in banking microservices.',
    'Node.js e TypeScript': 'Node.js and TypeScript', 'com filas, eventos e Lambda na AWS. Agora,': 'with queues, events and Lambda on AWS. Now,',
    'servidores MCP, RAG e orquestração de agentes': 'MCP servers, RAG and agent orchestration',
    'em produção. Arquitetura hexagonal, SaaS multiempresa, emissão fiscal na SEFAZ e observabilidade fazem parte do meu dia a dia, não de uma lista de desejos.': 'in production. Hexagonal architecture, multi-company SaaS, Brazilian tax invoicing (SEFAZ) and observability are part of my daily work, not a wish list.',
    'Transformo a operação da sua empresa em sistema.': 'I turn the way your company operates into software.',
    'ERP com nota fiscal': 'ERP with tax invoices', ', financeiro e estoque;': ', finance and inventory;', 'gestão clínica': 'clinic management',
    'com agenda, prontuário e cobrança; plataformas com': 'with scheduling, medical records and billing; platforms with',
    'IA que faz o trabalho repetitivo': 'AI that does the repetitive work', 'pela equipe. Já construí sistemas pensados para assistências técnicas, usinagens, comércio, clínicas veterinárias e comunidades de jogadores.': 'for your team. I have built systems for repair shops, machining workshops, retail, veterinary clinics and gaming communities.',
    'Ver carreira': 'See career', 'Baixar currículo': 'Download résumé',
    'Como você quer ler este portfólio?': 'How do you want to read this portfolio?',
    'Recrutador': 'Recruiter', 'trajetória e impacto': 'track record and impact', 'Dev': 'Dev', 'arquitetura e stack': 'architecture and stack', 'Cliente': 'Client', 'o que eu entrego': 'what I deliver',
    'Da última vez você parou em': 'Last time you stopped at',
    '◎ Primeira visita. O texto da página se adapta ao modo escolhido, e eu lembro dele na próxima vez.': '◎ First visit. The page adapts to the mode you choose, and I’ll remember it next time.',
    'Primeira visita. O texto da página se adapta ao modo escolhido, e eu lembro dele na próxima vez.': 'First visit. The page adapts to the mode you choose, and I’ll remember it next time.',
    'role · o ruído vira ordem': 'scroll · noise turns into order',
    'Commits de maior impacto nos produtos': 'Highest-impact commits in my products',
    // Faixa de commits
    'prévia completa da DANFE antes de emitir': 'full invoice preview before issuing',
    'vacinação e carteira do pet no portal do tutor': 'vaccines and pet card in the owner portal',
    'NFS-e das assinaturas emitida via Asaas': 'service invoices issued for subscriptions',
    'cerimônia de encerramento da temporada': 'season closing ceremony',
    'contingência de NFC-e e painel de NFS-e': 'retail invoice fallback and service invoice panel',
    'boletim humanizado enviado por WhatsApp': 'friendly patient update sent via WhatsApp',
    'webhooks duráveis na integração fiscal': 'reliable webhooks in the tax integration',
    'ranking de duplas vitoriosas': 'ranking of winning duos',
    'conciliação de pagamentos no extrato bancário': 'payment reconciliation with bank statements',
    'assinatura mensal por clínica': 'monthly subscription per clinic',
    'bloqueio de acesso por mensalidade em atraso': 'access lock for overdue subscriptions',
    'nova arquitetura: API, web e migrations': 'new architecture: API, web and migrations',
    'receituário com exportação em PDF': 'prescriptions exported as PDF',
    'missões com reroll para os jogadores': 'missions with reroll for players',
    // Em números
    'Em números': 'In numbers', 'anos': 'years', 'produtos': 'products',
    'desenvolvendo software profissionalmente, desde dezembro de 2020': 'building software professionally, since December 2020',
    'em tecnologia, começando pelo suporte técnico em 2015': 'in tech, starting in IT support in 2015',
    'próprios em produção: ERP SaaS, gestão veterinária e plataforma gamer': 'of my own in production: SaaS ERP, veterinary management and a gaming platform',
    'frentes críticas': 'critical areas',
    'no Itaú Unibanco, o maior banco privado do país: antifraude, pagamentos, dados ao Banco Central e limite da conta': 'at Itaú Unibanco, Brazil’s largest private bank: antifraud, payments, Central Bank reporting and account limits',
    'empresas de peso': 'major companies',
    'Itaú Unibanco via TCS, Dia a Dia Benefícios (Startup criada pelo Mercadinho do Zé) e a Cadastra, onde levo IA generativa para produção': 'Itaú Unibanco via TCS, Dia a Dia Benefícios (a startup created by Mercadinho do Zé) and Cadastra, where I take generative AI to production',
    'Itaú Unibanco via TCS, uma plataforma de seguro de vida e a Cadastra, onde levo IA generativa para produção': 'Itaú Unibanco via TCS, a life insurance platform and Cadastra, where I take generative AI to production',
    'tipos de nota fiscal': 'types of tax invoice',
    'NF-e, NFC-e e NFS-e emitidas direto na SEFAZ pelo OrdenaHub, ERP que criei sozinho': 'NF-e, NFC-e and NFS-e issued straight to SEFAZ by OrdenaHub, the ERP I built on my own',
    // Carreira
    'Cada etapa somou uma camada: infraestrutura, sistemas bancários de missão crítica, eventos e pagamentos, e agora agentes inteligentes.': 'Each step added a layer: infrastructure, mission-critical banking systems, events and payments, and now intelligent agents.',
    'Profissional completo': 'The full professional', 'IA, agentes e produtos': 'AI, agents and products',
    'Fluxos e pagamentos': 'Flows and payments', 'eventos e integrações': 'events and integrations',
    'Engenharia ganha base': 'Engineering takes root', 'sistemas bancários críticos': 'critical banking systems',
    'Antes do código': 'Before code', 'suporte e infraestrutura': 'support and infrastructure',
    'role para voltar no tempo': 'scroll to travel back in time',
    'out 2025 → hoje': 'Oct 2025 → today', '1 ano': '1 year', 'Desenvolvedor Full Stack Pleno': 'Mid-level Full Stack Developer',
    'Desenvolvo a': 'I build', ', a plataforma de IA generativa da empresa, no time que constrói as integrações e os agentes. Sou responsável pela arquitetura e implementação de': ', the company’s generative AI platform, in the team that builds its integrations and agents. I’m responsible for the architecture and implementation of',
    'servidores MCP': 'MCP servers', 'que conectam modelos generativos a dados corporativos em tempo real, além de soluções de': 'that connect generative models to corporate data in real time, as well as',
    ', APIs REST e autenticação para aplicações de alta demanda. Também atuei no sistema de reservas de escritórios.': ' solutions, REST APIs and authentication for high-demand applications. I also worked on the office booking system.',
    'Agentes que consultam dados de marketing e devolvem entregáveis prontos: dashboards, apresentações, documentos e planilhas.': 'Agents that query marketing data and return ready deliverables: dashboards, presentations, documents and spreadsheets.',
    'Integrações tipadas e validadas com plataformas de mídia, analytics, CRM e produtividade.': 'Typed, validated integrations with media, analytics, CRM and productivity platforms.',
    'Autenticação com JWT, OAuth2 e Google, com permissões respeitadas por usuário.': 'Authentication with JWT, OAuth2 and Google, with per-user permissions.',
    'jul 2024 → out 2025': 'Jul 2024 → Oct 2025', '1 ano e 4 meses': '1 year and 4 months', 'Desenvolvedor Backend Pleno': 'Mid-level Backend Developer',
    'Desenvolvimento da': 'Building the', 'plataforma de seguro de vida': 'life insurance platform',
    'da empresa: integrações com APIs de parceiros, plataformas de pagamento e gestão de apólices. Projetei os fluxos assíncronos com filas de mensageria e gatilhos de eventos de negócio que garantem': 'of the company: integrations with partner APIs, payment platforms and policy management. I designed the asynchronous flows with message queues and business event triggers that ensure',
    'confiabilidade e rastreabilidade': 'reliability and traceability', 'em operações financeiras críticas.': 'in critical financial operations.',
    'Arquitetura orientada a eventos com AWS Lambda, SQS e EventBridge, desacoplando serviços.': 'Event-driven architecture with AWS Lambda, SQS and EventBridge, decoupling services.',
    'Webhooks de parceiros e meios de pagamento tratados de forma segura e auditável.': 'Partner and payment provider webhooks handled securely and auditably.',
    'dez 2020 → jul 2024': 'Dec 2020 → Jul 2024', '3 anos e 8 meses': '3 years and 8 months', 'alocado no Itaú Unibanco': 'assigned to Itaú Unibanco',
    'De trainee a pleno, atuando em microsserviços de missão crítica do maior banco privado do país.': 'From trainee to mid-level, working on mission-critical microservices at Brazil’s largest private bank.',
    'Pleno': 'Mid-level', 'abr → jul 2024': 'Apr → Jul 2024', 'Limite da Conta.': 'Account Limits.',
    'Sustentação de microsserviços, automação de fluxos e gatilhos com AWS Lambda em Python e infraestrutura na AWS com Terraform.': 'Microservice maintenance, flow and trigger automation with AWS Lambda in Python, and AWS infrastructure with Terraform.',
    'Júnior': 'Junior', 'dez 2021 → jun 2024': 'Dec 2021 → Jun 2024', 'Antifraude, Pagamentos e Dados BACEN.': 'Antifraud, Payments and Central Bank (BACEN) data.',
    'Desenvolvimento e sustentação de microsserviços críticos, modernização de sistemas legados e robustez dos fluxos de dados regulatórios e financeiros.': 'Building and maintaining critical microservices, modernizing legacy systems and hardening regulatory and financial data flows.',
    'Trainee': 'Trainee', 'dez 2020 → nov 2021': 'Dec 2020 → Nov 2021', 'Formação em engenharia de software corporativa em Londrina, PR.': 'Corporate software engineering training in Londrina, Brazil.',
    'Java 8/11, Spring Boot, JPA, Hibernate, Python, Kafka, SQS, PostgreSQL, MongoDB, DynamoDB, EC2, Terraform, Docker, GitHub Actions, Arquitetura hexagonal, Grafana, Splunk, CloudWatch': 'Java 8/11, Spring Boot, JPA, Hibernate, Python, Kafka, SQS, PostgreSQL, MongoDB, DynamoDB, EC2, Terraform, Docker, GitHub Actions, Hexagonal architecture, Grafana, Splunk, CloudWatch',
    'a base': 'the foundation', 'Suporte e infraestrutura de TI': 'IT support and infrastructure',
    'Especialista em suporte de TI na Escolpi Informática (2019 a 2020), suporte técnico na Prefeitura Municipal de Ourinhos (2018 a 2019) e na TecBit (2015). Anos resolvendo problemas reais de usuários, redes e máquinas antes de escrever o primeiro microsserviço: é daí que vem o meu cuidado com a operação e com quem usa o sistema.': 'IT support specialist at Escolpi Informática (2019 to 2020), technical support at Ourinhos City Hall (2018 to 2019) and at TecBit (2015). Years solving real problems for users, networks and machines before writing my first microservice: that is where my care for operations and for the people who use the system comes from.',
    'Formação': 'Education', 'Ensino superior em Engenharia de Software, 2016 a 2019': 'Bachelor’s degree in Software Engineering, 2016 to 2019',
    'Certificações': 'Certifications', 'Spring Framework 5 e Spring Boot 2': 'Spring Framework 5 and Spring Boot 2', 'Angular 10 com Spring Boot 2': 'Angular 10 with Spring Boot 2',
    // IA
    'Inteligência artificial': 'Artificial intelligence',
    'é a plataforma de IA generativa da': 'is the generative AI platform of',
    '. Ela reúne, numa única interface de conversa, agentes inteligentes que consultam dados de marketing, analisam campanhas e produzem entregáveis prontos: dashboards, apresentações, documentos e planilhas.': '. In a single chat interface, it brings together intelligent agents that query marketing data, analyze campaigns and produce ready deliverables: dashboards, presentations, documents and spreadsheets.',
    'Meu papel': 'My role', 'Desenvolvedor no time que constrói as integrações e os agentes da plataforma, incluindo os servidores MCP que dão aos modelos acesso controlado a dados corporativos.': 'Developer in the team that builds the platform’s integrations and agents, including the MCP servers that give models controlled access to corporate data.',
    'Arquitetura': 'Architecture', 'Um orquestrador entende o pedido, divide o trabalho entre agentes especialistas (mídia, dados, dashboards, apresentações, redação, briefing) e junta tudo numa resposta só.': 'An orchestrator understands the request, splits the work among specialist agents (media, data, dashboards, presentations, copywriting, briefing) and combines everything into one answer.',
    'Impacto': 'Impact', 'Da pergunta ao entregável em minutos. Menos tempo coletando e formatando dados, mais tempo analisando e decidindo.': 'From question to deliverable in minutes. Less time collecting and formatting data, more time analyzing and deciding.',
    'orquestração · demonstração': 'orchestration · demo', 'Rodar de novo': 'Run again', 'Nível de confiança no agente': 'Trust level in the agent',
    'Transparente': 'Transparent', 'Seletivo': 'Selective', 'Autônomo': 'Autonomous',
    'Mostra cada passo, o raciocínio e pede aprovação antes de qualquer ação com efeito real.': 'Shows every step and its reasoning, and asks for approval before any action with real effect.',
    'Mostra o raciocínio só onde há incerteza ou ação irreversível. O resto acontece em silêncio.': 'Shows its reasoning only where there is uncertainty or an irreversible action. The rest happens quietly.',
    'Age sozinho e entrega o resultado, com desfazer a um clique. Essa confiança foi conquistada nos níveis anteriores.': 'Acts on its own and delivers the result, with one-click undo. That trust was earned in the previous levels.',
    'você': 'you', 'Monte o relatório semanal das campanhas de mídia e envie para o cliente.': 'Build the weekly media campaign report and send it to the client.',
    'Orquestrador entende o pedido': 'Orchestrator understands the request', 'Três tarefas: coletar os dados de mídia, montar o dashboard e enviar ao cliente.': 'Three tasks: collect media data, build the dashboard and send it to the client.',
    'Agente de mídia': 'Media agent', 'Investimento, cliques e conversões de 4 plataformas na última semana.': 'Spend, clicks and conversions from 4 platforms over the last week.',
    'Agente de dados': 'Data agent', 'Uma campanha está sem conversões rastreadas. Marquei para revisão.': 'One campaign has no tracked conversions. I flagged it for review.',
    'Agente de dashboards': 'Dashboard agent', 'Dashboard interativo no padrão visual da marca, publicado no espaço do cliente.': 'Interactive dashboard in the brand’s visual style, published in the client’s workspace.',
    'Enviar ao cliente': 'Send to client', 'Envio externo: sai da empresa e não dá para desfazer depois.': 'External send: it leaves the company and cannot be undone afterwards.',
    'Aprovar': 'Approve', 'Revisar': 'Review', 'Prévia aberta para revisão antes de seguir.': 'Preview opened for review before continuing.',
    'Pronto: dashboard publicado e relatório enviado ao cliente.': 'Done: dashboard published and report sent to the client.', 'Desfazer': 'Undo',
    'Envio cancelado a tempo. Nas próximas 5 vezes vou pedir sua aprovação antes de enviar para fora.': 'Send cancelled in time. For the next 5 times I’ll ask for your approval before sending anything out.',
    'Confiar mais →': 'Trust more →',
    'Ilustração conceitual de padrões de UX para agentes. Não é uma tela da AstraOS.': 'Conceptual illustration of UX patterns for agents. Not an AstraOS screen.',
    'Orquestração multiagente': 'Multi-agent orchestration', 'Um agente principal delega para subagentes especialistas, com delegação em cadeia e retomada de sessão.': 'A main agent delegates to specialist subagents, with chained delegation and session resumption.',
    'Uso de ferramentas': 'Tool use', 'Os agentes chamam APIs reais de dezenas de plataformas, com respostas tipadas e validadas.': 'Agents call real APIs from dozens of platforms, with typed and validated responses.',
    'Roteamento de modelos': 'Model routing', 'Cada etapa vai para o modelo mais adequado, equilibrando qualidade, velocidade e custo, com cache de contexto.': 'Each step goes to the most suitable model, balancing quality, speed and cost, with context caching.',
    'Skills sob demanda': 'On-demand skills', 'Conhecimento especializado é carregado só quando necessário, sem inflar cada conversa.': 'Specialized knowledge is loaded only when needed, without bloating every conversation.',
    'Segurança e governança': 'Security and governance', 'Acesso por grupos com bloqueio por padrão, nenhum segredo no código e permissões respeitadas por usuário.': 'Group-based access, blocked by default, no secrets in code and per-user permissions.',
    'Geração de artefatos': 'Artifact generation', 'HTML interativo, PPTX editável, documentos e planilhas criados e editados programaticamente.': 'Interactive HTML, editable PPTX, documents and spreadsheets created and edited programmatically.',
    'Engenharia por especificação': 'Spec-driven engineering', 'Spec, design e tarefas antes do código, decisões registradas e testes automatizados.': 'Spec, design and tasks before code, recorded decisions and automated tests.',
    'AstraOS é um produto e uma marca da Cadastra. Aqui descrevo capacidades da plataforma e o meu papel no time.': 'AstraOS is a Cadastra product and brand. Here I describe the platform’s capabilities and my role in the team.',
    // Projetos
    'Projetos próprios': 'My own projects',
    'Sistemas que eu concebi, desenhei e desenvolvi sozinho, cada um resolvendo a operação de um setor diferente. Uma amostra do que fazem, sem abrir o código. Repare que a página muda de cor com cada projeto.': 'Systems I conceived, designed and built on my own, each one running the operations of a different industry. A glimpse of what they do, without opening the code. Notice how the page changes color with each project.',
    'ERP SaaS multiempresa com emissão fiscal': 'Multi-company SaaS ERP with tax invoicing', 'Gestão veterinária e carteira digital do pet': 'Veterinary management and digital pet card', 'Plataforma gamer com dados da GamersClub': 'Gaming platform powered by GamersClub data',
    'SaaS multiempresa': 'Multi-company SaaS', 'ERP': 'ERP', 'Emissão fiscal': 'Tax invoicing', 'Cobrança recorrente': 'Recurring billing',
    'Saúde animal': 'Animal health', 'Clínicas e hospitais': 'Clinics and hospitals', 'Portal do tutor': 'Owner portal', 'Plataforma gamer': 'Gaming platform', 'Estatísticas': 'Statistics', 'Economia de jogo': 'Game economy',
    'ERP & SaaS em nuvem que se adapta ao ramo de cada empresa.': 'Cloud ERP & SaaS that adapts to each company’s industry.',
    'ERP em nuvem que se adapta ao ramo de cada empresa.': 'Cloud ERP that adapts to each company’s industry.',
    'Nasceu para assistências técnicas controlarem ordens de serviço e virou uma plataforma de gestão completa: orçamentos, vendas, compras, estoque, financeiro e emissão de notas fiscais no mesmo lugar. Todas as empresas entram pelo mesmo endereço e o login leva cada uma para o seu ambiente, com a própria marca, e enxerga só os módulos do seu ramo.': 'It started as a way for repair shops to track work orders and grew into a complete management platform: quotes, sales, purchasing, inventory, finance and tax invoicing in one place. Every company signs in at the same address and the login takes each one to its own workspace, with its own brand, and sees only the modules for its industry.',
    'Ciclo comercial completo.': 'Complete sales cycle.', 'Orçamento aprovado vira venda, venda confirmada gera contas a receber e o faturamento emite a nota.': 'An approved quote becomes a sale, a confirmed sale creates receivables and billing issues the invoice.',
    'Fiscal integrado.': 'Built-in tax invoicing.', 'NF-e, NFC-e com contingência e NFS-e, com prévia da DANFE antes de emitir.': 'NF-e, NFC-e with offline fallback and NFS-e, with an invoice preview before issuing.',
    'Financeiro de verdade.': 'Real finance.', 'Contas a pagar e a receber com baixas parciais, conciliação de extrato bancário, DRE, fluxo de caixa e inadimplência.': 'Payables and receivables with partial payments, bank statement reconciliation, income statement, cash flow and overdue tracking.',
    'Pronto para vender como SaaS.': 'Ready to sell as SaaS.', 'Planos, assinatura recorrente, nota da mensalidade emitida automaticamente e bloqueio por atraso.': 'Plans, recurring subscriptions, automatic invoices for each monthly fee and a lock for late payment.',
    'Ordens de serviço.': 'Work orders.', 'Pré-OS aprovada pelo cliente, lojas, técnicos e um link seguro para o técnico preencher em campo.': 'Pre-orders approved by the customer, stores, technicians and a secure link for technicians to fill in on site.',
    'Monolito modular multi-tenant.': 'Modular multi-tenant monolith.', 'Isolamento por empresa resolvido no middleware e aplicado automaticamente a todos os models; módulos ligados por feature flag e protegidos na rota.': 'Per-company isolation handled in middleware and applied automatically to every model; modules enabled by feature flags and protected at the route.',
    'Consistência transacional.': 'Transactional consistency.', 'Venda, itens e financeiro na mesma transação, lock de linha para saldo de estoque e de conta, numeração sequencial por empresa.': 'Sale, items and finance in the same transaction, row locks for stock and account balances, sequential numbering per company.',
    'Snapshots fiscais.': 'Tax snapshots.', 'Venda e nota guardam os dados do momento da emissão e nunca dependem do cadastro vivo.': 'Sales and invoices keep the data from the moment they were issued and never depend on live records.',
    'Emissão assíncrona e idempotente.': 'Asynchronous, idempotent issuing.', 'Worker fiscal dedicado, webhooks duráveis e trilha de eventos por documento.': 'Dedicated tax worker, durable webhooks and an event trail per document.',
    'Nada se apaga.': 'Nothing gets deleted.', 'Documentos com vínculo são cancelados com estorno, preservando a auditoria.': 'Linked documents are cancelled with a reversal, preserving the audit trail.',
    'isolamento por empresa · só os módulos do ramo': 'isolation per company · only the modules for its industry', 'Simular o ramo da empresa': 'Simulate the company’s industry',
    'Ordens de serviço': 'Work orders', 'Orçamentos': 'Quotes', 'Vendas': 'Sales', 'Compras': 'Purchasing', 'Estoque': 'Inventory', 'Financeiro': 'Finance', 'Notas fiscais': 'Tax invoices', 'Lojas e técnicos': 'Stores and technicians', 'Relatórios': 'Reports',
    'Pré-OS': 'Pre-order', 'Aprovação do cliente': 'Customer approval', 'Execução': 'In progress', 'Concluída': 'Completed', 'Recebido': 'Received',
    'Oficina Lima, troca de tela': 'Lima Repairs, screen replacement', 'em execução': 'in progress', 'Cell Center, reparo de placa': 'Cell Center, board repair', 'aguardando cliente': 'waiting for customer', 'João Prado, bateria': 'João Prado, battery', 'concluída': 'completed',
    'OS abertas': 'open orders', 'aguardando aprovação': 'awaiting approval', 'concluídas no mês': 'completed this month', 'clique num subdomínio · dados ilustrativos': 'click a subdomain · sample data',
    'Orçamento técnico': 'Technical quote', 'Eixo em aço 1045, 40 un.': '1045 steel shaft, 40 pcs', 'Flange em inox, 12 un.': 'Stainless flange, 12 pcs', 'Tornearia Paes': 'Paes Machining',
    '+ qualquer ramo: os módulos são ligados por empresa': '+ any industry: modules are switched on per company', 'dados isolados por empresa': 'data isolated per company', 'NF-e com contingência': 'NF-e with fallback mode', 'auditoria por documento': 'audit trail per document', 'clique num ramo · dados ilustrativos': 'click an industry · sample data', 'na fila': 'queued', 'Assistência técnica': 'Repair shop', 'Usinagem': 'Machining', 'Comércio': 'Retail', 'Distribuidora': 'Distributor', 'Oficina mecânica': 'Auto repair', 'Prestação de serviços': 'Services', 'pré-OS aberta': 'pre-order open', 'pré-OS criada no balcão': 'pre-order created at the counter', 'link de aprovação enviado ao cliente': 'approval link sent to the customer', 'técnico iniciou o reparo': 'technician started the repair', 'OS concluída, cliente avisado': 'order completed, customer notified', 'recebido': 'received', 'pagamento baixado no caixa': 'payment recorded in the till', 'Ana Souza, conector de carga': 'Ana Souza, charging port', 'orçamento': 'quote', 'aprovado': 'approved', 'orçamento técnico com desenho anexo': 'technical quote with drawing attached', 'Aprovação': 'Approval', 'cliente aprovou o orçamento': 'customer approved the quote', 'Venda': 'Sale', 'venda gerada': 'sale created', 'venda gerada a partir do orçamento': 'sale created from the quote', 'Contas a receber': 'Receivables', 'a receber': 'receivable', '3 parcelas lançadas no financeiro': '3 instalments posted to finance', 'NF-e autorizada': 'NF-e authorized', 'NF-e autorizada pela SEFAZ': 'NF-e authorized by SEFAZ', 'Bucha em bronze, 80 un.': 'Bronze bushing, 80 pcs', 'orçamentos abertos': 'open quotes', 'pedidos no mês': 'orders this month', 'notas no mês': 'invoices this month', 'venda aberta': 'sale open', 'itens lançados no PDV': 'items added at the POS', 'estoque baixado': 'stock written off', 'saldo de estoque atualizado': 'stock balance updated', 'Recebimento': 'Payment', 'pago no PIX': 'paid via PIX', 'PIX confirmado': 'PIX confirmed', 'conciliado': 'reconciled', 'lançado no fluxo de caixa': 'posted to cash flow', 'NFC-e emitida': 'NFC-e issued', 'NFC-e autorizada pela SEFAZ': 'NFC-e authorized by SEFAZ', 'Consumidor final, 1 item': 'Walk-in customer, 1 item', 'itens em estoque': 'items in stock', 'estoque crítico': 'low stock', 'Pedido': 'Order', 'pedido recebido': 'order received', 'pedido do representante recebido': 'sales rep order received', 'Separação': 'Picking', 'em separação': 'picking', 'itens reservados no estoque': 'items reserved in stock', 'Faturamento': 'Billing', 'faturado': 'billed', 'venda faturada em 30/60 dias': 'sale billed at 30/60 days', 'NF-e': 'NF-e', 'NF-e autorizada, DANFE gerada': 'NF-e authorized, DANFE generated', 'Entrega': 'Delivery', 'entregue': 'delivered', 'pedido marcado como entregue': 'order marked as delivered', 'Rede Super Ideal, 42 caixas': 'Super Ideal chain, 42 boxes', 'Empório Central, 16 caixas': 'Empório Central, 16 boxes', 'Atacado Norte, 120 caixas': 'Atacado Norte, 120 boxes', 'pedidos hoje': 'orders today', 'faturado no mês': 'billed this month', 'Check-in': 'Check-in', 'veículo recebido': 'vehicle received', 'checklist de entrada do veículo': 'vehicle intake checklist', 'Orçamento': 'Quote', 'orçamento de peças e mão de obra': 'parts and labor quote', 'Serviço': 'Service', 'em serviço': 'in service', 'peças baixadas do estoque': 'parts taken from stock', 'veículo entregue ao cliente': 'vehicle returned to the customer', 'NFS-e': 'NFS-e', 'NFS-e emitida': 'NFS-e issued', 'NFS-e da mão de obra emitida': 'labor NFS-e issued', 'Gol 2018, revisão 60 mil': 'Gol 2018, 60k service', 'Hilux 2021, freios': 'Hilux 2021, brakes', 'Onix 2020, embreagem': 'Onix 2020, clutch', 'carros no pátio': 'cars in the shop', 'aguardando peça': 'waiting for parts', 'entregues no mês': 'delivered this month', 'Proposta': 'Proposal', 'proposta enviada': 'proposal sent', 'proposta enviada ao cliente': 'proposal sent to the customer', 'aprovada': 'approved', 'proposta aprovada': 'proposal approved', 'em andamento': 'in progress', 'serviço em andamento': 'service in progress', 'conta a receber gerada': 'receivable created', 'NFS-e emitida na prefeitura': 'NFS-e issued with the city', 'Clínica Vida, manutenção mensal': 'Vida Clinic, monthly maintenance', 'Escritório Nunes, consultoria': 'Nunes Office, consulting', 'Condomínio Aurora, limpeza': 'Aurora Condo, cleaning', 'contratos ativos': 'active contracts', 'propostas abertas': 'open proposals',
    'empresa': 'company',
    'Acessar o OrdenaHub': 'Visit OrdenaHub', 'Acessar o Mix Awards': 'Visit Mix Awards', 'midia.campanhas': 'media.campaigns', 'analytics.cruzar': 'analytics.crossref', 'artefato.dashboard': 'artifact.dashboard', 'email.enviar': 'email.send',
    'Cell Fix': 'Cell Fix', 'Tornearia Paes': 'Paes Machining', 'Mercado Bom Preço': 'Bom Preço Market', 'Distribuidora Alfa': 'Alfa Distribution', 'Auto Center Lima': 'Lima Auto Center', 'Nunes Serviços': 'Nunes Services',
    'Sites para clientes': 'Client websites', 'Projetos sob encomenda: entendo o negócio, escrevo junto o conteúdo e entrego o site no ar, rápido, fácil de achar no Google e pronto para gerar contato.': 'Commissioned projects: I learn the business, write the content together with the client and deliver the site live, fast, easy to find on Google and ready to bring in leads.', 'Abrir o site da C De Souza': 'Open the C De Souza website', 'Página inicial do site da C De Souza Usinagem': 'Home page of the C De Souza Machining website', 'Usinagem · Campinas-SP': 'Machining · Campinas, Brazil', 'Site institucional de uma usinagem com mais de 40 anos de estrada: serviços, parque de máquinas, história da empresa e pedido de orçamento com envio de desenho ou foto da peça.': 'Company website for a machine shop with over 40 years in business: services, machinery, company history and quote requests with a drawing or photo of the part.', 'Pedido de orçamento': 'Quote requests', 'WhatsApp direto': 'Direct WhatsApp', 'Vídeos do YouTube automáticos': 'Auto-updating YouTube videos', 'SEO local': 'Local SEO', 'Ver site no ar': 'Visit live site', 'Seu negócio pode ser o próximo.': 'Your business could be next.', 'Site institucional, sistema sob medida ou integração. Vamos conversar.': 'Company website, custom system or integration. Let’s talk.', 'clientes': 'clients',
    'Em construção': 'Under construction', 'Vitrine de produtos da loja virtual de moda': 'Product showcase of the fashion online store', 'E-commerce de moda': 'Fashion e-commerce', 'Loja virtual de moda feminina': 'Women’s fashion online store', 'Loja completa para uma marca de roupas: vitrine de mais desejados, busca, cadastro de clientes, carrinho e preços com desconto no Pix e parcelamento sem juros.': 'A complete store for a clothing brand: best-sellers showcase, search, customer accounts, cart, Pix discounts and interest-free installments.', 'Catálogo e busca': 'Catalog and search', 'Carrinho': 'Cart', 'Pix e parcelamento': 'Pix and installments', 'Login de clientes': 'Customer login', 'Lançamento em breve': 'Launching soon',
    'Venda no balcão': 'Counter sale', 'Baixa no estoque': 'Stock write-off', 'Consumidor final, 3 itens': 'Walk-in customer, 3 items', 'Mercado Bom Preço, 18 itens': 'Bom Preço Market, 18 items', 'Fornecedor Alfa, reposição': 'Alfa Supplier, restock', 'vendas hoje': 'sales today',
    'Gestão veterinária completa, com a carteira digital do pet na mão do tutor.': 'Complete veterinary management, with the digital pet card in the owner’s hands.',
    'Organiza a rotina da clínica do atendimento à alta: agenda, prontuário, internação, prescrições, receituário, hotel, orçamentos e cobranças. Do outro lado, o tutor acompanha o próprio animal pelo portal, com vacinas, boletins e orientações sempre atualizados.': 'It organizes the clinic’s routine from check-in to discharge: scheduling, medical records, hospitalization, prescriptions, pet hotel, quotes and billing. On the other side, owners follow their own animal through the portal, with vaccines, updates and instructions always current.',
    'Plantão por turno.': 'Shift handover.', 'Quem assume vê o que aconteceu, o que falta e qual medicação vence agora, com histórico de cada alteração.': 'Whoever takes over sees what happened, what is pending and which medication is due now, with a history of every change.',
    'Internação.': 'Hospitalization.', 'Sinais vitais, prescrições e registro de cada dose aplicada.': 'Vital signs, prescriptions and a record of every dose given.',
    'Prontuário clínico.': 'Medical records.', 'Anamnese, exame físico, exames, documentos e receituário em PDF.': 'History, physical exam, tests, documents and prescriptions as PDF.',
    'Carteira digital do pet.': 'Digital pet card.', 'Vacinas, próximas doses e boletins no portal do tutor.': 'Vaccines, upcoming doses and updates in the owner portal.',
    'Boletim humanizado.': 'Friendly updates.', 'Atualização do paciente enviada ao tutor pelo WhatsApp.': 'Patient updates sent to the owner via WhatsApp.',
    'Gestão da clínica.': 'Clinic management.', 'Agenda, hotel, orçamentos, cobranças e assinatura mensal por clínica.': 'Scheduling, pet hotel, quotes, billing and a monthly subscription per clinic.',
    'Rastreabilidade clínica.': 'Clinical traceability.', 'Cada edição do plantão gera um snapshot no histórico: quem mudou, o quê e quando.': 'Every shift edit creates a snapshot in the history: who changed what, and when.',
    'Formulários tipados de ponta a ponta.': 'End-to-end typed forms.', 'React Hook Form com Zod no front e validação no back.': 'React Hook Form with Zod on the front end and validation on the back end.',
    'Estado bem separado.': 'Cleanly separated state.', 'TanStack Query para dados do servidor, Zustand para estado de tela.': 'TanStack Query for server data, Zustand for UI state.',
    'Perfis e acesso.': 'Roles and access.', 'Admin, veterinário e técnico, mais um superadmin que gerencia as assinaturas das clínicas; portal do tutor com acesso próprio.': 'Admin, vet and technician, plus a superadmin who manages clinic subscriptions; owner portal with its own login.',
    'Documentos gerados no cliente.': 'Documents generated in the browser.', 'Receituário e documentos clínicos exportados em PDF.': 'Prescriptions and clinical documents exported as PDF.',
    'plantão · noite': 'shift · night', 'ao vivo': 'live', 'Soro · Mel': 'IV fluids · Mel', 'Curativo · Fred': 'Dressing · Fred', 'próxima dose em': 'next dose in',
    'Golden Retriever, 4 anos': 'Golden Retriever, 4 years old', 'Vacinas': 'Vaccines', 'Boletins': 'Updates', 'Consultas': 'Visits',
    'Aplicada em 12/03/2026': 'Given on 03/12/2026', 'Antirrábica': 'Rabies', 'Giárdia': 'Giardia', 'Próxima dose em 18/11/2026': 'Next dose on 11/18/2026', 'Gripe canina': 'Canine flu', 'Próxima dose em 02/01/2027': 'Next dose on 01/02/2027',
    'Hoje, 07h40': 'Today, 7:40 am', 'O Thor passou bem a noite, comeu sozinho e os sinais vitais estão estáveis. A previsão de alta é amanhã à tarde.': 'Thor had a good night, ate on his own and his vital signs are stable. Discharge is expected tomorrow afternoon.',
    'Ontem, 19h10': 'Yesterday, 7:10 pm', 'Cirurgia concluída sem intercorrências. Ele segue em observação.': 'Surgery completed without complications. He remains under observation.',
    'Cirurgia': 'Surgery', 'Out 2026, Dra. Paula': 'Oct 2026, Dr. Paula', 'Retorno com exames': 'Follow-up with tests', 'Out 2026': 'Oct 2026', 'Check-up anual': 'Annual check-up', 'Set 2026': 'Sep 2026',
    'dados ilustrativos': 'sample data', 'Carteira digital do pet, ilustração': 'Digital pet card, illustration', 'Carteira do pet': 'Pet card',
    'Partidas da GamersClub transformadas em estatística, economia e coleção.': 'GamersClub matches turned into stats, economy and collection.',
    'Os dados de cada partida jogada na GamersClub são importados para o sistema, que calcula as estatísticas de cada jogador, gera gráficos e ranking e converte desempenho em Gold, a moeda da plataforma. Com o Gold, os jogadores compram cápsulas na loja, abrem figurinhas com raridades e disputam quem completa o álbum da temporada.': 'Data from every match played on GamersClub is imported into the system, which calculates each player’s stats, builds charts and rankings and turns performance into Gold, the platform’s currency. With Gold, players buy capsules in the shop, open stickers with rarities and compete to complete the season album.',
    'Importação de partidas.': 'Match import.', 'Estatísticas por jogador: kills, ADR, KAST, K/D, first kills, multi kills e flash assists.': 'Per-player stats: kills, ADR, KAST, K/D, first kills, multi kills and flash assists.',
    'Gráficos e ranking.': 'Charts and rankings.', 'Dashboards de desempenho, ranking geral e de duplas, e confrontos diretos entre jogadores.': 'Performance dashboards, overall and duo rankings, and head-to-head matchups.',
    'Economia própria.': 'Its own economy.', 'Gold por desempenho, loja de cápsulas e abertura de figurinhas com raridade e probabilidade.': 'Gold for performance, a capsule shop and sticker opening with rarity and odds.',
    'Coleção e progressão.': 'Collection and progression.', 'Álbum de figurinhas e de assinaturas, níveis, missões com reroll, molduras e títulos.': 'Sticker and signature albums, levels, missions with reroll, frames and titles.',
    'Comunidade.': 'Community.', 'Sorteio de times equilibrado, apostas com odds, Copa do Mundo e a cerimônia Mix Awards no fim de cada temporada.': 'Balanced team draws, bets with odds, a World Cup and the Mix Awards ceremony at the end of each season.',
    'Pipeline de importação.': 'Import pipeline.', 'O JSON da partida é normalizado, cada jogador recebe suas métricas e o vencedor é calculado pelo placar.': 'The match JSON is normalized, each player gets their metrics and the winner is calculated from the score.',
    'Ranking consistente.': 'Consistent rankings.', 'Excluir uma partida recalcula pontos, vitórias e bônus de todos os envolvidos.': 'Deleting a match recalculates points, wins and bonuses for everyone involved.',
    'Sorteio ponderado.': 'Weighted draws.', 'Raridades e probabilidades num único ponto de configuração, fácil de balancear.': 'Rarities and odds in a single configuration point, easy to balance.',
    'Sistemas isolados.': 'Isolated systems.', 'Níveis, missões e premiação da temporada como módulos próprios no back-end.': 'Levels, missions and season awards as separate back-end modules.',
    'Interface com movimento.': 'Interface in motion.', 'Abertura de cápsulas com roleta, efeito holográfico e "revelar tudo", em Framer Motion.': 'Capsule opening with a roulette, holographic effect and “reveal all”, in Framer Motion.',
    'partida importada · GamersClub': 'imported match · GamersClub', 'Jogador': 'Player', 'contém 1 figurinha': 'contains 1 sticker', 'Lendária': 'Legendary',
    'Pacote de figurinhas': 'Sticker pack', 'Abrir pacote': 'Open pack', 'Abrir outro pacote': 'Open another pack', 'Abrir pacote de figurinhas': 'Open sticker pack',
    'normal 70 · épica 20 · lendária 7 · mítica 2,5 · GOD 0,5': 'normal 70 · epic 20 · legendary 7 · mythic 2.5 · GOD 0.5', 'Mítica': 'Mythic', 'clique no pacote para abrir': 'click the pack to open it',
    'Comum': 'Common', 'Rara': 'Rare', 'Épica': 'Epic',
    'Escolpi · Prefeitura de Ourinhos · TecBit': 'Escolpi · Ourinhos City Hall · TecBit', 'e-mail': 'email', 'Cloud e DevOps': 'Cloud and DevOps',
    // Conhecimentos (inventário)
    'inventário · escolha uma fase': 'inventory · pick a stage', 'Mostrar o que usei em cada experiência': 'Show what I used in each role', 'Tudo': 'All',
    '2015 → hoje': '2015 → today', '2025 → hoje': '2025 → today', 'Produtos próprios': 'My own products',
    'Passe o mouse ou toque num item para ver onde e quando eu usei.': 'Hover or tap an item to see where and when I used it.',
    'itens ·': 'items ·', 'categorias': 'categories', 'Raridade': 'Rarity',
    'comum · 1 fase': 'common · 1 stage', 'incomum · 2': 'uncommon · 2', 'rara · 3': 'rare · 3', 'lendária · 4': 'legendary · 4',
    'fase equipada': 'stage equipped', 'itens usados no dia a dia.': 'items used day to day.',
    'Linguagens': 'Languages', 'Mensageria e eventos': 'Messaging and events', 'Dados': 'Data', 'Arquitetura e qualidade': 'Architecture and quality', 'Domínios de negócio': 'Business domains',
    'JPA e Hibernate': 'JPA and Hibernate', 'Express e Fastify': 'Express and Fastify', 'Lucid e Prisma': 'Lucid and Prisma', 'Filas e workers': 'Queues and workers',
    'AWS EC2, RDS e S3': 'AWS EC2, RDS and S3', 'Nginx e PM2': 'Nginx and PM2', 'Microsserviços': 'Microservices', 'Arquitetura hexagonal': 'Hexagonal architecture',
    'Orientação a eventos': 'Event-driven design', 'Testes unitários e de integração': 'Unit and integration tests', 'Grafana, Splunk e CloudWatch': 'Grafana, Splunk and CloudWatch',
    'Agentes e orquestração': 'Agents and orchestration', 'Antifraude': 'Antifraud', 'Pagamentos': 'Payments', 'Dados regulatórios BACEN': 'BACEN regulatory data',
    'Seguros e apólices': 'Insurance and policies', 'Emissão fiscal SEFAZ': 'SEFAZ tax invoicing', 'Marketing e mídia': 'Marketing and media',
    'comum': 'common', 'incomum': 'uncommon', 'rara': 'rare', 'lendária': 'legendary',
    // Contato e rodapé
    'Estou aberto a posições de engenharia de software, especialmente em times que constroem produtos com IA, e a projetos sob medida.': 'I’m open to software engineering roles, especially in teams building AI products, and to custom projects.',
    'copiar': 'copy', 'abrir ↗': 'open ↗', 'currículo': 'résumé', 'PDF, 4 páginas': 'PDF, 4 pages', 'baixar ↓': 'download ↓', 'E-mail copiado': 'Email copied',
    'O que este site lembra de você': 'What this site remembers about you', 'Nada ainda.': 'Nothing yet.', 'Esquecer minha visita': 'Forget my visit',
    'Memória apagada. Para este site, você é uma visita nova.': 'Memory cleared. To this site, you are a new visitor.', 'Memória apagada': 'Memory cleared',
    'Feito à mão por Rafael Carvalho · 2026 · a memória fica só no seu navegador, nada é enviado.': 'Handmade by Rafael Carvalho · 2026 · memory stays in your browser only, nothing is sent.',
    // Assistente
    'Pergunte ao portfólio': 'Ask the portfolio', 'respostas escritas pelo Rafael · cada uma mostra a fonte': 'answers written by Rafael · each one shows its source',
    'Enviar': 'Send', 'Fechar': 'Close', 'Sua pergunta': 'Your question', 'Ex.: onde você já trabalhou?': 'E.g.: where have you worked?',
    'Essa eu ainda não sei responder por aqui. Tente uma das sugestões abaixo ou fale direto comigo pelo e-mail na seção de contato.': 'I can’t answer that one here yet. Try one of the suggestions below or reach me directly by email in the contact section.',
    // Capítulos e fontes
    'início': 'home', 'carreira': 'career', 'em números': 'in numbers', 'projetos': 'projects', 'conhecimentos': 'skills', 'contato': 'contact', 'rodapé': 'footer',
  }

  // Títulos animados: frase inteira, para não traduzir palavra por palavra.
  const TITLES = {
    'Uma trajetória que se soma.': 'A career that <em>adds up</em>.',
    'Do suporte técnico à IA generativa.': 'From IT support to <em>generative AI</em>.',
    'IA generativa em produção.': 'Generative AI in <em>production</em>.',
    'Três produtos. Do banco de dados ao pixel.': 'Three products.<br />From database <em>to pixel</em>.',
    'Além dos produtos, sites para negócios reais.': 'Beyond the products, <em>websites</em> for real businesses.', 'Do banco à interface, e o modelo no meio.': 'From the <em>database</em> to the interface, with the model in between.',
    'Vamos construir algo juntos?': 'Shall we build something <em>together</em>?',
  }

  // Respostas do assistente, por id (o texto em português vem do portfolio-kb.js).
  const KB = {
    resumo: ['30-second summary', 'I’m Rafael, a full stack software engineer from Ourinhos, Brazil. I’ve been building software since 2020: almost four years on Itaú Unibanco microservices through TCS (antifraud, payments, Central Bank data and account limits), then an event-driven life insurance platform on AWS and, since October 2025, generative AI at Cadastra, where I build agents and integrations for AstraOS. I also created three complete products: OrdenaHub, Vetnix and Mix Awards. The full résumé PDF is in the contact section.'],
    diferencial: ['What sets you apart?', 'I bring together three things that rarely go hand in hand: years on systems where failure is expensive, like Itaú’s, generative AI in production at Cadastra, and products I took on my own from database to screen. And I came from IT support, so I think about operations and the people using the system from day one.'],
    local: ['Where do you live?', 'I live in Ourinhos, in the countryside of São Paulo, Brazil. To talk about the work arrangement, whether remote, hybrid or on-site, the best way is email or LinkedIn in the contact section.'],
    carreira: ['Where have you worked?', 'Cadastra (since Oct 2025), as a mid-level Full Stack Developer on the AstraOS AI platform. Mercadinho do Zé (Jul 2024 to Oct 2025), as a mid-level Backend Developer on the life insurance platform. Tata Consultancy Services (Dec 2020 to Jul 2024), assigned to Itaú Unibanco, from trainee to mid-level. Before that, five years in IT support and infrastructure. Graduated from FATEC Ourinhos.'],
    cadastra: ['What do you do at Cadastra?', 'Since October 2025 I’ve been a mid-level Full Stack Developer at Cadastra. I work on AstraOS, the company’s generative AI platform, in the team that builds its integrations and agents: MCP servers that connect models to corporate data, RAG solutions, REST APIs and authentication. I also worked on the office booking system. Day to day I use Node.js, TypeScript, Python, React, Svelte, Vue.js, PostgreSQL, Redis, AWS and GCP.'],
    mercadinho: ['What did you do at Mercadinho do Zé?', 'From July 2024 to October 2025 I was a mid-level Backend Developer on the company’s life insurance platform. I handled integrations with partner APIs, payment platforms and policy management, and the asynchronous flows with queues and events on AWS, so financial operations were reliable and traceable. Stack: Node.js, TypeScript, AdonisJS, PostgreSQL, DynamoDB, Lambda, SQS, EventBridge and Jenkins.'],
    tcs: ['How was your time at TCS?', 'Three years and eight months, from December 2020 to July 2024, assigned to Itaú Unibanco. I joined as a trainee, with corporate software engineering training in Londrina. As a junior, I worked on Antifraud, Payments and Central Bank data. As mid-level, on Account Limits, with AWS automations and Terraform infrastructure. That’s where I learned to build mission-critical systems.'],
    fin: ['Experience with financial systems?', 'Yes, it’s the foundation of my career. At Itaú Unibanco I worked on Antifraud, Payments, Central Bank data and Account Limits, with Java/Spring microservices, Kafka, SQS and hexagonal architecture, monitored with Grafana, Splunk and CloudWatch. Then, on a life insurance platform, I designed asynchronous flows with Lambda, SQS and EventBridge to make financial operations reliable and traceable.'],
    suporte: ['How did you get started in tech?', 'I started in 2015 in technical support at TecBit. Then I worked at Ourinhos City Hall (2018 to 2019) and was an IT support specialist at Escolpi Informática (2019 to 2020). Years of solving real problems for users, networks and machines before my first microservice, and that’s where my care for operations and for the people using the system comes from.'],
    tempo: ['How much experience do you have?', 'I’ve been developing professionally since December 2020, almost six years, from trainee to mid-level at Itaú through TCS and working at mid-level ever since. I’ve worked in tech since 2015, when I started in technical support.'],
    formacao: ['What is your education?', 'I have a degree in Software Engineering from FATEC Ourinhos (2016 to 2019). I hold the AWS Certified Cloud Practitioner certification (2022) and courses in Spring Framework 5 and Spring Boot 2, Hexagonal Architecture (Ports and Adapters) and Angular 10 with Spring Boot 2.'],
    ia: ['What is your experience with AI?', 'At Cadastra I build AstraOS, the company’s generative AI platform. I’m responsible for the architecture and implementation of MCP servers that connect generative models to corporate data in real time, plus RAG solutions, platform integrations and authentication. I work with multi-agent orchestration, tool calling, on-demand skills and artifact generation such as dashboards, presentations and spreadsheets.'],
    astra: ['What is AstraOS?', 'AstraOS is Cadastra’s generative AI platform, a product and brand of the company. In a chat interface, it brings together agents that query marketing data, analyze campaigns and produce ready deliverables. An orchestrator splits each request among specialist agents. I work as a developer in the team that builds the integrations and agents.'],
    java: ['Do you work with Java?', 'Yes. It was my foundation for almost four years at Itaú Unibanco: Java 8 and 11, Spring Boot, JPA and Hibernate, Kafka and SQS in microservices with hexagonal architecture, Terraform and GitHub Actions. Today I work more with Node.js, TypeScript and Python, but I move comfortably between both worlds.'],
    stack: ['What technologies do you use?', 'On the back end, Node.js with TypeScript (AdonisJS, Express and Fastify), Java with Spring Boot and Python. On the front end, React, Svelte and Vue.js with Tailwind. Data in PostgreSQL, DynamoDB, MongoDB and Redis. Messaging with Kafka, SQS and EventBridge, cloud on AWS and GCP. The skills section shows where I used each one.'],
    'formacao-aws': ['Do you have an AWS certification?', 'I hold the AWS Certified Cloud Practitioner, from 2022. In practice, I’ve used AWS since Itaú, with Lambda, SQS, EC2, S3, CloudWatch and Terraform, and kept using it on the insurance platform and at Cadastra.'],
    nuvem: ['Do you have cloud experience?', 'Yes. At Itaú I used Lambda, SQS, EC2, S3 and CloudWatch, with Terraform infrastructure and GitHub Actions pipelines. On the insurance platform, Lambda, SQS, EventBridge, RDS, DynamoDB and S3. At Cadastra I work with AWS and GCP. My products run on a server that I maintain myself.'],
    arquitetura: ['What architecture do you use?', 'I choose based on what the problem needs. At Itaú, microservices with hexagonal architecture and messaging with Kafka and SQS. On the insurance platform, event-driven architecture on AWS. In my products, multi-company SaaS with each customer isolated. In all of them, the focus is reliability, traceability and code someone else can maintain.'],
    seguranca: ['How do you handle security?', 'Authentication with JWT, OAuth2 and Google, per-user permissions and access blocked by default. No secrets live in the code. In my products, each company only sees its own data, and important documents are never deleted, only cancelled, to keep the history.'],
    solo: ['Did you build the systems alone?', 'Yes. I conceived, designed and built all three products myself, from the database to the interface, alongside my job. At companies I work in teams, and I enjoy both formats.'],
    'tempo-sistemas': ['How long did it take to build the systems?', 'Mix Awards came first: from September 2025 to July 2026, with 82 commits. Vetnix ran from June to September 2026. OrdenaHub started in July 2026, already has more than 137 commits and keeps evolving. All of them were built alongside my job.'],
    codigo: ['Can I see the code?', 'The products’ code is private, since they are commercial systems. The project sections have demos with sample data showing how each one works. My GitHub is raelcarvalho, and if you’d like to see a system running, reach me by email or LinkedIn and I’ll set up a demo.'],
    produtos: ['What systems have you built?', 'Three complete products. OrdenaHub is a cloud ERP for small and medium businesses. Vetnix is a management system for veterinary clinics and hospitals, with a portal for pet owners. Mix Awards is a platform for a community of GamersClub players. Each one runs the operations of a different industry.'],
    'oh-fiscal': ['Does OrdenaHub issue tax invoices?', 'It does. OrdenaHub issues NF-e, NFC-e and NFS-e straight from the system, with an invoice preview before issuing and a fallback plan when the tax authority (SEFAZ) is down. The invoice for each subscriber’s monthly fee is also issued automatically.'],
    'oh-quem': ['Who is OrdenaHub for?', 'For small and medium businesses that need to organize their operations. It was born for repair shops to manage work orders and now also serves machining workshops and retail. Each company uses the system under its own brand and only sees the modules that make sense for its industry.'],
    oh: ['What is OrdenaHub?', 'It’s a cloud, multi-company ERP that I created. Each customer company runs on its own address and only sees the modules for its industry: work orders, quotes, sales, purchasing, inventory, finance with bank reconciliation and income statements, and tax invoicing. It’s sold as a monthly subscription.'],
    'vet-tutor': ['How do owners follow their pet in Vetnix?', 'Through the owner portal, with the digital pet card: vaccines, upcoming doses, visits and updates always current. When the animal is hospitalized, the owner receives a plain-language update via WhatsApp, without technical jargon.'],
    vet: ['What is Vetnix?', 'It’s a management system for veterinary clinics and hospitals: scheduling, medical records, hospitalization, prescriptions as PDF, pet hotel, quotes and billing. The on-duty team sees what happened and what’s left to do on each shift. On the other side, owners follow their own animal through the portal.'],
    mix: ['How does Mix Awards work?', 'It’s a platform for a community of GamersClub players. Matches become stats, charts and rankings, and good performance earns collectible rewards throughout the season, which ends with the Mix Awards ceremony. You can open a sticker pack in its section.'],
    medida: ['Do you build custom software?', 'I do. I start by understanding the operation: who does what, where work gets stuck and what currently lives in spreadsheets or WhatsApp. Then I deliver in parts that already work, from database to screen, with the system live and documented. That’s how OrdenaHub and Vetnix were born.'],
    disp: ['Are you available?', 'I’m open to software engineering roles, especially in teams building AI products, and to custom projects. The fastest way is email at rafael.carvalho.xd1@gmail.com or LinkedIn. The résumé PDF is in the contact section.'],
    site: ['How does this site work?', 'It was built from scratch with HTML, CSS and JavaScript. It remembers, only in your browser, the reading mode you chose, the sections you saw, where you stopped and what you asked here. Nothing is sent, and the “Forget my visit” button in the footer erases everything.'],
    ajuda: ['What can I ask?', 'You can ask about my career (Cadastra, Mercadinho do Zé, TCS at Itaú and how I started in IT support), education and certifications, technologies, AI, cloud and architecture, about OrdenaHub, Vetnix and Mix Awards, how long each one took, and about availability and contact.'],
  }

  // Frases com partes variáveis.
  const lens = (name) => LENS[name] || name
  const tr = (x) => translate(x) ?? x
  const PATTERNS = [
    [/bem-vindo de volta · visita nº (\d+)/, (m, n) => `welcome back · visit #${n}`],
    [/Anotado: modo (\S+)\. Na próxima visita a página já abre assim\./, (m, l) => `Noted: ${lens(l)} mode. Next time the page opens this way.`],
    [/Modo (\S+)\. A apresentação e os projetos mudaram junto\./, (m, l) => `${lens(l)} mode. The intro and the projects changed with it.`],
    [/Bem-vindo de volta, visita nº (\d+)\./, (m, n) => `Welcome back, visit #${n}.`],
    [/Mantive o modo (\S+)\./, (m, l) => `I kept ${lens(l)} mode.`],
    [/Visita nº (\d+), desde ([\d/]+)\./, (m, n, d) => `Visit #${n}, since ${d}.`],
    [/Modo de leitura: ([^.]+)\./, (m, l) => `Reading mode: ${l === 'ainda não escolhido' ? 'not chosen yet' : lens(l)}.`],
    [/Seções vistas: (\d+) de (\d+)(?: \(([^)]*)\))?\./, (m, a, b, list) => `Sections seen: ${a} of ${b}${list ? ` (${list.replace(/…$/, '').split(', ').map((x) => tr(x)).join(', ')}${list.endsWith('…') ? '…' : ''})` : ''}.`],
    [/Perguntas feitas: (\d+)\./, (m, n) => `Questions asked: ${n}.`],
    [/Cápsulas abertas: (\d+)\./, (m, n) => `Packs opened: ${n}.`],
    [/Oi de novo\. Da última vez você perguntou "(.+)"\. Quer continuar de onde parou\?/, (m, q) => `Hi again. Last time you asked "${tr(q)}". Want to pick up where you left off?`],
    [/Oi! Pergunte sobre a carreira, os projetos ou a disponibilidade do Rafael\. As sugestões mudam conforme o modo de leitura: agora estou no modo (\S+)\./, (m, l) => `Hi! Ask about Rafael’s career, projects or availability. Suggestions change with the reading mode: I’m in ${lens(l)} mode now.`],
    [/confiança (alta|média|baixa) · fonte/, (m, c) => `confidence ${{ alta: 'high', 'média': 'medium', baixa: 'low' }[c]} · source`],
    [/Concluído em 5 passos, (\d) aprovaç(?:ões|ão)\./, (m, n) => `Done in 5 steps, ${n} approval${n === '1' ? '' : 's'}.`],
    [/Você tirou: (\S+) \(([\d,]+)% de chance\) · melhor até agora: (\S+)/, (m, a, p, b) => `You got: ${tr(a)} (${p.replace(',', '.')}% chance) · best so far: ${tr(b)}`],
    [/^de (\d{4}) a (\d{4})(:?)$/, (m, a, b, c) => `${a} to ${b}${c}`],
    [/^de (\d{4}) até hoje(:?)$/, (m, a, c) => `${a} to today${c}`],
    [/^(comum|incomum|rara|lendária) · (.+)$/, (m, r, g) => `${tr(r)} · ${tr(g)}`],
  ]

  // Monta o dicionário completo com as respostas do assistente.
  const FULL = new Map(Object.entries(DICT).map(([k, v]) => [clean(k), v]))
  const kb = win && win.PortfolioKB
  if (kb) kb.KB.forEach((entry) => { const en = KB[entry.id]; if (en) { FULL.set(clean(entry.q), en[0]); FULL.set(clean(entry.a), en[1]) } })
  const REVERSE = new Map([...FULL].map(([k, v]) => [clean(v), k]))

  function translate(text) {
    const key = clean(text)
    if (!key) return null
    if (FULL.has(key)) return FULL.get(key)
    let out = key, hit = false
    for (const [re, fn] of PATTERNS) {
      if (re.test(out)) { out = out.replace(re, fn); hit = true }
    }
    return hit ? out : null
  }

  let lang = 'pt'
  const t = (text) => (lang === 'en' ? translate(text) ?? text : text)

  if (!win || typeof document === 'undefined') return { DICT, TITLES, KB, translate, t, get lang() { return lang } }

  // --- Aplicação na página -------------------------------------------------------
  const originals = new WeakMap() // nó de texto → texto em português
  const attrOriginals = new WeakMap() // elemento → { atributo: texto }
  const ATTRS = ['aria-label', 'placeholder', 'title', 'alt']
  const SKIP = 'script,style,svg,[data-i18n-skip]'
  let busy = false

  function textNode(node) {
    const parent = node.parentElement
    if (!parent || parent.closest(SKIP)) return
    if (lang === 'en') {
      const value = node.nodeValue
      const en = translate(value)
      if (en == null) return
      if (!originals.has(node)) originals.set(node, value)
      const lead = value.match(/^\s*/)[0], tail = value.match(/\s*$/)[0]
      const next = lead + en + tail
      if (node.nodeValue !== next) node.nodeValue = next
    } else if (originals.has(node)) {
      node.nodeValue = originals.get(node)
      originals.delete(node)
    }
  }

  function element(el) {
    if (el.closest && el.closest(SKIP)) return
    const saved = attrOriginals.get(el) || {}
    ATTRS.forEach((name) => {
      if (!el.hasAttribute(name)) return
      if (lang === 'en') {
        const en = translate(el.getAttribute(name))
        if (en == null) return
        if (!(name in saved)) saved[name] = el.getAttribute(name)
        el.setAttribute(name, en)
      } else if (name in saved) {
        el.setAttribute(name, saved[name]); delete saved[name]
      }
    })
    attrOriginals.set(el, saved)
  }

  function walk(root) {
    if (root.nodeType === 3) return textNode(root)
    if (root.nodeType !== 1) return
    element(root)
    root.querySelectorAll('*').forEach(element)
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    let n
    while ((n = walker.nextNode())) textNode(n)
  }

  // Títulos com animação palavra por palavra (.split): troca a frase inteira e
  // remonta as palavras com a mesma marcação que o app.js usa.
  const titles = new Map()
  function wrapWords(html) {
    const box = document.createElement('div')
    box.innerHTML = html
    let i = 0
    const out = []
    const wrap = (inner) => `<span class="w"><span style="--i:${i++}">${inner}</span></span>`
    box.childNodes.forEach((n) => {
      if (n.nodeType === 3) n.textContent.split(/(\s+)/).forEach((part) => { if (part) out.push(/^\s+$/.test(part) ? ' ' : wrap(part)) })
      else if (n.nodeName === 'BR') out.push('<br />')
      else out.push(wrap(n.outerHTML))
    })
    return out.join('')
  }
  function captureTitles() {
    document.querySelectorAll('.split').forEach((el) => {
      if (titles.has(el)) return
      const en = TITLES[clean(el.innerHTML.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ''))]
      if (en) titles.set(el, { pt: el.innerHTML, en, split: false })
    })
  }
  function applyTitles(initial) {
    titles.forEach((entry, el) => {
      const isSplit = !!el.querySelector('.w')
      if (lang === 'en') el.innerHTML = isSplit && !initial ? wrapWords(entry.en) : entry.en
      else el.innerHTML = isSplit && !initial ? wrapWords(entry.pt) : entry.pt
      el.setAttribute('data-i18n-skip', '')
    })
  }

  function apply(initial) {
    busy = true
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR'
    applyTitles(initial)
    walk(document.body)
    const title = { pt: 'Rafael Carvalho — Engenheiro de software', en: 'Rafael Carvalho — Software engineer' }
    document.title = title[lang]
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      if (!desc.dataset.pt) desc.dataset.pt = desc.content
      desc.content = lang === 'en' ? 'Rafael Carvalho, full stack software engineer. 5+ years in financial systems (Itaú Unibanco via TCS), insurance and generative AI at Cadastra. Creator of OrdenaHub, Vetnix and Mix Awards.' : desc.dataset.pt
    }
    document.querySelectorAll('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)))
    const sw = document.querySelector('[data-lang-switch]')
    if (sw) sw.dataset.active = lang
    busy = false
    listeners.forEach((fn) => fn(lang))
  }

  const observer = new MutationObserver((records) => {
    if (busy || lang !== 'en') return
    busy = true
    records.forEach((r) => {
      if (r.type === 'characterData') textNode(r.target)
      else if (r.type === 'attributes') element(r.target)
      else r.addedNodes.forEach(walk)
    })
    busy = false
  })

  const listeners = []
  const reduced = win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)').matches

  function set(next, { animate = true } = {}) {
    if (next !== 'en' && next !== 'pt') return
    if (next === lang) return
    try { localStorage.setItem('rc-lang', next) } catch { /* sem storage */ }
    const swap = () => { lang = next; apply(false) }
    if (!animate || reduced) return swap()
    const html = document.documentElement
    const sw = document.querySelector('[data-lang-switch]')
    if (sw) {
      const r = sw.getBoundingClientRect()
      html.style.setProperty('--lx', `${Math.round(r.left + r.width / 2)}px`)
      html.style.setProperty('--ly', `${Math.round(r.top + r.height / 2)}px`)
      sw.dataset.active = next // o marcador desliza já no clique
    }
    html.classList.remove('is-lang-glow')
    void html.offsetWidth
    html.classList.add('is-translating', 'is-lang-glow')
    clearTimeout(set.timer)
    set.timer = setTimeout(() => {
      swap()
      requestAnimationFrame(() => requestAnimationFrame(() => html.classList.remove('is-translating')))
      setTimeout(() => html.classList.remove('is-lang-glow'), 700)
    }, 380)
  }

  function initial() {
    const param = new URLSearchParams(location.search).get('lang')
    if (param === 'en' || param === 'pt') return param
    try { const saved = localStorage.getItem('rc-lang'); if (saved) return saved } catch { /* sem storage */ }
    const langs = navigator.languages || [navigator.language || 'pt']
    return langs.some((l) => /^pt/i.test(l)) ? 'pt' : (/^en/i.test(langs[0] || '') ? 'en' : 'pt')
  }

  captureTitles()
  lang = initial()
  if (lang === 'en') apply(true)
  observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS })
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lang]')
    if (b) set(b.dataset.lang)
  })
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)))
    const sw = document.querySelector('[data-lang-switch]')
    if (sw) sw.dataset.active = lang
  })

  return { DICT, TITLES, KB, translate, t, set, get lang() { return lang }, onChange: (fn) => listeners.push(fn), reverse: (s) => REVERSE.get(clean(s)) }
})
