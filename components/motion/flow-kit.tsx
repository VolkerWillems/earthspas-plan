"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

export type FlowIcon = React.ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
  weight?: "regular" | "duotone" | "fill";
}>;

export type FlowConnector = {
  id: string;
  path: string;
  delay?: number;
  duration?: number;
  accent?: string;
  reverse?: boolean;
  showPacket?: boolean;
};

export type FlowMobileStep = {
  number: string;
  title: string;
  text: string;
  icon: FlowIcon;
};

type FlowStageProps = {
  label: string;
  children: React.ReactNode;
  mobileSteps: FlowMobileStep[];
  className?: string;
};

type FlowNodeProps = {
  x: number;
  y: number;
  width?: number;
  icon: FlowIcon;
  title: string;
  eyebrow?: string;
  text?: string;
  variant?: "card" | "hub" | "output";
  delay?: number;
};

type AnimatedConnectorLayerProps = {
  connectors: FlowConnector[];
  viewBox?: string;
};

export function FlowStage({ label, children, mobileSteps, className }: FlowStageProps) {
  return (
    <div className={["flow-stage", className].filter(Boolean).join(" ")} aria-label={label} role="group">
      <div className="flow-grid" aria-hidden="true" />
      <div className="flow-desktop-canvas">{children}</div>
      <ol className="flow-mobile" aria-label={`${label} in stappen`}>
        {mobileSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={`${step.number}-${step.title}`}>
              <motion.li
                className="flow-mobile-step"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.42, delay: index * 0.035 }}
              >
                <span className="flow-mobile-step-icon"><Icon aria-hidden weight="duotone" /></span>
                <span className="flow-mobile-step-copy">
                  <span>{step.number}</span>
                  <strong>{step.title}</strong>
                  <small>{step.text}</small>
                </span>
              </motion.li>
              {index < mobileSteps.length - 1 && <li className="flow-mobile-arrow" aria-hidden="true">↓</li>}
            </React.Fragment>
          );
        })}
      </ol>
    </div>
  );
}

export function FlowNode({
  x,
  y,
  width = 18,
  icon: Icon,
  title,
  eyebrow,
  text,
  variant = "card",
  delay = 0,
}: FlowNodeProps) {
  const reducedMotion = useReducedMotion();
  const positionStyle = {
    "--flow-x": `${x}%`,
    "--flow-y": `${y}%`,
    "--flow-width": `${width}%`,
  } as React.CSSProperties;

  if (variant === "hub") {
    return (
      <div className="flow-node-position" style={positionStyle}>
        <motion.div
          className="flow-hub"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reducedMotion ? undefined : { y: -3, scale: 1.012 }}
        >
          <span className="flow-hub-orb"><Icon aria-hidden weight="duotone" /></span>
          {eyebrow && <span className="flow-hub-eyebrow">{eyebrow}</span>}
          <strong>{title}</strong>
          {text && <small>{text}</small>}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flow-node-position" style={positionStyle}>
      <motion.article
        className={["flow-node-card", variant === "output" ? "flow-node-output" : ""].filter(Boolean).join(" ")}
        initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.46, delay, ease: [0.22, 1, 0.36, 1] }}
        whileHover={reducedMotion ? undefined : { y: -4, rotateX: 0.8, scale: 1.006 }}
      >
        <span className="flow-node-icon"><Icon aria-hidden weight="duotone" /></span>
        <span className="flow-node-copy">
          {eyebrow && <span>{eyebrow}</span>}
          <strong>{title}</strong>
          {text && <small>{text}</small>}
        </span>
      </motion.article>
    </div>
  );
}

export function AnimatedConnectorLayer({ connectors, viewBox = "0 0 1000 620" }: AnimatedConnectorLayerProps) {
  const reducedMotion = useReducedMotion();

  return (
    <svg className="flow-connector-layer" viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true">
      {connectors.map((connector, index) => {
        const accent = connector.accent ?? "var(--brand-primary)";
        const duration = connector.duration ?? 0.95;
        const dashOffset = connector.reverse ? 360 : -360;

        return (
          <g key={connector.id}>
            <path className="flow-connector-base" d={connector.path} />
            <motion.path
              className="flow-connector-active"
              d={connector.path}
              fill="none"
              stroke={accent}
              strokeLinecap="square"
              strokeLinejoin="round"
              strokeWidth="1.6"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.78 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration, delay: connector.delay ?? index * 0.03, ease: [0.22, 1, 0.36, 1] }}
            />
            {!reducedMotion && (
              <motion.path
                className="flow-connector-active"
                d={connector.path}
                fill="none"
                stroke={accent}
                strokeDasharray="72 420"
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeWidth="2"
                initial={{ strokeDashoffset: 0, opacity: 0 }}
                whileInView={{ opacity: 0.46 }}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{
                  opacity: { duration: 0.3, delay: (connector.delay ?? 0) + 0.25 },
                  strokeDashoffset: { duration: 5.2, ease: "linear", repeat: Infinity },
                }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
