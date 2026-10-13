import { Lesson } from '../../types';

export const JAVA_LESSONS: Lesson[] = [
  // --- LESSON 1: JAVA FOUNDATIONS & JVM ARCHITECTURE ---
  {
    id: 'java-env-jvm',
    slug: 'java-development-kit-jvm-architecture-and-compilation',
    title: 'JDK, JVM Architecture & Bytecode Compilation',
    languageId: 'java',
    moduleId: 'java-mod-foundations',
    moduleTitle: 'Module 1: Foundations & JVM Architecture',
    order: 1,
    estimatedMinutes: 30,
    prerequisites: ['Basic programming concepts'],
    learningObjectives: [
      'Differentiate between JDK, JRE, and the Java Virtual Machine (JVM)',
      'Explain the "Write Once, Run Anywhere" (WORA) philosophy and how bytecode achieves portability',
      'Trace how javac compiles source code (.java) into bytecode (.class) and how the JVM executes it',
      'Understand the JVM memory structure: ClassLoader, JVM Memory (Heap, Stack, Method Area), and Execution Engine (JIT Compiler, GC)',
      'Configure JAVA_HOME and verify compiler toolchains',
    ],
    introduction: {
      whatIsIt: 'Java is a class-based, object-oriented, statically typed programming language designed to have as few implementation dependencies as possible. This lesson deconstructs how Java works under the hood: the compilation pipeline, bytecode, and the Java Virtual Machine.',
      whyItMatters: 'Java powers the world\'s largest enterprise backend architectures, banking platforms, and Android apps. Understanding the JVM is what separates a novice programmer who memorizes syntax from a senior software engineer who understands performance, memory allocation, and concurrency.',
      whereItFitsInRoadmap: 'First lesson in the Java curriculum, establishing the architectural mental model before writing Java classes.',
    },
    definitions: [
      {
        term: 'JDK (Java Development Kit)',
        definition: 'The complete software development environment that includes the Java compiler (`javac`), archiver (`jar`), debugger (`jdb`), and documentation tools.',
        beginnerExplanation: 'The full toolbox needed by software engineers to write, compile, and debug Java code.',
        relatedTerm: 'JRE',
      },
      {
        term: 'JVM (Java Virtual Machine)',
        definition: 'An abstract computing machine that provides the runtime environment in which Java bytecode can be executed on physical hardware.',
        beginnerExplanation: 'A software computer that sits on top of your physical operating system, reading bytecode and translating it into Intel or ARM machine code.',
        relatedTerm: 'Bytecode',
      },
      {
        term: 'Bytecode',
        definition: 'The intermediate, hardware-independent machine language produced by the Java compiler (`javac`) stored in `.class` files.',
        beginnerExplanation: 'A universal set of instructions. It is not human English and not machine assembly; any JVM installed on Windows, Linux, or Mac can execute it.',
      },
      {
        term: 'JIT (Just-In-Time) Compiler',
        definition: 'A component of the JVM execution engine that compiles frequently executed bytecode sequences ("hot spots") directly into native machine code at runtime.',
        beginnerExplanation: 'A turbocharger inside the JVM that turns slow interpreted bytecode into lightning-fast native processor code while your app is running.',
      },
    ],
    detailedSections: [
      {
        heading: 'The Compilation Pipeline: .java to .class to Hardware',
        paragraphs: [
          'In purely compiled languages like C and C++, the compiler outputs machine code targeted directly at a specific CPU architecture (x86_64 or ARM64) and operating system (Windows or Linux). An executable compiled for Linux will not run on Windows.',
          'Java solves this via a two-stage pipeline. Stage 1: The programmer writes `OrderService.java`. The `javac` compiler translates this human source into platform-neutral bytecode instructions stored in `OrderService.class`. Stage 2: The JVM installed on that host computer loads the `.class` file, verifies its bytecode integrity, and executes it using an interpreter and the JIT compiler.',
        ],
      },
      {
        heading: 'Inside the JVM Memory Architecture',
        paragraphs: [
          'The JVM divides memory into five distinct runtime data areas:',
          '1. Heap: Shared memory pool where ALL Java objects and instance variables are allocated. Managed by the Garbage Collector.',
          '2. Stack (JVM Threads): Each thread possesses its own private stack holding stack frames for active method calls, local primitive variables, and references to heap objects.',
          '3. Method Area (Metaspace): Stores class-level data, bytecode, method metadata, and static variables.',
          '4. Program Counter (PC) Register: Holds the address of the currently executing JVM instruction.',
          '5. Native Method Stack: Handles C/C++ native system libraries invoked via JNI (Java Native Interface).',
        ],
      },
    ],
    syntaxAndRules: {
      overview: 'Standard Java class declaration and main entry point method signature.',
      rules: [
        'Every Java application must have at least one class matching the file name (e.g., class Main must live in Main.java).',
        'Execution begins at: public static void main(String[] args).',
        'Java is strictly statically typed: variable types cannot change once declared.',
      ],
      syntaxSnippet: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("JVM Initialized");\n    }\n}',
    },
    primaryCodeExample: {
      title: 'JVM Memory Inspection and Architecture Demo',
      language: 'java',
      code: `public class MemoryModelDemo {
    // 1. Static variable stored in Method Area (Metaspace)
    public static final String APP_NAME = "Enterprise Core";

    // 2. Instance variable stored in Heap Memory
    private int accountId;

    public MemoryModelDemo(int accountId) {
        this.accountId = accountId;
    }

    public static void main(String[] args) {
        // 3. Local primitive variable stored on Thread Stack
        int localRequestId = 9021;

        // 4. Object reference stored on Stack, actual Object allocated on Heap
        MemoryModelDemo demoInstance = new MemoryModelDemo(1042);

        // Inspect runtime JVM memory metrics
        Runtime runtime = Runtime.getRuntime();
        long totalMemory = runtime.totalMemory() / (1024 * 1024);
        long freeMemory = runtime.freeMemory() / (1024 * 1024);
        long maxMemory = runtime.maxMemory() / (1024 * 1024);

        System.out.println("=== JVM Runtime Memory Diagnostics ===");
        System.out.println("App Name (Metaspace): " + APP_NAME);
        System.out.println("Thread Stack Request ID: " + localRequestId);
        System.out.println("Heap Allocated Instance ID: " + demoInstance.accountId);
        System.out.println("JVM Max Heap Memory: " + maxMemory + " MB");
        System.out.println("JVM Total Allocated Heap: " + totalMemory + " MB");
        System.out.println("JVM Free Heap: " + freeMemory + " MB");
    }
}`,
      explanation: 'This Java program maps each variable directly to its corresponding JVM memory sector (Metaspace, Thread Stack, and Heap) and queries the Runtime object to print real memory allocations.',
      expectedOutput: `=== JVM Runtime Memory Diagnostics ===
App Name (Metaspace): Enterprise Core
Thread Stack Request ID: 9021
Heap Allocated Instance ID: 1042
JVM Max Heap Memory: 4096 MB (varies by host system)
JVM Total Allocated Heap: 260 MB
JVM Free Heap: 254 MB`,
      keyPoints: [
        'localRequestId is a primitive int allocated directly inside the main thread stack frame.',
        'demoInstance is a 64-bit reference address on the stack pointing to a heap-allocated object.',
        'Runtime.getRuntime() exposes live JVM memory pools.',
      ],
    },
    codeExplanationOutsideBlock: {
      walkthrough: [
        'Line 3: APP_NAME is declared static final, meaning its reference and string constant reside in the ClassLoader/Metaspace.',
        'Line 6: accountId is an instance field; its memory is allocated inside the MemoryModelDemo object on the Heap.',
        'Line 14: localRequestId is a primitive integer. Primitives in methods are stored directly on the Thread Stack frame for maximum performance.',
        'Line 17: "new MemoryModelDemo(1042)" creates an object on the Heap. The variable demoInstance holds a memory reference to that object.',
        'Line 20-23: The java.lang.Runtime singleton queries the JVM for maximum, total, and free heap boundaries in megabytes.',
      ],
      flowOfExecution: 'When java MemoryModelDemo is invoked, the JVM loads the class, verifies bytecode, creates the main thread stack, invokes main(), allocates the heap object, and prints memory metrics.',
    },
    commonMistakes: [
      {
        title: 'Mismatched File Name and Public Class Name',
        incorrectCode: `// Saved in a file named "App.java":
public class SystemCore {
    public static void main(String[] args) {}
}`,
        errorMessage: 'error: class SystemCore is public, should be declared in a file named SystemCore.java',
        whyItHappens: 'Java strictly enforces that public class names match the `.java` file name exactly, including case sensitivity.',
        correction: 'Rename the file to SystemCore.java, or change the class name to App.',
        correctCode: `// In SystemCore.java:
public class SystemCore {
    public static void main(String[] args) {}
}`,
      },
    ],
    comparisons: {
      concept: 'Compilation and Runtime Architecture',
      pythonComparison: 'CPython compiles source to Python bytecode (.pyc) and interprets it via an internal evaluation loop with a GIL (Global Interpreter Lock).',
      javaComparison: 'Java compiles to standardized JVM bytecode (.class), executed via high-performance JIT compilers (HotSpot) that optimize machine code at runtime.',
      cComparison: 'C compiles directly to OS-specific native binary machine code (ELF on Linux, PE on Windows). No runtime virtual machine or garbage collector.',
      cppComparison: 'C++ compiles ahead-of-time to native machine code with zero runtime overhead, offering direct hardware control.',
      takeaway: 'Java trades slight startup compilation latency for platform portability and automated memory management.',
    },
    connections: {
      prerequisitesLearned: ['General programming concepts'],
      leadsDirectlyTo: ['Java OOP Principles & Interfaces', 'Spring Boot Backend Architecture'],
    },
    summary: {
      takeaways: [
        'The JDK compiles source to bytecode; the JVM runs bytecode on target hardware.',
        'Bytecode enables Java\'s "Write Once, Run Anywhere" cross-platform portability.',
        'Heap holds objects; Thread Stacks hold local variables and method call frames.',
        'The JIT compiler boosts performance by compiling frequently executed bytecode into native CPU instructions.',
      ],
      keyTermsToRemember: ['JDK', 'JVM', 'Bytecode', 'JIT Compiler', 'Heap', 'Stack', 'Metaspace', 'Garbage Collector'],
    },
    inLessonKnowledgeChecks: [
      {
        id: 'chk-jvm-1',
        question: 'Where are Java objects allocated when created using the "new" keyword?',
        options: [
          'Directly on the thread call stack',
          'In the Heap memory area',
          'In the Program Counter register',
          'Inside the operating system kernel page table',
        ],
        correctIndex: 1,
        explanation: 'All Java objects instantiated via the new operator are allocated in Heap memory, managed by the garbage collector.',
      },
    ],
    endOfTopicQuestions: [
      {
        id: 'q-jvm-1',
        level: 'Basic',
        question: 'What is the role of the Just-In-Time (JIT) compiler inside the Java Virtual Machine?',
        answerExplanation: 'The JIT compiler analyzes running bytecode to detect "hot spots" (frequently executed loops and methods). It compiles those bytecode sequences directly into native CPU machine instructions, allowing subsequent executions to run at native hardware speeds without ongoing bytecode interpretation overhead.',
      },
    ],
  },

  // --- LESSON 2: JAVA BACKEND WITH SPRING BOOT ---
  {
    id: 'java-backend-spring-boot',
    slug: 'spring-boot-backend-architecture-and-rest-apis',
    title: 'Spring Boot: Enterprise Backend Architecture & REST APIs',
    languageId: 'java',
    moduleId: 'java-mod-backend',
    moduleTitle: 'Module 2: Java Backend & Spring Boot',
    order: 2,
    estimatedMinutes: 40,
    prerequisites: ['Java Foundations & JVM Architecture', 'Object-Oriented Java'],
    learningObjectives: [
      'Understand why Java and Spring Boot dominate enterprise backend systems',
      'Master the 3-layer architecture: Controller, Service, and Repository',
      'Explain Inversion of Control (IoC) and Dependency Injection (@Autowired)',
      'Build production REST controllers with @RestController, @GetMapping, and @PostMapping',
      'Integrate Spring Data JPA for automated database queries and transactions',
    ],
    introduction: {
      whatIsIt: 'Spring Boot is the industry-standard enterprise Java framework used to build standalone, production-grade Spring applications with minimal boilerplate and embedded HTTP servers (Tomcat).',
      whyItMatters: 'Over 80% of Fortune 500 financial institutions, telecommunications carriers, and healthcare giants run their transactional backends on Java and Spring Boot. Understanding Spring Boot\'s component layers and dependency injection is essential for enterprise engineering.',
      whereItFitsInRoadmap: 'The primary backend milestone of the Java pathway, bridging core OOP with enterprise REST services.',
    },
    definitions: [
      {
        term: 'Spring Boot',
        definition: 'An opinionated framework built on the Spring ecosystem providing convention-over-configuration auto-setup and embedded web servers.',
        beginnerExplanation: 'A framework that packages everything Java needs to be an enterprise web server in a tidy, automated box.',
      },
      {
        term: 'Inversion of Control (IoC)',
        definition: 'An architectural principle where the framework controls the lifecycle and injection of application components rather than custom code instantiating them directly.',
        beginnerExplanation: 'Instead of your code calling the shots, the framework acts as the manager, hiring and connecting the right objects for you.',
      },
      {
        term: 'Dependency Injection (DI)',
        definition: 'A design pattern implementing IoC where class dependencies are passed into objects (via constructors) by the Spring ApplicationContext container.',
        beginnerExplanation: 'Plugging in ready-to-use tools into a class so it does not have to create its own tools.',
      },
      {
        term: 'Spring Data JPA',
        definition: 'A persistence abstraction layer that implements the Repository pattern on top of Hibernate, generating SQL queries automatically from method names.',
        beginnerExplanation: 'Writing interfaces like `findByEmail(String email)` where Spring automatically generates the exact SQL query behind the scenes.',
      },
    ],
    detailedSections: [
      {
        heading: 'The 3-Layer Enterprise Architecture',
        paragraphs: [
          'Enterprise Java applications maintain strict separation of concerns across three distinct layers:',
          '1. Controller Layer (`@RestController`): Handles incoming HTTP requests, validates input parameters, and returns HTTP responses with JSON status codes.',
          '2. Service Layer (`@Service`): Implements business logic, validation rules, financial calculations, and manages `@Transactional` boundaries.',
          '3. Repository Layer (`@Repository`): Communicates with the database via Spring Data JPA and Hibernate, performing database reads and writes.',
        ],
      },
      {
        heading: 'Constructor Injection over Field Injection',
        paragraphs: [
          'While placing `@Autowired` on private fields was historically common, modern enterprise guidelines mandate Constructor Injection. Constructor injection makes dependencies explicit, enforces immutability via `final` fields, and allows unit testing with mock objects without spinning up the heavy Spring test context.',
        ],
      },
    ],
    syntaxAndRules: {
      overview: 'Common Spring Boot annotations and component declarations.',
      rules: [
        '@RestController marks a class as a web controller where methods return serialized JSON objects.',
        '@RequestMapping, @GetMapping, and @PostMapping define HTTP routes and URI paths.',
        '@RequestBody deserializes incoming JSON payloads into Java POJOs.',
        '@Valid triggers automated Bean Validation (e.g. @NotNull, @Size).',
      ],
      syntaxSnippet: '@RestController\n@RequestMapping("/api/v1/orders")\npublic class OrderController {\n    @GetMapping("/{id}")\n    public ResponseEntity<Order> getOrder(@PathVariable Long id) {\n        // ...\n    }\n}',
    },
    primaryCodeExample: {
      title: 'Complete Spring Boot 3-Layer Architecture Example',
      language: 'java',
      code: `package com.enterprise.banking.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

// 1. JPA Database Entity
@Entity
@Table(name = "bank_accounts")
class BankAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String accountNumber;
    
    @Column(nullable = false)
    private BigDecimal balance;

    public BankAccount() {}
    public BankAccount(String accountNumber, BigDecimal balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public Long getId() { return id; }
    public String getAccountNumber() { return accountNumber; }
    public BigDecimal getBalance() { return balance; }
}

// 2. Repository Layer (Spring Data JPA)
@Repository
interface AccountRepository extends JpaRepository<BankAccount, Long> {
    BankAccount findByAccountNumber(String accountNumber);
}

// 3. Service Layer (Business Logic)
@Service
class AccountService {
    private final AccountRepository repository;

    // Best Practice: Constructor Injection
    public AccountService(AccountRepository repository) {
        this.repository = repository;
    }

    public BankAccount createAccount(String accNumber, BigDecimal initialDeposit) {
        if (initialDeposit.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Initial deposit cannot be negative");
        }
        BankAccount newAccount = new BankAccount(accNumber, initialDeposit);
        return repository.save(newAccount);
    }

    public List<BankAccount> getAllAccounts() {
        return repository.findAll();
    }
}

// 4. Controller Layer (REST Endpoints)
@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public ResponseEntity<List<BankAccount>> listAccounts() {
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    @PostMapping
    public ResponseEntity<BankAccount> openAccount(@RequestParam String accNumber, @RequestParam BigDecimal deposit) {
        BankAccount created = accountService.createAccount(accNumber, deposit);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
}`,
      explanation: 'Demonstrates a complete enterprise Spring Boot application containing an @Entity, Spring Data JpaRepository, an injected @Service with business validation, and a @RestController emitting 200 OK and 201 CREATED HTTP responses.',
      expectedOutput: `Spring Boot starts embedded Tomcat server on port 8080.
GET /api/accounts returns JSON array of accounts.
POST /api/accounts creates bank_account row in database and returns 201 Created.`,
      keyPoints: [
        'AccountRepository inherits standard CRUD methods (save, findAll, delete) automatically from JpaRepository.',
        'Constructor injection in AccountService ensures immutable, testable code without hidden dependencies.',
        'ResponseEntity handles HTTP status codes explicitly (HttpStatus.CREATED).',
      ],
    },
    codeExplanationOutsideBlock: {
      walkthrough: [
        'Line 16-35: The BankAccount class is decorated with Jakarta Persistence annotations (@Entity, @Table, @Id), mapping it directly to an SQL table.',
        'Line 38-41: AccountRepository extends JpaRepository<BankAccount, Long>. Spring generates the implementation and SQL queries dynamically at startup.',
        'Line 44-61: AccountService encapsulates business validation, preventing negative deposit balances before persisting.',
        'Line 64-83: AccountController binds HTTP GET and POST requests, delegates processing to the service, and returns structured JSON responses.',
      ],
      flowOfExecution: 'When an HTTP POST arrives at port 8080, Tomcat routes it to AccountController. The controller calls AccountService, which calls AccountRepository, executing an SQL INSERT via Hibernate.',
    },
    commonMistakes: [
      {
        title: 'Putting Database Queries Directly in the REST Controller',
        incorrectCode: `@RestController
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/orders")
    public Order createOrder(@RequestBody Order order) {
        // Violating separation of concerns:
        return orderRepository.save(order);
    }
}`,
        whyItHappens: 'Novice developers skip the Service layer to write less code in small demos.',
        correction: 'Always isolate business logic and transactions inside a dedicated @Service layer, keeping controllers thin and focused purely on HTTP parameter validation.',
      },
    ],
    comparisons: {
      concept: 'Enterprise Backend Frameworks',
      pythonComparison: 'Python\'s equivalent is Django (with Django ORM and views) or FastAPI with SQLAlchemy and Pydantic.',
      javaComparison: 'Spring Boot is the standard for high-throughput, multi-threaded enterprise systems with heavy transaction requirements.',
      cComparison: 'In C, enterprise backends are rare; developers use C for specialized ultra-low-latency services, writing raw memory buffers and custom connection pooling.',
      cppComparison: 'C++ microframeworks (Crow/Pistache) handle high packets per second but lack the massive declarative dependency injection ecosystem of Spring.',
      takeaway: 'Spring Boot provides unmatched tooling for large teams building complex enterprise service architectures.',
    },
    connections: {
      prerequisitesLearned: ['JVM Architecture', 'Java OOP'],
      leadsDirectlyTo: ['Java Enterprise Security', 'C Systems & Pointers'],
    },
    summary: {
      takeaways: [
        'Spring Boot structures backends into Controllers (HTTP), Services (Logic), and Repositories (Data).',
        'Dependency Injection through constructors provides loose coupling and clean unit testing.',
        'Spring Data JPA generates relational database SQL queries automatically from method signatures.',
        'Always use BigDecimal for financial and monetary calculations in Java.',
      ],
      keyTermsToRemember: ['Spring Boot', 'Inversion of Control', 'Dependency Injection', 'JPA', 'Entity', 'Repository', 'Service', 'Controller'],
    },
    inLessonKnowledgeChecks: [
      {
        id: 'chk-sb-1',
        question: 'Why is constructor injection preferred over @Autowired field injection in modern Spring Boot applications?',
        options: [
          'It makes the code run 10 times faster.',
          'It enforces immutability via final fields and allows easy unit testing with mock objects without starting Spring.',
          'It automatically writes unit test files.',
          'It prevents Java from using heap memory.',
        ],
        correctIndex: 1,
        explanation: 'Constructor injection ensures classes cannot be constructed in an invalid state, allows dependencies to be marked final, and simplifies unit testing with mocks.',
      },
    ],
    endOfTopicQuestions: [
      {
        id: 'q-sb-1',
        level: 'Basic',
        question: 'What is the function of the @Repository annotation and how does Spring Data JPA eliminate boilerplate SQL queries?',
        answerExplanation: 'The @Repository annotation marks a DAO component in Spring. When extending JpaRepository<T, ID>, Spring Data JPA automatically provides standard CRUD implementations (findAll, findById, save, delete) and synthesizes custom SQL queries from interface method names (like findByAccountNumber) at application startup without requiring hand-written SQL.',
      },
    ],
  },
];
