# Asifah Analytics

**OSINT Threat Monitoring Platform for Middle East Regional Analysis**

Arabic: عاصفة (Asifah) = Storm

© 2025 RCGG. All Rights Reserved.

---

## Overview

Asifah Analytics is a sophisticated open-source intelligence (OSINT) platform designed for geopolitical threat assessment in the Middle East. The system provides real-time monitoring and probabilistic forecasting of potential Israeli military action against Hezbollah, Iran, and Houthis, while tracking Iranian domestic protest activity and casualty events.

Originally developed for use by Middle East regional analysts at the U.S. Department of State, the platform aggregates multilingual news sources, social media intelligence, and structured event databases to calculate actionable threat probability scores.

---

## Core Capabilities

### Multi-Source Intelligence Aggregation
- **NewsAPI Integration**: Live headlines from 75,000+ global news outlets
- **GDELT Event Database**: Structured event data with geolocation and intensity scoring
- **Reddit OSINT**: Scrapes r/ForbiddenBromance, r/Israel, r/Lebanon, r/OSINT for street-level sentiment
- **Iran Wire RSS**: Persian-language dissident journalism and protest reporting
- **HRANA RSS**: Human Rights Activists News Agency casualty tracking

### Threat Assessment Targets
1. **Hezbollah** (Lebanon)
2. **Iran** (Nuclear facilities, IRGC, regional proxies)
3. **Houthis** (Yemen, Red Sea shipping disruption)

### Iranian Protest Monitoring
- Real-time casualty tracking from HRANA and Iran Wire
- Geographic distribution of protest activity
- Escalation pattern analysis

### Threat Probability Calculation
The platform calculates threat scores based on:
- Volume of news coverage (40% weight)
- Escalation keyword frequency (40% weight)
- Target-specific mention density (20% weight)

**Threat Levels:**
- **Low (0-33%)**: Green - Minimal immediate threat
- **Medium (34-66%)**: Amber - Moderate concern  
- **High (67-100%)**: Red - Elevated threat

### Timeline Projections
- **0-30 Days**: Elevated threat (70%+)
- **31-90 Days**: Medium-term concern (50-69%)
- **91-180 Days**: Long-term monitoring (30-49%)
- **180+ Days**: Low priority (<30%)

---

## Technical Architecture

### Backend Infrastructure
- **Framework**: Flask (Python 3.11+)
- **Hosting**: Render.com (free tier with auto-sleep)
- **API Endpoints**: RESTful JSON responses
- **CORS**: Configured for cross-origin frontend access
- **Rate Limiting**: NewsAPI free tier (100 requests/day)

### Frontend Stack
- **Hosting**: GitHub Pages (custom domain via Cloudflare)
- **Custom Domain**: asifahanalytics.com
- **Framework**: Vanilla JavaScript (ES6+)
- **Styling**: Professional State Department formatting (Times New Roman 14pt)
- **Visualization**: Chart.js for probability charts
- **Responsive Design**: Mobile and desktop optimized

### Data Pipeline
```
News Sources → API Aggregation → Flask Backend → JSON API → Frontend Dashboard
     ↓              ↓                  ↓              ↓            ↓
NewsAPI        GDELT Event      Probability      RESTful      Interactive
Reddit         Database         Calculation      Endpoints     Visualization
Iran Wire      RSS Feeds        Algorithms
HRANA
```

### Language Support
- **English**: Primary analysis language
- **Arabic**: Iran Wire RSS, regional news
- **Farsi**: HRANA, Iranian dissident sources
- **Hebrew**: Times of Israel, Haaretz

### Browser Compatibility
- Chrome/Edge: ✅ Full support (including State Department workstations)
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

---

## Methodology

### Data Collection Keywords

**Hezbollah Target:**
- Primary: Hezbollah, Lebanon Israel, Southern Lebanon, Nasrallah, Litani River
- Escalation: strike, attack, military action, retaliate, offensive, troops, border, rocket, missile, incursion

**Iran Target:**
- Primary: Iran Israel, Iranian, Tehran, nuclear, IRGC, Natanz, Fordow
- Escalation: strike, attack, military action, retaliate, sanctions, nuclear facility, enrichment, weapons, centrifuge

**Houthis Target:**
- Primary: Houthis, Yemen, Ansar Allah, Red Sea, Bab al-Mandab
- Escalation: strike, attack, military action, shipping, missile, drone, blockade, navigation

### Threat Scoring Algorithm

**Three-Factor Weighted Model:**

1. **Volume Score** (max 40 points)
   - Raw article count from NewsAPI
   - Formula: `min(article_count × 2, 40)`
   - Rationale: High coverage indicates heightened attention

2. **Escalation Score** (max 40 points)
   - Mentions of military action keywords
   - Formula: `min(escalation_keyword_count × 3, 40)`
   - Rationale: Language intensity correlates with action likelihood

