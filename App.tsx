
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LessonPlanForm } from './components/LessonPlanForm';
import { LessonPlanView } from './components/LessonPlanView';
import { generateLessonPlan } from './services/geminiService';
import { LessonPlan, LessonPlanRequest } from './types';

const App: React.FC = () => {
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: LessonPlanRequest) => {
    setIsLoading(true);
    setError(null);
    setLessonPlan(null); // Clear previous plan
    try {
      const plan = await generateLessonPlan(data);
      setLessonPlan(plan);
      // Scroll to result on mobile
      setTimeout(() => {
        const resultEl = document.getElementById('lesson-plan-result');
        if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || "Something went wrong while generating the lesson plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest mb-2">
            AI-Powered Education
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Lesson Plans for <span className="text-indigo-600">Thailand</span>.
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Generate standard-aligned, Ministry of Education compliant lesson plans in seconds. Tailored for foreign language teachers.
          </p>
        </section>

        <section id="generator-form">
          <LessonPlanForm onGenerate={handleGenerate} isLoading={isLoading} />
        </section>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-red-700 font-bold">Generation Error</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        <div id="lesson-plan-result">
          {lessonPlan && <LessonPlanView plan={lessonPlan} />}
        </div>
        
        {!lessonPlan && !isLoading && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="flex flex-col items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="font-medium">No lesson plan generated yet.</p>
              <p className="text-sm">Fill out the form above to start your planning.</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
