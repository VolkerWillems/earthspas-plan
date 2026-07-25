export type ChoiceOption = {
  id: string;
  groupId: string;
  name: string;
  monthly: number;
  description: string;
  recommended?: boolean;
  caution?: boolean;
  logoSlug?: string;
  icon: string;
};

export type ChoiceGroup = {
  id: string;
  title: string;
  description: string;
  options: ChoiceOption[];
};

export type FeatureItem = {
  id: string;
  name: string;
  description: string;
  hoursLow: number;
  hoursHigh: number;
  marketLow: number;
  marketHigh: number;
  impact: "Verkoop" | "Marketing" | "Support" | "Data";
  icon: string;
};

export type ChecklistItem = {
  id: string;
  group: "Eigenaarschap" | "Techniek" | "Marketing" | "Afronding";
  title: string;
  description: string;
  owner: string;
  priority: "Nu" | "Daarna" | "Voor livegang";
  choiceGroupId?: string;
};

export const pricingReview = {
  reviewedAt: "25 juli 2026",
  note: "Alle noodzakelijke platformen worden onder een eigen Earth Spas-account of organisatie geplaatst. Waar een Earth Spas-account al bestaat, worden een eigen betaalmethode, factuurgegevens en minimaal twee beheerders toegevoegd. Persoonlijke accounts van Volker zijn geen blijvende optie.",
};

