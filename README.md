# Asifah Analytics

**OSINT Threat Monitoring Platform for Middle East Regional Analysis**

Arabic: عاصفة (Asifah) = Storm

© 2025–2026 RCGG. All Rights Reserved.

---

## Overview

Asifah Analytics is a sophisticated open-source intelligence (OSINT) platform designed for geopolitical threat assessment in the Middle East. The system provides real-time monitoring and probabilistic forecasting of potential military action involving Israel, Hezbollah, Iran, Houthis, and Syria, while tracking Iranian domestic protest activity and regional stability indicators.

Originally developed for use by Middle East regional analysts at the U.S. Department of State, the platform aggregates multilingual news sources, social media intelligence, prediction market data, and structured event databases to calculate actionable threat probability scores.

**Live Site:** [asifahanalytics.com](https://asifahanalytics.com)

---

## Platform Structure

### Landing Page (`index.html`)
The main dashboard featuring four collapsible threat cards (Iran, Hezbollah, Houthis, Syria) with:
- Individual OSINT scan buttons with configurable time windows (24h, 48h, 7d, 30d)
- Probability gauges with color-coded threat levels
- Multi-Actor Threat Matrix (incoming/outgoing threats per target)
- Weighted headline display with article scoring details
- Polymarket prediction market ticker
- Flight Disruptions Monitor
- Active NOTAMs (Notices to Air Missions) for Middle East airspace
- OSINT Instagram feed sidebar ([@asifahanalytics](https://instagram.com/asifahanalytics))
- Google Analytics quick-access button
- Rate limit tracker for NewsAPI quota management

### Country Stability Pages

Each country card on the landing page links to a dedicated stability page with deeper analysis:

| Page | File | Features |
|------|------|----------|
| 🇮🇷 **Iran Stability Indicators** | `iran-protests.html` | Protest intensity tracking, HRANA casualty data (deaths/arrests/injuries), regime stability calculations, geographic protest distribution |
| 🇱🇧 **Lebanon Stability Indicators** | `lebanon-stability.html` | Currency monitoring, bond tracking, Hezbollah activity, gold reserves, economic indicators via dedicated Lebanon backend |
| 🇸🇾 **Syria Stability Indicators** | `syria-conflicts.html` | Factional control mapping, displacement data, conflict zone tracking, Syria Direct & SOHR RSS feeds, Captagon trade analysis |
| 🇾🇪 **Yemen Stability Indicators** | `yemen-stability.html` | Houthi military capabilities, Red Sea maritime security, humanitarian crisis metrics, political fragmentation analysis, Saudi coalition dynamics |

### Common Features Across All Pages
- **Light/Dark theme toggle** with persistent preference (localStorage)
- **Multilingual support**: English, Hebrew (עב), Arabic (ع), Farsi (فا) with RTL layout
- **Knowledge Library**: Collapsible cards with curated open-source research and report links
- **Interactive maps**: OpenStreetMap embeds centered on each country/region
- **Live article feeds**: Backend-powered with static fallback sources
- **Asifah branding**: Logo watermark, consistent header/footer, Buy Me a Coffee links

### Supporting Pages

| Page | File | Purpose |
|------|------|---------|
| **Privacy Policy** | `privacy.html` | GDPR-style privacy policy covering Google Analytics, data sources, cookies, and third-party services |

---

## Core Capabilities

### Multi-Source Intelligence Aggregation
- **NewsAPI Integration**: Live headlines from 75,000+ global news outlets
- **GDELT Event Database**: Structured event data with geolocation, Goldstein Scale intensity scoring, and multilingual coverage (Arabic, Hebrew, Farsi)
- **Reddit OSINT**: Scrapes r/ForbiddenBromance, r/Israel, r/Lebanon, r/OSINT, r/Yemen, r/geopolitics for street-level sentiment
- **Iran Wire RSS**: Persian-language dissident journalism and protest reporting
- **HRANA RSS**: Human Rights Activists News Agency casualty tracking (deaths, arrests, injuries)
- **Syria Direct RSS**: English and Arabic reporting on Syrian conflict
- **SOHR RSS**: Syrian Observatory for Human Rights monitoring
- **Polymarket API**: Crowdsourced prediction market probabilities for Middle East conflict scenarios

### Threat Assessment Targets
1. **Iran** — Nuclear facilities, IRGC, domestic protests, regional proxy coordination
2. **Hezbollah / Lebanon** — Southern Lebanon, ceasefire compliance, political instability, economic collapse
3. **Houthis / Yemen** — Red Sea shipping disruption, missile/drone capabilities, Saudi-Houthi negotiations
4. **Syria** — Post-Assad factional dynamics, Israeli buffer zone operations, displacement crisis

### Threat Probability Calculation

The platform uses a **three-factor weighted model** with time decay and source credibility weighting:

1. **Volume Score** (max 40 points) — Article count from NewsAPI with recency bias
2. **Escalation Score** (max 40 points) — Military action keyword frequency with phrase weighting
3. **Mention Score** (max 20 points) — Target-specific terminology density

**Additional scoring factors:**
- Momentum analysis (trend direction over time windows)
- Source credibility weighting (official vs. aggregator sources)
- Time decay (recent articles weighted higher)
- Coordination bonuses (multi-front activity multipliers)

**Threat Levels:**
- **Low (0–33%)**: Green — Minimal immediate threat
- **Medium (34–66%)**: Amber — Moderate concern
- **High (67–100%)**: Red — Elevated threat

### Multi-Actor Threat Matrix
Each target card includes an expandable threat matrix showing:
- **Incoming threats**: Israel strike probability, US strike probability
- **Outgoing threats**: Target → Israel, Target → US
- **Combined probability**: Aggregated score with coordination bonus
- **Risk badges**: Color-coded LOW / MODERATE / HIGH / VERY HIGH

### Flight Disruptions Monitor
- Tracks airline cancellations/suspensions to conflict-zone airports
- Expandable card grid with airline logos, route details, status badges
- Color-coded: suspended (red), cancelled (darker red), resumed (green)

### Active NOTAMs Widget
- Scrolling ticker of active Notices to Air Missions for Middle East airspace
- Color-coded by severity: red, orange, yellow, purple, blue, gray
- Auto-refreshes every 15 minutes

### Polymarket Prediction Ticker
- Scrolling ticker displaying crowd-sourced conflict probabilities
- Links to individual Polymarket contracts
- Disclaimer: supplementary data, not intelligence assessment

---

## Technical Architecture

### Frontend Stack
- **Hosting**: GitHub Pages with custom domain via Cloudflare
- **Custom Domain**: [asifahanalytics.com](https://asifahanalytics.com)
- **Framework**: Vanilla JavaScript (ES6+), no build tools required
- **Styling**: CSS custom properties for light/dark theming; Times New Roman 14pt (State Department formatting)
- **Visualization**: SVG gauges, CSS animations, dynamic color-coded bars
- **Maps**: OpenStreetMap iframe embeds per country page
- **Analytics**: Google Analytics (G-Z9114D1Z5C)
- **Responsive Design**: Mobile-first with CSS Grid, Flexbox, and media queries at 768px breakpoint
- **Favicon**: Custom Asifah Analytics logo

### Backend Services
| Service | URL | Purpose |
|---------|-----|---------|
| **Main Backend** | `asifah-backend.onrender.com` | NewsAPI, GDELT, Reddit, threat scoring, Polymarket, flights, NOTAMs |
| **Lebanon Backend** | `lebanon-stability-backend.onrender.com` | Currency, bonds, Hezbollah activity, gold reserves |

### API Endpoints (Main Backend)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/iran-strike-probability` | GET | Iran threat score with cached/refresh modes |
| `/api/hezbollah-activity` | GET | Hezbollah/Lebanon threat score |
| `/api/houthis-threat` | GET | Houthis/Yemen threat score |
| `/api/syria-conflict` | GET | Syria conflict threat score |
| `/api/threat-matrix/{target}` | GET | Multi-actor threat matrix for target |
| `/api/polymarket` | GET | Prediction market data |
| `/api/notams` | GET | Active NOTAMs for Middle East |
| `/flight-cancellations` | GET | Airline disruption data |
| `/scan-iran-protests` | GET | Iran protest intensity + HRANA data |
| `/scan-yemen` | GET | Yemen-specific article feed |
| `/scan-osint` | GET | General OSINT article scan with query parameter |
| `/rate-limit` | GET | NewsAPI quota status |

### Data Pipeline
```
News Sources → API Aggregation → Flask Backend → JSON API → Frontend Dashboard
     ↓              ↓                  ↓              ↓            ↓
NewsAPI        GDELT Event      Probability      RESTful      Interactive
Reddit         Database         Calculation      Endpoints     Visualization
Iran Wire      RSS Feeds        + Time Decay     + Caching     + Multilingual
HRANA          Polymarket       + Momentum                     + Theming
Syria Direct                    + Credibility
SOHR                            Weighting
```

### Language Support
- **English**: Primary analysis language
- **Hebrew**: Times of Israel, Haaretz, Ynet via GDELT; full UI translation
- **Arabic**: Al Jazeera, Al Arabiya, regional outlets via GDELT; full UI translation
- **Farsi**: HRANA, Iran Wire, Persian-language feeds; full UI translation

### Browser Compatibility
- Chrome/Edge: ✅ Full support (including State Department workstations)
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

---

## File Structure

```
asifah-analytics/
├── index.html                  # Main landing page / threat dashboard
├── iran-protests.html          # Iran Stability Indicators page
├── lebanon-stability.html      # Lebanon Stability Indicators page
├── syria-conflicts.html        # Syria Stability Indicators page
├── yemen-stability.html        # Yemen Stability Indicators page
├── privacy.html                # Privacy Policy page
├── favicon.png                 # Site favicon
├── Asifah_Analytics_*.png      # Logo assets
├── resources/
│   └── Asifah_Captagon_Snapshot.pdf  # Syria Captagon trade one-pager
└── README.md                   # This file
```

---

## Recent Enhancements

### February 2026
- ✅ Yemen Stability Index page (`yemen-stability.html`) with Knowledge Library (5 categories), OpenStreetMap, multilingual support
- ✅ Yemen navigation button added to landing page Houthis card
- ✅ Standardized country page button text to "Stability Indicators" across all cards
- ✅ Iran Protests Dashboard debugging (protest intensity card, HRANA links, casualty data display)
- ✅ Backend API endpoint restructuring (new `/api/{target}` pattern with `?refresh=true`)
- ✅ Collapsible card system refinements (cached data on load, manual scan on expand)

### January–February 2026
- ✅ OSINT Instagram feed sidebar integration (SnapWidget)
- ✅ Google Analytics floating button (lower-right corner)
- ✅ Light/Dark theme toggle across all pages
- ✅ Collapsible card system for landing page (accordion behavior)
- ✅ Multi-Actor Threat Matrix with coordination bonuses
- ✅ NOTAMs widget with color-coded scrolling ticker
- ✅ Flight Disruptions Monitor with expandable card grid
- ✅ Privacy Policy page (`privacy.html`)
- ✅ Syria Conflict Tracker page with Syria Direct + SOHR feeds
- ✅ Captagon trade one-pager (PDF) linked from Syria page
- ✅ Knowledge Library sections on all country pages

### December 2025 – January 2026
- ✅ Custom domain migration (asifahanalytics.com via Cloudflare)
- ✅ GDELT event database integration
- ✅ Reddit OSINT scraping capability
- ✅ Iran Wire + HRANA RSS feeds for protest monitoring
- ✅ Polymarket prediction market ticker
- ✅ Lebanon Stability Index with dedicated backend
- ✅ Microsoft Edge compatibility fixes for State Department workstations
- ✅ CORS configuration for cross-domain API calls
- ✅ Enhanced threat scoring algorithms with time decay and momentum analysis
- ✅ Buy Me a Coffee integration

### Planned Features
- ⬜ Telegram channel integration (including Yair Altman's Hebrew channel)
- ⬜ Enhanced geographic visualization (heatmaps, incident clustering, territorial overlays)
- ⬜ Historical baseline comparison for anomaly detection
- ⬜ Machine learning-based prediction models
- ⬜ Additional one-pager policy documents for each country's Knowledge Library
- ⬜ Advanced NLP sentiment analysis

---

## Data Sources

**Primary Intelligence Feeds:**
- **NewsAPI.org**: 75,000+ global news outlets (Reuters, AP, Al Jazeera, Times of Israel, Haaretz, BBC, CNN)
- **GDELT Event Database**: Global conflict event tracking with geolocation and multilingual coverage
- **Reddit**: r/ForbiddenBromance, r/Israel, r/Lebanon, r/OSINT, r/Yemen, r/geopolitics
- **Iran Wire**: Persian-language dissident journalism
- **HRANA**: Human Rights Activists News Agency (protest casualty tracking)
- **Syria Direct**: English and Arabic Syria conflict reporting
- **SOHR**: Syrian Observatory for Human Rights
- **Polymarket**: Crowdsourced prediction market probabilities

**Update Frequency:**
- NewsAPI: On-demand manual scan (button click) with server-side caching
- GDELT: 15-minute event updates
- Reddit: Real-time scraping
- RSS Feeds: Hourly polling
- Polymarket: Refreshes every 30 minutes
- NOTAMs: Refreshes every 15 minutes
- Flight Disruptions: Refreshes every 30 minutes
- Collapsed card data: Loaded from cache on page load

---

## Security & Privacy

### Data Handling
- **Client-side processing**: No user data stored on servers
- **Google Analytics**: Anonymous usage tracking only (GA4)
- **Privacy Policy**: Full policy at [asifahanalytics.com/privacy.html](https://asifahanalytics.com/privacy.html)
- **localStorage**: Theme preference and language selection only
- **No user accounts**: No registration, login, or personal data collection
- **API keys**: Securely embedded in backend (rate-limited free tier)

### Access Control
- Custom domain (asifahanalytics.com) for professional sharing
- GitHub Pages static hosting (no server-side vulnerabilities)
- State Department workstation compatible (Edge browser support)
- CORS configured for authorized cross-origin API access

---

## Limitations & Considerations

### Current Limitations
- **Keyword-based analysis**: Pattern matching with weighted scoring, not advanced NLP/LLM processing
- **English-language bias**: Multilingual sources present (Arabic, Hebrew, Farsi), but English-weighted in scoring
- **No sentiment analysis**: Cannot distinguish sarcasm, irony, or tonal nuance
- **Rate limits**: NewsAPI free tier (100 requests/day) — tracked via dashboard widget
- **Manual scanning**: Not fully automated (by design for analyst control)
- **Backend cold starts**: Render.com free tier auto-sleeps after inactivity; first request may take 30–60 seconds

### Analytical Caveats
- Probabilities represent **media attention and escalation signals**, not operational intelligence
- Tool supplements, but does not replace, classified intelligence assessments
- Keyword algorithms may overweight sensational coverage
- Does not account for diplomatic back-channels or classified developments
- Polymarket data reflects betting market sentiment, not analytical tradecraft
- One data point among many — should be triangulated with official assessments

---

## Disclaimer

**IMPORTANT ANALYTICAL NOTICE:**

This platform is a research and analytical tool for educational purposes and unclassified open-source intelligence gathering.

- **NOT an official U.S. Government product**: Does not represent State Department, Intelligence Community, or DoD assessments
- **Probabilities are illustrative**: Based on public news aggregation and keyword analysis only
- **Not for operational use**: Users must consult classified intelligence sources for decision-making
- **No predictive guarantee**: Past media coverage does not guarantee future events

**Users are responsible for applying appropriate analytical tradecraft and classification guidelines when integrating OSINT with official intelligence products.**

---

## Acknowledgments

Special thanks to Peter N. for conceptual contributions, analytical feedback, and serving as a valuable sounding board during the development of Asifah Analytics. His insights helped shape key aspects of the threat assessment methodology.

---

## Intellectual Property

### Copyright Notice

**© 2025–2026 RCGG. All Rights Reserved.**

This software, including all source code, algorithms, documentation, and associated materials, is the exclusive intellectual property of RCGG.

### Proprietary License

**ALL RIGHTS RESERVED.** This is proprietary software.

**Unauthorized use, reproduction, distribution, modification, or commercial exploitation of this software in whole or in part is strictly prohibited without prior written consent from the copyright holder.**

Specifically prohibited without authorization:
- Copying or reproducing the source code
- Modifying or creating derivative works
- Distributing, publishing, or sublicensing the software
- Using the software for commercial purposes
- Reverse engineering or decompiling the code
- Incorporating the software into other products or services

**Internal Use Authorization:** This software is authorized for use by the copyright holder and designated individuals within the U.S. Department of State for unclassified analytical purposes only.

**For licensing inquiries or permission requests, contact the copyright holder.**

---

## Development & Maintenance

**Developer:** RCGG
**Primary Use Case:** Middle East regional threat analysis
**Development Timeline:** August 2025 – Present
**Current Version:** 3.0 (February 2026)
**Repository:** Private (GitHub)

For technical support, feature requests, or analytical feedback:
- **Email:** [asifahanalytics@gmail.com](mailto:asifahanalytics@gmail.com)
- **Instagram:** [@asifahanalytics](https://instagram.com/asifahanalytics)
- **Support:** [Buy Me a Coffee](https://buymeacoffee.com/asifahanalytics)

---

*Last Updated: February 16, 2026*
