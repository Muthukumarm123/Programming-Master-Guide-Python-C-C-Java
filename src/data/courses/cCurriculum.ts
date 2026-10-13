import { Lesson } from '../../types';

export const C_LESSONS: Lesson[] = [
  // --- LESSON 1: C COMPILATION PIPELINE & BUILD PROCESS ---
  {
    id: 'c-env-compilation',
    slug: 'c-compilation-stages-toolchains-and-linking',
    title: 'The C Build Pipeline: Preprocessing, Compiling, Assembly & Linking',
    languageId: 'c',
    moduleId: 'c-mod-foundations',
    moduleTitle: 'Module 1: C Toolchains & Compilation Pipeline',
    order: 1,
    estimatedMinutes: 30,
    prerequisites: ['Basic terminal navigation'],
    learningObjectives: [
      'Deconstruct the 4 sequential stages of the C compilation pipeline: Preprocessing, Compilation, Assembly, and Linking',
      'Explain compiler toolchains: GCC, Clang (LLVM), and MSVC',
      'Inspect intermediate compiler output files (.i, .s, .o, and executables)',
      'Understand the role of header files (.h) vs implementation files (.c)',
      'Configure compiler warning flags (-Wall, -Wextra, -pedantic, -Werror) for strict quality control',
    ],
    introduction: {
      whatIsIt: 'C is a compiled, imperative, procedural systems programming language created by Dennis Ritchie in 1972. This lesson examines how human C code is transformed through four distinct toolchain stages into raw binary CPU machine instructions.',
      whyItMatters: 'Unlike Python or Java, C has no runtime interpreter, no virtual machine, and no garbage collector. When you write C, you are speaking directly to operating system syscalls and physical computer memory. Understanding the build pipeline is essential for diagnosing compiler warnings, linker errors, and undefined references.',
      whereItFitsInRoadmap: 'First lesson in the C systems pathway, establishing the mechanical compilation model before diving into syntax and memory pointers.',
    },
    definitions: [
      {
        term: 'Preprocessor',
        definition: 'The initial stage of the C compiler that processes directives starting with # (such as #include, #define, #ifdef) via text substitution before compilation begins.',
        beginnerExplanation: 'A sophisticated search-and-replace text engine that copies header files and expands macros into your code before the real compiler looks at it.',
        relatedTerm: 'Compiler',
      },
      {
        term: 'Object File (.o / .obj)',
        definition: 'An intermediate binary file containing machine code instructions generated from a single C translation unit, with unresolved references to external symbols.',
        beginnerExplanation: 'A compiled piece of a jigsaw puzzle that has machine instructions ready, but hasn\'t yet been glued together with other pieces.',
        relatedTerm: 'Linker',
      },
      {
        term: 'Linker (ld)',
        definition: 'The final utility in the build toolchain that combines multiple object files with static or dynamic libraries into a single executable binary.',
        beginnerExplanation: 'The assembler who takes all your compiled puzzle pieces and the C standard library and connects all function calls together into an executable file.',
      },
      {
        term: 'Translation Unit',
        definition: 'The ultimate source code stream fed into the compiler after the preprocessor has expanded all #include files and macros for a single .c file.',
        beginnerExplanation: 'A single, fully expanded .c file with all included headers pasted inside it.',
      },
    ],
    detailedSections: [
      {
        heading: 'The Four Stages of C Compilation',
        paragraphs: [
          'When you run a command like `gcc -O2 main.c -o program`, four distinct programs execute behind the scenes:',
          '1. Preprocessing (`cpp`): Strips comments, replaces `#define` macros, and recursively pastes the contents of `#include <stdio.h>` directly into the file. Outputs an expanded `.i` file.',
          '2. Compilation proper (`cc1`): Parses C syntax into an Abstract Syntax Tree (AST), performs optimizations, and translates the code into assembly language instructions tailored to your specific CPU. Outputs an `.s` assembly file.',
          '3. Assembly (`as`): Translates assembly instructions into raw binary machine code opcodes. Outputs an unlinked object file (`.o`).',
          '4. Linking (`ld`): Connects function calls (such as `printf`) to their implementations in `libc`, resolves memory offsets, and emits the final executable program.',
        ],
      },
      {
        heading: 'Compiler Flags: Why -Wall -Wextra Save Lives',
        paragraphs: [
          'By default, C compilers will silently compile dangerous code that invokes Undefined Behaviour. Professional C software is always compiled with strict warning flags enabled:',
          '`-Wall`: Enables all common compiler warnings.',
          '`-Wextra`: Enables additional aggressive warning checks for unused parameters and signed/unsigned comparison mismatches.',
          '`-Werror`: Treats all warnings as fatal build errors, preventing buggy code from compiling.',
          '`-fsanitize=address`: Injects runtime AddressSanitizer checks to catch memory corruption instantly.',
        ],
      },
    ],
    syntaxAndRules: {
      overview: 'Standard C program entry point and preprocessor directives.',
      rules: [
        'Preprocessing directives must begin with # as the first non-whitespace character on a line.',
        'The main function signature must return int: int main(void) or int main(int argc, char *argv[]).',
        'C statements must terminate with a semicolon (;).',
      ],
      syntaxSnippet: '#include <stdio.h>\n\nint main(void) {\n    printf("Pipeline Verified\\n");\n    return 0; // Return code 0 indicates success to the OS\n}',
    },
    primaryCodeExample: {
      title: 'C Modular Compilation: Header and Source Demonstration',
      language: 'c',
      code: `// --- math_ops.h (Header interface) ---
#ifndef MATH_OPS_H
#define MATH_OPS_H

// Function prototype: tells the compiler the function signature exists
int multiply_and_clamp(int value, int factor, int max_limit);

#endif // MATH_OPS_H

// --- math_ops.c (Implementation) ---
#include "math_ops.h"

int multiply_and_clamp(int value, int factor, int max_limit) {
    long result = (long)value * factor;
    if (result > max_limit) {
        return max_limit;
    }
    return (int)result;
}

// --- main.c (Application Entry Point) ---
#include <stdio.h>
#include "math_ops.h"

int main(void) {
    int input_val = 25;
    int factor = 6;
    int limit = 100;

    int output = multiply_and_clamp(input_val, factor, limit);

    printf("Input: %d * %d (Clamped to %d) = %d\\n", input_val, factor, limit, output);
    return 0;
}`,
      explanation: 'Demonstrates professional C code organization using header guards (#ifndef / #define), function prototypes, header inclusion, and modular multi-file compilation.',
      expectedOutput: `Input: 25 * 6 (Clamped to 100) = 100`,
      keyPoints: [
        '#ifndef MATH_OPS_H prevents header files from being included multiple times in the same translation unit.',
        'gcc -Wall -Wextra -c math_ops.c emits math_ops.o.',
        'gcc -Wall -Wextra -c main.c emits main.o.',
        'gcc math_ops.o main.o -o program links the two object files into the final binary.',
      ],
    },
    codeExplanationOutsideBlock: {
      walkthrough: [
        'Line 2-7: Header guard macro MATH_OPS_H ensures idempotence if included multiple times.',
        'Line 5: Function prototype declares return type and parameters so main.c can verify types at compile time without knowing the implementation.',
        'Line 10-17: math_ops.c implements the logic. Notice the type cast to long to prevent intermediate integer overflow before clamping.',
        'Line 20-30: main.c includes math_ops.h and invokes the function. The linker connects the call in main.o to the machine code in math_ops.o.',
      ],
      flowOfExecution: 'main() initializes stack integers, calls multiply_and_clamp(), computes the clamped product, and calls printf() before returning 0 to the parent OS shell.',
    },
    commonMistakes: [
      {
        title: 'Including a .c File Directly Instead of a .h File',
        incorrectCode: `#include "math_ops.c" // WRONG: Never include implementation files!`,
        whyItHappens: 'Beginners try to make the code compile in one command without understanding linking.',
        correction: 'Include only the .h header file, and compile both .c files together or link their .o object files.',
        correctCode: `#include "math_ops.h"`,
      },
      {
        title: 'Missing Header Guards Triggering Redefinition Errors',
        errorMessage: 'error: redefinition of \'struct DeviceConfig\'',
        whyItHappens: 'When multiple headers include a common header file without guards, the preprocessor pastes the struct definition multiple times into the same translation unit.',
        correction: 'Always wrap headers in #ifndef HEADER_H / #define HEADER_H / #endif or use #pragma once.',
      },
    ],
    comparisons: {
      concept: 'Compilation and Linking Across Languages',
      pythonComparison: 'Python imports are dynamic and resolved at runtime. No preprocessing or ahead-of-time linking step.',
      javaComparison: 'Java compiles .java to .class bytecode. The JVM ClassLoader handles dynamic linking at runtime when classes are first referenced.',
      cComparison: 'C requires static or dynamic linking ahead of time before the OS can launch the process. Linking errors (undefined symbol) occur before any code executes.',
      cppComparison: 'C++ uses the same 4-stage pipeline as C, with name-mangling during compilation to support function overloading and templates.',
      takeaway: 'Understanding linking in C demystifies how computer programs are constructed from multiple files.',
    },
    connections: {
      prerequisitesLearned: ['Terminal basics'],
      leadsDirectlyTo: ['C Fundamentals & Syntax', 'Pointers and Memory Addresses Deep Dive'],
    },
    summary: {
      takeaways: [
        'C compilation progresses through 4 stages: Preprocess -> Compile -> Assemble -> Link.',
        'Headers (.h) declare function prototypes; source files (.c) provide implementations.',
        'Header guards (#ifndef / #define) prevent duplicate symbol errors.',
        'Always compile with -Wall -Wextra to let the compiler catch subtle bugs.',
      ],
      keyTermsToRemember: ['Preprocessor', 'Compiler', 'Assembler', 'Linker', 'Object File', 'Header Guard', 'Translation Unit'],
    },
    inLessonKnowledgeChecks: [
      {
        id: 'chk-c-build-1',
        question: 'Which stage of the C build pipeline replaces #include directives with the actual contents of the referenced header file?',
        options: [
          'The Assembler',
          'The Preprocessor',
          'The Linker',
          'The CPU instruction decoder',
        ],
        correctIndex: 1,
        explanation: 'The Preprocessor handles all directives beginning with # via pure textual replacement before the actual compiler analyzes the C syntax.',
      },
    ],
    endOfTopicQuestions: [
      {
        id: 'q-c-build-1',
        level: 'Basic',
        question: 'What is the purpose of header guards (#ifndef / #define / #endif) in C header files?',
        answerExplanation: 'Header guards prevent a header file from being included multiple times within the same translation unit. If a header is included multiple times without guards, type definitions, struct definitions, and typedefs are duplicated in the preprocessed output, resulting in compilation errors due to duplicate symbol definitions.',
      },
    ],
  },

  // --- LESSON 2: POINTERS & MEMORY DEEP DIVE (CORE C TOPIC) ---
  {
    id: 'c-pointers-deep-dive',
    slug: 'c-pointers-memory-addresses-and-dereferencing',
    title: 'Pointers & Memory: The Comprehensive C Guide',
    languageId: 'c',
    moduleId: 'c-mod-memory',
    moduleTitle: 'Module 2: Pointers, Memory & Dynamic Allocation',
    order: 2,
    estimatedMinutes: 45,
    prerequisites: ['The C Build Pipeline', 'C Fundamentals & Syntax'],
    learningObjectives: [
      'Master the conceptual model of computer RAM as a contiguous byte-addressable array',
      'Explain pointer variables, memory addresses, the address-of operator (&), and dereference operator (*)',
      'Understand pointer arithmetic and how the compiler calculates byte offsets based on data types',
      'Deconstruct the relationship between C arrays and pointers (array decay)',
      'Master pointers-to-pointers (double pointers, int **ptr) and why they are used to mutate pointers in functions',
      'Understand NULL pointers, void pointers, and the severe consequences of dereferencing invalid memory',
    ],
    introduction: {
      whatIsIt: 'A pointer is a variable that stores the memory address of another variable or resource in computer RAM. This lesson provides an exhaustive, thorough explanation of pointers, dereferencing, pointer arithmetic, and memory addressing in C.',
      whyItMatters: 'Pointers are the defining feature of C. They enable pass-by-reference semantics, high-performance data structures (linked lists, trees), direct hardware register control, and dynamic heap memory allocation. You cannot master operating systems, device drivers, or cybersecurity without a complete understanding of pointers.',
      whereItFitsInRoadmap: 'The absolute core of the C curriculum. All subsequent modules (Dynamic Memory, Systems Programming, Cybersecurity) depend directly on the principles taught here.',
    },
    definitions: [
      {
        term: 'Memory Address',
        definition: 'A numerical value representing a specific byte location in physical or virtual random-access memory (RAM). Typically formatted in hexadecimal (e.g. `0x7ffd5e3a8904`).',
        beginnerExplanation: 'The physical house number assigned to a single byte in your computer\'s RAM.',
      },
      {
        term: 'Pointer',
        definition: 'A variable in C declared with an asterisk (`type *name`) whose stored value is a memory address.',
        beginnerExplanation: 'A note in your pocket with someone else\'s house number written on it. The note is the pointer; the person living at the house is the target data.',
      },
      {
        term: 'Address-of Operator (&)',
        definition: 'A unary operator in C that returns the memory address of its operand variable.',
        beginnerExplanation: 'Asking the question: "At what memory address in RAM does this variable live?"',
      },
      {
        term: 'Dereference Operator (*)',
        definition: 'A unary operator applied to a pointer that accesses or modifies the value stored at the memory address pointed to.',
        beginnerExplanation: 'Traveling to the address written on your note, unlocking the front door, and reading or changing what is inside the house.',
      },
      {
        term: 'Pointer Arithmetic',
        definition: 'Mathematical addition or subtraction performed on pointers, where adding 1 advances the memory address by `sizeof(T)` bytes.',
        beginnerExplanation: 'Stepping forward to the next item: if each house is 4 yards wide, adding 1 to your step advances you by 4 full yards.',
      },
    ],
    detailedSections: [
      {
        heading: 'Computer Memory: The Contiguous Byte Array',
        paragraphs: [
          'To understand pointers, visualize your computer\'s RAM as a massive, contiguous array of single bytes, where each byte has a sequential numerical index: `0x00000000` to `0xFFFFFFFFFFFFFFFF` on modern 64-bit architectures.',
          'When you declare `int x = 42;`, the compiler allocates 4 contiguous bytes on the thread stack (since `sizeof(int)` is 4 bytes). The variable `x` lives at a specific starting byte address, say `0x1000`. The bytes from `0x1000` to `0x1003` store the binary representation of 42.',
        ],
      },
      {
        heading: 'Declaring, Assigning, and Dereferencing Pointers',
        paragraphs: [
          'Declaring a pointer requires specifying the type of data it points to: `int *ptr = &x;`. Here, `&x` extracts the memory address `0x1000`, and stores that number inside the variable `ptr`.',
          'To read the value stored at that address, we dereference the pointer: `int val = *ptr;` (reads 42). To alter the value in memory through the pointer, we assign through dereferencing: `*ptr = 99;`. Now `x` is 99! We changed `x` without ever typing the letter "x".',
        ],
      },
      {
        heading: 'Pointer Arithmetic and The Size Rule',
        paragraphs: [
          'Pointer arithmetic is not simple integer addition. When you add `1` to a pointer `ptr`, the compiler does not advance the address by 1 byte. It advances the address by `1 * sizeof(*ptr)` bytes.',
          'If `ptr` is an `int *` pointing to address `0x1000`, then `ptr + 1` evaluates to `0x1004` (since an int occupies 4 bytes). If `ptr` is a `double *` pointing to `0x1000`, then `ptr + 1` evaluates to `0x1008` (since a double occupies 8 bytes).',
        ],
      },
      {
        heading: 'Pointers to Pointers (Double Pointers: int **)',
        paragraphs: [
          'Since a pointer is itself a variable stored in memory, it has its own memory address. A pointer that stores the address of another pointer is called a pointer-to-pointer (`int **pptr`).',
          'Double pointers are essential in C whenever a function needs to modify where a pointer in the caller points (such as allocating a buffer or modifying the head node of a linked list).',
        ],
      },
    ],
    syntaxAndRules: {
      overview: 'Pointer syntax and dereferencing grammar.',
      rules: [
        'An asterisk in a declaration declares a pointer: int *ptr;.',
        'An asterisk in an expression dereferences an existing pointer: *ptr = 50;.',
        'Always initialize pointers to NULL or a valid address immediately upon declaration.',
        'Dereferencing a NULL or uninitialized pointer triggers a Segmentation Fault (SIGSEGV) and Undefined Behaviour.',
      ],
      syntaxSnippet: 'int count = 10;\nint *p = &count;     // Single pointer\nint **pp = &p;       // Double pointer\n\n**pp = 25;           // Updates count to 25 through two levels of indirection',
    },
    primaryCodeExample: {
      title: 'Exhaustive Pointer Operations, Arithmetic, and Swap Demo',
      language: 'c',
      code: `#include <stdio.h>

// Function demonstrating pass-by-pointer (simulating pass-by-reference)
void swap_integers(int *a, int *b) {
    int temp = *a; // Read value from address a
    *a = *b;       // Write value from address b into address a
    *b = temp;     // Write stored temp value into address b
}

// Function modifying where an external pointer points via a double pointer
void point_to_maximum(int *x, int *y, int **target) {
    if (*x > *y) {
        *target = x; // Point external pointer to address of x
    } else {
        *target = y; // Point external pointer to address of y
    }
}

int main(void) {
    int first = 100;
    int second = 250;

    printf("=== 1. Memory Addresses and Values ===\\n");
    printf("first  value: %d, address: %p\\n", first, (void*)&first);
    printf("second value: %d, address: %p\\n", second, (void*)&second);

    // Swap using pointers
    swap_integers(&first, &second);
    printf("After swap: first=%d, second=%d\\n", first, second);

    // 2. Pointer Arithmetic with Arrays
    printf("\\n=== 2. Pointer Arithmetic and Array Decay ===\\n");
    int numbers[4] = {10, 20, 30, 40};
    int *array_ptr = numbers; // Array name decays to pointer to first element

    for (int i = 0; i < 4; i++) {
        // *(array_ptr + i) is identical to numbers[i]
        printf("Index %d: Address=%p, Value=%d\\n", 
               i, (void*)(array_ptr + i), *(array_ptr + i));
    }

    // 3. Double Pointer Demo
    printf("\\n=== 3. Double Pointer Redirection ===\\n");
    int *max_ptr = NULL;
    point_to_maximum(&first, &second, &max_ptr);
    printf("Max value pointed to: %d at address: %p\\n", *max_ptr, (void*)max_ptr);

    return 0;
}`,
      explanation: 'An in-depth demonstration of pointer dereferencing, pass-by-pointer swapping, pointer arithmetic across array elements with type offset calculation, and double pointer mutation.',
      expectedOutput: `=== 1. Memory Addresses and Values ===
first  value: 100, address: 0x7ffee... (hex address)
second value: 250, address: 0x7ffee...
After swap: first=250, second=100

=== 2. Pointer Arithmetic and Array Decay ===
Index 0: Address=0x7ffe..., Value=10
Index 1: Address=0x7ffe...+4 bytes, Value=20
Index 2: Address=0x7ffe...+8 bytes, Value=30
Index 3: Address=0x7ffe...+12 bytes, Value=40

=== 3. Double Pointer Redirection ===
Max value pointed to: 250 at address: 0x7ffee...`,
      keyPoints: [
        'swap_integers receives the actual memory addresses of first and second, allowing direct mutation of caller stack variables.',
        'numbers[i] is defined in ISO C as syntactic sugar for *(numbers + i).',
        'Address offsets between array indices increment by 4 bytes because sizeof(int) == 4.',
      ],
    },
    codeExplanationOutsideBlock: {
      walkthrough: [
        'Line 4-8: swap_integers receives two memory addresses (int *a, int *b). "temp = *a" reads the value at address a into a local stack variable. "*a = *b" overwrites the memory at address a with the byte content of address b.',
        'Line 11-17: point_to_maximum receives a double pointer "int **target". Dereferencing "*target" modifies the original "max_ptr" inside main to store the address of whichever number was larger.',
        'Line 20-25: main declares first and second, printing their hexadecimal memory addresses using the %p format specifier and (void*) cast.',
        'Line 33-40: Demonstrates that numbers decays to a pointer. "array_ptr + i" advances the pointer by i * 4 bytes.',
      ],
      flowOfExecution: 'Sequential execution displaying how pointer variables reference memory cells and how arithmetic scales automatically to type width.',
    },
    commonMistakes: [
      {
        title: 'Dereferencing an Uninitialized (Wild) Pointer',
        incorrectCode: `int *ptr; // Wild pointer: holds random garbage from previous stack frame
*ptr = 100; // CRITICAL BUG: Writes 100 to an arbitrary memory address!`,
        errorMessage: 'Segmentation Fault (core dumped)',
        whyItHappens: 'In C, local variables are not zeroed out by default; they contain whatever random bit pattern was left on the stack.',
        correction: 'Always initialize pointers to NULL or a valid address immediately.',
        correctCode: `int *ptr = NULL;
int val = 0;
ptr = &val;
*ptr = 100;`,
      },
      {
        title: 'Returning the Address of a Local Stack Variable',
        incorrectCode: `int* get_local_number(void) {
    int num = 42;
    return &num; // FATAL: num is destroyed the moment the function returns!
}`,
        errorMessage: 'warning: function returns address of local variable [-Wreturn-local-addr]',
        whyItHappens: 'Stack frames are popped and invalidated when a function returns. The address returned points to dead stack memory that will be overwritten by the next function call.',
        correction: 'Allocate on the Heap using malloc(), pass a buffer pointer from the caller, or use static storage.',
      },
    ],
    comparisons: {
      concept: 'Pointers vs References Across Languages',
      pythonComparison: 'Python has no pointer syntax or pointer arithmetic. All variables are opaque object references managed entirely by CPython.',
      javaComparison: 'Java references point to objects on the heap, but Java forbids pointer arithmetic, memory inspection, and direct address manipulation for security.',
      cComparison: 'C provides direct, unrestricted pointer manipulation and raw memory arithmetic. Powerful, but unsafe if bounds are violated.',
      cppComparison: 'C++ retains full C pointer support, but strongly encourages safer abstractions: references (int &) and smart pointers (std::unique_ptr).',
      takeaway: 'C gives you total control over every byte in memory, placing 100% of the responsibility for safety on the programmer.',
    },
    connections: {
      prerequisitesLearned: ['C Build Pipeline', 'C Fundamentals'],
      leadsDirectlyTo: ['Dynamic Memory Allocation (malloc, free)', 'Memory Safety & C Cybersecurity'],
    },
    summary: {
      takeaways: [
        'A pointer stores the memory address of another variable.',
        '& extracts an address; * dereferences an address to access its target value.',
        'Pointer arithmetic automatically scales by sizeof(type).',
        'Array notation arr[i] is identical to *(arr + i).',
        'Never dereference NULL, uninitialized, or deallocated pointers.',
      ],
      keyTermsToRemember: ['Memory Address', 'Pointer', 'Dereference', 'Address-of Operator', 'Pointer Arithmetic', 'Array Decay', 'Double Pointer', 'Segmentation Fault'],
    },
    inLessonKnowledgeChecks: [
      {
        id: 'chk-c-ptr-1',
        question: 'If int *ptr points to memory address 0x2000, and sizeof(int) is 4 bytes, what memory address does (ptr + 2) evaluate to?',
        options: [
          '0x2002',
          '0x2004',
          '0x2008',
          '0x2016',
        ],
        correctIndex: 2,
        explanation: 'Pointer arithmetic scales by sizeof(type): 0x2000 + (2 * 4 bytes) = 0x2000 + 8 bytes = 0x2008.',
      },
    ],
    endOfTopicQuestions: [
      {
        id: 'q-c-ptr-1',
        level: 'Basic',
        question: 'What is a "Segmentation Fault" and what causes it in C?',
        answerExplanation: 'A Segmentation Fault (SIGSEGV) is an operating system exception raised by the Memory Management Unit (MMU) when a program attempts to access a memory address that it does not own, has not mapped, or attempts to write to a read-only memory segment (such as dereferencing NULL, accessing unallocated memory, or modifying string literals).',
      },
      {
        id: 'q-c-ptr-2',
        level: 'Intermediate',
        question: 'Explain why a function in C must accept a double pointer (e.g. void allocate(int **ptr)) if it intends to allocate memory for the caller.',
        answerExplanation: 'In C, all arguments are strictly passed by value. If a function accepts a single pointer `void allocate(int *ptr)` and assigns `ptr = malloc(...)`, it only modifies its own local copy of the pointer on its stack frame; the caller\'s original pointer remains unchanged. To alter the caller\'s pointer, the function must receive the memory address of the caller\'s pointer, which is an `int **`.',
      },
    ],
  },
];
