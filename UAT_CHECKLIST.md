# User Acceptance Testing (UAT) Checklist - School Health Screening Dashboard

**Program**: Infocreon Internship (PoC #40)  
**Developer**: Awaaz Muhammed ([@Awaaz-123](https://github.com/Awaaz-123))  
**PoC ID**: 40  
**PoC Title**: School Health Screening Dashboard  
**Status**: **100% PASS**  

---

## 📋 Functional Verification Checklist

| Test Case ID | Test Case | Expected Result | Actual Result / Evidence | Status |
| :--- | :--- | :--- | :--- | :--- |
| **UAT-001** | **Click & Open Intelligence Layer** | Clicking the "INTELLIGENCE LAYER" button in the header slides open the right-side panel with backdrop blur. | Intelligence Layer panel slides open smoothly with close button, metrics, governance panels, and data exporters. | **PASS** |
| **UAT-002** | **100% Main Stage Layout** | Closing the Intelligence Layer restores the main dashboard to 100% full screen width. | Gauges, referral funnels, flag bars, and TanStack Table scale to 100% screen width seamlessly. | **PASS** |
| **UAT-003** | **Developer Signature Display** | Developer signature is displayed prominently in the header bar, footer, and Intelligence Layer drawer. | Shows `Developed by Awaaz Muhammed | GitHub: @Awaaz-123 | Infocreon Internship` across viewports. | **PASS** |
| **UAT-004** | **Filter Logic (Region Toggle)** | Selecting "ALL REGIONS" or a specific region (e.g. Dubai, Riyadh, Abu Dhabi) filters the school ranking table and funnel statistics. | School ranking table and Intelligence Layer panels update to display region-specific statistics. | **PASS** |
| **UAT-005** | **Filter Logic (Min Completion Slider)** | Dragging the minimum completion rate % slider filters out schools below that threshold. | TanStack Table updates instantly to show only compliant schools meeting the threshold. | **PASS** |
| **UAT-006** | **TanStack Table Sorting & Search** | Clicking headers or typing in the search box filters and sorts table rows in real time. | Table rows reorder and filter dynamically with zero latency. | **PASS** |
| **UAT-007** | **Data Exporter Check** | Clicking "CSV DATA" or "JSON DATA" buttons in the Intelligence Layer downloads raw data files. | Browser downloads `school_health_screening_data.csv` or `school_health_screening_data.json`. | **PASS** |
| **UAT-008** | **Production Build Verification** | Run `npm run lint` and `npm run build` in the frontend. | Production build compiles with 0 errors. | **PASS** |
