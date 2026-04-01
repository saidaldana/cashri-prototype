import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — Optimizado para mejor jerarquia visual
═══════════════════════════════════════════════════════════════ */
const T = {
  // Paleta azul principal
  blue:      "#0066E6",
  blueMid:   "#0052B8",
  blueDeep:  "#003D8A",
  blueInk:   "#021C4A",
  blueLight: "#E8F4FF",
  
  // Acento dorado
  yellow:    "#F5B800",
  yellowDim: "#D9A000",
  yellowLight: "#FFF8E6",

  // Superficies
  bg:        "#F0F4FA",
  surface:   "#FFFFFF",
  surfaceAlt:"#F7F9FC",
  surfaceHover: "#FAFBFD",
  overlay:   "rgba(2,28,74,0.55)",

  // Texto - mejor contraste
  ink:       "#0A1628",
  body:      "#3A4455",
  sub:       "#5C6B82",
  ghost:     "#8E9DB5",
  muted:     "#B8C4D6",

  // Estados semanticos
  accent:    "#7C3AED",
  accentBg:  "#F5F0FF",
  success:   "#059669",
  successBg: "#ECFDF5",
  warning:   "#D97706",
  warningBg: "#FFFBEB",
  error:     "#DC2626",
  errorBg:   "#FEF2F2",

  // Bordes
  line:      "#E2E8F0",
  lineLight: "#F1F5F9",
  lineDark:  "#CBD5E1",

  // Sombras refinadas
  shadowXs:  "0 1px 2px rgba(10,22,40,0.04)",
  shadowSm:  "0 2px 6px rgba(10,22,40,0.05), 0 1px 2px rgba(10,22,40,0.03)",
  shadowMd:  "0 4px 16px rgba(10,22,40,0.08), 0 2px 4px rgba(10,22,40,0.04)",
  shadowLg:  "0 12px 40px rgba(10,22,40,0.12), 0 4px 12px rgba(10,22,40,0.06)",
  shadowXl:  "0 20px 60px rgba(10,22,40,0.16), 0 8px 20px rgba(10,22,40,0.08)",
  ring:      "0 0 0 3px rgba(0,102,230,0.22)",
  ringAccent:"0 0 0 3px rgba(124,58,237,0.22)",
  
  // Elevaciones especificas
  cardShadow: "0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)",
  navShadow:  "0 -4px 20px rgba(10,22,40,0.08), 0 -1px 4px rgba(10,22,40,0.04)",
};

// Radios consistentes
const R = { 
  xs: "6px", 
  sm: "10px", 
  md: "14px", 
  lg: "18px", 
  xl: "22px", 
  xxl: "28px", 
  full: "9999px" 
};

// Espaciado base (multiplos de 4)
const S = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
};

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const PRODUCTS = [
  { id:1, name:'Smart TV 55"',       brand:"Samsung",     price:12499, orig:15999, emoji:"📺", cat:"Electrónica",  hot:true,  tag:"Más vendido", rating:4.5, rev:128 },
  { id:2, name:"iPhone 15 Pro",      brand:"Apple",       price:22999, orig:24999, emoji:"📱", cat:"Celulares",    hot:false, tag:"Nuevo",       rating:4.8, rev:64  },
  { id:3, name:"Laptop UltraSlim",   brand:"Dell",        price:18500, orig:21000, emoji:"💻", cat:"Cómputo",      hot:false, tag:null,          rating:4.3, rev:37  },
  { id:4, name:"Auriculares Pro",    brand:"Sony",        price:4299,  orig:5499,  emoji:"🎧", cat:"Audio",        hot:true,  tag:"Oferta",      rating:4.6, rev:210 },
  { id:5, name:"Refrigerador 500L",  brand:"LG",          price:15800, orig:18500, emoji:"🧊", cat:"Hogar",        hot:false, tag:null,          rating:4.4, rev:89  },
  { id:6, name:"Consola Next-Gen",   brand:"PlayStation", price:11999, orig:13499, emoji:"🎮", cat:"Gaming",       hot:true,  tag:"Top ventas",  rating:4.9, rev:305 },
];

const ADDRESSES = [
  { id:1, name:"Ma. Fernanda",        addr:"Nayarit 23, Col. Narvarte, CDMX 10700"        },
  { id:2, name:"Ma. Fernanda G.",     addr:"Francia 213, Col. San Pedro, CDMX 01030"      },
  { id:3, name:"Ma. Esperanza P.",    addr:"Periferico 3580, Col. Insurgentes, CDMX 01900" },
];

/* ═══════════════════════════════════════════════════════════════
   UTILS
═══════════════════════════════════════════════════════════════ */
const mxn = n => new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN",minimumFractionDigits:0}).format(n);
const pct = (a,b) => Math.round((1 - a/b)*100);

/* ═══════════════════════════════════════════════════════════════
   TINY COMPONENTS
═══════════════════════════════════════════════════════════════ */
function Spark({ size=16, color=T.yellow, style={} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{flexShrink:0,...style}}>
      <path d="M10 0L12.1 7.9L20 10L12.1 12.1L10 20L7.9 12.1L0 10L7.9 7.9Z" fill={color}/>
    </svg>
  );
}

