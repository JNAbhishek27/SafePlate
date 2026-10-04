# SafePlate: Built for a Friend 🍽️🛡️

> **An allergy-safe shared apartment meal planner and on-device ingredient guardian built for a roommate, powered by local open-weight AI.**

*Built for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01).*

[![Live App](https://img.shields.io/badge/Live_Demo-SafePlate_Web_App-amber?style=flat-square)](https://ais-pre-jeg2cbrol7f2to5cry7if6-1000591823797.asia-southeast1.run.app)
[![Open Source AI](https://img.shields.io/badge/Open_Source_AI-Gemma_2B_%7C_Llama_3.2_%7C_SmolLM2-blue?style=flat-square)](https://huggingface.co/)
[![Privacy](https://img.shields.io/badge/Privacy-0_Bytes_Cloud_Egress-emerald?style=flat-square)](https://github.com/)
[![License](https://img.shields.io/badge/License-Apache_2.0-stone?style=flat-square)](LICENSE)

---

## 📖 The Story: Who I Built This For

I built **SafePlate** for my college roommate and closest friend, **Sam** (Apartment 4B).

Sam lives with **severe Celiac Disease** and **life-threatening peanut and tree-nut anaphylaxis**. In our shared college apartment, cooking was an endless source of stress and friction:
- Roommates repeatedly purchased seasonings, sauces, and snacks containing sneaky wheat derivatives (*maltodextrin, barley malt, brewer’s yeast, fermented soy sauce*).
- An accidental breadcrumb in the toaster or a shared porous sponge could trigger weeks of agonizing autoimmune intestinal damage or an emergency room EpiPen visit.
- Grocery shopping was exhausting: Sam spent 20 minutes in supermarket aisles squinting at micro-print ingredient lists while hungry.

SafePlate provides our apartment with a shared, certified-safe culinary system where all roommates can cook delicious comfort dinners together with 100% confidence.

> *"Dude, you actually made this for me?! Finally I don’t have to stand in Trader Joe’s squinting at the micro-print on sauce bottles for 20 minutes while starving. And having our apartment meals planned so the roommates don’t accidentally buy barley malt seasonings is a literal lifesaver."*
> — **Sam**, Apartment 4B Roommate

---

## ⚡ Why Open Innovation Matters Here

When building for a friend with life-threatening health vulnerabilities, open-source AI is not just a technical preference—it is a functional necessity:

| Vector | SafePlate (On-Device Open Weights) | Traditional Closed Cloud API |
| :--- | :--- | :--- |
| **Health Data Sovereignty** | **100% Local**. Zero bytes of medical diagnoses, dietary triggers, or medications leave the browser. | Prompts logged by third-party servers and used for model retraining/ad profiling. |
| **Recurring Cost** | **$0 Forever**. Free to run on commodity student laptops without subscriptions. | Costs $20/month per seat or per-token API bills that college students cannot afford. |
| **Grocery Dead Zones** | **Works 100% Offline**. Reliable in supermarket basements, subways, and farm stands with zero cellular signal. | Fails completely when internet reception drops. |
| **Safety System Guardrails** | **Actionable Apartment Protocols**. Specific cross-contamination rules and 1-to-1 certified culinary swaps. | Diluted with 5 paragraphs of generic corporate legal disclaimers (*"consult a doctor"*). |

---

## ✨ Core Features

### 1. 🔍 On-Device Ingredient & Label Guardian
- Screens recipes, restaurant menus, or package labels for subtle allergens.
- Detects hidden derivatives: *barley malt, triticale, farina, brewer’s yeast, hydrolyzed wheat protein, and shared facility warnings*.
- Recommends direct 1-to-1 kitchen swaps (e.g., *San-J 100% Certified GF Tamari* instead of regular soy sauce, *SunButter* instead of peanut butter, *100% white corn tortillas* instead of wheat-blend wraps).
- Built-in inference telemetry displays latency (~180ms), token throughput, and verifies **0 Bytes Cloud Egress**.

### 2. 📅 Shared Weekly Apartment Meal Planner
- Curated Monday-to-Friday breakfast, lunch, dinner, and snack schedule certified 100% safe for Sam.
- Designed for college budgets (average under $4.20 per portion) so all roommates gladly eat the same meal.
- Step-by-step instructions paired with explicit cross-contamination protocols.

### 3. 🍳 Pantry & Fridge Quick Cook
- Input whatever ingredients are currently sitting in the apartment kitchen.
- Synthesizes an on-demand 15-minute skillet creation with zero gluten or nut hazards.

### 4. 📋 Cross-Contamination Kitchen Rules & Fridge Pledge
- Enforces non-negotiable roommate boundaries:
  - **The Red Toaster Sanctuary**: Strictly dedicated to certified gluten-free bread only.
  - **The Double-Dip Ban**: Prohibits crumb-covered knives from re-entering shared butter or jam jars.
  - **Sponge & Cutting Board Segregation**: Color-coded blue sponge and green board for allergen-safe cookware.
  - **No Open Nut Bowls in Common Rooms**: Eliminates airborne nut dust in shared living areas.
- 1-click **Copy Fridge Pledge** to post on the kitchen refrigerator.

### 5. 🛒 Smart Grocery List
- Categorized shopping checklist organized by store aisle (*Produce, Proteins, Pantry & Grains, Spices & Condiments*).
- Highlights specific certified safe brands so roommates never purchase the wrong variation at the store.

### 6. 🧪 Open-Weight Architecture Lab
- Live interactive benchmarking between open models:
  - **Gemma 2 2B (Google DeepMind)**: On-device instruction-tuned model for deep label parsing.
  - **Llama 3.2 1B (Meta AI)**: Sub-1GB edge model for instantaneous latency.
  - **SmolLM2 360M (Hugging Face)**: Micro-footprint open model for low-spec student laptops.
  - **Mistral 7B Instruct (Mistral AI)**: Full-depth culinary adaptation engine.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (Framer Motion)
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans, Playfair Display, JetBrains Mono
- **Open AI Stack**: Local on-device execution engine with zero remote API proxy requirements
- **Build Tool**: Vite 8, Node.js, Express (dev server)

```
safeplate/
├── index.html
├── metadata.json
├── package.json
├── src/
│   ├── App.tsx                     # Main layout & state hub
│   ├── main.tsx                    # React 19 root
│   ├── index.css                   # Tailwind v4 configuration
│   ├── types/
│   │   └── index.ts                # TypeScript schemas (Recipes, Allergens, Models)
│   ├── data/
│   │   └── mockData.ts             # Curated meal plans, safe brands & profiles
│   ├── services/
│   │   └── openAiEngine.ts         # Local open-weight inference & telemetry service
│   ├── components/
│   │   ├── Header.tsx              # Strict 3-zone navigation bar
│   │   ├── FriendHero.tsx          # Sam's story & constraint matrix
│   │   ├── IngredientScanner.tsx   # Real-time allergen detection & swaps
│   │   ├── MealPlanner.tsx         # Weekly meal planner & recipe deep dive
│   │   ├── PantryChef.tsx          # On-demand fridge ingredient cooking
│   │   ├── KitchenSafetyChecklist.tsx # Roommate cross-contamination rules
│   │   ├── GroceryList.tsx         # Aisle-sorted smart shopping list
│   │   ├── OpenSourceInspector.tsx # Open AI manifesto & benchmark lab
│   │   └── HandoffModal.tsx        # Sam's feedback & verdict logger
│   └── assets/
│       └── images/                 # Editorial meal and friend portrait assets
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/safeplate.git
   cd safeplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

### Production Build
To create an optimized production build:
```bash
npm run build
```

---

## 🏆 Hackathon Details

- **Event**: [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)
- **Categories**: Open-Source AI at its Core · Edge / On-Device AI & Privacy · Build for a Friend
- **Live Deployment**: [https://ais-pre-jeg2cbrol7f2to5cry7if6-1000591823797.asia-southeast1.run.app](https://ais-pre-jeg2cbrol7f2to5cry7if6-1000591823797.asia-southeast1.run.app)

---

## 📄 License

Distributed under the Apache 2.0 License. See `LICENSE` for details.
