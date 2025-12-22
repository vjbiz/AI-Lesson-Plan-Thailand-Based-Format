
export interface LessonPlanRequest {
  topic: string;
  gradeLevel: string;
  duration: string;
  focusArea: string;
  studentLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ProcedureStep {
  title: string;
  content: string;
  duration: string;
}

export interface LessonPlan {
  topic: string;
  strandStandards: string;
  objectives: string[];
  summary: string;
  vocabulary: string[];
  grammar: string;
  worksheetIdeas: string;
  procedure: {
    warmUp: ProcedureStep;
    presentation: ProcedureStep;
    practice: ProcedureStep;
    production: ProcedureStep;
    wrapUp: ProcedureStep;
  };
  materials: string[];
  evaluation: string;
}

export type GradeLevel = 
  | 'P1 (Prathom 1)' | 'P2 (Prathom 2)' | 'P3 (Prathom 3)' 
  | 'P4 (Prathom 4)' | 'P5 (Prathom 5)' | 'P6 (Prathom 6)'
  | 'M1 (Mattayom 1)' | 'M2 (Mattayom 2)' | 'M3 (Mattayom 3)'
  | 'M4 (Mattayom 4)' | 'M5 (Mattayom 5)' | 'M6 (Mattayom 6)';