function Stars({ n }) {
  const f = Math.floor(n);
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:"1px",fontSize:"11px",letterSpacing:"0"}} aria-label={`${n} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < f ? T.yellow : T.line, opacity: i < f ? 1 : 0.45 }}>★</span>
      ))}
    </span>
  );
}

function Badge({ children, bg="#E8F0FE", color="#1A56DB", size="sm" }) {
  const sizes = {
    xs: { fontSize: "9px", padding: "3px 8px" },
    sm: { fontSize: "10px", padding: "4px 10px" },
    md: { fontSize: "11px", padding: "5px 12px" },
  };
  const s = sizes[size] || sizes.sm;
  return (
    <span style={{
      display:"inline-flex",alignItems:"center",gap:"4px",
      background:bg, color, 
      fontSize: s.fontSize, 
      fontWeight:"600",
      padding: s.padding, 
      borderRadius:R.full,
      letterSpacing:"0.03em", 
      whiteSpace:"nowrap",
      border:`1px solid ${color}14`,
      boxShadow:T.shadowXs,
      transition:"all 0.15s ease",
    }}>{children}</span>
  );
}

function Pill({ children, color=T.blue }) {
  return (
    <span style={{
      display:"inline-flex",alignItems:"center",gap:"4px",
      background:`linear-gradient(135deg, ${color}12, ${color}08)`, color, fontSize:"11px",
      fontWeight:"600", padding:"5px 11px", borderRadius:R.full,
      border:`1px solid ${color}20`,
      boxShadow:T.shadowXs,
    }}>{children}</span>
  );
}

function Divider({ label, style={} }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:"10px",margin:"4px 0",...style}}>
      <div style={{flex:1,height:"1px",background:T.line}}/>
      {label && <span style={{fontSize:"11px",color:T.ghost,fontWeight:"600",letterSpacing:"0.3px"}}>{label}</span>}
      {label && <div style={{flex:1,height:"1px",background:T.line}}/>}
    </div>
  );
}

function Radio({ active, color=T.blue }) {
  return (
    <div style={{
      width:"22px",height:"22px",borderRadius:"50%",flexShrink:0,
      border: active ? `2px solid ${color}` : `2px solid ${T.line}`,
      background: active ? color : T.surface,
      boxShadow: active ? `inset 0 0 0 4px ${T.surface}` : "none",
      transition:"all 0.2s cubic-bezier(0.4,0,0.2,1)",
    }} aria-hidden/>
  );
}

function PrimaryButton({ children, onClick, color=T.blue, size="lg", disabled=false, style={} }) {
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  
  const sizes = {
    sm: { padding: "10px 18px", fontSize: "13px", borderRadius: R.lg },
    md: { padding: "12px 20px", fontSize: "14px", borderRadius: R.xl },
    lg: { padding: "14px 24px", fontSize: "15px", borderRadius: R.full },
  };
  const s = sizes[size] || sizes.lg;
  
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      onMouseEnter={()=>!disabled && setHover(true)}
      onMouseLeave={()=>{ setHover(false); setDown(false); }}
      onMouseDown={()=>!disabled && setDown(true)}
      onMouseUp={()=>setDown(false)}
      disabled={disabled}
      style={{
        width:"100%", 
        border:"none", 
        borderRadius: s.borderRadius,
        padding: s.padding, 
        fontSize: s.fontSize, 
        fontWeight:"700",
        letterSpacing:"0.01em", 
        cursor: disabled ? "not-allowed" : "pointer", 
        fontFamily:"inherit",
        background: disabled 
          ? T.lineDark
          : `linear-gradient(145deg, ${color} 0%, ${color}E8 100%)`,
        color: disabled ? T.ghost : "#fff",
        boxShadow: disabled ? "none" : hover
          ? `0 6px 20px ${color}35, 0 0 0 1px rgba(255,255,255,0.15) inset`
          : `0 3px 12px ${color}28, 0 0 0 1px rgba(255,255,255,0.1) inset`,
        transform: down ? "scale(0.98)" : hover ? "translateY(-2px)" : "none",
        transition:"all 0.18s cubic-bezier(0.4,0,0.2,1)",
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}
    >{children}</button>
  );
}

function GhostButton({ children, onClick, color=T.blue, size="lg" }) {
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  
  const sizes = {
    sm: { padding: "10px 18px", fontSize: "13px", borderRadius: R.lg },
    md: { padding: "12px 20px", fontSize: "14px", borderRadius: R.xl },
    lg: { padding: "14px 24px", fontSize: "15px", borderRadius: R.full },
  };
  const s = sizes[size] || sizes.lg;
  
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>{ setHover(false); setDown(false); }}
      onMouseDown={()=>setDown(true)}
      onMouseUp={()=>setDown(false)}
      style={{
        width:"100%", 
        border:`1.5px solid ${hover ? color + "50" : T.line}`,
        borderRadius: s.borderRadius, 
        padding: s.padding,
        fontSize: s.fontSize, 
        fontWeight:"700", 
        letterSpacing:"0.01em",
        cursor:"pointer", 
        fontFamily:"inherit",
        background: hover ? `${color}06` : T.surface,
        color: hover ? color : T.ink,
        boxShadow: hover ? `0 2px 8px ${color}12` : T.shadowXs,
        transform: down ? "scale(0.98)" : "none",
        transition:"all 0.18s cubic-bezier(0.4,0,0.2,1)",
      }}>{children}</button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LAYOUT SHELL — Contenedor principal optimizado
═══════════════════════════════════════════════════════════════ */
function Shell({ children, noPad=false }) {
  return (
    <div style={{
      maxWidth:"390px", 
      margin:"0 auto",
      width:"100%",
      height:"100dvh", 
      maxHeight:"100dvh",
      background:`linear-gradient(172deg, #E6ECF6 0%, ${T.bg} 20%, ${T.bg} 100%)`,
      position:"relative", 
      overflowX:"hidden",
      overflowY:"hidden",
      display:"flex", 
      flexDirection:"column",
      minHeight:0,
      fontFamily:"'Outfit', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      WebkitFontSmoothing:"antialiased",
      MozOsxFontSmoothing:"grayscale",
      textRendering:"optimizeLegibility",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500;1,9..144,600&family=Outfit:wght@400;500;600;700;800&display=swap');
        
        *, *::before, *::after { 
          box-sizing:border-box; 
          margin:0; 
          padding:0; 
        }
        
        ::-webkit-scrollbar { width:0; height:0; }
        
        html { 
          -webkit-tap-highlight-color: transparent;
          scroll-behavior: smooth;
        }
        
        input, button, textarea, select { 
          font-family: inherit; 
          -webkit-appearance: none;
        }
        
        button { touch-action: manipulation; }
        
        button:focus-visible { 
          outline: none; 
          box-shadow: ${T.ring}; 
        }
        
        input:focus-visible { 
          outline: 2px solid ${T.blue}; 
          outline-offset: 2px; 
        }
        
        ::selection { 
          background: ${T.blue}28; 
          color: ${T.ink}; 
        }
        
        .hnp-search::placeholder { 
          color: rgba(255,255,255,0.5); 
          opacity: 1; 
        }

        /* Animaciones optimizadas */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; } to { opacity:1; }
        }
        @keyframes slideUp {
          from { transform:translateY(100%); opacity:0; }
          to   { transform:translateY(0); opacity:1; }
        }
        @keyframes cartRoll {
          from { opacity:0; transform:translateX(-36px) rotate(-6deg); }
          to   { opacity:1; transform:translateX(0) rotate(0deg); }
        }
        @keyframes bounce {
          0%,100% { transform:translateY(0); }
          40%     { transform:translateY(-12px); }
          70%     { transform:translateY(-5px); }
        }
        @keyframes sparkPop {
          0%   { opacity:0; transform:scale(0) rotate(-15deg); }
          70%  { opacity:1; transform:scale(1.12) rotate(8deg); }
          100% { opacity:1; transform:scale(1) rotate(0deg); }
        }
        @keyframes roadMove {
          from { background-position:0 0; }
          to   { background-position:-60px 0; }
        }
        @keyframes pulse {
          0%,100% { opacity:1; } 50% { opacity:0.55; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes kycScan {
          0%   { top: 12%; opacity:0; }
          10%  { opacity:1; }
          90%  { opacity:1; }
          100% { top: 88%; opacity:0; }
        }
        @keyframes popIn {
          0%   { transform:scale(0.88); opacity:0; }
          60%  { transform:scale(1.04); }
          100% { transform:scale(1); opacity:1; }
        }
        @keyframes slideDown {
          from { opacity:0; transform:translateY(-10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes navPop {
          0%   { transform: scale(0.92); }
          50%  { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        
        .anim-pop      { animation: popIn 0.24s cubic-bezier(0.34,1.56,0.64,1) both; }
        .anim-slide-dn { animation: slideDown 0.22s ease both; }
        .anim-fade-up  { animation: fadeUp 0.38s ease both; }
        .anim-fade-in  { animation: fadeIn 0.28s ease both; }
        .anim-cart     { animation: cartRoll 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
        .anim-bounce   { animation: bounce 1.8s ease-in-out infinite; }
        .anim-spark    { animation: sparkPop 0.45s ease both; }
        .anim-road     { animation: roadMove 0.5s linear infinite; }
        .anim-shimmer  { 
          background: linear-gradient(90deg, ${T.line} 25%, ${T.lineLight} 50%, ${T.line} 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite; 
        }
        
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.16s; }
        .delay-3 { animation-delay: 0.28s; }
        .delay-4 { animation-delay: 0.42s; }
        .delay-5 { animation-delay: 0.56s; }
      `}</style>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BOTTOM NAV — Navegacion inferior optimizada
═══════════════════════════════════════════════════════════════ */
function BottomNav({ active="home", onNavTap }) {
  const items = [
    { id:"home",  label:"Inicio",     icon:<HomeIcon/> },
    { id:"favs",  label:"Productos",  icon:<HeartIcon/> },
    { id:"search",label:"Explorar",   icon:<SearchIcon/> },
    { id:"perks", label:"Beneficios", icon:<GridIcon/> },
    { id:"acct",  label:"Cuenta",     icon:<PersonIcon/> },
  ];
  
  return (
    <nav
      role="navigation"
      aria-label="Navegacion principal"
      style={{
        position:"sticky", 
        bottom:0, 
        zIndex:50,
        flexShrink:0,
        padding:`0 ${S[3]} calc(8px + env(safe-area-inset-bottom, 0px)) ${S[3]}`,
        background: `linear-gradient(180deg, transparent 0%, ${T.bg}40 30%, ${T.bg} 100%)`,
        paddingTop: S[2],
      }}
    >
      <div style={{
        display:"flex",
        alignItems:"stretch",
        justifyContent:"space-around",
        minHeight:"60px",
        padding:"8px 6px",
        background:"rgba(255,255,255,0.88)",
        WebkitBackdropFilter:"blur(24px) saturate(180%)",
        backdropFilter:"blur(24px) saturate(180%)",
        border:`1px solid rgba(255,255,255,0.92)`,
        borderRadius:R.xl,
        boxShadow:`${T.navShadow}, 0 1px 0 rgba(255,255,255,0.95) inset`,
      }}>
        {items.map(it => {
          const on = active === it.id;
          return (
            <button
              key={it.id}
              type="button"
              onClick={()=>onNavTap?.(it.id)}
              aria-current={on ? "page" : undefined}
              style={{
                display:"flex", 
                flexDirection:"column",
                alignItems:"center", 
                justifyContent:"center",
                gap:"3px",
                padding:"6px 10px",
                margin:0,
                border:"none",
                borderRadius:R.md,
                cursor:"pointer",
                fontFamily:"inherit",
                background: on 
                  ? `linear-gradient(180deg, ${T.blue}14, ${T.blue}08)` 
                  : "transparent",
                color: on ? T.blue : T.ghost,
                boxShadow: on 
                  ? `inset 0 0 0 1px ${T.blue}18, 0 1px 3px ${T.blue}08` 
                  : "none",
                transform: on ? "scale(1)" : "scale(1)",
                transition:"all 0.2s cubic-bezier(0.4,0,0.2,1)",
                minWidth:"56px",
                flex:"0 0 auto",
              }}
            >
              <span style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                color:"inherit",
                transform: on ? "scale(1.08)" : "scale(1)",
                transition:"transform 0.2s ease",
              }}>
                {it.icon}
              </span>
              <span style={{
                fontSize:"10px", 
                fontWeight: on ? "700" : "500", 
                letterSpacing:"0.01em", 
                lineHeight:1.2, 
                textAlign:"center",
                whiteSpace:"nowrap",
              }}>
                {it.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// Icon SVGs
const HomeIcon  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>;
const HeartIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>;
const SearchIcon= () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>;
const GridIcon  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
const PersonIcon= () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const ChevLeft  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>;
const ChevDown  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>;

/* ═══════════════════════════════════════════════════════════════
   SCREEN: HOME
═══════════════════════════════════════════════════════════════ */
function HomeScreen({ onProduct, onCreditLanding, totalCredit, cartCount }) {
  const [q, setQ] = useState("");
  const items = PRODUCTS.filter(p =>
    [p.name, p.brand, p.cat].some(s => s.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div style={{minHeight:"100%"}}>

      {/* ── Top bar — Header principal optimizado ── */}
      <div style={{
        background:`linear-gradient(158deg, ${T.blueInk} 0%, ${T.blueDeep} 55%, ${T.blueMid} 100%)`,
        padding:"0 18px 0",
        borderRadius:`0 0 ${R.xxl} ${R.xxl}`,
        boxShadow:`${T.shadowLg}, 0 4px 20px ${T.blueInk}35`,
      }}>
        {/* Greeting row */}
        <div style={{
          display:"flex", 
          justifyContent:"space-between",
          alignItems:"center", 
          paddingTop:"18px", 
          paddingBottom:"14px",
        }}>
          <div>
            <p style={{
              fontSize:"11px", 
              color:"rgba(255,255,255,0.5)", 
              marginBottom:"4px", 
              letterSpacing:"0.4px",
              fontWeight:"500",
            }}>
              Hola, Ma. Fernanda
            </p>
            <div style={{display:"flex", alignItems:"center", gap:"7px"}}>
              <span style={{
                fontFamily:"'Fraunces',serif", 
                fontSize:"24px", 
                color:"#fff", 
                fontStyle:"italic", 
                lineHeight:1,
                fontWeight:"600",
              }}>NP</span>
              <Spark size={16} color={T.yellow}/>
            </div>
          </div>
          <button 
            type="button"
            style={{
              position:"relative", 
              cursor:"pointer",
              background:"none",
              border:"none",
              padding:0,
            }}
            aria-label={`Carrito${cartCount > 0 ? `, ${cartCount} productos` : ''}`}
          >
            <div style={{
              width:"42px", 
              height:"42px", 
              borderRadius:"50%",
              background:"rgba(255,255,255,0.1)",
              border:"1.5px solid rgba(255,255,255,0.18)",
              display:"flex", 
              alignItems:"center", 
              justifyContent:"center",
              transition:"all 0.2s ease",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.88)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            </div>
            {cartCount > 0 && (
              <div style={{
                position:"absolute", 
                top:"-2px", 
                right:"-2px",
                background:`linear-gradient(135deg, ${T.yellow} 0%, #FFB800 100%)`,
                borderRadius:"50%",
                minWidth:"20px", 
                height:"20px",
                padding:"0 4px",
                display:"flex", 
                alignItems:"center", 
                justifyContent:"center",
                fontSize:"11px", 
                fontWeight:"800", 
                color:T.blueInk,
                boxShadow:`0 2px 6px ${T.yellow}50`,
              }}>{cartCount}</div>
            )}
          </button>
        </div>

        {/* Search */}
        <div style={{
          display:"flex", 
          alignItems:"center", 
          gap:"12px",
          background:"rgba(255,255,255,0.1)",
          backdropFilter:"blur(16px)",
          WebkitBackdropFilter:"blur(16px)",
          border:"1.5px solid rgba(255,255,255,0.15)",
          borderRadius:R.lg, 
          padding:"12px 16px",
          marginBottom:"14px",
          transition:"all 0.2s ease",
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            className="hnp-search"
            value={q} 
            onChange={e=>setQ(e.target.value)}
            placeholder="Buscar productos, marcas..."
            style={{
              flex:1, 
              background:"transparent", 
              border:"none",
              outline:"none", 
              fontSize:"14px", 
              color:"#fff",
              fontWeight:"400",
            }}
          />
        </div>

        {/* Delivery bar */}
        <div style={{
          display:"flex", 
          alignItems:"center", 
          justifyContent:"space-between",
          background:"rgba(16,185,129,0.14)",
          border:"1px solid rgba(52,211,153,0.3)",
          borderRadius:R.md, 
          padding:"11px 14px",
          marginBottom:"14px",
          cursor:"pointer",
        }}>
          <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
            <span style={{fontSize:"16px", lineHeight:1}}>📦</span>
            <span style={{
              fontSize:"12px", 
              color:"rgba(255,255,255,0.9)", 
              fontWeight:"500",
              letterSpacing:"0.01em",
            }}>Elige como recibir tu pedido</span>
          </div>
          <span style={{color:"rgba(255,255,255,0.7)", display:"flex"}}><ChevDown/></span>
        </div>

        {/* Tab strip */}
        <div style={{
          display:"flex", 
          gap:"8px",
          overflowX:"auto",
          paddingBottom:"16px",
          scrollbarWidth:"none",
          msOverflowStyle:"none",
        }}>
          {["Ahorros","Super","Flash Deals","Sin TDC"].map((tab,i) => (
            <div key={tab} style={{
              padding:"9px 16px",
              borderRadius:R.full,
              background: i===3 ? "rgba(245,184,0,0.18)" : "rgba(255,255,255,0.08)",
              border: i===3 ? `1px solid ${T.yellow}55` : "1px solid rgba(255,255,255,0.12)",
              color: i===3 ? T.yellow : "rgba(255,255,255,0.7)",
              fontSize:"12px", 
              fontWeight: i===3 ? "700" : "500",
              whiteSpace:"nowrap", 
              cursor:"pointer",
              letterSpacing:"0.02em",
              backdropFilter:"blur(8px)",
              transition:"all 0.2s ease",
            }}>{tab}</div>
          ))}
        </div>
      </div>

      {/* ── Credit hero banner — Optimizado ── */}
      <div style={{padding:"18px 16px 0"}}>
        <div
          onClick={onCreditLanding}
          role="button"
          tabIndex={0}
          onKeyDown={e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); onCreditLanding(); } }}
          style={{
            background:`linear-gradient(140deg, ${T.blueInk} 0%, ${T.blueDeep} 65%, ${T.blueMid} 100%)`,
            borderRadius:R.xl, 
            padding:"22px 20px",
            position:"relative", 
            overflow:"hidden",
            boxShadow:`${T.shadowLg}, 0 8px 32px ${T.blueInk}40`,
            cursor:"pointer",
            transition:"transform 0.2s ease, box-shadow 0.2s ease",
          }}>
          {/* Decorative elements */}
          <div style={{position:"absolute",top:"-35px",right:"-25px",width:"130px",height:"130px",borderRadius:"50%",background:`radial-gradient(circle, ${T.yellow}22 0%, transparent 65%)`}}/>
          <div style={{position:"absolute",bottom:"-25px",right:"55px",width:"90px",height:"90px",borderRadius:"50%",background:"rgba(255,255,255,0.03)"}}/>
          <div style={{position:"absolute",top:"50%",left:"-20px",width:"60px",height:"60px",borderRadius:"50%",background:"rgba(255,255,255,0.02)"}}/>

          <div style={{position:"relative",zIndex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"10px"}}>
              <Spark size={11} color={T.yellow}/>
              <span style={{
                fontSize:"9px",
                color:T.yellow,
                letterSpacing:"1.8px",
                fontWeight:"700",
                textTransform:"uppercase",
              }}>Cashri · Sin tarjeta de credito</span>
            </div>
            <p style={{
              fontFamily:"'Fraunces',serif",
              fontSize:"24px",
              color:"#fff",
              lineHeight:1.2,
              fontStyle:"italic",
              marginBottom:"6px",
              fontWeight:"500",
            }}>
              Llevalo hoy,<br/>pagalo despues
            </p>
            <p style={{
              fontSize:"13px",
              color:"rgba(255,255,255,0.55)",
              marginBottom:"16px",
              lineHeight:1.4,
            }}>
              Hasta {mxn(totalCredit)} disponibles · sin banco ni papeleos
            </p>
            <div style={{
              display:"inline-flex", 
              alignItems:"center", 
              gap:"7px",
              background:`linear-gradient(135deg, ${T.yellow} 0%, #FFBE00 100%)`,
              color:T.blueInk,
              borderRadius:R.full, 
              padding:"9px 18px",
              fontSize:"12px", 
              fontWeight:"800",
              boxShadow:`0 4px 14px ${T.yellow}40`,
              letterSpacing:"0.02em",
            }}>
              <Spark size={10} color={T.blueInk}/>
              Usalo ahora
            </div>
          </div>
        </div>
      </div>

      {/* ── Coupon strip — Optimizado ── */}
      <div style={{padding:"14px 16px 0"}}>
        <div style={{
          display:"grid", 
          gridTemplateColumns:"1fr 1fr", 
          gap:"10px",
        }}>
          {[
            ["$225","WS225SPRING","Compra min. $1,500","amber"],
            ["$360","WS360SPRING","Compra min. $1,800","blue"]
          ].map(([amt,code,cond,variant])=>(
            <div key={code} style={{
              background: variant==="amber"
                ? `linear-gradient(140deg, ${T.yellow} 0%, #FFBE00 100%)`
                : `linear-gradient(140deg, ${T.blue} 0%, ${T.blueDeep} 100%)`,
              borderRadius:R.lg, 
              padding:"16px 14px",
              color: variant==="amber" ? T.blueInk : "#fff",
              boxShadow: variant==="amber" 
                ? `0 4px 16px ${T.yellow}30`
                : `0 4px 16px ${T.blue}25`,
              cursor:"pointer",
              transition:"transform 0.2s ease",
            }}>
              <p style={{
                fontSize:"10px",
                opacity:0.6,
                marginBottom:"4px",
                letterSpacing:"0.4px",
                fontWeight:"500",
              }}>Ahorro Inmediato</p>
              <p style={{
                fontFamily:"'Fraunces',serif",
                fontSize:"28px",
                fontStyle:"italic",
                lineHeight:1,
                marginBottom:"8px",
                fontWeight:"600",
              }}>{amt}</p>
              <div style={{
                display:"inline-block",
                background: variant==="amber" ? T.blue : T.yellow,
                color: variant==="amber" ? "#fff" : T.blueInk,
                fontSize:"9px", 
                fontWeight:"800",
                padding:"3px 8px", 
                borderRadius:R.full,
                marginBottom:"6px", 
                letterSpacing:"0.6px",
              }}>{code}</div>
              <p style={{
                fontSize:"10px",
                opacity:0.55,
                lineHeight:1.3,
              }}>{cond}</p>
            </div>
          ))}
        </div>

        {/* Express delivery banner */}
        <div style={{
          background:T.surface, 
          borderRadius:R.md,
          padding:"13px 16px", 
          marginTop:"12px",
          display:"flex", 
          alignItems:"center", 
          justifyContent:"center", 
          gap:"12px",
          border:`1px solid ${T.line}`,
          boxShadow:T.cardShadow,
        }}>
          <span style={{fontSize:"16px", lineHeight:1}}>⚡</span>
          <span style={{fontSize:"13px",color:T.ink,fontWeight:"700"}}>Envio Express</span>
          <span style={{
            width:"4px",
            height:"4px",
            borderRadius:"50%",
            background:T.ghost,
          }}/>
          <span style={{fontSize:"12px",color:T.sub,fontWeight:"500"}}>Hasta en 60 min</span>
        </div>
      </div>

      {/* ── Section header — Optimizado ── */}
      <div style={{
        display:"flex", 
        justifyContent:"space-between",
        alignItems:"center", 
        padding:"22px 18px 14px",
      }}>
        <h2 style={{
          fontSize:"18px",
          fontWeight:"800",
          color:T.ink,
          letterSpacing:"-0.3px",
        }}>Tus productos</h2>
        <button 
          type="button"
          style={{
            fontSize:"13px",
            color:T.blue,
            fontWeight:"600",
            cursor:"pointer",
            background:"none",
            border:"none",
            padding:"4px 8px",
            margin:"-4px -8px",
            borderRadius:R.sm,
            transition:"background 0.15s ease",
          }}
        >Ver mas</button>
      </div>

      {/* ── Product grid ── */}
      <div style={{
        display:"grid", gridTemplateColumns:"1fr 1fr",
        gap:"12px", padding:"8px 16px 28px",
      }}>
        {items.map(p => <ProductTile key={p.id} p={p} onTap={()=>onProduct(p)}/>)}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRODUCT TILE
═══════════════════════════════════════════════════════════════ */
function ProductTile({ p, onTap }) {
  const saved = p.orig - p.price;
  const [hover, setHover] = useState(false);
  const discountPct = saved > 0 ? pct(p.price, p.orig) : 0;
  
  return (
    <div
      onClick={onTap}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      role="button"
      tabIndex={0}
      onKeyDown={e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); onTap(); } }}
      style={{
        background:T.surface,
        padding:"14px",
        cursor:"pointer",
        borderRadius:R.lg,
        border:`1.5px solid ${hover ? T.blue + "30" : T.line}`,
        boxShadow: hover ? T.shadowMd : T.cardShadow,
        transform: hover ? "translateY(-4px) scale(1.01)" : "none",
        transition:"all 0.22s cubic-bezier(0.4,0,0.2,1)",
        outline:"none",
        display:"flex",
        flexDirection:"column",
        position:"relative",
      }}
    >
      {/* Tag badge - positioned absolute */}
      {p.tag && (
        <div style={{
          position:"absolute",
          top:"10px",
          left:"10px",
          zIndex:2,
          display:"flex",
          alignItems:"center",
          gap:"4px",
          background: p.hot ? `linear-gradient(135deg, #FF6B35, #F7931E)` : T.blueLight,
          color: p.hot ? "#fff" : T.blue,
          fontSize:"9px",
          fontWeight:"700",
          padding:"4px 8px",
          borderRadius:R.full,
          letterSpacing:"0.03em",
          boxShadow: p.hot ? `0 2px 8px rgba(255,107,53,0.35)` : T.shadowXs,
        }}>
          {p.tag}
        </div>
      )}

      {/* Product image area */}
      <div style={{
        background:`linear-gradient(168deg, ${T.surfaceAlt} 0%, #F9FAFC 100%)`,
        borderRadius:R.md,
        height:"100px", 
        display:"flex",
        alignItems:"center", 
        justifyContent:"center",
        fontSize:"52px", 
        marginBottom:"14px",
        border:`1px solid ${T.lineLight}`,
        position:"relative",
      }}>
        <span style={{
          transform: hover ? "scale(1.08)" : "scale(1)",
          transition:"transform 0.25s ease",
        }}>{p.emoji}</span>
        
        {/* Discount badge */}
        {discountPct > 0 && (
          <div style={{
            position:"absolute",
            top:"8px",
            right:"8px",
            background:`linear-gradient(135deg, ${T.accent}, #6D28D9)`,
            color:"#fff",
            fontSize:"10px",
            fontWeight:"800",
            padding:"3px 7px",
            borderRadius:R.sm,
            boxShadow:`0 2px 6px ${T.accent}40`,
          }}>-{discountPct}%</div>
        )}
      </div>

      {/* Add button */}
      <div style={{
        width:"100%", 
        background:`linear-gradient(145deg, ${T.blue} 0%, ${T.blueDeep} 100%)`,
        color:"#fff",
        borderRadius:R.full,
        padding:"11px", 
        fontSize:"13px", 
        fontWeight:"700",
        display:"flex", 
        alignItems:"center",
        justifyContent:"center", 
        gap:"6px", 
        marginBottom:"14px",
        boxShadow:`0 4px 16px ${T.blue}35`,
        pointerEvents:"none",
        letterSpacing:"0.02em",
      }}>
        <span style={{fontSize:"15px",lineHeight:1,fontWeight:"400"}}>+</span> 
        Agregar
      </div>

      {/* Price section */}
      <div style={{
        display:"flex",
        alignItems:"baseline",
        gap:"8px",
        flexWrap:"wrap",
        marginBottom:"6px",
      }}>
        <span style={{
          fontFamily:"'Fraunces',serif",
          fontSize:"20px",
          fontWeight:"600",
          color:T.ink,
          lineHeight:1,
          fontStyle:"italic",
        }}>
          {mxn(p.price)}
        </span>
        {saved > 0 && (
          <span style={{
            fontSize:"11px",
            color:T.ghost,
            textDecoration:"line-through",
            fontWeight:"400",
          }}>{mxn(p.orig)}</span>
        )}
      </div>

      {/* Savings badge */}
      {saved > 0 && (
        <div style={{
          display:"inline-flex",
          alignItems:"center",
          background:T.accentBg, 
          color:T.accent,
          fontSize:"10px",
          fontWeight:"700",
          padding:"4px 10px",
          borderRadius:R.full,
          marginBottom:"8px",
          width:"fit-content",
          border:`1px solid ${T.accent}18`,
        }}>
          Ahorras {mxn(saved)}
        </div>
      )}

      {/* Brand */}
      <p style={{
        fontSize:"11px",
        color:T.sub,
        marginBottom:"6px",
        fontWeight:"500",
      }}>{p.brand}</p>
      
      {/* Payment options */}
      <div style={{
        display:"flex",
        flexDirection:"column",
        gap:"3px",
      }}>
        <p style={{
          fontSize:"10px",
          color:T.blue,
          fontWeight:"600",
          lineHeight:1.35,
        }}>
          {mxn(Math.round(p.price/12))}/mes hasta 12 MSI
        </p>
        <p style={{
          fontSize:"10px",
          color:T.accent,
          fontWeight:"600",
          lineHeight:1.35,
          display:"flex",
          alignItems:"center",
          gap:"3px",
        }}>
          <Spark size={8} color={T.accent}/>
          Llevalo hoy, paga despues
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCREEN: DEPARTAMENTOS
══════════════════════════��════════════════════════════════════ */
const DEPTOS = [
  { name:"Abarrotes",               emoji:"🧺" },
  { name:"Lácteos",                 emoji:"🥛" },
  { name:"Frutas y Verduras",       emoji:"🍌" },
  { name:"Cuidado Personal",        emoji:"🧴" },
  { name:"Bebés",                   emoji:"🍼" },
  { name:"Belleza",                 emoji:"💄" },
  { name:"Cervezas, Vinos y Licores", emoji:"🍷" },
  { name:"Carnes, Pescados y Mariscos", emoji:"🥩" },
  { name:"Jugos y Bebidas",         emoji:"🧃" },
  { name:"Celulares",               emoji:"📱" },
  { name:"Línea Blanca",            emoji:"🧊" },
  { name:"TV y Video",              emoji:"📺" },
  { name:"Electrónica",             emoji:"💻" },
  { name:"Juguetes",                emoji:"🧸" },
  { name:"Ropa y Calzado",          emoji:"👕" },
  { name:"Hogar y Muebles",         emoji:"🛋️" },
  { name:"Deportes",                emoji:"⚽" },
  { name:"Mascotas",                emoji:"🐾" },
];

function DepartamentosScreen({ onProduct }) {
  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:T.bg}}>

      {/* Header — same blue gradient as the rest */}
      <div style={{
        background:`linear-gradient(135deg,${T.blueInk},${T.blueMid})`,
        padding:"14px 20px 16px", flexShrink:0,
        display:"flex", alignItems:"center", gap:12,
      }}>
        <div style={{
          flex:1, background:"rgba(255,255,255,0.12)",
          borderRadius:R.full, padding:"8px 14px",
          fontSize:13, color:"rgba(255,255,255,0.6)",
          display:"flex", alignItems:"center", gap:8,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          Buscar en NovaMart
        </div>
      </div>

      {/* Grid */}
      <div style={{flex:1,overflowY:"auto",minHeight:0,padding:"16px 14px 24px"}}>
        <p style={{
          fontFamily:"'Fraunces',serif",
          fontSize:20, fontStyle:"italic",
          color:T.ink, marginBottom:14,
        }}>Explorar departamentos</p>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          {DEPTOS.map((d,i)=>(
            <div
              key={i}
              onClick={()=>onProduct(PRODUCTS[i % PRODUCTS.length])}
              style={{
                background:`linear-gradient(140deg,${T.blue} 0%,${T.blueDeep} 100%)`,
                borderRadius:14,
                padding:"14px 10px 10px",
                cursor:"pointer",
                minHeight:110,
                display:"flex",
                flexDirection:"column",
                justifyContent:"space-between",
                position:"relative",
                overflow:"hidden",
                boxShadow:`0 2px 8px ${T.blueDeep}33`,
              }}
            >
              {/* Subtle shine */}
              <div style={{position:"absolute",top:-20,right:-20,width:60,height:60,borderRadius:"50%",background:"rgba(255,255,255,0.06)"}}/>
              <p style={{
                fontSize:12, fontWeight:700,
                color:"#fff", lineHeight:1.3,
                zIndex:1, position:"relative",
              }}>{d.name}</p>
              <p style={{
                fontSize:26, lineHeight:1,
                textAlign:"right",
                zIndex:1, position:"relative",
              }}>{d.emoji}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCREEN: CREDIT HUB
═══════════════════════════════════════════════════════════════ */
// Simulated active debt per lender
const MOCK_DEBT = {
  aplazo:   { balance:4200, nextPayment:950,  nextDate:"15 abr", dueIn:8  },
  creditea: { balance:2800, nextPayment:700,  nextDate:"30 abr", dueIn:23 },
  payjoy:   { balance:1600, nextPayment:400,  nextDate:"22 abr", dueIn:15 },
};

const HOW_STEPS = [
  { icon:"📲", title:"Solicita en minutos",  body:"Llena un formulario rápido. Sin papeleos ni banco." },
  { icon:"✅", title:"Recibe tu línea",       body:"Validamos con lenders y te mostramos tu oferta." },
  { icon:"��", title:"Compra cualquier cosa", body:"Úsalo en NovaSuper, DepóMax, ClubPlus y online." },
  { icon:"📅", title:"Paga a tu ritmo",       body:"Elige catorcenas, quincenas o semanas. Tú decides." },
];

const FAQS = [
  { q:"¿Necesito tarjeta de crédito?",         a:"No. El crédito Cashri no requiere tarjeta ni cuenta bancaria." },
  { q:"¿Cuánto puedo pedir prestado?",          a:"Las líneas van de $0 a $30,000 y crecen con cada pago puntual." },
  { q:"¿En qué puedo usarlo?",                  a:"En cualquier artículo de NovaSuper, DepóMax, ClubPlus y en novasuper.mx." },
  { q:"¿Qué pasa si no pago a tiempo?",         a:"Se generan cargos por mora. Te enviamos recordatorios antes de cada fecha." },
  { q:"¿Cuántos plazos puedo elegir?",          a:"Hasta 24 plazos según el lender. Eliges al momento de cada compra." },
];

function DebtCard({ lender, debt, onPay }) {
  const pct = Math.round((debt.balance / (lender.line - lender.used + debt.balance)) * 100);
  const urgency = debt.dueIn <= 7;
  return (
    <div style={{background:T.surface,borderRadius:16,overflow:"hidden",border:`1.5px solid ${lender.color}22`,boxShadow:`0 2px 12px ${lender.color}0C`}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${lender.gfrom},${lender.gto})`,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <LenderIcon lender={lender} size={36}/>
        <div style={{flex:1}}>
          <p style={{fontSize:14,fontWeight:700,color:"#fff"}}>{lender.name}</p>
          <p style={{fontSize:11,color:"rgba(255,255,255,0.65)"}}>Línea activa · {mxn(lender.line - lender.used)} disponible</p>
        </div>
        <div style={{textAlign:"right"}}>
          <p style={{fontSize:10,color:"rgba(255,255,255,0.6)"}}>Saldo deudor</p>
          <p style={{fontFamily:"'Fraunces',serif",fontSize:22,fontStyle:"italic",color:"#fff",lineHeight:1}}>{mxn(debt.balance)}</p>
        </div>
      </div>
      {/* Progress */}
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${T.lineLight}`}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:11,color:T.sub}}>Deuda actual</span>
          <span style={{fontSize:11,color:T.sub}}>Línea total {mxn(lender.line)}</span>
        </div>
        <div style={{height:5,background:T.line,borderRadius:999,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${lender.gfrom},${lender.gto})`,borderRadius:999,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      {/* Next payment */}
      <div style={{padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
        <div style={{flex:1}}>
          <p style={{fontSize:11,color:T.sub,marginBottom:3}}>Próximo pago</p>
          <p style={{fontFamily:"'Fraunces',serif",fontSize:20,fontStyle:"italic",color:lender.color,lineHeight:1}}>{mxn(debt.nextPayment)}</p>
          <p style={{fontSize:11,color:urgency?"#7C3AED":T.sub,fontWeight:urgency?700:400,marginTop:2}}>
            {urgency?"⚠ ":"📅 "}Vence {debt.nextDate} · en {debt.dueIn} días
          </p>
        </div>
        <button
          onClick={onPay}
          style={{
            padding:"9px 18px",borderRadius:R.full,
            background:`linear-gradient(135deg,${lender.gfrom},${lender.gto})`,
            border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",
            boxShadow:`0 2px 8px ${lender.color}44`,flexShrink:0,
          }}
        >Pagar ahora</button>
      </div>
    </div>
  );
}

function CreditHubScreen({ onBack, onSolicitar, linkedLenders=[] }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [openHistory, setOpenHistory] = useState(null); // lender id
  const hasLinked = linkedLenders.length > 0;
  const activeLenders = BNPL_LENDERS.filter(l => linkedLenders.includes(l.id));

  // Simulated health score based on payment history
  const healthScore = linkedLenders.length === 0 ? null
    : linkedLenders.length === 1 ? {label:"Excelente", icon:"🟢", sub:"Todos tus pagos al dia", color:T.accent}
    : {label:"Muy bueno",  icon:"🟡", sub:"Sigue asi para mejorar tu linea", color:T.blueDeep};

  // Mock payment history per lender
  const MOCK_HISTORY = {
    aplazo:   [{date:"15 mar",amount:950,status:"paid"},{date:"1 mar",amount:950,status:"paid"},{date:"15 feb",amount:950,status:"paid"}],
    creditea: [{date:"30 mar",amount:700,status:"paid"},{date:"15 mar",amount:700,status:"paid"},{date:"28 feb",amount:700,status:"paid"}],
    payjoy:   [{date:"22 mar",amount:400,status:"paid"},{date:"15 mar",amount:400,status:"paid"},{date:"8 mar",amount:400,status:"paid"}],
  };

  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:T.bg}}>

      {/* Header — Optimizado */}
      <div style={{
        background:`linear-gradient(165deg,${T.blueInk} 0%,#1a2e6e 55%,${T.accent} 100%)`,
        padding:"0 0 28px",
        flexShrink:0,
        position:"relative",
        overflow:"hidden",
      }}>
        {/* Decorative elements */}
        <div style={{position:"absolute",top:-45,right:-35,width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
        <div style={{position:"absolute",bottom:-20,left:"10%",width:100,height:100,borderRadius:"50%",background:`${T.yellow}12`}}/>
        
        <div style={{padding:"16px 18px 0",display:"flex",alignItems:"center",gap:12}}>
          <button 
            onClick={onBack} 
            aria-label="Volver"
            style={{
              width:40,
              height:40,
              borderRadius:"50%",
              background:"rgba(255,255,255,0.1)",
              border:"1.5px solid rgba(255,255,255,0.15)",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              cursor:"pointer",
              color:"#fff",
              flexShrink:0,
              transition:"all 0.15s ease",
            }}
          ><ChevLeft/></button>
          <span style={{fontSize:16,fontWeight:700,color:"#fff",letterSpacing:"0.01em"}}>Credito Cashri</span>
        </div>
        
        <div style={{padding:"18px 22px 0",position:"relative",zIndex:1}}>
          <div style={{
            display:"inline-flex",
            alignItems:"center",
            gap:7,
            background:"rgba(255,255,255,0.1)",
            borderRadius:R.full,
            padding:"5px 12px",
            marginBottom:12,
            border:"1px solid rgba(255,255,255,0.1)",
          }}>
            <Spark size={10} color={T.yellow}/>
            <span style={{fontSize:9,color:T.yellow,fontWeight:700,letterSpacing:"1.4px"}}>SIN TARJETA · SIN BANCO</span>
          </div>
          <p style={{
            fontFamily:"'Fraunces',serif",
            fontSize:26,
            fontStyle:"italic",
            color:"#fff",
            lineHeight:1.2,
            marginBottom:8,
            fontWeight:500,
          }}>
            Llevalo hoy.<br/>Pagalo a tu ritmo.
          </p>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.55)",lineHeight:1.4}}>De $0 a $30,000 · hasta 24 plazos</p>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",minHeight:0,WebkitOverflowScrolling:"touch"}}>
        <div style={{padding:"16px 16px 32px",display:"flex",flexDirection:"column",gap:14}}>

          {/* ── Líneas activas ── */}
          {hasLinked && (
            <div>
              <p style={{fontSize:12,fontWeight:700,color:T.sub,textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:10}}>Mis líneas activas</p>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {activeLenders.map(l=>(
                  <DebtCard key={l.id} lender={l} debt={MOCK_DEBT[l.id]||MOCK_DEBT.aplazo} onPay={()=>{}}/>
                ))}
              </div>
            </div>
          )}

          {/* ── Health score — Optimizado ── */}
          {healthScore && (
            <div style={{
              background:T.surface,
              borderRadius:R.lg,
              padding:"16px",
              border:`1px solid ${T.line}`,
              display:"flex",
              alignItems:"center",
              gap:14,
              boxShadow:T.cardShadow,
            }}>
              <div style={{
                width:48,
                height:48,
                borderRadius:"50%",
                flexShrink:0,
                background:`linear-gradient(135deg, ${healthScore.color}15, ${healthScore.color}08)`,
                border:`2px solid ${healthScore.color}25`,
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                fontSize:22,
              }}>
                {healthScore.icon}
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <p style={{fontSize:14,fontWeight:700,color:T.ink}}>Salud crediticia</p>
                  <span style={{
                    fontSize:11,
                    fontWeight:700,
                    color:healthScore.color,
                    background:`${healthScore.color}12`,
                    padding:"2px 8px",
                    borderRadius:R.full,
                  }}>{healthScore.label}</span>
                </div>
                <p style={{fontSize:12,color:T.sub,lineHeight:1.4}}>{healthScore.sub}</p>
              </div>
            </div>
          )}

          {/* ── Historial de pagos ── */}
          {hasLinked && activeLenders.map(l=>(
            <div key={l.id} style={{background:T.surface,borderRadius:14,border:`1px solid ${T.line}`,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
              <div
                onClick={()=>setOpenHistory(openHistory===l.id?null:l.id)}
                style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",cursor:"pointer"}}
              >
                <LenderIcon lender={l} size={32}/>
                <div style={{flex:1}}>
                  <p style={{fontSize:13,fontWeight:700,color:T.ink}}>{l.name}</p>
                  <p style={{fontSize:11,color:T.sub}}>Últimos movimientos</p>
                </div>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={T.sub} strokeWidth={2.5} strokeLinecap="round">
                  <path d={openHistory===l.id?"M18 15l-6-6-6 6":"M6 9l6 6 6-6"}/>
                </svg>
              </div>
              {openHistory===l.id && (
                <div style={{borderTop:`1px solid ${T.lineLight}`}}>
                  {(MOCK_HISTORY[l.id]||[]).map((h,i,arr)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",borderBottom:i<arr.length-1?`1px solid ${T.lineLight}`:"none"}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background:`${l.color}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:12}}>✓</div>
                      <div style={{flex:1}}>
                        <p style={{fontSize:12,fontWeight:600,color:T.ink}}>Pago realizado</p>
                        <p style={{fontSize:11,color:T.sub}}>{h.date}</p>
                      </div>
                      <p style={{fontFamily:"'Fraunces',serif",fontSize:15,fontStyle:"italic",color:l.color}}>{mxn(h.amount)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* ── CTA solicitar ── */}
          <div style={{
            background:`linear-gradient(135deg,#7C3AED,#5B21B6)`,
            borderRadius:16,padding:"18px 18px",
            boxShadow:"0 4px 20px #7C3AED33",
          }}>
            <div style={{display:"flex",justifyContent:"center",gap:5,marginBottom:12}}>
              {[14,10,16,10,14].map((s,i)=><Spark key={i} size={s} color={i%2===0?T.yellow:"rgba(255,255,255,0.7)"}/>)}
            </div>
            <p style={{fontFamily:"'Fraunces',serif",fontSize:22,fontStyle:"italic",color:"#fff",textAlign:"center",marginBottom:6}}>
              {hasLinked ? "Solicita otra línea" : "Activa tu crédito"}
            </p>
            <p style={{fontSize:12,color:"rgba(255,255,255,0.65)",textAlign:"center",marginBottom:16}}>
              {hasLinked ? "Agrega un lender más a tu cartera" : "Sin historial crediticio ni banco"}
            </p>
            <button
              onClick={onSolicitar}
              style={{
                width:"100%",padding:"12px",borderRadius:R.full,
                background:T.yellow,border:"none",
                color:T.blueInk,fontSize:14,fontWeight:800,cursor:"pointer",
                boxShadow:"0 2px 10px rgba(0,0,0,0.2)",
              }}
            >Solicitar ahora →</button>
          </div>

          {/* ── Cómo funciona ── */}
          <div>
            <p style={{fontSize:12,fontWeight:700,color:T.sub,textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:10}}>Cómo funciona</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {HOW_STEPS.map((s,i)=>(
                <div key={i} style={{background:T.surface,borderRadius:14,padding:"13px 12px",border:`1px solid ${T.line}`,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                  <span style={{fontSize:22,display:"block",marginBottom:7}}>{s.icon}</span>
                  <p style={{fontSize:12,fontWeight:700,color:T.ink,marginBottom:3}}>{s.title}</p>
                  <p style={{fontSize:11,color:T.sub,lineHeight:1.4}}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Dónde usarlo ── */}
          <div style={{background:T.surface,borderRadius:14,padding:"14px 16px",border:`1px solid ${T.line}`,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
            <p style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:10}}>¿Dónde puedo usarlo?</p>
            {[
              {icon:"🏪", label:"Tiendas físicas",    sub:"NovaSuper, DepóMax y ClubPlus en todo el país"},
              {icon:"🌐", label:"En línea",            sub:"novasuper.mx con Cashri al checkout"},
              {icon:"🛒", label:"Cualquier producto",  sub:"Sin restricción de categoría ni monto mínimo"},
              {icon:"💳", label:"Sin tarjeta",         sub:"Solo presenta tu código Cashri en caja"},
            ].map((r,i,arr)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 0",borderBottom:i<arr.length-1?`1px solid ${T.lineLight}`:"none"}}>
                <div style={{width:36,height:36,borderRadius:9,flexShrink:0,background:`#7C3AED0C`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{r.icon}</div>
                <div>
                  <p style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:1}}>{r.label}</p>
                  <p style={{fontSize:11,color:T.sub}}>{r.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── FAQ ── */}
          <div>
            <p style={{fontSize:12,fontWeight:700,color:T.sub,textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:10}}>Preguntas frecuentes</p>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {FAQS.map((f,i)=>(
                <div
                  key={i}
                  style={{background:T.surface,borderRadius:12,border:`1px solid ${openFaq===i?"#7C3AED33":T.line}`,overflow:"hidden",transition:"all 0.15s"}}
                >
                  <div
                    onClick={()=>setOpenFaq(openFaq===i?null:i)}
                    style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 14px",cursor:"pointer"}}
                  >
                    <p style={{fontSize:13,fontWeight:600,color:openFaq===i?"#7C3AED":T.ink,flex:1,marginRight:8}}>{f.q}</p>
                    <div style={{
                      width:20,height:20,borderRadius:"50%",flexShrink:0,
                      background:openFaq===i?"#7C3AED":"#7C3AED12",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      transition:"all 0.15s",
                    }}>
                      <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke={openFaq===i?"#fff":"#7C3AED"} strokeWidth={3} strokeLinecap="round">
                        <path d={openFaq===i?"M18 15l-6-6-6 6":"M6 9l6 6 6-6"}/>
                      </svg>
                    </div>
                  </div>
                  {openFaq===i && (
                    <div style={{padding:"0 14px 13px",borderTop:`1px solid #7C3AED18`}}>
                      <p style={{fontSize:12,color:T.sub,lineHeight:1.6}}>{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Legal */}
          <p style={{fontSize:10,color:T.ghost,lineHeight:1.5,textAlign:"center"}}>
            * Crédito otorgado por terceros mediante convenio con Cashri. Sujeto a autorización y condiciones del otorgante.{" "}
            <span style={{color:T.blue,textDecoration:"underline",cursor:"pointer"}}>T&C</span>
          </p>

        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{flexShrink:0,background:T.surface,borderTop:`1px solid ${T.line}`,padding:"12px 16px",boxShadow:"0 -2px 12px rgba(0,0,0,0.05)"}}>
        <PrimaryButton color="#7C3AED" onClick={onSolicitar}>
          {hasLinked ? "Solicitar otra línea" : "Solicitar crédito"}
        </PrimaryButton>
      </div>
    </div>
  );
}


/* ─── Beneficios helpers ────────────────────────────────────── */
const BChevRight = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={T.sub} strokeWidth={2.5} strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
);
function BRow({ icon, title, sub, onTap, last=false }) {
  return (
    <div onClick={onTap} style={{display:"flex",alignItems:"center",gap:14,padding:"13px 16px",cursor:onTap?"pointer":"default",borderBottom:last?"none":`1px solid ${T.lineLight}`}}>
      <div style={{width:42,height:42,borderRadius:"50%",flexShrink:0,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>{icon}</div>
      <div style={{flex:1,minWidth:0}}>
        <p style={{fontSize:14,fontWeight:700,color:T.ink,marginBottom:2}}>{title}</p>
        <p style={{fontSize:12,color:T.sub,lineHeight:1.4}}>{sub}</p>
      </div>
      {onTap && <BChevRight/>}
    </div>
  );
}
function BSection({ title, children }) {
  return (
    <div style={{background:T.surface,borderRadius:14,border:`1px solid ${T.line}`,boxShadow:"0 1px 4px rgba(0,0,0,0.04)",marginBottom:0}}>
      <p style={{fontSize:16,fontWeight:800,color:T.ink,padding:"13px 16px 9px",borderRadius:"14px 14px 0 0"}}>{title}</p>
      <div style={{borderTop:`1px solid ${T.line}`}}>{children}</div>
    </div>
  );
}

function BeneficiosScreen({ onCreditos }) {
  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:T.bg}}>
      {/* Header */}
      <div style={{
        background:`linear-gradient(135deg,${T.blueInk},${T.blueMid})`,
        padding:"14px 20px 16px",flexShrink:0,
        display:"flex",alignItems:"center",gap:12,
      }}>
        <div style={{flex:1,background:"rgba(255,255,255,0.12)",borderRadius:R.full,padding:"8px 14px",fontSize:13,color:"rgba(255,255,255,0.6)",display:"flex",alignItems:"center",gap:8}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          Buscar en NovaMart
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",minHeight:0,padding:"14px 14px 32px",WebkitOverflowScrolling:"touch"}}>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>

        {/* Beneficios por tus compras */}
        <div
          onClick={()=>{}}
          style={{background:T.surface,borderRadius:14,padding:"14px 16px",border:`1px solid ${T.line}`,display:"flex",alignItems:"center",gap:14,cursor:"pointer",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}
        >
          <div style={{width:44,height:44,borderRadius:"50%",flexShrink:0,background:`${T.blue}10`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>🎁</div>
          <div style={{flex:1}}>
            <p style={{fontSize:14,fontWeight:700,color:T.ink,marginBottom:2}}>Beneficios por tus compras</p>
            <p style={{fontSize:12,color:T.sub,lineHeight:1.4}}>Ahorros en restaurantes, entretenimiento, servicios y más</p>
          </div>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={T.sub} strokeWidth={2.5} strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </div>

        {/* Finanzas */}
        <BSection title="Finanzas">
          <BRow
            icon={<div style={{width:44,height:44,borderRadius:"50%",background:"#7C3AED",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:11,fontWeight:800,letterSpacing:"-0.5px"}}>cashri</span></div>}
            title="El Monedero Digital"
            sub="de NovaSuper"
            onTap={()=>{}}
          />
          <BRow
            icon={<div style={{width:44,height:44,borderRadius:"50%",background:`${T.blue}12`,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth={1.8} strokeLinecap="round"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><circle cx="7" cy="15" r="1.5" fill={T.blue}/></svg></div>}
            title="Remesas"
            sub="Dinero de Estados Unidos a México"
            onTap={()=>{}}
          />
          <BRow
              icon={<div style={{width:44,height:44,borderRadius:"50%",background:`${T.blue}12`,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth={1.8} strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></div>}
              title="Créditos"
              sub="Sin revisión de buró ni aval"
              onTap={onCreditos}
              last
            />
        </BSection>

        {/* Internet y telefonía */}
        <BSection title="Internet y telefonía">
          <BRow
              icon={<div style={{width:44,height:44,borderRadius:"50%",background:"#111",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:11,fontWeight:800}}>beit</span></div>}
              title="Dile Beit a los límites"
              sub="Redes sociales, llamadas y mensajes desde $10."
              onTap={()=>{}}
              last
            />
        </BSection>

        {/* Salud y bienestar */}
        <BSection title="Salud y bienestar">
          <BRow
              icon={<div style={{width:44,height:44,borderRadius:"50%",background:`${T.blue}12`,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth={1.8} strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg></div>}
              title="Consultas ilimitadas"
              sub="Cuida tu salud desde $30."
              onTap={()=>{}}
              last
            />
        </BSection>

        {/* Feedback */}
        <div style={{background:T.surface,borderRadius:14,padding:"18px 16px",border:`1px solid ${T.line}`,textAlign:"center",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
          <p style={{fontSize:13,color:T.sub,marginBottom:12}}>¡Nos encantaría saber lo que piensas!</p>
          <button style={{
            width:"100%",padding:"12px",borderRadius:R.full,
            background:"none",border:`2px solid ${T.ink}`,
            fontSize:15,fontWeight:800,color:T.ink,cursor:"pointer",
          }}>Dar comentarios</button>
        </div>

        </div>{/* end inner flex column */}
      </div>{/* end scroll */}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   SCREEN: CUENTA
═══════════════════════════════════════════════════════════════ */
function CuentaScreen({ onCreditLanding }) {
  const [dismissed, setDismissed] = useState(false);

  const menuItems = [
    { icon:"📦", label:"Pedidos",         sub:"Rastrea, devuelve o revisa tickets" },
    { icon:"📍", label:"Mis direcciones", sub:"Gestiona tus domicilios de entrega" },
    { icon:"💳", label:"Metodos de pago", sub:"Tarjetas y medios guardados" },
    { icon:"✦",  label:"Mi credito Cashri",sub:"Lineas activas y solicitudes", onTap: onCreditLanding, highlight: true },
    { icon:"🎁", label:"Referidos",        sub:"Invita y gana $100 por amigo" },
    { icon:"🔔", label:"Notificaciones",  sub:"Preferencias de avisos" },
    { icon:"🔒", label:"Privacidad",      sub:"Datos y permisos" },
    { icon:"❓", label:"Ayuda",           sub:"Soporte y preguntas frecuentes" },
  ];

  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:T.bg}}>

      {/* Header — Optimizado */}
      <div style={{
        background:`linear-gradient(140deg,${T.blueInk},${T.blueMid})`,
        padding:"16px 18px", 
        flexShrink:0,
        display:"flex", 
        alignItems:"center", 
        gap:12,
        boxShadow:`0 2px 12px ${T.blueInk}20`,
      }}>
        <div style={{
          flex:1,
          background:"rgba(255,255,255,0.1)",
          borderRadius:R.full,
          padding:"10px 16px",
          fontSize:13,
          color:"rgba(255,255,255,0.55)",
          display:"flex",
          alignItems:"center",
          gap:10,
          border:"1px solid rgba(255,255,255,0.1)",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          Buscar en NovaMart
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",minHeight:0,WebkitOverflowScrolling:"touch"}}>

        {/* Hero — Nova Pass style — Optimizado */}
        <div style={{
          background:"#fff",
          padding:"28px 20px 24px",
          textAlign:"center",
          borderBottom:`1px solid ${T.lineLight}`,
        }}>
          {/* NP logo */}
          <div style={{display:"inline-flex",alignItems:"center",gap:5,marginBottom:12}}>
            <span style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:700,color:T.blue,fontStyle:"italic"}}>Nova</span>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",lineHeight:1}}>
              <span style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:700,color:T.yellow,fontStyle:"italic"}}>Pass</span>
              <Spark size={10} color={T.yellow}/>
            </div>
          </div>
          <p style={{
            fontFamily:"'Fraunces',serif",
            fontSize:30,
            fontStyle:"italic",
            color:T.ink,
            lineHeight:1.15,
            fontWeight:500,
          }}>
            Hola, Ma. Fernanda
          </p>
        </div>

        <div style={{padding:"14px 14px 32px",display:"flex",flexDirection:"column",gap:10}}>

          {/* Vincular Cashri banner */}
          {!dismissed && (
            <div style={{
              background:T.surface,borderRadius:14,
              padding:"14px 14px 14px 16px",
              border:`1px solid ${T.line}`,
              display:"flex",alignItems:"center",gap:12,
              boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <div style={{width:44,height:44,borderRadius:"50%",flexShrink:0,background:`${T.blue}10`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>📲</div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:2}}>Vincular mi cuenta a Cashri</p>
                <p style={{fontSize:11,color:T.sub}}>Paga con Cashri, gana al instante</p>
              </div>
              <button onClick={()=>setDismissed(true)} style={{background:"none",border:"none",cursor:"pointer",color:T.ghost,fontSize:18,lineHeight:1,padding:4,flexShrink:0}}>×</button>
            </div>
          )}

          {/* Savings card — Nova Pass */}
          <div style={{
            background:T.yellow,borderRadius:14,
            overflow:"hidden",
            boxShadow:"0 2px 8px rgba(0,0,0,0.08)",
          }}>
            <div style={{background:"#fff",borderRadius:"14px 14px 0 0",padding:"13px 16px",display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:20}}>🐷</span>
              <p style={{fontSize:15,fontWeight:800,color:T.ink,lineHeight:1.2}}>Tus ahorros de<br/>Nova Pass</p>
            </div>
            <div style={{padding:"14px 16px"}}>
              <p style={{fontSize:13,color:T.blueInk,marginBottom:4}}>Tus ahorros en costos de entrega</p>
              <p style={{fontFamily:"'Fraunces',serif",fontSize:28,fontStyle:"italic",fontWeight:800,color:T.blueInk}}>$5,257.00</p>
            </div>
          </div>

          {/* Aprovecha tu membresía */}
          <div style={{background:T.surface,borderRadius:14,overflow:"hidden",border:`1px solid ${T.line}`,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
            <div style={{padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${T.lineLight}`}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{display:"flex",alignItems:"center",gap:2}}>
                  <span style={{fontSize:11,fontWeight:900,color:T.blue}}>NP</span>
                  <Spark size={8} color={T.yellow}/>
                </div>
                <span style={{fontSize:13,fontWeight:700,color:T.blue}}>Aprovecha tu membresía</span>
              </div>
              <BChevRight/>
            </div>
            <div style={{padding:"13px 16px",display:"flex",alignItems:"flex-start",gap:12}}>
              <span style={{fontSize:28,flexShrink:0}}>🚚</span>
              <div>
                <p style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:3}}>Envíos ilimitados sin costo</p>
                <p style={{fontSize:12,color:T.sub,lineHeight:1.5}}>En compra mínima de $299, disfruta envíos sin costo desde tienda.</p>
              </div>
            </div>
          </div>

          {/* Menu items — Optimizado */}
          <div style={{
            background:T.surface,
            borderRadius:R.lg,
            overflow:"hidden",
            border:`1px solid ${T.line}`,
            boxShadow:T.cardShadow,
          }}>
            {menuItems.map((item,i)=>(
              <div
                key={i}
                onClick={item.onTap}
                role={item.onTap ? "button" : undefined}
                tabIndex={item.onTap ? 0 : undefined}
                onKeyDown={item.onTap ? e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); item.onTap(); }} : undefined}
                style={{
                  display:"flex",
                  alignItems:"center",
                  gap:14,
                  padding:"14px 16px",
                  borderBottom:i<menuItems.length-1 ? `1px solid ${T.lineLight}` : "none",
                  cursor:item.onTap ? "pointer" : "default",
                  background: item.highlight ? `${T.accent}04` : "transparent",
                  transition:"background 0.15s ease",
                }}
              >
                <div style={{
                  width:40,
                  height:40,
                  borderRadius:R.sm,
                  flexShrink:0,
                  background: item.highlight ? `${T.accent}12` : `${T.blue}08`,
                  border: item.highlight ? `1px solid ${T.accent}20` : "none",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                }}>
                  {item.icon==="✦"
                    ? <Spark size={16} color={T.accent}/>
                    : <span style={{fontSize:18}}>{item.icon}</span>
                  }
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{
                    fontSize:14,
                    fontWeight:700,
                    color: item.highlight ? T.accent : T.ink,
                    marginBottom:2,
                  }}>{item.label}</p>
                  <p style={{fontSize:11,color:T.sub,lineHeight:1.3}}>{item.sub}</p>
                </div>
                <BChevRight/>
              </div>
            ))}
          </div>

          {/* Sign out — Optimizado */}
          <button style={{
            width:"100%",
            padding:"14px",
            borderRadius:R.md,
            background:T.surface,
            border:`1.5px solid ${T.line}`,
            fontSize:14,
            fontWeight:600,
            color:T.sub,
            cursor:"pointer",
            transition:"all 0.15s ease",
          }}>Cerrar sesion</button>

        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   SCREEN: MIS PRODUCTOS
═══════════════════════════════════════════════════════════════ */
const TABS_MP = ["Vuelve a pedirlos","Favoritos"];

function MisProductosScreen({ onProduct }) {
  const [tab, setTab] = useState(0);
  const frequent  = [...PRODUCTS].sort(()=>0.5-Math.random()).slice(0,6);
  const favorites = [...PRODUCTS].sort(()=>0.5-Math.random()).slice(0,4);
  const items = tab===0 ? frequent : favorites;

  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:T.bg}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${T.blueInk},${T.blueMid})`,padding:"14px 20px 0",flexShrink:0}}>
        <p style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:14}}>Tus productos</p>
        <div style={{display:"flex"}}>
          {TABS_MP.map((t,i)=>(
            <button key={i} onClick={()=>setTab(i)} style={{
              flex:1,background:"none",border:"none",cursor:"pointer",
              padding:"8px 4px",fontSize:13,
              fontWeight:tab===i?700:500,
              color:tab===i?"#fff":"rgba(255,255,255,0.55)",
              borderBottom:`2.5px solid ${tab===i?T.yellow:"transparent"}`,
              transition:"all 0.15s",
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Category chips */}
      <div style={{flexShrink:0,padding:"10px 14px 8px",overflowX:"auto",display:"flex",gap:7,scrollbarWidth:"none",background:T.surface,borderBottom:`1px solid ${T.line}`}}>
        {["Todos","Electrónica","Hogar","Despensa","Moda"].map((c,i)=>(
          <div key={i} style={{
            flexShrink:0,padding:"5px 13px",borderRadius:R.full,
            background:i===0?T.blue:T.surfaceAlt,
            border:`1px solid ${i===0?T.blue:T.line}`,
            fontSize:12,fontWeight:i===0?700:500,
            color:i===0?"#fff":T.body,cursor:"pointer",whiteSpace:"nowrap",
          }}>{c}</div>
        ))}
      </div>

      {/* Count */}
      <div style={{flexShrink:0,padding:"10px 16px 4px"}}>
        <p style={{fontSize:13,fontWeight:700,color:T.ink}}>
          Todos <span style={{color:T.ghost,fontWeight:400}}>({items.length})</span>
        </p>
      </div>

      {/* Grid */}
      <div style={{flex:1,overflowY:"auto",minHeight:0}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1px",background:T.line}}>
          {items.map(p=><ProductTile key={p.id} p={p} onTap={()=>onProduct(p)}/>)}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCREEN: PRODUCT DETAIL
═══════════════════════════════════════════════════════════════ */
function DetailScreen({ p, onBack, onBuy, onCashriOnboarding }) {
  const saved = p.orig - p.price;
  const discountPct = saved > 0 ? pct(p.price, p.orig) : 0;
  const [isFav, setIsFav] = useState(false);
  
  return (
    <div style={{background:T.bg, display:"flex", flexDirection:"column", flex:1, overflow:"hidden"}}>

      {/* Header — Optimizado */}
      <div style={{
        background:`linear-gradient(140deg, ${T.blueInk} 0%, ${T.blueMid} 100%)`,
        padding:"14px 18px", 
        flexShrink:0,
        display:"flex", 
        alignItems:"center", 
        gap:"12px",
        boxShadow:`0 2px 12px ${T.blueInk}25`,
      }}>
        <button 
          onClick={onBack} 
          aria-label="Volver"
          style={{
            width:"38px",
            height:"38px",
            borderRadius:"50%",
            background:"rgba(255,255,255,0.1)",
            border:"1.5px solid rgba(255,255,255,0.15)",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            cursor:"pointer",
            color:"#fff",
            flexShrink:0,
            transition:"all 0.15s ease",
          }}
        ><ChevLeft/></button>
        <div style={{
          flex:1,
          background:"rgba(255,255,255,0.08)",
          borderRadius:R.full,
          padding:"10px 14px",
          fontSize:"13px",
          color:"rgba(255,255,255,0.55)",
          display:"flex",
          alignItems:"center",
          gap:"10px",
          border:"1px solid rgba(255,255,255,0.1)",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          Buscar en NovaMart
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch"}}>
        
        {/* Product image hero — Optimizado */}
        <div style={{
          background:`linear-gradient(180deg, ${T.blueInk}0C 0%, ${T.bg} 100%)`,
          height:"220px", 
          display:"flex",
          alignItems:"center", 
          justifyContent:"center",
          fontSize:"100px", 
          position:"relative",
          padding:"20px",
        }}>
          <span style={{
            filter:"drop-shadow(0 8px 24px rgba(0,0,0,0.1))",
          }}>{p.emoji}</span>
          
          {/* Favorite button */}
          <button 
            onClick={()=>setIsFav(!isFav)}
            aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
            style={{
              position:"absolute",
              top:"14px",
              right:"14px",
              width:"40px",
              height:"40px",
              borderRadius:"50%",
              background:T.surface,
              border:`1.5px solid ${isFav ? T.error : T.line}`,
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              cursor:"pointer",
              fontSize:"17px",
              boxShadow:T.cardShadow,
              transition:"all 0.2s ease",
              color: isFav ? T.error : T.ghost,
            }}
          >{isFav ? "♥" : "♡"}</button>
          
          {/* Discount badge */}
          {discountPct > 0 && (
            <div style={{
              position:"absolute",
              top:"14px",
              left:"14px",
              background:`linear-gradient(135deg, ${T.accent}, #6D28D9)`,
              color:"#fff",
              fontSize:"12px",
              fontWeight:"800",
              padding:"6px 12px",
              borderRadius:R.md,
              boxShadow:`0 3px 10px ${T.accent}40`,
              letterSpacing:"0.02em",
            }}>-{discountPct}%</div>
          )}
        </div>

        <div style={{padding:"22px 18px", display:"flex", flexDirection:"column", gap:"18px", paddingBottom:"28px"}}>

          {/* Title block — Optimizado */}
          <div>
            <p style={{
              fontSize:"11px",
              color:T.blue,
              fontWeight:"700",
              marginBottom:"6px",
              letterSpacing:"0.5px",
              textTransform:"uppercase",
            }}>{p.brand} · {p.cat}</p>
            <h1 style={{
              fontFamily:"'Fraunces',serif",
              fontSize:"24px",
              color:T.ink,
              lineHeight:1.25,
              marginBottom:"12px",
              fontStyle:"italic",
              fontWeight:"500",
            }}>{p.name}</h1>

            {/* Price & rating row */}
            <div style={{
              display:"flex",
              alignItems:"center",
              justifyContent:"space-between",
              flexWrap:"wrap",
              gap:"8px",
            }}>
              <div style={{display:"flex",alignItems:"baseline",gap:"10px"}}>
                <span style={{
                  fontSize:"28px",
                  fontFamily:"'Fraunces',serif",
                  fontStyle:"italic",
                  color:T.blueDeep,
                  lineHeight:1,
                  fontWeight:"600",
                }}>{mxn(p.price)}</span>
                {saved > 0 && (
                  <span style={{
                    fontSize:"14px",
                    color:T.ghost,
                    textDecoration:"line-through",
                  }}>{mxn(p.orig)}</span>
                )}
              </div>
              <div style={{
                display:"flex",
                alignItems:"center",
                gap:"6px",
                background:T.surfaceAlt,
                padding:"6px 10px",
                borderRadius:R.full,
                border:`1px solid ${T.line}`,
              }}>
                <Stars n={p.rating}/>
                <span style={{fontSize:"12px",color:T.sub,fontWeight:"500"}}>({p.rev})</span>
              </div>
            </div>

            {saved > 0 && (
              <div style={{marginTop:"10px"}}>
                <Pill color={T.accent}>Ahorras {mxn(saved)} ({discountPct}% off)</Pill>
              </div>
            )}
          </div>

        {/* ── Tarjeta MSI — producto bancario — Optimizado ── */}
        <div style={{
          background:`linear-gradient(140deg, ${T.blueLight} 0%, #F0F7FF 100%)`,
          border:`1.5px solid ${T.blue}18`,
          borderRadius:R.lg, 
          padding:"14px 16px",
          display:"flex", 
          alignItems:"center", 
          gap:"14px",
          boxShadow:`0 2px 8px ${T.blue}08`,
        }}>
          <div style={{
            width:"42px",
            height:"42px",
            borderRadius:R.md,
            background:`linear-gradient(140deg, ${T.blue} 0%, ${T.blueDeep} 100%)`,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            flexShrink:0,
            boxShadow:`0 3px 10px ${T.blue}30`,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <p style={{
              fontSize:"13px",
              fontWeight:"700",
              color:T.ink,
              marginBottom:"3px",
            }}>
              Hasta 12 meses sin intereses
            </p>
            <p style={{fontSize:"11px",color:T.sub,lineHeight:1.4}}>
              Tarjetas participantes · desde <span style={{color:T.blue,fontWeight:"700"}}>{mxn(Math.round(p.price/12))}/mes</span>
            </p>
          </div>
          <div style={{
            padding:"6px 10px",
            background:T.surface,
            borderRadius:R.sm,
            border:`1px solid ${T.blue}20`,
            cursor:"pointer",
          }}>
            <span style={{fontSize:"11px",color:T.blue,fontWeight:"700"}}>Ver</span>
          </div>
        </div>

        {/* ── Sin tarjeta de credito — linea Cashri — Optimizado ── */}
        {(()=>{
          // Cheapest installment across all lenders (max plazos, lowest rate plan)
          const bestPlan = BNPL_LENDERS.reduce((best, l) => {
            const pl = l.plans[l.plans.length - 1]; // longest plan = smallest payment
            const pmt = p.price * (1 + pl.r) / pl.n;
            return (!best || pmt < best.pmt) ? { pmt, n: pl.n, label: l.periodLabel } : best;
          }, null);
          return (
            <div
              onClick={onCashriOnboarding}
              role="button"
              tabIndex={0}
              onKeyDown={e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); onCashriOnboarding(); } }}
              style={{
                background:`linear-gradient(140deg, ${T.accentBg} 0%, #FAF5FF 100%)`,
                border:`1.5px solid ${T.accent}20`,
                borderRadius:R.lg, 
                padding:"14px 16px",
                display:"flex", 
                alignItems:"center", 
                gap:"14px",
                cursor:"pointer",
                boxShadow:`0 2px 8px ${T.accent}08`,
                transition:"all 0.2s ease",
              }}>
              <div style={{
                width:"42px",
                height:"42px",
                borderRadius:R.md,
                background:"linear-gradient(140deg, #7C3AED 0%, #5B21B6 100%)",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                flexShrink:0,
                boxShadow:`0 3px 10px ${T.accent}35`,
              }}>
                <Spark size={18} color="rgba(255,255,255,0.95)"/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                  <p style={{
                    fontSize:"13px",
                    fontWeight:"700",
                    color:T.ink,
                  }}>
                    Llevalo hoy, sin tarjeta
                  </p>
                  <span style={{
                    fontSize:"8px",
                    fontWeight:"800",
                    background:T.accent,
                    color:"#fff",
                    padding:"2px 6px",
                    borderRadius:R.full,
                    letterSpacing:"0.5px",
                  }}>NUEVO</span>
                </div>
                <p style={{
                  fontSize:"13px",
                  color:T.accent,
                  fontWeight:"700",
                  marginBottom:"2px",
                }}>
                  Desde {mxn(Math.ceil(bestPlan.pmt))} por {bestPlan.label}
                </p>
                <p style={{fontSize:"10px",color:T.sub,lineHeight:1.4}}>
                  Hasta {bestPlan.n} {bestPlan.label}s · sin banco ni tramites
                </p>
              </div>
              <div style={{
                padding:"6px 10px",
                background:T.accent,
                borderRadius:R.sm,
                boxShadow:`0 2px 6px ${T.accent}40`,
              }}>
                <span style={{fontSize:"11px",color:"#fff",fontWeight:"700"}}>Activar</span>
              </div>
            </div>
          );
        })()}

        {/* Badges row — Optimizado */}
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
          <Badge bg={T.yellowLight} color={T.blueInk} size="md">Rebaja</Badge>
          <Badge bg={T.blueLight} color={T.blue} size="md">12 MSI</Badge>
          <Badge bg={T.accentBg} color={T.accent} size="md">Sin TDC</Badge>
          <Badge bg={T.successBg} color={T.success} size="md">24 hrs</Badge>
        </div>

        {/* Thumbnail strip — Optimizado */}
        <div style={{display:"flex",gap:"10px"}}>
          {[true,false,false,false].map((sel,i)=>(
            <button 
              key={i} 
              type="button"
              aria-label={`Vista ${i + 1} del producto`}
              aria-pressed={sel}
              style={{
                width:"60px",
                height:"60px",
                borderRadius:R.md,
                background:T.surfaceAlt,
                border:`2px solid ${sel ? T.blue : T.line}`,
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                fontSize:"26px",
                cursor:"pointer",
                transition:"all 0.15s ease",
                boxShadow: sel ? `0 0 0 3px ${T.blue}15` : "none",
              }}
            >{p.emoji}</button>
          ))}
        </div>

        {/* Delivery info — Optimizado */}
        <div style={{
          background:T.surface,
          borderRadius:R.lg,
          padding:"16px",
          border:`1px solid ${T.line}`,
          boxShadow:T.cardShadow,
        }}>
          {[
            {icon:"🚚",text:"Entrega estimada el",bold:"sab. 21 de mar", iconBg:T.successBg},
            {icon:"✦", text:"Vendido y enviado por",bold:"NovaMart", iconBg:T.blueLight, useSpark:true},
            {icon:"↩️",text:"Devolucion gratuita hasta",bold:"30 dias", iconBg:T.warningBg},
          ].map((r,i)=>(
            <div key={i} style={{
              display:"flex",
              alignItems:"center",
              gap:"12px",
              padding:"10px 0",
              borderBottom:i<2 ? `1px solid ${T.lineLight}` : "none",
            }}>
              <div style={{
                width:"32px",
                height:"32px",
                borderRadius:R.sm,
                background:r.iconBg,
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                fontSize:"14px",
                flexShrink:0,
              }}>
                {r.useSpark ? <Spark size={12} color={T.blue}/> : r.icon}
              </div>
              <span style={{fontSize:"13px",color:T.body,lineHeight:1.45,flex:1}}>
                {r.text} <strong style={{color:T.ink,fontWeight:"600"}}>{r.bold}</strong>
              </span>
            </div>
          ))}
        </div>
      </div>
      </div>{/* end scroll */}

      {/* Sticky CTA — inline, not fixed */}
      <div style={{
        flexShrink:0, background:T.surface,
        borderTop:`1px solid ${T.line}`,
        padding:"12px 20px", display:"flex", gap:"10px",
      }}>
        <GhostButton onClick={onBuy}>Lo quiero</GhostButton>
        <PrimaryButton onClick={onBuy}>Agregar</PrimaryButton>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCREEN: ADDRESS
═══════════════════════════════════════════════════════════════ */
function AddressScreen({ onBack, onContinue }) {
  const [sel, setSel] = useState(null);
  return (
    <div style={{background:T.bg, display:"flex", flexDirection:"column", flex:1, overflow:"hidden"}}>

      {/* Header */}
      <div style={{
        background:`linear-gradient(135deg, ${T.blueInk} 0%, ${T.blueMid} 100%)`,
        padding:"14px 20px", display:"flex", alignItems:"center", gap:"12px", flexShrink:0,
      }}>
        <button onClick={onBack} style={{width:"36px",height:"36px",borderRadius:"50%",background:"rgba(255,255,255,0.12)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}><ChevLeft/></button>
        <h1 style={{fontSize:"16px",fontWeight:"700",color:"#fff",flex:1,textAlign:"center"}}>Elegir dirección</h1>
        <div style={{width:"36px"}}/>
      </div>

      <div style={{flex:1, overflowY:"auto", padding:"20px"}}>

        {/* Warning */}
        <div style={{
          background:`${T.blue}08`,border:`1px solid ${T.blue}20`,
          borderRadius:R.md,padding:"12px 14px",
          display:"flex",alignItems:"center",gap:"10px",marginBottom:"20px",
        }}>
          <span style={{fontSize:"16px"}}>⚠️</span>
          <p style={{fontSize:"13px",color:T.blue,fontWeight:"500"}}>Tu pedido requiere una dirección de envío</p>
        </div>

        {/* Add new */}
        <button style={{
          width:"100%",background:T.surface,
          border:`1.5px dashed ${T.blue}44`,borderRadius:R.lg,
          padding:"14px",display:"flex",alignItems:"center",gap:"10px",
          cursor:"pointer",marginBottom:"16px",
        }}>
          <div style={{width:"36px",height:"36px",borderRadius:"50%",background:`${T.blue}12`,display:"flex",alignItems:"center",justifyContent:"center",color:T.blue,fontSize:"18px",flexShrink:0}}>+</div>
          <span style={{fontSize:"14px",color:T.blue,fontWeight:"600"}}>Agregar nueva direcci��n</span>
        </button>

        {/* Address list */}
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {ADDRESSES.map(a=>(
            <div
              key={a.id}
              onClick={()=>setSel(a.id)}
              style={{
                background:T.surface,borderRadius:R.lg,padding:"16px",
                border:`1.5px solid ${sel===a.id?T.blue:T.line}`,
                cursor:"pointer",
                boxShadow:sel===a.id?`0 0 0 3px ${T.blue}18`:"none",
                transition:"all 0.15s",
              }}
            >
              <div style={{display:"flex",alignItems:"flex-start",gap:"12px"}}>
                <div style={{marginTop:"2px"}}><Radio active={sel===a.id}/></div>
                <div style={{flex:1}}>
                  <p style={{fontSize:"14px",fontWeight:"700",color:T.ink,marginBottom:"3px"}}>{a.name}</p>
                  <p style={{fontSize:"13px",color:T.sub,lineHeight:1.4}}>{a.addr}</p>
                </div>
                <span style={{fontSize:"13px",color:T.blue,fontWeight:"600",flexShrink:0}}>Editar</span>
              </div>
            </div>
          ))}
        </div>
      </div>{/* end scroll */}

      {/* Inline CTA */}
      <div style={{flexShrink:0, background:T.surface, borderTop:`1px solid ${T.line}`, padding:"14px 20px"}}>
        <PrimaryButton onClick={()=>sel&&onContinue(ADDRESSES.find(a=>a.id===sel))}>
          Continuar
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHECKOUT DATA
═══════════════════════════════════════════════════════════════ */
const BNPL_LENDERS = [
  {
    id:"aplazo",   name:"Aplazo",   color:"#00A651", gfrom:"#00A651", gto:"#007A3A",
    badgeBg:"#ECFDF5", badgeText:"#065F46", badge:"Popular",
    line:18000, used:2000,
    periodType:"catorcenas", periodLabel:"catorcena", periodShort:"cator.",
    graceDays:30, desc:"Llévalo hoy · paga cada 14 días",
    plans:[
      {n:2,r:0.06,cat:44,label:"2 catorcenas"},{n:4,r:0.12,cat:62,label:"4 catorcenas"},
      {n:8,r:0.22,cat:80,label:"8 catorcenas"},{n:12,r:0.30,cat:95,label:"12 catorcenas"},
    ],
  },
  {
    id:"creditea", name:"Creditea", color:"#E85500", gfrom:"#FF6B1A", gto:"#CC4400",
    badgeBg:"#FFF3E0", badgeText:"#C23E00", badge:"Rápido",
    line:12500, used:0,
    periodType:"quincenas", periodLabel:"quincena", periodShort:"qna.",
    graceDays:30, desc:"Llévalo hoy · paga cada quincena",
    plans:[
      {n:2,r:0.06,cat:44,label:"2 quincenas"},{n:4,r:0.12,cat:62,label:"4 quincenas"},
      {n:8,r:0.22,cat:80,label:"8 quincenas"},{n:12,r:0.30,cat:95,label:"12 quincenas"},
    ],
  },
  {
    id:"payjoy", name:"PayJoy", color:"#6C3CE1", gfrom:"#7C4EE8", gto:"#4B23B8",
    badgeBg:"#EDE7F6", badgeText:"#3B1BA3", badge:"Flex",
    line:9800, used:200,
    periodType:"semanas", periodLabel:"semana", periodShort:"sem.",
    graceDays:30, desc:"Llévalo hoy · paga cada semana",
    plans:[
      {n:4,r:0.09,cat:58,label:"4 semanas"},{n:8,r:0.16,cat:74,label:"8 semanas"},
      {n:12,r:0.26,cat:90,label:"12 semanas"},{n:24,r:0.42,cat:115,label:"24 semanas"},
    ],
  },
];

const WALLET    = { id:"cashri_wallet", balance:3500, color:"#7C3AED", name:"Cashri Wallet" };
const AMEX      = { id:"amex1", last4:"1008", holder:"Ma. Fernanda Avendano", exp:"05/29", from:"#1C5FA8", to:"#0D3B72", name:"Amex 1008" };

const lenderOf  = id => BNPL_LENDERS.find(l => l.id === id);
const isLender  = id => !!lenderOf(id);
const colorOf   = id => lenderOf(id)?.color ?? (id==="cashri_wallet" ? "#7C3AED" : id==="paypal" ? "#003087" : T.blue);
const nameOf    = id => lenderOf(id)?.name ?? (id==="cashri_wallet" ? "Cashri Wallet" : id==="paypal" ? "PayPal" : `Amex ${AMEX.last4}`);
const maxFor    = id => { const l=lenderOf(id); if(l) return l.line-l.used; if(id==="cashri_wallet") return WALLET.balance; return Infinity; };



function balanceSlots(slots, changedId, newVal, PRICE) {
  const others  = slots.filter(s => s.id !== changedId);
  const clamped = Math.min(maxFor(changedId), Math.max(0, Math.round(newVal)), PRICE);
  if (others.length === 0) return slots.map(s=>({...s,amount:clamped}));
  const remainder = PRICE - clamped;
  let left = remainder;
  const adjusted = others.map((s,i) => {
    const share = i===others.length-1
      ? Math.min(maxFor(s.id), Math.max(0, left))
      : Math.min(maxFor(s.id), Math.max(0, Math.round(left/(others.length-i))));
    left -= share;
    return {...s, amount:share};
  });
  const othersTotal = adjusted.reduce((a,s)=>a+s.amount,0);
  const finalAmt    = Math.max(0, PRICE - othersTotal);
  const map = Object.fromEntries([[changedId,finalAmt],...adjusted.map(s=>[s.id,s.amount])]);
  return slots.map(s=>({...s, amount:map[s.id]??s.amount}));
}

/* ─── Small atoms ───────────────────────────────────────────── */
function AmexMini({ size=38 }) {
  const h = Math.round(size*0.65);
  return (
    <div style={{width:size,height:h,borderRadius:6,flexShrink:0,background:"linear-gradient(135deg,#1C5FA8,#0D3B72)",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"3px 5px",boxShadow:"0 2px 6px rgba(0,0,0,0.18)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-6,right:-5,width:18,height:18,borderRadius:"50%",background:"rgba(255,255,255,0.07)"}}/>
      <div><div style={{fontSize:"5.5px",fontWeight:900,color:"rgba(255,255,255,0.9)",letterSpacing:0.3}}>AMERICAN</div><div style={{fontSize:"5.5px",fontWeight:900,color:"rgba(255,255,255,0.9)",letterSpacing:0.3}}>EXPRESS</div></div>
      <div style={{fontSize:"5px",color:"rgba(255,255,255,0.6)",fontWeight:600}}>···· {AMEX.last4}</div>
    </div>
  );
}

function LenderIcon({ lender, size=36 }) {
  return (
    <div style={{width:size,height:size,borderRadius:9,flexShrink:0,background:`linear-gradient(135deg,${lender.gfrom},${lender.gto})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 2px 6px ${lender.color}33`}}>
      <Spark size={size*0.44} color="rgba(255,255,255,0.92)"/>
    </div>
  );
}

function MethodIcon({ id, size=36 }) {
  const l = lenderOf(id);
  if (l) return <LenderIcon lender={l} size={size}/>;
  if (id==="cashri_wallet") return (
    <div style={{width:size,height:size,borderRadius:9,flexShrink:0,background:"linear-gradient(135deg,#7C3AED,#4B23B8)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 6px #7C3AED33"}}>
      <span style={{fontSize:size*0.44,fontStyle:"italic",fontWeight:900,color:"#fff",letterSpacing:-1}}>₡</span>
    </div>
  );
  if (id==="amex1") return <AmexMini size={size}/>;
  return <div style={{width:size,height:size,borderRadius:9,background:T.surfaceAlt,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:size*0.35,fontWeight:900,color:"#003087"}}>PP</span></div>;
}

/* ─── Plan picker bottom sheet ──────────────────────────────── */

/* ─── Plan Bottom Sheet ─────────────────────────────────────── */
function PlanSheet({ lender, baseAmount, currentIdx, onSelect, onClose }) {
  const pdL = lender.periodLabel;
  return (
    <div
      style={{position:"absolute",inset:0,background:"rgba(10,22,40,0.55)",zIndex:400,display:"flex",alignItems:"flex-end",backdropFilter:"blur(2px)"}}
      onClick={onClose}
    >
      <div
        style={{background:T.surface,borderRadius:"20px 20px 0 0",width:"100%",maxHeight:"72vh",overflowY:"auto",boxShadow:"0 -8px 40px rgba(0,0,0,0.18)"}}
        onClick={e=>e.stopPropagation()}
      >
        {/* Handle */}
        <div style={{padding:"12px 0 4px",display:"flex",justifyContent:"center"}}>
          <div style={{width:36,height:4,borderRadius:999,background:T.line}}/>
        </div>

        {/* Header */}
        <div style={{padding:"8px 20px 14px",borderBottom:`1px solid ${T.lineLight}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <LenderIcon lender={lender} size={34}/>
            <div>
              <p style={{fontSize:14,fontWeight:700,color:T.ink}}>{lender.name}</p>
              <p style={{fontSize:11,color:T.sub}}>Elige tu plazo · 30 días sin costo</p>
            </div>
          </div>
        </div>

        {/* Options */}
        <div style={{padding:"10px 16px 32px",display:"flex",flexDirection:"column",gap:8}}>
          {lender.plans.map((pl,i)=>{
            const tot   = baseAmount*(1+pl.r);
            const perPd = tot/pl.n;
            const on    = i===currentIdx;
            return (
              <div
                key={i}
                onClick={()=>onSelect(i)}
                style={{
                  display:"flex",alignItems:"center",gap:12,
                  padding:"13px 14px",borderRadius:14,
                  background: on ? `${lender.color}08` : T.surface,
                  border:`1.5px solid ${on ? lender.color : T.line}`,
                  cursor:"pointer",transition:"all 0.15s",
                  boxShadow: on ? `0 0 0 3px ${lender.color}12` : "none",
                }}
              >
                {/* Radio */}
                <div style={{
                  width:20,height:20,borderRadius:"50%",flexShrink:0,
                  border: on ? `6px solid ${lender.color}` : `2px solid ${T.line}`,
                  transition:"border 0.15s",
                }}/>
                <div style={{flex:1}}>
                  <p style={{fontSize:14,fontWeight:700,color:T.ink,marginBottom:2}}>{pl.label}</p>
                  <p style={{fontSize:11,color:T.blueDeep,fontWeight:600}}>Total a pagar {mxn(tot)}</p>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <p style={{fontFamily:"'Fraunces',serif",fontSize:20,fontStyle:"italic",color:on?lender.color:T.ink,lineHeight:1}}>{mxn(perPd)}</p>
                  <p style={{fontSize:10,color:T.ghost,marginTop:2}}>/{pdL}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Smart complement suggestion ────────────────────────────── */
function ComplementSuggestion({ walletBalance, price, onAdd }) {
  const gap      = price - walletBalance;
  const cheapest = BNPL_LENDERS.reduce((best, l) => {
    const avail = l.line - l.used;
    if (avail < gap) return best;
    const pl  = l.plans[0];
    const pmt = gap * (1 + pl.r) / pl.n;
    if (!best || pmt < best.pmt) return { l, pl, pmt, avail };
    return best;
  }, null);
  if (!cheapest) return null;
  return (
    <div style={{
      background:`linear-gradient(135deg,${cheapest.l.color}0A,${cheapest.l.gto}06)`,
      borderRadius:14, padding:"13px 14px",
      border:`1.5px solid ${cheapest.l.color}28`,
      boxShadow:`0 2px 12px ${cheapest.l.color}0A`,
    }}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
        <span style={{fontSize:16}}>💡</span>
        <p style={{fontSize:13,fontWeight:700,color:T.ink}}>
          Te faltan {mxn(gap)} · {cheapest.l.name} los cubre
        </p>
      </div>
      <p style={{fontSize:11,color:T.sub,marginBottom:10,lineHeight:1.5}}>
        {mxn(cheapest.pmt)}/{cheapest.l.periodLabel} adicionales con {cheapest.l.name}
      </p>
      <button onClick={()=>onAdd(cheapest.l.id)} style={{
        width:"100%", padding:"9px", borderRadius:9,
        background:`linear-gradient(135deg,${cheapest.l.gfrom},${cheapest.l.gto})`,
        border:"none", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer",
        boxShadow:`0 3px 10px ${cheapest.l.color}33`,
      }}>
        Completar con {cheapest.l.name}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHECKOUT SCREEN
═══════════════════════════════════════════════════════════════ */
function CheckoutScreen({ p, address, onBack, onPay, linkedLenders=[], onCashriOnboarding }) {
  const PRICE = p.price;

  // Only linked lenders appear in checkout; unlinked lenders are hidden
  const LINKED = BNPL_LENDERS.filter(l => linkedLenders.includes(l.id));
  const hasLinked = LINKED.length > 0;

  // Default first slot: first linked lender if any, else wallet
  const defaultSlot = hasLinked
    ? { id: LINKED[0].id, amount: PRICE }
    : { id: "cashri_wallet", amount: Math.min(WALLET.balance, PRICE) };

  const [slots,     setSlots]    = useState([defaultSlot]);
  const [planIdx,   setPlanIdx]  = useState({ aplazo:0, creditea:0, payjoy:0 });
  const [planSheet, setPlanSheet]= useState(null);
  const [addCard,   setAddCard]  = useState(false);
  const [step,      setStep]     = useState("pay");
  const [poppedId,  setPoppedId] = useState(null); // for toggle micro-feedback
  const [collapsed, setCollapsed] = useState(false); // compact split summary

  const isSplit   = slots.length > 1;
  const covered   = slots.reduce((a,s)=>a+s.amount, 0);
  const remaining = Math.max(0, PRICE - covered);
  const balanced  = remaining < 1;
  const totalDebt = slots.reduce((acc,s)=>{
    const l=lenderOf(s.id), pl=l?l.plans[planIdx[l.id]??0]:null;
    return acc+(pl?s.amount*(1+pl.r):s.amount);
  },0);
  const primaryLender = lenderOf(slots[0]?.id);
  const activePlan    = primaryLender ? primaryLender.plans[planIdx[primaryLender.id]??0] : null;
  const walletOnly    = slots.length===1 && slots[0].id==="cashri_wallet";
  const walletShort   = walletOnly && WALLET.balance < PRICE;

  const hasSlot = id => slots.some(s=>s.id===id);
  const canAdd  = id => {
    if (hasSlot(id)) return false;
    if (id==="paypal") return false;
    if (id==="amex1" && slots.some(s=>s.id==="amex1")) return false;
    return true;
  };
  const addSlot = id => {
    if (!canAdd(id)) return;
    const newAmt = Math.min(maxFor(id), Math.round(PRICE/2));
    setSlots(prev => balanceSlots([...prev,{id,amount:0}], id, newAmt, PRICE));
    setPoppedId(id);
    setTimeout(()=>setPoppedId(null), 400);
  };
  const removeSlot = id => {
    if (slots.length<=1) return;
    const removed = slots.find(s=>s.id===id)?.amount??0;
    setSlots(prev=>{
      const rest=prev.filter(s=>s.id!==id);
      return rest.map((s,i)=>i===0?{...s,amount:Math.min(maxFor(s.id),s.amount+removed)}:s);
    });
  };
  const setAmt = (id,val) => setSlots(prev=>balanceSlots(prev,id,val,PRICE));

  // Methods list: only linked lenders + wallet + card
  const ALL_ADDABLE = [
    ...LINKED.map(l=>({id:l.id, avail:l.line-l.used, color:l.color, name:l.name})),
    {id:"cashri_wallet", avail:WALLET.balance, color:"#7C3AED", name:"Cashri Wallet"},
    {id:"amex1", avail:PRICE, color:T.blue, name:`Amex ${AMEX.last4}`},
  ];

  return (
    <div style={{background:T.bg,display:"flex",flexDirection:"column",flex:1,overflow:"hidden",position:"relative"}}>

      {/* ── Header ── */}
      <div style={{
        background:`linear-gradient(160deg,${T.blueInk} 0%,${T.blueMid} 100%)`,
        padding:"14px 20px",flexShrink:0,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        boxShadow:"0 2px 16px rgba(0,28,80,0.18)",
      }}>
        <button
          onClick={step==="confirm"?()=>setStep("pay"):onBack}
          style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.13)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff",flexShrink:0}}
        ><ChevLeft/></button>
        <span style={{fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.2px"}}>
          {step==="pay" ? "¿Cómo lo vas a pagar?" : "Confirmar pedido"}
        </span>
        <div style={{width:36}}/>
      </div>

      {/* ── Scrollable body ── */}
      <div style={{flex:1,overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
        <div style={{padding:"14px 16px",display:"flex",flexDirection:"column",gap:10,paddingBottom:32}}>

          {/* Order strip */}
          <div style={{
            background:T.surface,borderRadius:14,
            padding:"11px 14px",
            border:`1px solid ${T.line}`,
            display:"flex",alignItems:"center",gap:12,
            boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <div style={{width:38,height:38,background:`${T.blue}0D`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{p.emoji}</div>
            <div style={{flex:1,minWidth:0}}>
              <p style={{fontSize:12,fontWeight:700,color:T.ink,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</p>
              <p style={{fontSize:10,color:T.sub,marginTop:1}}>Llega sáb. 21 mar · Envío gratis</p>
            </div>
            <p style={{fontFamily:"'Fraunces',serif",fontSize:18,fontStyle:"italic",color:T.ink,flexShrink:0,lineHeight:1}}>{mxn(PRICE)}</p>
          </div>

          {/* ══════════════ PAY STEP ══════════════ */}
          {step==="pay" && (<>

            {/* ── Split compact summary (2+ methods) ── */}
            {isSplit && (
              <div
                onClick={()=>setCollapsed(c=>!c)}
                style={{
                  background:T.surface,borderRadius:12,
                  padding:"10px 14px",
                  border:`1px solid ${T.blue}22`,
                  display:"flex",alignItems:"center",gap:10,
                  cursor:"pointer",
                }}
              >
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontSize:11,color:T.sub,marginBottom:2}}>Pagando con</p>
                  <p style={{fontSize:13,fontWeight:700,color:T.ink,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {slots.map(s=>nameOf(s.id)).join(" + ")}
                  </p>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <p style={{fontFamily:"'Fraunces',serif",fontSize:16,fontStyle:"italic",color:T.blueDeep}}>{mxn(totalDebt)}</p>
                  <p style={{fontSize:10,color:T.sub}}>{collapsed?"Ver detalle ▾":"Ocultar ▴"}</p>
                </div>
              </div>
            )}

            {/* ── Cashri entry banner when no lenders linked ── */}
            {!hasLinked && (
              <div
                onClick={onCashriOnboarding}
                style={{
                  background:`linear-gradient(135deg,#7C3AED12,#5B21B608)`,
                  borderRadius:14,
                  border:`1.5px solid #7C3AED28`,
                  padding:"13px 15px",
                  display:"flex",alignItems:"center",gap:12,
                  cursor:"pointer",
                  boxShadow:`0 2px 12px #7C3AED0C`,
                }}
              >
                <div style={{
                  width:38,height:38,borderRadius:10,flexShrink:0,
                  background:"linear-gradient(135deg,#7C3AED,#5B21B6)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                }}>
                  <Spark size={17} color="rgba(255,255,255,0.9)"/>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                    <p style={{fontSize:13,fontWeight:700,color:T.ink}}>Llévatelo con crédito Cashri</p>
                    <span style={{fontSize:9,fontWeight:700,background:"#7C3AED",color:"#fff",padding:"2px 6px",borderRadius:999,animation:"pulse 2s ease-in-out infinite",flexShrink:0}}>NUEVO</span>
                  </div>
                  <p style={{fontSize:11,color:T.sub}}>¿Sabías que puedes dividir esto en plazos sin banco ni tarjeta?</p>
                </div>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth={2.5} strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            )}

            {/* Active slot cards — hidden when collapsed in split mode */}
            {(!isSplit || !collapsed) && slots.map(s=>{
              const l     = lenderOf(s.id);
              // Hide unlinked lender slots
              if (l && !linkedLenders.includes(l.id)) return null;
              const col   = colorOf(s.id);
              const pl    = l ? l.plans[planIdx[l.id]??0] : null;
              const tot   = pl ? s.amount*(1+pl.r) : s.amount;
              const perPd = pl ? tot/pl.n : null;
              const isNew = poppedId === s.id;

              return (
                <div key={s.id} className={isNew?"anim-slide-dn":""} style={{
                  background:T.surface,
                  borderRadius:16,
                  border:`1.5px solid ${col}28`,
                  overflow:"hidden",
                  boxShadow:`0 2px 16px ${col}0E, 0 1px 4px rgba(0,0,0,0.05)`,
                }}>

                  {/* Method identity row */}
                  <div style={{padding:"13px 14px 11px",display:"flex",alignItems:"center",gap:11}}>
                    <MethodIcon id={s.id} size={36}/>
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:1}}>{nameOf(s.id)}</p>
                      <p style={{fontSize:11,color:T.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        {l
                          ? `${l.desc} · ${mxn(l.line-l.used)} disp.`
                          : s.id==="cashri_wallet"
                            ? `Tu saldo · ${mxn(WALLET.balance)}`
                            : `${AMEX.exp} · ${AMEX.holder.split(" ")[0]}`
                        }
                      </p>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
                      <span style={{fontFamily:"'Fraunces',serif",fontSize:17,fontStyle:"italic",color:col,fontWeight:700,lineHeight:1}}>{mxn(s.amount)}</span>
                      {slots.length>1 && (
                        <button
                          onClick={()=>removeSlot(s.id)}
                          style={{width:20,height:20,borderRadius:"50%",background:T.lineLight,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:T.ghost,fontSize:12,lineHeight:1,flexShrink:0,padding:0}}
                        >×</button>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  {(isSplit || l) && <div style={{height:1,background:T.lineLight,margin:"0 14px"}}/>}

                  {/* Split amount stepper */}
                  {isSplit && (
                    <div style={{padding:"9px 14px",display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:11,color:T.sub,fontWeight:600,flex:1}}>Monto</span>
                      <div style={{
                        display:"flex",alignItems:"center",gap:4,
                        background:T.surfaceAlt,borderRadius:9,
                        border:`1px solid ${col}22`,padding:"3px 5px",
                      }}>
                        <button
                          onClick={e=>{e.stopPropagation();setAmt(s.id,s.amount-100);}}
                          style={{width:26,height:26,borderRadius:7,border:`1px solid ${T.line}`,background:"#fff",color:T.body,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,lineHeight:1,fontWeight:400}}
                        >−</button>
                        <input
                          type="number" value={s.amount}
                          min={0} max={Math.min(maxFor(s.id),PRICE)} step={1}
                          onChange={e=>setAmt(s.id,Number(e.target.value))}
                          style={{width:80,textAlign:"center",border:"none",background:"transparent",fontFamily:"'Fraunces',serif",fontSize:16,fontStyle:"italic",color:col,fontWeight:700,outline:"none"}}
                        />
                        <button
                          onClick={e=>{e.stopPropagation();setAmt(s.id,s.amount+100);}}
                          style={{width:26,height:26,borderRadius:7,border:`1px solid ${T.line}`,background:"#fff",color:T.body,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,lineHeight:1,fontWeight:400}}
                        >+</button>
                      </div>
                    </div>
                  )}

                  {/* Plan selector row — tappable, opens bottom sheet */}
                  {l && (
                    <div
                      onClick={e=>{e.stopPropagation();setPlanSheet(l.id);}}
                      style={{
                        padding:"10px 14px",
                        display:"flex",alignItems:"center",justifyContent:"space-between",
                        cursor:"pointer",
                        background:T.surface,
                      }}
                    >
                      <div>
                        <p style={{fontSize:12,fontWeight:700,color:T.ink,marginBottom:2}}>{pl?.label}</p>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          {perPd && (
                            <span style={{fontSize:13,fontFamily:"'Fraunces',serif",fontStyle:"italic",color:col,fontWeight:700}}>{mxn(perPd)}/{l.periodShort}</span>
                          )}
                          <span style={{fontSize:11,color:T.sub}}>· Total {mxn(tot)}</span>
                        </div>
                      </div>
                      <div style={{
                        display:"flex",alignItems:"center",gap:4,
                        padding:"5px 10px",borderRadius:8,
                        background:`${col}0D`,border:`1px solid ${col}22`,
                      }}>
                        <span style={{fontSize:11,fontWeight:700,color:col}}>Cambiar</span>
                        <ChevDown/>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Split coverage bar */}
            {isSplit && (
              <div style={{
                background:T.surface,borderRadius:12,
                padding:"10px 14px",
                border:`1px solid ${balanced ? "#7C3AED28" : "#003DA522"}`,
                boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
              }}>
                <div style={{height:5,background:T.line,borderRadius:999,overflow:"hidden",display:"flex",marginBottom:8}}>
                  {slots.map(s=>(
                    <div key={s.id} style={{width:`${(s.amount/PRICE)*100}%`,background:colorOf(s.id),transition:"width 0.3s ease"}}/>
                  ))}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                    {slots.map(s=>(
                      <span key={s.id} style={{fontSize:11,display:"flex",alignItems:"center",gap:4}}>
                        <span style={{width:6,height:6,borderRadius:"50%",background:colorOf(s.id),display:"inline-block",flexShrink:0}}/>
                        <strong style={{color:colorOf(s.id),fontWeight:700}}>{mxn(s.amount)}</strong>
                      </span>
                    ))}
                  </div>
                  <span style={{fontSize:11,fontWeight:700,color:balanced?"#7C3AED":"#003DA5"}}>
                    {balanced?"✓ Cubierto":`Faltan ${mxn(remaining)}`}
                  </span>
                </div>
              </div>
            )}

            {/* Smart complement */}
            {walletShort && (
              <ComplementSuggestion
                walletBalance={WALLET.balance}
                price={PRICE}
                onAdd={id=>addSlot(id)}
              />
            )}

            {/* ── Method toggle list ── */}
            <div style={{
              background:T.surface,borderRadius:16,
              overflow:"hidden",
              border:`1px solid ${T.line}`,
              boxShadow:"0 1px 6px rgba(0,0,0,0.05)",
            }}>
              <div style={{padding:"12px 16px 8px",borderBottom:`1px solid ${T.lineLight}`}}>
                <p style={{fontSize:12,fontWeight:700,color:T.ink}}>Métodos de pago</p>
                <p style={{fontSize:11,color:T.sub,marginTop:1}}>Activa uno o combina varios</p>
              </div>

              {ALL_ADDABLE.map((m,mi)=>{
                const active  = hasSlot(m.id);
                const blocked = !active && !canAdd(m.id);
                const isLast  = mi===ALL_ADDABLE.length-1;
                const l       = lenderOf(m.id);
                const partial = !l && m.avail < PRICE;

                return (
                  <div key={m.id} style={{borderBottom:isLast?"none":`1px solid ${T.lineLight}`,opacity:blocked?0.36:1}}>
                    <div
                      onClick={()=>!blocked&&(active?removeSlot(m.id):addSlot(m.id))}
                      style={{padding:"11px 16px",display:"flex",alignItems:"center",gap:12,cursor:blocked?"not-allowed":"pointer"}}
                    >
                      <MethodIcon id={m.id} size={34}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                          <p style={{fontSize:13,fontWeight:700,color:T.ink}}>{m.name}</p>
                          {l && <span style={{background:l.badgeBg,color:l.badgeText,fontSize:"9px",fontWeight:700,padding:"2px 6px",borderRadius:999,letterSpacing:"0.2px"}}>{l.badge}</span>}
                          {partial && <span style={{fontSize:10,color:T.blue,fontWeight:600}}>Saldo parcial</span>}
                        </div>
                        <p style={{fontSize:11,color:T.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                          {l ? `${l.desc} · ${mxn(m.avail)} disp.`
                             : m.id==="cashri_wallet" ? `Tu saldo · ${mxn(m.avail)}`
                             : `${AMEX.exp} · ${AMEX.holder.split(" ")[0]}`}
                        </p>
                      </div>
                      {/* Toggle */}
                      <div className={active?"anim-pop":""} style={{
                        width:42,height:24,borderRadius:12,flexShrink:0,
                        background:active?(l?.color??colorOf(m.id)):T.line,
                        position:"relative",transition:"background 0.2s ease",
                        boxShadow:active?`0 2px 6px ${(l?.color??colorOf(m.id))}44`:"none",
                      }}>
                        <div style={{
                          position:"absolute",top:2,
                          left:active?18:2,
                          width:20,height:20,borderRadius:"50%",
                          background:"#fff",
                          boxShadow:"0 1px 4px rgba(0,0,0,0.18)",
                          transition:"left 0.2s ease",
                        }}/>
                      </div>
                    </div>
                    {blocked && (
                      <p style={{fontSize:11,color:T.blue,padding:"0 16px 8px",marginTop:-2}}>
                        {m.id==="paypal"?"PayPal no se puede combinar":"No puedes combinar dos tarjetas"}
                      </p>
                    )}
                  </div>
                );
              })}

              {/* Add card row */}
              <div style={{borderTop:`1px solid ${T.lineLight}`}}>
                <button
                  onClick={()=>setAddCard(true)}
                  style={{width:"100%",padding:"11px 16px",display:"flex",alignItems:"center",gap:12,background:"none",border:"none",cursor:"pointer"}}
                >
                  <div style={{width:34,height:34,borderRadius:9,background:T.surfaceAlt,border:`1.5px dashed ${T.line}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth={2.5} strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                  <div style={{textAlign:"left"}}>
                    <p style={{fontSize:13,fontWeight:600,color:T.blue}}>Agregar tarjeta</p>
                    <p style={{fontSize:11,color:T.sub}}>Crédito o débito</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Grace note */}
            <div style={{
              background:"#EFF6FF",borderRadius:11,
              padding:"9px 13px",
              border:`1px solid ${T.blue}18`,
              display:"flex",gap:7,alignItems:"flex-start",
            }}>
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth={2} strokeLinecap="round" style={{flexShrink:0,marginTop:1}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p style={{fontSize:11,color:T.blue,lineHeight:1.45}}>
                <strong>30 días sin costo.</strong> Paga todo antes y no te cobran nada extra.
              </p>
            </div>

          </>)}

          {/* ══════════════ CONFIRM STEP ══════════════ */}
          {step==="confirm" && (<>

            {/* Payment summary card */}
            <div style={{
              background:T.surface,borderRadius:16,
              overflow:"hidden",
              border:`1px solid ${T.line}`,
              boxShadow:"0 2px 12px rgba(0,0,0,0.06)",
            }}>
              {/* Gradient header */}
              <div style={{
                background:`linear-gradient(140deg,${primaryLender?.gfrom??T.blueDeep} 0%,${primaryLender?.gto??T.blueInk} 100%)`,
                padding:"16px",
              }}>
                <p style={{fontSize:10,color:"rgba(255,255,255,0.5)",letterSpacing:"1.2px",fontWeight:700,marginBottom:10}}>ASÍ QUEDÓ TU PAGO</p>
                {slots.map(s=>{
                  const l=lenderOf(s.id), col=colorOf(s.id);
                  const pl=l?l.plans[planIdx[l.id]??0]:null;
                  const tot=pl?s.amount*(1+pl.r):s.amount;
                  const perPd=pl?tot/pl.n:null;
                  return (
                    <div key={s.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                      <MethodIcon id={s.id} size={28}/>
                      <div style={{flex:1,minWidth:0}}>
                        <p style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:1}}>{nameOf(s.id)}</p>
                        {perPd&&<p style={{fontSize:10,color:"rgba(255,255,255,0.6)"}}>{mxn(perPd)}/{l?.periodLabel} · {pl?.label}</p>}
                      </div>
                      <div style={{textAlign:"right",flexShrink:0}}>
                        <p style={{fontSize:15,fontWeight:800,color:"#fff"}}>{mxn(s.amount)}</p>
                        {pl&&<p style={{fontSize:10,color:T.yellow}}>Total {mxn(tot)}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{padding:"10px 16px"}}>
                <button onClick={()=>setStep("pay")} style={{fontSize:12,color:T.blue,fontWeight:600,background:"none",border:"none",cursor:"pointer",padding:0}}>
                  ← Cambiar método
                </button>
              </div>
            </div>

            {/* Delivery */}
            <div style={{background:T.surface,borderRadius:14,padding:"13px 14px",border:`1px solid ${T.line}`,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
              <p style={{fontSize:10,fontWeight:700,color:T.sub,textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:7}}>Envío</p>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <p style={{fontSize:13,fontWeight:700,color:T.ink}}>Sáb, 21 de marzo</p>
                  <p style={{fontSize:11,color:T.sub,marginTop:2}}>{address?.name} · {address?.addr?.split(",")[0]}</p>
                </div>
                <span style={{fontSize:12,color:T.blue,fontWeight:600,cursor:"pointer"}}>Editar</span>
              </div>
            </div>

            {/* Totals */}
            <div style={{background:T.surface,borderRadius:14,padding:"13px 14px",border:`1px solid ${T.line}`,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
              {[
                ["Precio del producto", mxn(PRICE), T.ink],
                totalDebt>PRICE && ["Interés del plan", `+${mxn(totalDebt-PRICE)}`, T.blueDeep],
                ["Envío", "Gratis", "#7C3AED"],
              ].filter(Boolean).map(([k,v,c])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:7}}>
                  <span style={{color:T.sub}}>{k}</span>
                  <span style={{fontWeight:600,color:c}}>{v}</span>
                </div>
              ))}
              <div style={{borderTop:`1px solid ${T.line}`,paddingTop:10,marginTop:4,display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                <span style={{fontSize:14,fontWeight:700,color:T.ink}}>Total deuda</span>
                <span style={{fontFamily:"'Fraunces',serif",fontSize:22,fontStyle:"italic",color:T.ink}}>{mxn(totalDebt)}</span>
              </div>
              {activePlan&&<p style={{fontSize:10,color:T.ghost,marginTop:5,lineHeight:1.5}}>CAT {activePlan.cat}% s/IVA · {primaryLender?.graceDays} días gracia si pagas el total antes.</p>}
            </div>

          </>)}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{flexShrink:0,background:T.surface,borderTop:`1px solid ${T.line}`,padding:"12px 16px",boxShadow:"0 -2px 12px rgba(0,0,0,0.05)"}}>
        {step==="pay" && (
          <PrimaryButton
            color={balanced?(primaryLender?.color??T.blue):"#9CA3AF"}
            onClick={()=>{if(balanced)setStep("confirm");}}
            style={{opacity:balanced?1:0.55}}
          >
            {balanced ? "Continuar →" : `Faltan ${mxn(remaining)}`}
          </PrimaryButton>
        )}
        {step==="confirm" && (
          <PrimaryButton
            color={primaryLender?.color??T.blue}
            onClick={()=>onPay({p,slots,planIdx,totalDebt,activeLender:primaryLender,activePlan,PRICE})}
          >
            Confirmar · {mxn(totalDebt)}
          </PrimaryButton>
        )}
      </div>

      {/* Plan bottom sheet */}
      {planSheet && (()=>{
        const l = lenderOf(planSheet); if(!l) return null;
        const s = slots.find(x=>x.id===planSheet);
        return (
          <PlanSheet
            lender={l}
            baseAmount={s?.amount??PRICE}
            currentIdx={planIdx[l.id]??0}
            onSelect={i=>{setPlanIdx(prev=>({...prev,[l.id]:i}));setPlanSheet(null);}}
            onClose={()=>setPlanSheet(null)}
          />
        );
      })()}

      {/* Add card sheet */}
      {addCard && (
        <div style={{position:"absolute",inset:0,background:"rgba(10,22,40,0.55)",zIndex:400,display:"flex",alignItems:"flex-end",backdropFilter:"blur(2px)"}} onClick={()=>setAddCard(false)}>
          <div style={{background:T.surface,borderRadius:"20px 20px 0 0",width:"100%",padding:"20px 20px 36px",boxShadow:"0 -8px 40px rgba(0,0,0,0.16)"}} onClick={e=>e.stopPropagation()}>
            <div style={{width:36,height:4,background:T.line,borderRadius:999,margin:"0 auto 18px"}}/>
            <p style={{fontSize:16,fontWeight:800,color:T.ink,marginBottom:3}}>Agregar tarjeta</p>
            <p style={{fontSize:12,color:T.sub,marginBottom:18}}>Encriptado con TLS 🔒</p>
            {[{l:"Número de tarjeta",ph:"1234 5678 9012 3456"},{l:"Nombre en la tarjeta",ph:"Como aparece en la tarjeta"}].map(f=>(
              <div key={f.l} style={{marginBottom:11}}>
                <p style={{fontSize:12,fontWeight:600,color:T.body,marginBottom:4}}>{f.l}</p>
                <div style={{background:T.surfaceAlt,border:`1.5px solid ${T.line}`,borderRadius:10,padding:"11px 13px",fontSize:13,color:T.ghost}}>{f.ph}</div>
              </div>
            ))}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
              {[{l:"Vencimiento",ph:"MM / AA"},{l:"CVV",ph:"•••"}].map(f=>(
                <div key={f.l}>
                  <p style={{fontSize:12,fontWeight:600,color:T.body,marginBottom:4}}>{f.l}</p>
                  <div style={{background:T.surfaceAlt,border:`1.5px solid ${T.line}`,borderRadius:10,padding:"11px 13px",fontSize:13,color:T.ghost}}>{f.ph}</div>
                </div>
              ))}
            </div>
            <PrimaryButton onClick={()=>setAddCard(false)}>Guardar tarjeta</PrimaryButton>
          </div>
        </div>
      )}

    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   SCREEN: CREDIT LANDING
═══════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════
   SCREEN: EXISTING CREDIT LINE
═══════════════════════════════════════════════════════════════ */
// Simulated existing credit — Aplazo already approved this user
const EXISTING_CREDIT = {
  lender: BNPL_LENDERS[0], // Aplazo
  line: 12000,
  used: 3400,
  since: "feb. 2024",
};

/* ═══════════════════════════════════════════════════════════════
   SCREEN: LINKED — cómo usar tu crédito
═══════════════════════════════════════════════════════════════ */
function LinkedScreen({ lender, avail, onBack, onShop, onLinked }) {
  const steps = [
    {
      n:"01",
      icon:"🛒",
      title:"Cualquier artículo",
      body:"Úsalo en electrónica, despensa, moda, hogar y más. Sin restricciones de categoría.",
    },
    {
      n:"02",
      icon:"✦",
      title:"Ya aparece en tu checkout",
      body:"Tu línea Cashri estará visible automáticamente cada vez que vayas a pagar. Sin pasos extra.",
      highlight: true,
    },
    {
      n:"03",
      icon:"🏪",
      title:"En tiendas físicas",
      body:"Presenta el código Cashri en caja en NovaSuper, DepóMax y ClubPlus.",
    },
    {
      n:"04",
      icon:"📱",
      title:"En línea",
      body:"Compra en novasuper.mx y elige Cashri como método de pago al checkout.",
    },
    {
      n:"05",
      icon:"📅",
      title:"Elige tu plazo al pagar",
      body:"Seleccionas el número de catorcenas, quincenas o semanas que prefieras en cada compra.",
    },
    {
      n:"06",
      icon:"🔔",
      title:"Paga a tiempo y crece",
      body:"Cada pago puntual aumenta tu línea. Recibirás recordatorios antes de cada fecha.",
    },
  ];

  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:T.bg}}>

      {/* Hero — gradient del lender */}
      <div style={{
        background:`linear-gradient(150deg,${lender.gfrom} 0%,${lender.gto} 100%)`,
        padding:"0 0 28px", flexShrink:0, position:"relative", overflow:"hidden",
      }}>
        <div style={{position:"absolute",top:-40,right:-30,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.05)"}}/>
        <div style={{position:"absolute",bottom:-24,left:"5%",width:100,height:100,borderRadius:"50%",background:`${T.yellow}14`}}/>

        <div style={{padding:"14px 20px 0"}}>
          <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.12)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}>
            <ChevLeft/>
          </button>
        </div>

        <div style={{padding:"14px 24px 0",position:"relative",zIndex:1}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.12)",borderRadius:R.full,padding:"4px 12px",marginBottom:12}}>
            <LenderIcon lender={lender} size={18}/>
            <span style={{fontSize:10,color:"#fff",fontWeight:700,letterSpacing:"1px"}}>{lender.name.toUpperCase()} · CASHI</span>
          </div>
          <p style={{fontFamily:"'Fraunces',serif",fontSize:24,fontStyle:"italic",color:"#fff",lineHeight:1.2,marginBottom:6}}>
            ¡Tu crédito está listo.<br/>Empieza a usarlo.
          </p>
          {/* Credit line pill */}
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.15)",borderRadius:12,padding:"8px 14px",marginTop:4}}>
            <span style={{fontSize:11,color:"rgba(255,255,255,0.7)",fontWeight:600}}>Disponible</span>
            <span style={{fontFamily:"'Fraunces',serif",fontSize:20,fontStyle:"italic",color:"#fff",fontWeight:700,lineHeight:1}}>{mxn(avail)}</span>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div style={{flex:1,overflowY:"auto"}}>
        <div style={{padding:"16px 16px 32px",display:"flex",flexDirection:"column",gap:8}}>

          <p style={{fontSize:11,fontWeight:700,color:T.sub,textTransform:"uppercase",letterSpacing:"0.7px",paddingLeft:2,marginBottom:2}}>Cómo usar tu crédito</p>

          {steps.map((s,i)=>(
            <div key={i} style={{
              background: s.highlight ? `${lender.color}08` : T.surface,
              borderRadius:14,
              padding:"10px 13px",
              display:"flex", alignItems:"flex-start", gap:11,
              border:`1.5px solid ${s.highlight ? lender.color+"44" : T.line}`,
              boxShadow: s.highlight ? `0 0 0 3px ${lender.color}10` : "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <div style={{
                width:34, height:34, borderRadius:9, flexShrink:0,
                background: s.highlight ? `${lender.color}18` : `${lender.color}0E`,
                border:`1px solid ${s.highlight ? lender.color+"33" : lender.color+"22"}`,
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                {s.icon==="✦" ? <Spark size={15} color={lender.color}/> : <span style={{fontSize:16}}>{s.icon}</span>}
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:2}}>
                  <span style={{fontSize:9,fontWeight:800,color:lender.color,letterSpacing:"0.5px"}}>{s.n}</span>
                  <p style={{fontSize:13,fontWeight:700,color:T.ink}}>{s.title}</p>
                  {s.highlight && (
                    <span style={{fontSize:9,fontWeight:700,background:lender.color,color:"#fff",padding:"2px 7px",borderRadius:999,letterSpacing:"0.3px"}}>NUEVO</span>
                  )}
                </div>
                <p style={{fontSize:11,color:T.sub,lineHeight:1.5}}>{s.body}</p>
              </div>
            </div>
          ))}

          {/* Reminder note */}
          <div style={{background:"#EFF6FF",borderRadius:12,padding:"11px 14px",border:`1px solid ${T.blue}20`,display:"flex",gap:8,alignItems:"flex-start",marginTop:4}}>
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth={2} strokeLinecap="round" style={{flexShrink:0,marginTop:1}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p style={{fontSize:11,color:T.blue,lineHeight:1.5}}>
              <strong>30 días sin cargo.</strong> Si pagas el total en ese plazo, no se aplica ningún interés.
            </p>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div style={{flexShrink:0,background:T.surface,borderTop:`1px solid ${T.line}`,padding:"13px 16px",boxShadow:"0 -2px 12px rgba(0,0,0,0.05)"}}>
        <PrimaryButton color={lender.color} onClick={onShop}>
          ¡Ir a comprar!
        </PrimaryButton>
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCREEN: EXISTING CREDIT
════════════════════════════════════���══════════════════════════ */
function ExistingCreditScreen({ onBack, onShop, onLinked }) {
  const { lender, line, used, since } = EXISTING_CREDIT;
  const avail = line - used;
  const usedPct = Math.round((used / line) * 100);
  const [linked, setLinked] = useState(false);

  if (linked) return <LinkedScreen lender={lender} avail={avail} onBack={()=>setLinked(false)} onShop={onShop}/>;

  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:T.bg}}>

      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${T.blueInk},${T.blueMid})`,padding:"14px 20px",flexShrink:0,display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.12)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff",flexShrink:0}}><ChevLeft/></button>
        <span style={{fontSize:15,fontWeight:700,color:"#fff"}}>Tu crédito Cashri</span>
      </div>

      <div style={{flex:1,overflowY:"auto"}}>
        <div style={{padding:"20px 16px",display:"flex",flexDirection:"column",gap:8}}>

          {/* Status banner */}
          <div style={{background:`${T.blueDeep}08`,borderRadius:14,padding:"12px 16px",border:`1px solid ${T.blueDeep}22`,display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:T.blue,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <div>
              <p style={{fontSize:13,fontWeight:700,color:T.ink}}>Ya tienes una línea activa</p>
              <p style={{fontSize:11,color:T.sub}}>Activa desde {since}</p>
            </div>
          </div>

          {/* Lender card */}
          <div style={{background:T.surface,borderRadius:16,overflow:"hidden",border:`1px solid ${T.line}`,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>

            {/* Lender identity */}
            <div style={{padding:"16px",display:"flex",alignItems:"center",gap:12,borderBottom:`1px solid ${T.lineLight}`}}>
              <LenderIcon lender={lender} size={44}/>
              <div>
                <p style={{fontSize:16,fontWeight:800,color:T.ink,marginBottom:2}}>{lender.name}</p>
                <p style={{fontSize:11,color:T.sub}}>Otorgado por {lender.name} vía Cashri</p>
              </div>
            </div>

            {/* Credit line details */}
            <div style={{padding:"16px"}}>

              {/* Available amount — hero */}
              <div style={{textAlign:"center",marginBottom:16}}>
                <p style={{fontSize:11,color:T.sub,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:4}}>Disponible ahora</p>
                <p style={{fontFamily:"'Fraunces',serif",fontSize:36,fontStyle:"italic",color:lender.color,lineHeight:1}}>{mxn(avail)}</p>
              </div>

              {/* Progress bar */}
              <div style={{marginBottom:8}}>
                <div style={{height:8,background:T.line,borderRadius:999,overflow:"hidden",marginBottom:6}}>
                  <div style={{
                    height:"100%",
                    width:`${usedPct}%`,
                    background:`linear-gradient(90deg,${lender.gfrom},${lender.gto})`,
                    borderRadius:999,
                    transition:"width 0.6s ease",
                  }}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:11,color:T.sub}}>Usado <strong style={{color:T.ink}}>{mxn(used)}</strong></span>
                  <span style={{fontSize:11,color:T.sub}}>Línea total <strong style={{color:T.ink}}>{mxn(line)}</strong></span>
                </div>
              </div>

              {/* Stats row */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginTop:10}}>
                {[
                  {label:"Plazos disponibles", value:`Hasta ${lender.plans[lender.plans.length-1].n} ${lender.periodLabel}s`},
                  {label:"Próximo pago", value:"Sin saldo pendiente"},
                ].map(item=>(
                  <div key={item.label} style={{background:T.surfaceAlt,borderRadius:10,padding:"10px 12px",border:`1px solid ${T.line}`}}>
                    <p style={{fontSize:10,color:T.ghost,marginBottom:3}}>{item.label}</p>
                    <p style={{fontSize:12,fontWeight:700,color:T.ink}}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legal */}
          <p style={{fontSize:10,color:T.ghost,lineHeight:1.5,padding:"0 2px"}}>
            * Crédito otorgado por {lender.name} mediante convenio con Cashri. Sujeto a términos y condiciones.
          </p>

        </div>
      </div>

      {/* CTA */}
      <div style={{flexShrink:0,background:T.surface,borderTop:`1px solid ${T.line}`,padding:"14px 20px",boxShadow:"0 -2px 12px rgba(0,0,0,0.05)"}}>
        <PrimaryButton color={lender.color} onClick={()=>{ onLinked?.(lender.id); setLinked(true); }}>
          Vincular mi cuenta
        </PrimaryButton>
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCREEN: NEW CREDIT FORM
═══════════════════════════════════════════════════════════════ */
function NewCreditFormScreen({ onBack, onShop, linkedLenders=[], kycDone=false, onLinked }) {
  const [form,     setForm]     = useState({ nombre:"", apellido:"", telefono:"", curp:"", ingreso:"" });
  const [consent,  setConsent]  = useState({ terceros:false, buro:false });
  const [step,     setStep]     = useState(0);
  const [checking, setChecking] = useState(false);
  const [result,   setResult]   = useState(null);

  const set = (k,v) => setForm(prev=>({...prev,[k]:v}));

  const canNext0 = form.nombre.trim() && form.apellido.trim() && form.telefono.length >= 10;
  const canNext1 = form.curp.length >= 18 && form.ingreso && consent.terceros && consent.buro;

  // Available lenders = those NOT already linked
  const availableLenders = BNPL_LENDERS.filter(l => !linkedLenders.includes(l.id));

  // Pick a random available lender
  const pickRandom = (lenders) => lenders[Math.floor(Math.random() * lenders.length)];

  const submitCurp = () => {
    setChecking(true);
    setTimeout(() => {
      if (availableLenders.length === 0) { setResult("none"); setChecking(false); return; }
      const roll = Math.random();
      if (roll < 0.25) {
        setResult("none");
      } else {
        // Pick randomly from available lenders — never a linked one
        const picked = pickRandom(availableLenders);
        setResult({ offers: [{ lender: picked }] });
      }
      setChecking(false);
    }, 2000);
  };

  // If KYC already done, skip form and go straight to offer
  useEffect(()=>{
    if (!kycDone) return;
    setChecking(true);
    setTimeout(()=>{
      if (availableLenders.length === 0) {
        setResult("none");
      } else {
        setResult({ offers: [{ lender: pickRandom(availableLenders) }] });
      }
      setChecking(false);
    }, 1400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show loading screen while checking (covers both kycDone skip and submitCurp)
  if (checking) return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:T.bg}}>
      <div style={{background:`linear-gradient(135deg,${T.blueInk},${T.blueMid})`,padding:"14px 20px",flexShrink:0,display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.12)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}><ChevLeft/></button>
        <span style={{fontSize:15,fontWeight:700,color:"#fff"}}>Solicitando crédito</span>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 32px",display:"flex",flexDirection:"column",gap:12}}>
        <div style={{textAlign:"center",padding:"20px 0 8px"}}>
          <div style={{width:40,height:40,borderRadius:"50%",border:"3px solid #7C3AED22",borderTopColor:"#7C3AED",animation:"spin 0.9s linear infinite",margin:"0 auto 12px"}}/>
          <p style={{fontSize:13,fontWeight:600,color:T.sub}}>
            {kycDone ? "Buscando nueva oferta…" : "Consultando lenders…"}
          </p>
        </div>
        {/* Skeleton cards */}
        {[1,2].map(i=>(
          <div key={i} style={{background:T.surface,borderRadius:16,overflow:"hidden",border:`1px solid ${T.line}`}}>
            <div style={{background:`linear-gradient(135deg,${T.blueDeep}18,${T.blueInk}10)`,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:T.line,animation:"pulse 1.4s ease-in-out infinite"}}/>
              <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
                <div style={{height:12,width:"50%",background:T.line,borderRadius:6,animation:"pulse 1.4s ease-in-out infinite"}}/>
                <div style={{height:10,width:"70%",background:T.lineLight,borderRadius:6,animation:"pulse 1.4s ease-in-out infinite"}}/>
              </div>
              <div style={{width:60,height:20,background:T.line,borderRadius:6,animation:"pulse 1.4s ease-in-out infinite"}}/>
            </div>
            <div style={{padding:"12px 16px",display:"flex",flexDirection:"column",gap:8}}>
              <div style={{height:5,background:T.line,borderRadius:999,animation:"pulse 1.4s ease-in-out infinite"}}/>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{height:10,width:"35%",background:T.lineLight,borderRadius:6,animation:"pulse 1.4s ease-in-out infinite"}}/>
                <div style={{height:10,width:"25%",background:T.lineLight,borderRadius:6,animation:"pulse 1.4s ease-in-out infinite"}}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (result === "none") return <NoOfferScreen onBack={()=>setResult(null)} onShop={onShop}/>;
  if (result?.offers)   return <PreapprovedScreen offer={bestOffer(result.offers)} onBack={()=>setResult(null)} onShop={onShop} onLinked={onLinked}/>;

  const steps = [
    {
      title:"¿Cómo te llamas?",
      subtitle:"Solo necesitamos lo básico.",
      fields:[
        {key:"nombre",   label:"Nombre(s)",    ph:"María Fernanda", type:"text", inputmode:"text"},
        {key:"apellido", label:"Apellidos",     ph:"Avendaño Torres",type:"text", inputmode:"text"},
        {key:"telefono", label:"Celular",       ph:"55 1234 5678",   type:"tel",  inputmode:"tel"},
      ],
      canContinue: canNext0,
    },
    {
      title:"Casi listo",
      subtitle:"Necesitamos validar tu identidad.",
      fields:[
        {key:"curp",    label:"CURP",                  ph:"AATF900101MDFVRL09", type:"text",   inputmode:"text"},
        {key:"ingreso", label:"Ingreso mensual aprox.", ph:"",                   type:"select",
          options:["Menos de $5,000","$5,000 – $10,000","$10,000 – $20,000","$20,000 – $40,000","Más de $40,000"]},
      ],
      canContinue: canNext1,
    },
  ];

  const currentStep = steps[step];

  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:T.bg}}>

      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${T.blueInk},${T.blueMid})`,padding:"14px 20px",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <button onClick={step===0?onBack:()=>setStep(0)} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.12)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}><ChevLeft/></button>
          <span style={{fontSize:15,fontWeight:700,color:"#fff"}}>Solicitar crédito</span>
          <span style={{fontSize:12,color:"rgba(255,255,255,0.5)",fontWeight:600}}>{step+1} / {steps.length}</span>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.15)",borderRadius:999,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${((step+1)/steps.length)*100}%`,background:T.yellow,borderRadius:999,transition:"width 0.3s ease"}}/>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
        <div style={{padding:"22px 16px 32px"}}>

          <p style={{fontFamily:"'Fraunces',serif",fontSize:22,fontStyle:"italic",color:T.ink,marginBottom:3}}>{currentStep.title}</p>
          <p style={{fontSize:13,color:T.sub,marginBottom:22,lineHeight:1.5}}>{currentStep.subtitle}</p>

          {/* Fields */}
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            {currentStep.fields.map(f=>(
              <div key={f.key}>
                <p style={{fontSize:12,fontWeight:700,color:T.body,marginBottom:5}}>{f.label}</p>
                {f.type==="select" ? (
                  <select
                    value={form[f.key]}
                    onChange={e=>set(f.key,e.target.value)}
                    style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${form[f.key]?T.blue:T.line}`,background:T.surface,color:form[f.key]?T.ink:T.ghost,fontSize:14,outline:"none",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 14px center"}}
                  >
                    <option value="">Selecciona un rango</option>
                    {f.options.map(o=><option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={f.type} inputMode={f.inputmode}
                    placeholder={f.ph} value={form[f.key]}
                    onChange={e=>set(f.key,e.target.value)}
                    style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${form[f.key]?T.blue:T.line}`,background:T.surface,color:T.ink,fontSize:14,outline:"none",boxSizing:"border-box",transition:"border-color 0.15s"}}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Consent — only on step 2 */}
          {step===1 && (
            <div style={{marginTop:20,display:"flex",flexDirection:"column",gap:8}}>

              {/* Divider */}
              <div style={{display:"flex",alignItems:"center",gap:8,margin:"2px 0"}}>
                <div style={{flex:1,height:1,background:T.line}}/>
                <span style={{fontSize:10,color:T.ghost,fontWeight:600,letterSpacing:"0.5px"}}>AUTORIZACIONES</span>
                <div style={{flex:1,height:1,background:T.line}}/>
              </div>

              {/* Consent 1 — terceros */}
              <div
                onClick={()=>setConsent(c=>({...c,terceros:!c.terceros}))}
                style={{
                  display:"flex",alignItems:"flex-start",gap:12,
                  padding:"12px 14px",borderRadius:12,cursor:"pointer",
                  background:consent.terceros?`${T.blue}06`:T.surface,
                  border:`1.5px solid ${consent.terceros?T.blue:T.line}`,
                  transition:"all 0.15s",
                }}
              >
                <div style={{
                  width:20,height:20,borderRadius:5,flexShrink:0,marginTop:1,
                  background:consent.terceros?T.blue:T.surface,
                  border:`2px solid ${consent.terceros?T.blue:T.line}`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  transition:"all 0.15s",
                }}>
                  {consent.terceros&&<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <p style={{fontSize:12,color:T.body,lineHeight:1.5,flex:1}}>
                  Autorizo que mi información sea compartida con <strong style={{color:T.ink}}>terceros financieros</strong> asociados a Cashri para evaluar mi solicitud de crédito.{" "}
                  <span style={{color:T.blue,fontWeight:600,cursor:"pointer",textDecoration:"underline"}}>Ver aviso de privacidad</span>
                </p>
              </div>

              {/* Consent 2 — buró */}
              <div
                onClick={()=>setConsent(c=>({...c,buro:!c.buro}))}
                style={{
                  display:"flex",alignItems:"flex-start",gap:12,
                  padding:"12px 14px",borderRadius:12,cursor:"pointer",
                  background:consent.buro?`${T.blue}06`:T.surface,
                  border:`1.5px solid ${consent.buro?T.blue:T.line}`,
                  transition:"all 0.15s",
                }}
              >
                <div style={{
                  width:20,height:20,borderRadius:5,flexShrink:0,marginTop:1,
                  background:consent.buro?T.blue:T.surface,
                  border:`2px solid ${consent.buro?T.blue:T.line}`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  transition:"all 0.15s",
                }}>
                  {consent.buro&&<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <p style={{fontSize:12,color:T.body,lineHeight:1.5,flex:1}}>
                  Autorizo la consulta de mi historial en el <strong style={{color:T.ink}}>Buró de Crédito</strong> y otras entidades de información crediticia, conforme a la Ley para Regular las Sociedades de Información Crediticia.{" "}
                  <span style={{color:T.blue,fontWeight:600,cursor:"pointer",textDecoration:"underline"}}>Más información</span>
                </p>
              </div>

              {/* Required hint if fields filled but consents missing */}
              {form.curp.length>=18 && form.ingreso && (!consent.terceros||!consent.buro) && (
                <p style={{fontSize:11,color:T.blue,fontWeight:600,textAlign:"center"}}>
                  Acepta las autorizaciones para continuar
                </p>
              )}

            </div>
          )}

        </div>
      </div>

      {/* CTA */}
      <div style={{flexShrink:0,background:T.surface,borderTop:`1px solid ${T.line}`,padding:"13px 16px",boxShadow:"0 -2px 12px rgba(0,0,0,0.05)"}}>
        <PrimaryButton
          color={currentStep.canContinue && !checking ? T.blue : "#9CA3AF"}
          style={{opacity:currentStep.canContinue && !checking ? 1 : 0.5}}
          onClick={()=>{
            if (!currentStep.canContinue || checking) return;
            if (step < steps.length - 1) { setStep(s=>s+1); }
            else { submitCurp(); }
          }}
        >
          {checking
            ? <span style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center"}}>
                <span style={{width:14,height:14,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",display:"inline-block",animation:"spin 0.7s linear infinite"}}/>
                Validando con lenders...
              </span>
            : step < steps.length - 1 ? "Continuar" : "Verificar oferta"
          }
        </PrimaryButton>
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCREEN: PREAPPROVED OFFER
═══════════════════════════════════════════════════════════════ */
// Pick the best offer for the user (highest line, lowest first plan rate)
function bestOffer(offers) {
  return offers.reduce((best, o) => {
    const score = o.lender.line - o.lender.used - (o.lender.plans[0].r * 1000);
    const bScore = best.lender.line - best.lender.used - (best.lender.plans[0].r * 1000);
    return score > bScore ? o : best;
  });
}

const KYC_STEPS = [
  { icon:"🪪", title:"INE vigente",        body:"Ten a la mano tu credencial para votar por ambos lados." },
  { icon:"📸", title:"Permiso de cámara",   body:"Necesitaremos tomar una selfie para verificar tu identidad." },
  { icon:"🌐", title:"Permiso de ubicación",body:"Confirmamos que estás en México al momento de la solicitud." },
  { icon:"📱", title:"Número verificado",   body:"Te enviaremos un código SMS al celular que registraste." },
];

/* ─── KYC flow stages ────────────────────────────────────────── */
// stage: "offer" | "prep" | "ine_front" | "ine_back" | "selfie" | "validating" | "approved"

function KycIneFrame({ side, lender }) {
  // Simulated camera viewfinder for INE
  return (
    <div style={{position:"relative",width:"100%",aspectRatio:"1.6",background:"#0a0a0a",borderRadius:16,overflow:"hidden",margin:"20px 0"}}>
      {/* Corner guides */}
      {[["0%","0%","right","bottom"],["100%","0%","left","bottom"],["0%","100%","right","top"],["100%","100%","left","top"]].map(([l,t,br,bb],i)=>(
        <div key={i} style={{position:"absolute",left:l,top:t,transform:`translate(${l==="0%"?0:"-100%"},${t==="0%"?0:"-100%"})`,width:28,height:28,borderRight:br==="right"?`3px solid ${lender.color}`:"none",borderLeft:br==="left"?`3px solid ${lender.color}`:"none",borderBottom:bb==="bottom"?`3px solid ${lender.color}`:"none",borderTop:bb==="top"?`3px solid ${lender.color}`:"none",margin:12}}/>
      ))}
      {/* Card outline */}
      <div style={{position:"absolute",inset:"15%",border:`1.5px dashed rgba(255,255,255,0.25)`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8}}>
        <span style={{fontSize:28}}>🪪</span>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.6)",textAlign:"center",lineHeight:1.4}}>
          Coloca tu INE<br/>{side==="front"?"(frente)":"(reverso)"}
        </p>
      </div>
      {/* Scan line animation */}
      <div style={{position:"absolute",left:"15%",right:"15%",height:2,background:`linear-gradient(90deg,transparent,${lender.color},transparent)`,animation:"kycScan 2s ease-in-out infinite",top:"50%"}}/>
    </div>
  );
}

function KycSelfieFrame({ lender }) {
  return (
    <div style={{position:"relative",width:"100%",aspectRatio:"0.85",background:"#0a0a0a",borderRadius:16,overflow:"hidden",margin:"16px 0"}}>
      {/* Oval face guide */}
      <div style={{position:"absolute",top:"10%",left:"50%",transform:"translateX(-50%)",width:"62%",aspectRatio:"0.78",border:`2.5px solid ${lender.color}`,borderRadius:"50%",boxShadow:`0 0 0 4000px rgba(0,0,0,0.55)`,zIndex:2}}/>
      {/* Icons */}
      <div style={{position:"absolute",bottom:"12%",left:0,right:0,display:"flex",justifyContent:"center",gap:32,zIndex:3}}>
        {["😐","💡","📸"].map((e,i)=>(
          <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
            <span style={{fontSize:20}}>{e}</span>
            <p style={{fontSize:9,color:"rgba(255,255,255,0.5)",textAlign:"center"}}>{["Mira al frente","Buena luz","Sin flash"][i]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function KycValidating({ lender }) {
  const [tick, setTick] = useState(0);
  useEffect(()=>{
    const id = setInterval(()=>setTick(t=>t+1), 600);
    return ()=>clearInterval(id);
  },[]);
  const checks = [
    "Verificando identidad…",
    "Comparando con INE…",
    "Consultando Buró de Crédito…",
    "Aprobando línea de crédito…",
  ];
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 24px",gap:24}}>
      {/* Spinner */}
      <div style={{width:72,height:72,borderRadius:"50%",border:`4px solid ${lender.color}22`,borderTopColor:lender.color,animation:"spin 0.9s linear infinite"}}/>
      <div style={{textAlign:"center"}}>
        <p style={{fontFamily:"'Fraunces',serif",fontSize:20,fontStyle:"italic",color:T.ink,marginBottom:8}}>Validando tu información</p>
        <p style={{fontSize:13,color:lender.color,fontWeight:600,minHeight:20,transition:"all 0.3s"}}>{checks[Math.min(tick, checks.length-1)]}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,width:"100%",maxWidth:260}}>
        {checks.map((c,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:18,height:18,borderRadius:"50%",flexShrink:0,background:tick>i?lender.color:T.line,display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.3s"}}>
              {tick>i&&<svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <p style={{fontSize:12,color:tick>i?T.ink:T.ghost,fontWeight:tick>i?600:400,transition:"all 0.3s"}}>{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreapprovedScreen({ offer, onBack, onShop, onLinked }) {
  const { lender } = offer;
  const avail = lender.line - lender.used;
  const pl0   = lender.plans[0];
  const [stage,     setStage]     = useState("offer");
  const [capturing, setCapturing] = useState(false);

  // Auto-advance from validating → approved
  useEffect(() => {
    if (stage !== "validating") return;
    const id = setTimeout(() => setStage("approved"), 3200);
    return () => clearTimeout(id);
  }, [stage]);

  const capture = (nextStage) => {
    setCapturing(true);
    setTimeout(()=>{ setCapturing(false); setStage(nextStage); }, 1200);
  };

  if (stage === "linked") return <LinkedScreen lender={lender} avail={avail} onBack={()=>setStage("approved")} onShop={onShop} onLinked={onLinked}/>;

  // ── APPROVED ────────────────────────────────────────────────
  if (stage === "approved") return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",
      background:`linear-gradient(180deg,${lender.gfrom} 0%,${lender.gto} 38%,${T.bg} 38%)`}}>
      {/* Sparks top */}
      <div style={{padding:"40px 0 0",display:"flex",justifyContent:"center",gap:8,flexShrink:0}}>
        {[16,11,20,11,16].map((s,i)=>(<Spark key={i} size={s} color={i%2===0?T.yellow:"rgba(255,255,255,0.75)"}/>))}
      </div>
      <div style={{padding:"16px 24px 0",textAlign:"center",flexShrink:0}}>
        <p style={{fontSize:10,color:"rgba(255,255,255,0.65)",fontWeight:700,letterSpacing:"1.4px",marginBottom:8}}>¡VERIFICACIÓN COMPLETA!</p>
        <p style={{fontFamily:"'Fraunces',serif",fontSize:30,fontStyle:"italic",color:"#fff",lineHeight:1.2,marginBottom:6}}>
          ¡Felicidades!<br/>Ya tienes tu línea.
        </p>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.65)"}}>con {lender.name} vía Cashri</p>
      </div>

      {/* White card */}
      <div style={{flex:1,overflow:"hidden",padding:"0 16px",marginTop:24,display:"flex",flexDirection:"column"}}>
        <div style={{background:T.surface,borderRadius:20,overflow:"hidden",border:`1px solid ${T.line}`,
          boxShadow:"0 -4px 32px rgba(0,0,0,0.12)",flex:1,display:"flex",flexDirection:"column"}}>

          {/* Amount hero */}
          <div style={{padding:"24px 20px 16px",textAlign:"center",borderBottom:`1px solid ${T.lineLight}`,flexShrink:0}}>
            <p style={{fontSize:11,color:T.sub,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:6}}>Tu línea de crédito activa</p>
            <p style={{fontFamily:"'Fraunces',serif",fontSize:44,fontStyle:"italic",color:lender.color,lineHeight:1,marginBottom:4}}>{mxn(avail)}</p>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${lender.color}10`,borderRadius:R.full,padding:"4px 12px"}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:lender.color}}/>
              <span style={{fontSize:11,fontWeight:700,color:lender.color}}>Activa ahora · úsala hoy</span>
            </div>
          </div>

          {/* Details grid */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",flex:1}}>
            {[
              {icon:"📅", label:"Plazos",       value:`Hasta ${lender.plans[lender.plans.length-1].n} ${lender.periodLabel}s`},
              {icon:"🏪", label:"Dónde usarla", value:"NovaSuper, DepóMax, ClubPlus"},
              {icon:"⏳", label:"Gracia",        value:"30 días sin cargo"},
              {icon:"✦",  label:"Crece con",    value:"Cada pago a tiempo"},
            ].map((d,i)=>(
              <div key={i} style={{padding:"14px 16px",borderRight:i%2===0?`1px solid ${T.lineLight}`:"none",borderBottom:i<2?`1px solid ${T.lineLight}`:"none",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <span style={{fontSize:16,marginBottom:4}}>{d.icon==="✦"?"":`${d.icon}`}{d.icon==="✦"&&<Spark size={13} color={lender.color}/>}</span>
                <p style={{fontSize:10,color:T.ghost,marginBottom:2}}>{d.label}</p>
                <p style={{fontSize:12,fontWeight:700,color:T.ink,lineHeight:1.3}}>{d.value}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* CTA */}
      <div style={{flexShrink:0,padding:"12px 16px 16px",background:T.surface,borderTop:`1px solid ${T.line}`}}>
        <PrimaryButton color={lender.color} onClick={()=>{ onLinked?.(lender.id); setStage("linked"); }}>Vincular con Cashri</PrimaryButton>
      </div>
    </div>
  );

  // ── VALIDATING ───────────────────────────────────────────────
  if (stage === "validating") {
    return (
      <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:T.bg}}>
        <div style={{background:`linear-gradient(135deg,${lender.gfrom},${lender.gto})`,padding:"14px 20px",flexShrink:0,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:15,fontWeight:700,color:"#fff",flex:1,textAlign:"center"}}>Verificando identidad</span>
        </div>
        <KycValidating lender={lender}/>
      </div>
    );
  }

  // ── SELFIE ───────────────────────────────────────────────────
  if (stage === "selfie") return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:"#0a0a0a"}}>
      <div style={{background:`linear-gradient(135deg,${lender.gfrom},${lender.gto})`,padding:"14px 20px",flexShrink:0,display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setStage("ine_back")} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.12)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}><ChevLeft/></button>
        <span style={{fontSize:15,fontWeight:700,color:"#fff",flex:1}}>Selfie de verificación</span>
        <span style={{fontSize:11,color:"rgba(255,255,255,0.6)",fontWeight:600}}>3 / 3</span>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.7)",marginBottom:4,fontWeight:600}}>Tómate una selfie</p>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginBottom:0,lineHeight:1.5}}>Centra tu rostro dentro del óvalo con buena iluminación.</p>
        <KycSelfieFrame lender={lender}/>
      </div>
      <div style={{flexShrink:0,padding:"12px 16px 20px"}}>
        <PrimaryButton color={lender.color} onClick={()=>capture("validating")} style={{opacity:capturing?0.7:1}}>
          {capturing
            ? <span style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center"}}>
                <span style={{width:13,height:13,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",display:"inline-block",animation:"spin 0.7s linear infinite"}}/>
                Procesando...
              </span>
            : "📸  Tomar selfie"}
        </PrimaryButton>
      </div>
    </div>
  );

  // ── INE BACK ────────────────────────────────────────────────
  if (stage === "ine_back") return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:"#0a0a0a"}}>
      <div style={{background:`linear-gradient(135deg,${lender.gfrom},${lender.gto})`,padding:"14px 20px",flexShrink:0,display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setStage("ine_front")} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.12)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}><ChevLeft/></button>
        <span style={{fontSize:15,fontWeight:700,color:"#fff",flex:1}}>Reverso de tu INE</span>
        <span style={{fontSize:11,color:"rgba(255,255,255,0.6)",fontWeight:600}}>2 / 3</span>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.7)",marginBottom:4,fontWeight:600}}>Reverso de la credencial</p>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.4)",lineHeight:1.5}}>Asegúrate de que el código de barras sea legible y no haya reflejos.</p>
        <KycIneFrame side="back" lender={lender}/>
      </div>
      <div style={{flexShrink:0,padding:"12px 16px 20px"}}>
        <PrimaryButton color={lender.color} onClick={()=>capture("selfie")} style={{opacity:capturing?0.7:1}}>
          {capturing
            ? <span style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center"}}>
                <span style={{width:13,height:13,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",display:"inline-block",animation:"spin 0.7s linear infinite"}}/>
                Procesando...
              </span>
            : "📷  Tomar foto del reverso"}
        </PrimaryButton>
      </div>
    </div>
  );

  // ── INE FRONT ────────────────────────────────────────────────
  if (stage === "ine_front") return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:"#0a0a0a"}}>
      <div style={{background:`linear-gradient(135deg,${lender.gfrom},${lender.gto})`,padding:"14px 20px",flexShrink:0,display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setStage("prep")} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.12)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}><ChevLeft/></button>
        <span style={{fontSize:15,fontWeight:700,color:"#fff",flex:1}}>Frente de tu INE</span>
        <span style={{fontSize:11,color:"rgba(255,255,255,0.6)",fontWeight:600}}>1 / 3</span>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.7)",marginBottom:4,fontWeight:600}}>Frente de la credencial</p>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.4)",lineHeight:1.5}}>Coloca tu INE dentro del marco. Asegúrate que se lea claramente tu nombre y foto.</p>
        <KycIneFrame side="front" lender={lender}/>
      </div>
      <div style={{flexShrink:0,padding:"12px 16px 20px"}}>
        <PrimaryButton color={lender.color} onClick={()=>capture("ine_back")} style={{opacity:capturing?0.7:1}}>
          {capturing
            ? <span style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center"}}>
                <span style={{width:13,height:13,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",display:"inline-block",animation:"spin 0.7s linear infinite"}}/>
                Procesando...
              </span>
            : "📷  Tomar foto del frente"}
        </PrimaryButton>
      </div>
    </div>
  );

  // ── PREP (checklist) ─────────────────────────────────────────
  if (stage === "prep") return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:T.bg}}>
      <div style={{background:`linear-gradient(135deg,${lender.gfrom},${lender.gto})`,padding:"14px 20px",flexShrink:0,display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setStage("offer")} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.12)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}><ChevLeft/></button>
        <span style={{fontSize:15,fontWeight:700,color:"#fff"}}>Activar mi crédito</span>
      </div>
      <div style={{flex:1,overflowY:"auto"}}>
        <div style={{padding:"16px 16px 24px"}}>
          <p style={{fontFamily:"'Fraunces',serif",fontSize:20,fontStyle:"italic",color:T.ink,marginBottom:4}}>Ten esto listo</p>
          <p style={{fontSize:13,color:T.sub,marginBottom:20,lineHeight:1.5}}>El proceso toma menos de 3 minutos.</p>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {KYC_STEPS.map((s,i)=>(
              <div key={i} style={{background:T.surface,borderRadius:12,padding:"10px 13px",display:"flex",alignItems:"center",gap:11,border:`1px solid ${T.line}`,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                <div style={{width:40,height:40,borderRadius:10,flexShrink:0,background:`${lender.color}0E`,border:`1px solid ${lender.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{s.icon}</div>
                <div style={{flex:1}}>
                  <p style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:1}}>{s.title}</p>
                  <p style={{fontSize:11,color:T.sub,lineHeight:1.4}}>{s.body}</p>
                </div>
                <div style={{width:18,height:18,borderRadius:"50%",background:`${lender.color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={lender.color} strokeWidth="3" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                </div>
              </div>
            ))}
          </div>
          <p style={{fontSize:10,color:T.ghost,lineHeight:1.5,marginTop:18}}>
            * Verificación realizada por {lender.name}. Información tratada conforme al aviso de privacidad.{" "}
            <span style={{color:T.blue,textDecoration:"underline",cursor:"pointer"}}>Leer aviso</span>
          </p>
        </div>
      </div>
      <div style={{flexShrink:0,background:T.surface,borderTop:`1px solid ${T.line}`,padding:"13px 16px",boxShadow:"0 -2px 12px rgba(0,0,0,0.05)"}}>
        <PrimaryButton color={lender.color} onClick={()=>setStage("ine_front")}>
          Iniciar verificación
        </PrimaryButton>
      </div>
    </div>
  );

  // ── OFFER (default) ──────────────────────────────────────────
  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:T.bg}}>
      <div style={{
        background:`linear-gradient(160deg,${lender.gfrom} 0%,${lender.gto} 100%)`,
        padding:"0 0 36px",flexShrink:0,position:"relative",overflow:"hidden",
      }}>
        <div style={{position:"absolute",top:"-40px",right:"-30px",width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.06)"}}/>
        <div style={{position:"absolute",bottom:"-20px",left:"10%",width:120,height:120,borderRadius:"50%",background:`${T.yellow}18`}}/>
        <div style={{padding:"14px 20px 0"}}>
          <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.12)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}><ChevLeft/></button>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:6,padding:"14px 0 8px"}}>
          {[14,10,16,10,14].map((s,i)=>(<Spark key={i} size={s} color={i%2===0?T.yellow:"rgba(255,255,255,0.7)"}/>))}
        </div>
        <div style={{padding:"0 24px",textAlign:"center"}}>
          <p style={{fontSize:11,color:"rgba(255,255,255,0.7)",fontWeight:700,letterSpacing:"1.2px",marginBottom:8}}>¡OFERTA PREAPROBADA!</p>
          <p style={{fontFamily:"'Fraunces',serif",fontSize:28,fontStyle:"italic",color:"#fff",lineHeight:1.2,marginBottom:10}}>
            Felicidades,<br/>tienes crédito con
          </p>
          <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.15)",borderRadius:R.full,padding:"8px 18px"}}>
            <LenderIcon lender={lender} size={28}/>
            <span style={{fontSize:18,fontWeight:800,color:"#fff"}}>{lender.name}</span>
          </div>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto"}}>
        <div style={{padding:"0 16px 32px",marginTop:-20}}>
          <div style={{background:T.surface,borderRadius:20,overflow:"hidden",border:`1px solid ${T.line}`,boxShadow:"0 8px 32px rgba(0,0,0,0.1)"}}>
            <div style={{padding:"20px 20px 14px",textAlign:"center",borderBottom:`1px solid ${T.lineLight}`}}>
              <p style={{fontSize:11,color:T.sub,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:4}}>Tu línea preaprobada</p>
              <p style={{fontFamily:"'Fraunces',serif",fontSize:40,fontStyle:"italic",color:lender.color,lineHeight:1}}>{mxn(avail)}</p>
              <p style={{fontSize:12,color:T.sub,marginTop:4}}>Primer pago desde <strong style={{color:T.ink}}>{mxn(avail*(1+pl0.r)/pl0.n)}/{lender.periodLabel}</strong></p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",borderBottom:`1px solid ${T.lineLight}`}}>
              {[
                {label:"Plazos",          value:`Hasta ${lender.plans[lender.plans.length-1].n} ${lender.periodLabel}s`},
                {label:"Ritmo de pago",   value:lender.periodType==="catorcenas"?"Cada 14 días":lender.periodType==="quincenas"?"Cada 15 días":"Semanal"},
                {label:"Primeros 30 días",value:"Sin cargo"},
                {label:"Uso",             value:"Tiendas NovaGroup + online"},
              ].map((d,i)=>(
                <div key={i} style={{padding:"12px 16px",borderRight:i%2===0?`1px solid ${T.lineLight}`:"none",borderBottom:i<2?`1px solid ${T.lineLight}`:"none"}}>
                  <p style={{fontSize:10,color:T.ghost,marginBottom:2}}>{d.label}</p>
                  <p style={{fontSize:12,fontWeight:700,color:T.ink}}>{d.value}</p>
                </div>
              ))}
            </div>
            <div style={{padding:"13px 16px",background:`${lender.color}06`}}>
              <p style={{fontSize:12,color:T.body,lineHeight:1.6}}>
                Para activar necesitas una <strong style={{color:T.ink}}>verificación de identidad</strong> rápida con tu INE. ¡Solo 3 minutos!
              </p>
            </div>
          </div>
          <p style={{fontSize:10,color:T.ghost,lineHeight:1.5,marginTop:12,padding:"0 2px"}}>
            * Oferta preaprobada por {lender.name}. Sujeta a verificación. CAT {pl0.cat}% sin IVA.
          </p>
        </div>
      </div>

      <div style={{flexShrink:0,background:T.surface,borderTop:`1px solid ${T.line}`,padding:"13px 16px",boxShadow:"0 -2px 12px rgba(0,0,0,0.05)"}}>
        <PrimaryButton color={lender.color} onClick={()=>setStage("prep")}>
          Completar pasos para activar
        </PrimaryButton>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   SCREEN: NO OFFER
═══════════════════════════════════════════════════════════════ */
function NoOfferScreen({ onBack, onShop }) {
  const tips = [
    { icon:"🛒", title:"Compra en NovaSuper",    body:"Cada compra suma a tu historial Cashri y mejora tu perfil." },
    { icon:"💸", title:"Envía remesas",         body:"Usar transferencias y remesas aumenta tu score Cashri." },
    { icon:"📲", title:"Usa la app Cashri",      body:"Actividad constante en la app construye tu historial." },
    { icon:"⏳", title:"Vuelve a intentarlo",   body:"Los lenders actualizan sus criterios cada 30 días." },
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:T.bg}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${T.blueInk},${T.blueMid})`,padding:"14px 20px",flexShrink:0,display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.12)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}><ChevLeft/></button>
        <span style={{fontSize:15,fontWeight:700,color:"#fff"}}>Tu perfil de crédito</span>
      </div>
      <div style={{flex:1,overflowY:"auto"}}>
        <div style={{padding:"18px 16px 24px"}}>
          {/* Status */}
          <div style={{textAlign:"center",marginBottom:24}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:T.surfaceAlt,border:`2px solid ${T.line}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 14px"}}>⏳</div>
            <p style={{fontFamily:"'Fraunces',serif",fontSize:22,fontStyle:"italic",color:T.ink,marginBottom:6}}>Aún no hay oferta disponible</p>
            <p style={{fontSize:13,color:T.sub,lineHeight:1.6,maxWidth:280,margin:"0 auto"}}>
              Por ahora los lenders no tienen una oferta lista para ti, pero hay formas de cambiar eso.
            </p>
          </div>
          {/* Tips */}
          <p style={{fontSize:11,fontWeight:700,color:T.sub,textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:10}}>Cómo aumentar tus probabilidades</p>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {tips.map((t,i)=>(
              <div key={i} style={{background:T.surface,borderRadius:12,padding:"10px 13px",display:"flex",alignItems:"flex-start",gap:11,border:`1px solid ${T.line}`}}>
                <span style={{fontSize:18,flexShrink:0,marginTop:1}}>{t.icon}</span>
                <div>
                  <p style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:2}}>{t.title}</p>
                  <p style={{fontSize:12,color:T.sub,lineHeight:1.5}}>{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{flexShrink:0,background:T.surface,borderTop:`1px solid ${T.line}`,padding:"13px 16px",display:"flex",flexDirection:"column",gap:8,boxShadow:"0 -2px 12px rgba(0,0,0,0.05)"}}>
        <PrimaryButton color={T.blue} onClick={onShop}>Ir a comprar en NovaSuper</PrimaryButton>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:13,color:T.sub,cursor:"pointer",padding:"4px"}}>Volver al inicio</button>
      </div>
    </div>
  );
}


function CreditLandingScreen({ onBack, onShop, linkedLenders=[], kycDone=false, onLinked }) {
  const [flow, setFlow] = useState(null);

  const handleSolicitar = () => {
    setFlow("checking");
    setTimeout(() => {
      setFlow(Math.random() > 0.5 ? "existing" : "new");
    }, 1200);
  };

  if (flow === "existing") return (
    <ExistingCreditScreen
      onBack={()=>setFlow(null)}
      onShop={onShop}
      onLinked={onLinked}
    />
  );
  if (flow === "new") return (
    <NewCreditFormScreen
      onBack={()=>setFlow(null)}
      onShop={onShop}
      linkedLenders={linkedLenders}
      kycDone={kycDone}
      onLinked={onLinked}
    />
  );

  return (
    <div style={{
      display:"flex", flexDirection:"column", flex:1,
      overflow:"hidden",
      background:`linear-gradient(180deg, ${T.blueInk} 0%, #1a2e6e 42%, ${T.bg} 42%)`,
    }}>

      {/* Back */}
      <div style={{padding:"14px 20px 0",flexShrink:0}}>
        <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.12)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}>
          <ChevLeft/>
        </button>
      </div>

      {/* Hero text */}
      <div style={{padding:"10px 24px 18px",flexShrink:0}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.1)",borderRadius:R.full,padding:"3px 10px",marginBottom:10}}>
          <Spark size={9} color={T.yellow}/>
          <span style={{fontSize:9,color:T.yellow,fontWeight:700,letterSpacing:"1.2px"}}>CRÉDITO EN CASHI</span>
        </div>
        <p style={{fontFamily:"'Fraunces',serif",fontSize:24,fontStyle:"italic",color:"#fff",lineHeight:1.2,marginBottom:4}}>
          Llévalo hoy.<br/>Págalo a tu ritmo.
        </p>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.55)"}}>
          Sin tarjeta de crédito · de $0 a $30,000
        </p>
      </div>

      {/* Content card — fills remaining space */}
      <div style={{flex:1,padding:"0 12px",minHeight:0,display:"flex",flexDirection:"column"}}>
        <div style={{
          background:T.surface,borderRadius:16,
          border:`1px solid ${T.line}`,
          overflow:"hidden",
          boxShadow:"0 4px 20px rgba(0,0,0,0.08)",
          flex:1,display:"flex",flexDirection:"column",
        }}>
          {/* 4 feature rows */}
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
            {[
              { icon:"💳", title:"Sin TDC ni banco",       sub:"Sin historial previo ni cuenta bancaria." },
              { icon:"🏪", title:"En línea y en tienda",   sub:"NovaSuper, DepóMax y ClubPlus." },
              { icon:"📅", title:"Tú eliges tus plazos",   sub:"Catorcenas, quincenas o semanas." },
              { icon:"✦",  title:"De $0 a $30,000",        sub:"Tu línea crece con cada pago a tiempo." },
            ].map((f,i,arr)=>(
              <div key={i} style={{
                display:"flex",alignItems:"center",gap:12,
                padding:"9px 16px",
                borderBottom:i<arr.length-1?`1px solid ${T.lineLight}`:"none",
              }}>
                <div style={{width:32,height:32,borderRadius:8,flexShrink:0,background:`linear-gradient(135deg,${T.blueDeep}14,#7C3AED10)`,border:`1px solid ${T.blueDeep}14`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:f.icon==="✦"?0:15}}>
                  {f.icon==="✦" ? <Spark size={13} color="#7C3AED"/> : f.icon}
                </div>
                <div style={{flex:1}}>
                  <p style={{fontSize:12,fontWeight:700,color:T.ink,marginBottom:1}}>{f.title}</p>
                  <p style={{fontSize:11,color:T.sub,lineHeight:1.4}}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Range bar */}
          <div style={{padding:"8px 16px",borderTop:`1px solid ${T.lineLight}`,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:11,fontWeight:700,color:T.ghost,flexShrink:0}}>$0</span>
            <div style={{flex:1,height:5,background:T.line,borderRadius:999,overflow:"hidden"}}>
              <div style={{height:"100%",width:"100%",background:`linear-gradient(90deg,#7C3AED,${T.blueDeep})`,borderRadius:999}}/>
            </div>
            <span style={{fontSize:11,fontWeight:800,color:T.blueDeep,flexShrink:0}}>$30,000</span>
          </div>

          {/* Legal */}
          <div style={{padding:"6px 16px 8px",borderTop:`1px solid ${T.lineLight}`}}>
            <p style={{fontSize:9,color:T.ghost,lineHeight:1.5}}>
              * Otorgado por terceros vía Cashri. Sujeto a autorización.{" "}
              <span style={{color:T.blue,cursor:"pointer",textDecoration:"underline"}}>T&C</span>
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{flexShrink:0,padding:"10px 12px 14px"}}>
        <PrimaryButton color="#7C3AED" onClick={handleSolicitar} style={{opacity:flow==="checking"?0.7:1}}>
          {flow==="checking"
            ? <span style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center"}}>
                <span style={{width:13,height:13,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",display:"inline-block",animation:"spin 0.7s linear infinite"}}/>
                Verificando...
              </span>
            : "Solicitar ahora"
          }
        </PrimaryButton>
      </div>

    </div>
  );
}

function SuccessScreen({ order, onHome }) {
  return (
    <div style={{
      minHeight:"100vh",
      background:`linear-gradient(180deg, ${T.blueInk} 0%, ${T.blueDeep} 38%, ${T.bg} 38%)`,
      display:"flex",flexDirection:"column",alignItems:"center",
      fontFamily:"'Plus Jakarta Sans','DM Sans',system-ui,sans-serif",
    }}>

      {/* Top section */}
      <div style={{
        width:"100%",maxWidth:"390px",
        padding:"40px 28px 100px",
        display:"flex",flexDirection:"column",alignItems:"center",
        position:"relative",
      }}>
        {/* Sparks */}
        {[
          {top:"16px",left:"24px",sz:16,delay:"0.15s"},
          {top:"10px",right:"32px",sz:12,delay:"0.3s"},
          {top:"48px",left:"56px",sz:10,delay:"0.45s"},
          {top:"24px",right:"68px",sz:20,delay:"0.2s"},
          {top:"64px",right:"24px",sz:14,delay:"0.5s"},
        ].map((s,i)=>(
          <div key={i} className="anim-spark" style={{
            position:"absolute",top:s.top,left:s.left,right:s.right,
            animationDelay:s.delay,
          }}>
            <Spark size={s.sz} color={T.yellow}/>
          </div>
        ))}

        {/* Cart illustration */}
        <div className="anim-cart" style={{marginBottom:"6px"}}>
          <div className="anim-bounce">
            <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
              {/* Handle */}
              <path d="M14 22 L24 22 L24 68" stroke={T.yellow} strokeWidth="5.5" strokeLinecap="round" fill="none"/>
              {/* Cart body */}
              <rect x="24" y="26" width="62" height="40" rx="8" fill={T.yellow}/>
              {/* Items in cart */}
              <rect x="32" y="34" width="14" height="18" rx="3" fill={T.blueDeep}/>
              <rect x="50" y="34" width="11" height="14" rx="3" fill={T.blueInk}/>
              <rect x="65" y="36" width="13" height="16" rx="3" fill={T.blueDeep}/>
              {/* Wheels */}
              <circle cx="38" cy="76" r="8" fill={T.surface} stroke={T.yellow} strokeWidth="3"/>
              <circle cx="38" cy="76" r="3" fill={T.blueInk}/>
              <circle cx="68" cy="76" r="8" fill={T.surface} stroke={T.yellow} strokeWidth="3"/>
              <circle cx="68" cy="76" r="3" fill={T.blueInk}/>
              {/* Check badge */}
              <circle cx="86" cy="24" r="13" fill="#7C3AED"/>
              <path d="M80 24 L85 29 L93 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Road */}
        <div className="anim-road" style={{
          height:"5px",width:"130px",borderRadius:R.full,
          background:T.blueDeep,
          backgroundImage:`repeating-linear-gradient(90deg, transparent, transparent 18px, ${T.yellow}55 18px, ${T.yellow}55 30px)`,
          backgroundSize:"60px 100%",
        }}/>
      </div>

      {/* White card */}
      <div style={{
        width:"100%",maxWidth:"390px",
        background:T.surface,
        borderRadius:"28px 28px 0 0",
        padding:"28px 24px 40px",
        marginTop:"-64px",flex:1,
        boxShadow:"0 -8px 40px rgba(0,28,64,0.18)",
      }}>
        <div className="anim-fade-up delay-1">
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",marginBottom:"8px"}}>
            <Spark size={12} color={T.yellow}/>
            <span style={{fontSize:"10px",color:T.blue,letterSpacing:"1.5px",fontWeight:"700"}}>PEDIDO CONFIRMADO</span>
          </div>
          <h2 style={{
            fontFamily:"'Fraunces',serif",
            fontSize:"28px",fontStyle:"italic",
            color:T.ink,textAlign:"center",lineHeight:1.2,marginBottom:"6px",
          }}>¡Ya viene en camino!</h2>
          <p style={{fontSize:"13px",color:T.sub,textAlign:"center",marginBottom:"24px"}}>
            Tu <strong style={{color:T.ink}}>{order.p.name}</strong> llega el <strong style={{color:T.blue}}>sáb. 21 de mar</strong>
          </p>
        </div>

        {/* Tracking steps */}
        <div className="anim-fade-up delay-2" style={{marginBottom:"20px",position:"relative",padding:"0 8px"}}>
          <div style={{
            position:"absolute",top:"16px",left:"28px",right:"28px",
            height:"2px",background:T.line,borderRadius:R.full,
          }}>
            <div style={{width:"30%",height:"100%",background:T.blue,borderRadius:R.full}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",position:"relative",zIndex:1}}>
            {[
              {label:"Confirmado",done:true},
              {label:"Preparando",done:false},
              {label:"En camino",done:false},
              {label:"Entregado",done:false},
            ].map((s,i)=>(
              <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}>
                <div style={{
                  width:"32px",height:"32px",borderRadius:"50%",
                  background:s.done?T.blue:T.surface,
                  border:`2px solid ${s.done?T.blue:T.line}`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:"13px",color:s.done?"#fff":T.ghost,
                }}>
                  {s.done?"✓":"·"}
                </div>
                <span style={{fontSize:"9.5px",color:s.done?T.blue:T.ghost,fontWeight:s.done?"700":"400",textAlign:"center",lineHeight:1.2,maxWidth:"44px"}}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment summary */}
        {(()=>{
          const { slots=[], planIdx={}, totalDebt=order.p.price, activeLender, activePlan } = order;
          const isSplit = slots.length > 1;

          if (isSplit) {
            return (
              <div className="anim-fade-up delay-3" style={{background:`linear-gradient(135deg,${T.blueDeep},${T.blueInk})`,borderRadius:R.xl,padding:"18px 20px",marginBottom:"20px",boxShadow:`0 8px 28px ${T.blueInk}44`}}>
                <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"12px"}}>
                  <Spark size={12} color={T.yellow}/>
                  <span style={{fontSize:"10px",color:T.yellow,letterSpacing:"1.5px",fontWeight:"700"}}>PAGO DIVIDIDO</span>
                </div>
                {slots.map(s=>{
                  const l  = BNPL_LENDERS.find(x=>x.id===s.id);
                  const col= l?.color??(s.id==="cashri_wallet"?"#7C3AED":T.blue);
                  const lbl= l?.name??(s.id==="cashri_wallet"?"Cashri Wallet":`Amex ···· ${AMEX.last4}`);
                  const pl = l?l.plans[planIdx[l.id]??0]:null;
                  const tot= pl?s.amount*(1+pl.r):s.amount;
                  return (
                    <div key={s.id} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
                      <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                        <div style={{width:"7px",height:"7px",borderRadius:"50%",background:col,flexShrink:0}}/>
                        <div>
                          <p style={{fontSize:"12px",color:"rgba(255,255,255,0.85)",fontWeight:"600"}}>{lbl}{pl?` · ${pl.label}`:""}</p>
                          {pl&&<p style={{fontSize:"10px",color:"rgba(255,255,255,0.5)"}}>→ {mxn(tot)} total</p>}
                        </div>
                      </div>
                      <span style={{fontSize:"13px",color:"#fff",fontWeight:"700"}}>{mxn(s.amount)}</span>
                    </div>
                  );
                })}
                <div style={{borderTop:"1px solid rgba(255,255,255,0.15)",marginTop:"10px",paddingTop:"10px",display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                  <span style={{fontSize:"11px",color:"rgba(255,255,255,0.6)"}}>Deuda total</span>
                  <span style={{fontFamily:"'Fraunces',serif",fontSize:"26px",fontStyle:"italic",color:"#fff"}}>{mxn(totalDebt)}</span>
                </div>
              </div>
            );
          }

          if (activeLender && activePlan) {
            const amt     = slots[0]?.amount ?? order.PRICE ?? order.p.price;
            const tot     = amt*(1+activePlan.r);
            const perPd   = tot/activePlan.n;
            const pdLabel = activeLender.periodLabel??"período";
            return (
              <div className="anim-fade-up delay-3" style={{background:`linear-gradient(135deg,${activeLender.gfrom},${activeLender.gto})`,borderRadius:R.xl,padding:"18px 20px",marginBottom:"20px",position:"relative",overflow:"hidden",boxShadow:`0 8px 28px ${activeLender.color}44`}}>
                <div style={{position:"absolute",top:"-20px",right:"-20px",width:"90px",height:"90px",borderRadius:"50%",background:"rgba(255,255,255,0.06)"}}/>
                <div style={{position:"relative",zIndex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"10px"}}>
                    <Spark size={12} color={T.yellow}/>
                    <span style={{fontSize:"10px",color:T.yellow,letterSpacing:"1.5px",fontWeight:"700"}}>{activeLender.name.toUpperCase()} · CASHI</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                    <div>
                      <p style={{fontSize:"11px",color:"rgba(255,255,255,0.65)",marginBottom:"2px"}}>{activePlan.label}</p>
                      <p style={{fontFamily:"'Fraunces',serif",fontSize:"32px",fontStyle:"italic",color:"#fff",lineHeight:1}}>{mxn(perPd)}<span style={{fontSize:"14px",opacity:0.65}}>/{pdLabel}</span></p>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <p style={{fontSize:"10px",color:"rgba(255,255,255,0.65)",marginBottom:"2px"}}>Deuda total</p>
                      <p style={{fontSize:"17px",fontWeight:"800",color:"#fff"}}>{mxn(tot)}</p>
                      <p style={{fontSize:"10px",color:T.yellow}}>+{mxn(activePlan.r*amt)} interés</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div className="anim-fade-up delay-3" style={{background:`linear-gradient(135deg,${T.blueInk},${T.blueDeep})`,borderRadius:R.xl,padding:"18px 20px",marginBottom:"20px",boxShadow:`0 8px 28px ${T.blueInk}55`}}>
              <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"10px"}}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.yellow} strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                <span style={{fontSize:"10px",color:T.yellow,letterSpacing:"1.5px",fontWeight:"700"}}>PAGO CONFIRMADO</span>
              </div>
              <p style={{fontFamily:"'Fraunces',serif",fontSize:"30px",fontStyle:"italic",color:"#fff",lineHeight:1,marginBottom:"6px"}}>{mxn(order.p.price)}</p>
              <p style={{fontSize:"12px",color:"rgba(255,255,255,0.55)"}}>Pago directo</p>
            </div>
          );
        })()}
        {/* Referral nudge */}
        <div className="anim-fade-up delay-3" style={{
          background:`linear-gradient(135deg,#7C3AED08,#7C3AED04)`,
          borderRadius:14,padding:"13px 14px",
          border:"1.5px solid #7C3AED22",
          marginBottom:10,
        }}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
            <span style={{fontSize:20}}>🎁</span>
            <p style={{fontSize:13,fontWeight:700,color:T.ink}}>Invita y ganen juntos</p>
          </div>
          <p style={{fontSize:11,color:T.sub,lineHeight:1.5,marginBottom:10}}>
            Invita a un amigo y ambos reciben <strong style={{color:"#7C3AED"}}>$100</strong> en su primera compra con Cashri.
          </p>
          <button style={{
            width:"100%",padding:"9px",borderRadius:9,
            background:"linear-gradient(135deg,#7C3AED,#5B21B6)",
            border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",
          }}>Compartir mi código →</button>
        </div>

        <div className="anim-fade-up delay-4">
          <PrimaryButton onClick={onHome}>Seguir comprando</PrimaryButton>
        </div>
      </div>
    </div>
  );
}


export default function App() {
  const [screen,        setScreen]        = useState("home");
  const [product,       setProduct]       = useState(null);
  const [address,       setAddress]       = useState(null);
  const [order,         setOrder]         = useState(null);
  const [cart,          setCart]          = useState([]);
  const [linkedLenders, setLinkedLenders] = useState([]);
  const [kycDone,       setKycDone]       = useState(false);

  const totalCredit = BNPL_LENDERS[0].line - BNPL_LENDERS[0].used;
  const go = s => setScreen(s);

  const onLinked = (lenderId) => {
    setKycDone(true);
    setLinkedLenders(prev => prev.includes(lenderId) ? prev : [...prev, lenderId]);
  };

  const onShop = () => cart.length > 0 ? go("checkout") : go("home");

  const handleNavTap = (id) => {
    if (id === "home")   { go("home"); }
    if (id === "favs")   { go("misproductos"); }
    if (id === "search") { go("departamentos"); }
    if (id === "perks")  { go("beneficios"); }
    if (id === "acct")   { go("cuenta"); }
  };

  const activeTab = screen==="misproductos"  ? "favs"
                  : screen==="departamentos" ? "search"
                  : screen==="beneficios"    ? "perks"
                  : screen==="cuenta"        ? "acct"
                  : "home";

  return (
    <Shell>
      {screen==="home" && (
        <>
          <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",minHeight:0}}>
            <HomeScreen
              onProduct={p=>{ setProduct(p); go("detail"); }}
              onCreditLanding={()=>go("credit")}
              totalCredit={totalCredit}
              cartCount={cart.length}
            />
          </div>
          <BottomNav active={activeTab} onNavTap={handleNavTap}/>
        </>
      )}

      {screen==="misproductos" && (
        <>
          <div style={{flex:1,minHeight:0,display:"flex",flexDirection:"column"}}>
            <MisProductosScreen
              onProduct={p=>{ setProduct(p); go("detail"); }}
            />
          </div>
          <BottomNav active="favs" onNavTap={handleNavTap}/>
        </>
      )}

      {screen==="departamentos" && (
        <>
          <div style={{flex:1,minHeight:0,display:"flex",flexDirection:"column"}}>
            <DepartamentosScreen
              onProduct={p=>{ setProduct(p); go("detail"); }}
            />
          </div>
          <BottomNav active="search" onNavTap={handleNavTap}/>
        </>
      )}

      {screen==="beneficios" && (
        <>
          <div style={{flex:1,minHeight:0,display:"flex",flexDirection:"column"}}>
            <BeneficiosScreen
              onCreditos={()=>go("credithub")}
            />
          </div>
          <BottomNav active="perks" onNavTap={handleNavTap}/>
        </>
      )}

      {screen==="cuenta" && (
        <>
          <div style={{flex:1,minHeight:0,display:"flex",flexDirection:"column"}}>
            <CuentaScreen
              onCreditLanding={()=>go("credithub")}
            />
          </div>
          <BottomNav active="acct" onNavTap={handleNavTap}/>
        </>
      )}

      {screen==="credithub" && (
        <CreditHubScreen
          onBack={()=>history.length>1 ? go("beneficios") : go("home")}
          onSolicitar={()=>go("credit")}
          linkedLenders={linkedLenders}
        />
      )}

      {screen==="credit" && (
        <CreditLandingScreen
          onBack={()=>go("home")}
          onShop={onShop}
          linkedLenders={linkedLenders}
          kycDone={kycDone}
          onLinked={onLinked}
        />
      )}

      {screen==="cashriOnboarding" && (
        <CreditLandingScreen
          onBack={()=>go("detail")}
          onShop={()=>go("checkout")}
          linkedLenders={linkedLenders}
          kycDone={kycDone}
          onLinked={onLinked}
        />
      )}

      {screen==="detail" && product && (
        <>
          <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",minHeight:0}}>
            <DetailScreen
              p={product}
              onBack={()=>go("home")}
              onBuy={()=>go("address")}
              onCashriOnboarding={()=>go("cashriOnboarding")}
            />
          </div>
          <BottomNav active={activeTab} onNavTap={handleNavTap}/>
        </>
      )}

      {screen==="address" && (
        <AddressScreen
          onBack={()=>go("detail")}
          onContinue={addr=>{ setAddress(addr); go("checkout"); }}
        />
      )}

      {screen==="checkout" && product && (
        <CheckoutScreen
          p={product}
          address={address}
          onBack={()=>go("address")}
          onPay={o=>{ setOrder(o); setCart(c=>[...c,o]); go("success"); }}
          linkedLenders={linkedLenders}
          onCashriOnboarding={()=>go("cashriOnboarding")}
        />
      )}

      {screen==="success" && order && (
        <div style={{flex:1,overflowY:"auto",minHeight:0}}>
          <SuccessScreen
            order={order}
            onHome={()=>{ setProduct(null); setAddress(null); setOrder(null); go("home"); }}
          />
        </div>
      )}
    </Shell>
  );
}
