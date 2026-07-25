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
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.36, delay: index * 0.03 }}
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
          initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.38, delay, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reducedMotion ? undefined : { y: -2, scale: 1.008 }}
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
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.38, delay, ease: [0.22, 1, 0.36, 1] }}
        whileHover={reducedMotion ? undefined : { y: -2, rotateX: 0.35 }}
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
        const duration = connector.duration ?? 0.72;

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
              strokeWidth="1.25"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.62 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration, delay: connector.delay ?? index * 0.025, ease: [0.22, 1, 0.36, 1] }}
            />
          </g>
        );
      })}
    </svg>
  );
}
