import { Project, Skill, ContactLink } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'belanja-yuk',
    title: 'Belanja Yuk!',
    role: 'Data Engineer & Pipeline Architect',
    category: 'data-engineering',
    description: 'Production-grade automated ELT data pipeline ingesting heterogeneous sources (MongoDB NoSQL & CSV dumps) into a PostgreSQL Data Warehouse orchestrated by Airflow 3, modeled with dbt Core, and guarded by 30 automated quality tests.',
    detailedDescription: 'Architected an enterprise-grade automated ELT data pipeline ingesting multi-source e-commerce data from 3 distributed systems. Implemented Astro Runtime (Apache Airflow 3) for orchestration, PostgreSQL 15 landing zone with native JSONB for raw audit preservation, 3-tier dbt Core dimensional star-schema modeling with Kimball Unknown Member pattern, and in-DAG automated circuit breakers.',
    tags: ['Data Engineering', 'Apache Airflow 3', 'dbt Core', 'Kimball Star Schema', 'PostgreSQL 15', 'MongoDB 7', 'Circuit Breaker'],
    techStack: [
      'Python',
      'Apache Airflow 3',
      'Astronomer Astro',
      'dbt Core',
      'PostgreSQL 15',
      'MongoDB 7',
      'Docker Compose',
      'SQL',
      'GitHub Actions',
      'Pytest',
      'Slack Webhook'
    ],
    image: 'belanja-yuk',
    coverImage: '/projects/belanja-yuk/cover.png',
    screenshots: ['/projects/belanja-yuk/arch.png'],
    repoUrl: 'https://github.com/MaleakhiNymmo/belanja-yuk-data-pipeline',
    link: 'https://github.com/MaleakhiNymmo/belanja-yuk-data-pipeline',
    year: '2026',
    metrics: '100% Revenue Preserved • 30 Automated Quality Tests',
    stats: [
      { value: '100%', label: 'Revenue Preserved (Kimball Pattern)' },
      { value: '30 Tests', label: 'Automated In-DAG Quality Gates' },
      { value: '20,000+', label: 'Daily Simulated Document Volume' },
      { value: '< 1 Min', label: 'CI/CD Shift-Left Verification' }
    ],
    challenge: 'Mengintegrasikan data e-commerce heterogen dari 3 sumber terdistribusi (MongoDB NoSQL Orders, CRM CSV, dan Inventory CSV), menangani anomali data operasional (duplicate IDs, invalid email format, negative stock, dan 427 transaksi orphan akibat guest checkout), serta mentransformasikan schema transaksional semi-terstruktur menjadi schema analitik (OLAP Star Schema) berintegritas tinggi tanpa kehilangan akurasi omzet finansial (zero financial revenue loss).',
    solution: 'Membangun pipeline ELT modular kelas enterprise berbasis Astro Runtime (Apache Airflow 3) & Docker:',
    solutionPoints: [
      '1. Ingestion & Schema-on-Read: Mengekstrak orders dari MongoDB dan menyimpannya sebagai native JSONB di PostgreSQL landing zone (schema raw) untuk mempertahankan audit trail asli.',
      '2. Advanced Orchestration: Membuat orkestrasi workflow menggunakan PythonSensors (ketersediaan file), Branching operator (validasi file size), dan TaskGroups modular di Airflow 3.',
      '3. Dimensional Modeling & Kimball Pattern: Melakukan transformasi 3-tier dbt Core (staging ➔ intermediate ➔ marts) dengan implementasi "Kimball Unknown Member Dimension Pattern" untuk menangani transaksi guest checkout tanpa merusak referential integrity.',
      '4. Automated Circuit Breaker: Menanamkan 19 dbt data tests langsung di dalam DAG Airflow yang otomatis memutus alur pipeline dan memicu Slack Block Kit alert jika terdeteksi anomali data.'
    ],
    architecture: 'Heterogeneous Sources (MongoDB Orders + CRM & Inventory CSVs) ➔ Airflow Sensors & Branching Gate ➔ PostgreSQL Landing Zone (raw schema with JSONB) ➔ dbt Modular Transformations (staging ➔ intermediate ➔ marts) ➔ In-DAG 19 Automated Quality Tests (Circuit Breaker) ➔ Analytics-Ready Marts (fact_order_items, fct_daily_sales, dim_customers, dim_products)',
    pipelineNodes: [
      { step: '01', title: 'Heterogeneous Sources', detail: 'MongoDB Orders + CRM & Inventory CSVs' },
      { step: '02', title: 'Airflow Sensors & Gate', detail: 'File arrival sensing & size branching' },
      { step: '03', title: 'PostgreSQL Landing Zone', detail: 'Raw schema audit with native JSONB' },
      { step: '04', title: 'dbt Transformations', detail: '3-tier modeling (Staging → Marts)' },
      { step: '05', title: 'In-DAG 19 Quality Tests', detail: 'Circuit Breaker & Slack alerts' },
      { step: '06', title: 'Analytics-Ready Marts', detail: 'Fact & Dim tables (OLAP Star Schema)' }
    ],
    features: [
      'Kimball Unknown Member Pattern: Menyelamatkan 100% omzet finansial dari 427 transaksi orphan (guest checkout) sambil menjaga 100% referential integrity tanpa dimension bloat.',
      'In-DAG Automated Circuit Breaker: 19 dbt data tests + 11 Pytest tests memblokir data cacat masuk ke reporting layer.',
      'Semi-Structured NoSQL Ingestion: Unnesting array JSONB MongoDB secara dinamis di dbt intermediate layer tanpa manipulasi manual di Python.',
      'Enterprise Airflow 3 Architecture: Menggunakan Astronomer Astro Runtime 3.3 (Airflow 3) dengan isolasi port offsetting untuk mencegah tabrakan container lokal.',
      'Shift-Left CI/CD Quality Gates: GitHub Actions otomatis mengecek kebersihan kode (Ruff), validasi DAG Bag (Pytest), dan kompilasi dbt graph pada setiap PR.',
      'Production Observability: Real-time Slack Block Kit alerts dengan direct task log deep-link dan fallback graceful mock logging.'
    ],
    toolchainMatrix: [
      { category: 'Workflow Orchestration', tech: 'Apache Airflow 3.3 / Astro Runtime', role: 'Penjadwalan harian, PythonSensors, Branching gate, modular TaskGroups, dan retry mechanics.' },
      { category: 'Data Transformation & Modeling', tech: 'dbt Core 1.8 (dbt-postgres)', role: 'Transformasi 3-tier (staging ➔ intermediate ➔ marts), Kimball Star Schema, dan in-DAG tests.' },
      { category: 'Data Warehouse (OLAP)', tech: 'PostgreSQL 15', role: 'Multi-layer DWH lokal (raw, staging, marts) dengan native JSONB untuk raw audit trail.' },
      { category: 'Transactional Source (NoSQL)', tech: 'MongoDB 7', role: 'Database operasional simulasi e-commerce penyimpan dokumen pesanan semi-terstruktur.' },
      { category: 'Quality Gates & Testing', tech: 'Pytest 8.x & dbt Test', role: '30 Automated Tests: 11 Pytest unit/DAG integrity checks + 19 dbt schema & constraints tests.' },
      { category: 'CI/CD Automation', tech: 'GitHub Actions', role: '3-stage automated quality gates (Ruff linting, DAG tests, dbt parse validation).' },
      { category: 'Monitoring & Alerting', tech: 'Slack Webhooks (Block Kit)', role: 'Interactive incident alerts dengan link langsung ke task log Airflow & error trace.' },
      { category: 'Containerization', tech: 'Docker Compose & Astro CLI', role: 'Isolasi seluruh cluster service (isolated metadata DB, DWH, MongoDB, Airflow scheduler).' }
    ]
  },
  {
    id: 'smart-archery',
    title: 'SmartArchery',
    role: 'Mobile Developer & Computer Vision Engineer (Capstone Design)',
    category: 'mobile-computer-vision',
    description: 'AI-powered archery posture consistency evaluation and biomechanical angle analysis system integrating YOLOv11m-pose, React Native, and a FastAPI cloud backend.',
    detailedDescription: 'Undergraduate Thesis Capstone Design: Engineered a client-server mobile computer vision system to evaluate the postural consistency of archery athletes (tested with ARCHATEL Telkom University). Integrated a fine-tuned YOLOv11m-pose model to extract 17 anatomical keypoints, designed trigonometric vector math to compute 5 critical joint angles (Draw Force Line), developed a continuous Smooth Scoring algorithm, and offloaded heavy AI computation to a FastAPI cloud backend—slashing client APK size by 73% with a 4.5s latency and achieving an 82.5 SUS score (Grade A "Excellent").',
    tags: ['Computer Vision', 'YOLOv11m-Pose', 'React Native', 'FastAPI', 'Biomechanics', 'PostgreSQL', 'System Usability Scale'],
    techStack: ['YOLOv11m-Pose', 'React Native', 'Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'OpenCV', 'PyTorch', 'Hugging Face'],
    image: 'smart-archery',
    coverImage: '/projects/smart-archery/cover.png',
    screenshots: [
      '/projects/smart-archery/home-dashboard.png'
    ],
    repoUrl: 'https://github.com/maleakhinymmo',
    link: 'https://github.com/maleakhinymmo',
    year: '2026',
    metrics: '94.66% mAP@50 Pose • -73% APK Size • 82.5 SUS Score',
    stats: [
      { value: '94.66%', label: 'Pose Detection mAP@50 (YOLOv11m)' },
      { value: '-73%', label: 'APK Size Reduction (164MB → 43MB)' },
      { value: '4.5s', label: 'Avg Cloud Inference Latency (30 FPS)' },
      { value: '82.5', label: 'SUS Usability Score (Grade A "Excellent")' }
    ],
    challenge: 'Olahraga panahan menuntut konsistensi postur presisi, khususnya penguncian sendi saat fase anchoring & release (Draw Force Line). Namun, evaluasi konvensional masih mengandalkan observasi visual pelatih yang subjektif, rentan bias manusiawi, dan tidak mampu menghasilkan data sudut numerik kuantitatif. Di sisi lain, teknologi motion capture laboratorium (kamera inframerah optoelektronik dengan penanda reflektif 3D) serta wearable sensor IMU membutuhkan biaya sangat mahal, kalibrasi rumit, dan bersifat intrusif sehingga mengganggu kenyamanan dan gerakan alami pemanah. Berdasarkan survei lapangan, 93.3% atlet & pelatih membutuhkan alat evaluasi postur yang objektif, non-intrusif, dan praktis di lapangan latihan.',
    solution: 'Membangun sistem terpadu SmartArchery dengan arsitektur Client-Server Mobile Computer Vision, memisahkan antarmuka pengguna di perangkat seluler dengan pemrosesan komputasi AI berat di cloud server:',
    solutionPoints: [
      '1. Cloud-Offloaded YOLOv11m-Pose: Menggunakan model YOLOv11m-pose untuk mengekstrak 17 koordinat sendi tubuh (keypoints) otomatis dengan presisi pose 0.9213 dan mAP@50 0.9466. Pendelegasian komputasi AI ke cloud backend (HuggingFace API) sukses memangkas ukuran APK sebesar 73% (164 MB menjadi 43 MB) dengan rata-rata total latensi 4.5 detik.',
      '2. Kinematic Angle Extraction (DFL): Mengembangkan modul kalkulasi geometris berbasis produk skalar vektor trigonometri untuk mengukur 5 sudut sendi kritis: siku tarikan (ideal 10°–30°), kesegarisan bahu (80°–110°), pinggul (165°–180°), lutut (170°–180°), dan pergelangan tangan busur (160°–180°).',
      '3. Smooth Scoring Engine: Mengimplementasikan algoritma interpolasi linier berskala (Smooth Scoring) dari rentang 25.0 hingga 97.0 untuk menggantikan klasifikasi biner kaku, dilengkapi rata-rata terbobot multi-aspek (Draw 1.5, Bahu 1.2, Anchor 1.0, Stance 1.0, Follow-Through 0.8) guna menentukan grade performa (Excellent, Good, Fair, Poor).',
      '4. Dual-Role Mobile Portal & Field UAT: Membangun aplikasi mobile React Native dengan visualisasi live skeleton overlay interaktif, autentikasi multi-role (Atlet & Pelatih via JWT), penautan akun atlet via pemindaian QR code, manajemen jadwal latihan, review/revisi skor oleh pelatih, dan persistensi terstruktur di PostgreSQL (SQLAlchemy ORM) yang meraih skor SUS 82.5 (Excellent / Grade A) bersama klub panahan ARCHATEL.'
    ],
    architecture: 'Smartphone Camera (React Native) ➔ RESTful API (FastAPI Cloud) ➔ YOLOv11m-Pose Inference Engine ➔ Kinematic Vector Dot Product (5 Joint Angles) ➔ Smooth Scoring Engine (25.0 - 97.0) ➔ PostgreSQL (Session & JSON Keypoints) ➔ Skeleton Overlay & Coach Portal (QR-Linked)',
    pipelineNodes: [
      { step: '01', title: 'Mobile Video Capture', detail: 'React Native camera stream / upload' },
      { step: '02', title: 'YOLOv11m-Pose Inference', detail: 'Cloud extraction of 17 keypoints' },
      { step: '03', title: 'Kinematic Vector Math', detail: 'Trigonometric 5 joint angles (DFL)' },
      { step: '04', title: 'Smooth Scoring Engine', detail: 'Linear interpolation (25.0 - 97.0)' },
      { step: '05', title: 'Weighted Overall Rating', detail: 'Draw (1.5), Bahu (1.2), Stance (1.0)' },
      { step: '06', title: 'PostgreSQL & Skeleton UI', detail: 'Dual-role portal & coach QR review' }
    ],
    features: [
      'Automated 17-Keypoint Detection: Ekstraksi koordinat sendi tubuh secara otomatis menggunakan fine-tuned YOLOv11m-pose dengan mAP@50 mencapai 94.66% dan presisi pose 0.9213.',
      'Kinematic Angle Profiling (DFL): Kalkulasi 5 sudut biomekanika vital (siku tarikan, kesegarisan bahu, pinggul, lutut, lengan busur) menggunakan prinsip produk skalar vektor dot product.',
      'Smooth Scoring Algorithm: Algoritma penilaian berbasis interpolasi linier kontinu dengan penalti deviasi bertingkat serta agregasi rata-rata terbobot (Draw bobot tertinggi 1.5).',
      '73% APK Storage Compression: Migrasi dari on-device AI ke arsitektur client-server memangkas ukuran APK dari 164 MB ke 43 MB dengan latensi transmisi 4.5 detik.',
      'Multi-Role Coach & Athlete Portal: Manajemen atlet terpusat melalui sistem pemindaian QR code, distribusi jadwal latihan, dan fitur evaluasi mandiri serta review skor oleh pelatih.',
      'Empirical Field Validation & High Usability: Pengujian ketahanan lingkungan (outdoor 90° vs 45° occlusion) serta skor System Usability Scale (SUS) 82.5 (Grade A "Excellent") bersama klub Archatel.'
    ],
    toolchainMatrix: [
      { category: 'Computer Vision & Pose AI', tech: 'YOLOv11m-pose (Ultralytics)', role: 'Model pendeteksi 17 keypoint anatomis tubuh atlet dengan akurasi mAP@50 sebesar 94.66%.' },
      { category: 'Mobile Client Application', tech: 'React Native', role: 'Aplikasi lintas platform (Android/iOS) untuk perekaman video, rendering live skeleton overlay, dan scanner QR.' },
      { category: 'Backend API Gateway', tech: 'Python FastAPI', role: 'Peladen backend asynchronous berkinerja tinggi dengan CORS middleware, session pooling, dan JWT auth.' },
      { category: 'Relational Store & ORM', tech: 'PostgreSQL & SQLAlchemy', role: 'Skema terpusat multi-role (Users, Athletes, Coaches), penyimpanan JSON keypoints, dan relasi ber-cascade.' },
      { category: 'Kinematics & Vector Math', tech: 'NumPy & OpenCV', role: 'Manipulasi citra digital, normalisasi koordinat spasial, dan kalkulasi sudut arc-cosine produk skalar.' },
      { category: 'Cloud Hosting & Inference', tech: 'Linux VPS & HuggingFace API', role: 'Hosting model cerdas di cloud untuk membebaskan beban perangkat seluler dan memangkas APK 73%.' },
      { category: 'Authentication & Security', tech: 'JWT & OAuth2 (RBAC)', role: 'Sistem otentikasi role-based untuk mengamankan data biometrik atlet sesuai kepatuhan regulasi UU PDP.' },
      { category: 'Field Validation & UAT', tech: 'System Usability Scale (SUS)', role: 'Metodologi evaluasi kepuasan pengguna 10 butir pertanyaan dengan skor 82.5 (Grade A "Excellent") bersama Archatel.' }
    ]
  },
  {
    id: 'basoin',
    title: 'BasoIn',
    role: 'Lead Full Stack Developer & GIS Engineer',
    category: 'web-development',
    description: 'Interactive Web-GIS Culinary Navigation Platform for Bandung.',
    detailedDescription: 'Designed and developed an interactive mapping application that plots authentic local culinary hotspots in Bandung. Features custom Mapbox tiles, spatial radius filtering, geolocation queries, and responsive full-stack interfaces.',
    tags: ['Web-GIS', 'Mapbox API', 'Spatial Query', 'Bandung Culinary', 'React 19'],
    techStack: ['React 19', 'Leaflet.js', 'Mapbox API', 'GeoJSON', 'PHP', 'CodeIgniter', 'Tailwind CSS'],
    image: 'basoin',
    coverImage: '/projects/basoin/cover.png',
    liveUrl: 'https://baso-in.vercel.app/',
    repoUrl: 'https://github.com/maleakhinymmo',
    link: 'https://baso-in.vercel.app/',
    year: '2025',
    metrics: 'Sub-second Geo-Spatial Query & Dynamic Radius',
    stats: [
      { value: '< 200ms', label: 'Spatial Query & Radius Latency' },
      { value: '150+', label: 'Curated Culinary Coordinates' },
      { value: '100%', label: 'Mobile-Responsive GIS View' },
      { value: 'Vercel', label: 'Global Edge CDN Delivery' }
    ],
    challenge: 'Menyajikan data lokasi kuliner bakso legendaris di seluruh penjuru Bandung secara interaktif, akurat secara spasial, dan ringan diakses lewat perangkat mobile dengan koneksi beragam.',
    solution: 'Mengembangkan Web-GIS dengan Leaflet.js & Mapbox tile caching, filter radius geolokasi pengguna (GPS), klasterisasi titik lokasi cerdas (marker clustering), dan antarmuka pencarian instan berbasis React.',
    solutionPoints: [
      '1. Spatial Indexing: Penggunaan format data GeoJSON terstruktur untuk mapping koordinat kuliner di seluruh Bandung.',
      '2. Dynamic Clustering: Marker clustering cerdas untuk mencegah penumpukan titik lokasi saat zoom out.',
      '3. Geolocation Engine: Filter radius interaktif berbasis jarak GPS pengguna secara real-time.',
      '4. Edge Performance: Single-Page Web App berbasis React 19 dengan asset caching cepat di Vercel.'
    ],
    architecture: 'Client UI (React 19 + Tailwind) ➔ Leaflet Mapbox Renderer ➔ GeoJSON Spatial API ➔ Relational Store',
    pipelineNodes: [
      { step: '01', title: 'User Geolocation', detail: 'Browser GPS coordinates request' },
      { step: '02', title: 'Spatial Filtering', detail: 'Haversine radius query calculation' },
      { step: '03', title: 'GeoJSON Fetch', detail: 'Optimized spatial dataset parsing' },
      { step: '04', title: 'Mapbox Tile Render', detail: 'Interactive vector map tile assembly' },
      { step: '05', title: 'Marker Clustering', detail: 'Dynamic viewport pin grouping' },
      { step: '06', title: 'Spot Detail Modal', detail: 'Merchant drawer & navigation routing' }
    ],
    features: [
      'Real-time user geolocation & radius distance radius filtering',
      'Interactive culinary map with custom themed pins & review drawers',
      'Categorized directory by style (Bakso Urat, Bakso Cuanki, Mie Baso)',
      'Mobile-first responsive UI with fast client-side rendering'
    ],
    toolchainMatrix: [
      { category: 'Frontend Framework', tech: 'React 19', role: 'Komponen web interaktif modular dengan reaktivitas performa tinggi.' },
      { category: 'Interactive Mapping', tech: 'Leaflet.js & Mapbox API', role: 'Rendering peta vektor, custom pin markers, dan kontrol layer geografis.' },
      { category: 'Styling & Design', tech: 'Tailwind CSS', role: 'Sistem desain responsif mobile-first dengan tema visual modern.' },
      { category: 'Backend Service', tech: 'PHP (CodeIgniter)', role: 'Penyedia endpoint REST API untuk inventori lokasi dan metadata kuliner.' },
      { category: 'Edge Hosting', tech: 'Vercel Platform', role: 'Deployment serverless dengan latensi rendah dan auto-deploy GitHub.' }
    ]
  },
  {
    id: 'perumda',
    title: 'E-GRC Perumda Tirta Raharja',
    role: 'Full Stack Developer Intern',
    category: 'web-development',
    description: 'Enterprise Governance, Risk & Compliance Portal for Regional Water Utility.',
    detailedDescription: 'Spearheaded full-stack development and database refactoring on the core enterprise EGRC portal for Perumda Air Minum Tirta Raharja. Streamlined administrative audit workflows, optimized heavy relational reporting queries, and reinforced role-based security access.',
    tags: ['Enterprise EGRC', 'Database Optimization', 'PHP CodeIgniter', 'Workflow Automation'],
    techStack: ['PHP (CodeIgniter 4)', 'MySQL', 'SQL Optimization', 'Bootstrap', 'JavaScript', 'GitLab CI/CD'],
    image: 'perumda',
    coverImage: '/projects/perumda/cover.jpeg',
    screenshots: ['/projects/perumda/screen-1.jpeg'],
    repoUrl: 'https://github.com/maleakhinymmo',
    link: 'https://github.com/maleakhinymmo',
    year: '2025',
    metrics: 'Query Latency -42% & Automated Risk Matrix',
    stats: [
      { value: '-42%', label: 'Monthly Report Query Latency' },
      { value: '1,000+', label: 'Monthly Audit Compliance Records' },
      { value: '100%', label: 'Multi-Department Traceability' },
      { value: 'RBAC', label: 'Tiered Access Role Security' }
    ],
    challenge: 'Sistem evaluasi kepatuhan internal dan matriks risiko sebelumnya masih semi-manual, dengan query laporan bulanan yang lambat saat memproses ribuan catatan kepatuhan.',
    solution: 'Mengembangkan modul audit risiko terotomasi, mendesain ulang compound indexing pada tabel transaksi MySQL, merestrukturisasi query join yang berlebihan, sehingga performa penarikan laporan meningkat sebesar 42%.',
    solutionPoints: [
      '1. Database Indexing: Tuning compound index pada MySQL untuk mereduksi waktu eksekusi query join audit.',
      '2. Automated Risk Matrix: Modul kalkulasi skor risiko otomatis berdasarkan matriks dampak dan probabilitas.',
      '3. Role-Based Access: Pembatasan akses berbasis peran (RBAC) multi-departemen untuk keamanan data BUMD.',
      '4. Compliance Engine: Generator sertifikat kepatuhan berkala dan audit log otomatis.'
    ],
    architecture: 'MVC Monolith (CodeIgniter 4) ➔ RBAC Auth & Sanitization ➔ MySQL Enterprise Database (Tuned Indexes) ➔ Audit Risk Analytics Engine',
    pipelineNodes: [
      { step: '01', title: 'RBAC Authentication', detail: 'Secure session & credential verification' },
      { step: '02', title: 'Compliance Data Entry', detail: 'Department risk & audit checklist input' },
      { step: '03', title: 'Matrix Risk Engine', detail: 'Automated impact & likelihood calculation' },
      { step: '04', title: 'Optimized Querying', detail: 'Indexed query aggregation in MySQL' },
      { step: '05', title: 'Auditor Sign-Off', detail: 'Approval gate & validation checklist' },
      { step: '06', title: 'Executive Report', detail: 'Exportable compliance matrix certificate' }
    ],
    features: [
      'Automated Enterprise Risk Scoring & Compliance Matrix',
      'Role-Based Access Control (RBAC) across departments and auditors',
      'Optimized SQL query plan reducing report generation time by 42%',
      'Audit trail logging and periodic compliance certificate generation'
    ],
    toolchainMatrix: [
      { category: 'Backend MVC', tech: 'PHP (CodeIgniter 4)', role: 'Pengembangan arsitektur MVC enterprise, session handling, dan routing aman.' },
      { category: 'Relational Database', tech: 'MySQL 8', role: 'Penyimpanan data transaksi audit dengan optimalisasi indeks komposit.' },
      { category: 'Frontend Interface', tech: 'Bootstrap & Modern JS', role: 'Layout portal back-office dengan tabel analitik dan form dinamis.' },
      { category: 'Version Control', tech: 'GitLab CI/CD', role: 'Pengelolaan repositori tim, code review, dan pipeline deployment.' }
    ]
  },
  {
    id: 'pandawa',
    title: 'PANDAWA',
    role: 'WordPress Developer & Web Consultant',
    category: 'web-development',
    description: 'Digital MSME E-Commerce Marketplace for Cintaratu Village.',
    detailedDescription: 'First production project: engineered a dedicated community marketplace platform (pandawa-umkm.id) for MSME merchants and local producers in Cintaratu village, enabling local entrepreneurs to catalog products, accept inquiries, and expand their regional digital reach.',
    tags: ['WordPress', 'UMKM Marketplace', 'E-Commerce', 'Cintaratu Digital'],
    techStack: ['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'Custom CSS', 'Elementor'],
    image: 'pandawa',
    coverImage: '/projects/pandawa/cover.png',
    screenshots: ['/projects/pandawa/screen-1.png'],
    liveUrl: 'https://pandawa-umkm.id',
    link: 'https://pandawa-umkm.id',
    year: '2023',
    metrics: 'First Production Web Project for Village MSMEs',
    stats: [
      { value: '30+', label: 'Onboarded Village MSME Merchants' },
      { value: '1-Click', label: 'WhatsApp Direct Checkout Flow' },
      { value: '100%', label: 'Zero Commission Fee Retention' },
      { value: 'Mobile', label: 'Lightweight for Rural Networks' }
    ],
    challenge: 'Pelaku UMKM di Desa Cintaratu memiliki keterbatasan akses platform penjualan online mandiri dan membutuhkan katalog produk digital yang mudah dikelola tanpa infrastruktur server yang kompleks.',
    solution: 'Merancang arsitektur website berbasis WordPress & WooCommerce yang telah disesuaikan agar ringan, mudah digunakan oleh pedagang desa, dilengkapi fitur etalase produk, direct WhatsApp checkout, dan SEO lokal.',
    solutionPoints: [
      '1. Digital Storefront: Pembuatan katalog produk digital mandiri untuk pedagang Desa Cintaratu.',
      '2. WhatsApp Checkout: Integrasi pemesanan 1-klik langsung ke nomor WhatsApp pedagang lokal.',
      '3. Lightweight Architecture: Optimasi tema WordPress agar ringan dibuka pada jaringan internet desa.',
      '4. Local Regional SEO: Strategi kata kunci spesifik untuk produk kerajinan dan wisata kuliner desa.'
    ],
    architecture: 'WordPress Core ➔ Custom Child Theme ➔ WooCommerce Catalog ➔ WhatsApp Order Gateway ➔ Local Hosting Server',
    pipelineNodes: [
      { step: '01', title: 'Merchant Onboarding', detail: 'Local vendor product & photo submission' },
      { step: '02', title: 'Catalog Indexing', detail: 'WooCommerce structured taxonomy entry' },
      { step: '03', title: 'Asset Optimization', detail: 'Compressed image delivery & page caching' },
      { step: '04', title: 'Product Showcase', detail: 'Frictionless customer browsing interface' },
      { step: '05', title: 'WhatsApp Checkout', detail: 'Pre-formatted cart message generator' },
      { step: '06', title: 'Merchant Deal', detail: 'Direct peer-to-peer customer transaction' }
    ],
    features: [
      'Local merchant digital product showcase with photo galleries',
      'Direct-to-WhatsApp order dispatch for frictionless Indonesian customer interaction',
      'Search Engine Optimization (SEO) tailored for regional Cintaratu tourism & crafts',
      'Admin portal for village representatives to onboard new business owners'
    ],
    toolchainMatrix: [
      { category: 'Content Management', tech: 'WordPress Core', role: 'Sistem manajemen konten terdistribusi dan mudah dikelola perangkat desa.' },
      { category: 'E-Commerce Engine', tech: 'WooCommerce', role: 'Manajemen katalog produk, taksonomi harga, dan etalase merchant.' },
      { category: 'Direct Gateway', tech: 'WhatsApp Business API', role: 'Alur transaksi tanpa registrasi akun untuk kenyamanan pembeli lokal.' },
      { category: 'Database Store', tech: 'MySQL', role: 'Penyimpanan data katalog produk, merchant, dan konfigurasi portal.' }
    ]
  },
  {
    id: 'ayohiling',
    title: 'Ayo Hiling!',
    role: 'WordPress Architect & Tourism Tech Lead',
    category: 'web-development',
    description: 'Integrated Tourism & Vacation Destination Portal for Pangandaran.',
    detailedDescription: 'Second production project: designed an integrated travel portal uniting vacation spots, accommodations, and watersport tour operators in Pangandaran directly with travelers without platform fee markups or third-party commission cuts.',
    tags: ['WordPress', 'Tourism Portal', 'Direct Booking', 'Pangandaran Travel'],
    techStack: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'MySQL', 'SEO Optimization'],
    image: 'ayohiling',
    coverImage: '/projects/ayohiling/cover.jpeg',
    screenshots: ['/projects/ayohiling/screen-1.jpeg'],
    liveUrl: 'https://ayohiling.com',
    link: 'https://ayohiling.com',
    year: '2024',
    metrics: 'Zero Admin Fee Direct-to-Provider Tourism',
    stats: [
      { value: '50+', label: 'Curated Vacation Destinations' },
      { value: '0%', label: 'Direct Booking Platform Markup' },
      { value: '< 2s', label: 'Mobile Destination Page Load' },
      { value: 'Direct', label: 'Contact with Local Guides' }
    ],
    challenge: 'Wisatawan sering kesulitan menemukan penyedia jasa lokal (sewa perahu, surf instructor, homestay) dengan harga jujur tanpa biaya komisi aplikasi yang besar.',
    solution: 'Membangun direktori dan marketplace wisata terpadu yang menghubungkan traveler langsung dengan penyedia jasa asli Pangandaran, lengkap dengan itinerary guide, transparansi harga, dan integrasi pemesanan langsung.',
    solutionPoints: [
      '1. Tourism Directory: Pengelompokan pantai, watersport, dan homestay Pangandaran dalam satu portal.',
      '2. Zero-Fee Direct Connect: Menghubungkan traveler langsung dengan nelayan & pemandu wisata asli.',
      '3. Responsive Visuals: Penataan galeri pemandangan alam dengan kompresi gambar performa tinggi.',
      '4. Curated Itineraries: Rekomendasi rute liburan hemat dan transparansi kisaran harga sewa.'
    ],
    architecture: 'WordPress CMS ➔ Tourism Directory Engine ➔ Booking Inquiry Flow ➔ Responsive Mobile Experience',
    pipelineNodes: [
      { step: '01', title: 'Destination Directory', detail: 'Categorized spots, stays & watersports' },
      { step: '02', title: 'Media Compression', detail: 'High-res scenic asset optimization' },
      { step: '03', title: 'Traveler Search', detail: 'Filter by activity, budget & duration' },
      { step: '04', title: 'Itinerary Assembly', detail: 'Day-by-day destination recommendation' },
      { step: '05', title: 'Operator Connect', detail: 'Direct inquiry dispatch to local guide' },
      { step: '06', title: 'Tour Execution', detail: 'Transparent commission-free booking' }
    ],
    features: [
      'Comprehensive Pangandaran travel directory (beaches, watersports, culinary, stays)',
      'Direct connection between travelers and local service operators with 0% extra fee',
      'Curated travel itineraries and local travel tips',
      'Optimized image delivery for scenic vacation spot showcases'
    ],
    toolchainMatrix: [
      { category: 'CMS Architecture', tech: 'WordPress Core', role: 'Fondasi arsitektur portal direktori pariwisata dan blog itinerary.' },
      { category: 'Catalog Management', tech: 'WooCommerce / Custom Post', role: 'Manajemen direktori layanan, kategori objek, dan kontak mitra.' },
      { category: 'Performance Cache', tech: 'LiteSpeed & WebP Engine', role: 'Akselerasi loading foto pemandangan pantai dan objek wisata.' },
      { category: 'Database', tech: 'MySQL', role: 'Basis data relasional destinasi, testimoni, dan direktori mitra.' }
    ]
  }
];

