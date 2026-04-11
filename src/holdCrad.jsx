import { useState, useEffect, useRef } from "react";

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbweBe-5UwOvT-VquNdfAVbR0diYuHRNEMdj6BL5IoRPVL5fzBOLVngFLp_VtLYQznimww/exec";

/* ── tiny helpers ── */
const safeValue = (v) => (v && v.toString().trim() !== "" ? v : "N/A");

const getDurationFromNow = (dateStr) => {
  if (!dateStr) return "N/A";
  const diff = Date.now() - new Date(dateStr);
  if (diff < 0) return "0 min";
  const min = Math.floor(diff / 60000);
  return `${Math.floor(min / 60)}h ${min % 60}m`;
};

const nowLocalISO = () => {
  const n = new Date();
  n.setMinutes(n.getMinutes() - n.getTimezoneOffset());
  return n.toISOString().slice(0, 16);
};

/* ══════════════════════════════════════════════
   Searchable Select component (replaces Select2)
   ══════════════════════════════════════════════ */
function SearchSelect({ id, placeholder, options, value, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase()),
  );

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const choose = (opt) => {
    onChange(opt.value);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      {/* trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((p) => !p)}
        style={{
          width: "100%",
          minHeight: 57,
          padding: "8px 36px 8px 14px",
          borderRadius: 10,
          border: `2px solid ${open ? "#667eea" : "#e0e0e0"}`,
          background: disabled ? "#e9ecef" : "#fff",
          textAlign: "left",
          cursor: disabled ? "not-allowed" : "pointer",
          fontSize: 14,
          color: selected ? "#333" : "#999",
          boxShadow: open ? "0 0 10px rgba(102,126,234,.3)" : "none",
          transition: "border-color .25s, box-shadow .25s",
          position: "relative",
        }}
      >
        {selected ? selected.label : placeholder}
        <span
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
            transition: "transform .2s",
            color: "#667eea",
          }}
        >
          ▾
        </span>
      </button>

      {/* dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            zIndex: 9999,
            width: "100%",
            background: "#fff",
            border: "2px solid #667eea",
            borderRadius: 10,
            boxShadow: "0 5px 15px rgba(0,0,0,.15)",
            marginTop: 4,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "8px 8px 4px" }}>
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              style={{
                width: "100%",
                padding: "6px 10px",
                borderRadius: 8,
                border: "2px solid #e0e0e0",
                fontSize: 13,
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />
          </div>
          <ul
            style={{
              maxHeight: 200,
              overflowY: "auto",
              margin: 0,
              padding: "4px 0",
              listStyle: "none",
            }}
          >
            {filtered.length === 0 && (
              <li style={{ padding: "8px 14px", color: "#999", fontSize: 13 }}>
                No results
              </li>
            )}
            {filtered.map((o) => (
              <li
                key={o.value}
                onClick={() => choose(o)}
                style={{
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontSize: 14,
                  background: o.value === value ? "#667eea" : "transparent",
                  color: o.value === value ? "#fff" : "#333",
                  transition: "background .15s",
                }}
                onMouseEnter={(e) => {
                  if (o.value !== value)
                    e.currentTarget.style.background = "rgba(102,126,234,.12)";
                }}
                onMouseLeave={(e) => {
                  if (o.value !== value)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                {o.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   Modal component
   ══════════════════════════════════════════════ */
function Modal({ show, onClose, type, children }) {
  if (!show) return null;
  const hdr = type === "success" ? "#198754" : "#dc3545";
  const icon =
    type === "success" ? "fa-check-circle" : "fa-exclamation-triangle";
  const title = type === "success" ? "Success" : "Error";
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.5)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          width: "100%",
          maxWidth: 480,
          overflow: "hidden",
          animation: "fadeInUp .3s ease",
        }}
      >
        <div
          style={{
            background: hdr,
            color: "#fff",
            padding: "14px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: 600 }}>
            <i className={`fas ${icon} me-2`} />
            {title}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: 20,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: "18px 20px" }}>{children}</div>
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid #eee",
            textAlign: "right",
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: hdr,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 20px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {type === "success" ? "OK" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════ */
export default function HoldCard() {
  /* ── state ── */
  const [mode, setMode] = useState(""); // "" | "WAIT" | "NEW"
  const [masterMap, setMasterMap] = useState({});
  const [waitData, setWaitData] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [defectItems, setDefectItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // form fields
  const [holdNo, setHoldNo] = useState("");
  const [process, setProcess] = useState("");
  const [part, setPart] = useState("");
  const [jobCard, setJobCard] = useState("");
  const [jobCardQty, setJobCardQty] = useState("");
  const [holdDecision, setHoldDecision] = useState("Wait");
  const [supervisor, setSupervisor] = useState("");
  const [dateTime, setDateTime] = useState(nowLocalISO());
  const [actionBy, setActionBy] = useState("");
  const [expectedDecision, setExpectedDecision] = useState("");
  const [selectedDefects, setSelectedDefects] = useState([]);

  // modals
  const [successModal, setSuccessModal] = useState(null); // { holdNo, part, jobCard }
  const [errorModal, setErrorModal] = useState(null); // string message

  /* ── derived option lists ── */
  const processOpts = Object.keys(masterMap).map((p) => ({
    value: p,
    label: p,
  }));

  const partOpts =
    process && masterMap[process]
      ? Object.keys(masterMap[process]).map((p) => ({ value: p, label: p }))
      : [];

  const jobCardOpts =
    process && part && masterMap[process]?.[part]
      ? masterMap[process][part].map((o) => ({
          value: o.jobCard,
          label: o.jobCard,
        }))
      : [];

  const waitOpts = waitData.map((r) => ({
    value: r.holdNo,
    label: `${r.holdNo} | ${r.part} | ${r.jobCard} | ⏱ ${getDurationFromNow(r.dateTime)}`,
  }));

  /* ── fetch master & supervisors & defects on mount ── */
  useEffect(() => {
    fetch(WEB_APP_URL + "?action=master", { redirect: "follow" })
      .then((r) => r.json())
      .then(setMasterMap)
      .catch(() => alert("Master data load failed"));

    fetch(WEB_APP_URL + "?action=getSupervisors")
      .then((r) => r.json())
      .then(setSupervisors);

    fetch(WEB_APP_URL + "?action=getDefectItems")
      .then((r) => r.json())
      .then(setDefectItems);
  }, []);

  /* ── auto-fill qty when jobCard changes ── */
  useEffect(() => {
    if (!process || !part || !jobCard) {
      setJobCardQty("");
      return;
    }
    const rec = masterMap[process]?.[part]?.find((o) => o.jobCard === jobCard);
    setJobCardQty(rec?.qty ?? "");
  }, [jobCard]);

  /* ── reset cascades ── */
  const handleProcessChange = (val) => {
    setProcess(val);
    setPart("");
    setJobCard("");
    setJobCardQty("");
  };

  const handlePartChange = (val) => {
    setPart(val);
    setJobCard("");
    setJobCardQty("");
  };

  /* ── load WAIT holds ── */
  const loadWaitHolds = () => {
    fetch(WEB_APP_URL + "?action=waitHoldAll", { redirect: "follow" })
      .then((r) => r.json())
      .then((data) => {
        setWaitData(data);
        clearForm();
      });
  };

  /* ── radio change ── */
  const handleModeChange = (val) => {
    setMode(val);
    clearForm();
    setDateTime(nowLocalISO());
    if (val === "WAIT") loadWaitHolds();
  };

  /* ── holdNo selection in WAIT mode ── */
  const handleHoldNoChange = (val) => {
    setHoldNo(val);
    const rec = waitData.find((r) => r.holdNo === val);
    if (!rec) return;

    setProcess(rec.process || "");
    setPart(rec.part || "");
    setJobCard(rec.jobCard || "");
    setJobCardQty(rec.jobCardQty || "");
    setHoldDecision(rec.decision || "Wait");
    setSupervisor(rec.supervisor || "");
    setExpectedDecision(rec.expectedDecision || "N/A");

    const saved = rec.defectItems
      ? rec.defectItems.split(",").map((d) => d.trim())
      : [];
    setSelectedDefects(saved);

    if (rec.dateTime) {
      const d = new Date(rec.dateTime);
      setDateTime(
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`,
      );
    }
  };

  /* ── defect toggle ── */
  const toggleDefect = (val) => {
    setSelectedDefects((prev) =>
      prev.includes(val) ? prev.filter((d) => d !== val) : [...prev, val],
    );
  };

  /* ── clear form ── */
  const clearForm = () => {
    setHoldNo("");
    setProcess("");
    setPart("");
    setJobCard("");
    setJobCardQty("");
    setHoldDecision("Wait");
    setSupervisor("");
    setExpectedDecision("");
    setActionBy("");
    setSelectedDefects([]);
  };

  /* ── submit ── */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedDefects.length === 0) {
      alert("Please select at least one defect item");
      return;
    }

    // duplicate check for NEW
    if (mode === "NEW") {
      const dup = waitData.some(
        (r) =>
          r.process === process && r.part === part && r.jobCard === jobCard,
      );
      if (dup) {
        setErrorModal(
          "Hold already exists (WAIT) for same Process, Part & Job Card",
        );
        return;
      }
    }

    setLoading(true);

    const payload = {
      holdCardNumber: mode === "WAIT" ? safeValue(holdNo) : "NEW",
      process: safeValue(process),
      part: safeValue(part),
      jobCard: safeValue(jobCard),
      jobCardQty: safeValue(jobCardQty),
      hold: safeValue(holdDecision),
      defectItems: safeValue(
        selectedDefects.join(", ") || "No Defect Selected",
      ),
      expectedDecision: safeValue(expectedDecision),
      dateTime: safeValue(dateTime),
      mode: safeValue(mode),
      supervisor: safeValue(supervisor),
      actionBy: safeValue(actionBy),
    };

    fetch(WEB_APP_URL, { method: "POST", body: JSON.stringify(payload) })
      .then((r) => r.json())
      .then((res) => {
        setLoading(false);
        if (!res.holdNo) throw new Error(res.message);
        setSuccessModal({ holdNo: res.holdNo, part, jobCard });
        if (mode === "WAIT") loadWaitHolds();
        setTimeout(() => {
          window.location.href = "/holdScreen";
        }, 5000);
      })
      .catch((err) => {
        setLoading(false);
        setErrorModal(err.message);
      });
  };

  /* ── readonly flags ── */
  const ppjDisabled = mode === "WAIT";
  const supDisabled = mode === "WAIT";
  const dtReadOnly = mode === "WAIT";
  const defectsDisabled = mode === "WAIT";

  /* ── current date display ── */
  const todayStr = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  /* ── styles (inline, matching original exactly) ── */
  const css = `
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: linear-gradient(135deg,#667eea 0%,#764ba2 100%);
      font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
      min-height:100vh;
    }

    @keyframes fadeInUp {
      from { opacity:0; transform:translateY(30px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes slideIn {
      from { opacity:0; transform:translateX(-100%); }
      to   { opacity:1; transform:translateX(0); }
    }

    .hc-wrap {
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:32px 16px;
    }

    .hc-card {
      background:rgba(255,255,255,.95);
      border-radius:15px;
      box-shadow:0 10px 30px rgba(0,0,0,.2);
      padding:15px 30px 30px;
      width:100%;
      max-width:900px;
      animation:fadeInUp .8s ease-out;
    }

    .hc-header {
      background:#f8f9fa;
      border-radius:10px;
      padding:12px 16px;
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      justify-content:space-between;
      margin-bottom:20px;
      gap:10px;
    }

    .hc-title { font-size:1.2rem; font-weight:600; color:#333; }

    .radio-group {
      display:flex;
      justify-content:center;
      gap:20px;
      margin-bottom:20px;
      flex-wrap:wrap;
    }
    .radio-group label {
      display:flex;
      align-items:center;
      cursor:pointer;
      font-weight:500;
      color:#333;
      gap:6px;
    }

    .form-row { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:0; }
    .form-col { flex:1; min-width:200px; }

    .form-group { margin-bottom:20px; }
    .form-label {
      display:block;
      font-size:.85rem;
      font-weight:600;
      color:#555;
      margin-bottom:6px;
    }

    .form-control, .native-select {
      width:100%;
      padding:12px 14px;
      border-radius:10px;
      border:2px solid #e0e0e0;
      font-size:14px;
      font-family:inherit;
      color:#333;
      background:#fff;
      transition:border-color .3s, box-shadow .3s, transform .3s;
      outline:none;
    }
    .form-control:focus, .native-select:focus {
      border-color:#667eea;
      box-shadow:0 0 10px rgba(102,126,234,.3);
      transform:scale(1.01);
    }
    .form-control:read-only { background:#e9ecef; cursor:default; }
    .native-select:disabled { background:#e9ecef; cursor:not-allowed; opacity:.7; }

    textarea.form-control { resize:vertical; min-height:100px; }

    .defect-list {
      border:2px solid #e0e0e0;
      border-radius:10px;
      padding:10px;
      max-height:140px;
      overflow-y:auto;
    }
    .defect-check {
      display:flex;
      align-items:center;
      gap:8px;
      padding:3px 0;
      font-size:14px;
    }
    .defect-check.disabled { opacity:.7; pointer-events:none; }

    .btn-primary {
      width:100%;
      padding:13px;
      background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);
      border:none;
      border-radius:10px;
      color:#fff;
      font-size:1rem;
      font-weight:600;
      cursor:pointer;
      transition:transform .3s, box-shadow .3s;
      position:relative;
      overflow:hidden;
      margin-top:4px;
    }
    .btn-primary:hover {
      transform:translateY(-2px);
      box-shadow:0 5px 15px rgba(102,126,234,.4);
    }

    .alert-info {
      background:#d1ecf1;
      border:1px solid #bee5eb;
      border-radius:10px;
      padding:10px 14px;
      font-size:.85rem;
      color:#0c5460;
      margin-bottom:20px;
      animation:slideIn .5s ease-out;
    }

    .loading-overlay {
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.5);
      z-index:9999;
      display:flex;
      align-items:center;
      justify-content:center;
    }
    .spinner {
      width:48px;
      height:48px;
      border:5px solid rgba(255,255,255,.3);
      border-top-color:#fff;
      border-radius:50%;
      animation:spin .8s linear infinite;
    }
    @keyframes spin { to { transform:rotate(360deg); } }

    @media(max-width:600px){
      .hc-card { padding:12px 14px 20px; }
      .form-row { flex-direction:column; }
    }
  `;

  return (
    <>
      <style>{css}</style>

      {/* Loading */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner" />
        </div>
      )}

      {/* Success Modal */}
      <Modal
        show={!!successModal}
        type="success"
        onClose={() => {
          setSuccessModal(null);
          window.location.reload();
        }}
      >
        {successModal && (
          <>
            <p>
              <b>HoldCard No:</b> {successModal.holdNo}
            </p>
            <p>
              HoldCard No <b>{successModal.holdNo}</b> for Part{" "}
              <b>{successModal.part}</b> in JRC <b>{successModal.jobCard}</b>
            </p>
          </>
        )}
      </Modal>

      {/* Error Modal */}
      <Modal
        show={!!errorModal}
        type="error"
        onClose={() => setErrorModal(null)}
      >
        <p>Error creating hold. Please try again.</p>
        {errorModal && <p>{errorModal}</p>}
      </Modal>

      <div className="hc-wrap">
        <div className="hc-card">
          {/* ── Header ── */}
          <div className="hc-header">
            <img src="img/wrsps.png" alt="Logo" style={{ maxWidth: 100 }} />
            <div style={{ textAlign: "center", flex: 1 }}>
              <i
                className="fas fa-clipboard-list fa-2x"
                style={{ marginRight: 8, color: "#667eea" }}
              />
              <span className="hc-title">Hold Card Screen</span>
            </div>
            <div style={{ fontWeight: 600 }}>{todayStr}</div>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit}>
            {/* Radio Buttons */}
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="filterHold"
                  value="WAIT"
                  checked={mode === "WAIT"}
                  onChange={() => handleModeChange("WAIT")}
                />
                Decision Pending
              </label>
              <label>
                <input
                  type="radio"
                  name="filterHold"
                  value="New"
                  checked={mode === "NEW"}
                  onChange={() => handleModeChange("NEW")}
                />
                New
              </label>
            </div>

            {/* Form Fields - visible only when mode selected */}
            {mode !== "" && (
              <>
                {/* Hold No (WAIT only) */}
                {mode === "WAIT" && (
                  <div className="form-group">
                    <label className="form-label">
                      <i
                        className="fas fa-hashtag"
                        style={{ marginRight: 6 }}
                      />
                      Hold Card Number
                    </label>
                    <SearchSelect
                      id="holdNoSelect"
                      placeholder="Select Hold Card No"
                      options={waitOpts}
                      value={holdNo}
                      onChange={handleHoldNoChange}
                      disabled={false}
                    />
                  </div>
                )}

                {/* Row 1: Process & Part */}
                <div className="form-row">
                  <div className="form-col form-group">
                    <label className="form-label">
                      <i className="fas fa-cogs" style={{ marginRight: 6 }} />
                      Process
                    </label>
                    <SearchSelect
                      id="processSelect"
                      placeholder="Select Process"
                      options={processOpts}
                      value={process}
                      onChange={handleProcessChange}
                      disabled={ppjDisabled}
                    />
                  </div>
                  <div className="form-col form-group">
                    <label className="form-label">
                      <i className="fas fa-cube" style={{ marginRight: 6 }} />
                      Part
                    </label>
                    <SearchSelect
                      id="partSelect"
                      placeholder="Select Part"
                      options={partOpts}
                      value={part}
                      onChange={handlePartChange}
                      disabled={ppjDisabled || !process}
                    />
                  </div>
                </div>

                {/* Row 2: Job Card & Qty */}
                <div className="form-row">
                  <div className="form-col form-group">
                    <label className="form-label">
                      <i
                        className="fas fa-id-card"
                        style={{ marginRight: 6 }}
                      />
                      Job Card
                    </label>
                    <SearchSelect
                      id="jobCardSelect"
                      placeholder="Select Job Card"
                      options={jobCardOpts}
                      value={jobCard}
                      onChange={setJobCard}
                      disabled={ppjDisabled || !part}
                    />
                  </div>
                  <div className="form-col form-group">
                    <label className="form-label">
                      <i className="fas fa-boxes" style={{ marginRight: 6 }} />
                      Job Card Qty
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={jobCardQty}
                      readOnly
                      placeholder="Auto-filled"
                    />
                  </div>
                </div>

                {/* Defects */}
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-bug" style={{ marginRight: 6 }} />
                    Defect Item (Multiple Select)
                  </label>
                  <div className="defect-list">
                    {defectItems.map((d, i) => (
                      <label
                        key={i}
                        className={`defect-check${defectsDisabled ? " disabled" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedDefects.includes(d)}
                          onChange={() => !defectsDisabled && toggleDefect(d)}
                          disabled={defectsDisabled}
                        />
                        {d}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div className="alert-info">
                  <i
                    className="fas fa-info-circle"
                    style={{ marginRight: 6 }}
                  />
                  <strong>Note:</strong> Please coordinate with the Manager
                  before selecting segregation option.
                </div>

                {/* Row 3: Supervisor & Segregate */}
                <div className="form-row">
                  <div className="form-col form-group">
                    <label className="form-label">
                      <i
                        className="fas fa-user-tie"
                        style={{ marginRight: 6 }}
                      />
                      Supervisor Name
                    </label>
                    <select
                      className="native-select"
                      value={supervisor}
                      onChange={(e) => setSupervisor(e.target.value)}
                      disabled={supDisabled}
                      required
                    >
                      <option value="">Select Supervisor</option>
                      {supervisors.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-col form-group">
                    <label className="form-label">
                      <i
                        className="fas fa-hand-paper"
                        style={{ marginRight: 6 }}
                      />
                      Segregate?
                    </label>
                    <select
                      className="native-select"
                      value={holdDecision}
                      onChange={(e) => setHoldDecision(e.target.value)}
                      required
                    >
                      <option value="Wait">Wait</option>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: DateTime & Action By */}
                <div className="form-row">
                  <div className="form-col form-group">
                    <label className="form-label">
                      <i
                        className="fas fa-calendar-alt"
                        style={{ marginRight: 6 }}
                      />
                      Date &amp; Time
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={dateTime}
                      onChange={(e) =>
                        !dtReadOnly && setDateTime(e.target.value)
                      }
                      readOnly={dtReadOnly}
                      required
                    />
                  </div>
                  <div className="form-col form-group">
                    <label className="form-label">
                      <i className="fas fa-user" style={{ marginRight: 6 }} />
                      Action By
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      value={actionBy}
                      onChange={(e) => setActionBy(e.target.value)}
                      required={holdDecision === "No"}
                    />
                  </div>
                </div>

                {/* Recommended Action */}
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-comment" style={{ marginRight: 6 }} />
                    Recommended Action
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Recommended Action"
                    value={expectedDecision}
                    onChange={(e) => setExpectedDecision(e.target.value)}
                    required={holdDecision === "No"}
                  />
                </div>

                <button className="btn-primary" type="submit">
                  <i
                    className="fas fa-paper-plane"
                    style={{ marginRight: 8 }}
                  />
                  Submit
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
