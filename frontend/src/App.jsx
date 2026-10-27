import { useEffect, useState } from "react";
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  Code2,
  ExternalLink,
  FileImage,
  FolderKanban,
  GitBranch,
  Home,
  Layers3,
  Menu,
  Network,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { api } from "./api";

const navItems = [
  { label: "Dashboard", icon: Home },
  { label: "Skill Bank", icon: BookOpen },
  { label: "Skill Wallet", icon: WalletCards },
  { label: "Skill Card", icon: ClipboardList },
  { label: "Skill Credits", icon: CircleDollarSign },
];

function App() {
  const [project, setProject] = useState(null);
  const [skills, setSkills] = useState([]);
  const [epics, setEpics] = useState([]);
  const [architecture, setArchitecture] = useState(null);
  const [requirements, setRequirements] = useState(null);
  const [credits, setCredits] = useState(null);
  const [active, setActive] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      api.project(),
      api.skills(),
      api.epics(),
      api.architecture(),
      api.requirements(),
      api.credits(),
    ]).then(([p, s, e, a, r, c]) => {
      setProject(p);
      setSkills(s.skills);
      setEpics(e.epics);
      setArchitecture(a);
      setRequirements(r);
      setCredits(c);
    }).catch(console.error);
  }, []);

  if (!project) {
    return <div className="loading-screen"><div className="loader" /> Loading platform...</div>;
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">S</div>
          <div>
            <strong>SKILL</strong>
            <strong>WALLET</strong>
          </div>
        </div>

        <nav>
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={active === label ? "nav-item active" : "nav-item"}
              onClick={() => {
                setActive(label);
                setMenuOpen(false);
              }}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="credit-mini">
            <CircleDollarSign size={16} />
            <span>{credits?.balance ?? 0} credits</span>
          </div>
          <div className="user-mini">
            <div className="avatar">SN</div>
            <div>
              <strong>Project User</strong>
              <span>Builder</span>
            </div>
          </div>
        </div>
      </aside>

      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}

      <main className="main">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(true)}><Menu /></button>
          <div className="breadcrumbs">
            <span>Skill Wallet</span>
            <span>/</span>
            <strong>{active}</strong>
          </div>
          <div className="top-actions">
            <button className="icon-button"><Search size={18} /></button>
            <button className="profile-button"><div className="avatar small">SN</div><ChevronDown size={14} /></button>
          </div>
        </header>

        {active === "Dashboard" && (
          <Dashboard
            project={project}
            skills={skills}
            epics={epics}
            architecture={architecture}
            requirements={requirements}
          />
        )}

        {active === "Skill Bank" && <SkillBank skills={skills} />}
        {active === "Skill Wallet" && <SkillWallet credits={credits} />}
        {active === "Skill Card" && <SkillCard project={project} skills={skills} />}
        {active === "Skill Credits" && <SkillCredits credits={credits} />}
      </main>
    </div>
  );
}

function Dashboard({ project, skills, epics, architecture, requirements }) {
  const [tab, setTab] = useState("Overview");
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">Project Workspace</div>
          <h1>{project.title}</h1>
        </div>
        <div className="heading-actions">
          <a className="outline-button" href="https://github.com/" target="_blank" rel="noreferrer">
            <GitBranch size={16} /> GitHub
          </a>
          <button className="primary-button" onClick={() => setAiOpen(true)}>
            <Sparkles size={16} /> AI Analyze
          </button>
        </div>
      </div>

      <div className="tabs">
        {["Overview", "Workspace", "Kanban"].map((item) => (
          <button key={item} className={tab === item ? "tab active" : "tab"} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <>
          <div className="notice">
            <div className="notice-icon"><Sparkles size={18} /></div>
            <div>
              <strong>Build a multimodal decision-support platform</strong>
              <p>Combine project data, construction images, planning workflows, and AI-generated recommendations in one workspace.</p>
            </div>
          </div>

          <div className="content-grid">
            <div className="main-column">
              <section className="card project-card">
                <div className="card-header">
                  <div>
                    <span className="pill">{project.category}</span>
                    <span className="pill secondary">{project.type}</span>
                  </div>
                  <span className="status-dot"><i /> {project.status}</span>
                </div>
                <p className="lead">{project.description}</p>
                <p>{project.goal}</p>

                <h3>Skills Required</h3>
                <div className="skill-tags">
                  {skills.map((skill) => <span className="skill-tag" key={skill.name}>{skill.name}</span>)}
                </div>

                <h3>Project Progress</h3>
                <div className="progress-summary">
                  <div>
                    <span>Overall progress</span>
                    <strong>{project.progress}%</strong>
                  </div>
                  <div className="progress-track"><div style={{ width: `${project.progress}%` }} /></div>
                </div>

                <div className="epic-list">
                  {epics.slice(0, 6).map((epic) => (
                    <div className="epic-row" key={epic.id}>
                      <div className="epic-number">E{epic.id}</div>
                      <div className="epic-info">
                        <strong>{epic.title}</strong>
                        <span>{epic.tasks} tasks · {epic.progress}% complete</span>
                      </div>
                      <span className="epic-status">{epic.status}</span>
                    </div>
                  ))}
                </div>
              </section>

              <Architecture architecture={architecture} />
              <Requirements requirements={requirements} />
            </div>

            <aside className="right-column">
              <Stats project={project} />
              <AIQuickCard onOpen={() => setAiOpen(true)} />
              <MentorCard />
            </aside>
          </div>
        </>
      )}

      {tab === "Workspace" && <Workspace />}
      {tab === "Kanban" && <Kanban epics={epics} />}

      {aiOpen && <AIAnalyzer onClose={() => setAiOpen(false)} />}
    </section>
  );
}

