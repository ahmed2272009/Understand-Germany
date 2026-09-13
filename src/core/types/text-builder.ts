export interface LinePrompt {
  lineNumber: number;
  section: string;
  prompt: string;
  suggestedWords: string[];
  placeholder: string;
}

export interface ValidationWarning {
  line: number;
  type: 'v2-position' | 'noun-capitalization' | 'connector' | 'length';
  message: string;
}

export interface TextValidationResult {
  lineCount: number;
  targetLineCount: number;
  wordCount: number;
  hasEnoughLines: boolean;
  v2CompliantRatio: number;
  connectorsFound: string[];
  warnings: ValidationWarning[];
  overallScore: number; // 0 to 100
}

export interface WritingSubmission {
  submissionId: string;
  userId: string;
  dayNumber: number;
  title: string;
  rawText: string;
  lines: string[];
  validation: TextValidationResult;
  status: 'draft' | 'submitted' | 'reviewed';
  updatedAt: string;
  submittedAt?: string;
}
