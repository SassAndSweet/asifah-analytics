# asifah-analytics
Israeli Military Action Forecasting Dashboard
Asifah Analytics
Israeli Military Action Forecasting Dashboard
Overview
Asifah Analytics (Arabic: عاصفة - "Storm") is an open-source intelligence (OSINT) forecasting tool designed to assess the probability and timeline of potential Israeli military action against three regional targets: Hezbollah, Iran, and the Houthis.
This tool aggregates and analyzes publicly available information from news sources, social media, think tank analyses, and official statements to generate probability assessments and timeline predictions.
Purpose
This is an analytical tool for informational purposes only. It is designed to complement, not replace, official intelligence assessments. The dashboard synthesizes multiple expert perspectives and open-source signals to provide a supplementary analytical framework.
Features

Three-Target Analysis: Separate probability and timeline assessments for Hezbollah, Iran, and Houthis
Customizable Time Windows: Scan OSINT data from the last 24 hours, 48 hours, 7 days, or 30 days
On-Demand Scanning: User-initiated analysis via "Scan Now" button
Top Contributing Factors: Displays the three most significant indicators driving each assessment
Professional Interface: Clean, State Department-appropriate design with Times New Roman typography
Color-Coded Risk Levels:

Green (0-33%): Low probability
Amber (34-66%): Medium probability
Red (67-100%): High probability



Data Sources
The model draws from multiple categories of open-source intelligence:
News Outlets

English: Reuters, AP, New York Times, Washington Post, Times of Israel
Arabic: Al Jazeera, MTV Lebanon, An-Nahar, Al-Akhbar
Hebrew: Haaretz, Israeli media sources
Farsi: Iranian news outlets (TBD)

Social Media

Twitter/X: IDF accounts, Iranian officials, Netanyahu, regional analysts
Reddit: Country subreddits, r/ForbiddenBromance

Think Tanks & Analysis

Institute for the Study of War (ISW)
Washington Institute for Near East Policy (WINEP)
Foundation for Defense of Democracies (FDD)
Middle East Institute (MEI)
American Task Force Lebanon (ATFL)

Official Statements

White House press releases and statements
Israeli government (Prime Minister, Defense Ministry, IDF)
Hezbollah official channels
Hamas leadership statements
Houthi (Ansarallah) announcements
Iranian Revolutionary Guard Corps (IRGC)

Indicators & Methodology
The forecasting model weighs multiple categories of indicators:

Rhetoric Escalation: Threats, red lines, ultimatums from all parties
Military Movements: Troop deployments, mobilizations, repositioning
Diplomatic Activity: UN statements, back-channel talks, diplomatic failures
Incident Frequency: Border skirmishes, rocket attacks, drone incidents
Economic/Political Pressure: Sanctions, internal politics, elections
Historical Patterns: Anniversaries, religious calendars, election cycles
Adversary Statements: Inflammatory statements and threats from Hezbollah, Hamas, Houthis, IRGC

The model uses a hybrid approach combining:

Expert-defined indicator weights based on Middle East analytical experience
Automated sentiment analysis of news and official statements
Synthesis of think tank expert assessments

Technical Stack

Frontend: HTML5, CSS3, JavaScript
Deployment: GitHub Pages
APIs: (To be implemented for live data scanning)
Future Enhancements: Python backend for automated news scraping and sentiment analysis

Current Status
Version: 1.0 (Prototype)
Status: Mock data implementation for interface testing
Next Phase: API integration for live OSINT scanning
Installation & Usage
For GitHub Pages Deployment:

Clone this repository
Enable GitHub Pages in repository settings
Set source to main branch
Access via: https://[username].github.io/asifah-analytics/

Local Testing:
Simply open index.html in any modern web browser.
Roadmap

 Integrate news API for automated scanning
 Implement sentiment analysis algorithm
 Add historical data tracking
 Create downloadable reports
 Add user authentication for secure access
 Mobile-responsive design improvements

Disclaimer
IMPORTANT: This is an analytical tool for informational purposes only. Predictions are based on open-source intelligence and automated analysis. This should not be considered authoritative intelligence or used as the sole basis for policy decisions. Always consult multiple sources and official intelligence assessments.
Author
Developed for personal use by Middle East regional analysts.
License
This project is intended for internal analytical use. Contact the author before any external distribution.

Last Updated: December 29, 2025
