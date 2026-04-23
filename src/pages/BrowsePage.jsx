import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MOCK_PROVIDERS, MOCK_CATEGORIES, COMMUNES_TIARET } from "../data/mockData";
import { C, F } from "../styles/theme";

/* ── Flatten providers into searchable rows: Category > Service > Task ── */
/* ── Flatten providers into searchable rows: Category > Service > Task ── */
const buildSearchIndex = () => {
  const rows = [];
  MOCK_PROVIDERS.forEach(provider => {
    const mainCategory = provider.categories?.[0]?.name || "Other";
    const city = provider.location?.city || "Tiaret";
    
    if (provider.services && provider.services.length > 0) {
      provider.services.forEach((service) => {
        // Base Service Row
        rows.push({
          providerId: provider.id,
          name: provider.name,
          initials: provider.initials,
          color: provider.color,
          category: mainCategory,
          service: mainCategory, // Fallback to category name if profession is missing
          taskLabel: service.title,
          taskPrice: parseInt(service.price) || 0,
          duration: "",
          location: city,
          phone: provider.phone,
          rating_average: provider.rating_average,
          rating_count: provider.rating_count,
          is_verified: provider.is_verified,
          is_available: provider.is_available,
          bio: provider.bio,
          skills: [], // Removed generic skills
        });

        // Add individual tasks as secondary rows if they exist
        if (service.tasks && service.tasks.length > 0) {
          service.tasks.forEach(task => {
            rows.push({
              providerId: provider.id,
              name: provider.name,
              initials: provider.initials,
              color: provider.color,
              category: mainCategory,
              service: service.title,
              taskLabel: task.name,
              taskPrice: (parseInt(service.price) || 0) + (parseInt(task.price) || 0),
              duration: task.duration + " hrs",
              location: city,
              phone: provider.phone,
              rating_average: provider.rating_average,
              rating_count: provider.rating_count,
              is_verified: provider.is_verified,
              is_available: provider.is_available,
              bio: provider.bio,
              skills: [],
            });
          });
        }
      });
    } else {
      rows.push({
        providerId: provider.id,
        name: provider.name,
        initials: provider.initials,
        color: provider.color,
        category: mainCategory,
        service: mainCategory,
        taskLabel: "",
        taskPrice: 0,
        duration: "",
        location: city,
        phone: provider.phone,
        rating_average: provider.rating_average,
        rating_count: provider.rating_count,
        is_verified: provider.is_verified,
        is_available: provider.is_available,
        bio: provider.bio,
        skills: [],
      });
    }
  });
  return rows;
};

/* ── Badge Row Component: Category › Service › Task ── */
const BadgeRow = ({ w }) => (
  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
    {w.category && (
      <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20,
        background: C.primaryLt, color: C.primary, border: `1px solid ${C.primary}44`,
        textTransform: "capitalize" }}>
        📂 {w.category}
      </span>
    )}
    {w.category && w.service && (
      <span style={{ fontSize: 10, color: C.muted, fontWeight: 700 }}>›</span>
    )}
    {w.service && (
      <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20,
        background: C.blueLt, color: C.blue, border: `1px solid ${C.blue}44` }}>
        🔧 {w.service}
      </span>
    )}
    {w.service && w.taskLabel && (
      <span style={{ fontSize: 10, color: C.muted, fontWeight: 700 }}>›</span>
    )}
    {w.taskLabel && (
      <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20,
        background: C.greenLt, color: C.green, border: `1px solid ${C.green}44` }}>
        ✔ {w.taskLabel}
      </span>
    )}
    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20,
      background: C.grayLt, color: C.text, border: `1px solid ${C.gray}` }}>
      📍 {w.location}
    </span>
  </div>
);

