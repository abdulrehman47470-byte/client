/**
 * INTEGRATION NOTES
 * -----------------
 * 1. Frames must be in:  app/public/frames/ezgif-frame-001.jpg … ezgif-frame-112.jpg
 *    (copy step already done — 112 files in app/public/frames/)
 * 2. This file fully replaces the old HeroSection.tsx — no other files change.
 * 3. One CSS addition required in index.css: the .scroll-cue-line class
 *    (see the comment at the bottom of this file for the snippet to paste).
 */

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Config ──────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 112;

function frameSrc(i: number) {
  return `/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HeroSection() {
  // The outer div is a tall scroll container; the inner div stays sticky.
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef    = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);

  // All animation state in refs — never trigger re-renders from the RAF loop.
  const imagesRef       = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef(0);  // lerp'd float
  const targetFrameRef  = useRef(0);  // set by scroll
  const rafIdRef        = useRef(0);
  const dprRef          = useRef(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady]           = useState(false);

  // ── 1. Preload all frames ─────────────────────────────────────────────────
  useEffect(() => {
    let done = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);

      const onDone = () => {
        done++;
        setLoadProgress(Math.round((done / TOTAL_FRAMES) * 100));
        if (done === TOTAL_FRAMES) setIsReady(true);
      };

      img.onload  = onDone;
      img.onerror = onDone;          // count failures too so we never hang
      imagesRef.current[i] = img;
    }
  }, []);

  // ── 2. Canvas — retina-quality render loop ────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const resize = () => {
      dprRef.current    = window.devicePixelRatio || 1;
      const dpr         = dprRef.current;
      const parent      = canvas.parentElement!;
      canvas.width      = Math.floor(parent.clientWidth  * dpr);
      canvas.height     = Math.floor(parent.clientHeight * dpr);
      canvas.style.width  = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      // Resize resets canvas state, so re-apply smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    };

    resize();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let lastIdx = -1;

    const tick = () => {
      // Smooth interpolation — feels cinematic even during fast scrolling
      currentFrameRef.current = lerp(currentFrameRef.current, targetFrameRef.current, 0.1);
      const idx = Math.round(currentFrameRef.current);

      if (idx !== lastIdx) {
        const img = imagesRef.current[Math.min(idx, TOTAL_FRAMES - 1)];
        const pw  = canvas.width;
        const ph  = canvas.height;

        if (img?.complete && img.naturalWidth > 0) {
          // Cover-scale: fill canvas while preserving aspect ratio, centred
          const scale = Math.max(pw / img.naturalWidth, ph / img.naturalHeight);
          const sw = img.naturalWidth  * scale;
          const sh = img.naturalHeight * scale;
          ctx.clearRect(0, 0, pw, ph);
          ctx.drawImage(img, (pw - sw) / 2, (ph - sh) / 2, sw, sh);
          lastIdx = idx;
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      ro.disconnect();
    };
  }, []);

  // ── 3. Scroll-driven frame sequencing via GSAP ScrollTrigger ─────────────
  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    // Dynamically calculate scroll height so the animation duration
    // scales proportionally with the viewport — adapts to every screen.
    const vh             = window.innerHeight;
    const scrollPerFrame = Math.max(18, vh * 0.038); // ~3.8% of vh per frame
    const totalHeight    = vh + TOTAL_FRAMES * scrollPerFrame;
    containerRef.current.style.height = `${totalHeight}px`;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start:   'top top',
      end:     'bottom bottom',
      onUpdate: (self) => {
        targetFrameRef.current = self.progress * (TOTAL_FRAMES - 1);
      },
    });

    return () => st.kill();
  }, [isReady]);

  // ── 4. Subtle 3-D tilt on mouse move (optional premium effect) ───────────
  useEffect(() => {
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    if (!sticky || !canvas) return;

    const onMove = (e: MouseEvent) => {
      const r  = sticky.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      const ny = ((e.clientY - r.top)  / r.height - 0.5) * 2;
      gsap.to(canvas, { rotateY: nx * 1.5, rotateX: -ny * 1.5, duration: 1.4, ease: 'power2.out' });
    };

    const onLeave = () => {
      gsap.to(canvas, { rotateY: 0, rotateX: 0, duration: 1.8, ease: 'power3.out' });
    };

    sticky.addEventListener('mousemove',  onMove,   { passive: true });
    sticky.addEventListener('mouseleave', onLeave);
    return () => {
      sticky.removeEventListener('mousemove',  onMove);
      sticky.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    // Outer container — tall div whose height creates the scroll space.
    // Everything below this div only appears after the animation completes.
    <div ref={containerRef} className="relative w-full" style={{ height: '100vh' }}>

      {/* Sticky visual frame — locks to viewport while outer div scrolls */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#060606]"
        style={{ perspective: '1400px' }}
      >

        {/* Canvas — full-bleed, physical-pixel precision */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ willChange: 'transform' }}
        />

        {/* Cinematic gradient overlays — darken edges so text reads cleanly */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: [
              'linear-gradient(to top,  #060606 0%, rgba(6,6,6,0.12) 38%, transparent 62%)',
              'linear-gradient(to right, #060606 0%, rgba(6,6,6,0.58) 30%, transparent 64%)',
            ].join(', '),
          }}
        />

        {/* ── Loading screen ── */}
        {!isReady && (
          <div className="absolute inset-0 z-50 bg-[#060606] flex flex-col items-center justify-center gap-5">
            <div
              className="text-[#d91d1d]/50 font-display font-bold uppercase tracking-[0.5em]"
              style={{ fontSize: '9px' }}
            >
              Preparing Experience
            </div>
            <div className="w-40 h-px bg-white/10 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-[#d91d1d] transition-all duration-200"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <div className="text-white/20 font-mono" style={{ fontSize: '9px' }}>
              {loadProgress} / 100
            </div>
          </div>
        )}

        {/* ── Hero content — left-aligned, compact, minimal ── */}
        <div className="relative z-20 h-full flex items-center px-8 sm:px-14 lg:px-20">
          <div style={{ maxWidth: 'min(500px, 44vw)' }}>

            {/* Eyebrow label */}
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-5 h-px bg-[#d91d1d] flex-shrink-0" />
              <span
                className="text-[#d91d1d] font-display font-bold uppercase tracking-[0.38em]"
                style={{ fontSize: 'clamp(8px, 0.6vw, 10px)' }}
              >
                Professional Roofing Since 2004
              </span>
            </div>

            {/* Headline — reduced from original 10rem for clean minimal look */}
            <h1
              className="font-display font-bold text-white tracking-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 3.8rem)', lineHeight: '0.92' }}
            >
              We Fix<br />
              <span className="text-[#d91d1d]">Your Roof.</span>
            </h1>

            {/* Body copy */}
            <p
              className="text-white/45 leading-relaxed mb-8"
              style={{ fontSize: 'clamp(0.68rem, 0.85vw, 0.82rem)', maxWidth: '28rem' }}
            >
              Industrial-grade roofing for residential and commercial properties.
              Premium materials, expert craftsmanship, guaranteed results.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 bg-[#d91d1d] hover:bg-[#b81818] text-white font-display font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
                style={{ padding: '10px 20px', fontSize: '10px' }}
              >
                GET FREE ESTIMATE <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/70 hover:text-white hover:bg-white/5 font-display font-bold uppercase tracking-widest transition-all duration-300"
                style={{ padding: '10px 20px', fontSize: '10px' }}
              >
                <Play className="w-3 h-3" /> OUR SERVICES
              </Link>
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="absolute bottom-0 left-0 w-full z-20 px-8 sm:px-14 lg:px-20 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <StatItem value="52+" label="Years Combined" />
              <div className="w-px h-7 bg-white/10" />
              <StatItem value="90+" label="Projects Done" />
              <div className="w-px h-7 bg-white/10 hidden md:block" />
              <div className="hidden md:block">
                <StatItem value="24/7" label="Emergency Service" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse block" />
              <span className="text-white/30 tracking-wide" style={{ fontSize: '10px' }}>
                Available Now
              </span>
            </div>
          </div>
        </div>

        {/* ── Scroll cue ── */}
        <div className="absolute bottom-8 right-8 lg:right-20 z-20 flex flex-col items-center gap-2">
          <span
            className="text-white/20 uppercase tracking-[0.35em]"
            style={{ fontSize: '8px', writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
          <div className="w-px h-9 bg-white/10 relative overflow-hidden">
            {/* Animated line — requires .scroll-cue-line in index.css */}
            <span
              className="scroll-cue-line absolute inset-x-0 top-0 bg-white/40"
              style={{ height: '35%' }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Stat item sub-component ──────────────────────────────────────────────────
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div
        className="font-display font-bold text-white"
        style={{ fontSize: 'clamp(1rem, 1.4vw, 1.3rem)' }}
      >
        {value}
      </div>
      <div className="text-white/30 tracking-wide" style={{ fontSize: '9px' }}>
        {label}
      </div>
    </div>
  );
}

/*
 * ─── CSS to add in app/src/index.css ────────────────────────────────────────
 *
 * @keyframes scrollCue {
 *   0%   { transform: translateY(-100%); opacity: 0; }
 *   20%  { opacity: 1; }
 *   80%  { opacity: 1; }
 *   100% { transform: translateY(310%); opacity: 0; }
 * }
 *
 * .scroll-cue-line {
 *   animation: scrollCue 2.4s ease-in-out infinite;
 * }
 */
