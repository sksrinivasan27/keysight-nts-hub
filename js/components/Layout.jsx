// js/components/Layout.jsx
// Shared layout primitives: logo, wave decoration

/* ── WAVE SVG ────────────────────────────────────────────────────────────── */
function WaveSVG({className}) {
  return (
    <svg className={className} viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <path d="M-40 200 C60 80, 140 320, 240 200 S420 80, 520 200" stroke="white" strokeWidth="2" fill="none" strokeDasharray="400" style={{animation:'waveAnim 3s ease forwards'}}/>
      <path d="M-40 260 C60 140, 140 380, 240 260 S420 140, 520 260" stroke="white" strokeWidth="1.2" fill="none" opacity=".5" strokeDasharray="400" style={{animation:'waveAnim 3.4s .3s ease forwards'}}/>
      <path d="M-40 140 C60 20, 140 260, 240 140 S420 20, 520 140" stroke="white" strokeWidth=".8" fill="none" opacity=".3" strokeDasharray="400" style={{animation:'waveAnim 2.8s .6s ease forwards'}}/>
    </svg>
  );
}

/* ── KEYSIGHT LOGO ───────────────────────────────────────────────────────── */
function KeysightLogo() {
  return (
    <img
      src="assets/keysight-logo.jpg" alt="Keysight"
      className="logo-img"
      style={{height:'32px', width:'auto', display:'block'}}
    />
  );
}
