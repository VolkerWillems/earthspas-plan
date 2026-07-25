"use client";

import {
  ChatText,
  ClipboardText,
  Database,
  FileText,
  FlowArrow,
  Globe,
  Headphones,
  Image,
  MagicWand,
  Robot,
  Server,
  Sparkle,
  Users,
  Video,
} from "@/lib/phosphor-icons";
import { SectionHeader } from "@/components/plan-ui";
import {
  AnimatedConnectorLayer,
  FlowNode,
  FlowStage,
  type FlowConnector,
  type FlowMobileStep,
} from "./flow-kit";

const contentConnectors: FlowConnector[] = [
  { id: "checklist-intake", path: "M170 112C224 112 226 226 272 264", delay: 0.05 },
  { id: "capture-intake", path: "M170 446C224 446 226 334 272 296", delay: 0.12 },
  { id: "intake-organizer", path: "M340 268C388 222 402 136 430 116", delay: 0.2 },
  { id: "intake-marketing", path: "M340 292C388 338 402 425 430 447", delay: 0.25 },
  { id: "organizer-social", path: "M560 116C612 116 621 225 646 262", delay: 0.32 },
  { id: "marketing-social", path: "M560 447C612 447 621 336 646 298", delay: 0.38 },
  { id: "social-blog", path: "M720 270C786 226 804 116 836 94", delay: 0.45, accent: "var(--brand-secondary)" },
  { id: "social-video", path: "M720 278C792 266 812 240 836 236", delay: 0.5, accent: "var(--brand-secondary)" },
  { id: "social-socials", path: "M720 286C792 299 812 373 836 378", delay: 0.55, accent: "var(--brand-secondary)" },
  { id: "social-campaign", path: "M720 294C786 338 804 500 836 521", delay: 0.6, accent: "var(--brand-secondary)" },
];

const contentMobileSteps: FlowMobileStep[] = [
  { number: "01", title: "Plaatsingschecklist", text: "Vaste shotlist voor top view, close-up, side view, wide view en verticale en horizontale video.", icon: ClipboardText },
  { number: "02", title: "Mobiele capture-app", text: "Spa, locatie, datum en korte omschrijving worden samen met alle media ingestuurd.", icon: Image },
  { number: "03", title: "Sorteren en benoemen", text: "Bestanden worden gecontroleerd, logisch gegroepeerd en automatisch voorzien van vaste namen en metadata.", icon: Server },
  { number: "04", title: "Marketingagent", text: "De agent schrijft titels, advertenties, captions, blogcopy en kanaalspecifieke varianten.", icon: MagicWand },
  { number: "05", title: "Media-productie", text: "Foto's worden voorbereid en uit de beste beelden wordt een short video samengesteld.", icon: Video },
  { number: "06", title: "Social manager-agent", text: "De juiste combinatie van formaat, tekst en media wordt per kanaal klaargezet.", icon: FlowArrow },
  { number: "07", title: "Publicatie", text: "Blog, TikTok, Facebook, Instagram en campagnemetadata worden gecontroleerd gepubliceerd.", icon: Globe },
];

const advisorConnectors: FlowConnector[] = [
  { id: "products-knowledge", path: "M165 92C220 92 226 244 272 278", delay: 0.05 },
  { id: "service-knowledge", path: "M165 236C220 236 228 268 272 284", delay: 0.1 },
  { id: "sales-knowledge", path: "M165 378C220 378 228 318 272 296", delay: 0.15 },
  { id: "history-knowledge", path: "M165 521C220 521 226 340 272 302", delay: 0.2 },
  { id: "knowledge-agent", path: "M350 290C406 290 432 290 474 290", delay: 0.28 },
  { id: "agent-chat", path: "M585 278C634 246 654 168 686 155", delay: 0.36 },
  { id: "agent-voice", path: "M585 302C634 334 654 450 686 465", delay: 0.42 },
  { id: "chat-advice", path: "M810 155C842 155 850 155 866 155", delay: 0.5, accent: "var(--brand-secondary)" },
  { id: "chat-answer", path: "M810 167C842 198 850 274 866 290", delay: 0.55, accent: "var(--brand-secondary)" },
  { id: "voice-answer", path: "M810 453C842 420 850 318 866 302", delay: 0.6, accent: "var(--brand-secondary)" },
  { id: "voice-handoff", path: "M810 465C842 465 850 465 866 465", delay: 0.65, accent: "var(--brand-secondary)" },
];

