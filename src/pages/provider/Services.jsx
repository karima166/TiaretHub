import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";
import Chip from "../../components/ui/Chip";
import Toggle from "../../components/ui/Toggle";
import { C, F, SERVICE_STATUS_CONFIG } from "../../styles/theme";
import { MOCK_PROVIDERS, SERVICE_TASKS_LIBRARY } from "../../data/mockData";

export default function Services() {
  const provider = MOCK_PROVIDERS[0]; // Karim Boudiaf
  const [services, setServices] = useState(provider.services);
  const [expandedId, setExpandedId] = useState(provider.services?.[0]?.id || null);
  
  // Task Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({ id: "", name: "", price: 0, duration: 1, description: "", mandatory: false });

  const toggleServiceActive = (id) => {
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, is_active: !s.is_active } : s));
  };

  const getStatusChip = (status) => {
    return SERVICE_STATUS_CONFIG[status] || { label: status, bg: C.grayLt, color: C.dark };
  };

  const openTaskModal = (serviceId, task = null) => {
    setActiveServiceId(serviceId);
    if (task) {
      setEditingTask(task);
      setTaskForm(task);
    } else {
      setEditingTask(null);
      setTaskForm({ id: Date.now(), name: "", price: 0, duration: 1, description: "", mandatory: false });
    }
    setIsModalOpen(true);
  };

  const handleTaskLibrarySelect = (e) => {
    const taskId = e.target.value;
    const service = services.find(s => s.id === activeServiceId);
    const categoryId = service?.id === 1 ? "PLOMBERIE" : (service?.id === 2 ? "ELECTRICITE" : "CLIMATISATION"); // Mock mapping
    const libraryTask = SERVICE_TASKS_LIBRARY[categoryId]?.find(t => t.id === taskId);
    
    if (libraryTask) {
      setTaskForm({
        ...taskForm,
        name: libraryTask.name,
        price: libraryTask.defaultPrice,
        duration: libraryTask.duration,
        description: libraryTask.description
      });
    }
  };

  const saveTask = () => {
    setServices(prev => prev.map(s => {
      if (s.id !== activeServiceId) return s;
      const tasks = s.tasks || [];
      const newTasks = editingTask 
        ? tasks.map(t => t.id === editingTask.id ? taskForm : t)
        : [...tasks, taskForm];
      return { ...s, tasks: newTasks };
    }));
    setIsModalOpen(false);
  };

  const deleteTask = (serviceId, taskId) => {
    if (!window.confirm("Delete this task?")) return;
    setServices(prev => prev.map(s => {
      if (s.id !== serviceId) return s;
      return { ...s, tasks: s.tasks.filter(t => t.id !== taskId) };
    }));
  };

  return (
    <div style={{ position: "relative" }}>
      <SectionTitle>My Service Tasks & Pricing</SectionTitle>

      <div style={{ background: C.primaryLt, borderLeft: `4px solid ${C.primary}`, padding: "12px 16px", borderRadius: "0 10px 10px 0", marginBottom: 24, fontSize: 13, color: C.dark }}>
        <b>Structure your offer:</b> A <b>Service</b> is your high-level category. <b>Tasks</b> are the professional interventions you offer. Use the standard library to ensure quality.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {services.map((s) => {
          const st = getStatusChip(s.status);
          const isExpanded = expandedId === s.id;

          return (
            <Card key={s.id} style={{ display: "flex", flexDirection: "column", gap: 0, padding: 0, overflow: "hidden", border: isExpanded ? `1.5px solid ${C.primary}33` : `1px solid ${C.gray}` }}>
              <div 
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", cursor: "pointer", background: isExpanded ? `${C.primary}05` : "transparent" }}
                onClick={() => setExpandedId(isExpanded ? null : s.id)}
              >
                 <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: 0.5 }}>Service Category</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                       <span style={{ fontWeight: 800, color: C.dark, fontSize: 18, fontFamily: F.heading }}>{s.title}</span>
                       <Chip label={st.label} bg={st.bg} color={st.color} />
                    </div>
                    <div style={{ fontSize: 13, color: C.muted }}>{s.description}</div>
                 </div>

                 <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                    <div>
                      <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", fontWeight: 700 }}>Base Fee</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: C.primary }}>{s.price} DA</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }} onClick={e => e.stopPropagation()}>
                       <Toggle enabled={s.is_active} onChange={() => toggleServiceActive(s.id)} />
                    </div>
                    <div style={{ color: C.muted, fontWeight: 900 }}>{isExpanded ? "−" : "+"}</div>
                 </div>
              </div>

              {isExpanded && (
                <div style={{ borderTop: `1px solid ${C.gray}55`, padding: 24, background: C.white }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: C.dark }}>Configured Tasks</h4>
                    </div>
                    <Button size="sm" onClick={() => openTaskModal(s.id)}>+ Add Standard Task</Button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {s.tasks && s.tasks.map(t => (
                      <div key={t.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, borderRadius: 12, border: `1px solid ${C.gray}`, background: C.grayLt }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                             <span style={{ fontWeight: 700, fontSize: 14, color: C.dark }}>{t.name}</span>
                             {t.mandatory && <Chip label="MANDATORY" bg={C.yellowLt} color={C.yellowDk} size="xs" />}
                          </div>
                          <span style={{ fontSize: 12, color: C.muted }}>{t.description}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                           <div style={{ textAlign: "right" }}>
                             <div style={{ fontSize: 13, fontWeight: 800, color: C.dark }}>{t.price} DA</div>
                             <div style={{ fontSize: 11, color: C.muted }}>{t.duration}h</div>
                           </div>
                           <div style={{ display: "flex", gap: 4 }}>
                             <Button size="xs" variant="ghost" onClick={() => openTaskModal(s.id, t)}>Edit</Button>
                             <Button size="xs" variant="ghost" style={{ color: C.red }} onClick={() => deleteTask(s.id, t.id)}>Delete</Button>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* TASK CONFIGURATION MODAL */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,26,46,0.8)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 500, boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontFamily: F.heading, fontSize: 20, fontWeight: 800, color: C.dark, marginBottom: 24 }}>
              {editingTask ? "Edit Task" : "Add Professional Task"}
            </h3>

            {!editingTask && (
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8, textTransform: "uppercase" }}>Select from Professional Library</label>
                <select 
                  onChange={handleTaskLibrarySelect}
                  style={{ width: "100%", padding: "12px", borderRadius: 10, border: `2px solid ${C.gray}`, fontFamily: F.body, outline: "none", background: C.white }}
                >
                  <option value="">— Choose a standard task —</option>
                  {(() => {
                    const service = services.find(s => s.id === activeServiceId);
                    // Match the service title to the library key (case-insensitive or mapped)
                    const libKey = service?.title.toUpperCase().includes("PLUMBING") ? "PLOMBERIE" : 
                                   service?.title.toUpperCase().includes("ELECTRIC") ? "ELECTRICITE" : 
                                   service?.title.toUpperCase().includes("AC") ? "CLIMATISATION" : null;
                    
                    const tasks = libKey ? SERVICE_TASKS_LIBRARY[libKey] : [];
                    return tasks.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ));
                  })()}
                </select>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>
                  Only tasks related to <b>{services.find(s => s.id === activeServiceId)?.title}</b> are shown.
                </div>
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>Task Name</label>
              <input value={taskForm.name} onChange={e => setTaskForm({...taskForm, name: e.target.value})} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `2px solid ${C.gray}`, fontSize: 14 }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>Price (DA)</label>
                <input type="number" value={taskForm.price} onChange={e => setTaskForm({...taskForm, price: parseInt(e.target.value)})} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `2px solid ${C.gray}`, fontSize: 14 }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>Est. Duration (hrs)</label>
                <input type="number" value={taskForm.duration} onChange={e => setTaskForm({...taskForm, duration: parseInt(e.target.value)})} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `2px solid ${C.gray}`, fontSize: 14 }} />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>Description</label>
              <textarea value={taskForm.description} onChange={e => setTaskForm({...taskForm, description: e.target.value})} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `2px solid ${C.gray}`, fontSize: 14, minHeight: 80, fontFamily: F.body }} />
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <Button style={{ flex: 1 }} onClick={saveTask}>Save Task</Button>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
