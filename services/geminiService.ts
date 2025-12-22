
import { GoogleGenAI, Type } from "@google/genai";
import { LessonPlan, LessonPlanRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const LESSON_PLAN_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    topic: { type: Type.STRING },
    strandStandards: { 
      type: Type.STRING, 
      description: "Must reference Thai MOE strands (e.g., Strand 1: Language for Communication, Standard F1.1 Gr.3/1)" 
    },
    objectives: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING } 
    },
    summary: { type: Type.STRING },
    vocabulary: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING } 
    },
    grammar: { type: Type.STRING },
    worksheetIdeas: { type: Type.STRING, description: "Detailed description of what the student worksheet should contain" },
    procedure: {
      type: Type.OBJECT,
      properties: {
        warmUp: { 
          type: Type.OBJECT, 
          properties: { title: { type: Type.STRING }, content: { type: Type.STRING }, duration: { type: Type.STRING } },
          required: ["title", "content", "duration"]
        },
        presentation: { 
          type: Type.OBJECT, 
          properties: { title: { type: Type.STRING }, content: { type: Type.STRING }, duration: { type: Type.STRING } },
          required: ["title", "content", "duration"]
        },
        practice: { 
          type: Type.OBJECT, 
          properties: { title: { type: Type.STRING }, content: { type: Type.STRING }, duration: { type: Type.STRING } },
          required: ["title", "content", "duration"]
        },
        production: { 
          type: Type.OBJECT, 
          properties: { title: { type: Type.STRING }, content: { type: Type.STRING }, duration: { type: Type.STRING } },
          required: ["title", "content", "duration"]
        },
        wrapUp: { 
          type: Type.OBJECT, 
          properties: { title: { type: Type.STRING }, content: { type: Type.STRING }, duration: { type: Type.STRING } },
          required: ["title", "content", "duration"]
        }
      },
      required: ["warmUp", "presentation", "practice", "production", "wrapUp"]
    },
    materials: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING } 
    },
    evaluation: { type: Type.STRING }
  },
  required: [
    "topic", "strandStandards", "objectives", "summary", "vocabulary", 
    "grammar", "worksheetIdeas", "procedure", "materials", "evaluation"
  ]
};

export const generateLessonPlan = async (request: LessonPlanRequest): Promise<LessonPlan> => {
  const prompt = `
    Generate a highly professional ESL/EFL lesson plan for a foreign teacher working in Thailand.
    
    Topic: ${request.topic}
    Grade Level: ${request.gradeLevel}
    Student Ability: ${request.studentLevel}
    Duration: ${request.duration} minutes
    Language Focus: ${request.focusArea}
    
    IMPORTANT: 
    1. The "strandStandards" must strictly follow the Thai Ministry of Education (MOE) Basic Education Core Curriculum (BECC 2008). 
       Examples: "Standard F1.1: Understanding of and capacity to interpret what has been heard and read from various types of media, and ability to express opinions with proper reasoning."
    2. Use the PPP (Presentation, Practice, Production) methodology.
    3. Ensure the vocabulary and grammar are age-appropriate for ${request.gradeLevel} in the Thai context.
    4. Provide clear, actionable steps for the teacher.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: LESSON_PLAN_SCHEMA,
      }
    });

    if (!response.text) {
      throw new Error("Failed to generate content from Gemini");
    }

    return JSON.parse(response.text) as LessonPlan;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