function Stats({ project }) {
  return (
    <section className="card">
      <div className="section-title"><BarChart3 size={17} /> Project Stats</div>
      <div className="stats-grid">
        <div className="stat blue"><strong>{project.stats.epics}</strong><span>Epics</span></div>
        <div className="stat green"><strong>{project.stats.stories}</strong><span>Stories</span></div>
        <div className="stat purple"><strong>{project.stats.subtasks}</strong><span>Subtasks</span></div>
      </div>
    </section>
  );
}

function AIQuickCard({ onOpen }) {
  return (
    <section className="card gradient-card">
      <Sparkles size={22} />
      <h3>AI Construction Analyst</h3>
      <p>Analyze site observations, risks, materials, schedules, and construction images.</p>
      <button className="light-button" onClick={onOpen}>Open analyzer</button>
    </section>
  );
}

function MentorCard() {
  return (
    <section className="card mentor-card">
      <div className="section-title"><UserRound size={17} /> Mentor</div>
      <div className="empty-state">
        <div className="empty-icon"><UserRound /></div>
        <strong>No mentor assigned yet</strong>
        <span>Assign a construction or AI mentor when the project moves into review.</span>
        <button className="outline-button"><Plus size={15} /> Assign mentor</button>
      </div>
    </section>
  );
}