3. **Mention Score** (max 20 points)
   - Target-specific terminology frequency
   - Formula: `min(target_mention_count, 20)`
   - Rationale: Direct references indicate targeting specificity

**Final Probability** = (Volume + Escalation + Mention) capped at 99%

### GDELT Integration
- Queries GDELT 2.0 Event Database for structured conflict events
- Goldstein Scale scoring for event intensity
- Geographic filtering for Lebanon, Iran, Yemen theaters
- Temporal analysis: 24hr, 7-day, 30-day windows

### Reddit OSINT Methodology
- Scrapes key subreddits for street-level sentiment
- Filters for high-engagement posts (>50 upvotes)
- Sentiment analysis on comment threads
- Cross-references with official news sources

---

## Recent Enhancements

### December 2025 - January 2026 Updates
- ✅ Custom domain migration (asifahanalytics.com via Cloudflare)
- ✅ GDELT event database integration
- ✅ Reddit OSINT scraping capability
- ✅ Iran Wire + HRANA RSS feeds for protest monitoring
- ✅ Microsoft Edge compatibility fixes for State Department workstations
- ✅ CORS configuration for cross-domain API calls
- ✅ Enhanced threat scoring algorithms for realistic probability ranges

### Planned Features
- Syria monitoring module (Assad regime, ISIS remnants, Turkish operations)
- Flight disruption tracking (Ben Gurion, Beirut, Tehran airports)
- Enhanced geographic visualization (heatmaps, incident clustering)
- Telegram channel integration for additional OSINT sources
- Historical baseline comparison for anomaly detection

---

## Data Sources

**Primary Intelligence Feeds:**
- **NewsAPI.org**: 75,000+ global news outlets (Reuters, AP, Al Jazeera, Times of Israel, Haaretz, BBC, CNN)
- **GDELT Event Database**: Global conflict event tracking with geolocation
- **Reddit**: r/ForbiddenBromance, r/Israel, r/Lebanon, r/OSINT
- **Iran Wire**: Persian-language dissident journalism
- **HRANA**: Human Rights Activists News Agency (protest casualty tracking)

**Update Frequency:** 
- NewsAPI: On-demand manual scan
- GDELT: 15-minute event updates
- Reddit: Real-time scraping
- RSS Feeds: Hourly polling

---

## Security & Privacy

### Data Handling
- **Client-side processing**: No user data stored on servers
- **No tracking**: No analytics, cookies, or user profiling
- **Private repository**: Source code not publicly accessible
- **API keys**: Securely embedded (rate-limited free tier)

### Access Control
- Custom domain (asifahanalytics.com) limits discovery
- GitHub Pages static hosting (no server-side vulnerabilities)
- State Department workstation compatible (Edge browser support)

---

## Limitations & Considerations

### Current Limitations
- **Keyword-based analysis**: Pattern matching, not advanced NLP/LLM processing
- **English-language bias**: Multilingual sources present, but English-weighted
- **No sentiment analysis**: Cannot distinguish sarcasm, irony, or tonal nuance
- **No historical baseline**: Limited comparative trend analysis
- **Rate limits**: NewsAPI free tier (100 requests/day)
- **Manual scanning**: Not fully automated (by design for control)

### Analytical Caveats
- Probabilities represent **media attention**, not **operational intelligence**
- Tool supplements, but does not replace, classified intelligence assessments
- Keyword algorithms may overweight sensational coverage
- Does not account for diplomatic back-channels or classified developments

### Future Enhancement Roadmap
- Machine learning-based prediction models
- Advanced NLP sentiment analysis
- Multi-language processing improvements
- Automated anomaly detection
- Integration with flight tracking APIs
- Expansion to Syria theater monitoring

---

## Disclaimer

**IMPORTANT ANALYTICAL NOTICE:**

This platform is a research and analytical tool for educational purposes and unclassified open-source intelligence gathering.

- **NOT an official U.S. Government product**: Does not represent State Department, Intelligence Community, or DoD assessments
- **Probabilities are illustrative**: Based on public news aggregation and keyword analysis only
- **Not for operational use**: Users must consult classified intelligence sources for decision-making
- **One data point among many**: Should be triangulated with official threat assessments, diplomatic reporting, and intelligence products
- **No predictive guarantee**: Past media coverage does not guarantee future events

**Users are responsible for applying appropriate analytical tradecraft and classification guidelines when integrating OSINT with official intelligence products.**

---

## Intellectual Property

### Copyright Notice

**© 2025 RCGG. All Rights Reserved.**

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
**Development Timeline:** August 2025 - Present  
**Current Version:** 2.0 (January 2026)  
**Repository:** Private (GitHub)

For technical support, feature requests, or analytical feedback, contact the repository owner.

---

*Last Updated: January 24, 2026*