export const choiceGroups: ChoiceGroup[] = [
  {
    id: "payment",
    title: "Betaalmethode",
    description: "Eén eigen betaalroute voor alle software, advertenties en AI-kosten van Earth Spas.",
    options: [
      { id: "prepaid-card", groupId: "payment", name: "Prepaid creditcard voor Earth Spas", monthly: 0, description: "Aanbevolen betaalroute met vooraf bepaald saldo. Earth Spas kiest en regelt zelf de aanbieder; de kaart wordt daarna aan alle benodigde accounts gekoppeld.", recommended: true, icon: "wallet" },
    ],
  },
  {
    id: "workspace",
    title: "E-mail en bestanden",
    description: "Een eigen Microsoft 365-tenant voor Earth Spas. De huidige mailboxen moeten volledig uit de tenant van Volker worden gemigreerd.",
    options: [
      { id: "m365", groupId: "workspace", name: "Microsoft 365 Business · eigen Earth Spas-tenant", monthly: 14, description: "Zakelijke mail, agenda, SharePoint en gedeelde bestanden onder volledig Earth Spas-eigendom. Wachtwoorden blijven in Microsoft Edge; een losse wachtwoordmanager is niet nodig.", recommended: true, logoSlug: "microsoft", icon: "envelope" },
    ],
  },
  {
    id: "source",
    title: "Broncode en repositories",
    description: "Alle website-, agent- en softwarecode komt in een eigen Earth Spas GitHub-organisatie met minimaal twee owners.",
    options: [
      { id: "github-team", groupId: "source", name: "GitHub Team · Earth Spas-organisatie", monthly: 4, description: "Repositories, toegangsbeheer, herstel en facturering onder Earth Spas. Bestaande repositories worden vanuit persoonlijke accounts overgezet.", recommended: true, logoSlug: "github", icon: "code" },
    ],
  },
  {
    id: "dns",
    title: "DNS en beveiliging",
    description: "Domeinen, DNS, SSL, CDN en redirects worden beheerd vanuit een eigen Earth Spas Cloudflare-account.",
    options: [
      { id: "cloudflare", groupId: "dns", name: "Cloudflare Free · Earth Spas-account", monthly: 0, description: "Eigen account met minimaal twee beheerders. Bestaande zones en records worden gecontroleerd en naar Earth Spas-eigendom overgezet.", recommended: true, logoSlug: "cloudflare", icon: "cloud" },
    ],
  },
  {
    id: "server",
    title: "Eigen server",
    description: "De productieomgeving draait op een eigen Earth Spas Hetzner-account met eigen billing.",
    options: [
      { id: "hetzner-production", groupId: "server", name: "Hetzner productieserver + back-ups · Earth Spas-account", monthly: 103, description: "Productieserver, back-ups, monitoring en benodigde capaciteit onder Earth Spas-eigendom en betaald met de eigen betaalmethode.", recommended: true, logoSlug: "hetzner", icon: "server" },
    ],
  },
  {
    id: "cms",
    title: "Contentbeheer",
    description: "Directus wordt als centrale Earth Spas-gegevensbron op de eigen server ingericht.",
    options: [
      { id: "directus", groupId: "cms", name: "Directus self-hosted · Earth Spas", monthly: 0, description: "Modellen, teksten, media, SEO en vertalingen centraal onder Earth Spas-beheer, inclusief back-up en herstelprocedure.", recommended: true, logoSlug: "directus", icon: "database" },
    ],
  },
  {
    id: "automation",
    title: "Automatisering",
    description: "Workflows voor leads, content, meldingen, service en agents draaien onder Earth Spas-beheer.",
    options: [
      { id: "n8n", groupId: "automation", name: "n8n self-hosted · Earth Spas", monthly: 0, description: "Eigen automatiseringsomgeving op de Earth Spas-server, met eigen credentials, back-ups en beheerders.", recommended: true, logoSlug: "n8n", icon: "flow" },
    ],
  },
  {
    id: "secrets",
    title: "API-sleutels en secrets",
    description: "Tokens, API-sleutels en productieconfiguratie worden uit persoonlijke accounts gehaald en overdraagbaar beheerd.",
    options: [
      { id: "doppler", groupId: "secrets", name: "Doppler Developer · Earth Spas-account", monthly: 0, description: "Centrale secrets, rollen en deployments onder Earth Spas-eigendom, met minimaal twee beheerders en gedocumenteerd herstel.", recommended: true, logoSlug: "doppler", icon: "key" },
    ],
  },
  {
    id: "database",
    title: "Database en storage",
    description: "Productiedata, bestanden en authenticatie komen onder een eigen Earth Spas Supabase-organisatie.",
    options: [
      { id: "supabase-pro", groupId: "database", name: "Supabase Pro · Earth Spas-organisatie", monthly: 25, description: "Beheerde database, storage, authenticatie, back-ups en spend controls met eigen billing en minimaal twee beheerders.", recommended: true, logoSlug: "supabase", icon: "database" },
    ],
  },
  {
    id: "frontend",
    title: "Websitefrontend",
    description: "De websites en deployments komen onder een eigen Earth Spas Vercel-team.",
    options: [
      { id: "vercel-pro", groupId: "frontend", name: "Vercel Pro · Earth Spas-team", monthly: 20, description: "Productiedeployments, previews, logs, domeinen en spend controls onder Earth Spas-eigendom en eigen billing.", recommended: true, logoSlug: "vercel", icon: "globe" },
    ],
  },
  {
    id: "transactional-email",
    title: "Formulier- en systeemmail",
    description: "Contactformulieren, afspraken, service en automatische notificaties worden vanuit een eigen Earth Spas Resend-account verzonden.",
    options: [
      { id: "resend-pro", groupId: "transactional-email", name: "Resend Pro · Earth Spas-account", monthly: 20, description: "Geverifieerde Earth Spas-domeinen, verzendlogs en eigen billing. Een persoonlijke of bestaande mailbox is geen productieroute.", recommended: true, logoSlug: "resend", icon: "envelope" },
    ],
  },
  {
    id: "ai-workspace",
    title: "ChatGPT-werkruimte",
    description: "Optionele Earth Spas-werkruimte voor research, content, analyse en ontwikkeling. Gebruik via persoonlijke accounts is geen structurele bedrijfsoplossing.",
    options: [
      { id: "no-chatgpt", groupId: "ai-workspace", name: "Voorlopig niet activeren", monthly: 0, description: "Geen Earth Spas-abonnement totdat gebruik en budget zijn goedgekeurd. Persoonlijke accounts worden niet als bedrijfsvoorziening opgenomen.", recommended: true, icon: "pause" },
      { id: "chatgpt-plus", groupId: "ai-workspace", name: "ChatGPT Plus · Earth Spas-account", monthly: 20, description: "Individueel Earth Spas-abonnement voor licht tot regelmatig gebruik.", logoSlug: "openai", icon: "robot" },
      { id: "chatgpt-pro5", groupId: "ai-workspace", name: "ChatGPT Pro · Earth Spas-account", monthly: 200, description: "Voor structureel en zeer intensief individueel gebruik binnen analyse, content en development.", logoSlug: "openai", icon: "rocket" },
      { id: "chatgpt-pro20", groupId: "ai-workspace", name: "ChatGPT Business · 2 seats jaarlijks", monthly: 40, description: "Beheerde Earth Spas-teamworkspace voor minimaal twee gebruikers met jaarlijkse facturering.", logoSlug: "openai", icon: "briefcase" },
      { id: "chatgpt-business", groupId: "ai-workspace", name: "ChatGPT Business · 2 seats maandelijks", monthly: 50, description: "Beheerde Earth Spas-teamworkspace voor minimaal twee gebruikers met maandelijkse facturering.", logoSlug: "openai", icon: "briefcase" },
    ],
  },
  {
    id: "design",
    title: "Design en prototypes",
    description: "Optioneel Earth Spas-account voor ontwerpen, prototypes en feedback.",
    options: [
      { id: "figma-free", groupId: "design", name: "Figma Free · Earth Spas-account", monthly: 0, description: "Eigen Earth Spas-werkruimte voor de bestaande ontwerpen en overdracht.", recommended: true, logoSlug: "figma", icon: "layout" },
      { id: "figma-pro", groupId: "design", name: "Figma Professional · Earth Spas-account", monthly: 14, description: "Volwaardige projectstructuur, prototypes en developer handoff wanneer samenwerking opschaalt.", logoSlug: "figma", icon: "layout" },
      { id: "no-design-tool", groupId: "design", name: "Niet activeren", monthly: 0, description: "Geen aparte designtool onder Earth Spas totdat deze aantoonbaar nodig is.", icon: "layout" },
    ],
  },
  {
    id: "social-content",
    title: "Social en dagelijkse content",
    description: "Optioneel Earth Spas-account voor templates, posts, presentaties en korte video.",
    options: [
      { id: "canva-free", groupId: "social-content", name: "Canva Free · Earth Spas-account", monthly: 0, description: "Eigen Earth Spas-account voor bestaande en nieuwe merkassets.", recommended: true, logoSlug: "canva", icon: "image" },
      { id: "canva-pro", groupId: "social-content", name: "Canva Pro · Earth Spas-account", monthly: 11, description: "Voor structurele contentproductie, merktemplates en premium exports.", logoSlug: "canva", icon: "image" },
      { id: "no-content-tool", groupId: "social-content", name: "Niet activeren", monthly: 0, description: "Geen aparte contenttool totdat structurele productie is goedgekeurd.", icon: "image" },
    ],
  },
  {
    id: "coding-ai",
    title: "AI voor development",
    description: "Optioneel Earth Spas-abonnement voor codingagents, premium modellen en code review.",
    options: [
      { id: "no-coding-ai", groupId: "coding-ai", name: "Voorlopig niet activeren", monthly: 0, description: "Geen vast Earth Spas-abonnement totdat actieve ontwikkelmaanden en budget zijn goedgekeurd.", recommended: true, icon: "code" },
      { id: "copilot-pro", groupId: "coding-ai", name: "GitHub Copilot Pro · Earth Spas", monthly: 10, description: "Basisabonnement voor dagelijkse code-aanvulling en chat.", logoSlug: "githubcopilot", icon: "code" },
      { id: "copilot-proplus", groupId: "coding-ai", name: "GitHub Copilot Pro+ · Earth Spas", monthly: 39, description: "Meer inbegrepen AI-credits en toegang tot zwaardere modellen voor intensieve bouwmaanden.", logoSlug: "githubcopilot", icon: "magic" },
      { id: "copilot-max", groupId: "coding-ai", name: "GitHub Copilot Max · Earth Spas", monthly: 100, description: "Voor structureel hoog agentgebruik met een grotere inbegrepen AI-creditpot.", logoSlug: "githubcopilot", icon: "rocket" },
    ],
  },
  {
    id: "stock",
    title: "Stock en commerciële assets",
    description: "Optioneel Earth Spas-account voor gelicentieerde beelden, video, muziek en templates.",
    options: [
      { id: "free-assets", groupId: "stock", name: "Alleen eigen en gratis assets", monthly: 0, description: "Geen betaald account totdat concrete productie aanvullende assets nodig maakt.", recommended: true, icon: "image" },
      { id: "envato", groupId: "stock", name: "Envato Core · Earth Spas-account", monthly: 14, description: "Brede commerciële bibliotheek voor structurele contentproductie.", logoSlug: "envato", icon: "sparkle" },
    ],
  },
  {
    id: "voice",
    title: "AI-voice",
    description: "Optioneel Earth Spas-account voor meertalige voice-overs en gesproken toepassingen.",
    options: [
      { id: "no-voice", groupId: "voice", name: "Voorlopig niet activeren", monthly: 0, description: "Geen vast abonnement totdat voiceproductie concreet is goedgekeurd.", recommended: true, icon: "headphones" },
      { id: "elevenlabs", groupId: "voice", name: "ElevenLabs Starter · Earth Spas-account", monthly: 5, description: "Meertalige voice-overs en eerste gesproken toepassingen onder eigen billing.", logoSlug: "elevenlabs", icon: "headphones" },
    ],
  },
  {
    id: "video-ai",
    title: "AI-video",
    description: "Optioneel Earth Spas-account voor video-effecten en campagnevarianten.",
    options: [
      { id: "video-credits-only", groupId: "video-ai", name: "Alleen activeren bij productie", monthly: 0, description: "Earth Spas-account en eigen betaalmethode alleen inzetten in maanden waarin video wordt geproduceerd.", recommended: true, icon: "video" },
      { id: "runway", groupId: "video-ai", name: "Runway Pro · Earth Spas-account", monthly: 25, description: "Vaste credits en productietools voor regelmatige videocontent.", logoSlug: "runway", icon: "video" },
    ],
  },
];

