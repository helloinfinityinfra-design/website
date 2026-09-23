import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, X, Copy, Check, Info, RefreshCw, Calculator, Compass, ChevronDown, ChevronUp } from 'lucide-react';

// ─── Standard Nepali Land Measurement Constants (in Sq. Ft) ──────────────────
const SQFT_PER_ROPANI = 5476;
const SQFT_PER_AANA = 342.25;
const SQFT_PER_PAISA = 85.5625;
const SQFT_PER_DAAM = 21.390625;

const SQFT_PER_BIGHA = 72900;
const SQFT_PER_KATTHA = 3645;
const SQFT_PER_DHUR = 182.25;

const SQFT_PER_SQM = 10.76391041671;
const SQFT_PER_ACRE = 43560;
const SQFT_PER_HECTARE = 107639.1041671;

// ─── Calculation Helper Functions ────────────────────────────────────────────
export function hillyToSqFt(ropani = 0, aana = 0, paisa = 0, daam = 0) {
  const r = parseFloat(ropani) || 0;
  const a = parseFloat(aana) || 0;
  const p = parseFloat(paisa) || 0;
  const d = parseFloat(daam) || 0;
  return r * SQFT_PER_ROPANI + a * SQFT_PER_AANA + p * SQFT_PER_PAISA + d * SQFT_PER_DAAM;
}

export function teraiToSqFt(bigha = 0, kattha = 0, dhur = 0) {
  const b = parseFloat(bigha) || 0;
  const k = parseFloat(kattha) || 0;
  const d = parseFloat(dhur) || 0;
  return b * SQFT_PER_BIGHA + k * SQFT_PER_KATTHA + d * SQFT_PER_DHUR;
}

export function sqFtToHilly(sqft = 0) {
  const total = Math.max(0, parseFloat(sqft) || 0);
  const ropani = Math.floor(total / SQFT_PER_ROPANI);
  let rem = total % SQFT_PER_ROPANI;
  
  const aana = Math.floor(rem / SQFT_PER_AANA);
  rem = rem % SQFT_PER_AANA;
  
  const paisa = Math.floor(rem / SQFT_PER_PAISA);
  rem = rem % SQFT_PER_PAISA;
  
  const daam = parseFloat((rem / SQFT_PER_DAAM).toFixed(2));
  return { ropani, aana, paisa, daam };
}

export function sqFtToTerai(sqft = 0) {
  const total = Math.max(0, parseFloat(sqft) || 0);
  const bigha = Math.floor(total / SQFT_PER_BIGHA);
  let rem = total % SQFT_PER_BIGHA;
  
  const kattha = Math.floor(rem / SQFT_PER_KATTHA);
  rem = rem % SQFT_PER_KATTHA;
  
  const dhur = parseFloat((rem / SQFT_PER_DHUR).toFixed(2));
  return { bigha, kattha, dhur };
}

