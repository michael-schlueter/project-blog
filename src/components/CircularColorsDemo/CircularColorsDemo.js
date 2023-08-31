"use client";

import React, { useState, useEffect, useId } from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion } from "framer-motion";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timeRunning, setTimeRunning] = useState(false);

  const id = useId();

  useEffect(() => {
    if (timeRunning) {
      const intervalId = window.setInterval(() => {
        setTimeElapsed((current) => current + 1);
      }, 1000);

      return () => window.clearInterval(intervalId);
    }
  }, [timeRunning]);

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  className={styles.selectedColorOutline}
                  layoutId={`${id}-selected-color-outline`}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {!timeRunning ? (
            <button
              onClick={() => {
                setTimeRunning(!timeRunning);
                setTimeElapsed(timeElapsed + 1);
              }}
            >
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          ) : (
            <button onClick={() => setTimeRunning(!timeRunning)}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          )}
          <button onClick={() => setTimeElapsed(0)}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