function Architecture({ architecture }) {
  if (!architecture) return null;
  return (
    <section className="card">
      <div className="section-title"><Network size={17} /> Technical Architecture</div>
      <div className="architecture">
        {architecture.layers.map((layer, index) => (
          <div className="arch-layer" key={layer.title}>
            <div className="arch-title">{layer.title}</div>
            <div className="arch-items">
              {layer.items.map((item) => <div className="arch-item" key={item}><Layers3 size={14} />{item}</div>)}
            </div>
            {index < architecture.layers.length - 1 && <div className="arch-arrow">↓</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

function Requirements({ requirements }) {
  if (!requirements) return null;
  return (
    <section className="card">
      <div className="section-title"><Settings size={17} /> System Requirements</div>
      <div className="requirements-grid">
        <div>
          <h4>Hardware Requirements</h4>
          <ul>{requirements.hardware.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div>
          <h4>Software Requirements</h4>
          <ul>{requirements.software.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

function Workspace() {
  const [prompt, setPrompt] = useState("Inspect a concrete slab for visible defects and recommend the next construction QA actions.");
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [file, setFile] = useState(null);

  async function runAnalysis() {
    setBusy(true);
    try {
      if (file) await api.upload(file);
      const response = await api.analyze({
        prompt,
        context: "Construction project workspace. Focus on safety, QA/QC, planning and actionable next steps.",
        imageName: file?.name,
      });
      setResult(response);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="workspace-grid">
      <section className="card analyzer-card">
        <div className="section-title"><BrainCircuit size={18} /> Multimodal Analysis Workspace</div>
        <p className="muted">Upload a construction image and describe what you want the AI to assess.</p>
        <label className="dropzone">
          <input type="file" accept="image/*,.pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <Upload size={26} />
          <strong>{file ? file.name : "Choose an image or document"}</strong>
          <span>PNG, JPG, WEBP or PDF</span>
        </label>
        <label className="field-label">Analysis prompt</label>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows="7" />
        <button className="primary-button full" onClick={runAnalysis} disabled={busy}>
          <Sparkles size={16} /> {busy ? "Analyzing..." : "Run AI analysis"}
        </button>
      </section>
      <section className="card results-card">
        <div className="section-title"><ShieldCheck size={18} /> Analysis Result</div>
        {!result ? (
          <div className="empty-result">
            <FileImage size={36} />
            <strong>No analysis yet</strong>
            <span>Run the analyzer to see risks, recommendations and next actions.</span>
          </div>
        ) : (
          <AnalysisResult result={result} />
        )}
      </section>
    </div>
  );
}

function AnalysisResult({ result }) {
  return (
    <div className="analysis-result">
      <div className="result-summary">{result.summary}</div>
      {result.risks.map((risk, i) => (
        <div className={`risk ${risk.severity.toLowerCase()}`} key={i}>
          <div className="risk-badge">{risk.severity}</div>
          <div><strong>{risk.title}</strong><p>{risk.detail}</p></div>
        </div>
      ))}
      <h4>Recommendations</h4>
      <ol>{result.recommendations.map((x) => <li key={x}>{x}</li>)}</ol>
      <h4>Next actions</h4>
      <div className="action-list">
        {result.next_actions.map((x) => <div key={x.action}><strong>{x.owner}</strong><span>{x.action}</span></div>)}
      </div>
    </div>
  );
}

function Kanban({ epics }) {
  const columns = ["Planned", "In Progress", "Completed"];
  return (
    <div className="kanban-page">
      <div className="page-heading compact">
        <div><div className="eyebrow">Delivery</div><h2>Project Kanban</h2></div>
        <button className="primary-button"><Plus size={16} /> New task</button>
      </div>
      <div className="kanban">
        {columns.map((column) => (
          <div className="kanban-column" key={column}>
            <div className="kanban-column-title"><span>{column}</span><b>{epics.filter((x) => x.status === column).length}</b></div>
            {epics.filter((x) => x.status === column).map((epic) => (
              <div className="task-card" key={epic.id}>
                <span className="task-id">EPIC-{epic.id}</span>
                <strong>{epic.title}</strong>
                <span>{epic.tasks} tasks</span>
                <div className="mini-progress"><div style={{ width: `${epic.progress}%` }} /></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
function SkillBank({ skills }) {
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">Talent</div>
          <h1>Skill Bank</h1>
          <p>
            Required skills for the construction intelligence project.
          </p>
        </div>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <div
            className="card skill-card"
            key={skill.name}
          >
            <div className="skill-icon">
              <Code2 size={20} />
            </div>

            <span className="pill">
              {skill.type}
            </span>

            <h3>{skill.name}</h3>

            <p>
              Target proficiency:{" "}
              <strong>{skill.level}</strong>
            </p>

            <button
              type="button"
              className="outline-button"
              onClick={() => setSelectedSkill(skill)}
            >
              View skill
            </button>
          </div>
        ))}
      </div>

      {/* Skill Details Modal */}
      {selectedSkill && (
        <div
          className="skill-modal-overlay"
          onClick={() => setSelectedSkill(null)}
        >
          <div
            className="skill-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedSkill(null)}
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <div className="skill-modal-icon">
              <Code2 size={28} />
            </div>

            <span className="pill">
              {selectedSkill.type}
            </span>

            <h2>{selectedSkill.name}</h2>

            <p>
              Target proficiency:{" "}
              <strong>{selectedSkill.level}</strong>
            </p>

            <div className="skill-modal-details">
              <h4>Skill Details</h4>

              <p>
                This skill is required for the construction
                intelligence project.
              </p>

              <div className="skill-detail-row">
                <span>Skill</span>
                <strong>{selectedSkill.name}</strong>
              </div>

              <div className="skill-detail-row">
                <span>Category</span>
                <strong>{selectedSkill.type}</strong>
              </div>

              <div className="skill-detail-row">
                <span>Required Level</span>
                <strong>{selectedSkill.level}</strong>
              </div>
            </div>

            <button
              type="button"
              className="outline-button"
              onClick={() => setSelectedSkill(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}



  function SkillWallet({ credits }) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const portfolioSkills = [
  {
    name: "Python",
    level: "Advanced",
    progress: 85,
  },
  {
    name: "FastAPI",
    level: "Intermediate",
    progress: 70,
  },
  {
    name: "Prompt Engineering",
    level: "Intermediate",
    progress: 60,
  },
];
  return (
    <section className="page">
      <div className="page-heading"><div><div className="eyebrow">Profile</div><h1>Skill Wallet</h1><p>Your project skills, credits and development activity.</p></div></div>
      <div className="wallet-hero">
        <div><span>Available credits</span><strong>{credits?.balance ?? 0}</strong><small>Skill Credits</small></div>
        <CircleDollarSign size={70} />
      </div>
      <div className="card">
  <div className="section-title">
    <WalletCards size={17} />
    Skill portfolio
  </div>

  <div className="portfolio-list">

    {portfolioSkills.map((skill) => (
      <div
        key={skill.name}
        className="portfolio-item"
        onClick={() => setSelectedSkill(skill)}
      >
        <span>{skill.name}</span>

        <div className="portfolio-bar">
          <i style={{ width: `${skill.progress}%` }} />
        </div>

        <strong>{skill.progress}%</strong>
      </div>
    ))}

  </div>
</div>
{selectedSkill && (
  <div
    className="skill-modal-overlay"
    onClick={() => setSelectedSkill(null)}
  >
    <div
      className="skill-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="modal-close"
        onClick={() => setSelectedSkill(null)}
        aria-label="Close"
      >
        <X size={22} />
      </button>

      <div className="skill-modal-icon">
        <Code2 size={28} />
      </div>

      <span className="pill">
        Skill
      </span>

      <h2>{selectedSkill.name}</h2>

      <p>
        Current proficiency:{" "}
        <strong>{selectedSkill.level}</strong>
      </p>

      <div className="skill-modal-details">
        <h4>Skill Progress</h4>

        <div className="portfolio-bar large">
          <i
            style={{
              width: `${selectedSkill.progress}%`,
            }}
          />
        </div>

        <p>
          Progress: <strong>{selectedSkill.progress}%</strong>
        </p>

        <div className="skill-detail-row">
          <span>Skill</span>
          <strong>{selectedSkill.name}</strong>
        </div>

        <div className="skill-detail-row">
          <span>Current Level</span>
          <strong>{selectedSkill.level}</strong>
        </div>
      </div>

      <button
        type="button"
        className="outline-button"
        onClick={() => setSelectedSkill(null)}
      >
        Close
      </button>
    </div>
  </div>
)}
    </section>
  );
}

function SkillCard({ project, skills }) {
  return (
    <section className="page">
      <div className="page-heading"><div><div className="eyebrow">Identity</div><h1>Skill Card</h1><p>A compact project-ready profile.</p></div></div>
      <div className="skill-card-large">
        <div className="card-profile">
          <div className="avatar huge">SN</div>
          <div><h2>Project User</h2><p>Construction Intelligence Builder</p><span className="status-dot"><i /> Available</span></div>
        </div>
        <div className="card-section"><h3>Project</h3><strong>{project.title}</strong></div>
        <div className="card-section"><h3>Verified Skills</h3><div className="skill-tags">{skills.map(s => <span className="skill-tag" key={s.name}>{s.name}</span>)}</div></div>
      </div>
    </section>
  );
}

function SkillCredits({ credits }) {
  return (
    <section className="page">
      <div className="page-heading"><div><div className="eyebrow">Rewards</div><h1>Skill Credits</h1><p>Credit balance and recent activity.</p></div></div>
      <div className="credit-stats">
        <div className="card"><span>Balance</span><strong>{credits?.balance ?? 0}</strong></div>
        <div className="card"><span>Earned</span><strong>{credits?.earned ?? 0}</strong></div>
        <div className="card"><span>Spent</span><strong>{credits?.spent ?? 0}</strong></div>
      </div>
      <div className="card">
        <div className="section-title"><CircleDollarSign size={17} /> Transactions</div>
        <div className="transaction-list">{credits?.transactions?.map((t) => <div key={t.label}><span>{t.label}<small>{t.date}</small></span><b className={t.amount > 0 ? "positive" : ""}>{t.amount > 0 ? "+" : ""}{t.amount}</b></div>)}</div>
      </div>
    </section>
  );
}

function AIAnalyzer({ onClose }) {
  const [prompt, setPrompt] = useState("Analyze this construction observation and identify risks, likely causes, and recommended next actions.");
  const [context, setContext] = useState("Project phase: structural works. Priority: safety and quality.");
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true);
    try {
      setResult(await api.analyze({ prompt, context }));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header"><div><div className="eyebrow">AI Layer</div><h2>Construction AI Analyzer</h2></div><button className="icon-button" onClick={onClose}><X /></button></div>
        <div className="modal-body">
          <label className="field-label">Prompt</label>
          <textarea rows="4" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <label className="field-label">Project context</label>
          <textarea rows="3" value={context} onChange={(e) => setContext(e.target.value)} />
          <button className="primary-button full" onClick={run} disabled={busy}><Sparkles size={16} /> {busy ? "Analyzing..." : "Analyze"}</button>
          {result && <AnalysisResult result={result} />}
        </div>
      </div>
    </div>
  );
}

export default App;
