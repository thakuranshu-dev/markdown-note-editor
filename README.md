# MARKDOWN-NOTE-EDITOR

Capture thoughts effortlessly, transform ideas into notes.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Mathematical Expressions](#mathematical-expressions)
- [Diagrams & Charts](#diagrams--charts)

---

## Overview

**markdown-note-editor** is a powerful, React-based application designed for seamless markdown note-taking and management. It combines intuitive design with robust functionality, making it the perfect tool for developers and writers who want to manage their notes effortlessly.

---

## Features

- ✏️ **Real-time Markdown Editing:** Create and edit notes instantly with immediate feedback.
- 💾 **Local Storage Integration:** Save your notes directly to local storage for easy access and preservation.
- 🖥️ **User-friendly Interface:** Enjoy a clear separation between editing and viewing notes for enhanced usability.
- 🎨 **Responsive Design:** Built with Tailwind CSS for a visually appealing experience across all devices.
- 🔍 **Linting and Best Practices:** Integrated ESLint configuration ensures high code quality and maintainability.
- ⚡ **Hot Module Replacement (HMR):** Experience faster development with live updates without full page reloads.
- ⬇ **Export/Download note:** You can export/download your notes as ```.md``` or ```.html``` by double-clicking or long-pressing the note.
- 📐 **Mathematical Expressions:** Write complex equations using KaTeX syntax for inline and block mathematical notation.
- 📊 **Diagrams & Charts:** Create diagrams using Mermaid syntax directly in your markdown notes.

---

## Built With

- **JavaScript**
- **React**
- **Vite**
- **npm**
- **ESLint**
- **Tailwind CSS**
- **Markdown**
- **JSON**

---

## Getting Started

### Prerequisites

- **Programming Language:** JavaScript
- **Environment:** Node.js
- **Package Manager:** npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/thakuranshu-dev/markdown-docs-editor
   ```

2. **Navigate to the project directory:**
   ```sh
   cd markdown-docs-editor
   ```

3. **Install dependencies:**
   ```sh
   npm install
   ```

### Usage

To start the project locally:

```sh
npm start
```

---

## Mathematical Expressions

This editor supports **KaTeX** for rendering mathematical expressions. You can write both inline and block-level equations using LaTeX syntax.

### Inline Math

Wrap expressions with single `$` symbols for inline math:

```markdown
The quadratic formula is $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.
```

Renders as: The quadratic formula is $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.

### Block Math

Wrap expressions with double `$$` symbols for block-level equations:

```markdown
$$
E = mc^2
$$
```

Renders as:
$$E = mc^2$$

### Advanced Examples

#### Calculus

```markdown
$$
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
$$
```

#### Linear Algebra

```markdown
$$
\begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} ax + by \\ cx + dy \end{pmatrix}
$$
```

#### Statistics

```markdown
$$
\sigma = \sqrt{\frac{1}{N}\sum_{i=1}^{N}(x_i - \mu)^2}
$$
```

---

## Diagrams & Charts

This editor supports **Mermaid** for creating diagrams, flowcharts, sequence diagrams, and other visual representations directly in your notes.

### Flowchart Example

```markdown
​```mermaid
flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]
​```
```

### Sequence Diagram Example

```markdown
​```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    
    User->>Browser: Click button
    Browser->>Server: Send request
    Server->>Server: Process data
    Server-->>Browser: Send response
    Browser-->>User: Display result
​```
```

### Gantt Chart Example

```markdown
​```mermaid
gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    
    section Development
    Design           :des1, 2024-01-01, 30d
    Implementation   :impl1, after des1, 45d
    Testing          :test1, after impl1, 20d
    
    section Deployment
    Staging          :stag1, after test1, 10d
    Production       :prod1, after stag1, 5d
​```
```

### Pie Chart Example

```markdown
​```mermaid
pie title Browser Market Share
    "Chrome" : 63.5
    "Safari" : 23.8
    "Firefox" : 10.2
    "Others" : 2.5
​```
```

### State Diagram Example

```markdown
​```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Running: Start
    Running --> Paused: Pause
    Paused --> Running: Resume
    Running --> Idle: Stop
    Idle --> [*]
​```
```

---

## Try this out at [Markdown Docs Editor](https://markdown-docs-editor.netlify.app/)

## License

This project is unlicensed.

---

**Capture your ideas. Organize your thoughts. Write with markdown-docs-editor.**
