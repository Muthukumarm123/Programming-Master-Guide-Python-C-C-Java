# The Complete Programming Knowledge Base (CodeCraft)

> A modern, comprehensive programming textbook and structured learning platform covering **Python**, **Streamlit**, **Python Backend (Flask, Django, FastAPI)**, **Java**, **C**, **C++**, and **Cybersecurity**.

---

## 📖 Overview

**CodeCraft Knowledge Base** is designed from the ground up as an educational programming textbook and reference platform. Rather than brief snippet collections or shallow dashboard cards, it delivers in-depth conceptual explanations, memory models, runtime mechanics, syntax rules, formatted code examples, common mistakes, and conceptual review questions.

### Core Principles
- **True Webpage Content**: Educational material is written as structured webpage content (headings, paragraphs, comparison tables, definitions)—never buried inside code comments or single-line captions.
- **Universal Lesson Template**: Every lesson follows a strict, repeatable standard featuring Introduction, Prerequisites, Objectives, Formal & Beginner Definitions, Multi-Paragraph Explanations, Syntax & Rules, Syntax-Highlighted Code, Outside-the-Code Walkthroughs, Expected Terminal Output, Common Mistakes & Fixes, Cross-Language Comparisons, In-Lesson Knowledge Checks, and End-of-Topic Conceptual Review Questions.
- **No Labs / No Fake Dashboards**: Pure educational focus on comprehension, reference, and genuine understanding.
- **Privacy & Local Persistence**: Learning progress, completed lessons, and bookmarks persist in `localStorage` with full JSON export and import capabilities—zero tracking or telemetry.

---

## 🗺️ Master Curriculum Pathways

### 1. Python & Web Development
Follows a strict, ordered pedagogical progression:
1. **Interactive Python & DataLumina Workflow**: REPL interactive execution, cell-based development, persistent kernel state in RAM, execution order hazards, missing variable `NameError`, and session restarts versus standalone script execution.
2. **Python Syntax, Variables & Mutability**: Dynamic typing, references as names, value equality (`==`) vs identity (`is`), and mutable collections vs immutable scalars.
3. **Streamlit Web Application Development**: Reactive top-to-bottom script execution cycle, UI widgets (sliders, metrics, dataframes, sidebars, multi-column layouts), session state (`st.session_state`), and caching (`@st.cache_data`).
4. **Python Backend Engineering**:
   - *Web Foundations*: 3-tier architecture, HTTP/HTTPS request/response packets, headers, REST resource naming, status codes, and statelessness.
   - *Flask Comprehensive Tutorial*: WSGI microframework architecture, Application Factory pattern (`create_app`), modular Blueprints, typed path converters, and structured JSON error handlers.
   - *Django Comprehensive Tutorial*: Batteries-included MVT architecture, Django ORM relational queries (`select_related` to eliminate N+1 queries), migrations, Django Admin, and CSRF protection.
   - *FastAPI Comprehensive Tutorial*: Asynchronous ASGI architecture (Uvicorn), Pydantic schemas, type hints, dependency injection (`Depends`), and automatic OpenAPI/Swagger UI generation.

### 2. Java & Enterprise Architecture
1. **JVM Architecture & Compilation**: The compilation pipeline (`javac` to `.class` bytecode to JIT compiler), Heap vs Thread Stack vs Metaspace memory layout, and runtime memory diagnostics.
2. **Spring Boot Enterprise Backend**: 3-layer enterprise architecture (`@RestController`, `@Service`, `@Repository`), Constructor Dependency Injection, and Spring Data JPA.

### 3. C & Systems Programming
1. **The C Build Pipeline**: Preprocessing, compilation, assembly, and linking with GCC and Clang; header guards (`#ifndef`) and compiler warning flags (`-Wall -Wextra -pedantic`).
2. **Pointers & Memory Architecture Deep Dive**: Contiguous byte-addressable RAM, address-of (`&`), dereference (`*`), pointer arithmetic scaled by data type width, array decay, and double pointers (`int **`).
3. **Memory Safety & C Cybersecurity**: Call stack frame anatomy, stack buffer overflows, return address corruption, stack canaries (`-fstack-protector`), ASLR, AddressSanitizer (`-fsanitize=address`), and replacing unsafe functions (`gets`, `strcpy`, `sprintf`) with safe bounded alternatives.

### 4. Modern C++ & High Performance
1. **RAII & Resource Management**: Resource Acquisition Is Initialization (RAII), deterministic destructor execution on scope exit, `std::unique_ptr`, `std::shared_ptr`, and move semantics (`std::move`).
2. **C vs C++ Comprehensive Architectural Comparison**: Deep comparative analysis of type systems, ABI stability, memory models, zero-overhead abstractions, and why operating system kernels like Linux remain in pure C.

### 5. Cybersecurity & Defensive Engineering
1. **Defensive Foundations**: The CIA triad, authorized testing boundaries, threat modeling, salted adaptive password hashing (`bcrypt`), and constant-time token comparison (`hmac.compare_digest`) against timing side-channel attacks.

