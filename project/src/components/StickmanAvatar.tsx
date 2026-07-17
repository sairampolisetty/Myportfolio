import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Level = {
  id: number;
  label: string;
  x: number;
  y: number;
};

interface StickmanAvatarProps {
  levels: Level[];
  currentLevel: number;
}

const headR = 6;
const bodyLen = 22;
const armLen = 18;
const legLen = 22;

export const StickmanAvatar: React.FC<StickmanAvatarProps> = ({ levels, currentLevel }) => {
  const [prevLevel, setPrevLevel] = useState(currentLevel);
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  // Start with empty pose to prevent render crash before size is known
  const [pose, setPose] = useState<any>(null);
  const [transitionDuration, setTransitionDuration] = useState(0.4);

  useEffect(() => {
    const el = document.getElementById('game-canvas');
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      setSize({ width: entries[0].contentRect.width, height: entries[0].contentRect.height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getIdlePose = (x: number, y: number) => {
    const neckY = y - legLen - bodyLen;
    const pelvisY = y - legLen;
    return {
      head: { cx: x, cy: neckY - headR },
      body: { x1: x, y1: neckY, x2: x, y2: pelvisY },
      armL: { x1: x, y1: neckY + 2, x2: x - 12, y2: neckY + armLen },
      armR: { x1: x, y1: neckY + 2, x2: x + 12, y2: neckY + armLen },
      legL: { x1: x, y1: pelvisY, x2: x - 10, y2: y },
      legR: { x1: x, y1: pelvisY, x2: x + 10, y2: y }
    };
  };

  const getReachPose = (startX: number, startY: number, targetX: number, targetY: number) => {
    const neckY = startY - legLen - bodyLen + 5; // duck slightly
    const pelvisY = startY - legLen + 5;
    return {
      head: { cx: startX, cy: neckY - headR },
      body: { x1: startX, y1: neckY, x2: startX, y2: pelvisY },
      armL: { x1: startX, y1: neckY + 2, x2: targetX, y2: targetY }, // Both hands stretch and grab target!
      armR: { x1: startX, y1: neckY + 2, x2: targetX, y2: targetY },
      legL: { x1: startX, y1: pelvisY, x2: startX - 12, y2: startY },
      legR: { x1: startX, y1: pelvisY, x2: startX + 12, y2: startY }
    };
  };

  const getPullPose = (startX: number, startY: number, targetX: number, targetY: number) => {
    const isRight = targetX > startX;
    const midX = startX + (targetX - startX) * 0.6; // body flies through air
    const midY = Math.min(startY, targetY) - 20;
    
    const neckX = midX + (isRight ? 15 : -15);
    const neckY = midY - bodyLen;
    
    return {
      head: { cx: neckX, cy: neckY - headR },
      body: { x1: neckX, y1: neckY, x2: midX, y2: midY }, // pelvis is at midX, midY
      armL: { x1: neckX, y1: neckY + 2, x2: targetX, y2: targetY }, // hands still holding target
      armR: { x1: neckX, y1: neckY + 2, x2: targetX, y2: targetY },
      legL: { x1: midX, y1: midY, x2: startX + (targetX - startX) * 0.2, y2: startY - 10 }, // trailing
      legR: { x1: midX, y1: midY, x2: startX + (targetX - startX) * 0.3, y2: startY - 15 } // trailing
    };
  };

  useEffect(() => {
    if (size.width === 0 || size.height === 0) return;

    const end = levels[currentLevel];
    const endX = (end.x / 100) * size.width;
    const endY = (end.y / 100) * size.height;

    if (currentLevel !== prevLevel && pose !== null) {
      const runAnimation = async () => {
        const start = levels[prevLevel];
        const startX = (start.x / 100) * size.width;
        const startY = (start.y / 100) * size.height;

        // 1. Stretch hands out to target
        setTransitionDuration(0.3);
        setPose(getReachPose(startX, startY, endX, endY));
        await new Promise(r => setTimeout(r, 300));

        // 2. Pull body towards target
        setTransitionDuration(0.4);
        setPose(getPullPose(startX, startY, endX, endY));
        await new Promise(r => setTimeout(r, 400));

        // 3. Settle into idle at new target
        setTransitionDuration(0.3);
        setPose(getIdlePose(endX, endY));
        await new Promise(r => setTimeout(r, 300));

        setPrevLevel(currentLevel);
      };

      runAnimation();
    } else {
      // First load or hard reset
      setPose(getIdlePose(endX, endY));
    }
  }, [currentLevel, levels, prevLevel, size]); // We intentionally do not depend on `pose` here to avoid loop

  if (!pose) return null;

  const commonProps = {
    stroke: "#22c55e",
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]",
    transition: { duration: transitionDuration, ease: "easeInOut" }
  };

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
      <motion.circle r={headR} {...commonProps} animate={pose.head} />
      <motion.line {...commonProps} animate={pose.body} />
      <motion.line {...commonProps} animate={pose.armL} />
      <motion.line {...commonProps} animate={pose.armR} />
      <motion.line {...commonProps} animate={pose.legL} />
      <motion.line {...commonProps} animate={pose.legR} />
    </svg>
  );
};
