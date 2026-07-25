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
  { id: "checklist-intake", path: "M170 112H220V264H272", delay: 0.05 },
  { id: "capture-intake", path: "M170 446H220V296H272", delay: 0.1 },
  { id: "intake-organizer", path: "M340 268H382V116H430", delay: 0.17 },
  { id: "intake-marketing", path: "M340 292H382V447H430", delay: 0.22 },
  { id: "organizer-social", path: "M560 116H610V262H646", delay: 0.29 },
  { id: "marketing-social", path: "M560 447H610V298H646", delay: 0.34 },
  { id: "social-blog", path: "M720 270H780V94H836", delay: 0.41, accent: "var(--brand-secondary)" },
  { id: "social-video", path: "M720 278H792V236H836", delay: 0.46, accent: "var(--brand-secondary)" },
  { id: "social-socials", path: "M720 286H792V378H836", delay: 0.51, accent: "var(--brand-secondary)" },
  { id: "social-campaign", path: "M720 294H780V521H836", delay: 0.56, accent: "var(--brand-secondary)" },
];

const contentMobileSteps: FlowMobileStep[] = [
  { number: "01", title: "Plaatsingschecklist", text: "Vaste shotlist voor foto en video.", icon: ClipboardText },
  { number: "02", title: "Mobiele capture", text: "Spa, locatie, datum en media worden samen ingestuurd.", icon: Image },
  { number: "03", title: "Assetstructuur", text: "Bestanden worden gecontroleerd, gegroepeerd en benoemd.", icon: Server },
  { number: "04", title: "Marketingproductie", text: "Copy, beeldselectie, editing en short video.", icon: MagicWand },
  { number: "05", title: "Orchestratie", text: "Kanaal, formaat en planning worden gekoppeld.", icon: FlowArrow },
  { number: "06", title: "Publicatie", text: "Blog, video, social en campagnes worden klaargezet.", icon: Globe },
];

const advisorConnectors: FlowConnector[] = [
  { id: "products-knowledge", path: "M165 92H220V278H272", delay: 0.05 },
  { id: "service-knowledge", path: "M165 236H232V284H272", delay: 0.1 },
  { id: "sales-knowledge", path: "M165 378H232V296H272", delay: 0.15 },
  { id: "history-knowledge", path: "M165 521H220V302H272", delay: 0.2 },
  { id: "knowledge-agent", path: "M350 290H474", delay: 0.27 },
  { id: "agent-chat", path: "M585 278H630V155H686", delay: 0.34 },
  { id: "agent-voice", path: "M585 302H630V465H686", delay: 0.39 },
  { id: "chat-advice", path: "M810 155H866", delay: 0.46, accent: "var(--brand-secondary)" },
  { id: "chat-answer", path: "M810 167H838V290H866", delay: 0.51, accent: "var(--brand-secondary)" },
  { id: "voice-answer", path: "M810 453H838V302H866", delay: 0.56, accent: "var(--brand-secondary)" },
  { id: "voice-handoff", path: "M810 465H866", delay: 0.61, accent: "var(--brand-secondary)" },
];

const advisorMobileSteps: FlowMobileStep[] = [
  { number: "01", title: "Kennis vastleggen", text: "Product-, service- en verkoopkennis wordt beheerd verzameld.", icon: ClipboardText },
  { number: "02", title: "Centrale kennisbron", text: "De informatie wordt doorzoekbaar en versieerbaar.", icon: Database },
  { number: "03", title: "AI Spa Advisor", text: "De agent combineert vraag, context en gecontroleerde kennis.", icon: Robot },
  { number: "04", title: "Chat en voice", text: "Tekst en spraak gebruiken dezelfde advieslogica.", icon: Headphones },
  { number: "05", title: "Persoonlijk advies", text: "De klant ontvangt een duidelijk antwoord en vervolgstap.", icon: Sparkle },
  { number: "06", title: "Warme overdracht", text: "Complexe vragen gaan met context naar een medewerker.", icon: Users },
];

export function AgentFlowShowcase() {
  return (
    <section className="agent-flow-section theme-primary" aria-labelledby="agent-flows-title">
      <div className="content-shell">
        <div className="agent-flow-header">
          <SectionHeader
            eyebrow="Toekomstige agent-infrastructuur"
            title="Content- en adviesflows"
            text="Twee gecontroleerde processen verbinden plaatsingsmedia, marketingproductie, praktijkkennis en persoonlijk klantadvies. Iedere stap blijft zichtbaar en menselijk controleerbaar."
          />
          <aside className="agent-flow-note">
            <strong>Herbruikbare flowlaag</strong>
            <p>De nodes, rechte connectorroutes en responsive stappen gebruiken één centraal Earth Spas designsysteem.</p>
          </aside>
        </div>

        <div className="agent-flow-block">
          <div className="agent-flow-heading" data-reveal="up">
            <div><span className="eyebrow">Flow 01 · Installation Content Engine</span><h3>Plaatsing naar content</h3></div>
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
            <FlowNode x={90} y={84} width={15} icon={Globe} eyebrow="Campagnes" title="SEO & advertenties" text="Titels, captions en metadata" variant="output" delay={0.63} />
          </FlowStage>
        </div>

        <div className="agent-flow-block">
          <div className="agent-flow-heading" data-reveal="up">
            <div><span className="eyebrow">Flow 02 · Knowledge & Voice Advisor</span><h3>Kennis naar advies</h3></div>
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
