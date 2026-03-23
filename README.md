#  GigShield-Parametric Income Insurance for Q-Commerce Delivery Partners  

**Guidewire DEVTrails 2026 | AI-Powered Insurance for India’s Gig Economy**  
**Persona:** Q-Commerce Delivery Partners (Zepto / Blinkit / Swiggy Instamart)

---

## The Problem

Gig delivery workers in India lose **20–30% of their income** due to events they cannot control — rain, heatwaves, curfews, or platform outages.

India's quick-commerce delivery partners operate on **10-minute delivery windows** — the tightest, highest-pressure segment of the gig economy.  
A single bad weather hour, a curfew, or a platform outage wipes out their shift earnings.  
No insurance product protects them today. They bear this loss alone, with zero recourse.

---

## What We're Building

**GigShield: Automatic income protection for delivery workers — triggered by real-world disruptions.**

GigShield is a **zero-paperwork, AI-powered parametric income insurance platform** built specifically for Q-commerce delivery partners.  
When a qualifying disruption hits a worker's zone — heavy rain, dangerous AQI, a curfew — GigShield detects it automatically, validates it, and pays the worker within minutes.  

No claim form. No adjuster. No wait.

**Inspired by:**  
- Lemonade's sub-3-second AI claim settlement  
- Etherisc's "trigger-not-assess" parametric philosophy  
- Verak's ₹/day pricing model and WhatsApp-first onboarding  
- MIC Global's flood parametric product for Indian gig workers  

---

## Persona

| Attribute | Detail |
|---------|--------|
| Segment | Q-Commerce — Zepto, Blinkit, Swiggy Instamart |
| Avg daily earnings | ₹700 – ₹1,100 |
| Shift pattern | 6–14 hrs/day, 6–7 days/week |
| Earnings cycle | Weekly platform payouts |
| Financial cushion | Usually < 3 days of savings |
| Peak vulnerability | Monsoon, heatwaves, local shutdowns |
| Unique risk | 10-min SLAs → even 1–2 hrs downtime = full shift loss |

---

## Real-World Scenario

Ravi operates in Koramangala, Bengaluru for Zepto.  
On Thursday evening (7–10 PM peak slot), a 3-hour cloudburst hits. Orders stop.  
He loses ₹400 — nearly half his daily income.

**With GigShield:**  
Rainfall sensor crosses threshold → Policy triggers automatically → ₹400 lands in his UPI before the rain stops.

---

## Coverage Scope

 **Strictly income loss only.**  
No health, life, accident, or vehicle repair coverage.

| Trigger | Condition | Data Source | Payout |
|--------|----------|------------|--------|
| Heavy Rain | IMD rainfall > 35 mm/hr sustained ≥ 45 min in worker's pincode | IMD / OpenWeatherMap | Lost shift hours × hourly rate |
| Extreme Heat | Temp > 43°C for ≥ 3 hrs during active shift | IMD | 50% shift payout |
| Hazardous AQI | AQI > 300 in worker's zone | OpenAQ | Full shift payout |
| Curfew / Strike | Govt-declared shutdown or verified local bandh | Civic alert scraper / mock | Full shift payout |
| Platform Outage | Zepto/Blinkit app down > 90 min during peak hours | Platform API mock | Partial shift payout |
| Flash Flood Alert | IMD/NDMA flood warning active in delivery zone | IMD / NDMA | Full shift payout |

---

## Weekly Premium Model

Premiums are structured weekly to align with the **7-day payout cycle** — designed to feel like a recharge, not an insurance bill.

| Tier | Profile | Weekly Premium | Max Weekly Payout |
|------|--------|---------------|------------------|
| Saathi | Low-risk zone, 1+ yr experience, clean claim history | ₹29 | ₹1,200 |
| Rakshak | Mixed zone, moderate disruption history | ₹59 | ₹2,500 |
| Suraksha | Flood-prone / high-AQI zone, or new worker | ₹99 | ₹4,000 |

Premium is dynamically recalculated every Monday based on:
- Zone-level 30-day disruption frequency
- Worker's active hours pattern and shift-risk overlap
- Seasonal index (monsoon surge, summer AQI spike)
- Fraud score from prior claim behaviour

Example: Ravi (Koramangala, Bengaluru) → Rakshak Tier  
Premium = ₹59/week · Max payout = ₹2,500/week

---

## How It Works

The system continuously monitors environmental and civic data streams.  
When disruption thresholds are crossed, the parametric trigger engine automatically validates worker eligibility and initiates payout — **no human intervention required.**