// ─── Main Land Converter Widget ───────────────────────────────────────────────
const LandConverterWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('hilly'); // 'hilly', 'terai', 'sqft'

  // Input states
  const [ropani, setRopani] = useState('0');
  const [aana, setAana] = useState('4');
  const [paisa, setPaisa] = useState('0');
  const [daam, setDaam] = useState('0');

  const [bigha, setBigha] = useState('0');
  const [kattha, setKattha] = useState('0');
  const [dhur, setDhur] = useState('0');

  const [sqftInput, setSqftInput] = useState('1369');
  const [sqmInput, setSqmInput] = useState('');

  const [copied, setCopied] = useState(false);
  const [showReference, setShowReference] = useState(false);

  // Computed total Sq Ft depending on active mode
  const currentTotalSqFt = (() => {
    if (mode === 'hilly') {
      return hillyToSqFt(ropani, aana, paisa, daam);
    } else if (mode === 'terai') {
      return teraiToSqFt(bigha, kattha, dhur);
    } else {
      return Math.max(0, parseFloat(sqftInput) || 0);
    }
  })();

  const hillyResult = sqFtToHilly(currentTotalSqFt);
  const teraiResult = sqFtToTerai(currentTotalSqFt);
  const totalSqMeters = (currentTotalSqFt / SQFT_PER_SQM).toFixed(2);
  const totalAcres = (currentTotalSqFt / SQFT_PER_ACRE).toFixed(4);
  const totalHectares = (currentTotalSqFt / SQFT_PER_HECTARE).toFixed(4);

  // Sync inputs when switching preset or mode if appropriate
  const handlePresetSelect = (preset) => {
    if (preset.type === 'hilly') {
      setMode('hilly');
      setRopani(String(preset.r || 0));
      setAana(String(preset.a || 0));
      setPaisa(String(preset.p || 0));
      setDaam(String(preset.d || 0));
    } else if (preset.type === 'terai') {
      setMode('terai');
      setBigha(String(preset.b || 0));
      setKattha(String(preset.k || 0));
      setDhur(String(preset.dh || 0));
    } else if (preset.type === 'sqft') {
      setMode('sqft');
      setSqftInput(String(preset.sqft));
      setSqmInput((preset.sqft / SQFT_PER_SQM).toFixed(2));
    }
  };

  const handleSqFtChange = (val) => {
    setSqftInput(val);
    const num = parseFloat(val) || 0;
    setSqmInput((num / SQFT_PER_SQM).toFixed(2));
  };

  const handleSqmChange = (val) => {
    setSqmInput(val);
    const num = parseFloat(val) || 0;
    setSqftInput((num * SQFT_PER_SQM).toFixed(2));
  };

  const resetAll = () => {
    setRopani('0');
    setAana('4');
    setPaisa('0');
    setDaam('0');
    setBigha('0');
    setKattha('0');
    setDhur('0');
    setSqftInput('1369');
    setSqmInput((1369 / SQFT_PER_SQM).toFixed(2));
  };

  const handleCopySummary = () => {
    const summaryText = `📐 Nepali Land Measurement Summary:
• Total Area: ${currentTotalSqFt.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Sq. Ft. (${totalSqMeters} Sq. Meters)
• Hilly System (पहाडी): ${hillyResult.ropani} Ropani, ${hillyResult.aana} Aana, ${hillyResult.paisa} Paisa, ${hillyResult.daam} Daam
• Terai System (तराई): ${teraiResult.bigha} Bigha, ${teraiResult.kattha} Kattha, ${teraiResult.dhur} Dhur
• Acres: ${totalAcres} | Hectares: ${totalHectares}
Calculated via Infinity Construction Land Converter.`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const PRESETS = [
    { label: '3 Aana Plot', type: 'hilly', r: 0, a: 3, p: 0, d: 0 },
    { label: '4 Aana (Standard)', type: 'hilly', r: 0, a: 4, p: 0, d: 0 },
    { label: '4 Aana 2 Paisa', type: 'hilly', r: 0, a: 4, p: 2, d: 0 },
    { label: '1 Ropani', type: 'hilly', r: 1, a: 0, p: 0, d: 0 },
    { label: '5 Kattha', type: 'terai', b: 0, k: 5, dh: 0 },
    { label: '1 Bigha', type: 'terai', b: 1, k: 0, dh: 0 },
  ];

  return (
    <>
      {/* ── Floating Launcher Button (Bottom Left) ───────────────────────── */}
      <div style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 9998 }}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'linear-gradient(135deg, #0C447C 0%, #BA7517 100%)',
            color: '#FFFFFF',
            padding: '12px 18px',
            borderRadius: '50px',
            boxShadow: '0 10px 30px rgba(12, 68, 124, 0.4), 0 0 15px rgba(186, 117, 23, 0.3)',
            border: '1.5px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: '0.88rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'inset 0 0 6px rgba(255,255,255,0.2)'
          }}>
            {isOpen ? <X size={18} color="#FFFFFF" /> : <Calculator size={18} color="#F4C778" />}
          </div>
          <span>Land Converter</span>
          <span style={{
            background: 'rgba(244, 199, 120, 0.25)',
            color: '#F4C778',
            fontSize: '0.68rem',
            fontWeight: 800,
            padding: '2px 8px',
            borderRadius: '12px',
            letterSpacing: '0.5px',
            border: '1px solid rgba(244, 199, 120, 0.4)'
          }}>
            जग्गा नापी
          </span>
        </motion.button>
      </div>

      {/* ── Land Converter Drawer Window ─────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'fixed',
              bottom: '5.5rem',
              left: '2rem',
              width: '410px',
              maxWidth: 'calc(100vw - 2.5rem)',
              maxHeight: '82vh',
              background: '#0d0e1c',
              borderRadius: 24,
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.5), 0 0 25px rgba(186, 117, 23, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontFamily: "'Inter', sans-serif",
              zIndex: 9999,
              color: '#FFFFFF'
            }}
          >
            {/* ── Header ── */}
            <div style={{
              background: 'linear-gradient(135deg, #042C53 0%, #0C447C 60%, #16172e 100%)',
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(186,117,23,0.3) 0%, rgba(12,68,124,0.4) 100%)',
                  border: '1px solid #BA7517',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(186,117,23,0.3)'
                }}>
                  <Ruler size={20} color="#F4C778" />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 800, margin: 0, color: '#FFFFFF', letterSpacing: '-0.2px' }}>
                    Nepali Land Unit Converter
                  </h3>
                  <p style={{ fontSize: '0.7rem', color: '#BA7517', margin: '2px 0 0 0', fontWeight: 600 }}>
                    Ropani–Aana & Bigha–Kattha System
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={resetAll}
                  title="Reset Inputs"
                  style={{
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#cbd5e1', width: 32, height: 32, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                  }}
                >
                  <RefreshCw size={13} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  style={{
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#cbd5e1', width: 32, height: 32, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                  }}
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* ── Scrollable Body ── */}
            <div style={{ flex: 1, padding: 18, overflowY: 'auto', scrollbarWidth: 'thin' }}>
              
              {/* Mode Tabs */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6,
                background: 'rgba(255,255,255,0.04)', padding: 4, borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.06)', marginBottom: 16
              }}>
                {[
                  { id: 'hilly', label: '🏔️ Hill (Ropani)' },
                  { id: 'terai', label: '🌾 Terai (Bigha)' },
                  { id: 'sqft', label: '📐 Sq. Ft / Sq. M' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setMode(tab.id)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 10,
                      fontSize: '0.74rem',
                      fontWeight: mode === tab.id ? 700 : 500,
                      background: mode === tab.id ? 'linear-gradient(135deg, #0C447C 0%, #BA7517 100%)' : 'transparent',
                      color: mode === tab.id ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: mode === tab.id ? '0 4px 12px rgba(12,68,124,0.3)' : 'none'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Presets Bar */}
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#BA7517', fontWeight: 700, display: 'block', marginBottom: 6 }}>
                  ⚡ Quick Presets:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePresetSelect(p)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255,255,255,0.85)',
                        padding: '4px 10px',
                        borderRadius: 20,
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => e.currentTarget.style.background = 'rgba(186, 117, 23, 0.2)'}
                      onMouseOut={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs based on Active Mode */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 16,
                padding: 16,
                border: '1px solid rgba(255,255,255,0.06)',
                marginBottom: 16
              }}>
                {mode === 'hilly' && (
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#F4C778', fontWeight: 700, display: 'block', marginBottom: 12 }}>
                      Hilly Measurement System (पहाडी भेग):
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 4 }}>Ropani (रोपनी)</label>
                        <input
                          type="number"
                          min="0"
                          value={ropani}
                          onChange={e => setRopani(e.target.value)}
                          style={{
                            width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: 10, padding: '8px 12px', color: '#FFF', fontSize: '0.92rem', fontWeight: 700, outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 4 }}>Aana (आना)</label>
                        <input
                          type="number"
                          min="0"
                          value={aana}
                          onChange={e => setAana(e.target.value)}
                          style={{
                            width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: 10, padding: '8px 12px', color: '#FFF', fontSize: '0.92rem', fontWeight: 700, outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 4 }}>Paisa (पैसा)</label>
                        <input
                          type="number"
                          min="0"
                          value={paisa}
                          onChange={e => setPaisa(e.target.value)}
                          style={{
                            width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: 10, padding: '8px 12px', color: '#FFF', fontSize: '0.92rem', fontWeight: 700, outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 4 }}>Daam (दाम)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={daam}
                          onChange={e => setDaam(e.target.value)}
                          style={{
                            width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: 10, padding: '8px 12px', color: '#FFF', fontSize: '0.92rem', fontWeight: 700, outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'terai' && (
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#F4C778', fontWeight: 700, display: 'block', marginBottom: 12 }}>
                      Terai Measurement System (तराई भेग):
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 4 }}>Bigha (बिघा)</label>
                        <input
                          type="number"
                          min="0"
                          value={bigha}
                          onChange={e => setBigha(e.target.value)}
                          style={{
                            width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: 10, padding: '8px 10px', color: '#FFF', fontSize: '0.92rem', fontWeight: 700, outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 4 }}>Kattha (कट्ठा)</label>
                        <input
                          type="number"
                          min="0"
                          value={kattha}
                          onChange={e => setKattha(e.target.value)}
                          style={{
                            width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: 10, padding: '8px 10px', color: '#FFF', fontSize: '0.92rem', fontWeight: 700, outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 4 }}>Dhur (धूर)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={dhur}
                          onChange={e => setDhur(e.target.value)}
                          style={{
                            width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: 10, padding: '8px 10px', color: '#FFF', fontSize: '0.92rem', fontWeight: 700, outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'sqft' && (
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#F4C778', fontWeight: 700, display: 'block', marginBottom: 12 }}>
                      Standard Metric / Imperial Direct Input:
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 4 }}>Square Feet (sq. ft)</label>
                        <input
                          type="number"
                          min="0"
                          value={sqftInput}
                          onChange={e => handleSqFtChange(e.target.value)}
                          placeholder="e.g. 5476"
                          style={{
                            width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: 10, padding: '8px 12px', color: '#FFF', fontSize: '0.92rem', fontWeight: 700, outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 4 }}>Square Meters (sq. m)</label>
                        <input
                          type="number"
                          min="0"
                          value={sqmInput}
                          onChange={e => handleSqmChange(e.target.value)}
                          placeholder="e.g. 508.74"
                          style={{
                            width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: 10, padding: '8px 12px', color: '#FFF', fontSize: '0.92rem', fontWeight: 700, outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Conversion Results Card ── */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(12,68,124,0.3) 0%, rgba(186,117,23,0.15) 100%)',
                borderRadius: 18,
                padding: 16,
                border: '1px solid rgba(244, 199, 120, 0.25)',
                marginBottom: 16,
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#F4C778', fontWeight: 800 }}>
                    Conversion Breakdown
                  </span>
                  <button
                    onClick={handleCopySummary}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      background: copied ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.08)',
                      border: copied ? '1px solid #4ade80' : '1px solid rgba(255,255,255,0.15)',
                      color: copied ? '#4ade80' : '#FFFFFF',
                      fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: 20, cursor: 'pointer'
                    }}
                  >
                    {copied ? <Check size={11} /> : <Copy size={11} />}
                    {copied ? 'Copied!' : 'Copy Summary'}
                  </button>
                </div>

                {/* Primary Sq Ft & Sq M Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', display: 'block' }}>Total Sq. Feet</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>
                      {currentTotalSqFt.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: '#F4C778', display: 'block' }}>sq. ft</span>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', display: 'block' }}>Total Sq. Meters</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>
                      {totalSqMeters}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: '#F4C778', display: 'block' }}>m²</span>
                  </div>
                </div>

                {/* Breakdown List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.8rem' }}>
                  {/* Hilly notation */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'rgba(0,0,0,0.25)', padding: '8px 12px', borderRadius: 10
                  }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>🏔️ Hilly (पहाडी):</span>
                    <span style={{ color: '#F4C778', fontWeight: 800 }}>
                      {hillyResult.ropani}R - {hillyResult.aana}A - {hillyResult.paisa}P - {hillyResult.daam}D
                    </span>
                  </div>

                  {/* Terai notation */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'rgba(0,0,0,0.25)', padding: '8px 12px', borderRadius: 10
                  }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>🌾 Terai (तराई):</span>
                    <span style={{ color: '#F4C778', fontWeight: 800 }}>
                      {teraiResult.bigha}B - {teraiResult.kattha}K - {teraiResult.dhur}Dh
                    </span>
                  </div>

                  {/* Acres & Hectares */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '2px 4px', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)'
                  }}>
                    <span>Acres: <strong style={{ color: '#FFF' }}>{totalAcres}</strong></span>
                    <span>Hectares: <strong style={{ color: '#FFF' }}>{totalHectares}</strong></span>
                  </div>
                </div>
              </div>

              {/* ── Expandable Unit Reference Accordion ── */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setShowReference(!showReference)}
                  style={{
                    width: '100%', padding: '10px 14px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'transparent', border: 'none', color: '#cbd5e1',
                    fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Info size={13} style={{ color: '#BA7517' }} /> Nepali Land Unit Formula Guide
                  </span>
                  {showReference ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {showReference && (
                  <div style={{ padding: '0 14px 14px 14px', fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <p style={{ margin: '8px 0 6px 0', fontWeight: 700, color: '#F4C778' }}>
                      🏔️ Hilly System Ratios (Ropani System):
                    </p>
                    <ul style={{ paddingLeft: 12, margin: 0, lineHeight: 1.6 }}>
                      <li><strong>1 Ropani</strong> = 16 Aana = 64 Paisa = 256 Daam = <strong>5,476 sq ft</strong> (508.74 m²)</li>
                      <li><strong>1 Aana</strong> = 4 Paisa = 16 Daam = <strong>342.25 sq ft</strong> (31.80 m²)</li>
                      <li><strong>1 Paisa</strong> = 4 Daam = <strong>85.56 sq ft</strong> (7.95 m²)</li>
                      <li><strong>1 Daam</strong> = <strong>21.39 sq ft</strong> (1.99 m²)</li>
                    </ul>

                    <p style={{ margin: '12px 0 6px 0', fontWeight: 700, color: '#F4C778' }}>
                      🌾 Terai System Ratios (Bigha System):
                    </p>
                    <ul style={{ paddingLeft: 12, margin: 0, lineHeight: 1.6 }}>
                      <li><strong>1 Bigha</strong> = 20 Kattha = 400 Dhur = <strong>72,900 sq ft</strong> (6,772.63 m²)</li>
                      <li><strong>1 Kattha</strong> = 20 Dhur = <strong>3,645 sq ft</strong> (338.63 m²)</li>
                      <li><strong>1 Dhur</strong> = <strong>182.25 sq ft</strong> (16.93 m²)</li>
                    </ul>

                    <p style={{ margin: '10px 0 0 0', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', italic: 'true' }}>
                      * Standard measurements verified under Government of Nepal Department of Land Survey.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Footer */}
            <div style={{
              padding: '10px 18px',
              background: 'rgba(0,0,0,0.3)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              fontSize: '0.68rem',
              color: 'rgba(255,255,255,0.4)',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}>
              <Compass size={12} style={{ color: '#BA7517' }} />
              Infinity Construction Engineering & Survey Tools
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandConverterWidget;