export const SKILLS: Skill[] = [
  {
    name: 'JavaScript',
    category: 'frontend',
    level: 92,
    description: 'Architecting interactive client-side components, custom React states, full-stack ES Modules, and real-time DOM renders.',
    iconName: 'Cpu'
  },
  {
    name: 'PHP (CodeIgniter)',
    category: 'backend',
    level: 88,
    description: 'Building secure MVC architectures, optimizing complex queries, and developing RESTful endpoint structures.',
    iconName: 'Server'
  },
  {
    name: 'Python',
    category: 'backend',
    level: 85,
    description: 'Developing automated scraping scripts, data modeling routines, and fast prototyping utilities for cybersecurity tasks.',
    iconName: 'Binary'
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    level: 95,
    description: 'Crafting responsive, high-performance web templates utilizing optimized token pools and sleek, custom animations.',
    iconName: 'Palette'
  },
  {
    name: 'Bootstrap',
    category: 'frontend',
    level: 85,
    description: 'Developing rapid web grids, back-office administration interfaces, and clean, standardized enterprise styles.',
    iconName: 'Layout'
  },
  {
    name: 'SQL',
    category: 'backend',
    level: 90,
    description: 'Designing normalized relational databases, tuning indexes, writing subqueries, and securing database access paths.',
    iconName: 'Database'
  }
];

export const SOCIAL_LINKS: ContactLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/maleakhi-augustus',
    label: 'linkedin.com/in/maleakhi-augustus'
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/maleakhinymmo',
    label: 'github.com/maleakhinymmo'
  },
  {
    platform: 'Email',
    url: 'mailto:maleakhinymmo013@gmail.com',
    label: 'maleakhinymmo013@gmail.com'
  }
];
