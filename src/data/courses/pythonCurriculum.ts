import { Lesson } from '../../types';

export const PYTHON_LESSONS: Lesson[] = [
  // --- LESSON 1: INTERACTIVE PYTHON (DATALUMINA REFERENCE) ---
  {
    id: 'py-intro-datalumina',
    slug: 'interactive-python-and-datalumina-workflow',
    title: 'Interactive Python & The DataLumina Workflow',
    languageId: 'python',
    moduleId: 'py-mod-intro',
    moduleTitle: 'Module 1: Introduction, Environment & Interactive Python',
    order: 1,
    estimatedMinutes: 25,
    prerequisites: ['Basic familiarity with computer file systems and terminals'],
    learningObjectives: [
      'Understand what interactive Python is and how it differs fundamentally from running complete scripts',
      'Explain how variables and memory state persist between interactive cell or REPL executions',
      'Analyze why cell execution order matters and how non-linear execution triggers NameError or stale state bugs',
      'Inspect results and trace error messages in an interactive session',
      'Understand when and why to restart the interactive session kernel to recover a clean state',
    ],
    introduction: {
      whatIsIt: 'Interactive Python is an execution workflow where you enter, evaluate, and inspect individual statements or blocks of Python code immediately, without running an entire program from start to finish each time. It is powered by read-eval-print loops (REPLs), IPython, and interactive editor windows.',
      whyItMatters: 'Traditional script execution forces you to reload data files, re-instantiate models, and rerun all earlier calculations whenever you change a single line. Interactive programming lets you keep large datasets and variables in memory, drastically accelerating debugging, data exploration, and algorithmic prototyping.',
      whereItFitsInRoadmap: 'This is the mandatory first milestone in the Python curriculum. Before writing full production modules, web apps, or backend servers, you must understand how Python evaluates statements and stores state in memory.',
    },
    definitions: [
      {
        term: 'Interactive Python',
        definition: 'An execution paradigm where the programmer enters code in discrete chunks and the interpreter parses, executes, and retains results immediately in an active runtime process.',
        beginnerExplanation: 'Like cooking while tasting the sauce spoonful by spoonful, rather than baking a cake for three hours only to discover you forgot the salt.',
        relatedTerm: 'REPL',
      },
      {
        term: 'REPL (Read-Eval-Print Loop)',
        definition: 'A simple interactive programming environment that reads a single user statement, evaluates it, prints the result to the console, and loops back to await the next statement.',
        beginnerExplanation: 'A two-way conversational terminal with Python: you speak one line, Python replies with the result, and awaits your next command.',
        relatedTerm: 'Interpreter',
      },
      {
        term: 'Persistent State',
        definition: 'The retention of variables, loaded libraries, and defined functions in RAM across subsequent interactive code block executions within the same active session.',
        beginnerExplanation: 'If you set `x = 42` in cell 1, `x` remains equal to 42 for cell 2, cell 3, and any subsequent code you run, until you reset the session.',
        relatedTerm: 'Session State',
      },
      {
        term: 'Kernel / Interactive Session',
        definition: 'The underlying background CPython process that hosts the interpreter, manages memory allocations, and keeps the program state alive during interactive sessions.',
        beginnerExplanation: 'The background engine that does the actual thinking. Restarting the kernel completely flushes its memory clean.',
        relatedTerm: 'Runtime Environment',
      },
    ],
    detailedSections: [
      {
        heading: 'Interactive Execution vs. Complete Script Execution',
        paragraphs: [
          'When you run a standalone script file (such as `python main.py`), the operating system spins up a new CPython process from scratch. CPython loads the standard library, reads the file from top to bottom, executes every statement sequentially, and immediately terminates the process upon reaching the end or hitting an unhandled error. All variables in RAM are discarded.',
          'In an interactive Python environment (such as an IPython terminal, Jupyter notebook, or VS Code Interactive Window), the CPython process starts once and stays alive continuously. You send discrete lines or cells of code to the running process. The process evaluates your snippet, returns any stdout or return values, and patiently preserves all variable bindings and imported modules in memory.',
        ],
        bulletPoints: [
          'Script Execution: Ephemeral. Starts at line 1, finishes at EOF, tears down memory immediately.',
          'Interactive Execution: Persistent. Keeps state in RAM across individual statements.',
          'State Persistence: Data frames and calculated values remain accessible without reloading.',
        ],
      },
      {
        heading: 'Why Execution Order Matters and The Danger of Non-Linear Runs',
        paragraphs: [
          'Because the interactive kernel retains variables in the order you execute blocks—not necessarily the visual order in which they appear on the screen—you can create invisible bugs. If you write cell 1 (`x = 10`), write cell 2 (`y = x + 5`), then go back and edit cell 1 to `x = 20` but forget to re-run cell 2, `y` still holds 15.',
          'Even worse, if you define a variable `total` in cell 4, run cell 4, and then write cell 3 referencing `total`, cell 3 will execute without complaint because `total` is currently in kernel memory. However, if you or a teammate run the file from top to bottom later, cell 3 will crash with a fatal `NameError: name "total" is not defined`.',
        ],
        callout: {
          type: 'warning',
          title: 'The Out-of-Order Trap',
          content: 'Always verify your code by restarting the kernel and executing all cells sequentially from top to bottom before committing or deploying code.',
        },
      },
      {
        heading: 'Inspecting Results and Interpreting Tracebacks',
        paragraphs: [
          'In standard Python scripts, simply writing an expression like `subtotal * 1.2` on its own line performs the multiplication and silently discards the result unless you explicitly invoke `print()`. In interactive Python, any expression evaluated as the final line of a block automatically displays its representation (`repr`) in the output pane.',
          'When an error occurs interactively, Python prints a traceback showing the exact line of code that triggered the failure, the call stack, and the exception type (such as `TypeError`, `ValueError`, or `ZeroDivisionError`). Unlike script crashes, an interactive error does not terminate your session; all previously created variables remain intact.',
        ],
      },
    ],
    syntaxAndRules: {
      overview: 'Interactive Python syntax adheres to standard Python grammar with the addition of special shell escapes and expression printing conventions.',
      rules: [
        'Expressions placed on the final line of an interactive block automatically display their evaluated result.',
        'Variable names defined in any previously executed block remain accessible globally in the session.',
        'Lines prefixed with % (like %timeit or %reset) are IPython magic commands handled by the interactive shell, not standard Python syntax.',
        'Restarting the kernel invalidates all variables; you must rerun definitions to recreate them.',
      ],
      syntaxSnippet: '# Interactive cell separator in VS Code and modern IDEs:\n# %%\nusername = "Alice"\nbalance = 250.75\n\n# %%\n# The expression below is evaluated and printed without explicit print():\nbalance - 50.0',
    },
    primaryCodeExample: {
      title: 'State Persistence and Error Inspection in Interactive Python',
      language: 'python',
      code: `# --- Interactive Cell 1: Initializing State ---
dataset_name = "server_telemetry_2026.csv"
record_count = 1420
is_active = True

print(f"Loaded: {dataset_name} with {record_count} records.")

# --- Interactive Cell 2: Modifying State ---
# This cell relies directly on state created in Cell 1
record_count += 80  # Increment the persistent variable
processed_ratio = record_count / 2000

# In interactive mode, this final expression result is displayed automatically:
processed_ratio`,
      explanation: 'This code demonstrates how state defined in the first block stays resident in memory, allowing the second block to mutate and compute derived statistics without re-declaring variables.',
      expectedOutput: `Loaded: server_telemetry_2026.csv with 1420 records.
0.75`,
      keyPoints: [
        'Cell 1 creates three variables in kernel RAM: dataset_name, record_count, and is_active.',
        'Cell 2 accesses record_count directly without re-reading or re-initializing it.',
        'The final line processed_ratio outputs 0.75 directly to the interactive display.',
      ],
    },
    codeExplanationOutsideBlock: {
      walkthrough: [
        'Line 2-4: Three global variable names are bound in the interactive namespace: a string, an integer, and a boolean.',
        'Line 6: The built-in print() function sends formatted text to standard output.',
        'Line 9: An augmented assignment operator (+=) modifies the integer object bound to record_count, updating its stored value from 1420 to 1500.',
        'Line 10: The float division (1500 / 2000) evaluates to 0.75 and is assigned to processed_ratio.',
        'Line 13: Because processed_ratio is an unassigned expression on the last line of an interactive cell, the environment automatically renders its value 0.75.',
      ],
      flowOfExecution: 'Execution occurs block-by-block. Cell 1 executes first and populates memory. When Cell 2 executes, it queries the existing memory namespace to find record_count, modifies it, and displays the result.',
      mutationOrOutputNotes: 'Notice that if Cell 2 were executed twice in succession, record_count would become 1580, demonstrating why understanding execution count is vital in interactive programming.',
    },
    commonMistakes: [
      {
        title: 'Referencing Undefined Variables Due to Execution Order',
        incorrectCode: `# Cell at top of file, run first:
print(f"Tax due: {calculated_tax}")

# Cell at bottom of file, not yet run:
calculated_tax = 450.00`,
        errorMessage: 'NameError: name \'calculated_tax\' is not defined',
        whyItHappens: 'The programmer visually sees calculated_tax lower down on the screen and assumes Python knows about it. But Python only knows what has actually been sent through the interpreter during this session.',
        correction: 'Execute the cell defining the variable before executing any cells that read its value.',
        correctCode: `calculated_tax = 450.00
print(f"Tax due: {calculated_tax}")`,
      },
      {
        title: 'Accumulator Variable Runaway on Repeated Execution',
        incorrectCode: `# Running this single cell 5 times in a row:
total_items += 10`,
        whyItHappens: 'If you re-run an interactive cell containing an in-place mutation (like += or list.append), it keeps adding to the previous session state on every press of Shift+Enter.',
        correction: 'Separate state initialization from state mutation, or ensure cells are idempotent.',
        correctCode: `# Cell 1 (Init):
base_items = 100

# Cell 2 (Explicit derivation):
total_items = base_items + 10`,
      },
    ],
    comparisons: {
      concept: 'Interactive Execution Model Across Languages',
      pythonComparison: 'First-class support via CPython REPL, IPython, Jupyter, and editor cells. Highly dynamic with instant variable inspection.',
      javaComparison: 'Supported via JShell (introduced in Java 9), but traditional enterprise development relies on ahead-of-time compilation via javac.',
      cComparison: 'No native interactive REPL in ISO C. Code must pass through compiler (GCC/Clang) and linker into an OS binary before execution.',
      cppComparison: 'Experimental REPLs like Cling exist, but standard C++ requires full compilation and linking passes due to static typing and templates.',
      takeaway: 'Interactive programming is Python\'s greatest strength for rapid experimentation, but requires discipline to avoid out-of-order state corruption.',
    },
    connections: {
      prerequisitesLearned: ['Command-line basics and file system navigation'],
      leadsDirectlyTo: ['Python Fundamentals: Syntax, Variables, Data Types, and Operators'],
    },
    summary: {
      takeaways: [
        'Interactive Python keeps the interpreter alive in RAM between discrete code executions.',
        'Variables persist until explicitly deleted or until the kernel is restarted.',
        'Execution order is determined by user action, not physical line numbers on screen.',
        'A NameError means the interpreter has not yet executed a statement binding that name.',
        'Restarting the session gives you a clean slate to test linear reproducibility.',
      ],
      keyTermsToRemember: ['REPL', 'Persistent State', 'Kernel', 'NameError', 'Execution Order', 'Traceback'],
    },
    inLessonKnowledgeChecks: [
      {
        id: 'chk-datalumina-1',
        question: 'What happens to the variables in memory when you restart an interactive Python session (kernel)?',
        options: [
          'They are saved automatically to a backup script file.',
          'All variables, imported modules, and runtime state in RAM are completely erased.',
          'Only numerical variables are cleared; strings and functions remain.',
          'Variables are converted into global operating system environment variables.',
        ],
        correctIndex: 1,
        explanation: 'Restarting the kernel terminates the active CPython background process and spawns a fresh one with completely empty RAM memory.',
      },
      {
        id: 'chk-datalumina-2',
        question: 'Why does running a standalone script with "python app.py" behave differently from running code in an interactive notebook or cell?',
        options: [
          'Scripts use a completely different language syntax than interactive Python.',
          'Scripts run in a fresh process from line 1 to EOF and tear down memory upon completion, whereas interactive sessions retain state between steps.',
          'Scripts cannot use variables or import third-party packages.',
          'Interactive Python compiles code to C machine code while scripts do not.',
        ],
        correctIndex: 1,
        explanation: 'Script execution is one-shot and ephemeral; interactive sessions maintain active state in RAM across individual statements.',
      },
    ],
    endOfTopicQuestions: [
      {
        id: 'q-datalumina-1',
        level: 'Basic',
        question: 'Explain what causes a "NameError: name \'total\' is not defined" in an interactive Python session even when the code defining \'total\' is visible in an earlier cell on your screen.',
        answerExplanation: 'In interactive environments, code execution is governed by chronological execution order, not spatial arrangement on the screen. If the cell containing "total = ..." was never executed during the current session, or if the kernel was restarted after it was executed, the interpreter namespace does not contain the name "total".',
        sampleAnswer: 'A NameError occurs because the cell defining the variable was not executed by the kernel before the cell reading it. Simply having text written on screen does not load it into CPython memory.',
      },
      {
        id: 'q-datalumina-2',
        level: 'Intermediate',
        question: 'Contrast how unassigned expressions are handled between a standard Python script file and an interactive REPL session.',
        answerExplanation: 'In a script file (e.g. script.py), writing an unassigned expression like `25 * 4` calculates the value 100 in CPU registers and immediately discards it without printing anything to stdout. In an interactive REPL or cell, the environment automatically invokes the `repr()` function on any bare expression on the final line and prints the result directly to the interactive display.',
      },
      {
        id: 'q-datalumina-3',
        level: 'Advanced',
        question: 'Describe a realistic debugging scenario where state persistence in interactive Python creates a "false positive" bug that disappears upon script deployment.',
        answerExplanation: 'A developer imports a library or sets a configuration parameter (e.g., `TIMEOUT = 60`) in cell 1, uses it throughout cells 2–5, and later deletes cell 1 from the notebook. Because the variable TIMEOUT remains in the running kernel\'s RAM, cells 2–5 continue to execute successfully. However, when the notebook is converted into a script and deployed to production, the fresh interpreter process crashes immediately on cell 2 with a NameError because TIMEOUT was never initialized in the code.',
      },
    ],
  },

  // --- LESSON 2: PYTHON FUNDAMENTALS, TYPES, MUTABILITY ---
  {
    id: 'py-fundamentals-syntax',
    slug: 'python-syntax-variables-types-and-mutability',
    title: 'Python Syntax, Variables, Types & Mutability',
    languageId: 'python',
    moduleId: 'py-mod-fundamentals',
    moduleTitle: 'Module 2: Python Syntax & Fundamentals',
    order: 2,
    estimatedMinutes: 30,
    prerequisites: ['Interactive Python & DataLumina Workflow'],
    learningObjectives: [
      'Master the distinction between statements, expressions, and Python indentation blocks',
      'Explain how Python names bind to objects in memory (names as references)',
      'Differentiate between primitive types: int, float, str, bool, and None',
      'Understand mutable vs. immutable objects and their memory implications',
      'Distinguish value equality (==) from object identity (is)',
    ],
    introduction: {
      whatIsIt: 'This lesson covers the foundational grammatical rules of Python: how code is written, how data is stored as objects in memory, how names point to those objects, and how Python handles data types and mutability.',
      whyItMatters: 'Unlike languages where variables are fixed memory boxes with static types, in Python variables are lightweight names (pointers) bound to dynamically typed objects. Misunderstanding object identity and mutability causes some of the most insidious bugs in software development.',
      whereItFitsInRoadmap: 'Directly follows the interactive Python introduction, serving as the linguistic bedrock for control flow, functions, and data structures.',
    },
    definitions: [
      {
        term: 'Variable Binding',
        definition: 'The association of a human-readable name (identifier) with a specific object residing in heap memory.',
        beginnerExplanation: 'Think of a name tag attached to a helium balloon. The name is just a string tag; the balloon floating in memory is the actual data object.',
      },
      {
        term: 'Dynamic Typing',
        definition: 'A type system property where variable names are not bound to a fixed type at compile time; instead, types belong to the runtime objects themselves.',
        beginnerExplanation: 'You do not have to declare "this variable is an integer". Python inspects the value at runtime and assigns the appropriate object type automatically.',
      },
      {
        term: 'Mutability',
        definition: 'The capability of an object to change its internal state or contents in place without changing its memory address (identity).',
        beginnerExplanation: 'A whiteboard is mutable (you can erase and rewrite notes on the same board). A printed book page is immutable (to change it, you must print a brand new page).',
        relatedTerm: 'Immutable',
      },
      {
        term: 'Object Identity vs Value Equality',
        definition: 'Value equality (==) checks whether two objects hold equivalent contents. Object identity (is) checks whether two variables point to the exact same physical object in memory (`id(a) == id(b)`).',
        beginnerExplanation: 'Two identical twenty-dollar bills have equal value (==), but they are two distinct physical bills (they fail the "is" test).',
      },
    ],
    detailedSections: [
      {
        heading: 'Indentation, Statements, and Expressions',
        paragraphs: [
          'Python uses whitespace indentation (standardized at 4 spaces per nesting level) to define blocks of code, replacing the curly braces `{}` used in C, C++, and Java. Indentation is not decorative; it is a structural grammatical requirement parsed directly by CPython.',
          'A statement performs an action (e.g., `x = 5`, `import math`, `return value`), whereas an expression computes and evaluates to a value (e.g., `3 + 4`, `len(users)`, `is_active and count > 0`).',
        ],
      },
      {
        heading: 'Python Built-in Types and None',
        paragraphs: [
          'Python provides five essential scalar types: `int` (arbitrary-precision integers), `float` (64-bit IEEE 754 floating-point numbers), `str` (Unicode text sequences), `bool` (`True` or `False`), and `NoneType` (represented by the singleton `None`).',
          '`None` represents the intentional absence of a value or a default state. It is not equivalent to `0`, `False`, or an empty string `""`; it is a unique singleton object.',
        ],
      },
      {
        heading: 'Mutable vs Immutable: The Memory Truth',
        paragraphs: [
          'In Python, integers, floats, strings, tuples, and booleans are strictly IMMUTABLE. When you write `x = 5` and then `x = x + 1`, Python does not alter the number 5 in place. Instead, it computes 6, allocates a new integer object in memory, and rebinds the label `x` to point to 6.',
          'In contrast, lists, dictionaries, and sets are MUTABLE. When you append an element to a list, the list\'s memory address remains identical while its internal structure expands. This means if two variables point to the same mutable list, modifying it through one variable alters it for both!',
        ],
      },
    ],
    syntaxAndRules: {
      overview: 'Python identifier naming rules and basic assignment syntax.',
      rules: [
        'Variable names must begin with a letter (a-z, A-Z) or underscore (_), followed by letters, digits, or underscores.',
        'Variable names cannot be Python reserved keywords (such as if, for, while, def, class, return, import).',
        'Python is case-sensitive: UserCount, usercount, and user_count are three completely separate variables.',
        'Standard convention (PEP 8) dictates snake_case for variable and function names.',
      ],
      syntaxSnippet: '# Valid assignments\nuser_id = 10042\naccount_balance = 1250.50\nis_verified = True\nprofile_note = None',
    },
    primaryCodeExample: {
      title: 'Identity, Equality, and Mutability in Python',
      language: 'python',
      code: `# Primitive immutable behavior
count = 10
alias_count = count
count += 5

print(f"count: {count}, alias_count: {alias_count}")
# Notice alias_count remained 10 because integers are immutable!

# Mutable reference sharing
list_a = [1, 2, 3]
list_b = list_a  # Both variables point to the EXACT SAME list in heap memory

list_b.append(99)

print(f"list_a: {list_a}")
print(f"list_b: {list_b}")
print(f"Equality check (list_a == list_b): {list_a == list_b}")
print(f"Identity check (list_a is list_b): {list_a is list_b}")`,
      explanation: 'This script proves that immutable objects rebind to new instances upon arithmetic modification, whereas mutable objects share memory references, causing mutations in one alias to reflect in the other.',
      expectedOutput: `count: 15, alias_count: 10
list_a: [1, 2, 3, 99]
list_b: [1, 2, 3, 99]
Equality check (list_a == list_b): True
Identity check (list_a is list_b): True`,
      keyPoints: [
        'Integers cannot be altered in-place; count += 5 rebinds count to a new integer 15.',
        'list_b = list_a does not create a copy of the list; it creates a second pointer to the same memory block.',
        'list_a is list_b evaluates to True because id(list_a) == id(list_b).',
      ],
    },
    codeExplanationOutsideBlock: {
      walkthrough: [
        'Line 2: An integer object 10 is instantiated; name "count" binds to it.',
        'Line 3: Name "alias_count" binds to the same integer object 10.',
        'Line 4: "count += 5" evaluates 10 + 5 = 15. Since ints are immutable, a new integer 15 is created and "count" rebinds to it. "alias_count" still points to 10.',
        'Line 9: A new mutable list [1, 2, 3] is allocated on the heap; "list_a" references it.',
        'Line 10: "list_b" is assigned to "list_a", copying the memory reference. Both names now target the identical heap address.',
        'Line 12: list_b.append(99) mutates the list object in place.',
        'Line 14-17: When list_a is printed, it displays the newly appended 99 because list_a and list_b point to the same object.',
      ],
      flowOfExecution: 'Sequential top-to-bottom execution demonstrating the stark contrast between immutable scalar re-binding and mutable collection in-place mutation.',
      mutationOrOutputNotes: 'To make an independent clone of a list rather than sharing references, use list_b = list_a.copy() or list_a[:].',
    },
    commonMistakes: [
      {
        title: 'Using "is" Instead of "==" for Equality Comparison',
        incorrectCode: `user_input = input("Enter status: ") # User types "active"
if user_input is "active":
    print("User is active")`,
        errorMessage: 'SyntaxWarning: "is" with a literal. Did you mean "=="?',
        whyItHappens: '"is" checks memory address identity. While Python caches small integers and short interned string literals, user inputs or dynamically generated strings will have distinct memory addresses, causing "is" to fail unexpectedly.',
        correction: 'Use "==" for comparing values; reserve "is" strictly for checking singletons like "x is None" or "x is True".',
        correctCode: `if user_input == "active":
    print("User is active")`,
      },
      {
        title: 'Unintended Side Effects from Shared Mutable References',
        incorrectCode: `def add_item(inventory, item):
    inventory.append(item)
    return inventory

default_items = ["pen", "notebook"]
order_1 = add_item(default_items, "ruler")
order_2 = add_item(default_items, "eraser")
print(default_items) # Unexpectedly modified!`,
        whyItHappens: 'The function modified default_items in place because lists are passed by object reference.',
        correction: 'Create a defensive copy inside the function if you wish to avoid mutating the caller\'s data.',
        correctCode: `def add_item(inventory, item):
    new_inv = inventory.copy()
    new_inv.append(item)
    return new_inv`,
      },
    ],
    comparisons: {
      concept: 'Variable Memory Model Across Languages',
      pythonComparison: 'Variables are reference tags pointing to dynamically allocated objects on the heap. Types belong to objects, not variable names.',
      javaComparison: 'Primitive types (int, double, boolean) store raw values directly on the stack. Objects are references on the heap.',
      cComparison: 'Variables are direct named byte offsets in memory. Types are static and memory layout is explicit and fixed at compile time.',
      cppComparison: 'Supports both direct value semantics (objects stored on stack or heap) and reference/pointer semantics with strict compile-time types.',
      takeaway: 'In Python, everything is an object, and every variable assignment is a reference assignment.',
    },
    connections: {
      prerequisitesLearned: ['Interactive Python & DataLumina Workflow'],
      leadsDirectlyTo: ['Control Flow: Conditionals, Loops, and Logic'],
    },
    summary: {
      takeaways: [
        'Python variables are names that point to objects in memory; they do not have static types.',
        'Scalar primitives (int, float, str, bool) are immutable; collections (list, dict, set) are mutable.',
        'Use "==" to check value equality; use "is" only to check singleton identity (such as "is None").',
        'Assignment (=) creates a new reference, not a deep copy.',
        'Indentation is syntactically mandatory and enforces clean code structure.',
      ],
      keyTermsToRemember: ['Dynamic Typing', 'Immutable', 'Mutable', 'Value Equality', 'Object Identity', 'NoneType'],
    },
    inLessonKnowledgeChecks: [
      {
        id: 'chk-fund-1',
        question: 'What is the value of list_x after running: list_x = [10, 20]; list_y = list_x; list_y.append(30)?',
        options: [
          '[10, 20]',
          '[10, 20, 30]',
          '[30]',
          'An error is raised because lists are immutable.',
        ],
        correctIndex: 1,
        explanation: 'Because lists are mutable and assignment copies the memory reference, list_x and list_y point to the same object. Mutating list_y alters list_x.',
      },
    ],
    endOfTopicQuestions: [
      {
        id: 'q-fund-1',
        level: 'Basic',
        question: 'Explain why the operation a = 5 followed by a = a + 1 does NOT modify the integer 5 in memory in Python.',
        answerExplanation: 'In Python, integer objects are immutable. When "a = a + 1" evaluates, CPython computes 5 + 1 = 6, allocates a brand new integer object representing 6 in heap memory, and updates the reference "a" to point to 6. The original integer object 5 remains unchanged in memory.',
      },
      {
        id: 'q-fund-2',
        level: 'Intermediate',
        question: 'Under what circumstances should a developer use the "is" operator instead of the "==" operator?',
        answerExplanation: 'The "is" operator should be used exclusively when testing object identity against singletons—most notably when checking if a variable is `None` (`if val is None:`), `True`, or `False`. For testing whether two data values, strings, or numbers are equal in magnitude or content, always use `==`.',
      },
    ],
  },

  // --- LESSON 8: STREAMLIT FOUNDATIONS ---
  {
    id: 'streamlit-foundations',
    slug: 'streamlit-application-development-foundations',
    title: 'Streamlit Application Development: Foundations & UI',
    languageId: 'python',
    moduleId: 'py-mod-streamlit',
    moduleTitle: 'Module 8: Streamlit Application Development',
    order: 8,
    estimatedMinutes: 35,
    prerequisites: ['Python Fundamentals', 'Functions & Program Organization', 'Object-Oriented Python'],
    learningObjectives: [
      'Understand what Streamlit is, how it works, and what problems it solves for data applications',
      'Explain the fundamental difference between Streamlit and traditional frameworks (Flask, Django, FastAPI)',
      'Master the Streamlit reactive rerun execution model',
      'Build responsive interfaces using titles, inputs, buttons, sliders, sidebars, and columns',
      'Display dataframes, tables, charts, and metric status displays without writing frontend JavaScript',
    ],
    introduction: {
      whatIsIt: 'Streamlit is an open-source Python framework designed to build interactive, production-ready web applications for data science, machine learning, and business tooling directly in pure Python without writing HTML, CSS, or JavaScript.',
      whyItMatters: 'Traditionally, creating a web tool required a Python backend developer, a JavaScript frontend engineer, and complex REST API contracts. Streamlit eliminates that friction by treating ordinary Python scripts as reactive web user interfaces.',
      whereItFitsInRoadmap: 'Streamlit sits directly between Python fundamentals and full-stack backend development, teaching web UI creation and reactive execution before diving into low-level HTTP servers and REST APIs.',
    },
    definitions: [
      {
        term: 'Streamlit',
        definition: 'A Python web application framework that converts Python scripts into interactive web applications via an automated reactive rerun model.',
        beginnerExplanation: 'A tool that lets you turn a standard Python data script into an interactive website with sliders and charts using just a few lines of Python.',
      },
      {
        term: 'Reactive Rerun Model',
        definition: 'The fundamental execution loop where Streamlit re-executes the entire Python script from the very first line to the last line whenever any user interacts with an input widget.',
        beginnerExplanation: 'Every time a user clicks a button or drags a slider in their browser, Streamlit re-runs your entire code file from top to bottom with the updated widget values.',
      },
      {
        term: 'Widget',
        definition: 'An interactive UI element (such as `st.button`, `st.slider`, or `st.text_input`) that renders a browser control and returns its current user value directly to Python.',
        beginnerExplanation: 'A graphical control on the screen that gives the user a way to pass inputs into your Python script.',
      },
      {
        term: 'Streamlit Server',
        definition: 'The Tornado/WebSocket backend server running on port 8501 that communicates live widget states between the user\'s web browser and the Python interpreter.',
        beginnerExplanation: 'The background process that watches your code, pushes UI updates to the browser, and receives button clicks.',
      },
    ],
    detailedSections: [
      {
        heading: 'How Streamlit Differs from Flask, Django, and FastAPI',
        paragraphs: [
          'In traditional web frameworks (Flask, Django, FastAPI), the developer must manually design HTTP request routes (e.g. `@app.route("/submit", methods=["POST"])`), parse incoming JSON payloads, handle status codes, and write HTML templates or client-side JavaScript (React/Vue) to render responses.',
          'Streamlit removes this entire client-server separation for internal applications. You simply write linear Python code: `name = st.text_input("Name")`. When the user types into the box, Streamlit passes the typed string into the variable `name` and immediately reruns the file, updating downstream calculations automatically.',
        ],
        bulletPoints: [
          'Streamlit: Declarative, top-to-bottom reactive script execution. Ideal for dashboards, data tools, and prototypes.',
          'FastAPI/Flask/Django: Explicit HTTP route handlers and stateless client-server architectures. Ideal for customer-facing APIs, authentication backends, and multi-service systems.',
        ],
      },
      {
        heading: 'The Reactive Rerun Cycle Explained',
        paragraphs: [
          'Understanding the rerun cycle is the key to mastering Streamlit. When a user navigates to your application, Streamlit runs `app.py` from line 1 to EOF. It renders the elements in order.',
          'When the user clicks a button or slides a numeric controller, Streamlit catches the WebSocket event, records the new value, and immediately triggers another execution of `app.py` from line 1 to EOF. If you initialize a standard variable `count = 0` at the top of your file, it will reset to 0 on every single click unless you use Session State!',
        ],
        callout: {
          type: 'architecture',
          title: 'The Golden Rule of Streamlit',
          content: 'Always remember: Any widget interaction triggers a complete top-to-bottom re-execution of your script. Keep expensive calculations inside @st.cache_data!',
        },
      },
      {
        heading: 'Building Rich Layouts: Sidebars, Columns, and Metrics',
        paragraphs: [
          'By default, Streamlit stacks elements vertically in a single column. You can organize your interface using `st.sidebar` for navigation and configuration parameters, and `st.columns()` for side-by-side dashboards.',
          '`st.metric()` displays large KPI figures with delta changes, while `st.dataframe()` renders searchable, interactive tables that users can sort and filter directly in their browser.',
        ],
      },
    ],
    syntaxAndRules: {
      overview: 'Common Streamlit display functions and widget syntax.',
      rules: [
        'Streamlit commands must be executed using "streamlit run app.py", never standard "python app.py".',
        'Widgets return their current value as standard Python types (e.g., st.checkbox returns a boolean True/False).',
        'Elements are rendered in the visual DOM in the exact chronological order their Python statements execute.',
      ],
      syntaxSnippet: 'import streamlit as st\n\nst.set_page_config(page_title="Dashboard", layout="wide")\nst.title("Telemetry Monitor")\n\ncol1, col2 = st.columns(2)\nwith col1:\n    threshold = st.slider("Threshold", 0, 100, 50)',
    },
    primaryCodeExample: {
      title: 'Complete Interactive Streamlit Data Application',
      language: 'python',
      code: `import streamlit as st
import pandas as pd

# 1. Page Configuration
st.set_page_config(page_title="Server Operations", layout="wide")

st.title("DataCenter Telemetry Dashboard")
st.write("Monitor real-time node operational health and capacity thresholds.")

# 2. Sidebar Configuration Controls
with st.sidebar:
    st.header("Filter Controls")
    cluster_region = st.selectbox("Select Region", ["US-East", "EU-West", "AP-South"])
    alert_threshold = st.slider("CPU Alert Threshold (%)", min_value=50, max_value=95, value=80)
    show_raw_data = st.checkbox("Show Raw Server Logs", value=False)

# 3. Simulated Telemetry Data
server_data = pd.DataFrame({
    "Node ID": ["node-01", "node-02", "node-03", "node-04"],
    "CPU Usage (%)": [42.5, 88.1, 71.3, 91.4],
    "Memory (GB)": [32, 64, 16, 128],
    "Status": ["Healthy", "High Load", "Healthy", "Critical"]
})

# 4. Multi-Column KPI Metrics
col1, col2, col3 = st.columns(3)
col1.metric("Active Region", cluster_region)
col2.metric("Total Nodes", len(server_data))
high_load_count = len(server_data[server_data["CPU Usage (%)"] >= alert_threshold])
col3.metric("Nodes Exceeding Threshold", high_load_count, delta=f"{high_load_count} alerts", delta_color="inverse")

# 5. Conditional Alert & Data Display
if high_load_count > 0:
    st.warning(f"Attention: {high_load_count} nodes are operating above the {alert_threshold}% threshold!")

st.subheader("Node Performance Overview")
st.dataframe(server_data, use_container_width=True)

if show_raw_data:
    st.subheader("Raw Telemetry Records")
    st.json(server_data.to_dict(orient="records"))`,
      explanation: 'A complete Streamlit application demonstrating sidebar filters, multi-column KPI metrics, dynamic threshold warnings, and interactive dataframe rendering.',
      expectedOutput: `Renders in browser at http://localhost:8501 with responsive UI widgets, reactive metric counters, and interactive data tables.`,
      keyPoints: [
        'st.sidebar cleanly isolates configuration controls away from the primary data visualization area.',
        'st.columns(3) creates side-by-side KPI metric cards.',
        'When the user drags the alert_threshold slider, the entire file reruns and high_load_count recalculates immediately.',
      ],
    },
    codeExplanationOutsideBlock: {
      walkthrough: [
        'Line 5: st.set_page_config sets the browser tab title and expands the viewport layout to wide desktop mode.',
        'Line 10-15: The "with st.sidebar:" context manager places the selectbox, slider, and checkbox controls in a collapsible left navigation panel.',
        'Line 18-23: A pandas DataFrame is constructed containing four simulated compute nodes.',
        'Line 26-30: st.columns(3) divides the horizontal space into three equal columns. Metric components display the region, total count, and threshold breach tally with color-coded delta flags.',
        'Line 33-34: An "if" statement conditionally renders an alert banner only when compute nodes breach the user\'s chosen threshold.',
        'Line 37: st.dataframe renders a sortable table component.',
      ],
      flowOfExecution: 'On initial load, default slider values are used. If the user moves alert_threshold to 90%, Streamlit reruns lines 1-42 instantly, re-filtering the dataframe and updating the alert banner without refreshing the browser tab.',
      mutationOrOutputNotes: 'Notice that no HTML or CSS was written; Streamlit automatically produces accessible, themed frontend components.',
    },
    commonMistakes: [
      {
        title: 'Running Streamlit with "python app.py"',
        incorrectCode: `python app.py`,
        errorMessage: 'Script exits immediately or displays: "Warning: to view a Streamlit app on a browser, run it with the following command: streamlit run ..."',
        whyItHappens: 'Streamlit requires its WebSocket development server to be initialized, which is orchestrated by the "streamlit" CLI executable.',
        correction: 'Always launch applications using "streamlit run filename.py".',
        correctCode: `streamlit run app.py`,
      },
      {
        title: 'Attempting to Store State in Global Variables across Clicks',
        incorrectCode: `# Top of file:
click_counter = 0

if st.button("Click Me"):
    click_counter += 1

st.write(f"Count: {click_counter}") # Will NEVER exceed 1!`,
        whyItHappens: 'Because Streamlit reruns the script from line 1 on every button press, click_counter is re-initialized to 0 on every single run before reaching the button check.',
        correction: 'Store persistent variables inside st.session_state.',
        correctCode: `if "click_counter" not in st.session_state:
    st.session_state.click_counter = 0

if st.button("Click Me"):
    st.session_state.click_counter += 1

st.write(f"Count: {st.session_state.click_counter}")`,
      },
    ],
    comparisons: {
      concept: 'Web Application Development Paradigms',
      pythonComparison: 'Streamlit: Pure Python declarative scripts, reactive rerun cycle, instant UI without HTML/CSS. Best for data tools and dashboards.',
      javaComparison: 'Java Spring Boot / Thymeleaf: Strict MVC architecture, explicit controller request mapping, HTML templates, and full client-server separation.',
      cComparison: 'Native C: Low-level socket programming, raw HTTP string construction, and manual parsing of TCP packets.',
      cppComparison: 'C++ Crow / Pistache: High-performance asynchronous microframeworks requiring manual JSON serialization and explicit REST routing.',
      takeaway: 'Streamlit provides the fastest path from Python script to working web application for internal tools and analytical apps.',
    },
    connections: {
      prerequisitesLearned: ['Python Fundamentals', 'Functions', 'Object-Oriented Python'],
      leadsDirectlyTo: ['Streamlit Session State, Callbacks & Caching', 'Python Backend Development'],
    },
    summary: {
      takeaways: [
        'Streamlit lets you build interactive web applications in pure Python without frontend code.',
        'Every user interaction triggers a complete top-to-bottom script rerun.',
        'Use st.sidebar and st.columns to construct organized, multi-zone dashboard layouts.',
        'Widgets return their active value directly into Python variables.',
        'Launch applications exclusively via the "streamlit run" command.',
      ],
      keyTermsToRemember: ['Streamlit', 'Reactive Rerun', 'Widget', 'st.session_state', 'st.metric', 'st.sidebar'],
    },
    inLessonKnowledgeChecks: [
      {
        id: 'chk-st-1',
        question: 'What happens inside the Streamlit runtime when a user drags an st.slider control?',
        options: [
          'Only the specific function containing the slider is called.',
          'The entire Python script is re-executed from line 1 to the end with the new slider value.',
          'A background JavaScript worker updates the DOM without alerting Python.',
          'The browser downloads a fresh copy of the Python interpreter.',
        ],
        correctIndex: 1,
        explanation: 'Streamlit operates on a reactive rerun architecture: any widget interaction reruns the entire script from top to bottom.',
      },
    ],
    endOfTopicQuestions: [
      {
        id: 'q-st-1',
        level: 'Basic',
        question: 'Why does an ordinary variable like "counter = 0" reset back to 0 every time a button is clicked in a Streamlit app?',
        answerExplanation: 'Because Streamlit executes the entire script file from top to bottom on every user interaction. When the interpreter reaches the top of the file during the rerun, it executes "counter = 0", erasing any value computed during the previous run. To persist data across reruns, Streamlit provides `st.session_state`.',
      },
      {
        id: 'q-st-2',
        level: 'Intermediate',
        question: 'Explain the difference in architectural use cases between Streamlit and a REST framework like FastAPI.',
        answerExplanation: 'Streamlit is designed for rapid interactive interfaces, internal dashboards, and data prototypes where the UI and Python logic are tightly coupled in one reactive script. FastAPI is a headless REST API server designed to serve JSON endpoints to mobile apps, React/Vue single-page applications, and microservices with high concurrency and stateless scalability.',
      },
    ],
  },

  // --- LESSON 10: PYTHON BACKEND & WEB FOUNDATIONS ---
  {
    id: 'py-backend-http-foundations',
    slug: 'how-web-applications-work-http-rest-and-architecture',
    title: 'How Web Applications Work: HTTP, REST & Backend Foundations',
    languageId: 'python',
    moduleId: 'py-mod-backend',
    moduleTitle: 'Module 9: Python Backend Foundations',
    order: 10,
    estimatedMinutes: 30,
    prerequisites: ['Python Fundamentals', 'Functions', 'Streamlit Foundations'],
    learningObjectives: [
      'Understand the 3-tier architecture: Frontend, Backend, and Database',
      'Explain Client-Server communication over TCP/IP and HTTP/HTTPS',
      'Deconstruct the structure of HTTP Requests and HTTP Responses',
      'Master standard HTTP methods (GET, POST, PUT, DELETE, PATCH) and HTTP status codes',
      'Understand REST architectural principles, statelessness, and JSON content negotiation',
    ],
    introduction: {
      whatIsIt: 'This lesson explains the foundational mechanics of web communication: how web browsers and mobile apps talk to backend servers across the Internet using HTTP and REST.',
      whyItMatters: 'Whether you write backend code in Flask, Django, FastAPI, Spring Boot, or C++, the fundamental laws of HTTP, status codes, and client-server architecture remain identical. Without understanding HTTP requests and responses, building robust APIs is impossible.',
      whereItFitsInRoadmap: 'Acts as the theoretical and architectural bridge separating UI scripting (Streamlit) from robust web service engineering (Flask, Django, FastAPI).',
    },
    definitions: [
      {
        term: 'Client-Server Architecture',
        definition: 'A distributed computing model where service requesters (clients, such as browsers or mobile phones) communicate with centralized service providers (servers) over a network.',
        beginnerExplanation: 'The client is a customer ordering at a counter; the server is the kitchen staff fulfilling the order and handing back food.',
      },
      {
        term: 'HTTP (Hypertext Transfer Protocol)',
        definition: 'The stateless, application-layer request-response protocol underpinning communication across the World Wide Web, typically layered over TCP/TLS.',
        beginnerExplanation: 'The universal language and postal formatting rules used whenever a computer asks another computer for a web page, file, or piece of data.',
      },
      {
        term: 'REST (Representational State Transfer)',
        definition: 'An architectural design pattern that structures APIs around named resources (like `/users` or `/orders`) manipulated using standard HTTP verbs.',
        beginnerExplanation: 'A standardized naming and organization convention that makes web APIs intuitive, predictable, and uniform.',
      },
      {
        term: 'Stateless Communication',
        definition: 'A protocol guarantee where each incoming request contains all necessary context and authentication data, requiring the server to retain no session state about prior requests.',
        beginnerExplanation: 'Every request stands completely on its own; the server treats each incoming message as if it were meeting the client for the first time.',
      },
    ],
    detailedSections: [
      {
        heading: 'Anatomy of an HTTP Request and Response',
        paragraphs: [
          'When a client contacts a server, it sends a plain-text HTTP Request packet. An HTTP request consists of three distinct parts: the Request Line (Method, URI path, and HTTP version), Headers (key-value metadata such as `Content-Type` and `Authorization`), and an optional Request Body (payload data, typically formatted in JSON).',
          'In response, the server returns an HTTP Response packet containing: the Status Line (HTTP version and 3-digit Status Code), Response Headers, and the Response Body (HTML, JSON, images, etc.).',
        ],
        bulletPoints: [
          'Request Line: GET /api/v1/users/42 HTTP/1.1',
          'Headers: Host: api.example.com | Authorization: Bearer <token> | Content-Type: application/json',
          'Status Line: HTTP/1.1 200 OK or HTTP/1.1 404 Not Found',
        ],
      },
      {
        heading: 'HTTP Methods and Semantic Idempotency',
        paragraphs: [
          'HTTP methods dictate the requested action on a resource. Understanding their semantics prevents destructive API bugs:',
          'GET: Retrieve a representation of a resource. Safe and idempotent (must never alter database state).',
          'POST: Create a brand new resource or trigger an action. Neither safe nor idempotent.',
          'PUT: Completely replace an existing resource with a new representation. Idempotent.',
          'PATCH: Partially update specific fields of an existing resource.',
          'DELETE: Remove a resource. Idempotent.',
        ],
      },
      {
        heading: 'HTTP Status Code Families',
        paragraphs: [
          'Every response contains a standardized 3-digit numerical code categorized into five distinct classes:',
          '1xx (Informational): Request received, continuing process.',
          '2xx (Success): The request was successfully received and accepted (200 OK, 201 Created, 204 No Content).',
          '3xx (Redirection): Further action must be taken by the client (301 Moved Permanently, 304 Not Modified).',
          '4xx (Client Error): The client provided invalid data or lacks permissions (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity).',
          '5xx (Server Error): The server encountered an unhandled exception or crash (500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable).',
        ],
      },
    ],
    syntaxAndRules: {
      overview: 'Standard REST resource naming conventions and URL structures.',
      rules: [
        'Resource URIs should use plural nouns rather than verbs (e.g., /api/orders, NOT /api/getOrders).',
        'Sub-resources reflect hierarchical ownership: /api/users/{user_id}/orders.',
        'Use query parameters for filtering, sorting, and pagination: /api/products?category=electronics&limit=20.',
      ],
      syntaxSnippet: '# Canonical REST Endpoint Structure:\n# GET    /api/v1/articles       -> List all articles\n# POST   /api/v1/articles       -> Create an article\n# GET    /api/v1/articles/{id}  -> Retrieve single article\n# PUT    /api/v1/articles/{id}  -> Replace article\n# DELETE /api/v1/articles/{id}  -> Delete article',
    },
    primaryCodeExample: {
      title: 'Raw HTTP Request and Response Lifecycle in Python',
      language: 'python',
      code: `import json

# Conceptual simulation of HTTP Request parsing and Response generation
raw_incoming_http_request = (
    "POST /api/v1/accounts HTTP/1.1\\r\\n"
    "Host: api.bankingservice.com\\r\\n"
    "Content-Type: application/json\\r\\n"
    "Authorization: Bearer sec_token_9918\\r\\n"
    "\\r\\n"
    '{"username": "dev_alex", "initial_deposit": 500.0}'
)

def parse_and_handle_request(raw_text: str):
    # 1. Split headers from body using double CRLF
    header_section, body_section = raw_text.split("\\r\\n\\r\\n", 1)
    header_lines = header_section.split("\\r\\n")
    
    # 2. Extract request line
    method, path, http_ver = header_lines[0].split(" ")
    print(f"Parsed Method: {method}, Path: {path}")
    
    # 3. Parse JSON Body
    payload = json.loads(body_section)
    print(f"Received payload for: {payload['username']}, deposit: {payload['initial_deposit']}")
    
    # 4. Construct HTTP Response
    response_payload = {
        "status": "success",
        "account_id": 80491,
        "balance": payload["initial_deposit"]
    }
    json_body = json.dumps(response_payload)
    
    response = (
        "HTTP/1.1 201 Created\\r\\n"
        "Content-Type: application/json\\r\\n"
        f"Content-Length: {len(json_body)}\\r\\n"
        "Connection: close\\r\\n"
        "\\r\\n"
        f"{json_body}"
    )
    return response

# Execute simulated web server handler:
http_response = parse_and_handle_request(raw_incoming_http_request)
print("\\nGenerated HTTP Response:\\n" + http_response)`,
      explanation: 'This code illustrates the internal wire-protocol reality of HTTP: an incoming string containing headers and a body is parsed by the backend, processed, and returned as a formatted HTTP response string with a 201 Created status code.',
      expectedOutput: `Parsed Method: POST, Path: /api/v1/accounts
Received payload for: dev_alex, deposit: 500.0

Generated HTTP Response:
HTTP/1.1 201 Created
Content-Type: application/json
Content-Length: 61
Connection: close

{"status": "success", "account_id": 80491, "balance": 500.0}`,
      keyPoints: [
        'Web servers communicate using plain text and binary streams formatted per RFC 9112.',
        'The double CRLF (\\r\\n\\r\\n) is the protocol delimiter that separates HTTP headers from the request payload.',
        'Status code 201 Created indicates successful resource creation.',
      ],
    },
    codeExplanationOutsideBlock: {
      walkthrough: [
        'Line 4-11: A raw string simulates the exact byte stream transmitted over a TCP socket by a browser or curl client.',
        'Line 15: The string is split across the double newline sequence into metadata headers and payload body.',
        'Line 19: The Request Line is parsed into HTTP Method (POST), URI (/api/v1/accounts), and version.',
        'Line 23: The json module parses the raw string payload into a native Python dictionary.',
        'Line 32-40: An RFC-compliant HTTP response string is assembled featuring status code 201 Created, Content-Type, Content-Length, and the JSON string.',
      ],
      flowOfExecution: 'Illustrates the foundational request-response cycle implemented underneath every modern framework like Flask, FastAPI, or Django.',
    },
    commonMistakes: [
      {
        title: 'Using GET Requests to Mutate Database Records',
        incorrectCode: `# Vulnerable design:
GET /api/users/delete?id=10`,
        whyItHappens: 'Novice developers assume GET is simpler because it can be typed directly into a browser URL bar.',
        correction: 'GET requests must be strictly read-only and idempotent. Search engines, browser pre-fetching, and web caches trigger GET requests automatically, which would cause accidental data deletion!',
        correctCode: `DELETE /api/users/10`,
      },
      {
        title: 'Returning 200 OK for Failed Requests with Error Text',
        incorrectCode: `HTTP/1.1 200 OK
Content-Type: application/json

{"error": "User not found"}`,
        whyItHappens: 'Backend developers forget to set the HTTP status code, leaving the framework default 200.',
        correction: 'Always return the semantically correct 4xx or 5xx code so client-side fetch() and automated monitoring tools recognize the failure.',
        correctCode: `HTTP/1.1 404 Not Found
Content-Type: application/json

{"detail": "User not found"}`,
      },
    ],
    comparisons: {
      concept: 'HTTP Handling Across Tech Stacks',
      pythonComparison: 'Handled via WSGI (PEP 3333) or ASGI specifications. Servers like Gunicorn/Uvicorn parse raw bytes into request dictionaries.',
      javaComparison: 'Handled via Java Servlets and the Jakarta EE specification, encapsulated inside Spring Boot embedded Tomcat servers.',
      cComparison: 'Programmers directly bind POSIX sockets, read() bytes, and manually parse strings using strstr() or specialized C HTTP parsers (llhttp).',
      cppComparison: 'High-performance microframeworks (Crow) utilize Boost.Asio or epoll event loops to dispatch HTTP callbacks with minimal latency.',
      takeaway: 'HTTP is universal; only the abstraction layer varies across languages.',
    },
    connections: {
      prerequisitesLearned: ['Python Fundamentals', 'Streamlit UI'],
      leadsDirectlyTo: ['Flask Framework Comprehensive Tutorial', 'FastAPI Framework Tutorial', 'Django Framework Tutorial'],
    },
    summary: {
      takeaways: [
        'Web applications rely on a client-server architecture communicating over HTTP.',
        'HTTP requests contain a Method, URI, Headers, and an optional Body.',
        'HTTP responses return a 3-digit Status Code, Headers, and a Body.',
        'REST maps CRUD operations to standard HTTP methods: GET, POST, PUT, PATCH, DELETE.',
        'Status codes communicate outcome: 2xx Success, 4xx Client Error, 5xx Server Error.',
      ],
      keyTermsToRemember: ['Client-Server', 'HTTP Request', 'HTTP Response', 'REST', 'Idempotent', 'Status Codes', 'JSON'],
    },
    inLessonKnowledgeChecks: [
      {
        id: 'chk-http-1',
        question: 'Which HTTP status code should be returned when a client submits invalid JSON missing required fields?',
        options: [
          '200 OK',
          '404 Not Found',
          '422 Unprocessable Entity (or 400 Bad Request)',
          '500 Internal Server Error',
        ],
        correctIndex: 2,
        explanation: 'A 422 Unprocessable Entity or 400 Bad Request accurately informs the client that the error originated on their side due to malformed payload schema.',
      },
    ],
    endOfTopicQuestions: [
      {
        id: 'q-http-1',
        level: 'Basic',
        question: 'What does it mean for an HTTP method to be "idempotent", and which standard methods possess this property?',
        answerExplanation: 'An HTTP method is idempotent if executing it multiple times in succession produces the exact same server state as executing it a single time. GET, PUT, DELETE, and HEAD are idempotent. POST is NOT idempotent, because sending a POST request five times typically creates five duplicate records or charges a card five times.',
      },
      {
        id: 'q-http-2',
        level: 'Intermediate',
        question: 'Why should a frontend web application never talk directly to a production PostgreSQL database over port 5432?',
        answerExplanation: 'Frontend JavaScript runs on the end user\'s device and can be inspected or modified by anyone using browser developer tools. Exposing database credentials in client code would give malicious users direct read/write/drop access to your entire database. The backend acts as a secure, authenticated gatekeeper enforcing business logic, access control, and parameter validation.',
      },
    ],
  },

  // --- LESSON 11: FLASK COMPREHENSIVE TUTORIAL ---
  {
    id: 'py-backend-flask-tutorial',
    slug: 'flask-web-development-comprehensive-tutorial',
    title: 'Flask Framework: Comprehensive Backend Tutorial',
    languageId: 'python',
    moduleId: 'py-mod-backend',
    moduleTitle: 'Module 10: Flask, Django & FastAPI',
    order: 11,
    estimatedMinutes: 40,
    prerequisites: ['Python Backend Foundations: HTTP & REST', 'Object-Oriented Python'],
    learningObjectives: [
      'Understand what Flask is, its microframework philosophy, and its architectural trade-offs',
      'Create clean modular Flask applications using the Application Factory pattern and Blueprints',
      'Handle routing, HTTP verbs, query parameters, and dynamic URL path converters',
      'Process incoming JSON requests and generate structured JSON responses with proper status codes',
      'Implement global error handlers, custom HTTP exceptions, and configuration management',
    ],
    introduction: {
      whatIsIt: 'Flask is a lightweight, flexible Python WSGI microframework based on Werkzeug and Jinja. Unlike monolithic frameworks, Flask does not make database, authentication, or folder layout decisions for you, giving you full architectural freedom.',
      whyItMatters: 'Flask powers countless production APIs and microservices (including services at Netflix, Reddit, and Lyft) due to its simplicity, transparency, and minimal overhead. Learning Flask teaches you exactly how request routing and WSGI middleware function under the hood.',
      whereItFitsInRoadmap: 'First of the three major Python backend framework tutorials, introducing WSGI routing and microservice architecture before moving to full-stack Django and async FastAPI.',
    },
    definitions: [
      {
        term: 'Microframework',
        definition: 'A web framework providing only the bare essentials needed to build web apps (routing, request/response handling, template rendering) without enforcing an ORM or admin panel.',
        beginnerExplanation: 'A stripped-down engine and chassis; you choose which custom seats, stereo, and tires (database, forms, auth) you want to install.',
      },
      {
        term: 'Application Factory Pattern',
        definition: 'A design pattern where a Flask application instance is constructed inside a Python function (`create_app()`) rather than created as a global variable.',
        beginnerExplanation: 'Instead of building one fixed house, you write a blueprint machine that can build different houses for testing, development, and production.',
      },
      {
        term: 'Blueprint',
        definition: 'A Flask architectural primitive used to organize related views, routes, and error handlers into modular, reusable packages that can be registered onto the application.',
        beginnerExplanation: 'A modular sub-application (like an "auth" department or an "orders" department) that plugs into the main company headquarters.',
      },
      {
        term: 'Request Context',
        definition: 'A thread-local proxy (`request`) managed by Flask that makes the active HTTP request parameters available to the currently executing route function.',
        beginnerExplanation: 'A magical object in Flask that always holds the exact details of whichever visitor\'s request is currently being handled.',
      },
    ],
    detailedSections: [
      {
        heading: 'Application Structure and The Factory Pattern',
        paragraphs: [
          'Beginner tutorials often create a single file with `app = Flask(__name__)` at global module scope. While fine for tiny scripts, this creates circular import errors when you introduce databases, background tasks, and automated tests.',
          'The industry standard is the Application Factory Pattern: you encapsulate app creation inside a `create_app(config_name)` function. This enables you to spin up separate instances with unique configurations for unit testing, continuous integration, and production deployment.',
        ],
      },
      {
        heading: 'Routing, URL Converters, and Request Handling',
        paragraphs: [
          'In Flask, routes are registered using the `@blueprint.route()` decorator. Flask supports typed URL converters including `<int:item_id>`, `<string:slug>`, and `<uuid:user_id>` that automatically parse and validate parameters before your function executes.',
          'Incoming request data is accessed via the global `request` proxy. Use `request.args` for query parameters (e.g. `?page=2`), `request.get_json()` for parsed JSON payloads, and `request.headers` for HTTP headers.',
        ],
      },
      {
        heading: 'Structured Error Handling and JSON Responses',
        paragraphs: [
          'Production APIs should never return default HTML 500 error pages to API consumers. Flask provides `@app.errorhandler()` to intercept specific exceptions (such as `404`, `400`, or custom business logic exceptions) and return standardized JSON error bodies.',
        ],
      },
    ],
    syntaxAndRules: {
      overview: 'Flask Blueprint and Route syntax.',
      rules: [
        'Always specify allowed HTTP methods explicitly: @api_bp.route("/items", methods=["GET", "POST"]).',
        'Use jsonify() or return a dictionary directly (Flask 2.0+) to serialize JSON responses.',
        'Return tuples of (data, status_code) to emit explicit HTTP status codes (e.g., return {"id": 1}, 201).',
      ],
      syntaxSnippet: 'from flask import Blueprint, jsonify, request\n\napi_bp = Blueprint("api_v1", __name__, url_prefix="/api/v1")\n\n@api_bp.route("/ping", methods=["GET"])\ndef ping():\n    return jsonify({"status": "pong"}), 200',
    },
    primaryCodeExample: {
      title: 'Production-Grade Flask Blueprint with CRUD & Validation',
      language: 'python',
      code: `from flask import Flask, Blueprint, request, jsonify

# 1. Create a Modular Blueprint for Products
products_bp = Blueprint("products", __name__, url_prefix="/api/products")

# In-memory data store for demonstration
DATABASE = {
    1: {"name": "Mechanical Keyboard", "price": 129.99, "stock": 14},
    2: {"name": "Wireless Ergonomic Mouse", "price": 79.50, "stock": 25}
}

@products_bp.route("", methods=["GET"])
def list_products():
    """Retrieve all products with optional max_price query filter."""
    max_price = request.args.get("max_price", type=float)
    results = list(DATABASE.values())
    if max_price is not None:
        results = [p for p in results if p["price"] <= max_price]
    return jsonify({"count": len(results), "products": results}), 200

@products_bp.route("/<int:product_id>", methods=["GET"])
def get_product(product_id: int):
    """Retrieve single product by integer ID."""
    product = DATABASE.get(product_id)
    if not product:
        return jsonify({"error": "ProductNotFound", "message": f"Product {product_id} does not exist"}), 404
    return jsonify(product), 200

@products_bp.route("", methods=["POST"])
def create_product():
    """Create a new product with input validation."""
    data = request.get_json(silent=True)
    if not data or "name" not in data or "price" not in data:
        return jsonify({"error": "ValidationError", "message": "Missing required 'name' or 'price'"}), 400
    
    new_id = max(DATABASE.keys()) + 1
    new_item = {
        "name": str(data["name"]),
        "price": float(data["price"]),
        "stock": int(data.get("stock", 0))
    }
    DATABASE[new_id] = new_item
    return jsonify({"id": new_id, "product": new_item}), 201

# 2. Application Factory
def create_app():
    app = Flask(__name__)
    app.register_blueprint(products_bp)
    
    @app.errorhandler(404)
    def handle_not_found(e):
        return jsonify({"error": "NotFound", "message": "The requested endpoint does not exist"}), 404
        
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=5000, debug=True)`,
      explanation: 'A fully functional Flask application structure featuring a Blueprint with URL converters, request validation, proper 201/400/404 HTTP codes, and an Application Factory.',
      expectedOutput: `* Serving Flask app 'create_app'
* Running on http://127.0.0.1:5000
GET /api/products returns 200 OK with list of products.
POST /api/products with valid JSON returns 201 Created.`,
      keyPoints: [
        'Blueprint encapsulates routes under url_prefix="/api/products".',
        '<int:product_id> automatically rejects non-numeric paths before calling get_product.',
        'Returning a tuple like (jsonify(...), 201) sets both the JSON payload and status code.',
      ],
    },
    codeExplanationOutsideBlock: {
      walkthrough: [
        'Line 4: A Blueprint named "products" is instantiated with a base URL prefix.',
        'Line 12: Route handling GET /api/products parses the optional query parameter ?max_price=... using request.args.get() with type casting.',
        'Line 20: Path converter <int:product_id> ensures product_id is received as a Python int.',
        'Line 24: If the item does not exist, an explicit JSON dictionary and 404 status code are returned.',
        'Line 28: POST handler parses JSON payload via request.get_json(silent=True) and verifies mandatory fields.',
        'Line 40: Upon successful creation, the new record and status code 201 Created are emitted.',
        'Line 43: create_app() registers the blueprint and configures a global 404 JSON handler.',
      ],
      flowOfExecution: 'When an HTTP request arrives, Flask checks the registered blueprint route rules, extracts path parameters, runs the function, and serializes the returned dictionary into an HTTP response string.',
    },
    commonMistakes: [
      {
        title: 'Forgetting methods=["POST"] on Route Decorators',
        incorrectCode: `@app.route("/api/submit")
def submit():
    return jsonify({"status": "received"})`,
        errorMessage: '405 Method Not Allowed (The method is not allowed for the requested URL)',
        whyItHappens: 'Flask routes default to accepting GET requests ONLY unless methods is explicitly declared.',
        correction: 'Add methods=["POST"] to the route decorator.',
        correctCode: `@app.route("/api/submit", methods=["POST"])
def submit():
    return jsonify({"status": "received"})`,
      },
    ],
    comparisons: {
      concept: 'Flask vs Django vs FastAPI',
      pythonComparison: 'Flask: Minimalist, explicit, unopinionated WSGI microframework. FastAPI: Modern asynchronous ASGI with automated OpenAPI docs and strict Pydantic typing. Django: "Batteries-included" monolith with built-in ORM, admin, and authentication.',
      javaComparison: 'Flask is philosophically similar to Java\'s Spark or Javalin microframeworks, contrasting with the expansive Spring Boot ecosystem.',
      cComparison: 'In C, routing requires custom string tokenization trees and manual HTTP header inspection.',
      cppComparison: 'Crow in C++ mirrors Flask\'s routing syntax almost verbatim: CROW_ROUTE(app, "/api/<int>")([&](int id){...}).',
      takeaway: 'Flask gives you maximum control and simplicity when you want to choose your own libraries.',
    },
    connections: {
      prerequisitesLearned: ['HTTP & REST Foundations', 'Python OOP'],
      leadsDirectlyTo: ['Django Full-Stack Tutorial', 'FastAPI Modern Async API Tutorial'],
    },
    summary: {
      takeaways: [
        'Flask is a WSGI microframework that gives you full architectural flexibility.',
        'Use Blueprints to organize your project into modular, reusable packages.',
        'Use the Application Factory pattern (create_app) for testability and clean configuration.',
        'Path converters (<int:id>) provide built-in URL parsing and validation.',
        'Always return structured JSON error payloads with correct HTTP status codes.',
      ],
      keyTermsToRemember: ['Flask', 'Microframework', 'Blueprint', 'Application Factory', 'Request Context', 'jsonify'],
    },
    inLessonKnowledgeChecks: [
      {
        id: 'chk-flask-1',
        question: 'What is the primary advantage of the Application Factory pattern in Flask over defining a global app = Flask(__name__)?',
        options: [
          'It makes the application run twice as fast on multi-core CPUs.',
          'It avoids circular import issues and allows creating multiple instances with different configurations for testing and production.',
          'It automatically connects to an SQL database without needing code.',
          'It compiles Python code into C machine code.',
        ],
        correctIndex: 1,
        explanation: 'Application factories allow you to instantiate fresh app instances with test database configs, isolating test runs from production state and eliminating circular imports.',
      },
    ],
    endOfTopicQuestions: [
      {
        id: 'q-flask-1',
        level: 'Basic',
        question: 'Explain what a Flask Blueprint is and why large applications should never register all routes directly onto the root "app" object.',
        answerExplanation: 'A Flask Blueprint is a modular grouping of related routes, static files, and templates. In large production apps with dozens of endpoints, registering everything onto a single global app file causes massive code clutter, circular imports between modules and models, and makes it impossible for multiple engineers to work on distinct domains independently.',
      },
      {
        id: 'q-flask-2',
        level: 'Intermediate',
        question: 'What happens when a client sends a POST request with invalid or malformed JSON to a Flask endpoint using request.get_json() without silent=True?',
        answerExplanation: 'By default, if the request body is not valid JSON or lacks the Content-Type: application/json header, request.get_json() raises a BadRequest (400) exception immediately, terminating execution of your view function. Setting silent=True causes it to return None instead of raising an error, allowing you to craft a custom error message.',
      },
    ],
  },

  // --- LESSON 12: DJANGO COMPREHENSIVE TUTORIAL ---
  {
    id: 'py-backend-django-tutorial',
    slug: 'django-framework-architecture-and-development',
    title: 'Django Framework: Full-Stack Architecture & ORM',
    languageId: 'python',
    moduleId: 'py-mod-backend',
    moduleTitle: 'Module 10: Flask, Django & FastAPI',
    order: 12,
    estimatedMinutes: 45,
    prerequisites: ['Python Backend Foundations', 'Object-Oriented Python'],
    learningObjectives: [
      'Understand Django\'s "batteries-included" philosophy and MVT (Model-View-Template) architectural pattern',
      'Master the Django project structure: manage.py, settings.py, and reusable apps',
      'Define database schemas using the Django ORM and manage schema migrations',
      'Leverage Django Admin, built-in Authentication, and Permissions out of the box',
      'Understand Django Middleware, security headers (CSRF, XSS), and deployment readiness',
    ],
    introduction: {
      whatIsIt: 'Django is a high-level, batteries-included Python web framework designed for rapid development and clean, pragmatic design. It provides an enterprise-ready ORM, automated admin panel, authentication engine, form validation, and security mitigations directly out of the box.',
      whyItMatters: 'Django is the dominant Python framework for large-scale enterprise web applications (powering Instagram, Spotify, Disqus, and Pinterest). Understanding Django teaches you how an integrated, mature web architecture handles database transactions, migrations, and user security.',
      whereItFitsInRoadmap: 'Second of the three Python backend framework tutorials, contrasting Flask\'s microframework approach with a comprehensive, monolithic framework.',
    },
    definitions: [
      {
        term: 'MVT (Model-View-Template)',
        definition: 'Django\'s architectural software pattern: Model manages data and database logic, View manages business logic and HTTP processing, and Template manages UI presentation.',
        beginnerExplanation: 'The three pillars of a Django app: Model talks to the database, View makes decisions, and Template draws the web page.',
      },
      {
        term: 'Django ORM',
        definition: 'Django\'s built-in Object-Relational Mapper that maps Python classes to database tables and translates Python query operations into optimized SQL statements.',
        beginnerExplanation: 'A tool that lets you query and save database records using plain Python objects without typing raw SQL queries.',
      },
      {
        term: 'Migrations',
        definition: 'Django\'s automated version control system for your database schema, propagating changes made in models.py into actual SQL table alterations.',
        beginnerExplanation: 'A Git-like history log for your database tables: whenever you add a field in Python, Django writes the ALTER TABLE SQL for you.',
      },
      {
        term: 'Django Admin',
        definition: 'An automatically generated, production-ready web interface for authenticated staff to inspect, create, update, and manage database records.',
        beginnerExplanation: 'An instant back-office management website for your data that Django creates for free with zero frontend code.',
      },
    ],
    detailedSections: [
      {
        heading: 'Projects vs Apps in Django',
        paragraphs: [
          'In Django, a "Project" represents the entire web application and its global configuration (`settings.py`, `urls.py`, `wsgi.py`).',
          'An "App" is a self-contained, modular sub-package that does something specific (e.g., `accounts`, `billing`, `blog`). A project is composed of multiple apps, and well-designed apps can even be reused across different projects.',
        ],
      },
      {
        heading: 'The Django ORM and Migration Workflow',
        paragraphs: [
          'To define a database table in Django, you create a class inheriting from `models.Model`. Each class attribute represents a database column with specific constraints (e.g. `CharField`, `IntegerField`, `ForeignKey`).',
          'Whenever you alter `models.py`, you run two commands: `python manage.py makemigrations` (which analyzes your model changes and generates a migration script in `migrations/`) and `python manage.py migrate` (which executes the corresponding SQL transaction against your database).',
        ],
      },
      {
        heading: 'Built-in Security & CSRF Defense',
        paragraphs: [
          'Django is secure by default. It provides built-in Cross-Site Request Forgery (CSRF) tokens for all forms, automatically escapes template strings to prevent Cross-Site Scripting (XSS), uses parameterized SQL queries to prevent SQL Injection, and hashes passwords using PBKDF2/bcrypt.',
        ],
      },
    ],
    syntaxAndRules: {
      overview: 'Django Model and View declaration syntax.',
      rules: [
        'Every model must inherit from django.db.models.Model.',
        'Never edit migration files manually unless performing advanced schema reconciliation.',
        'Always include {% csrf_token %} inside HTML POST forms.',
      ],
      syntaxSnippet: 'from django.db import models\n\nclass Article(models.Model):\n    title = models.CharField(max_length=200)\n    content = models.TextField()\n    published_at = models.DateTimeField(auto_now_add=True)\n    is_published = models.BooleanField(default=False)',
    },
    primaryCodeExample: {
      title: 'Django Model, Migration, and ORM Query Demonstration',
      language: 'python',
      code: `# models.py
from django.db import models
from django.contrib.auth.models import User

class CustomerAccount(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="account")
    tier = models.CharField(max_length=20, default="standard")
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} ({self.tier}) - Balance: \${self.balance}"

# views.py - Using the Django ORM to query data
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

def get_high_value_accounts(request):
    """Retrieve all accounts with balance over $1,000 using ORM filters."""
    # Django ORM generates: SELECT * FROM customer_account WHERE balance >= 1000.00;
    accounts = CustomerAccount.objects.filter(balance__gte=1000.00).select_related("user")
    
    data = [
        {
            "username": acc.user.username,
            "tier": acc.tier,
            "balance": float(acc.balance)
        }
        for acc in accounts
    ]
    return JsonResponse({"count": len(data), "accounts": data})`,
      explanation: 'Demonstrates a Django Model with relational foreign keys and decimal fields, followed by an ORM query utilizing the __gte lookup filter and select_related query optimization.',
      expectedOutput: `Generates parameterized SQL query behind the scenes and returns JSON response with filtered accounts.`,
      keyPoints: [
        'models.OneToOneField links CustomerAccount to Django\'s built-in User authentication model.',
        'balance__gte translates directly to "balance >= 1000.00" in SQL without string concatenation.',
        'select_related performs an SQL JOIN to fetch related user records in a single database query, avoiding N+1 query performance problems.',
      ],
    },
    codeExplanationOutsideBlock: {
      walkthrough: [
        'Line 5: CustomerAccount model inherits from models.Model.',
        'Line 6: OneToOneField establishes a relational link with the User model. on_delete=models.CASCADE guarantees that deleting a user automatically cleans up their account record.',
        'Line 8: DecimalField is used instead of FloatField to prevent floating-point rounding errors on currency.',
        'Line 20: CustomerAccount.objects.filter(balance__gte=1000.00) builds an SQL query lazily. It is only evaluated when iterated over.',
        'Line 20: select_related("user") prevents the N+1 query problem by executing a single INNER JOIN.',
      ],
      flowOfExecution: 'Django compiles the Python model into an SQL schema via migrations. When view runs, the ORM generates parameterized SQL, executes it against the database, and hydrates model instances.',
    },
    commonMistakes: [
      {
        title: 'The N+1 Query Anti-Pattern in ORMs',
        incorrectCode: `# N+1 performance disaster:
accounts = CustomerAccount.objects.all()
for acc in accounts:
    # Triggers a separate SQL query FOR EVERY SINGLE ROW in the loop!
    print(acc.user.email)`,
        whyItHappens: 'Django ORM relationships are lazy by default; accessing foreign keys inside loops triggers individual database queries.',
        correction: 'Use select_related() for single foreign keys or prefetch_related() for many-to-many relationships.',
        correctCode: `accounts = CustomerAccount.objects.select_related("user").all()
for acc in accounts:
    print(acc.user.email) # Already loaded in the initial JOIN!`,
      },
    ],
    comparisons: {
      concept: 'Django vs Flask Architectural Philosophy',
      pythonComparison: 'Django provides ORM, admin, auth, forms, migrations, and template engine built-in. Flask provides none of these by default, requiring you to assemble SQLAlchemy, Alembic, and Flask-Login manually.',
      javaComparison: 'Django is the Python counterpart to Spring Boot: both provide extensive enterprise infrastructure, ORMs (JPA/Hibernate vs Django ORM), and security frameworks.',
      cComparison: 'In C, relational database access requires writing direct libpq (PostgreSQL) C functions and manually serializing byte buffers.',
      cppComparison: 'C++ has no direct Django equivalent; modern C++ services typically use lightweight microframeworks paired with SQL drivers or query builders.',
      takeaway: 'Django is ideal when you need to build complex database-driven platforms quickly without reinventing administrative and authentication wheels.',
    },
    connections: {
      prerequisitesLearned: ['HTTP Foundations', 'Flask Tutorial'],
      leadsDirectlyTo: ['FastAPI Asynchronous Web Development', 'Databases & SQL Deep Dive'],
    },
    summary: {
      takeaways: [
        'Django follows the batteries-included MVT architectural pattern.',
        'Projects hold global configuration; Apps hold modular features.',
        'The Django ORM maps Python classes to SQL tables and prevents SQL injection.',
        'Migrations provide a version-controlled history of database schema changes.',
        'Use select_related to prevent N+1 query performance degradations.',
      ],
      keyTermsToRemember: ['Django', 'MVT', 'ORM', 'Migrations', 'Django Admin', 'select_related', 'CSRF'],
    },
    inLessonKnowledgeChecks: [
      {
        id: 'chk-dj-1',
        question: 'Which Django command applies pending database migration scripts to your active database schema?',
        options: [
          'python manage.py makemigrations',
          'python manage.py migrate',
          'python manage.py runserver',
          'python manage.py createsuperuser',
        ],
        correctIndex: 1,
        explanation: 'makemigrations creates the migration files from your Python models; "python manage.py migrate" actually executes the SQL against your database.',
      },
    ],
    endOfTopicQuestions: [
      {
        id: 'q-dj-1',
        level: 'Basic',
        question: 'Why should monetary amounts always be stored in a DecimalField rather than a FloatField in Django models?',
        answerExplanation: 'Floating-point numbers (IEEE 754) represent decimal numbers approximately in binary, leading to subtle precision and rounding errors (such as 0.1 + 0.2 = 0.30000000000000004). DecimalField uses exact fixed-point decimal arithmetic, ensuring financial transactions and currency calculations never lose or gain fractional cents.',
      },
    ],
  },

  // --- LESSON 13: FASTAPI COMPREHENSIVE TUTORIAL ---
  {
    id: 'py-backend-fastapi-tutorial',
    slug: 'fastapi-modern-asynchronous-api-development',
    title: 'FastAPI Framework: High-Performance Async APIs',
    languageId: 'python',
    moduleId: 'py-mod-backend',
    moduleTitle: 'Module 10: Flask, Django & FastAPI',
    order: 13,
    estimatedMinutes: 45,
    prerequisites: ['Python Backend Foundations', 'Functions & Type Annotations'],
    learningObjectives: [
      'Understand what FastAPI is and why it has rapidly become the standard for modern Python APIs',
      'Master Pydantic models for request body validation and response serialization',
      'Leverage Python 3.10+ type annotations for automatic data parsing, error reporting, and editor autocomplete',
      'Write high-concurrency asynchronous endpoints using async/await and ASGI servers (Uvicorn)',
      'Utilize FastAPI\'s Dependency Injection system for database sessions and authentication',
      'Explore automatic interactive OpenAPI (Swagger UI) documentation generated at /docs',
    ],
    introduction: {
      whatIsIt: 'FastAPI is a modern, high-performance web framework for building APIs with Python based on standard Python type hints, Pydantic for data validation, and Starlette/Uvicorn for asynchronous execution.',
      whyItMatters: 'FastAPI delivers speeds comparable to NodeJS and Go while offering automatic data validation, error messages, and live interactive Swagger UI documentation generated directly from your Python code without writing a single line of YAML.',
      whereItFitsInRoadmap: 'Completes the trio of Python backend frameworks, showcasing modern asynchronous web architecture and type-safe API contracts.',
    },
    definitions: [
      {
        term: 'FastAPI',
        definition: 'A high-performance asynchronous Python web framework built on Starlette and Pydantic that automatically generates OpenAPI specifications from type hints.',
        beginnerExplanation: 'A modern web framework that checks incoming data for errors automatically and builds an interactive website documentation page for you.',
      },
      {
        term: 'Pydantic',
        definition: 'A data validation and parsing library for Python that enforces type hints at runtime and converts messy inputs into verified Python objects.',
        beginnerExplanation: 'A strict bouncer at the club door: if incoming data does not have the right shape or types, Pydantic stops it before it ever reaches your code.',
      },
      {
        term: 'ASGI (Asynchronous Server Gateway Interface)',
        definition: 'The modern asynchronous successor to WSGI, enabling Python applications to handle thousands of concurrent WebSocket, HTTP/2, and long-polling connections.',
        beginnerExplanation: 'A highway with multiple fast-moving lanes that lets your server juggle many requests at once without freezing.',
      },
      {
        term: 'Dependency Injection (DI)',
        definition: 'A programming design pattern where a route handler declares its external requirements (like database connections or logged-in users) via `Depends()`, and the framework provides them.',
        beginnerExplanation: 'Instead of creating your own database connection inside every function, you declare "I need a database", and FastAPI plugs one in for you.',
      },
    ],
    detailedSections: [
      {
        heading: 'Why Type Hints Change Everything',
        paragraphs: [
          'In older frameworks like Flask, extracting an integer ID from a query parameter required manual casting (`int(request.args.get("id"))`) and try/except blocks to catch `ValueError`.',
          'In FastAPI, you write `item_id: int`. FastAPI reads the type annotation: it parses the incoming string, validates that it is an integer, casts it automatically, and if a user sends `"abc"`, FastAPI automatically returns an HTTP 422 Unprocessable Entity with a detailed JSON explanation pointing to the exact offending field.',
        ],
      },
      {
        heading: 'Asynchronous Concurrency: async def vs def',
        paragraphs: [
          'FastAPI natively supports both synchronous (`def`) and asynchronous (`async def`) endpoints. When you define an endpoint with `async def`, Python runs it on the event loop.',
          'Whenever your endpoint awaits an I/O operation (such as an external API call or an async database query via `await db.execute()`), the CPU does not sit idle. It immediately pauses your function, handles other incoming requests, and resumes your function the moment the database replies. This enables massive throughput with minimal RAM usage.',
        ],
      },
      {
        heading: 'Interactive Documentation: Swagger UI and ReDoc',
        paragraphs: [
          'Because FastAPI reads Python type annotations and Pydantic schemas, it automatically builds a machine-readable OpenAPI schema. Navigating to `/docs` in any browser opens an interactive Swagger UI where you and your frontend teammates can test every endpoint directly.',
        ],
      },
    ],
    syntaxAndRules: {
      overview: 'FastAPI Path Operation and Pydantic Model syntax.',
      rules: [
        'Use Pydantic BaseModel for request payloads (POST, PUT, PATCH).',
        'Use response_model=... in route decorators to filter out private fields (like hashed_password) from leaving your API.',
        'Run FastAPI apps using an ASGI server: uvicorn main:app --reload.',
      ],
      syntaxSnippet: 'from fastapi import FastAPI, Depends\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n\nclass Item(BaseModel):\n    name: str\n    price: float = Field(gt=0, description="Price must be strictly positive")\n\n@app.post("/items", status_code=201)\nasync def create_item(item: Item):\n    return item',
    },
    primaryCodeExample: {
      title: 'Complete FastAPI Microservice with Validation & Dependencies',
      language: 'python',
      code: `from fastapi import FastAPI, HTTPException, Depends, Query, status
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List

app = FastAPI(title="User & Security Service", version="1.0.0")

# 1. Pydantic Schemas
class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50, examples=["alex_dev"])
    email: EmailStr
    age: int = Field(ge=18, le=120, description="User must be of legal age")

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool = True

# In-memory database simulation
USERS_DB = {}

# 2. Dependency Injection for Security Token
def verify_api_key(x_api_key: Optional[str] = Query(None)):
    """Simulated security dependency."""
    if x_api_key != "secret-master-token":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing X-API-KEY header/query parameter"
        )
    return True

# 3. Path Operations
@app.post(
    "/api/users",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(verify_api_key)]
)
async def register_user(user_in: UserCreate):
    """Create a new user with automatic validation and security verification."""
    # Check for duplicate email
    for existing in USERS_DB.values():
        if existing["email"] == user_in.email:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A user with this email address already exists"
            )
            
    new_id = len(USERS_DB) + 1
    user_record = {
        "id": new_id,
        "username": user_in.username,
        "email": user_in.email,
        "age": user_in.age,
        "is_active": True
    }
    USERS_DB[new_id] = user_record
    return user_record

@app.get("/api/users", response_model=List[UserResponse])
async def list_users(limit: int = Query(10, ge=1, le=100)):
    """List registered users with limit pagination."""
    return list(USERS_DB.values())[:limit]`,
      explanation: 'A complete asynchronous FastAPI service demonstrating Pydantic validation (EmailStr, ge, le), response models, dependency injection security verification, and custom HTTPExceptions.',
      expectedOutput: `Uvicorn running on http://127.0.0.1:8000
Interactive Swagger UI available at http://127.0.0.1:8000/docs
Invalid payload triggers automatic 422 JSON response.`,
      keyPoints: [
        'UserCreate validates email syntax and ensures age is between 18 and 120.',
        'response_model=UserResponse ensures the internal age field is omitted from public output.',
        'dependencies=[Depends(verify_api_key)] automatically protects the endpoint before function execution.',
      ],
    },
    codeExplanationOutsideBlock: {
      walkthrough: [
        'Line 8-11: UserCreate inherits from Pydantic\'s BaseModel. It enforces string length constraints and email validity.',
        'Line 13-17: UserResponse defines the outbound contract.',
        'Line 23-30: verify_api_key is a dependency function. If the token is invalid, it raises an HTTPException(401).',
        'Line 33-38: Path operation decorator binds POST /api/users, status_code 201, and the security dependency.',
        'Line 40: "user_in: UserCreate" instructs FastAPI to read the JSON request body, validate it against UserCreate, and inject the parsed object.',
        'Line 60: limit: int = Query(10, ge=1, le=100) parses the URL query parameter ?limit=5 and validates it must be between 1 and 100.',
      ],
      flowOfExecution: 'FastAPI intercepts incoming HTTP requests on the Uvicorn ASGI server, runs dependencies, validates body fields, executes the async function, serializes the response model, and emits standard JSON.',
    },
    commonMistakes: [
      {
        title: 'Blocking the Async Event Loop with Synchronous Code',
        incorrectCode: `@app.get("/data")
async def fetch_data():
    import time
    time.sleep(5) # FATAL: Freezes the entire ASGI event loop for ALL users!
    return {"status": "done"}`,
        whyItHappens: 'Calling blocking functions (like time.sleep, requests.get, or synchronous database drivers) inside an "async def" pauses the single-threaded event loop, halting all other user requests.',
        correction: 'Use asynchronous equivalents (await asyncio.sleep(5), httpx.AsyncClient) or declare standard "def" so FastAPI automatically offloads it to a background threadpool.',
        correctCode: `@app.get("/data")
async def fetch_data():
    import asyncio
    await asyncio.sleep(5) # Non-blocking: other requests proceed!
    return {"status": "done"}`,
      },
    ],
    comparisons: {
      concept: 'FastAPI vs Traditional Frameworks',
      pythonComparison: 'FastAPI is natively asynchronous (ASGI), type-driven, and generates OpenAPI specs automatically. Flask is synchronous (WSGI) by default and unopinionated. Django is an all-in-one full-stack framework.',
      javaComparison: 'FastAPI\'s dependency injection and annotation style strongly resemble Spring Boot\'s @RestController and @RequestParam annotations.',
      cComparison: 'In C, high-performance concurrency requires manual epoll/kqueue event loops or POSIX pthreads.',
      cppComparison: 'Modern C++ frameworks (Crow/Drogon) also use async event loops, offering maximum raw performance at the cost of manual boilerplate.',
      takeaway: 'FastAPI represents the state-of-the-art for building Python microservices and modern REST APIs.',
    },
    connections: {
      prerequisitesLearned: ['HTTP Foundations', 'Flask', 'Django'],
      leadsDirectlyTo: ['Relational Databases, SQL & Preventing Injection', 'Authentication & Security'],
    },
    summary: {
      takeaways: [
        'FastAPI leverages Python type hints to deliver automatic validation, casting, and OpenAPI docs.',
        'Pydantic schemas define clean input and output contracts.',
        'ASGI and async/await enable high concurrency for I/O-bound operations.',
        'Dependency Injection (Depends) cleanly decouples authentication and database sessions.',
        'Interactive Swagger documentation is generated automatically at /docs.',
      ],
      keyTermsToRemember: ['FastAPI', 'Pydantic', 'ASGI', 'Uvicorn', 'Dependency Injection', 'OpenAPI', 'Swagger UI'],
    },
    inLessonKnowledgeChecks: [
      {
        id: 'chk-fastapi-1',
        question: 'What HTTP status code does FastAPI automatically return when a client sends invalid JSON that violates a Pydantic schema?',
        options: [
          '400 Bad Request',
          '422 Unprocessable Entity',
          '500 Internal Server Error',
          '200 OK with an error message',
        ],
        correctIndex: 1,
        explanation: 'FastAPI automatically returns 422 Unprocessable Entity with a structured JSON list of the exact fields and validation errors.',
      },
    ],
    endOfTopicQuestions: [
      {
        id: 'q-fastapi-1',
        level: 'Basic',
        question: 'What is the purpose of response_model in a FastAPI route decorator, and why is it important for security?',
        answerExplanation: 'response_model defines the schema used to filter and serialize outbound data. If your database user object contains sensitive attributes (such as `hashed_password` or internal verification tokens), specifying a `response_model=UserPublic` ensures that Pydantic automatically filters out those secret fields before the response leaves your server.',
      },
      {
        id: 'q-fastapi-2',
        level: 'Intermediate',
        question: 'Explain why putting a slow blocking function like `requests.get()` inside an `async def` route in FastAPI degrades performance for all connected users.',
        answerExplanation: 'In Python\'s async architecture, `async def` functions run on a single cooperative event loop thread. If a function executes synchronous blocking I/O (like `requests.get()` or `time.sleep()`), it does not yield control via `await`. Consequently, the entire event loop freezes, blocking all other concurrent requests until that single I/O operation finishes. In contrast, standard `def` routes in FastAPI are automatically offloaded to a background threadpool.',
      },
    ],
  },
];
