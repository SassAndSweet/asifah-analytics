# Asifah Analytics

**Israeli Military Action Forecasting Dashboard**

Arabic: عاصفة (Asifah) = Storm

---

## Overview

Asifah Analytics is an open-source intelligence (OSINT) forecasting tool that analyzes news coverage to assess the probability of Israeli military action against three primary targets:

- **Hezbollah** (Lebanon)
- **Iran**
- **Houthis** (Yemen)

The dashboard aggregates news headlines from major international sources and calculates threat probabilities based on:
- Volume of news coverage
- Frequency of escalation-related keywords
- Mention density of target-specific terms

---

## Features

### Real-Time News Scanning
- Fetches live headlines from NewsAPI.org
- Aggregates coverage from Reuters, AP, Al Jazeera, Times of Israel, Haaretz, and other major outlets
- Customizable time windows: 24 hours, 48 hours, 7 days, or 30 days

### Threat Probability Calculation
- **Low (0-33%)**: Green - Minimal immediate threat
- **Medium (34-66%)**: Amber - Moderate concern
- **High (67-100%)**: Red - Elevated threat

### Timeline Projections
Based on calculated probability:
- **0-30 Days**: Elevated threat (70%+)
- **31-90 Days**: Medium-term (50-69%)
- **91-180 Days**: Long-term (30-49%)
- **180+ Days**: Low priority (<30%)

### Interactive Dashboard
- Professional State Department styling (Times New Roman 14)
- Click-to-scan functionality with audio feedback
- Real headline display with source links
- Responsive design for desktop and mobile

---

## Methodology

### Data Collection
The tool queries NewsAPI.org using target-specific keywords:

**Hezbollah:**
- Keywords: Hezbollah, Lebanon Israel, Southern Lebanon, Nasrallah
- Escalation indicators: strike, attack, military action, retaliate, offensive, troops, border, rocket, missile

**Iran:**
- Keywords: Iran Israel, Iranian, Tehran, nuclear, IRGC
- Escalation indicators: strike, attack, military action, retaliate, sanctions, nuclear facility, enrichment, weapons

**Houthis:**
- Keywords: Houthis, Yemen, Ansar Allah, Red Sea
- Escalation indicators: strike, attack, military action, shipping, missile, drone, blockade

### Threat Scoring Algorithm

The probability calculation uses three weighted factors:

1. **Volume Score** (max 40 points)
   - Based on total number of articles found
   - Formula: `min(article_count × 2, 40)`

2. **Escalation Score** (max 40 points)
   - Counts mentions of military action keywords
   - Formula: `min(escalation_keyword_count × 3, 40)`

3. **Mention Score** (max 20 points)
   - Tracks frequency of target-specific mentions
   - Formula: `min(target_mention_count, 20)`

**Final Probability** = Volume Score + Escalation Score + Mention Score (capped at 99%)

---

## Technical Details

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **API**: NewsAPI.org
- **Hosting**: GitHub Pages (static site)
- **Styling**: Times New Roman 14 (U.S. State Department standard)

### Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

---

## Installation & Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete setup instructions.

**Quick Start:**
1. Clone or download this repository
2. Your NewsAPI key is already embedded in the code
3. Upload to GitHub repository
4. Enable GitHub Pages in Settings
5. Access your dashboard at `https://username.github.io/repo-name/`

---

## Data Sources

**News Aggregation:** NewsAPI.org
- Reuters
- Associated Press
- Al Jazeera
- Times of Israel
- Haaretz
- BBC News
- CNN
- And 75,000+ other global sources

**Update Frequency:** On-demand via manual scan

---

## Limitations & Considerations

### Current Limitations
- **Keyword-based analysis**: Simple pattern matching, not sophisticated NLP
- **English-language only**: Misses Arabic, Hebrew, and Farsi sources
- **No sentiment analysis**: Cannot distinguish positive/negative tone
- **No historical baseline**: No comparison to normal coverage levels
- **Rate limited**: NewsAPI free tier allows 100 requests/day

### Future Enhancements (Potential)
- Multi-language support (Arabic, Hebrew, Farsi)
- Sentiment analysis integration
- Historical trend comparison
- Social media monitoring (Twitter/X)
- Official government statement tracking
- Machine learning-based prediction

---

## Security & Privacy

- **Client-side only**: No data stored or transmitted to third parties
- **No user tracking**: No analytics or cookies
- **Open source**: All code visible and auditable
- **API Key**: Already embedded (free tier, rate limited to 100 requests/day)

---

## Disclaimer

**IMPORTANT:** This dashboard is an analytical tool for educational and research purposes only. 

- Probabilities are based on open-source news aggregation and simple keyword analysis
- This tool does NOT represent official U.S. government assessments or policy positions
- Users should consult official intelligence sources for operational decision-making
- The tool's predictions should be used as one data point among many in analytical processes

---

## Author

Developed for use by Middle East regional analysts at the U.S. Department of State.

For questions or feedback, contact the repository owner.

---

## License

This project is intended for internal analytical use. Contact the author before any external distribution.

---

*Last Updated: January 1, 2026*
