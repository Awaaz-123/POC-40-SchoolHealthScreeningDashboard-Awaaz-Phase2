# User Acceptance Testing (UAT) Checklist - School Health Screening Dashboard

**PoC ID**: 40  
**PoC Title**: School Health Screening Dashboard  
**Status**: **100% PASS**  
**Date**: July 22, 2026

---

## 📋 Functional Verification Checklist

| Test Case ID | Test Case | Expected Result | Actual Result / Evidence | Status |
| :--- | :--- | :--- | :--- | :--- |
| **UAT-001** | **The Handshake (Region Select)** | Clicking a regional completion gauge updates the sidebar metrics, "Why This Matters" description, and "Who Controls the Rail" power dynamics context. | Sidebar metrics and text panels dynamically update to show region-specific screening stats and governance friction. | **PASS** |
| **UAT-002** | **Filter Logic (Region Toggle)** | Selecting "ALL REGIONS" or a specific region (e.g. Dubai, Riyadh, Abu Dhabi) filters the school ranking table and funnel statistics. | School ranking table updates to display only schools within the selected region. | **PASS** |
| **UAT-003** | **Filter Logic (Min Completion Slider)** | Dragging the minimum completion rate % slider filters out schools below that threshold. | TanStack Table updates instantly to show only compliant schools meeting the threshold. | **PASS** |
| **UAT-004** | **TanStack Table Sorting** | Clicking table headers (School Name, Screening %, Referral %, Follow-Up %) sorts the rows ascending or descending. | Table rows reorder instantly with sort direction arrows. | **PASS** |
| **UAT-005** | **TanStack Table Global Search** | Typing in the school/region search box filters table rows in real time. | Matching school records are filtered dynamically. | **PASS** |
| **UAT-006** | **Mock Fallback Resilience** | Disconnect or stop the backend FastAPI server and reload the page. | Application seamlessly switches to local frontend mock data, showing a "Fallback mode" badge without crashing. | **PASS** |
| **UAT-007** | **Data Exporter Check** | Click "CSV DATA" or "JSON DATA" buttons in the sidebar. | Browser downloads `school_health_screening_data.csv` or `school_health_screening_data.json`. | **PASS** |
| **UAT-008** | **Production Build Verification** | Run `npm run lint` and `npm run build` in the frontend. | Production build compiles with 0 errors. | **PASS** |
