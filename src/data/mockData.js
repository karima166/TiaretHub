/* ═══════════════════════════════════════════════════════════
   TiaretHub — Consolidated Mock Data
   Centralized mock data for platform-wide demo consistency.
═══════════════════════════════════════════════════════════ */

/* ── Categories (fallback — normally from DB) ── */
export const MOCK_CATEGORIES = [
  { id: "PLOMBERIE", name: "Plumbing", icon: "🔧", color: "#1a1a2e", image_url: "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?q=80" },
  { id: "ELECTRICITE", name: "Electrical", icon: "⚡", color: "#1971c2", image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { id: "PEINTURE", name: "Painting", icon: "🎨", color: "#2f9e44", image_url: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80" },
  { id: "MENUISERIE", name: "Carpentry", icon: "🪚", color: "#7048e8", image_url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80" },
  { id: "CLIMATISATION", name: "Air Conditioning", icon: "❄️", color: "#0ca678", image_url: "https://images.unsplash.com/photo-1737012197886-7d5a52ded45b?q=80" },
  { id: "MENUISERIE_ALUMINIUM", name: "Aluminum Joinery", icon: "🪟", color: "#e64980", image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80" },
  { id: "JARDINAGE", name: "Gardening", icon: "🌿", color: "#f76707", image_url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80" },
  { id: "MACONNERIE", name: "Masonry", icon: "🏗️", color: "#1a1a2e", image_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
  { id: "PLOMBERIE_SANITAIRE", name: "Sanitary Plumbing", icon: "🛁", color: "#1a1a2e", image_url: "https://images.unsplash.com/photo-1585704032915-c3400305e979?w=600&q=80" },
  { id: "REPARATION_ELECTROMENAGER", name: "Appliance Repair", icon: "🔌", color: "#1971c2", image_url: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80" },
];

/* ── Standard Tasks Library (Reusable across all pages) ── */
export const SERVICE_TASKS_LIBRARY = {
  PLOMBERIE: [
    { id: "T101", name: "Tap Leak Repair", defaultPrice: 800, duration: 1, description: "Fixing dripping faucets and pipe joints." },
    { id: "T102", name: "Toilet Flush Fix", defaultPrice: 1500, duration: 2, description: "Repairing or replacing the flush mechanism." },
    { id: "T103", name: "Drain Unclogging", defaultPrice: 2000, duration: 1, description: "Clearing blocked kitchen or bathroom drains." },
    { id: "T104", name: "Water Heater Setup", defaultPrice: 4000, duration: 3, description: "Installation of standard water heaters." }
  ],
  ELECTRICITE: [
    { id: "T201", name: "Socket Installation", defaultPrice: 800, duration: 1, description: "Adding or replacing wall power sockets." },
    { id: "T202", name: "Circuit Breaker Fix", defaultPrice: 1500, duration: 2, description: "Diagnosing and fixing tripped breakers." },
    { id: "T203", name: "Lighting Fixture", defaultPrice: 1200, duration: 1, description: "Mounting and connecting ceiling lights." },
    { id: "T204", name: "Electrical Panel", defaultPrice: 5000, duration: 4, description: "Full maintenance of the main panel." }
  ],
  CLIMATISATION: [
    { id: "T301", name: "Filter Cleaning", defaultPrice: 1000, duration: 1, description: "Professional cleaning of AC filters." },
    { id: "T302", name: "Gas Recharge", defaultPrice: 4000, duration: 1, description: "Refilling refrigerant gas (R22/R410)." },
    { id: "T303", name: "AC Installation", defaultPrice: 6000, duration: 3, description: "Mounting new split unit systems." }
  ],
  PEINTURE: [
    { id: "T401", name: "Wall Painting (m2)", defaultPrice: 300, duration: 1, description: "Standard two-coat paint application." },
    { id: "T402", name: "Humidity Treatment", defaultPrice: 2000, duration: 2, description: "Applying anti-humidity primer." }
  ],
  MENUISERIE: [
    { id: "T501", name: "Door Hinge Repair", defaultPrice: 500, duration: 1, description: "Adjusting or replacing door hinges." },
    { id: "T502", name: "Lock Installation", defaultPrice: 2500, duration: 2, description: "Fitting new door locks and handles." }
  ]
};

/* ── Communes (mock — Group 1 handles real data) ── */
export const COMMUNES_TIARET = [
  { id: 1, name: "Tiaret" }, { id: 2, name: "Sougueur" }, { id: 3, name: "Frenda" },
  { id: 4, name: "Mahdia" }, { id: 5, name: "Rahouia" }, { id: 6, name: "Ksar Chellala" },
  { id: 7, name: "Ain Deheb" }, { id: 8, name: "Medrissa" }, { id: 9, name: "Zmalet El Amir Abdelkader" },
  { id: 10, name: "Dahmouni" }, { id: 11, name: "Sidi Bakhti" }, { id: 12, name: "Guertoufa" },
  { id: 13, name: "Hamadia" }, { id: 14, name: "Ain Kermes" }, { id: 15, name: "Oued Lilli" },
  { id: 16, name: "Madna" }, { id: 17, name: "Bougara" }, { id: 18, name: "Sidi Ali Mellal" },
  { id: 19, name: "Rechaiga" }, { id: 20, name: "Ain Dzarit" }, { id: 21, name: "Tagdempt" },
  { id: 22, name: "Djillali Ben Amar" }, { id: 23, name: "Sidi Hosni" }, { id: 24, name: "Sebt" },
  { id: 25, name: "Mellakou" }, { id: 26, name: "Chehaima" }, { id: 27, name: "Takhemaret" },
  { id: 28, name: "Tousnina" }, { id: 29, name: "Meghila" }, { id: 30, name: "Serghine" },
  { id: 31, name: "Ain El Hadid" }, { id: 32, name: "Ouled Djilali" }, { id: 33, name: "Sidi Abderrahmane" },
  { id: 34, name: "Naima" }, { id: 35, name: "Ain Bouchekif" }, { id: 36, name: "Faidja" },
  { id: 37, name: "Si Abdelghani" }, { id: 38, name: "Tidda" }, { id: 39, name: "Mechraa Safa" },
  { id: 40, name: "Aïn El Assel" }, { id: 41, name: "Nahr Ouassel" }, { id: 42, name: "Bekira" },
];

/* ── Providers (mock — Group 2 handles real data) ── */
export const MOCK_PROVIDERS = [
  {
    id: 1, 
    user_id: 101,
    first_name: "Karim", 
    last_name: "Boudiaf", 
    name: "Karim Boudiaf", // Keep for UI compatibility
    phone: "+213 555 01 23 45", 
    email: "provider@TiaretHub.dz",
    bio: "10+ years of experience in residential and commercial plumbing in Tiaret.",
    profile_image_url: "https://images.unsplash.com/photo-1585704032915-c3400305e979?w=600&q=80",
    is_verified: true,
    experience_years: 10,
    rating_average: 4.9,
    rating_count: 87,
    trust_score: 94.5,
    status: "ACTIVE",
    is_available: true,
    initials: "KB", color: "#e8590c", // UI-only
    location: {
      city: "Tiaret",
      address: "Rue des Roses",
      region: "Centre"
    },
    categories: [{ id: "PLOMBERIE", name: "Plumbing" }],
    services: [
      { 
        id: 1, title: "Plumbing", price: 1500, status: "PUBLISHED", is_active: true, 
        description: "Professional plumbing services for your home.",
        tasks: [
          { id: 101, name: "Tap Leak Repair", price: 800, duration: 1, description: "Fixing dripping faucets", mandatory: true },
          { id: 102, name: "Toilet Flush Fix", price: 1500, duration: 2, description: "Repairing flush mechanism", mandatory: false }
        ]
      }
    ],
    photos: [
      "https://images.unsplash.com/photo-1585704032915-c3400305e979?w=600&q=80",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80"
    ],
  },
  {
    id: 2, 
    user_id: 102,
    first_name: "Youcef", 
    last_name: "Belhadj", 
    name: "Youcef Belhadj",
    phone: "+213 555 98 76 54", 
    email: "youcef.bh@email.com",
    bio: "Certified electrician serving Tiaret and surrounding areas.",
    profile_image_url: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80",
    is_verified: true,
    experience_years: 7,
    rating_average: 4.7,
    rating_count: 54,
    trust_score: 78.0,
    status: "ACTIVE",
    is_available: true,
    initials: "YB", color: "#1971c2",
    location: {
      city: "Tiaret",
      address: "Cité 500",
      region: "Est"
    },
    categories: [{ id: "ELECTRICITE", name: "Electrical" }],
    services: [
      { 
        id: 2, title: "Electrical", price: 1800, status: "PUBLISHED", is_active: true,
        description: "Certified electrical repairs and installations.",
        tasks: [
          { id: 201, name: "New Socket Install", price: 800, duration: 1, description: "Adding wall power socket", mandatory: true },
          { id: 202, name: "Circuit Breaker Fix", price: 1500, duration: 2, description: "Repairing faulty breakers", mandatory: false }
        ]
      }
    ],
    photos: ["https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80"],
  },
  {
    id: 6, 
    user_id: 106,
    first_name: "Fatima", 
    last_name: "Zerrouki", 
    name: "Fatima Zerrouki",
    phone: "+213 555 33 55 77", 
    email: "fatima.z@email.com",
    bio: "HVAC specialist focused on efficiency and quick repairs for all AC brands.",
    profile_image_url: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80",
    is_verified: true,
    experience_years: 5,
    rating_average: 4.9,
    rating_count: 93,
    trust_score: 98.0,
    status: "ACTIVE",
    is_available: true,
    initials: "FZ", color: "#e64980",
    location: {
      city: "Tiaret",
      address: "Quartier Administratif",
      region: "Centre"
    },
    categories: [{ id: "CLIMATISATION", name: "AC & HVAC" }],
    services: [
      { 
        id: 6, title: "AC & HVAC", price: 2500, status: "PUBLISHED", is_active: true,
        description: "Complete AC maintenance and repair.",
        tasks: [
          { id: 601, name: "Filter Deep Clean", price: 1000, duration: 1, description: "Professional filter wash", mandatory: true },
          { id: 602, name: "Gas Refill", price: 4000, duration: 1, description: "Standard gas recharge", mandatory: false }
        ]
      }
    ],
    photos: ["https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80"],
  },
  {
    id: 3,
    user_id: 103,
    first_name: "Hassan",
    last_name: "B.",
    name: "Hassan B.",
    phone: "+213 555 11 22 33",
    email: "hassan.paint@email.com",
    bio: "Expert painter specializing in modern interior finishes and decorative coatings.",
    profile_image_url: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80",
    is_verified: true,
    experience_years: 12,
    rating_average: 4.5,
    rating_count: 42,
    trust_score: 85.0,
    status: "ACTIVE",
    is_available: true,
    initials: "HB", color: "#2f9e44",
    location: { city: "Tiaret", address: "Hai Touffah", region: "Ouest" },
    categories: [{ id: "PEINTURE", name: "Painting" }],
    services: [
      {
        id: 5, title: "Painting", price: 2000, status: "PUBLISHED", is_active: true,
        description: "Professional interior and exterior painting.",
        tasks: [
          { id: 501, name: "Wall Accent Paint", price: 3000, duration: 4, description: "Single wall decorative paint", mandatory: true },
          { id: 502, name: "Humidity Primer", price: 2000, duration: 2, description: "Anti-humidity base layer", mandatory: false }
        ]
      }
    ],
  },
  {
    id: 4,
    user_id: 104,
    first_name: "Sofiane",
    last_name: "Merabet",
    name: "Sofiane Merabet",
    phone: "+213 555 44 55 66",
    email: "sofiane.m@email.com",
    bio: "Master carpenter with a passion for custom furniture and wood repair.",
    profile_image_url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80",
    is_verified: true,
    experience_years: 8,
    rating_average: 4.8,
    rating_count: 65,
    trust_score: 91.0,
    status: "ACTIVE",
    is_available: true,
    initials: "SM", color: "#7048e8",
    location: { city: "Tiaret", address: "Zone Industrielle", region: "Nord" },
    categories: [{ id: "MENUISERIE", name: "Carpentry" }],
    services: [
      {
        id: 4, title: "Carpentry", price: 3000, status: "PUBLISHED", is_active: true,
        description: "Custom wood work and furniture repair.",
        tasks: [
          { id: 401, name: "Door Hinge Fix", price: 1000, duration: 1, description: "Repairing squeaky or loose hinges", mandatory: true },
          { id: 402, name: "Custom Shelf", price: 5000, duration: 3, description: "Wall-mounted wooden shelf", mandatory: false }
        ]
      }
    ],
  }
];

/* ── Users (mock — Group 1 auth handles real data) ── */
export const MOCK_USERS = [
  { id: 1, name: "Rachid Bensaid", first_name: "Rachid", last_name: "Bensaid", email: "client@TiaretHub.dz", phone: "+213 555 12 34 56", user_type: "client", is_active: true, is_email_verified: true, joined: "2024-03-15", city: "Tiaret" },
  { id: 2, name: "Karim Boudiaf", first_name: "Karim", last_name: "Boudiaf", email: "provider@TiaretHub.dz", phone: "+213 555 01 23 45", user_type: "provider", is_active: true, is_email_verified: true, joined: "2021-03-10", city: "Tiaret" },
  { id: 3, name: "Sara Mansouri", first_name: "Sara", last_name: "Mansouri", email: "sara.m@gmail.com", phone: "+213 555 98 76 54", user_type: "client", is_active: true, is_email_verified: true, joined: "2024-05-20", city: "Frenda" },
  { id: 4, name: "Youcef Belhadj", first_name: "Youcef", last_name: "Belhadj", email: "youcef.bh@email.com", phone: "+213 555 44 55 66", user_type: "provider", is_active: true, is_email_verified: false, joined: "2023-11-02", city: "Sougueur" },
  { id: 5, name: "Amira Bensalem", first_name: "Amira", last_name: "Bensalem", email: "amira.bs@email.com", phone: "+213 555 77 88 99", user_type: "provider", is_active: false, is_email_verified: true, joined: "2022-08-14", city: "Tiaret" },
  { id: 6, name: "Omar Khelifa", first_name: "Omar", last_name: "Khelifa", email: "omar.kh@email.com", phone: "+213 555 11 22 33", user_type: "client", is_active: true, is_email_verified: true, joined: "2025-01-05", city: "Tiaret" },
  { id: 7, name: "Nadia Touati", first_name: "Nadia", last_name: "Touati", email: "nadia.t@email.com", phone: "+213 555 66 77 88", user_type: "client", is_active: true, is_email_verified: false, joined: "2025-01-18", city: "Mahdia" },
  { id: 8, name: "Sofiane Merabet", first_name: "Sofiane", last_name: "Merabet", email: "sofiane.m@email.com", phone: "+213 555 55 44 33", user_type: "provider", is_active: true, is_email_verified: true, joined: "2023-04-22", city: "Tiaret" },
];

/* ── Admin: provider details (Merged into main list) ── */

/* ── Services (Mock list deleted, now derived from providers) ── */


/* ── Requests / Demandes (mock — Group 3 handles real data) ── */
/* ── Requests / Demandes (Standardized Schema) ── */
export const MOCK_REQUESTS = [
  { 
    id: 1, reference: "REQ-001A92B", titre: "Fix kitchen sink leak", client: "Rachid B.", provider: "Karim Boudiaf", 
    status: "COMPLETED", date: "2024-12-01", total_amount: 2300, category: "Plumbing", 
    description: "Water dripping under the sink cabinet for 2 days. Urgent repair needed.", 
    address: "Rue 1, Centre Ville, Tiaret", desired_date: "2024-12-03", service_id: 1,
    tasks: [
      { id: 101, name: "Tap Leak Repair", price: 800, qty: 1 },
      { id: 102, name: "Toilet Flush Fix", price: 1500, qty: 1 }
    ]
  },
  { 
    id: 2, reference: "REQ-002B45C", titre: "Install light fixtures", client: "Sara M.", provider: "Youcef Belhadj", 
    status: "IN_PROGRESS", date: "2025-01-10", total_amount: 3800, category: "Electrical", 
    description: "Need 4 ceiling lights installed in the lounge.", 
    address: "Cité 100 logts, Sougueur", desired_date: "2025-01-15", service_id: 2,
    tasks: [
      { id: 204, name: "Chandelier Mount", price: 3000, qty: 1 },
      { id: 201, name: "New Socket Install", price: 800, qty: 1 }
    ]
  },
  { 
    id: 3, reference: "REQ-003C12D", titre: "Paint bedroom walls", client: "Rachid B.", provider: "Hassan B.", 
    status: "ACCEPTED", date: "2025-01-18", total_amount: 5000, category: "Painting", 
    description: "Full bedroom repaint, single wall accent included.", 
    address: "Rue Ali Khodja, Tiaret", desired_date: "2025-01-25", service_id: 5,
    tasks: [
      { id: 501, name: "Wall Accent Paint", price: 3000, qty: 1 },
      { id: 502, name: "Humidity Primer", price: 2000, qty: 1 }
    ]
  },
  { 
    id: 4, reference: "REQ-004D88E", titre: "AC maintenance check", client: "Omar K.", provider: "Fatima Zerrouki", 
    status: "PENDING", date: "2025-01-22", total_amount: 5000, category: "AC & HVAC", 
    description: "Annual check + gas recharge before summer.", 
    address: "Route de Frenda, Tiaret", desired_date: "2025-01-30", service_id: 6,
    tasks: [
      { id: 601, name: "Filter Deep Clean", price: 1000, qty: 1 },
      { id: 602, name: "Gas Refill", price: 4000, qty: 1 }
    ]
  },
  { 
    id: 5, reference: "REQ-005E32F", titre: "Build wooden shelf", client: "Nadia T.", provider: "Sofiane Merabet", 
    status: "CANCELLED", date: "2024-11-15", total_amount: 4500, category: "Carpentry", 
    description: "Wall-mounted shelf 2m wide above TV.", 
    address: "Hai Touffah, Tiaret", desired_date: "2024-11-20", service_id: 4,
    tasks: [
      { id: 403, name: "Custom Dresser", price: 12000, qty: 1 } // Note: mismatched total for demo
    ]
  },
];

/* ── Reviews (mock — Group 4 handles real data) ── */
export const MOCK_REVIEWS = [
  { id: 1, client: "Rachid B.", provider: "Karim Boudiaf", service: "Plumbing", note: 5, commentaire: "Excellent work! Fast and clean. Highly recommend.", date: "2025-01-14", helpful: 8, flagged: false },
  { id: 2, client: "Sara M.", provider: "Youcef Belhadj", service: "Electrical", note: 4, commentaire: "Good job overall, a bit late but great results.", date: "2025-01-02", helpful: 3, flagged: false },
  { id: 3, client: "Nadia T.", provider: "Sofiane Merabet", service: "Carpentry", note: 5, commentaire: "Perfect! Finished in 2 hours. Will call again.", date: "2024-12-28", helpful: 12, flagged: false },
  { id: 4, client: "Hamid Z.", provider: "Hassan B.", service: "Painting", note: 2, commentaire: "Very slow, left the job unfinished. Disappointed.", date: "2024-12-10", helpful: 5, flagged: true },
  { id: 5, client: "Omar K.", provider: "Karim Boudiaf", service: "Plumbing", note: 5, commentaire: "Best plumber in Tiaret! Super professional.", date: "2025-01-20", helpful: 15, flagged: false },
];

/* ── Messages (mock — Group 7 handles real data) ── */
export const MOCK_MESSAGES = [
  {
    id: 1, from: "Karim Boudiaf", avatar: "KB", color: "#e8590c", preview: "Hello! I'm on my way, be there in 20 min.", time: "10:32", unread: 0,
    messages: [
      { from: "them", text: "Hello! I received your request.", time: "10:20" },
      { from: "them", text: "Hello! I'm on my way, be there in 20 min.", time: "10:32" },
    ]
  },
  {
    id: 2, from: "Amira Bensalem", avatar: "AB", color: "#2f9e44", preview: "What shade of grey do you prefer for the walls?", time: "Yesterday", unread: 2,
    messages: [
      { from: "them", text: "Hi Rachid, I checked the request.", time: "Yesterday" },
      { from: "them", text: "What shade of grey do you prefer for the walls?", time: "Yesterday" },
    ]
  },
  {
    id: 3, from: "Omar Khelifa", avatar: "OK", color: "#0ca678", preview: "I can come Thursday morning, is that OK?", time: "Mon", unread: 1,
    messages: [
      { from: "me", text: "Can you come this week for the AC check?", time: "Mon" },
      { from: "them", text: "I can come Thursday morning, is that OK?", time: "Mon" },
    ]
  },
];



/* ── Demo auth users (for template login) ── */
export const DEMO_USERS = [
  { email: "client@TiaretHub.dz", password: "client123", role: "client", name: "Rachid Bensaid" },
  { email: "provider@TiaretHub.dz", password: "provider123", role: "provider", name: "Karim Boudiaf" },
  { email: "admin@TiaretHub.dz", password: "admin123", role: "admin", name: "Admin TiaretHub" },
];
