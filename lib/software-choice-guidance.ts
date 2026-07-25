export type SoftwareGroupGuidance = {
  simple: string;
  reason: string;
  benefits: string[];
  drawbacks: string[];
};

export type SoftwareAlternativeGuidance = {
  fitsWhen: string;
  tradeoff: string;
};

export const softwareGroupGuidance: Record<string, SoftwareGroupGuidance> = {
  payment: {
    simple: "Dit bepaalt van welke kaart alle software, advertenties en AI-kosten worden betaald.",
    reason: "Een zakelijke Earth Spas-kaart houdt privé-uitgaven en bedrijfskosten volledig uit elkaar en maakt limieten en facturen eenvoudig controleerbaar.",
    benefits: ["Alle kosten staan direct op naam van Earth Spas.", "Maandlimieten kunnen per leverancier worden ingesteld.", "Geen persoonlijke kaart nodig voor bedrijfssoftware."],
    drawbacks: ["De kaart en limieten moeten eerst worden ingericht.", "Iemand binnen Earth Spas moet de betalingen blijven controleren."],
  },
  workspace: {
    simple: "Dit is de centrale plek voor zakelijke e-mail, agenda's en gedeelde documenten.",
    reason: "Microsoft 365 past goed bij gedeelde mailboxen, zakelijke documenten en een duidelijke overdracht naar meerdere beheerders.",
    benefits: ["Mail, agenda en bestanden zitten in één zakelijke omgeving.", "Gedeelde mailboxen zijn goed te beheren.", "Toegang kan eenvoudig worden ingetrokken of overgedragen."],
    drawbacks: ["De bestaande mail moet zorgvuldig worden gemigreerd.", "De beheeromgeving vraagt enige gewenning."],
  },
  passwords: {
    simple: "Dit is de digitale sleutelkluis voor wachtwoorden, herstelcodes en tweestapsverificatie.",
    reason: "Bitwarden Teams is betaalbaar, overzichtelijk en voorkomt dat belangrijke toegangen in privéberichten of losse notities blijven staan.",
    benefits: ["Twee beheerders kunnen veilig bij dezelfde accounts.", "Wachtwoorden hoeven niet via WhatsApp te worden gedeeld.", "Herstelcodes blijven centraal beschikbaar."],
    drawbacks: ["Alle bestaande accounts moeten eenmalig worden opgeschoond.", "Iedere beheerder moet de kluis consequent gebruiken."],
  },
  source: {
    simple: "Hier staat de broncode van de website, agents en andere software.",
    reason: "GitHub Team maakt eigenaarschap, toegang en wijzigingen duidelijk zonder de code afhankelijk te maken van één persoonlijk account.",
    benefits: ["Earth Spas is aantoonbaar eigenaar van de repositories.", "Er kunnen minimaal twee beheerders worden ingesteld.", "Wijzigingen en herstel zijn goed te volgen."],
    drawbacks: ["Er zijn kleine maandkosten.", "Repositoryregels moeten eerst correct worden ingericht."],
  },
  dns: {
    simple: "DNS vertelt internet waar de websites en e-mail van Earth Spas te vinden zijn.",
    reason: "Cloudflare brengt domeinen, SSL, beveiliging en redirects op één plek samen zonder vaste maandkosten.",
    benefits: ["Snelle en centrale DNS voor alle domeinen.", "Gratis SSL en basisbeveiliging.", "Wijzigingen zijn goed terug te draaien."],
    drawbacks: ["De nameservers moeten zorgvuldig worden overgezet.", "Een verkeerde wijziging kan tijdelijk website of e-mail raken."],
  },
  server: {
    simple: "De server is de eigen computer op internet waarop het CMS, workflows en agents draaien.",
    reason: "Een Hetzner-productieserver met back-ups geeft voldoende capaciteit, controle en ruimte om uit te breiden zonder alles over losse diensten te verspreiden.",
    benefits: ["Directus, n8n en agents draaien onder eigen beheer.", "Vaste kosten in plaats van betalen per workflow.", "Dagelijkse back-ups en monitoring zijn mogelijk."],
    drawbacks: ["Updates en beveiliging moeten worden onderhouden.", "Bij storingen is technisch beheer nodig."],
  },
  cms: {
    simple: "Het CMS is de plek waar modellen, teksten, foto's en vertalingen worden beheerd.",
    reason: "Directus maakt één centrale gegevensbron voor website, agents en toekomstige apps, terwijl de data op de eigen infrastructuur blijft.",
    benefits: ["Content hoeft maar één keer te worden bijgehouden.", "Meerdere talen en websites gebruiken dezelfde gegevens.", "Agents kunnen werken met gecontroleerde productinformatie."],
    drawbacks: ["Het datamodel moet zorgvuldig worden ingericht.", "Beheer en back-ups horen bij de eigen server."],
  },
  automation: {
    simple: "Automatisering laat systemen automatisch taken uitvoeren, zoals een lead opvolgen of een melding sturen.",
    reason: "n8n self-hosted geeft volledige controle en rekent niet per uitgevoerde stap, wat gunstig is zodra er veel workflows draaien.",
    benefits: ["Geen oplopende kosten per uitvoering.", "Gegevens blijven in de eigen omgeving.", "Workflows en agents kunnen samen worden opgebouwd."],
    drawbacks: ["Workflows moeten worden onderhouden en getest.", "Fouten en meldingen moeten zelf goed worden ingericht."],
  },
  secrets: {
    simple: "Secrets zijn geheime sleutels waarmee systemen met elkaar mogen praten.",
    reason: "Doppler houdt API-sleutels centraal, zodat ze niet in code, documenten of persoonlijke accounts terechtkomen.",
    benefits: ["Sleutels staan op één veilige plek.", "Toegang kan per persoon en omgeving worden beperkt.", "Nieuwe deployments krijgen automatisch de juiste instellingen."],
    drawbacks: ["Bestaande sleutels moeten worden verhuisd en vernieuwd.", "De inrichting moet goed worden gedocumenteerd."],
  },
  database: {
    simple: "De database bewaart leads, formulieren, gebruikers en andere belangrijke gegevens.",
    reason: "Supabase Pro neemt dagelijkse back-ups, opslag, authenticatie en een groot deel van het databasebeheer uit handen.",
    benefits: ["Back-ups en herstel zijn professioneel geregeld.", "Database, bestanden en loginfuncties werken samen.", "Capaciteit en kosten zijn zichtbaar te bewaken."],
    drawbacks: ["Er zijn vaste maandkosten.", "De omgeving blijft deels afhankelijk van een externe leverancier."],
  },
  frontend: {
    simple: "De frontend is het zichtbare deel van de website dat bezoekers gebruiken.",
    reason: "Vercel Pro geeft betrouwbare deployments, previews en logs voor Next.js zonder dat de eigen server ook al het websiteverkeer hoeft af te handelen.",
    benefits: ["Nieuwe versies kunnen veilig vooraf worden bekeken.", "Snelle wereldwijde levering van de website.", "Fouten en deployments zijn eenvoudig terug te vinden."],
    drawbacks: ["Er zijn vaste maandkosten.", "De frontend draait bij een externe leverancier."],
  },
  "transactional-email": {
    simple: "Dit verstuurt automatische e-mails na formulieren, afspraken en serviceaanvragen.",
    reason: "Resend Pro geeft duidelijke verzendlogs en ondersteunt meerdere Earth Spas-domeinen, waardoor fouten sneller te vinden zijn.",
    benefits: ["Formuliermails zijn apart van gewone mailboxen te volgen.", "Meerdere domeinen kunnen worden geverifieerd.", "Problemen met bezorging zijn zichtbaar in logs."],
    drawbacks: ["Er zijn vaste maandkosten.", "Domeinrecords moeten correct worden ingesteld."],
  },
  "ai-workspace": {
    simple: "Dit is de vaste AI-werkruimte voor analyse, content, research en ontwikkeling.",
    reason: "ChatGPT Pro 5x biedt voldoende capaciteit voor structureel intensief gebruik zonder direct naar het zwaarste abonnement te gaan.",
    benefits: ["Ruimere limieten voor dagelijks intensief werk.", "Geschikt voor content, analyse en development in één omgeving.", "Kosten zijn rechtstreeks aan Earth Spas toe te wijzen."],
    drawbacks: ["Duurder dan een basisabonnement.", "API-gebruik en andere losse credits blijven apart."],
  },
  design: {
    simple: "Dit is de ontwerpomgeving voor websites, apps en feedback voordat iets wordt gebouwd.",
    reason: "Figma Professional houdt ontwerpen, prototypes en developer handoff overzichtelijk wanneer meerdere onderdelen worden ontwikkeld.",
    benefits: ["Ontwerpen kunnen vooraf worden beoordeeld.", "Componenten en stijlen blijven consistent.", "Development krijgt duidelijke maten en specificaties."],
    drawbacks: ["Er zijn vaste maandkosten.", "Bestanden en projecten moeten netjes worden georganiseerd."],
  },
  "social-content": {
    simple: "Dit is de werkplaats voor social posts, presentaties en eenvoudige video's.",
    reason: "Canva Pro maakt dagelijkse content snel uitvoerbaar en bewaakt huisstijl, formaten en herbruikbare templates.",
    benefits: ["Snel varianten voor verschillende socialkanalen maken.", "Merktemplates en huisstijlelementen centraal bewaren.", "Niet iedere kleine aanpassing vraagt designsoftware."],
    drawbacks: ["Niet geschikt voor alle professionele ontwerp- en videowerk.", "Templates moeten eerst goed worden opgebouwd."],
  },
  "coding-ai": {
    simple: "Dit helpt tijdens het schrijven, controleren en verbeteren van softwarecode.",
    reason: "GitHub Copilot Pro+ geeft meer toegang tot premium modellen en past bij intensieve bouw- en reviewmaanden.",
    benefits: ["Sneller code schrijven en controleren.", "Meer premium gebruik dan het basisabonnement.", "Werkt direct in de ontwikkelomgeving."],
    drawbacks: ["Verbruik moet worden bewaakt.", "AI-code blijft menselijke controle en testen nodig hebben."],
  },
  stock: {
    simple: "Dit levert gelicentieerde foto's, video, muziek en templates voor campagnes en websites.",
    reason: "Envato Core voorkomt telkens losse aankopen en biedt genoeg materiaal voor structurele contentproductie.",
    benefits: ["Veel soorten assets in één abonnement.", "Commerciële licenties zijn duidelijker geregeld.", "Minder zoektijd bij nieuwe campagnes."],
    drawbacks: ["Niet ieder asset past bij de premium Earth Spas-uitstraling.", "Licenties en projectregistratie moeten correct worden bijgehouden."],
  },
  voice: {
    simple: "AI-voice maakt gesproken uitleg en voice-overs zonder iedere tekst opnieuw op te nemen.",
    reason: "ElevenLabs Starter levert bruikbare meertalige stemmen voor uitlegvideo's en eerste voice-experimenten tegen lage vaste kosten.",
    benefits: ["Snel voice-overs in meerdere talen maken.", "Teksten kunnen eenvoudig worden aangepast.", "Lage instapkosten."],
    drawbacks: ["De stem moet zorgvuldig worden gekozen en gecontroleerd.", "Groter gebruik vraagt extra credits of een hoger abonnement."],
  },
  "video-ai": {
    simple: "AI-video helpt bij effecten, korte varianten en het aanpassen van campagnebeelden.",
    reason: "Runway Pro is geschikt wanneer regelmatig video wordt geproduceerd en vaste credits voorspelbaarder zijn dan losse aankopen.",
    benefits: ["Snel meerdere campagnevarianten maken.", "Handige effecten en beeldbewerking in één omgeving.", "Vaste hoeveelheid productiecredits."],
    drawbacks: ["Credits kunnen in drukke maanden opraken.", "Resultaten vragen selectie en nabewerking om professioneel te blijven."],
  },
};

