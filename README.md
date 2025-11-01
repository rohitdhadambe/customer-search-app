# Customer Search Application

## Overview

This application is a configuration-driven customer search tool built using React, TypeScript, and shadcn/ui. The core principle is that all fields in the search form and all columns in the results table are defined via external configuration objects, requiring **zero code changes** to the component logic when adding or modifying fields.

---

## 🚀 Setup and Running the Application

1.  **Clone the repository:**
    ```bash
    git clone [URL]
    cd customer-search-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # Ensure json-server is globally installed if it is your first time:
    # npm install -g json-server
    ```

3.  **Start Mock API (JSON Server):**
    Open a dedicated terminal window and run:
    ```bash
    json-server --watch db.json --port 3001
    ```
    The API will be available at `http://localhost:3001/customers`.

4.  **Start Frontend:**
    Open another terminal window and run:
    ```bash
    npm run dev
    ```

---

## ⚙️ Configuration-Driven Approach (Evaluation Focus)

The entire UI is driven by two maps defined in `src/config/appConfig.ts`.

### 1. Dynamic Form Rendering (`searchConfig`)

* The `GenericSearchForm` iterates over the `searchConfig` object.
* The `renderOrder` property dictates the placement of the field.
* The **`uiType`** property (`input`, `date-picker`, etc.) tells the `FieldRenderer` component which generic shadcn/ui component to display.
* **Decoupling:** The form components have no hardcoded references to field names like `firstName` or `dateOfBirth`.

### 2. Dynamic Results Display (`resultsConfig`)

* The `SearchResultsDisplay` iterates over `resultsConfig` to generate table columns dynamically.
* The **`extractionType`** property (`simple`, `fullName`, `primaryPhone`, `primaryEmail`) tells the data utility function (`src/lib/dataExtractors.ts`) **how to retrieve the value**. This handles complex scenarios like finding the primary email from a nested array.

### 💡 How to Add a New Search Field (e.g., "middleName")

To add a search field for `middleName`, only **one** file modification is required:

1.  **Update `src/config/appConfig.ts`:** Add the new entry to `searchConfig`:

    ```typescript
    // ... inside searchConfig
    middleName: {
      key: 'middleName', 
      label: 'Middle Name',
      uiType: 'input', 
      renderOrder: 1.5, // Positions it between firstName (1) and lastName (2)
    },
    ```

2.  *(Optional but recommended):* Add the `middleName` property to the `Customer` interface and update `db.json`.

---

## ⚖️ Trade-offs and Design Decisions

* **Case-Insensitive Search:** We used JSON Server's `_like` operator (e.g., `firstName_like`) in the `useCustomerSearch` hook to enable case-insensitive searching on text fields, improving user experience.
* **Date Handling:** We wrapped the default HTML `type="date"` input for the `dateOfBirth` field for simplicity, combined with a separate date formatting utility in the results display to ensure clean output (e.g., `MM/DD/YYYY`).
* **Strict Typing:** We utilized `import type` and generic types like `UseFormReturn<Record<string, string>>` extensively to ensure code stability and maintain strict TypeScript discipline, which significantly aids future maintenance.

---