export const features: FeatureItem[] = [
  { id: "crm", name: "CRM en commerciële pipeline", description: "Leads, bron, taal, modelinteresse, afspraken, offertes en omzet in één proces.", hoursLow: 120, hoursHigh: 220, marketLow: 12000, marketHigh: 25000, impact: "Verkoop", icon: "users" },
  { id: "booking", name: "Showroom booking en reminders", description: "Beschikbare tijden, bevestiging, route, reminders en opvolging.", hoursLow: 40, hoursHigh: 80, marketLow: 5000, marketHigh: 10000, impact: "Verkoop", icon: "calendar" },
  { id: "finder", name: "Spa Finder en productvergelijker", description: "Gestructureerd advies met maximaal drie passende modellen.", hoursLow: 60, hoursHigh: 120, marketLow: 8000, marketHigh: 15000, impact: "Verkoop", icon: "target" },
  { id: "advisor", name: "AI Spa Advisor", description: "Meertalige adviesagent op gevalideerde productdata, gekoppeld aan CRM.", hoursLow: 120, hoursHigh: 240, marketLow: 15000, marketHigh: 30000, impact: "Verkoop", icon: "robot" },
  { id: "recovery", name: "Lead recovery en automatische opvolging", description: "E-mail, WhatsApp, reminders en nurture op basis van gedrag en voorkeuren.", hoursLow: 70, hoursHigh: 140, marketLow: 8000, marketHigh: 16000, impact: "Marketing", icon: "flow" },
  { id: "marketing-agent", name: "Marketing- en contentagent", description: "SEO, social posts, advertentievarianten, contentplanning en analyses.", hoursLow: 140, hoursHigh: 280, marketLow: 15000, marketHigh: 35000, impact: "Marketing", icon: "magic" },
  { id: "capture", name: "Mobiele installatie-capture app", description: "Foto- en videochecklist, tagging, crops, cases en publicatieworkflows.", hoursLow: 180, hoursHigh: 360, marketLow: 20000, marketHigh: 45000, impact: "Marketing", icon: "image" },
  { id: "support", name: "Supportagent en kennisbank", description: "Onderhoud, handleidingen, foutmeldingen, tickets en menselijke escalatie.", hoursLow: 140, hoursHigh: 280, marketLow: 15000, marketHigh: 35000, impact: "Support", icon: "chat" },
  { id: "voice-agent", name: "Voice agent", description: "Gesproken advies via website of telefoon met samenvatting naar CRM.", hoursLow: 120, hoursHigh: 240, marketLow: 15000, marketHigh: 35000, impact: "Support", icon: "headphones" },
  { id: "analytics", name: "Attribution en managementdashboards", description: "Van campagne naar lead, afspraak, offerte, verkoop en omzet.", hoursLow: 90, hoursHigh: 200, marketLow: 10000, marketHigh: 25000, impact: "Data", icon: "chart" },
];

