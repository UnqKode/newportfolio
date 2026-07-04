"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { X, Minus, Square } from "lucide-react";

const MIN_WIDTH = 320;
const MIN_HEIGHT = 240;
const EDGE_THRESHOLD = 6;
const TASKBAR_HEIGHT = 48;
const SPRING = { type: "spring", stiffness: 500, damping: 42, mass: 0.9 };

const RESIZE_HANDLES = [
  { dir: 'n', style: { top: 0, left: 8, right: 8, height: 6, cursor: 'ns-resize' } },
  { dir: 's', style: { bottom: 0, left: 8, right: 8, height: 6, cursor: 'ns-resize' } },
  { dir: 'w', style: { left: 0, top: 8, bottom: 8, width: 6, cursor: 'ew-resize' } },
  { dir: 'e', style: { right: 0, top: 8, bottom: 8, width: 6, cursor: 'ew-resize' } },
  { dir: 'nw', style: { top: 0, left: 0, width: 10, height: 10, cursor: 'nwse-resize' } },
  { dir: 'se', style: { bottom: 0, right: 0, width: 10, height: 10, cursor: 'nwse-resize' } },
  { dir: 'ne', style: { top: 0, right: 0, width: 10, height: 10, cursor: 'nesw-resize' } },
  { dir: 'sw', style: { bottom: 0, left: 0, width: 10, height: 10, cursor: 'nesw-resize' } },
];

