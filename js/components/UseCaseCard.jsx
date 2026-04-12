// js/components/UseCaseCard.jsx
// Renders a single use case card with vertical color coding

/* ── USE CASE CARD ───────────────────────────────────────────────────────── */
function UseCaseCard({item, delay}) {
  const [open, setOpen] = useState(false);
  const catCls = getCatCls(item.cat);
  return (
    <div className="uc-card card-anim" style={{animationDelay:`${delay}ms`}}>
      <div className="card-stripe" style={{background: getVertColor(item.vert).bg}}/>
      <div className="uc-card-head">
        <div className="badge-row">
          <span className="badge badge-vert" style={{background: getVertColor(item.vert).bg}}>{item.vert}</span>
          <span className={`badge ${getBadgeCatCls(item.cat)}`}>{getCatLabel(item.cat)}</span>
          {item.prods.map((p,i)=>(
            <span key={i} className="badge badge-prod">{p}</span>
          ))}
        </div>
      </div>
      <div className="card-divider"/>
      <div className="uc-card-body">
        <h3 className="card-title">{item.prob}</h3>
        <div className="trigger-block" style={{borderLeftColor: getVertColor(item.vert).bg}}>
          <div className="trigger-label" style={{color: getVertColor(item.vert).bg}}>Buying Trigger</div>
          <div className="trigger-text">{item.trigger}</div>
        </div>
        <div className="card-section">
          <div className="section-label">Customer Challenge</div>
          <p className="section-text">{item.challenge}</p>
        </div>
        <div className="card-section">
          <div className="section-label">How Keysight Solves It</div>
          <div className="solution-box">
            <p className="section-text">{item.solution}</p>
          </div>
        </div>
        <div className="card-section">
          <div className="section-label">Technical Capabilities</div>
          <div className="cap-list">
            {item.caps.map((c,i)=>(<span key={i} className="badge-cap">{c}</span>))}
          </div>
        </div>
        <div className="card-section" style={{marginBottom:0}}>
          <div className="section-label">Business Outcome</div>
          <p className="outcome-text">{item.outcome}</p>
        </div>
      </div>
    </div>
  );
}