export const checklistItems: ChecklistItem[] = [
  { id: "billing-inventory", group: "Eigenaarschap", title: "Alle noodzakelijke Earth Spas-accounts vastleggen", description: "Per platform vastleggen of een Earth Spas-account al bestaat, moet worden aangemaakt of vanuit Volkers account moet worden overgedragen.", owner: "Samen", priority: "Nu" },
  { id: "billing-email", group: "Eigenaarschap", title: "Centrale Earth Spas billing- en herstelmail vastleggen", description: "Eén zakelijke mailbox gebruiken voor facturen, waarschuwingen, herstelcodes en belangrijke accountmeldingen.", owner: "Earth Spas", priority: "Nu" },
  { id: "payment-card", group: "Eigenaarschap", title: "Prepaid creditcard regelen en koppelen", description: "Earth Spas kiest zelf een prepaid creditcard, stelt het beschikbare saldo vast en koppelt deze aan alle noodzakelijke software-, advertentie- en hostingaccounts.", owner: "Jeroen / Wim", priority: "Nu", choiceGroupId: "payment" },
  { id: "spend-alerts", group: "Eigenaarschap", title: "Budgetlimieten en verbruikswaarschuwingen instellen", description: "Per advertentie-, AI-, hosting- en API-account harde limieten of waarschuwingen activeren en maandelijks controleren.", owner: "Jeroen / Wim", priority: "Nu" },
  { id: "admins", group: "Eigenaarschap", title: "Twee vaste Earth Spas-beheerders aanwijzen", description: "Primaire en tweede beheerder voor accounts, facturering, hersteltoegang en noodgevallen vastleggen.", owner: "Earth Spas", priority: "Nu" },
  { id: "workspace", group: "Eigenaarschap", title: "Eigen Microsoft 365-tenant inrichten en mail migreren", description: "Alle Earth Spas-mailboxen, domeinen, bestanden en agenda's volledig uit de tenant van Volker migreren naar de eigen Earth Spas-tenant.", owner: "Volker + Jeroen", priority: "Nu", choiceGroupId: "workspace" },
  { id: "source", group: "Eigenaarschap", title: "GitHub-organisatie onder Earth Spas-eigendom plaatsen", description: "Eigen Earth Spas-organisatie inrichten, minimaal twee owners toevoegen en alle relevante repositories vanuit persoonlijke accounts overzetten.", owner: "Volker", priority: "Nu", choiceGroupId: "source" },
  { id: "registrar", group: "Techniek", title: "Domeinregistratie en verlenging onder Earth Spas plaatsen", description: "Registrar-eigendom, contactgegevens, automatische verlenging, facturering en verhuiscodes voor alle Earth Spas-domeinen vastleggen.", owner: "Samen", priority: "Nu" },
  { id: "dns", group: "Techniek", title: "Cloudflare onder Earth Spas-eigendom plaatsen", description: "Eigen Earth Spas-account met twee beheerders gebruiken en alle DNS-zones, records en beveiligingsinstellingen controleren of overzetten.", owner: "Volker", priority: "Nu", choiceGroupId: "dns" },
  { id: "server", group: "Techniek", title: "Hetzner-account en productieserver onder Earth Spas plaatsen", description: "Eigen Earth Spas-account, eigen betaalmethode, beveiliging, monitoring en back-ups activeren. Een server op Volkers account is geen eindoplossing.", owner: "Volker + Jeroen", priority: "Nu", choiceGroupId: "server" },
  { id: "backup-restore", group: "Techniek", title: "Back-up- en hersteltest uitvoeren", description: "Database, media, configuratie en secrets daadwerkelijk terugzetten in een testomgeving en de hersteltijd documenteren.", owner: "Volker", priority: "Voor livegang" },
  { id: "cms", group: "Techniek", title: "Directus onder Earth Spas-beheer plaatsen", description: "Schema, content, assets, beheeraccounts en back-ups onder de eigen Earth Spas-server en toegangsstructuur brengen.", owner: "Volker", priority: "Daarna", choiceGroupId: "cms" },
  { id: "automation", group: "Techniek", title: "n8n onder Earth Spas-beheer plaatsen", description: "Workflows, credentials, meldingen en kritieke flows op de eigen Earth Spas-server inrichten en testen.", owner: "Volker", priority: "Daarna", choiceGroupId: "automation" },
  { id: "database", group: "Techniek", title: "Supabase-organisatie onder Earth Spas-eigendom plaatsen", description: "Eigen organisatie, twee beheerders, eigen billing, back-ups, rechten en spend caps instellen en productiegegevens overzetten.", owner: "Volker + Jeroen", priority: "Nu", choiceGroupId: "database" },
  { id: "frontend", group: "Techniek", title: "Vercel-team onder Earth Spas-eigendom plaatsen", description: "Eigen Earth Spas-team met twee beheerders, eigen billing, domeinen, environment variables, deployments en spend controls inrichten.", owner: "Volker + Jeroen", priority: "Nu", choiceGroupId: "frontend" },
  { id: "transactional-email", group: "Techniek", title: "Resend-account onder Earth Spas-eigendom plaatsen", description: "Eigen account en billing instellen, domeinen verifiëren en contact-, showroom- en serviceflows end-to-end testen.", owner: "Volker + Jeroen", priority: "Nu", choiceGroupId: "transactional-email" },
  { id: "secrets", group: "Techniek", title: "Secrets en API-sleutels naar Earth Spas overzetten", description: "Persoonlijke tokens vervangen, centrale Earth Spas-toegang instellen en productieconfiguratie documenteren.", owner: "Volker", priority: "Daarna", choiceGroupId: "secrets" },
  { id: "meta", group: "Marketing", title: "Meta Business volledig onder Earth Spas plaatsen", description: "Bestaande Earth Spas-assets controleren, eigen betaalmethode toevoegen en pagina, Instagram, datasets, Pixel, WhatsApp-route en twee beheerders vastleggen.", owner: "Samen", priority: "Nu" },
  { id: "google", group: "Marketing", title: "Google-accounts en billing onder Earth Spas plaatsen", description: "Business Profile, Cloud, Analytics, Tag Manager en Search Console controleren, twee beheerders toevoegen en waar nodig eigen billing koppelen.", owner: "Samen", priority: "Nu" },
  { id: "social", group: "Marketing", title: "Alle socialaccounts onder Earth Spas-eigendom plaatsen", description: "TikTok, YouTube, Pinterest en LinkedIn met zakelijke herstelmail, 2FA en minimaal twee beheerders inrichten.", owner: "Samen", priority: "Daarna" },
  { id: "ai-workspace", group: "Marketing", title: "Beslissen of een eigen Earth Spas AI-werkruimte nodig is", description: "Alleen na budgetgoedkeuring een Earth Spas-abonnement activeren. Persoonlijke accounts zijn geen structurele bedrijfsvoorziening.", owner: "Jeroen + Volker", priority: "Daarna", choiceGroupId: "ai-workspace" },
  { id: "creative-tools", group: "Marketing", title: "Optionele productieaccounts onder Earth Spas aanmaken", description: "Figma, Canva, coding-AI, stock, voice en video alleen activeren wanneer nodig, altijd op een eigen Earth Spas-account en betaalmethode.", owner: "Jeroen + Volker", priority: "Daarna" },
  { id: "tracking", group: "Marketing", title: "Conversiemeting en CRM-events instellen", description: "Lead, showroomafspraak, offerte en verkoop terugkoppelen naar bron en campagne.", owner: "Volker", priority: "Voor livegang" },
  { id: "privacy", group: "Afronding", title: "AVG en toestemmingen vastleggen", description: "Marketingtoestemming, klantfoto's, WhatsApp, voice-transcripten en agent-escalaties goedkeuren.", owner: "Earth Spas", priority: "Voor livegang" },
  { id: "acceptance", group: "Afronding", title: "Acceptatietest en rollback uitvoeren", description: "Website, mail, formulieren, database, workflows, back-ups en herstelprocedure samen testen.", owner: "Samen", priority: "Voor livegang" },
  { id: "budgets", group: "Afronding", title: "Definitieve maandlimieten vastleggen", description: "Vaste platformkosten, prepaid saldo, AI/API, media, Meta Ads en Google Ads afzonderlijk goedkeuren.", owner: "Jeroen / Wim", priority: "Nu" },
  { id: "workform", group: "Afronding", title: "Vorm van structurele betrokkenheid kiezen", description: "Vrij en incidenteel of een structureel aantal uren per week; tegenprestatie blijft buiten dit document.", owner: "Jeroen + Volker", priority: "Nu" },
  { id: "personal-payments", group: "Afronding", title: "Alle persoonlijke accounts en betaalmethoden van Volker verwijderen", description: "Pas nadat elk noodzakelijk platform aantoonbaar onder Earth Spas-eigendom, billing en hersteltoegang werkt.", owner: "Volker", priority: "Voor livegang" },
];

export const recommendedChoices = Object.fromEntries(
  choiceGroups.map((group) => [group.id, group.options.find((option) => option.recommended)?.id ?? group.options[0].id]),
);

export const defaultFeatureSelections = Object.fromEntries(
  features.map((feature) => [feature.id, ["crm", "booking", "finder", "advisor", "recovery", "marketing-agent", "analytics"].includes(feature.id)]),
);

export const defaultChecklist = Object.fromEntries(checklistItems.map((item) => [item.id, false]));
