// js/components/MatrixView.jsx
// Product × Vertical coverage matrix with frozen first column

/* ── MATRIX VIEW ─────────────────────────────────────────────────────────── */
function MatrixView({cases, onSelectCell, activeCat}) {
  // Show only the selected category's verticals, or all if "All" selected
  const visibleGroups = useMemo(()=>{
    if (activeCat && activeCat !== ALL_C) {
      const cfg = CATEGORY_CONFIG[activeCat];
      return cfg ? [[activeCat, cfg]] : Object.entries(CATEGORY_CONFIG);
    }
    return Object.entries(CATEGORY_CONFIG);
  }, [activeCat]);

  const visibleVerts = useMemo(()=>
    visibleGroups.flatMap(([,cfg])=>cfg.verticals)
  , [visibleGroups]);

  const countMap = useMemo(()=>{
    const m = {};
    cases.forEach(uc=>{
      uc.prods.forEach(p=>{
        const key = `${p}||${uc.vert}`;
        m[key] = (m[key]||0)+1;
      });
    });
    return m;
  },[cases]);

  const totalCols = 1 + visibleVerts.length;

  return (
    <div>
      <div className="matrix-legend">
        <strong style={{fontSize:'12px',color:'var(--text-secondary)'}}>Legend:</strong>
        {Object.entries(CATEGORY_CONFIG).map(([key,cfg])=>(
          <div key={key} className="legend-item">
            <div className="legend-dot" style={{background:
              key==='Core'?'var(--ks-red)':key==='Tier-2'?'var(--ks-web-teal)':'var(--ks-web-yellow)'}}/>
            {cfg.label}
          </div>
        ))}
        <div className="legend-item">
          <div className="legend-dot" style={{background:'none',border:'1.5px solid #ccc',boxSizing:'border-box'}}/>
          No use cases yet
        </div>
      </div>
      <div className="matrix-wrap">
        <table className="matrix-table">
          <thead>
            {visibleGroups.length > 1 && (
              <tr>
                <th className="col-freeze" style={{textAlign:'left',width:190}}/>
                {visibleGroups.map(([catKey,catCfg])=>(
                  <th key={catKey} colSpan={catCfg.verticals.length} className={`cat-head col-${catCfg.cls}`}
                    style={{color:catKey==='Core'?'#ffaaaa':catKey==='Tier-2'?'#8fd7dd':'#ffd080'}}>
                    {catCfg.label}
                  </th>
                ))}
              </tr>
            )}
            <tr>
              <th className="col-freeze" style={{textAlign:'left',width:190}}>Product</th>
              {visibleGroups.flatMap(([catKey,catCfg])=>
                catCfg.verticals.map(v=>{
                  const vc = getVertColor(v);
                  return (
                    <th key={v} className={`vert-head col-${catCfg.cls}`}
                      style={{borderBottom:`3px solid ${vc.bg}`}}>
                      <span style={{display:'inline-block',width:8,height:8,borderRadius:'50%',background:vc.bg,marginRight:5,verticalAlign:'middle'}}/>
                      {v}
                    </th>
                  );
                })
              )}
            </tr>
          </thead>
          <tbody>
            {PRODUCT_GROUPS.map(pg=>(
              <React.Fragment key={pg.group}>
                <tr className="prod-group">
                  <td colSpan={totalCols}>{pg.group}</td>
                </tr>
                {pg.products.map(prod=>(
                  <tr key={prod} className="prod-row">
                    <td className="col-freeze">{prod}</td>
                    {visibleGroups.flatMap(([catKey,catCfg])=>
                      catCfg.verticals.map(v=>{
                        const cnt = countMap[`${prod}||${v}`]||0;
                        const cls = catCfg.cls;
                        const vc = getVertColor(v);
                        return (
                          <td key={v} className={`col-${cls}${cnt>0?' has-cases':''}`}>
                            {cnt>0?(
                              <span
                                className={`matrix-check ${cls}`}
                                title={`${cnt} use case${cnt>1?'s':''}: ${prod} × ${v}`}
                                onClick={()=>onSelectCell(prod,v)}
                                style={{cursor:'pointer', background:vc.bg}}
                              >{cnt}</span>
                            ):(
                              <span className="matrix-check empty">—</span>
                            )}
                          </td>
                        );
                      })
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{fontSize:'11.5px',color:'var(--text-muted)',marginTop:'12px'}}>
        Use the category tabs above to filter columns · Click any number to jump to matching use cases.
      </p>
    </div>
  );
}