const advisorMobileSteps: FlowMobileStep[] = [
  { number: "01", title: "Kennis vastleggen", text: "Productkennis, service-ervaring, verkoopinzichten en eerdere plaatsingen worden gestructureerd verzameld.", icon: ClipboardText },
  { number: "02", title: "Centrale kennisbron", text: "De informatie wordt doorzoekbaar, versieerbaar en bruikbaar voor alle gekoppelde agents.", icon: Database },
  { number: "03", title: "Kennisagent", text: "De agent combineert klantvragen met productdata en praktische ervaring zonder zomaar iets te verzinnen.", icon: Robot },
  { number: "04", title: "Chat en voice", text: "Bezoekers typen hun vraag of praten via de microfoon en krijgen dezelfde advieslogica.", icon: Headphones },
  { number: "05", title: "Persoonlijk advies", text: "De bezoeker ontvangt een helder tekst- of audioantwoord met passende vervolgstappen.", icon: Sparkle },
  { number: "06", title: "Menselijke overdracht", text: "Serieuze interesse of complexe situaties worden met context naar een medewerker doorgestuurd.", icon: Users },
];

export function AgentFlowShowcase() {
  return (
    <section className="agent-flow-section theme-primary" aria-labelledby="agent-flows-title">
      <div className="content-shell">
        <div className="agent-flow-header">
          <SectionHeader
            eyebrow="Toekomstige agent-infrastructuur"
            title="Agentflows voor content en advies"
            text="Twee gecontroleerde processen verbinden plaatsingsmedia, marketingproductie, praktijkkennis en persoonlijk klantadvies. Iedere stap blijft zichtbaar, overdraagbaar en menselijk controleerbaar."
          />
          <aside className="agent-flow-note">
            <strong>Herbruikbare Motion-componenten</strong>
            <p>Nodes, connectoren, datapakketten en responsive varianten staan los van de inhoud en volgen voortaan hetzelfde Earth Spas designsysteem.</p>
          </aside>
        </div>

        <div className="agent-flow-block">
          <div className="agent-flow-heading" data-reveal="up">
            <div>
              <span className="eyebrow">Flow 01 · Installation Content Engine</span>
              <h3>Plaatsing naar content</h3>
            </div>
            <p>Een gecontroleerde upload wordt gesorteerd, verrijkt, geproduceerd en per kanaal klaargezet.</p>
          </div>

          <FlowStage label="Installation Content Engine" mobileSteps={contentMobileSteps}>
            <AnimatedConnectorLayer connectors={contentConnectors} />
            <FlowNode x={9} y={18} width={17} icon={ClipboardText} eyebrow="Input" title="Plaatsingschecklist" text="Verplichte foto- en videoshots" delay={0.05} />
            <FlowNode x={9} y={72} width={17} icon={Image} eyebrow="Mobiele app" title="Upload plaatsing" text="Spa, locatie, datum en omschrijving" delay={0.1} />
            <FlowNode x={30} y={45} width={12} icon={Server} eyebrow="Intake" title="Media hub" text="Controleert en ontvangt alles" variant="hub" delay={0.18} />
            <FlowNode x={48} y={17} width={18} icon={Database} eyebrow="Asset pipeline" title="Sorteren & benoemen" text="Structuur, metadata en vaste bestandsnamen" delay={0.24} />
            <FlowNode x={48} y={73} width={18} icon={MagicWand} eyebrow="Agent" title="Marketingproductie" text="Copy, beeldselectie, editing en short video" delay={0.3} />
            <FlowNode x={68} y={45} width={12} icon={FlowArrow} eyebrow="Orchestratie" title="Social manager" text="Kiest kanaal, formaat en planning" variant="hub" delay={0.38} />
            <FlowNode x={90} y={15} width={15} icon={FileText} eyebrow="Website" title="Nieuwe blog" text="Projectverhaal met geselecteerde media" variant="output" delay={0.48} />
            <FlowNode x={90} y={38} width={15} icon={Video} eyebrow="TikTok / Reels" title="Short video" text="Verticaal, kort en platformklaar" variant="output" delay={0.53} />
            <FlowNode x={90} y={61} width={15} icon={Users} eyebrow="Social" title="Facebook & Instagram" text="Berichten met passende foto's" variant="output" delay={0.58} />
            <FlowNode x={90} y={84} width={15} icon={Globe} eyebrow="Campagnes" title="SEO & advertentieteksten" text="Titels, captions en metadata" variant="output" delay={0.63} />
          </FlowStage>
        </div>

        <div className="agent-flow-block">
          <div className="agent-flow-heading" data-reveal="up">
            <div>
              <span className="eyebrow">Flow 02 · Knowledge & Voice Advisor</span>
              <h3>Kennis naar persoonlijk advies</h3>
            </div>
            <p>Gecontroleerde product- en servicekennis ondersteunt chat, voice en warme menselijke overdracht.</p>
          </div>

          <FlowStage label="Knowledge and Voice Advisor" mobileSteps={advisorMobileSteps}>
            <AnimatedConnectorLayer connectors={advisorConnectors} />
            <FlowNode x={9} y={15} width={15} icon={FileText} eyebrow="Bron" title="Productkennis" text="Modellen, opties en verschillen" delay={0.04} />
            <FlowNode x={9} y={38} width={15} icon={Server} eyebrow="Bron" title="Servicekennis" text="Onderhoud, storingen en oplossingen" delay={0.08} />
            <FlowNode x={9} y={61} width={15} icon={Users} eyebrow="Bron" title="Verkoopervaring" text="Vragen, bezwaren en behoeften" delay={0.12} />
            <FlowNode x={9} y={84} width={15} icon={Image} eyebrow="Bron" title="Projecthistorie" text="Plaatsingen, situaties en resultaten" delay={0.16} />
            <FlowNode x={30} y={50} width={12} icon={Database} eyebrow="Grounding" title="Kennisbank" text="Beheerde en actuele informatie" variant="hub" delay={0.24} />
            <FlowNode x={52} y={50} width={14} icon={Robot} eyebrow="Reasoning" title="AI Spa Advisor" text="Combineert vraag, context en kennis" variant="hub" delay={0.32} />
            <FlowNode x={74} y={25} width={16} icon={ChatText} eyebrow="Website" title="Chatgesprek" text="De klant typt een vraag" delay={0.4} />
            <FlowNode x={74} y={75} width={16} icon={Headphones} eyebrow="Telefoon" title="Voicegesprek" text="Vraag en antwoord via microfoon" delay={0.45} />
            <FlowNode x={92} y={25} width={13} icon={Sparkle} eyebrow="Output" title="Persoonlijk advies" text="Duidelijk antwoord en opties" variant="output" delay={0.52} />
            <FlowNode x={92} y={50} width={13} icon={ChatText} eyebrow="Output" title="Tekst of audio" text="Hetzelfde antwoord in passend formaat" variant="output" delay={0.57} />
            <FlowNode x={92} y={75} width={13} icon={Users} eyebrow="Escalatie" title="Warme overdracht" text="Context mee naar een medewerker" variant="output" delay={0.62} />
          </FlowStage>
        </div>
      </div>
    </section>
  );
}
