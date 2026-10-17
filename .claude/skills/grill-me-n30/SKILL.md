---
name: grill-me-n30
description: Antigravity-optimized deep discovery and decision stress-testing skill. Relentlessly interviews the user one question at a time about an architecture, project plan, product feature, or technical design, checkpointing every answer to disk in brainstorms/ so nothing is lost. Trigger when the user mentions "grill me", "grill me n30", "grill-me", "grill-me n30", "stress-test this plan", "discovery session", or asks to brainstorm and challenge their ideas.
---

# Grill Me N30 (Antigravity Edition)

Relentlessly interview the user about every dimension of their plan, design, or architecture until shared clarity is reached. Walk methodically down each branch of the decision tree, resolving dependencies one by one. The prime directive is: **extract what is inside the user's head into a durable, structured markdown file in `brainstorms/` so zero context is lost as conversations grow.**

---

## The Prime Law: Checkpoint to Disk First

Conversation context is ephemeral and fills up quickly. Holding answers only in conversation memory leads to degraded recall and lost details.
Therefore, **checkpoint to disk after EVERY SINGLE user response**. The file on disk is the immutable single source of truth. Never wait for the user to ask you to save.

---

## 1. Setup Phase (Execute BEFORE Asking Q1)

1. **Determine Topic & Date**:
   - Extract the topic slug from context (e.g. `auth-flow`, `database-schema`, `telegram-bot`, `landing-page`). If unspecified, use `discovery-session`.
   - Get the current date in `YYYY-MM-DD` format (using environment time or PowerShell `Get-Date -Format yyyy-MM-dd`).
   - Define capture path: `brainstorms/{YYYY-MM-DD}-{topic-slug}.md`. (If that file already exists, append a timestamp like `-{HHmm}`).

2. **Initialize Capture File**:
   - Use file tools to create `brainstorms/{YYYY-MM-DD}-{topic-slug}.md` immediately with the initial structure:
     - Title, Date, Status (`In Progress`), Goal, and initial empty sections for `Summary / Key Decisions`, `Q&A Log`, and `Open Flags`.

3. **Announce and Launch**:
   - Inform the user in **one short sentence** with a clickable file link (using `file:///` format):
     > *"📝 Discovery sessiyasi boshlandi. Qaydlar saqlanmoqda: [`{YYYY-MM-DD}-{topic-slug}.md`](file:///c:/Users/Hp/Desktop/n30web/brainstorms/{YYYY-MM-DD}-{topic-slug}.md)"*
   - Immediately present **Question 1 (Q1)** with your recommended answer.

---

## 2. Checkpoint Protocol (Non-Negotiable)

After **EVERY** user response, and **BEFORE** asking the next question:

1. **Immediate Write**:
   - Update `brainstorms/{YYYY-MM-DD}-{topic-slug}.md`:
     - Record the question, the user's decision / raw answer (preserve exact phrasing where intent is specific), and any newly revealed constraints or flags.
     - Update the running `Summary / Key Decisions` section at the top of the file.
     - If the user modified an earlier decision, update the summary and mark the previous entry as superseded so reasoning remains traceable.
2. **Verification**:
   - Ensure the disk write succeeded before formulating the next query.
3. **Only then formulate Question N+1**.

---

## 3. Antigravity Interview Methodology

- **One Question at a Time**:
  - Never overwhelm the user with multiple questions in a single message. Focus on one specific decision point at a time.
- **Provide Recommended Answer (Option Bias)**:
  - For every question, always offer your best technical or architectural recommendation (e.g. *"Mening tavsiyam: PostgreSQL + Supabase, chunki..."*). This allows the user to simply confirm (*"Ha"*, *"Roziman"*), modify, or redirect without cognitive fatigue.
- **Use Antigravity Interactive Tools When Beneficial**:
  - When a question involves 2–4 clear distinct architectural paths, you may use Antigravity's `ask_question` tool for interactive choice selection, or format concise numbered options in markdown.
- **Inspect Codebase First (Zero Redundancy)**:
  - If a question can be answered by inspecting files in `n30web`, inspect them yourself! Do not ask the user questions whose answers are already in the code or workspace files.
- **Order of Dependencies**:
  - Resolve upstream decisions first before tackling downstream implementation details (e.g., clarify data model and auth before choosing UI animation libraries).
- **Handle Unknowns Gracefully**:
  - If the user cannot answer or is unsure, flag it in the `Open Flags` section with an assigned owner/timeline and immediately move to the next branch. Do not stall.
- **Visual Synthesis with Mermaid**:
  - As workflows, system architectures, or state transitions become clear, generate clean Mermaid diagrams (`flowchart TD`, `sequenceDiagram`, `stateDiagram-v2`) inside the brainstorm markdown file.

---

## 4. Capture File Template

```markdown
# {Topic}: Brainstorm & Discovery Notes
- **Date**: {YYYY-MM-DD}
- **Status**: In Progress | Completed
- **Goal**: {One sentence summary of what we are deciding}

---

## 📌 Executive Summary & Key Decisions
*(Doimiy yangilanib boruvchi umumiy xulosa va qabul qilingan qarorlar)*

- **Arxitektura**: ...
- **Stack / Texnologiyalar**: ...
- **Asosiy qoidalar**: ...

```mermaid
flowchart TD
    A[Start / Kirish] --> B[Asosiy mantiq]
    B --> C[Natija]
```

---

## 💬 Q&A Log

### Q1 — {Mavzu / Komponent}
- **Berilgan savol**: {Savol matni}
- **Tavsiya qilingan variant**: {Agent tavsiyasi}
- **Qabul qilingan qaror**: {Foydalanuvchi javobi va kelishilgan qaror}
- **Status**: Tasdiqlangan

---

## 🚩 Ochiq savollar va keyingi qadamlar (Open Flags)
- [ ] {Hali hal qilinmagan masala} -> Mas'ul: {User / Keyingi bosqich}
```

---

## 5. Session Wrap-Up

When all decision branches have been explored, or when the user says "bo'ldi", "tugatdik", or "yetarli":

1. Perform a final consistency check on the capture file to reconcile any contradictions.
2. Mark the status as `Completed` in the file.
3. Provide a concise wrap-up in chat:
   - Clickable link to the final brainstorm note: [`{filename}.md`](file:///c:/Users/Hp/Desktop/n30web/brainstorms/{filename}.md)
   - 3–5 bullet point summary of core decisions reached.
   - List of any remaining Open Flags.
   - Suggested next actionable step (e.g. creating the implementation plan or starting code scaffolding).
