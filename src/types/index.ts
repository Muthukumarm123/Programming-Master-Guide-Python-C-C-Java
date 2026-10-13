export type LanguageId = 'python' | 'java' | 'c' | 'cpp' | 'cybersecurity';

export interface CodeExample {
  title: string;
  language: string;
  code: string;
  explanation: string;
  expectedOutput?: string;
  keyPoints?: string[];
}

export interface DefinitionItem {
  term: string;
  pronunciationOrOrigin?: string;
  definition: string;
  beginnerExplanation: string;
  relatedTerm?: string;
}

export interface CommonMistake {
  title: string;
  incorrectCode?: string;
  errorMessage?: string;
  whyItHappens: string;
  correction: string;
  correctCode?: string;
}

export interface LanguageComparison {
  concept: string;
  pythonComparison?: string;
  javaComparison?: string;
  cComparison?: string;
  cppComparison?: string;
  takeaway: string;
}

export interface KnowledgeCheckQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface EndOfTopicQuestion {
  id: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
  question: string;
  answerExplanation: string;
  sampleAnswer?: string;
}

export interface LessonSection {
  heading: string;
  paragraphs: string[];
  bulletPoints?: string[];
  numberedSteps?: string[];
  codeExamples?: CodeExample[];
  callout?: {
    type: 'note' | 'warning' | 'tip' | 'architecture';
    title: string;
    content: string;
  };
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  languageId: LanguageId;
  moduleId: string;
  moduleTitle: string;
  order: number;
  estimatedMinutes: number;
  prerequisites: string[];
  learningObjectives: string[];
  
  // Universal Lesson Structure
  introduction: {
    whatIsIt: string;
    whyItMatters: string;
    whereItFitsInRoadmap: string;
  };
  definitions: DefinitionItem[];
  detailedSections: LessonSection[];
  syntaxAndRules?: {
    overview: string;
    rules: string[];
    syntaxSnippet?: string;
  };
  primaryCodeExample: CodeExample;
  codeExplanationOutsideBlock: {
    walkthrough: string[];
    variableTrace?: string;
    flowOfExecution: string;
    mutationOrOutputNotes?: string;
  };
  commonMistakes: CommonMistake[];
  comparisons?: LanguageComparison;
  connections: {
    prerequisitesLearned: string[];
    leadsDirectlyTo: string[];
  };
  summary: {
    takeaways: string[];
    keyTermsToRemember: string[];
  };
  inLessonKnowledgeChecks?: KnowledgeCheckQuestion[];
  endOfTopicQuestions: EndOfTopicQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  languageId: LanguageId;
  order: number;
  lessonIds: string[];
}

export interface Pathway {
  id: LanguageId;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  modules: Module[];
}

export interface GlossaryEntry {
  id: string;
  term: string;
  definition: string;
  beginnerExplanation: string;
  languageApplicability: ('Python' | 'Java' | 'C' | 'C++' | 'General' | 'Web/Backend')[];
  codeSnippet?: {
    language: string;
    code: string;
  };
  relatedTerms: string[];
  lessonIdRef?: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  category: 'foundations' | 'core' | 'intermediate' | 'advanced' | 'tools' | 'backend' | 'systems' | 'cybersecurity';
  languageId: LanguageId | 'cross-platform';
  description: string;
  estimatedHours: number;
  prerequisites: string[]; // Node IDs
  lessonIdRef?: string;
}

export interface SetupGuide {
  id: string;
  title: string;
  tool: string;
  description: string;
  languageId: LanguageId | 'general';
  supportedOS: ('Windows' | 'macOS' | 'Linux')[];
  whyNeeded: string;
  installation: {
    windows: {
      steps: string[];
      commands?: string[];
      notes?: string;
    };
    linux: {
      steps: string[];
      commands?: string[];
      notes?: string;
    };
    macos: {
      steps: string[];
      commands?: string[];
      notes?: string;
    };
  };
  verification: {
    command: string;
    expectedOutput: string;
    sampleProgram?: {
      filename: string;
      code: string;
      runCommand: string;
    };
  };
  configurationGuide?: {
    pathInstructions: string;
    ideIntegration: string;
    compilerFlagsOrSettings?: string;
  };
  updateAndRemoval?: {
    howToUpdate: string;
    howToRemoveSafely: string;
  };
  troubleshooting: {
    problem: string;
    cause: string;
    solution: string;
  }[];
  officialDocsUrl: string;
}
