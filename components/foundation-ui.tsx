import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Accent = "primary" | "secondary";
type Align = "left" | "center";
type ContainerSize = "default" | "wide" | "reading" | "form";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
};

const containerSizes: Record<ContainerSize, string> = {
  default: "max-w-[75rem]",
  wide: "max-w-[85rem]",
  reading: "max-w-[45rem]",
  form: "max-w-[42rem]",
};

export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", containerSizes[size], className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  accent = "primary",
  id,
}: {
  children: ReactNode;
  className?: string;
  accent?: Accent;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "border-b border-border/70 bg-[var(--background)] py-16 sm:py-20",
        accent === "primary" ? "theme-primary" : "theme-secondary",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function PageHero({
  eyebrow,
  kicker,
  title,
  text,
  actions,
  image,
  imageAlt,
  accent = "primary",
}: {
  eyebrow: string;
  kicker?: string;
  title: string;
  text: string;
  actions?: ReactNode;
  image: string;
  imageAlt: string;
  accent?: Accent;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/70 bg-[var(--background)] py-16 sm:py-20 lg:py-24",
        accent === "primary" ? "theme-primary" : "theme-secondary",
      )}
    >
      <div className="pointer-events-none absolute right-[-8rem] top-[-12rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--section-accent)_12%,transparent),transparent_68%)]" />
      <Container>
        <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,.92fr)] lg:gap-14">
          <div className="max-w-[42rem]">
            <p className="text-base uppercase leading-6 tracking-[0.08em] text-[var(--section-accent)]">{eyebrow}</p>
            {kicker ? (
              <p className="mt-2 text-sm uppercase tracking-[0.08em] text-[var(--text-muted)]">{kicker}</p>
            ) : null}
            <h1 className="mt-4 text-[clamp(2.5rem,5vw,4rem)] uppercase leading-[1.05] tracking-[0.04em] text-[var(--section-accent)]">
              {title}
            </h1>
            <p className="mt-6 max-w-[40rem] text-lg leading-8 text-[var(--text-secondary)]">{text}</p>
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>

          <div className="overflow-hidden rounded-[5px] border border-border bg-[var(--surface-card)] shadow-[var(--shadow-card),var(--shadow-inset)]">
            <div className="aspect-[16/10] overflow-hidden">
              <img className="h-full w-full object-cover" src={image} alt={imageAlt} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  accent = "primary",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  align?: Align;
  accent?: Accent;
  className?: string;
}) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        "w-full",
        accent === "primary" ? "theme-primary" : "theme-secondary",
        centered && "text-center",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-3", centered && "items-center")}>
        {eyebrow ? (
          <p className="text-base uppercase leading-6 tracking-[0.08em] text-[var(--section-accent)]">{eyebrow}</p>
        ) : null}
        <h2 className="max-w-[60rem] text-4xl uppercase leading-[1.2] tracking-[0.05em] text-[var(--section-accent)] sm:text-[3rem] sm:leading-[1.5]">
          {title}
        </h2>
      </div>

      <div className="my-6 h-0.5 w-full bg-[color-mix(in_srgb,var(--section-accent)_34%,var(--border-default))]" />

      <div
        className={cn(
          "flex flex-col gap-6",
          centered ? "items-center" : "items-start sm:flex-row sm:items-end sm:justify-between",
        )}
      >
        {description ? (
          <p className="max-w-[45rem] text-base leading-7 text-[var(--text-secondary)] sm:text-xl sm:leading-7">
            {description}
          </p>
        ) : (
          <span />
        )}
        {actions ? <div className="flex shrink-0 flex-wrap gap-3">{actions}</div> : null}
      </div>
    </header>
  );
}

export function SectionContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mt-12", className)}>{children}</div>;
}

export function CardGrid({
  children,
  columns = 3,
  className,
}: {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const layouts = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 xl:grid-cols-3",
    4: "sm:grid-cols-2 xl:grid-cols-4",
  } as const;

  return <div className={cn("grid items-start gap-5", layouts[columns], className)}>{children}</div>;
}

export function SplitGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid items-start gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(22rem,.92fr)]", className)}>
      {children}
    </div>
  );
}

export function ContentCard({
  children,
  className,
  eyebrow,
  title,
  icon: Icon,
}: {
  children?: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  icon?: ElementType;
}) {
  return (
    <article
      className={cn(
        "h-auto min-w-0 self-start rounded-[5px] border border-border bg-[var(--surface-card)] p-6 shadow-[var(--shadow-card),var(--shadow-inset)]",
        className,
      )}
    >
      {Icon ? (
        <span className="grid h-12 w-12 place-items-center rounded-[5px] border border-[color-mix(in_srgb,var(--section-accent)_42%,var(--border-default))] bg-[color-mix(in_srgb,var(--section-accent)_8%,var(--surface-card))] text-[var(--section-accent)]">
          <Icon className="h-6 w-6" />
        </span>
      ) : null}
      {eyebrow ? (
        <p className={cn("text-sm uppercase leading-5 tracking-[0.08em] text-[var(--section-accent)]", Icon && "mt-5")}>
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h3 className={cn("text-xl uppercase leading-7 tracking-[0.025em] text-[var(--text-primary)]", (Icon || eyebrow) && "mt-3")}>
          {title}
        </h3>
      ) : null}
      {children ? <div className={cn((Icon || eyebrow || title) && "mt-3", "text-base leading-6 text-[var(--text-secondary)]")}>{children}</div> : null}
    </article>
  );
}

export function MetricCard({
  label,
  value,
  detail,
  className,
}: {
  label: string;
  value: string;
  detail?: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "h-auto min-w-0 self-start rounded-[5px] border border-border bg-[linear-gradient(145deg,color-mix(in_srgb,var(--section-accent)_6%,var(--surface-card)),var(--surface-card)_70%)] p-6 shadow-[var(--shadow-card),var(--shadow-inset)]",
        className,
      )}
    >
      <p className="text-sm uppercase leading-5 tracking-[0.08em] text-[var(--text-muted)]">{label}</p>
      <p className="mt-3 font-[family-name:var(--font-heading)] text-3xl leading-10 text-[var(--section-accent)]">{value}</p>
      {detail ? <p className="mt-3 text-base leading-6 text-[var(--text-secondary)]">{detail}</p> : null}
    </article>
  );
}
