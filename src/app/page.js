"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import LockScreen from "../components/LockScreen";
import Desktop from "../components/Desktop";
import BootScreen from "../components/BootScreen";
import MobilePortfolio from "../components/MobilePortfolio";
import wallpaper from "../../public/wallpaper.jpg";

const MOBILE_BREAKPOINT = 768;

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);
  const [booting, setBooting] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Image
        src={wallpaper}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center', zIndex: -1 }}
      />
      <AnimatePresence mode="wait">
        {booting ? (
          <motion.div
            key="boot"
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <BootScreen onDone={() => setBooting(false)} />
          </motion.div>
        ) : isMobile ? (
          <motion.div
            key="mobile"
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <MobilePortfolio />
          </motion.div>
        ) : isLocked ? (
          <motion.div
            key="lock"
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <LockScreen onUnlock={() => setIsLocked(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="desktop"
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            <Desktop onLock={() => setIsLocked(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
