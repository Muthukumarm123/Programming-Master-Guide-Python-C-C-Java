import { Lesson, Pathway, LanguageId } from '../types';
import { PYTHON_LESSONS } from './courses/pythonCurriculum';
import { JAVA_LESSONS } from './courses/javaCurriculum';
import { C_LESSONS } from './courses/cCurriculum';
import { CPP_LESSONS } from './courses/cppCurriculum';
import { CYBER_LESSONS } from './courses/cyberCurriculum';

export const ALL_LESSONS: Lesson[] = [
  ...PYTHON_LESSONS,
  ...JAVA_LESSONS,
  ...C_LESSONS,
  ...CPP_LESSONS,
  ...CYBER_LESSONS,
];

export const PATHWAYS: Pathway[] = [
  {
    id: 'python',
    title: 'Python & Web Development',
    subtitle: 'From DataLumina Interactive Python to Streamlit and Full-Stack Backends (Flask, Django, FastAPI)',
    description: 'Master Python through interactive development, reactive Streamlit web apps, and professional backend engineering with Flask, Django, and FastAPI.',
    accentColor: '#38BDF8', // Soft Sky/Azure
    modules: [
      {
        id: 'py-mod-intro',
        title: 'Interactive Python & Environment',
        description: 'CPython setup, interactive REPL, persistent session state, and the DataLumina workflow.',
        languageId: 'python',
        order: 1,
        lessonIds: ['py-intro-datalumina'],
      },
      {
        id: 'py-mod-fundamentals',
        title: 'Python Syntax & Fundamentals',
        description: 'Variables, types, operators, string formatting, object identity, and mutability.',
        languageId: 'python',
        order: 2,
        lessonIds: ['py-fundamentals-syntax'],
      },
      {
        id: 'py-mod-streamlit',
        title: 'Streamlit Web Applications',
        description: 'Reactive script execution, stateful widgets, dataframes, and rapid dashboard creation.',
        languageId: 'python',
        order: 3,
        lessonIds: ['streamlit-foundations'],
      },
      {
        id: 'py-mod-backend',
        title: 'Python Backend Engineering',
        description: 'HTTP/REST foundations, Flask blueprints, Django full-stack MVT, and high-performance async FastAPI.',
        languageId: 'python',
        order: 4,
        lessonIds: [
          'py-backend-http-foundations',
          'py-backend-flask-tutorial',
          'py-backend-django-tutorial',
          'py-backend-fastapi-tutorial',
        ],
      },
    ],
  },
  {
    id: 'java',
    title: 'Java & Enterprise Architecture',
    subtitle: 'From JVM Internals and Bytecode to Spring Boot Microservices',
    description: 'Learn modern Java 21 LTS, object-oriented design, the JVM memory model, and enterprise backend development with Spring Boot.',
    accentColor: '#F59E0B', // Amber
    modules: [
      {
        id: 'java-mod-foundations',
        title: 'Java Foundations & JVM Architecture',
        description: 'JDK, JRE, JVM internals, bytecode compilation with javac, and runtime memory models.',
        languageId: 'java',
        order: 1,
        lessonIds: ['java-env-jvm'],
      },
      {
        id: 'java-mod-backend',
        title: 'Enterprise Backend & Spring Boot',
        description: '3-layer architecture, Dependency Injection, Spring Data JPA, and RESTful APIs.',
        languageId: 'java',
        order: 2,
        lessonIds: ['java-backend-spring-boot'],
      },
    ],
  },
  {
    id: 'c',
    title: 'C & Systems Programming',
    subtitle: 'Hardware-Level Memory, Pointers, Build Pipelines & Systems Safety',
    description: 'Understand how computers really work with C: GCC/Clang build stages, low-level pointer arithmetic, and stack/heap memory management.',
    accentColor: '#60A5FA', // Blue
    modules: [
      {
        id: 'c-mod-foundations',
        title: 'C Build Toolchains & Pipelines',
        description: 'Preprocessing, compilation, assembly, and linking with GCC and Clang.',
        languageId: 'c',
        order: 1,
        lessonIds: ['c-env-compilation'],
      },
      {
        id: 'c-mod-memory',
        title: 'Pointers & Memory Architecture',
        description: 'Exhaustive exploration of memory addresses, pointer arithmetic, dereferencing, and double pointers.',
        languageId: 'c',
        order: 2,
        lessonIds: ['c-pointers-deep-dive'],
      },
      {
        id: 'c-mod-security',
        title: 'Systems Security & Memory Safety',
        description: 'Buffer overflow anatomy, stack canaries, ASLR, AddressSanitizer, and defensive C programming.',
        languageId: 'c',
        order: 3,
        lessonIds: ['c-security-memory-safety'],
      },
    ],
  },
  {
    id: 'cpp',
    title: 'Modern C++ & High Performance',
    subtitle: 'Modern Standards (C++11/20), RAII, Smart Pointers & Systems',
    description: 'Master modern C++ resource management, deterministic RAII destructors, smart pointers, and deep architectural comparisons with C.',
    accentColor: '#A78BFA', // Purple
    modules: [
      {
        id: 'cpp-mod-raii',
        title: 'Modern C++, RAII & Smart Pointers',
        description: 'Deterministic destruction, std::unique_ptr, std::shared_ptr, and move semantics.',
        languageId: 'cpp',
        order: 1,
        lessonIds: ['cpp-raii-resource-management'],
      },
      {
        id: 'cpp-mod-comparison',
        title: 'C vs C++ Architectural Comparison',
        description: 'In-depth analysis of memory models, type safety, zero-overhead abstractions, and language selection criteria.',
        languageId: 'cpp',
        order: 2,
        lessonIds: ['cpp-c-vs-cpp-comparison'],
      },
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Ethical Defense',
    subtitle: 'Cross-Language Defensive Engineering, Cryptography & Secure Architecture',
    description: 'Build secure software systems with defense-in-depth principles, cryptographic hashing, and authorized vulnerability assessment.',
    accentColor: '#34D399', // Emerald
    modules: [
      {
        id: 'cyber-mod-foundations',
        title: 'Defensive Security Foundations',
        description: 'The CIA triad, ethical & legal frameworks, salted cryptographic hashing, and timing attack defenses.',
        languageId: 'cybersecurity',
        order: 1,
        lessonIds: ['sec-foundations-defensive'],
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((lesson) => lesson.id === id);
}

export function getPathwayById(id: LanguageId): Pathway | undefined {
  return PATHWAYS.find((p) => p.id === id);
}

export function getAdjacentLessons(currentId: string): { prev?: Lesson; next?: Lesson } {
  const index = ALL_LESSONS.findIndex((l) => l.id === currentId);
  if (index === -1) return {};
  return {
    prev: index > 0 ? ALL_LESSONS[index - 1] : undefined,
    next: index < ALL_LESSONS.length - 1 ? ALL_LESSONS[index + 1] : undefined,
  };
}