export default function Window({ app, isActive, isMinimized, onFocus, onMinimize, onClose }) {
  // Lazy initializer staggers each new window so they don't stack exactly on top of each other.
  // (useState's lazy-init form, not useRef, is the sanctioned way to run this one-time
  // impure computation - reading Math.random() directly during render is disallowed.)
  const [initialPos] = useState(() => ({ x: 50 + Math.random() * 50, y: 50 + Math.random() * 50 }));

  // Motion values back the window's box directly (translate transform + width/height).
  // Dragging/resizing mutate these with .set() - a direct DOM write with no React
  // re-render - which is what actually eliminates the per-frame jitter. Discrete
  // state changes (maximize/snap/restore) animate them with a spring instead.
  const x = useMotionValue(initialPos.x);
  const y = useMotionValue(initialPos.y);
  const width = useMotionValue(800);
  const height = useMotionValue(600);

  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [snap, setSnap] = useState(null); // null | 'left' | 'right'
  const [snapPreview, setSnapPreview] = useState(null); // null | 'left' | 'right' | 'top'
  const [resizing, setResizing] = useState(null);

  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef(null);
  const preRect = useRef(null); // floating rect to restore to, captured before maximize/snap

  const animateRect = (target) => {
    animate(x, target.x, SPRING);
    animate(y, target.y, SPRING);
    animate(width, target.width, SPRING);
    animate(height, target.height, SPRING);
  };

  const captureFloatingRect = () => {
    if (!isMaximized && !snap) {
      preRect.current = { x: x.get(), y: y.get(), width: width.get(), height: height.get() };
    }
  };

  const maximizeRect = () => ({ x: 0, y: 0, width: window.innerWidth, height: window.innerHeight - TASKBAR_HEIGHT });
  const snapRect = (side) => ({
    x: side === 'right' ? window.innerWidth / 2 : 0,
    y: 0,
    width: window.innerWidth / 2,
    height: window.innerHeight - TASKBAR_HEIGHT,
  });

  // Keep a maximized/snapped window filling the viewport if the browser itself is resized.
  useEffect(() => {
    const onResize = () => {
      if (isMaximized) animateRect(maximizeRect());
      else if (snap) animateRect(snapRect(snap));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMaximized, snap]);

  const toggleMaximize = () => {
    if (isMaximized) {
      setIsMaximized(false);
      animateRect(preRect.current || { x: initialPos.x, y: initialPos.y, width: 800, height: 600 });
    } else {
      captureFloatingRect();
      setSnap(null);
      setIsMaximized(true);
      animateRect(maximizeRect());
    }
  };

  const handleTitlePointerDown = (e) => {
    onFocus();
    if (isMaximized || snap) {
      const w = width.get();
      const newX = Math.max(0, e.clientX - w / 2);
      setIsMaximized(false);
      setSnap(null);
      x.set(newX);
      y.set(20);
      dragOffset.current = { x: w / 2, y: 20 };
    } else {
      dragOffset.current = { x: e.clientX - x.get(), y: e.clientY - y.get() };
    }
    setIsDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  const handleTitlePointerMove = (e) => {
    if (!isDragging) return;
    x.set(e.clientX - dragOffset.current.x);
    y.set(e.clientY - dragOffset.current.y);

    if (e.clientY <= EDGE_THRESHOLD) setSnapPreview('top');
    else if (e.clientX <= EDGE_THRESHOLD) setSnapPreview('left');
    else if (e.clientX >= window.innerWidth - EDGE_THRESHOLD) setSnapPreview('right');
    else setSnapPreview(null);
  };

  const handleTitlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
    if (snapPreview === 'top') {
      captureFloatingRect();
      setIsMaximized(true);
      setSnap(null);
      animateRect(maximizeRect());
    } else if (snapPreview === 'left' || snapPreview === 'right') {
      captureFloatingRect();
      setSnap(snapPreview);
      setIsMaximized(false);
      animateRect(snapRect(snapPreview));
    }
    setSnapPreview(null);
  };

  const handleResizePointerDown = (e, direction) => {
    e.stopPropagation();
    onFocus();
    resizeStart.current = {
      mouseX: e.clientX, mouseY: e.clientY,
      width: width.get(), height: height.get(), x: x.get(), y: y.get(),
    };
    setResizing(direction);
    e.target.setPointerCapture(e.pointerId);
  };

  const handleResizePointerMove = (e) => {
    if (!resizing || !resizeStart.current) return;
    const start = resizeStart.current;
    const dx = e.clientX - start.mouseX;
    const dy = e.clientY - start.mouseY;
    let newWidth = start.width, newHeight = start.height, newX = start.x, newY = start.y;

    if (resizing.includes('e')) newWidth = Math.max(MIN_WIDTH, start.width + dx);
    if (resizing.includes('w')) {
      newWidth = Math.max(MIN_WIDTH, start.width - dx);
      newX = start.x + (start.width - newWidth);
    }
    if (resizing.includes('s')) newHeight = Math.max(MIN_HEIGHT, start.height + dy);
    if (resizing.includes('n')) {
      newHeight = Math.max(MIN_HEIGHT, start.height - dy);
      newY = start.y + (start.height - newHeight);
    }

    width.set(newWidth);
    height.set(newHeight);
    x.set(newX);
    y.set(newY);
  };

  const handleResizePointerUp = (e) => {
    setResizing(null);
    e.target.releasePointerCapture(e.pointerId);
  };

  const canResize = !isMaximized && !snap;

  return (
    <>
      {isDragging && snapPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          style={{
            position: 'fixed',
            zIndex: 45,
            pointerEvents: 'none',
            background: 'rgba(0,120,212,0.35)',
            border: '2px solid rgba(0,120,212,0.7)',
            borderRadius: 8,
            ...(snapPreview === 'left' && { top: 0, left: 0, width: '50%', height: 'calc(100% - 48px)' }),
            ...(snapPreview === 'right' && { top: 0, left: '50%', width: '50%', height: 'calc(100% - 48px)' }),
            ...(snapPreview === 'top' && { top: 0, left: 0, width: '100%', height: 'calc(100% - 48px)' }),
          }}
        />
      )}
      <motion.div
        className={`window ${isActive ? 'active' : ''}`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: isMinimized ? 0 : 1, scale: isMinimized ? 0.96 : 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        style={{
          x, y, width, height,
          top: 0, left: 0,
          zIndex: isActive ? 50 : 10,
          pointerEvents: isMinimized ? 'none' : 'auto',
          boxShadow: isActive ? '0 10px 40px rgba(0,0,0,0.5)' : '0 5px 20px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: '#202020',
        }}
        onPointerDownCapture={onFocus}
      >
        {/* Title Bar */}
        <div
          className="window-header"
          onPointerDown={handleTitlePointerDown}
          onPointerMove={handleTitlePointerMove}
          onPointerUp={handleTitlePointerUp}
          onDoubleClick={toggleMaximize}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, opacity: 0.8, pointerEvents: 'none' }}>
            <div style={{ width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '25' }}>
              {app.icon}
            </div>
            {app.title}
          </div>

          <div className="window-controls" onPointerDown={e => e.stopPropagation()}>
            <button className="window-btn" onClick={onMinimize}>
              <Minus size={16} />
            </button>
            <button className="window-btn" onClick={toggleMaximize}>
              <Square size={14} />
            </button>
            <button className="window-btn close" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="window-content">
          {app.content}
        </div>

        {/* Resize handles */}
        {canResize && RESIZE_HANDLES.map(({ dir, style }) => (
          <div
            key={dir}
            onPointerDown={(e) => handleResizePointerDown(e, dir)}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
            style={{ position: 'absolute', ...style }}
          />
        ))}
      </motion.div>
    </>
  );
}
