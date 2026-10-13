import { Lesson } from '../../types';

export const CPP_LESSONS: Lesson[] = [
  // --- LESSON 1: MODERN C++, RAII & OBJECT LIFETIME ---
  {
    id: 'cpp-raii-resource-management',
    slug: 'modern-cpp-raii-resource-management-and-smart-pointers',
    title: 'Modern C++: RAII, Object Lifetime & Smart Pointers',
    languageId: 'cpp',
    moduleId: 'cpp-mod-raii',
    moduleTitle: 'Module 1: Modern C++ Standards, RAII & Memory',
    order: 1,
    estimatedMinutes: 40,
    prerequisites: ['C Pointers & Memory Deep Dive', 'Basic Object-Oriented Programming'],
    learningObjectives: [
      'Master the core philosophy of RAII (Resource Acquisition Is Initialization)',
      'Explain how C++ destructors guarantee deterministic cleanup upon scope exit',
      'Eliminate manual malloc/free and new/delete using std::unique_ptr and std::shared_ptr',
      'Understand Move Semantics (std::move, rvalue references &&) and zero-cost resource transfers',
      'Compare modern C++ standards: C++11, C++14, C++17, and C++20 features',
    ],
    introduction: {
      whatIsIt: 'RAII (Resource Acquisition Is Initialization) is the foundational design idiom of modern C++. It binds the lifecycle of external resources (heap memory, database handles, file locks, network sockets) strictly to the lifetime of stack-allocated objects.',
      whyItMatters: 'In C, forgetting to call free() or fclose() causes memory leaks, and premature cleanup causes dangling pointers and crashes. Modern C++ solves this entirely through RAII: destructors execute automatically when variables leave scope—even if an unexpected exception is thrown!',
      whereItFitsInRoadmap: 'The defining milestone of modern C++, differentiating professional modern C++ (C++11 through C++20) from legacy "C with classes".',
    },
    definitions: [
      {
        term: 'RAII (Resource Acquisition Is Initialization)',
        definition: 'A C++ programming idiom where resources are acquired during object construction in the constructor and released during destruction in the destructor.',
        beginnerExplanation: 'An automatic check-out and return policy: when you borrow a book (construct), it is placed in your backpack; the moment you leave the library door (scope exit), it is returned automatically.',
      },
      {
        term: 'Destructor (~ClassName)',
        definition: 'A special member function invoked automatically and deterministically by the C++ compiler when an object leaves its enclosing scope.',
        beginnerExplanation: 'The automated cleanup crew that fires the exact millisecond an object dies.',
      },
      {
        term: 'std::unique_ptr',
        definition: 'A zero-overhead smart pointer that owns and manages a heap object exclusively, deleting the owned object automatically when the unique_ptr goes out of scope.',
        beginnerExplanation: 'A single, exclusive owner of a piece of memory. No two unique_ptrs can own the same object at once.',
      },
      {
        term: 'Move Semantics',
        definition: 'A C++11 feature enabling resources to be transferred ("moved") from one object to another without copying deep data buffers.',
        beginnerExplanation: 'Handing over the keys to a house rather than building an identical replica of the house brick by brick.',
      },
    ],
    detailedSections: [
      {
        heading: 'Deterministic Destruction vs Garbage Collection',
        paragraphs: [
          'In Java and Python, memory is reclaimed by an asynchronous Garbage Collector (GC). The GC runs at arbitrary intervals, meaning you cannot predict the exact moment an object will be freed. Consequently, non-memory resources (such as open file handles or database locks) require explicit `finally` blocks or context managers.',
          'In C++, destruction is deterministic: the moment execution passes the closing curly brace `}`, the compiler generates instructions to execute the destructor immediately. This makes C++ uniquely suited for real-time systems, audio engines, high-frequency trading, and game engines where GC pauses are unacceptable.',
        ],
      },
      {
        heading: 'Smart Pointers: Eliminating Raw Pointers in Modern C++',
        paragraphs: [
          'In modern C++ (C++11/14/17/20), you should almost never write `new` or `delete`. Instead, use standard library smart pointers:',
          '`std::unique_ptr`: Sole ownership. Use `std::make_unique<T>()`. Cannot be copied, only moved.',
          '`std::shared_ptr`: Shared reference-counted ownership. Deallocates when the last reference count drops to 0.',
          '`std::weak_ptr`: Non-owning observer of a shared_ptr, preventing circular reference memory leaks.',
        ],
      },
    ],
    syntaxAndRules: {
      overview: 'RAII and Smart Pointer declarations in Modern C++.',
      rules: [
        'Prefer std::make_unique<T>() and std::make_shared<T>() over raw "new".',
        'unique_ptr cannot be copied: copy constructors and copy assignment operators are deleted (= delete).',
        'Transfer ownership of unique_ptr using std::move().',
      ],
      syntaxSnippet: '#include <memory>\n\nauto ptr = std::make_unique<SocketConnection>("10.0.0.1", 8080);\n// Move ownership to another function:\nprocess_socket(std::move(ptr));',
    },
    primaryCodeExample: {
      title: 'RAII File Guard and Smart Pointer Memory Management Demo',
      language: 'cpp',
      code: `#include <iostream>
#include <memory>
#include <string>
#include <vector>

// 1. Custom RAII Resource Wrapper
class ScopedLogger {
private:
    std::string channel_name;
public:
    ScopedLogger(std::string name) : channel_name(std::move(name)) {
        std::cout << "[ACQUIRE] Logger Channel '" << channel_name << "' initialized.\\n";
    }

    ~ScopedLogger() {
        std::cout << "[RELEASE] Logger Channel '" << channel_name << "' cleanly destroyed via RAII!\\n";
    }

    void write_log(const std::string& message) {
        std::cout << "  [" << channel_name << "] " << message << "\\n";
    }
};

// 2. Demonstration of unique_ptr and deterministic destruction
void demonstrate_scope() {
    std::cout << "-> Entering demonstrate_scope()...\\n";

    // Allocate on Heap with std::unique_ptr (C++14 std::make_unique)
    auto logger = std::make_unique<ScopedLogger>("SecurityAudit");
    logger->write_log("Analyzing TLS handshakes...");

    // Transferring ownership via std::move
    std::unique_ptr<ScopedLogger> transferred = std::move(logger);
    
    if (!logger) {
        std::cout << "  (logger is now null after move transfer)\\n";
    }
    transferred->write_log("Audit complete. Scope about to terminate.");

    std::cout << "-> Exiting demonstrate_scope()...\\n";
    // At this exact line, transferred leaves scope and ~ScopedLogger() runs automatically!
}

int main() {
    std::cout << "=== Modern C++ RAII Execution Demo ===\\n";
    demonstrate_scope();
    std::cout << "-> Returned to main(). All resources guaranteed freed.\\n";
    return 0;
}`,
      explanation: 'Illustrates how custom RAII wrappers and std::unique_ptr guarantee that destructors fire the exact millisecond their containing scope ends, transferring resource ownership safely via std::move.',
      expectedOutput: `=== Modern C++ RAII Execution Demo ===
-> Entering demonstrate_scope()...
[ACQUIRE] Logger Channel 'SecurityAudit' initialized.
  [SecurityAudit] Analyzing TLS handshakes...
  (logger is now null after move transfer)
  [SecurityAudit] Audit complete. Scope about to terminate.
-> Exiting demonstrate_scope()...
[RELEASE] Logger Channel 'SecurityAudit' cleanly destroyed via RAII!
-> Returned to main(). All resources guaranteed freed.`,
      keyPoints: [
        'ScopedLogger destructor ~ScopedLogger() runs without any explicit delete call.',
        'std::move transfers the heap pointer from logger to transferred without deep copying.',
        'Destruction order is deterministic and guaranteed even if exceptions occur.',
      ],
    },
    codeExplanationOutsideBlock: {
      walkthrough: [
        'Line 8-20: ScopedLogger defines a constructor that acquires a channel and a destructor (~ScopedLogger) that prints release information.',
        'Line 28: std::make_unique<ScopedLogger>("SecurityAudit") allocates the object on the Heap and assigns ownership to a stack-allocated unique_ptr.',
        'Line 32: std::move(logger) casts the pointer to an rvalue reference, transferring the heap address to "transferred" and nullifying "logger".',
        'Line 40: As demonstrate_scope() exits, the stack frame unwinds. The destructor of "transferred" is called immediately.',
      ],
      flowOfExecution: 'Sequential function call demonstrating stack allocation, heap ownership transfer, and automatic deterministic destructor invocation on scope exit.',
    },
    commonMistakes: [
      {
        title: 'Attempting to Copy a std::unique_ptr',
        incorrectCode: `auto p1 = std::make_unique<int>(42);
auto p2 = p1; // COMPILE ERROR: unique_ptr copy constructor is deleted!`,
        errorMessage: 'error: use of deleted function \'std::unique_ptr<T>::unique_ptr(const std::unique_ptr<T>&)\'',
        whyItHappens: 'unique_ptr models exclusive ownership. If two pointers owned the same resource, both would attempt to delete it upon exiting, triggering a fatal Double Free error.',
        correction: 'Use std::move(p1) to transfer ownership, or use std::shared_ptr if true shared ownership is intended.',
        correctCode: `auto p2 = std::move(p1);`,
      },
    ],
    comparisons: {
      concept: 'Resource Management Paradigms',
      pythonComparison: 'Python uses reference counting plus a cycle-detecting Garbage Collector. Finalizers (__del__) are non-deterministic and discouraged; context managers (with) are used instead.',
      javaComparison: 'Java uses tracing Garbage Collection (G1, ZGC). Memory cannot leak via dangling pointers, but unclosed resources require try-with-resources.',
      cComparison: 'C requires 100% manual malloc() and free(). Every resource failure branch must be manually inspected to prevent leaks.',
      cppComparison: 'C++ RAII provides automatic, deterministic cleanup tied to variable scope with zero runtime performance cost.',
      takeaway: 'Modern C++ solves C\'s memory leakage problem without incurring the latency penalties of a virtual machine garbage collector.',
    },
    connections: {
      prerequisitesLearned: ['C Pointers & Memory'],
      leadsDirectlyTo: ['C++ High-Performance Backend (Crow)', 'C vs C++ Comprehensive Comparison'],
    },
    summary: {
      takeaways: [
        'RAII binds resource lifecycles strictly to stack variable scope.',
        'Destructors (~Class) execute deterministically on scope exit.',
        'Smart pointers (std::unique_ptr, std::shared_ptr) replace manual delete.',
        'Move semantics (std::move) allow zero-overhead ownership transfers.',
      ],
      keyTermsToRemember: ['RAII', 'Destructor', 'std::unique_ptr', 'std::shared_ptr', 'Move Semantics', 'Deterministic Destruction'],
    },
    inLessonKnowledgeChecks: [
      {
        id: 'chk-cpp-raii-1',
        question: 'When is the destructor of an object wrapped in a std::unique_ptr executed?',
        options: [
          'Whenever the operating system garbage collector wakes up',
          'At the exact moment the std::unique_ptr goes out of scope',
          'Only when the computer reboots',
          'Only when manual delete is called on the raw pointer',
        ],
        correctIndex: 1,
        explanation: 'std::unique_ptr uses RAII: its destructor is invoked deterministically at the exact instant it leaves its enclosing block scope.',
      },
    ],
    endOfTopicQuestions: [
      {
        id: 'q-cpp-raii-1',
        level: 'Basic',
        question: 'Explain why copy constructors are deleted in std::unique_ptr and how ownership is transferred instead.',
        answerExplanation: 'std::unique_ptr represents exclusive, single ownership of a heap resource. If copying were permitted, two distinct pointers would hold the same heap address. When both pointers left scope, both destructors would attempt to call delete on the same address, resulting in an undefined behavior crash known as a Double Free. Therefore, copying is explicitly banned, and ownership can only be transferred using move semantics via `std::move()`.',
      },
    ],
  },

  // --- LESSON 2: C VS C++ COMPREHENSIVE COMPARISON ---
  {
    id: 'cpp-c-vs-cpp-comparison',
    slug: 'c-versus-cpp-architectural-comparison-and-tradeoffs',
    title: 'C versus C++: Comprehensive Architectural Comparison',
    languageId: 'cpp',
    moduleId: 'cpp-mod-comparison',
    moduleTitle: 'Module 2: C vs C++ Paradigms & Systems',
    order: 2,
    estimatedMinutes: 35,
    prerequisites: ['Pointers & Memory in C', 'Modern C++ & RAII'],
    learningObjectives: [
      'Understand the historical and architectural evolution from C to modern C++',
      'Compare Type Systems: C weakly-typed void pointers vs C++ strict static typing, templates, and type inference',
      'Analyze Memory Management: C manual malloc/free vs C++ RAII, constructors, destructors, and smart pointers',
      'Compare Abstraction Levels: C structs and function pointers vs C++ classes, polymorphism, and templates',
      'Understand why C++ is not "strictly better" than C, and why C remains dominant in OS kernels, embedded firmware, and hypervisors',
    ],
    introduction: {
      whatIsIt: 'While C++ began its life in 1979 as "C with Classes", modern C and modern C++ are two fundamentally distinct programming languages with divergent design philosophies, type systems, and standard libraries.',
      whyItMatters: 'A widespread misconception among beginner programmers is that C++ is simply a "better version of C". In reality, the Linux kernel, Git, PostgreSQL, Redis, and embedded microcontrollers are written in pure C by deliberate architectural choice. Understanding their nuanced trade-offs is essential for systems engineers.',
      whereItFitsInRoadmap: 'Synthesizes everything learned across both the C and C++ pathways into a clear comparative framework.',
    },
    definitions: [
      {
        term: 'Zero-Overhead Principle (C++)',
        definition: 'Bjarne Stroustrup\'s guiding design rule: "What you don\'t use, you don\'t pay for. And what you do use, you couldn\'t hand-code any better."',
        beginnerExplanation: 'C++ abstractions like templates and classes compile down to machine code that is just as fast as hand-written C assembly.',
      },
      {
        term: 'Name Mangling',
        definition: 'A compiler technique in C++ where the compiler embeds parameter types into symbol names in object files to support function overloading, unlike C\'s raw symbols.',
        beginnerExplanation: 'C names a function simply "calculate". C++ names it "_Z9calculateid" so it can tell apart calculate(int) from calculate(double).',
      },
      {
        term: 'ABI (Application Binary Interface)',
        definition: 'The low-level binary contract between compiled programs and libraries governing register usage, stack alignment, and symbol linkage.',
        beginnerExplanation: 'The unwritten physical handshake rulebook that allows compiled machine code from different compilers to work together without crashing.',
      },
    ],
    detailedSections: [
      {
        heading: 'Philosophical Divide: Simplicity vs Expressiveness',
        paragraphs: [
          'The C philosophy is radical simplicity: Dennis Ritchie designed C to be a thin layer above assembly language. The entire C language specification fits in approximately 200 pages. A competent engineer can understand every single feature of C. There are no classes, no templates, no operator overloading, and no exceptions.',
          'The C++ philosophy is uncompromising expressiveness with zero-overhead abstraction: Bjarne Stroustrup created C++ to combine the low-level efficiency of C with powerful abstractions. The C++ standard spans over 1,800 pages, featuring multiple inheritance, templates, metaprogramming, concepts, coroutines, and constexpr evaluation.',
        ],
      },
      {
        heading: 'Why Linux, Redis, and Git Choose C Over C++',
        paragraphs: [
          'If C++ provides RAII, type safety, and the Standard Template Library, why does the Linux kernel reject C++? Linus Torvalds and systems architects favor C for several concrete reasons:',
          '1. Explicit Control: In C, a single statement does exactly what it appears to do on the screen. There are no hidden constructor calls, no hidden copy operations, and no hidden memory allocations.',
          '2. Stable ABI: C has a rock-solid, universally standardized C ABI. Code compiled in C in 1995 can be linked against code compiled in 2026. C++ lacks a standardized ABI; different compiler versions often produce incompatible symbols.',
          '3. Portability to Obscure Hardware: Every microcontroller, DSP chip, and novel architecture gets a working C compiler first.',
        ],
      },
    ],
    syntaxAndRules: {
      overview: 'Direct side-by-side syntax differences between C and C++.',
      rules: [
        'C allows implicit conversion from void* to typed pointers; C++ strictly requires an explicit cast.',
        'C supports designated initializers and variable-length arrays (VLAs); C++ standardizes std::vector.',
        'In C++, structs are identical to classes except default member access is public.',
      ],
      syntaxSnippet: '// Memory allocation comparison:\n// C:\nint *arr = malloc(sizeof(int) * 10);\nfree(arr);\n\n// C++:\nauto arr = std::make_unique<std::vector<int>>(10); // Automatically freed!',
    },
    primaryCodeExample: {
      title: 'Architectural Comparison: Dynamic Array in C vs Modern C++',
      language: 'cpp',
      code: `// ==========================================
// 1. C-STYLE APPROACH (Manual Resource Management)
// ==========================================
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} CDynamicArray;

void c_array_init(CDynamicArray *arr, size_t initial_cap) {
    arr->data = (int *)malloc(sizeof(int) * initial_cap);
    arr->size = 0;
    arr->capacity = initial_cap;
}

void c_array_push(CDynamicArray *arr, int val) {
    if (arr->size >= arr->capacity) {
        arr->capacity *= 2;
        arr->data = (int *)realloc(arr->data, sizeof(int) * arr->capacity);
    }
    arr->data[arr->size++] = val;
}

void c_array_free(CDynamicArray *arr) {
    free(arr->data);
    arr->data = NULL;
    arr->size = 0;
}

// ==========================================
// 2. MODERN C++ APPROACH (RAII & STL Container)
// ==========================================
#include <iostream>
#include <vector>
#include <numeric>

void cpp_demonstration() {
    // std::vector handles reallocation, heap memory, and cleanup automatically via RAII
    std::vector<int> numbers;
    numbers.reserve(4);

    numbers.push_back(100);
    numbers.push_back(200);
    numbers.push_back(300);

    // Modern C++ algorithms and range-based loops
    std::cout << "C++ Elements: ";
    for (const auto& num : numbers) {
        std::cout << num << " ";
    }
    std::cout << "\\n";
    // Zero memory leaks: numbers automatically calls its destructor here!
}

int main() {
    printf("=== Testing C Array ===\\n");
    CDynamicArray c_arr;
    c_array_init(&c_arr, 2);
    c_array_push(&c_arr, 10);
    c_array_push(&c_arr, 20);
    printf("C Array elements: %d, %d\\n", c_arr.data[0], c_arr.data[1]);
    c_array_free(&c_arr); // Mandatory: forgetting this leaks memory!

    printf("\\n=== Testing C++ Vector ===\\n");
    cpp_demonstration();

    return 0;
}`,
      explanation: 'Contrasts the mechanical boilerplate of manual heap management and realloc in C against modern C++ std::vector with RAII and range-for loops.',
      expectedOutput: `=== Testing C Array ===
C Array elements: 10, 20

=== Testing C++ Vector ===
C++ Elements: 100 200 300`,
      keyPoints: [
        'C requires manual allocation, realloc bounds checking, and explicit free calls.',
        'C++ std::vector encapsulates all heap management inside RAII constructors and destructors.',
        'C provides total transparency into every byte; C++ provides safety and concise expressiveness.',
      ],
    },
    codeExplanationOutsideBlock: {
      walkthrough: [
        'Line 9-33: C dynamic array requires a struct, explicit init function with malloc(), push function with realloc(), and free function.',
        'Line 41-55: C++ replaces all 25 lines of C boilerplate with standard std::vector<int>, guaranteeing leak-free cleanup.',
        'Line 63: Notice the danger in C: if the programmer returns early or forgets c_array_free(&c_arr), the heap memory is permanently leaked.',
      ],
      flowOfExecution: 'Shows the exact mental load difference: C requires manual lifecycle bookkeeping; C++ automates lifecycle through RAII.',
    },
    commonMistakes: [
      {
        title: 'Treating C++ as "C with cout and classes"',
        incorrectCode: `// Bad C++:
int *buffer = (int*)malloc(sizeof(int) * 100);
// do work
free(buffer);`,
        whyItHappens: 'Programmers transition from C to C++ and write manual malloc/free instead of leveraging smart pointers or std::vector.',
        correction: 'Use std::vector or std::make_unique in C++.',
        correctCode: `auto buffer = std::make_unique<std::array<int, 100>>();`,
      },
    ],
    comparisons: {
      concept: 'C vs C++ Direct Feature Matrix',
      pythonComparison: 'Python is implemented in pure C (CPython) because C\'s stable ABI and simplicity make it trivial to embed inside other software.',
      javaComparison: 'The OpenJDK HotSpot JVM is written in C++ to leverage OOP abstractions while maintaining native hardware execution speed.',
      cComparison: 'Best for: Operating system kernels, device drivers, embedded firmware, cryptography primitives, and shared binary libraries.',
      cppComparison: 'Best for: Game engines (Unreal), high-frequency trading platforms, browser engines (Chromium/V8), and high-throughput backend services.',
      takeaway: 'Neither language is universally superior; each is optimized for different systems engineering priorities.',
    },
    connections: {
      prerequisitesLearned: ['C Pointers', 'Modern C++ RAII'],
      leadsDirectlyTo: ['Cybersecurity & Ethical Hacking across Python, Java, C, and C++'],
    },
    summary: {
      takeaways: [
        'C focuses on radical simplicity, explicit hardware control, and universal ABI stability.',
        'C++ focuses on zero-overhead abstraction, type safety, and RAII resource automation.',
        'C lacks destructors, templates, and overloading; C++ provides a vast multi-paradigm toolbox.',
        'Modern C++ eliminates manual memory management through smart pointers and STL containers.',
      ],
      keyTermsToRemember: ['Zero-Overhead Principle', 'Name Mangling', 'Application Binary Interface (ABI)', 'std::vector', 'Explicit Control'],
    },
    inLessonKnowledgeChecks: [
      {
        id: 'chk-c-vs-cpp-1',
        question: 'Why is pure C often preferred over C++ for operating system kernels like Linux?',
        options: [
          'Because C is slower than C++.',
          'Because C has no hidden memory allocations, no implicit constructor calls, and a universally stable ABI across all compiler toolchains.',
          'Because C++ cannot execute on x86 processors.',
          'Because C does not use computer RAM.',
        ],
        correctIndex: 1,
        explanation: 'Operating system kernels require absolute transparency: every instruction must be explicit, and there cannot be hidden runtime mechanisms or compiler ABI incompatibilities.',
      },
    ],
    endOfTopicQuestions: [
      {
        id: 'q-c-vs-cpp-1',
        level: 'Basic',
        question: 'What is the "Zero-Overhead Principle" in C++ design?',
        answerExplanation: 'The Zero-Overhead Principle, formulated by Bjarne Stroustrup, states that: (1) what you do not use in the language, you do not pay for in runtime performance or memory overhead; and (2) what you do use, you could not hand-code any more efficiently in raw assembly or C.',
      },
    ],
  },
];