export const softwareAlternativeGuidance: Record<string, SoftwareAlternativeGuidance> = {
  "prepaid-card": { fitsWhen: "er eerst een eenvoudige kaart met een vast saldo nodig is", tradeoff: "opwaarderen en saldo bewaken geeft extra handwerk" },
  "personal-card": { fitsWhen: "een account tijdelijk direct moet blijven werken", tradeoff: "privé- en bedrijfskosten blijven door elkaar lopen" },
  "google-workspace": { fitsWhen: "Gmail en Google Drive duidelijk de voorkeur hebben", tradeoff: "de overstap sluit minder goed aan op gedeelde Microsoft-mailboxen" },
  "workspace-current": { fitsWhen: "een mailmigratie nu te veel risico of tijd kost", tradeoff: "bestaande eigendoms- en toegangsproblemen blijven langer bestaan" },
  onepassword: { fitsWhen: "gebruiksgemak zwaarder weegt dan de laagste prijs", tradeoff: "de maandkosten zijn hoger voor een kleine beheerploeg" },
  "passwords-current": { fitsWhen: "er voorlopig geen nieuwe wachtwoordtool wordt ingevoerd", tradeoff: "herstelcodes en gedeelde toegang blijven handmatig en foutgevoeliger" },
  "github-free": { fitsWhen: "alleen de basisfuncties van GitHub nodig zijn", tradeoff: "er zijn minder regels en teamfuncties voor beheer en controle" },
  "source-current": { fitsWhen: "de repositories tijdelijk nog niet kunnen worden overgedragen", tradeoff: "de software blijft afhankelijk van de huidige eigenaar en toegang" },
  "transip-dns": { fitsWhen: "zo min mogelijk aan de huidige domeininstellingen moet veranderen", tradeoff: "DNS, beveiliging en redirects blijven verspreid beheerd" },
  "hetzner-starter": { fitsWhen: "alleen lichte workflows en testen worden gedraaid", tradeoff: "de capaciteit kan snel te klein worden bij agents, media of meerdere services" },
  "managed-server": { fitsWhen: "zo weinig mogelijk technisch serverbeheer gewenst is", tradeoff: "de kosten zijn hoger en de inrichting is minder vrij" },
  "no-server": { fitsWhen: "de serverbeslissing bewust wordt uitgesteld", tradeoff: "data en workflows blijven verspreid over losse diensten" },
  "cms-current": { fitsWhen: "de huidige contentopzet eerst stabiel moet blijven", tradeoff: "verspreide content en bestaande beperkingen blijven bestaan" },
  "no-cms": { fitsWhen: "content zelden verandert en alleen door developers wordt aangepast", tradeoff: "groei, vertalingen en automatisering worden veel lastiger" },
  make: { fitsWhen: "snel eenvoudige automatiseringen zonder serverbeheer nodig zijn", tradeoff: "kosten en limieten groeien mee met iedere uitvoering" },
  "no-automation": { fitsWhen: "processen eerst handmatig moeten worden uitgewerkt", tradeoff: "opvolging blijft tijd kosten en is makkelijker te vergeten" },
  "platform-secrets": { fitsWhen: "er weinig sleutels zijn en iedere omgeving apart beheerd kan worden", tradeoff: "sleutels raken sneller verspreid over meerdere systemen" },
  "supabase-free": { fitsWhen: "de database nog in testfase zit of nauwelijks verkeer heeft", tradeoff: "capaciteit, back-ups en garanties zijn beperkter" },
  "postgres-selfhosted": { fitsWhen: "volledige controle belangrijker is dan gemak", tradeoff: "updates, beveiliging en herstel liggen volledig bij technisch beheer" },
  "vercel-free": { fitsWhen: "de website nog experimenteel is en weinig teamfuncties nodig heeft", tradeoff: "zakelijk gebruik, support en limieten zijn beperkter" },
  "frontend-selfhosted": { fitsWhen: "alles bewust op één eigen server moet draaien", tradeoff: "deployments, schaalbaarheid en storingsbeheer vragen meer werk" },
  "resend-free": { fitsWhen: "het aantal formulieren en automatische mails nog laag is", tradeoff: "capaciteit en uitgebreide logs zijn beperkter" },
  "mail-smtp": { fitsWhen: "er geen extra verzenddienst gewenst is", tradeoff: "bezorgproblemen en automatische mails zijn lastiger te controleren" },
  "chatgpt-plus": { fitsWhen: "het gebruik licht en vooral incidenteel blijft", tradeoff: "de limieten zijn sneller bereikt tijdens intensieve werkweken" },
  "chatgpt-pro20": { fitsWhen: "zeer zware productie structureel de hoogste limieten nodig heeft", tradeoff: "de vaste kosten zijn aanzienlijk hoger" },
  "chatgpt-business": { fitsWhen: "meerdere actieve gebruikers één beheerde teamomgeving nodig hebben", tradeoff: "voor één zware gebruiker kan een individueel Pro-abonnement logischer zijn" },
  "no-chatgpt": { fitsWhen: "AI-gebruik voorlopig via bestaande omgevingen blijft lopen", tradeoff: "kosten, eigendom en gebruik zijn minder zuiver aan Earth Spas toe te wijzen" },
  "figma-free": { fitsWhen: "er weinig projecten en weinig samenwerking zijn", tradeoff: "organisatie, geschiedenis en teamfuncties zijn beperkter" },
  "no-design-tool": { fitsWhen: "kleine wijzigingen direct in code kunnen worden gemaakt", tradeoff: "feedback en vooraf vergelijken worden onoverzichtelijker" },
  "canva-free": { fitsWhen: "alleen eenvoudige en incidentele content nodig is", tradeoff: "merkbeheer, exports en premium assets zijn beperkter" },
  "no-content-tool": { fitsWhen: "alle content door andere professionele tools wordt gemaakt", tradeoff: "dagelijkse socialproductie wordt trager en afhankelijker van technisch werk" },
  "copilot-pro": { fitsWhen: "dagelijkse codehulp nodig is zonder zeer intensief premiumgebruik", tradeoff: "premium requests kunnen in drukke bouwmaanden sneller opraken" },
  "no-coding-ai": { fitsWhen: "ChatGPT en losse API-credits voldoende codeondersteuning bieden", tradeoff: "directe hulp in de ontwikkelomgeving is beperkter" },
  "free-assets": { fitsWhen: "eigen beeldmateriaal voldoende is en er weinig campagnes worden gemaakt", tradeoff: "zoeken kost meer tijd en de keuze is kleiner" },
  "no-voice": { fitsWhen: "voice-over slechts heel af en toe nodig is", tradeoff: "iedere productie vraagt een losse oplossing of nieuwe opname" },
  "video-credits-only": { fitsWhen: "video alleen in enkele campagneperiodes wordt geproduceerd", tradeoff: "kosten en beschikbare tools zijn per productiemaand minder voorspelbaar" },
};
