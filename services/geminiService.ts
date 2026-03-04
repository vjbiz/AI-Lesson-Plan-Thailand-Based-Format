
import { GoogleGenAI, Type } from "@google/genai";
import { LessonPlan, LessonPlanRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const LESSON_PLAN_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    subject: { type: Type.STRING, description: "e.g., English Language" },
    topic: { type: Type.STRING },
    gradeLevel: { type: Type.STRING },
    strandStandards: { 
      type: Type.STRING, 
      description: "Must use exact wording from Thai MOE B.E. 2551 (e.g., Standard FL1.1: Understanding and ability in interpreting...)" 
    },
    indicators: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Must use exact wording from the grade-level indicators provided in the curriculum data."
    },
    keyCompetencies: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Select from: Communication Capacity, Thinking Capacity, Problem-Solving Capacity, Capacity for Applying Life Skills, Capacity for Technological Application"
    },
    desiredCharacteristics: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Select from: Love of nation, religion and the monarchy; Honesty and integrity; Self-discipline; Avidity for learning; Applying principles of Sufficiency Economy Philosophy in one’s way of life; Dedication and commitment to work; Cherishing Thai nationalism; Public-mindedness"
    },
    objectives: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Directly aligned with the specified indicators."
    },
    summary: { type: Type.STRING },
    vocabulary: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING } 
    },
    grammar: { type: Type.STRING },
    worksheetIdeas: { type: Type.STRING },
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
    assessment: { type: Type.STRING, description: "Methods to measure the stated indicators only." },
    reflection: { type: Type.STRING, description: "Professional educational reflection on expected outcomes." },
    teacherName: { type: Type.STRING, description: "Placeholder for teacher's name" },
    departmentHeadName: { type: Type.STRING, description: "Placeholder for department head's name" }
  },
  required: [
    "subject", "topic", "gradeLevel", "strandStandards", "indicators", "keyCompetencies", "desiredCharacteristics", 
    "objectives", "summary", "vocabulary", "grammar", "worksheetIdeas", "procedure", "materials", 
    "assessment", "reflection", "teacherName", "departmentHeadName"
  ]
};

export const generateLessonPlan = async (request: LessonPlanRequest): Promise<LessonPlan> => {
  const prompt = `
    Generate a complete, structured lesson plan for formal academic submission in Thailand.
    The plan MUST strictly base its Standards and Indicators on the official Thailand Ministry of Education (MOE) Basic Education Core Curriculum B.E. 2551 (A.D. 2008) for Foreign Languages.

    Topic: ${request.topic}
    Grade Level: ${request.gradeLevel}
    Student Ability: ${request.studentLevel}
    Duration: ${request.duration} minutes
    Language Focus: ${request.focusArea}

    STRICT RULES:
    1. Use ONLY the exact wording from the B.E. 2551 curriculum for Standards and Indicators.
    2. Standards for Foreign Languages (English) are:
       - FL1.1: Understanding and ability in interpreting what has been heard and read from various types of media, and ability to express opinions with reasons.
       - FL1.2: Possessing language communication skills for effective exchange of information; efficient expression of feelings and opinions.
       - FL1.3: Ability to speak and write about information, concepts and views on various matters.
       - FL2.1: Appreciating the relationship between language and culture of native speakers and ability in using language appropriately.
       - FL2.2: Appreciating the similarities and the differences between language and culture of the native speakers and Thai speakers, and ability in using accurate and appropriate language.
       - FL3.1: Using foreign languages to link knowledge with other learning areas, as foundation for further development, seeking knowledge and broadening one’s world view.
       - FL4.1: Ability to use foreign languages in various situations: in school, community and society.
       - FL4.2: Using foreign languages as basic tools for further education, livelihood and exchange of learning with the world community.
    3. Indicators: Select the most relevant grade-level indicators for ${request.gradeLevel} from the curriculum data. Use exact wording.
    4. Alignment: Learning objectives, activities, and assessments must directly support and measure the achievement of the selected indicators.
    5. Structure:
       - Subject: English Language
       - Grade Level: ${request.gradeLevel}
       - Teaching Procedures: Use PPP (Presentation, Practice, Production) model.
       - Reflection: Include a section for post-lesson reflection.
       - Signatures: Include placeholders for Teacher and Department Head.
    6. Language: Use clear, professional educational language.
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
