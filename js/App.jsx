// js/App.jsx
// Main application — state management, filtering, routing between views

const { useState, useMemo, useCallback } = React;

/* ── APP ─────────────────────────────────────────────────────────────────── */
function App() {
  const [query, setQuery]   = useState('');
  const [catFilter, setCat] = useState(ALL_C);
  const [vertFilter, setVert] = useState(ALL_V);
  const [prodFilter, setProd] = useState(ALL_P);
  const [viewMode, setView] = useState('cards'); // 'cards' | 'matrix'

  const handleCellClick = useCallback((prod, vert) => {
    setProd(prod); setVert(vert); setCat(ALL_C); setView('cards');
    window.scrollTo({top:0,behavior:'smooth'});
  }, []);

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase();
    return USE_CASES.filter(item=>{
      const catMatch = catFilter===ALL_C || item.cat===catFilter;
      const vertMatch = vertFilter===ALL_V || item.vert===vertFilter;
      const prodMatch = prodFilter===ALL_P || item.prods.includes(prodFilter);
      const searchMatch = q==='' || [
        item.vert, item.prob, item.trigger, item.challenge,
        item.solution, item.outcome, ...item.caps, ...item.prods,
      ].join(' ').toLowerCase().includes(q);
      return catMatch && vertMatch && prodMatch && searchMatch;
    });
  },[query,catFilter,vertFilter,prodFilter]);

  const stats = useMemo(()=>{
    const verts = new Set(filtered.map(u=>u.vert));
    const prods = new Set(filtered.flatMap(u=>u.prods));
    return {count:filtered.length, verts:verts.size, prods:prods.size};
  },[filtered]);

  const reset = ()=>{ setQuery(''); setCat(ALL_C); setVert(ALL_V); setProd(ALL_P); };

  // True only when user has actively applied at least one filter
  const isFiltered = query.trim()!=='' || catFilter!==ALL_C || vertFilter!==ALL_V || prodFilter!==ALL_P;

  // Which verticals to show as quick-tabs based on current category filter
  const tabVerts = useMemo(()=>{
    if (catFilter===ALL_C) return [ALL_V,...ALL_VERTICALS_FLAT];
    return [ALL_V,...(CATEGORY_CONFIG[catFilter]?.verticals||[])];
  },[catFilter]);

  // Categorized sections for card view
  const categorySections = useMemo(()=>{
    if (catFilter!==ALL_C) {
      return [[catFilter, filtered]];
    }
    return Object.keys(CATEGORY_CONFIG).map(cat=>[cat,filtered.filter(u=>u.cat===cat)]).filter(([,arr])=>arr.length>0);
  },[catFilter,filtered]);

  return (
    <>
      <div className="topbar"/>

      <header className="site-header">
        <div className="logo-area">
          <KeysightLogo/>
          <div className="logo-divider"/>
          <span className="logo-label">Network Test Solutions · Sales Enablement Hub</span>
        </div>
        <div className="header-right">
          <div className="view-toggle">
            <button className={`view-btn${viewMode==='cards'?' active':''}`} onClick={()=>setView('cards')}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
              Cards
            </button>
            <button className={`view-btn${viewMode==='matrix'?' active':''}`} onClick={()=>setView('matrix')}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="14" height="2" rx="1"/><rect x="1" y="5" width="14" height="2" rx="1"/><rect x="1" y="9" width="14" height="2" rx="1"/><rect x="1" y="13" width="14" height="2" rx="1"/></svg>
              Matrix
            </button>
          </div>
          <span className="header-badge">Partner Resource</span>
        </div>
      </header>

      <section className="hero">
        <WaveSVG className="hero-wave"/>
        <div className="hero-red-bar"/>
        <div className="hero-inner">
          <div className="hero-left anim-1">
            <div className="hero-eyebrow">
              Network Test Solutions · Use Case &amp; Vertical Matrix
            </div>
            <h1 className="hero-title">
              Sales Enablement<br/><span>Use Case Hub</span>
            </h1>
            <p className="hero-desc">
              Comprehensive use case coverage across <strong style={{color:'#fff'}}>12 industry verticals</strong> — Core,
              Tier-2 Partner Friendly, and Strategic Growth — mapped to every Keysight Network Test Solutions product.
              Filter by category, vertical, or product to find the right conversation at every stage of the sales cycle.
            </p>
          </div>
          <div className="hero-stats anim-3">
            <div className="stat-block">
              <div className="stat-num red">{isFiltered ? stats.count : USE_CASES.length}</div>
              <div className="stat-label">{isFiltered ? 'Matching' : 'Total'} Use Cases</div>
            </div>
            <div className="stat-block">
              <div className="stat-num">{isFiltered ? stats.prods : ALL_PRODUCTS.length}</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-block">
              <div className="stat-num">{isFiltered ? stats.verts : ALL_VERTICALS_FLAT.length}</div>
              <div className="stat-label">Verticals</div>
            </div>
            <div className="stat-block">
              <div className="stat-num">3</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category nav */}
      <nav className="cat-nav">
        <div className="cat-nav-inner">
          <button className={`cat-btn${catFilter===ALL_C?' active':''}`} onClick={()=>{setCat(ALL_C);setVert(ALL_V);}}>
            All Verticals
            <span className="cat-count">{USE_CASES.length}</span>
          </button>
          {Object.entries(CATEGORY_CONFIG).map(([key,cfg])=>{
            const cnt = USE_CASES.filter(u=>u.cat===key).length;
            return (
              <button key={key}
                className={`cat-btn${catFilter===key?' active':''}`}
                onClick={()=>{setCat(key);setVert(ALL_V);}}>
                <span className={`cat-dot ${cfg.dotCls}`}/>
                {cfg.label}
                <span className="cat-count">{cnt}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Filter bar */}
      <div className="filter-bar">
        <div className="filter-inner">
          <input
            type="text"
            placeholder="Search by problem, product, capability, trigger…"
            value={query}
            onChange={e=>setQuery(e.target.value)}
          />
          <select value={vertFilter} onChange={e=>setVert(e.target.value)}>
            {tabVerts.map(v=>(<option key={v}>{v}</option>))}
          </select>
          <select value={prodFilter} onChange={e=>setProd(e.target.value)}>
            {PROD_LIST.map(p=>(<option key={p}>{p}</option>))}
          </select>
          <button className="reset-btn" onClick={reset}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Reset
          </button>
        </div>
      </div>

      <main className="main">

        {viewMode==='matrix' ? (
          <>
            <div className="results-row" style={{marginBottom:24}}>
              <div className="results-count">
                Matrix shows use case coverage across <strong>{ALL_VERTICALS_FLAT.length}</strong> verticals and <strong>{ALL_PRODUCTS.length}</strong> products
              </div>
            </div>
            <MatrixView cases={USE_CASES} onSelectCell={handleCellClick} activeCat={catFilter}/>
          </>
        ) : (
          <>
            {/* Results header — only show when filtered */}
            {isFiltered && (
            <div className="results-row">
              <div className="results-count">
                Showing <strong>{filtered.length}</strong> of {USE_CASES.length} use cases
                {(catFilter!==ALL_C||vertFilter!==ALL_V||prodFilter!==ALL_P||query) && (
                  <span> · <span style={{color:'var(--ks-red)',cursor:'pointer',textDecoration:'underline'}} onClick={reset}>clear filters</span></span>
                )}
              </div>
              <div className="vert-tabs">
                {tabVerts.map(v=>{
                  const vc = v===ALL_V ? null : getVertColor(v);
                  const isActive = vertFilter===v;
                  return (
                    <button key={v}
                      className={`vert-tab${isActive?' active':''}`}
                      style={vc && isActive ? {background:vc.bg, borderColor:vc.bg, color:'#fff'} :
                             vc && !isActive ? {} : {}}
                      onClick={()=>setVert(v)}>
                      {v!==ALL_V && <span style={{display:'inline-block',width:7,height:7,borderRadius:'50%',background:isActive?'rgba(255,255,255,0.7)':vc?.bg,marginRight:5,flexShrink:0,verticalAlign:'middle'}}/>}
                      {v}
                    </button>
                  );
                })}
              </div>
            </div>
            )}

            {!isFiltered ? (
              /* ── DEFAULT / UNFILTERED STATE ── */
              <div className="prompt-state">
                <div className="prompt-inner">
                  <div className="prompt-icon">🎯</div>
                  <h2 className="prompt-title">Select a filter to explore use cases</h2>
                  <p className="prompt-text">
                    Use the <strong>category tabs</strong> above, the <strong>vertical</strong> or <strong>product dropdowns</strong>, or the <strong>search bar</strong> to surface targeted use cases for your customer conversation.
                  </p>
                  <div className="prompt-shortcuts">
                    <div className="shortcut-label">Quick start by category:</div>
                    <div className="shortcut-grid">
                      {Object.entries(CATEGORY_CONFIG).map(([key,cfg])=>{
                        const cnt = USE_CASES.filter(u=>u.cat===key).length;
                        return (
                          <button key={key} className={`shortcut-card sc-${getCatCls(key)}`}
                            onClick={()=>{setCat(key);setVert(ALL_V);}}>
                            <div className="sc-icon">{cfg.icon}</div>
                            <div className="sc-label">{cfg.label}</div>
                            <div className="sc-desc">{cfg.verticals.join(' · ')}</div>
                            <div className="sc-count">{cnt} use cases</div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="shortcut-label" style={{marginTop:28}}>Or jump directly to a vertical:</div>
                    <div className="vert-pill-grid">
                      {ALL_VERTICALS_FLAT.map(v=>{
                        const vc = getVertColor(v);
                        return (
                          <button key={v}
                            className="vert-pill"
                            style={{borderColor:vc.border, color:vc.text, background:'white'}}
                            onMouseEnter={e=>{e.currentTarget.style.background=vc.bg;e.currentTarget.style.color='white';e.currentTarget.style.borderColor=vc.bg;}}
                            onMouseLeave={e=>{e.currentTarget.style.background='white';e.currentTarget.style.color=vc.text;e.currentTarget.style.borderColor=vc.border;}}
                            onClick={()=>setVert(v)}>
                            <span style={{display:'inline-block',width:7,height:7,borderRadius:'50%',background:vc.bg,marginRight:6,verticalAlign:'middle'}}/>
                            {v}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : filtered.length>0 ? (
              categorySections.map(([cat, catCases], si)=>{
                if (catCases.length===0) return null;
                const cfg = CATEGORY_CONFIG[cat];
                return (
                  <div key={cat}>
                    {catFilter===ALL_C && (
                      <>
                        {si>0 && <div className="section-divider"><div className="divider-line"/><div className="divider-label">{cfg?.label||cat}</div><div className="divider-line"/></div>}
                        <div className={`cat-header ${getCatCls(cat)}`}>
                          <div className="cat-icon">{cfg?.icon}</div>
                          <div className="cat-info">
                            <div className="cat-title">{cfg?.label||cat}</div>
                            <div className="cat-subtitle">{cfg?.desc}</div>
                          </div>
                          <div className="cat-pills">
                            {cfg?.verticals.map(v=>{
                              const vc = getVertColor(v);
                              return (
                                <span key={v} className="cat-pill"
                                  style={{background:vc.light, borderColor:vc.border, color:vc.text}}
                                  onMouseEnter={e=>{e.currentTarget.style.background=vc.bg;e.currentTarget.style.color='white';e.currentTarget.style.borderColor=vc.bg;}}
                                  onMouseLeave={e=>{e.currentTarget.style.background=vc.light;e.currentTarget.style.color=vc.text;e.currentTarget.style.borderColor=vc.border;}}
                                  onClick={()=>setVert(v)}>{v}</span>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}
                    <div className="card-grid">
                      {catCases.map((item,i)=>(
                        <UseCaseCard key={item.id} item={item} delay={Math.min(i*25,250)}/>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3 className="empty-title">No matching use cases</h3>
                <p className="empty-text">
                  Try broadening the filters or clearing the search. This hub covers all 12 verticals across the full Keysight Network Test Solutions product portfolio.
                </p>
                <button className="empty-btn" onClick={reset}>Reset All Filters</button>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-text">
          <strong>Keysight Technologies</strong> · Network Test &amp; Security · Sales Enablement Hub · 2026
        </div>
        <div className="footer-text">
          For partner and internal use only · Not for external distribution · {USE_CASES.length} use cases across {ALL_VERTICALS_FLAT.length} verticals
        </div>
      </footer>
    </>
  );
}

// ReactDOM.createRoot — called from index.html

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