export default function BrowsePage({ isLoggedIn, logout, currentUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQ = params.get("q") ? decodeURIComponent(params.get("q")) : "";
  const initialCat = params.get("category") ? decodeURIComponent(params.get("category")) : "All";

  const [search, setSearch] = useState(initialQ);
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState("grid");

  const allRows = useMemo(() => buildSearchIndex(), []);
  const LOCATIONS = COMMUNES_TIARET.map(c => c.name);

  // ── Initialization handled lazily via useLocation above ──

  const resetFilters = () => {
    setSearch(""); setLocationFilter(""); setSelectedCategory("All");
    setRatingFilter(0); setMinPrice(""); setMaxPrice("");
    setVerifiedOnly(false); setOnlyAvailable(false); setSortBy("rating");
  };

  // ── Filter across flattened index (category > service > task) ──
  const filtered = useMemo(() => {
    return allRows.filter(w => {
      const q = search.toLowerCase();

      const matchSearch = !q ||
        w.name.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        w.service.toLowerCase().includes(q) ||
        w.taskLabel.toLowerCase().includes(q) ||
        (w.bio && w.bio.toLowerCase().includes(q)) ||
        w.location.toLowerCase().includes(q);

      const matchCategory = selectedCategory === "All" || w.category === selectedCategory;
      const matchLocation = !locationFilter || w.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchRating = w.rating_average >= ratingFilter;
      const matchVerified = !verifiedOnly || w.is_verified;
      const matchAvailable = !onlyAvailable || w.is_available;
      const price = w.taskPrice || 0;
      const matchMin = !minPrice || price >= parseInt(minPrice);
      const matchMax = !maxPrice || price <= parseInt(maxPrice);

      return matchSearch && matchCategory && matchLocation && matchRating && matchVerified && matchAvailable && matchMin && matchMax;
    });
  }, [allRows, search, selectedCategory, locationFilter, ratingFilter, verifiedOnly, onlyAvailable, minPrice, maxPrice]);

  // ── De-duplicate by provider for the card view but keep task info ──
  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach(row => {
      if (!map.has(row.providerId)) {
        map.set(row.providerId, { ...row, matchedTasks: [] });
      }
      if (row.taskLabel) {
        map.get(row.providerId).matchedTasks.push({ label: row.taskLabel, price: row.taskPrice, duration: row.duration });
      }
    });
    return [...map.values()];
  }, [filtered]);

  const sorted = useMemo(() => {
    return [...grouped].sort((a, b) => {
      if (sortBy === "rating") return b.rating_average - a.rating_average;
      if (sortBy === "reviews") return b.rating_count - a.rating_count;
      if (sortBy === "available") return (b.is_available ? 1 : 0) - (a.is_available ? 1 : 0);
      if (sortBy === "price_asc") return a.taskPrice - b.taskPrice;
      if (sortBy === "price_desc") return b.taskPrice - a.taskPrice;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [grouped, sortBy]);

  const activeFiltersCount = [
    selectedCategory !== "All", locationFilter, ratingFilter > 0,
    minPrice, maxPrice, verifiedOnly, onlyAvailable,
  ].filter(Boolean).length;

  return (
    <div style={{ fontFamily: F.body, background: C.grayLt, minHeight: "100vh" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus, select:focus { outline: none; border-color: ${C.primary} !important; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .card-fade { animation: fadeUp 0.4s ease both; }
        .suggestion-item:hover { background: ${C.primaryLt} !important; color: ${C.primary} !important; }
      `}</style>

      <Navbar isLoggedIn={isLoggedIn} logout={logout} currentUser={currentUser} isDarkBackground={true} />

      {/* ── SEARCH HEADER ── */}
      <section style={{ background: `linear-gradient(135deg, ${C.dark}, #2d3561)`, padding: "140px 5% 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: C.primary, fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>
             — Wilaya of Tiaret
          </p>
          <h1 style={{ fontFamily: F.heading, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", marginBottom: 8 }}>
            Find a Local Professional
          </h1>
          <p style={{ color: "#adb5bd", fontSize: 15, marginBottom: 32 }}>
            Search by category, service, or specific task across Tiaret
          </p>

          {/* Search bar */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: 2, minWidth: 200, position: "relative" }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by service, task, name, or keyword..."
                style={{
                  width: "100%", padding: "16px 16px 16px 48px",
                  borderRadius: 12, border: "2px solid #2d3561",
                  background: "#ffffff10", color: "#fff",
                  fontSize: 15, fontFamily: F.body,
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 160, position: "relative" }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>📍</span>
              <select
                value={locationFilter}
                onChange={e => setLocationFilter(e.target.value)}
                style={{
                  width: "100%", padding: "16px 16px 16px 44px",
                  borderRadius: 12, border: "2px solid #2d3561",
                  background: C.dark, color: locationFilter ? "#fff" : "#adb5bd",
                  fontSize: 15, fontFamily: F.body, cursor: "pointer",
                }}
              >
                <option value="">All Areas</option>
                {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          {/* Quick category tags */}
          <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "#6c757d", fontWeight: 600, display: "flex", alignItems: "center" }}>🔍 Quick:</span>
            {MOCK_CATEGORIES.slice(0, 8).map(cat => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.name)} style={{
                padding: "5px 14px", borderRadius: 20,
                border: selectedCategory === cat.name ? `2px solid ${C.primary}` : "1px solid #2d3561",
                background: selectedCategory === cat.name ? `${C.primary}22` : "transparent",
                color: selectedCategory === cat.name ? C.primary : "#adb5bd",
                fontSize: 12, cursor: "pointer", fontFamily: F.body, fontWeight: 600,
              }}>{cat.icon} {cat.name}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section style={{ padding: "40px 5%", maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ fontSize: 14, color: C.muted, fontWeight: 600 }}>
              Showing <span style={{ color: C.dark, fontWeight: 800 }}>{sorted.length}</span> providers
              {search && <> for "<strong style={{ color: C.primary }}>{search}</strong>"</>}
            </div>
            {activeFiltersCount > 0 && (
              <span style={{ fontSize: 12, background: C.primaryLt, color: C.primary, fontWeight: 700, padding: "4px 12px", borderRadius: 20, border: `1px solid ${C.primary}44` }}>
                {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} active
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
              padding: "8px 14px", borderRadius: 10, border: `2px solid ${C.gray}`,
              fontSize: 13, fontWeight: 600, fontFamily: F.body,
              background: "#fff", color: C.text, cursor: "pointer",
            }}>
              <option value="rating">Top Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="available">Available First</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="name">Name A–Z</option>
            </select>

            <div style={{ display: "flex", background: "#fff", border: `2px solid ${C.gray}`, borderRadius: 10, overflow: "hidden" }}>
              {[["grid", "⊞"], ["list", "☰"]].map(([mode, icon]) => (
                <button key={mode} onClick={() => setViewMode(mode)} style={{
                  padding: "8px 14px", border: "none", cursor: "pointer",
                  background: viewMode === mode ? C.primary : "transparent",
                  color: viewMode === mode ? "#fff" : C.muted,
                  fontSize: 16, fontWeight: 700, transition: "all 0.2s",
                }}>{icon}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>

          {/* SIDEBAR FILTERS */}
          <div style={{ width: 240, flexShrink: 0 }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", border: `1px solid ${C.gray}`, marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 16, color: C.dark }}>📂 Category</div>
              {["All", ...MOCK_CATEGORIES.map(c => c.name)].map(cat => (
                <div key={cat} onClick={() => setSelectedCategory(cat)} style={{
                  padding: "8px 12px", borderRadius: 8, cursor: "pointer",
                  marginBottom: 4, fontSize: 14, fontWeight: 600,
                  background: selectedCategory === cat ? C.primaryLt : "transparent",
                  color: selectedCategory === cat ? C.primary : C.text,
                  transition: "all 0.15s",
                }}>{cat}</div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", border: `1px solid ${C.gray}`, marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 16, color: C.dark }}>⭐ Minimum Rating</div>
              {[0, 4, 4.5, 4.8].map(r => (
                <label key={r} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 10 }}>
                  <input type="radio" name="rating" checked={ratingFilter === r} onChange={() => setRatingFilter(r)}
                    style={{ accentColor: C.primary, width: 15, height: 15 }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
                    {r === 0 ? "Any Rating" : `${r}+ ⭐`}
                  </span>
                </label>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", border: `1px solid ${C.gray}`, marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 16, color: C.dark }}>💰 Task Price (DA)</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `2px solid ${C.gray}`, fontSize: 13, fontFamily: F.body }} />
                <span style={{ color: C.muted, fontWeight: 700 }}>—</span>
                <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `2px solid ${C.gray}`, fontSize: 13, fontFamily: F.body }} />
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", border: `1px solid ${C.gray}`, marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 16 }}>🔎 More Filters</div>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 12 }}>
                <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)}
                  style={{ accentColor: C.primary, width: 16, height: 16 }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>✅ Verified only</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={onlyAvailable} onChange={e => setOnlyAvailable(e.target.checked)}
                  style={{ accentColor: C.primary, width: 16, height: 16 }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>🟢 Available only</span>
              </label>
            </div>

            {activeFiltersCount > 0 && (
              <button onClick={resetFilters} style={{
                width: "100%", padding: "12px 0", borderRadius: 12,
                border: `2px solid ${C.primary}`, background: "transparent",
                color: C.primary, fontWeight: 700, fontSize: 14,
                cursor: "pointer", fontFamily: F.body,
              }}>🔄 Reset Filters</button>
            )}
          </div>

          {/* PROVIDER CARDS */}
          <div style={{ flex: 1 }}>
            {sorted.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px", background: "#fff", borderRadius: 20, border: `1px solid ${C.gray}` }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
                <div style={{ fontFamily: F.heading, fontWeight: 800, fontSize: 22, marginBottom: 8 }}>No providers found</div>
                <p style={{ color: C.muted, fontSize: 15, marginBottom: 24 }}>Try changing your search terms or filters.</p>
                <button onClick={resetFilters} style={{
                  padding: "12px 28px", borderRadius: 12, border: "none",
                  background: C.primary, color: "#fff", fontWeight: 700, fontSize: 14,
                  cursor: "pointer", fontFamily: F.body,
                }}>Clear All Filters</button>
              </div>
            ) : viewMode === "grid" ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                {sorted.map((w, idx) => (
                  <div key={`${w.providerId}-${idx}`} className="card-fade" style={{ 
                    animationDelay: `${idx * 0.05}s`,
                    background: "#fff", border: `2px solid ${C.gray}`, borderRadius: 20, padding: 24,
                    cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", gap: 12,
                  }}
                    onClick={() => navigate(`/provider/${w.providerId}`)}
                    onMouseOver={e => { e.currentTarget.style.borderColor = w.color; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${w.color}22`; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = C.gray; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {/* Avatar + name */}
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 56, height: 56, borderRadius: "50%", background: w.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, flexShrink: 0 }}>
                        {w.initials}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                          <div style={{ fontWeight: 700, fontSize: 15, color: C.dark }}>{w.name}</div>
                          {w.is_verified && <span title="Verified Professional" style={{ cursor: "help" }}>✅</span>}
                        </div>
                        <div style={{ fontSize: 13, color: w.color, fontWeight: 600 }}>{w.service}</div>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: w.is_available ? C.greenLt : C.yellowLt, color: w.is_available ? C.green : C.yellowDk }}>
                        {w.is_available ? "Available" : "Busy"}
                      </span>
                    </div>

                    {/* Category > Service > Task badges */}
                    <BadgeRow w={w} />

                    {/* Matched tasks (when searching) */}
                    {w.matchedTasks.length > 1 && (
                      <div style={{ fontSize: 11, color: C.muted, fontStyle: "italic" }}>
                        +{w.matchedTasks.length - 1} more matching task{w.matchedTasks.length > 2 ? "s" : ""}
                      </div>
                    )}

                    {/* Rating + Task Price */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: C.yellow, fontSize: 13 }}>★</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{w.rating_average}</span>
                      <span style={{ fontSize: 12, color: C.muted }}>({w.rating_count} reviews)</span>
                      <span style={{ marginLeft: "auto", fontWeight: 800, fontSize: 15, color: C.primary }}>
                        {w.taskPrice > 0 ? `${w.taskPrice.toLocaleString()} DA` : "Price on request"}
                      </span>
                    </div>

                    {/* Phone */}
                    {w.phone && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted }}>
                        📞 <span style={{ fontWeight: 600 }}>{w.phone}</span>
                      </div>
                    )}

                    {/* Buttons */}
                    <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 4 }}>
                      <button onClick={e => { e.stopPropagation(); navigate(`/provider/${w.providerId}`); }} style={{
                        flex: 1, padding: "10px 0", borderRadius: 10, border: `2px solid ${C.primary}`,
                        background: "transparent", color: C.primary, fontWeight: 700, fontSize: 13,
                        cursor: "pointer", fontFamily: F.body,
                      }}>View Profile</button>
                      <a href={`https://wa.me/${w.phone.replace(/\D/g, "")}?text=Hi ${w.name}, I found you on TiaretHub.`}
                        onClick={e => e.stopPropagation()} target="_blank" rel="noreferrer"
                        style={{ flex: 1, display: "block", textAlign: "center", background: "#25d366", color: "#fff", padding: "10px 0", borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                        💬 WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* ── LIST VIEW ── */
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {sorted.map((w, idx) => (
                  <div key={`${w.providerId}-${idx}`} className="card-fade" style={{ 
                    animationDelay: `${idx * 0.05}s`,
                    background: "#fff", border: `2px solid ${C.gray}`, borderRadius: 16, padding: "20px 24px",
                    display: "flex", gap: 20, alignItems: "center", transition: "all 0.2s", cursor: "pointer"
                  }}
                    onClick={() => navigate(`/provider/${w.providerId}`)}
                    onMouseOver={e => { e.currentTarget.style.borderColor = w.color; e.currentTarget.style.boxShadow = `0 8px 24px ${w.color}22`; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = C.gray; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ width: 60, height: 60, borderRadius: "50%", background: w.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, flexShrink: 0 }}>
                      {w.initials}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                        <div style={{ fontWeight: 800, fontSize: 16, color: C.dark }}>{w.name}</div>
                        {w.verified && <span>✅</span>}
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: w.available ? C.greenLt : C.yellowLt, color: w.available ? C.green : C.yellow }}>
                          {w.available ? "Available" : "Busy"}
                        </span>
                      </div>
                      <div style={{ marginBottom: 6 }}>
                        <BadgeRow w={w} />
                      </div>
                      {w.phone && (
                        <div style={{ fontSize: 12, color: C.muted }}>📞 <span style={{ fontWeight: 600 }}>{w.phone}</span></div>
                      )}
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 18, color: C.primary, marginBottom: 4 }}>
                        {w.taskPrice > 0 ? `${w.taskPrice.toLocaleString()} DA` : w.hourlyRate}
                      </div>
                      <div style={{ fontSize: 13, color: C.muted }}>★ {w.rating} ({w.reviews})</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}