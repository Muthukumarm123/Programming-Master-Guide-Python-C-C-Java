import { Lesson } from '../../types';

export const CYBER_LESSONS: Lesson[] = [
  // --- LESSON 1: DEFENSIVE CYBERSECURITY FOUNDATIONS ---
  {
    id: 'sec-foundations-defensive',
    slug: 'cybersecurity-foundations-cia-triad-and-defensive-engineering',
    title: 'Cybersecurity Foundations: The Defensive Engineering Mindset',
    languageId: 'cybersecurity',
    moduleId: 'cyber-mod-foundations',
    moduleTitle: 'Module 1: Foundations & Legal Frameworks',
    order: 1,
    estimatedMinutes: 30,
    prerequisites: ['Basic networking concepts'],
    learningObjectives: [
      'Master the core CIA Triad: Confidentiality, Integrity, and Availability',
      'Understand the legal and ethical boundaries of authorized defensive security testing',
      'Differentiate between Hashing (SHA-256, bcrypt) and Encryption (AES, RSA)',
      'Explain Threat Modeling and the principle of Least Privilege',
      'Understand Responsible Vulnerability Disclosure workflows',
    ],
    introduction: {
      whatIsIt: 'Cybersecurity is the discipline of protecting computer systems, networks, devices, and data from unauthorized access, modification, or disruption. This lesson establishes the architectural principles of defensive software development and authorized testing.',
      whyItMatters: 'Security cannot be "bolted on" at the end of a project. Over 90% of critical security breaches originate from fundamental programming bugs—such as unvalidated inputs, raw string concatenation in SQL, or improper memory bounds. Security is an intrinsic quality of good engineering.',
      whereItFitsInRoadmap: 'Serves as the foundation for language-specific security lessons in Python, Java, C, and C++.',
    },
    definitions: [
      {
        term: 'CIA Triad',
        definition: 'The fundamental model for computer security: Confidentiality (data is hidden from unauthorized parties), Integrity (data cannot be altered undetectably), and Availability (systems remain accessible to legitimate users).',
        beginnerExplanation: 'The three goals: keep secrets safe, keep data honest and authentic, and keep the service running smoothly.',
      },
      {
        term: 'Hashing vs Encryption',
        definition: 'Hashing is a one-way mathematical function producing a fixed-size digest (irreversible, used for passwords). Encryption is a two-way mathematical operation that scrambles data into ciphertext using a key (reversible with decryption key).',
        beginnerExplanation: 'Hashing is like baking a cake from batter: you cannot turn a baked cake back into raw eggs and flour. Encryption is putting jewels in a locked safe with a combination key.',
      },
      {
        term: 'Principle of Least Privilege',
        definition: 'A security design requirement that every user, process, and service account possesses only the minimal set of permissions strictly necessary to perform its job.',
        beginnerExplanation: 'Never run your web server as root/administrator if it only needs to read a single folder on disk.',
      },
      {
        term: 'Defense in Depth',
        definition: 'An architectural strategy employing multiple layers of defensive controls throughout an information system, ensuring failure of one layer does not compromise the whole.',
        beginnerExplanation: 'A castle with a moat, outer walls, portcullis, inner courtyard, and keep—breaching one wall doesn\'t grant access to the crown.',
      },
    ],
    detailedSections: [
      {
        heading: 'The Legal and Ethical Boundaries of Security Testing',
        paragraphs: [
          'Under laws such as the Computer Fraud and Abuse Act (CFAA) in the United States and the Computer Misuse Act in the UK, interacting with or testing any computer system without explicit, written authorization from the owner is a serious crime.',
          'Professional security testing is strictly authorized, defensive, and documented. Certified ethical hackers and defensive engineers operate under defined Scopes of Work (Rules of Engagement) and adhere to Responsible Disclosure: privately alerting vendors to vulnerabilities and giving them 90 days to remediate before public announcement.',
        ],
      },
      {
        heading: 'Password Storage: Why Salted Hashing is Mandatory',
        paragraphs: [
          'Never store passwords in plain text or using fast general-purpose hashes like MD5 or SHA-256. Modern GPUs can calculate billions of SHA-256 hashes per second, cracking short passwords via rainbow tables in seconds.',
          'Production systems mandate adaptive, computationally expensive algorithms such as `bcrypt`, `Argon2id`, or `PBKDF2`. These algorithms incorporate a random per-user "salt" (defeating rainbow tables) and a tunable work factor (cost) that forces brute-force attempts to slow to an impractically low crawl.',
        ],
      },
    ],
    syntaxAndRules: {
      overview: 'Cryptographic hashing and password verification guidelines.',
      rules: [
        'Never invent custom encryption or hashing algorithms; always use standardized, peer-reviewed libraries.',
        'Always generate cryptographic salts using a cryptographically secure pseudo-random number generator (CSPRNG).',
        'Store password hashes with an adaptive cost factor (e.g. bcrypt work factor >= 12).',
      ],
      syntaxSnippet: '# Secure password hashing with bcrypt:\nimport bcrypt\n\nhashed = bcrypt.hashpw(b"UserPass123!", bcrypt.gensalt(rounds=12))\nis_valid = bcrypt.checkpw(b"UserPass123!", hashed) # True',
    },
    primaryCodeExample: {
      title: 'Defensive Cryptographic Hashing and Constant-Time Comparison Demo',
      language: 'python',
      code: `import hashlib
import hmac
import secrets

# 1. Generating a Cryptographically Secure Token
def generate_api_auth_token() -> str:
    # secrets.token_hex uses OS-level entropy (/dev/urandom)
    return secrets.token_hex(32)

# 2. Timing-Attack Safe Verification
def verify_secret_token_constant_time(provided_token: str, expected_token: str) -> bool:
    """
    Standard '==' comparison aborts on the first mismatched character, 
    leaking byte timing data to network attackers (Timing Attacks).
    hmac.compare_digest takes constant time regardless of mismatches.
    """
    return hmac.compare_digest(provided_token.encode(), expected_token.encode())

# 3. Defensive Simulation
master_secret = generate_api_auth_token()
print(f"Generated Secure CSPRNG Token: {master_secret[:12]}... (64 hex characters)")

test_token_correct = master_secret
test_token_forged = "deadbeef" + master_secret[8:]

print("Verification Result (Legitimate):", 
      verify_secret_token_constant_time(test_token_correct, master_secret))
print("Verification Result (Tampered):  ", 
      verify_secret_token_constant_time(test_token_forged, master_secret))`,
      explanation: 'Demonstrates defensive programming principles: utilizing OS entropy for token generation and preventing timing side-channel attacks via constant-time string comparison.',
      expectedOutput: `Generated Secure CSPRNG Token: 4a9f1b2c8e0d... (64 hex characters)
Verification Result (Legitimate): True
Verification Result (Tampered):   False`,
      keyPoints: [
        'secrets module provides cryptographically secure random bytes, unlike the predictable random module.',
        'hmac.compare_digest eliminates side-channel timing attacks by taking identical CPU cycles regardless of where characters differ.',
        'Authentication verification must be constant-time to defeat remote statistical probing.',
      ],
    },
    codeExplanationOutsideBlock: {
      walkthrough: [
        'Line 6-8: secrets.token_hex(32) queries the kernel entropy pool to generate a 256-bit cryptographically secure random token.',
        'Line 11-18: Standard string equality (==) stops comparing as soon as it sees a differing byte. An attacker measuring microscopic network latency differences can guess tokens character-by-character. hmac.compare_digest compares all bytes unconditionally.',
        'Line 21-27: Demonstrates token generation, successful verification, and tamper detection.',
      ],
      flowOfExecution: 'Sequential security helper demonstration showing defenses against timing side channels and weak entropy.',
    },
    commonMistakes: [
      {
        title: 'Using the "random" Module for Security Credentials',
        incorrectCode: `import random
token = str(random.randint(100000, 999999)) # INSECURE!`,
        whyItHappens: 'Python\'s random module uses the Mersenne Twister PRNG, which is completely deterministic. Observing 624 outputs allows an attacker to predict every past and future token.',
        correction: 'Always use Python\'s "secrets" module or os.urandom() for security tokens, passwords, and cryptographic keys.',
        correctCode: `import secrets
token = secrets.token_hex(16)`,
      },
    ],
    comparisons: {
      concept: 'Defensive Security Across Languages',
      pythonComparison: 'Excellent for automated security automation, log parsing, defensive probing, and API auditing scripts.',
      javaComparison: 'Strong built-in type safety and memory boundaries; security focus is on input validation, JWT token verification, and avoiding unsafe deserialization.',
      cComparison: 'Primary focus is memory safety: bounds checking, eliminating buffer overflows, and managing pointers safely.',
      cppComparison: 'Focuses on RAII resource management, avoiding raw pointers, and preventing undefined behaviour.',
      takeaway: 'Each programming language has unique attack vectors: systems languages suffer memory corruption, while application languages suffer logic and injection flaws.',
    },
    connections: {
      prerequisitesLearned: ['General programming foundations'],
      leadsDirectlyTo: ['C Memory Safety & Cybersecurity', 'Python Defensive Automation'],
    },
    summary: {
      takeaways: [
        'The CIA Triad balances Confidentiality, Integrity, and Availability.',
        'Defensive testing must always operate within explicit, written legal boundaries.',
        'Never store passwords in plain text or MD5; always use salted adaptive hashes (bcrypt/Argon2).',
        'Use constant-time comparisons (hmac.compare_digest) to eliminate timing attacks.',
      ],
      keyTermsToRemember: ['CIA Triad', 'Least Privilege', 'Timing Attack', 'CSPRNG', 'Salting', 'bcrypt', 'Constant-Time Comparison'],
    },
    inLessonKnowledgeChecks: [
      {
        id: 'chk-sec-1',
        question: 'Why should passwords never be hashed using standard SHA-256 or MD5 algorithms?',
        options: [
          'Because SHA-256 hashes are not unique.',
          'Because SHA-256 is designed to be extremely fast, enabling modern graphics cards (GPUs) to compute billions of guesses per second.',
          'Because SHA-256 only works on numbers, not text.',
          'Because SHA-256 can be reversed mathematically by anyone.',
        ],
        correctIndex: 1,
        explanation: 'Fast cryptographic hashes like SHA-256 allow attackers with GPU rigs to test billions of passwords per second. Password storage requires slow, salted, memory-hard algorithms like bcrypt or Argon2.',
      },
    ],
    endOfTopicQuestions: [
      {
        id: 'q-sec-1',
        level: 'Basic',
        question: 'Explain what a "salt" is in the context of password hashing and what attack it prevents.',
        answerExplanation: 'A salt is a unique, cryptographically random string generated for each user and concatenated with their password before hashing. It prevents attackers from using precomputed lookup tables (Rainbow Tables) to crack passwords across multiple accounts, and ensures that two users with the identical password will have completely different stored hashes.',
      },
    ],
  },

  // --- LESSON 2: C MEMORY SAFETY & CYBERSECURITY ---
  {
    id: 'c-security-memory-safety',
    slug: 'c-memory-safety-buffer-overflows-and-defenses',
    title: 'C Memory Safety: Buffer Overflows, ASLR & Defensive Coding',
    languageId: 'c',
    moduleId: 'c-mod-security',
    moduleTitle: 'Module 3: C Systems Security & Memory Defenses',
    order: 3,
    estimatedMinutes: 40,
    prerequisites: ['Pointers & Memory in C', 'C Compilation & Build Pipeline'],
    learningObjectives: [
      'Understand the mechanical anatomy of a Buffer Overflow on the stack',
      'Explain how overflowing buffers corrupt adjacent memory, saved frame pointers, and function return addresses',
      'Analyze compiler and OS defenses: Stack Canaries (-fstack-protector), ASLR, and Non-Executable Stacks (NX/DEP)',
      'Replace dangerous C standard library functions (gets, strcpy, sprintf) with safe bounded alternatives (fgets, strncpy, snprintf)',
      'Compile with AddressSanitizer (-fsanitize=address) to detect memory corruption during development',
    ],
    introduction: {
      whatIsIt: 'Memory safety vulnerabilities—most famously buffer overflows, use-after-free, and out-of-bounds writes—account for roughly 70% of all severe security vulnerabilities cataloged by Microsoft and Google Chromium. This lesson analyzes why buffer overflows happen and how to write defensive, bulletproof C code.',
      whyItMatters: 'In C, the compiler will happily let you write 100 bytes into a 10-byte buffer. Understanding the call stack layout and how boundaries fail is essential for writing secure operating system kernels, cryptographic utilities, and native web servers.',
      whereItFitsInRoadmap: 'Directly connects C pointer mechanics to real-world defensive cybersecurity engineering.',
    },
    definitions: [
      {
        term: 'Buffer Overflow',
        definition: 'An anomaly where a program writes data beyond the allocated boundary of a memory buffer, corrupting adjacent data in the call stack or heap.',
        beginnerExplanation: 'Pouring 500ml of liquid into a 200ml glass: the liquid spills over the edge, ruining whatever documents are sitting on the desk next to it.',
      },
      {
        term: 'Stack Canary',
        definition: 'A random guard value placed on the stack frame between local variables and the saved return address by the compiler; if the canary is overwritten, the program aborts immediately before returning.',
        beginnerExplanation: 'A real canary in a coal mine: if poisonous gas fills the room, the canary dies first, triggering an immediate evacuation alarm before anyone gets hurt.',
      },
      {
        term: 'ASLR (Address Space Layout Randomization)',
        definition: 'An operating system security feature that randomizes the memory addresses of the stack, heap, and libraries on every program execution.',
        beginnerExplanation: 'Changing the street names and house numbers in a city every morning so an attacker cannot predict where anything lives.',
      },
      {
        term: 'AddressSanitizer (ASan)',
        definition: 'A compiler toolchain instrument that detects memory errors (out-of-bounds accesses, use-after-free, memory leaks) at runtime with detailed crash diagnostics.',
        beginnerExplanation: 'An automatic referee built into your compiler that halts your code the millisecond you step one pixel outside legal boundaries.',
      },
    ],
    detailedSections: [
      {
        heading: 'Anatomy of a Stack Buffer Overflow',
        paragraphs: [
          'When a function is called, the CPU pushes a Stack Frame onto the call stack containing: incoming arguments, the Return Address (where the CPU must resume execution after the function finishes), the Saved Frame Pointer, and local buffer arrays.',
          'Because the stack grows downward toward lower addresses while arrays fill upward toward higher addresses, writing past the end of a local array spills directly into the saved frame pointer and the return address. If corrupted, when the function executes `ret`, the CPU attempts to jump to the corrupted address, causing a crash or allowing control flow hijacking.',
        ],
      },
      {
        heading: 'Banned Functions vs Defensive Replacements',
        paragraphs: [
          'The single most effective step in C security is eliminating functions that do not accept a buffer size parameter:',
          'BANNED: `gets(buf)` -> Use: `fgets(buf, sizeof(buf), stdin)`',
          'BANNED: `strcpy(dest, src)` -> Use: `strncpy(dest, src, sizeof(dest) - 1)`',
          'BANNED: `sprintf(buf, ...)` -> Use: `snprintf(buf, sizeof(buf), ...)`',
        ],
      },
    ],
    syntaxAndRules: {
      overview: 'Defensive C buffer manipulation standards.',
      rules: [
        'Always pass the maximum destination buffer capacity to string manipulation functions.',
        'Always ensure null-termination: buffer[sizeof(buffer) - 1] = \'\\0\'.',
        'Enable compiler mitigations during build: gcc -O2 -fstack-protector-all -D_FORTIFY_SOURCE=2 -fsanitize=address.',
      ],
      syntaxSnippet: 'char safe_buffer[64];\n// Always specify exact buffer limit to prevent overflows:\nif (fgets(safe_buffer, sizeof(safe_buffer), stdin) != NULL) {\n    safe_buffer[strcspn(safe_buffer, "\\n")] = \'\\0\'; // Strip trailing newline safely\n}',
    },
    primaryCodeExample: {
      title: 'Defensive Bounds Checking and Safe String Formatting in C',
      language: 'c',
      code: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

#define MAX_USERNAME_LEN 32
#define AUDIT_LOG_BUFFER 128

// Defensive function that safely copies and formats strings with strict bounds checking
bool format_security_log(const char *raw_username, int action_code, char *out_log, size_t out_capacity) {
    if (raw_username == NULL || out_log == NULL || out_capacity == 0) {
        return false; // Reject null pointers defensively
    }

    // 1. Check input length against safety threshold
    size_t input_len = strnlen(raw_username, MAX_USERNAME_LEN);
    if (input_len >= MAX_USERNAME_LEN) {
        // Input exceeds allowable username limits
        return false;
    }

    // 2. Format output strictly bounded by out_capacity using snprintf
    int written = snprintf(out_log, out_capacity, 
                           "AUDIT_EVENT [Action: %d] Authorized User: '%.*s'", 
                           action_code, (int)input_len, raw_username);

    // snprintf returns total bytes that WOULD have been written if capacity allowed
    if (written < 0 || (size_t)written >= out_capacity) {
        // Output was truncated; handle failure defensively
        out_log[0] = '\\0';
        return false;
    }

    return true;
}

int main(void) {
    char audit_record[AUDIT_LOG_BUFFER];

    const char *valid_user = "admin_sec_ops";
    const char *oversized_input = "attacker_attempting_to_overflow_this_buffer_with_extremely_long_unbounded_text_payload";

    printf("=== 1. Testing Valid Input ===\\n");
    if (format_security_log(valid_user, 104, audit_record, sizeof(audit_record))) {
        printf("Success: %s\\n", audit_record);
    } else {
        printf("Rejected: Input validation failed.\\n");
    }

    printf("\\n=== 2. Testing Oversized Input (Defensive Rejection) ===\\n");
    if (format_security_log(oversized_input, 999, audit_record, sizeof(audit_record))) {
        printf("Success: %s\\n", audit_record);
    } else {
        printf("Rejected: Oversized payload safely intercepted without memory corruption!\\n");
    }

    return 0;
}`,
      explanation: 'A robust defensive C implementation using strnlen, bounded snprintf, explicit null-pointer checks, and buffer capacity verification to prevent buffer overflows.',
      expectedOutput: `=== 1. Testing Valid Input ===
Success: AUDIT_EVENT [Action: 104] Authorized User: 'admin_sec_ops'

=== 2. Testing Oversized Input (Defensive Rejection) ===
Rejected: Oversized payload safely intercepted without memory corruption!`,
      keyPoints: [
        'strnlen prevents reading past bounds if the input string lacks a null terminator.',
        'snprintf guarantees that writes will never exceed out_capacity bytes.',
        'The return value of snprintf is checked against capacity to detect truncation.',
      ],
    },
    codeExplanationOutsideBlock: {
      walkthrough: [
        'Line 9-11: Explicit defensive guards check for NULL pointers before reading memory.',
        'Line 14: strnlen(raw_username, MAX_USERNAME_LEN) reads at most MAX_USERNAME_LEN bytes, preventing infinite read loops on malformed strings.',
        'Line 21-23: snprintf formats the output string, guaranteeing it will never write more than out_capacity bytes to out_log.',
        'Line 26-30: Verifies that (size_t)written < out_capacity. If snprintf had to truncate the string, it safely rejects the record.',
      ],
      flowOfExecution: 'Sequential validation ensuring that valid strings are formatted cleanly while oversized payloads are rejected before touching destination buffers.',
    },
    commonMistakes: [
      {
        title: 'Using gets() in Modern C',
        incorrectCode: `char buffer[16];
gets(buffer); // FATAL: gets() provides zero mechanism to specify buffer size!`,
        errorMessage: 'warning: implicit declaration of function \'gets\'; the \'gets\' function is dangerous and should not be used.',
        whyItHappens: 'Legacy textbooks from the 1980s taught gets(). It was officially removed from the ISO C11 standard because it is impossible to use safely.',
        correction: 'Always use fgets(buffer, sizeof(buffer), stdin).',
        correctCode: `char buffer[16];
if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
    // safely handled
}`,
      },
    ],
    comparisons: {
      concept: 'Buffer Overflow Defenses Across Languages',
      pythonComparison: 'Python strings and byte arrays are high-level objects with automatic bounds checking. Writing past an index raises an IndexError exception, never a memory overflow.',
      javaComparison: 'Java bytecode strictly enforces array bounds checking. Accessing past length throws ArrayIndexOutOfBoundsException at runtime.',
      cComparison: 'C has zero built-in bounds checking on raw pointers or arrays. Safety must be enforced manually via bounded functions and compiler flags (-fstack-protector).',
      cppComparison: 'Modern C++ provides std::string, std::vector, and std::span with .at() bounds checking, dramatically reducing manual buffer manipulation.',
      takeaway: 'In C, memory safety is 100% in the hands of the software engineer.',
    },
    connections: {
      prerequisitesLearned: ['C Pointers & Memory Deep Dive'],
      leadsDirectlyTo: ['C Systems & Web Sockets', 'C++ RAII & Memory Safety'],
    },
    summary: {
      takeaways: [
        'Buffer overflows occur when data writes exceed allocated memory boundaries.',
        'Overflows can overwrite stack return addresses and corrupt execution flow.',
        'Never use unbounded functions (gets, strcpy, sprintf); always use bounded alternatives.',
        'Compile with Stack Canaries (-fstack-protector-all) and AddressSanitizer (-fsanitize=address).',
      ],
      keyTermsToRemember: ['Buffer Overflow', 'Stack Frame', 'Return Address', 'Stack Canary', 'ASLR', 'snprintf', 'AddressSanitizer'],
    },
    inLessonKnowledgeChecks: [
      {
        id: 'chk-c-sec-1',
        question: 'Why was the gets() function officially removed from the ISO C Standard?',
        options: [
          'Because it was too slow compared to printf.',
          'Because it has no parameter to specify buffer capacity, making buffer overflow unavoidable whenever user input exceeds array length.',
          'Because it only works on Windows computers.',
          'Because it converts all letters to uppercase.',
        ],
        correctIndex: 1,
        explanation: 'gets() cannot know how large the destination buffer is, making it inherently insecure and vulnerable to buffer overflows.',
      },
    ],
    endOfTopicQuestions: [
      {
        id: 'q-c-sec-1',
        level: 'Basic',
        question: 'Explain how a Stack Canary protects a program from a buffer overflow attack.',
        answerExplanation: 'When a function begins, the compiler inserts a small, random integer (the canary) onto the stack directly before the saved return address. When the function finishes and prepares to return, it inspects the canary value. If a buffer overflow wrote past local variables toward the return address, the canary was inevitably overwritten. The program detects this discrepancy and immediately terminates via __stack_chk_fail before the CPU can jump to a corrupted return address.',
      },
    ],
  },
];