---

## 🛠️ Environment Setup Centre

The platform includes a dedicated, interactive cross-platform Environment Setup Centre with an OS switcher for **Windows**, **Linux**, and **macOS**:

- **Python 3.12+ & VS Code**: PATH setup, interpreter selection, extensions.
- **Interactive Python**: IPython and VS Code Jupyter cell configuration (`# %%`).
- **Streamlit**: Virtual environment setup and local server configuration.
- **Python Backend**: Installing Flask, Django, and FastAPI with Uvicorn.
- **Java JDK 21 LTS**: Eclipse Temurin / OpenJDK 21 LTS, `JAVA_HOME` configuration, and IntelliJ / VS Code integration.
- **C Compiler (GCC & Clang)**: MinGW-w64 via MSYS2 UCRT64 on Windows, `build-essential` on Linux, Xcode Command Line Tools on macOS.
- **Modern C++ (g++, clang++, MSVC)**: C++20 standard flags (`-std=c++20`), MSVC setup via Visual Studio Community, and VS Code `c_cpp_properties.json`.
- **Build Tools & Debuggers**: Make, CMake 3.25+, GDB, and LLDB.

---

## 📚 Features

- **Searchable Glossary**: Over 30+ precision computer science definitions with beginner analogies, language applicability tags, code snippets, related terms, and direct lesson links.
- **Quick Search (Cmd+K / Ctrl+K)**: Instant modal search across all lessons, glossary terms, roadmap milestones, and environment setup guides.
- **Adjustable Textbook Typography**: One-click font sizing (Compact, Standard, Large) tailored for long study sessions.
- **Dark / Light Mode**: High-contrast, accessible themes complying with WCAG AA guidelines.
- **Progress Export & Restore**: Download your progress as a `.json` backup file or import it onto another computer.

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (bundled with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/codecraft-programming-knowledge-base.git
   cd codecraft-programming-knowledge-base
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Typecheck & Lint:**
   ```bash
   npm run lint
   ```

---

## 🏗️ Project Architecture

```
├── index.html                   # HTML entry point with Plus Jakarta Sans & JetBrains Mono
├── package.json                 # Project dependencies & build scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
├── src/
│   ├── main.tsx                 # React DOM mount entry
│   ├── App.tsx                  # Main router & layout shell
│   ├── index.css                # Tailwind v4 theme & global typography
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces for Lessons, Glossary, Setup Guides
│   ├── context/
│   │   └── LearningContext.tsx  # React Context for progress, bookmarks, font size, theme
│   ├── data/
│   │   ├── allLessons.ts        # Unified curriculum export & lookup utilities
│   │   ├── glossaryData.ts      # 30+ computer science definitions & code snippets
│   │   ├── roadmapData.ts       # Master programming roadmap graph nodes
│   │   ├── setupGuidesData.ts   # Dedicated C, C++, Java, Python setup guides
│   │   └── courses/
│   │       ├── pythonCurriculum.ts # DataLumina, Fundamentals, Streamlit, Flask, Django, FastAPI
│   │       ├── javaCurriculum.ts   # JVM internals, bytecode, Spring Boot REST APIs
│   │       ├── cCurriculum.ts      # Compilation pipeline, Pointers & Memory deep dive
│   │       ├── cppCurriculum.ts    # Modern C++ RAII, Smart Pointers, C vs C++
│   │       └── cyberCurriculum.ts  # CIA Triad, C Buffer Overflows, Cryptographic Hashing
│   ├── components/
│   │   ├── Navbar.tsx           # 3-zone Top Bar Contract (Wordmark, Nav Links, Tools)
│   │   ├── Sidebar.tsx          # Collapsible pathway modules & lesson tree
│   │   ├── DashboardView.tsx    # Homepage with continue learning & pathway showcases
│   │   ├── LessonView.tsx       # Universal Lesson Template reader
│   │   ├── RoadmapView.tsx      # Master visual programming roadmap
│   │   ├── GlossaryView.tsx     # Central searchable glossary
│   │   ├── SetupCentreView.tsx  # Cross-platform environment setup centre (OS switcher)
│   │   ├── SearchModal.tsx      # Fast Cmd+K search modal
│   │   ├── CodeBlock.tsx        # Syntax-styled code block with copy button
│   │   ├── ExpectedOutput.tsx   # Formatted execution terminal preview
│   │   ├── KnowledgeCheck.tsx   # Interactive in-lesson quiz questions
│   │   └── QuestionSection.tsx  # End-of-topic conceptual progression questions
│   └── assets/
│       └── images/              # Educational textbook architecture diagrams
```

---

## 🚢 Deployment

### Deploy to GitHub Pages
1. Build the application: `npm run build`
2. Push the `dist/` directory or configure a GitHub Actions workflow using `.github/workflows/deploy.yml` with the official `actions/deploy-pages` action.

### Deploy to Vercel / Netlify / Cloud Run
The project is a standard Vite React SPA:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18+

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