### Flow

Onboarding (<3 min)  
Phone number → Partner ID → Zone pin → AI risk profile → Weekly policy issued instantly  

Real-time Monitoring (every 5 min)  
Weather API · AQI feed · Civic alert scraper · Platform uptime monitor  

Auto-Trigger Engine  
Validates: zone match · active policy · shift window · fraud score · duplicate check  

Instant Payout  
Amount calculated → UPI/bank transfer → Worker notified via SMS + app push  

---

## AI / ML Architecture

### 1. Dynamic Premium Engine
- Model: XGBoost regression predicting zone risk using historical weather, AQI, and civic disruption data by pincode  
- Features: Zone risk score, seasonal index, worker tenure, shift-hour overlap with peak disruption windows  
- Output: Weekly premium tier + coverage cap  
- Cadence: Recalculates every Monday 00:00  

### 2. Fraud Detection System
Inspired by Lemonade's multi-algorithm approach

| Layer | Method |
|------|--------|
| GPS Validation | Last known location must fall inside disruption boundary |
| Activity Cross-check | Delivery logs checked for active deliveries |
| Duplicate Prevention | One claim per disruption event per week |
| Behavioural Anomaly | Isolation Forest on claim patterns |
| Identity Binding | Phone + partner ID locked |

### 3. Predictive Risk Alerts
- 7-day ahead weather + AQI forecast per zone  
- Proactive push: “High rain risk Thursday 6–9 PM”  
- Insurer dashboard: predicted claim volume + loss ratio forecast  

---

## Business Impact

| Stakeholder | Impact |
|------------|--------|
| Workers | Income stability during disruptions |
| Platforms | Higher retention · Reduced churn |
| Insurers | Access to ₹4,000 Cr+ micro-insurance market |
| Society | First safety net for 12M+ gig workers |

---

## Tech Stack

Frontend → React + Tailwind (PWA)  
Backend → Node.js + Express  
AI/ML → Python + Scikit-learn + XGBoost  
Database → PostgreSQL + Redis  
Weather API → OpenWeatherMap + IMD mock  
AQI API → OpenAQ  
Payments → Razorpay Test Mode + UPI Sandbox  
Infra → AWS / Render  

---

## Why PWA over native mobile?

Q-commerce partners use entry-to-mid-range Android devices.  
PWA removes app-store friction, supports push notifications, and works reliably on 4G.

This stack supports real-time event ingestion and scalable claim triggers while remaining lightweight for hackathon prototyping — and production-ready for scale.

---

## Development Roadmap

### Phase 1 — Ideation & Foundation
Timeline: Mar 4 – Mar 20  
Focus: Research, architecture, persona definition  
Deliverable: README + 2-min strategy video  
Success Metric: Validated disruption triggers  

### Phase 2 — Core Platform
Timeline: Mar 21 – Apr 4  
Focus: Onboarding, policy engine, dynamic pricing, claims flow  
Deliverable: Source code + demo video  
Success Metric: End-to-end claim simulation  

### Phase 3 — Scale & Intelligence
Timeline: Apr 5 – Apr 17  
Focus: Fraud detection, instant payout, dashboards  
Deliverable: Final demo + pitch deck  
Success Metric: Live automated payout demo  

---

## Repository Structure
```
gigshield/
├── src/
│   ├── lib/
│   │   └── utils.ts          # Utility helper functions
│   ├── App.tsx               # Main application component
│   ├── index.css             # Global styles
│   ├── main.tsx              # React entry point
│   └── types.ts              # TypeScript type definitions
│
├── media/
│   └── gigshield.mp4         # Demo / project video
│
├── .env.example              # Environment variables template
├── .gitignore                # Git ignored files configuration
├── index.html                # Root HTML template
├── metadata.json             # App metadata/config
├── package.json              # Dependencies & scripts
├── package-lock.json         # Dependency lock file
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build configuration
└── README.md                 # Project documentation
```

---

## Inspiration & Research

- Lemonade  
- Etherisc  
- Verak (YC W21)  
- MIC Global + WRMS  
- Blue Marble + SEWA  

---

## Links

Phase 1 Demo Video: [Watch video explanation here](media/gigshield.mp4)

---

## Closing Note

GigShield protects the invisible workforce powering India’s 10-minute economy.

If a storm can stop deliveries, it shouldn't stop a worker's income.

Coverage is strictly limited to income loss from external disruptions.  
Health, life, accident, and vehicle repair claims are explicitly excluded.
