
import React, { useState } from 'react';
import { LessonPlan } from '../types';
import { exportToPDF, exportToDocx } from '../services/exportService';

interface Props {
  plan: LessonPlan;
}

export const LessonPlanView: React.FC<Props> = ({ plan }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handlePDFExport = async () => {
    setIsExporting(true);
    try {
      await exportToPDF('lesson-plan-content', `Lesson_Plan_${plan.topic.replace(/\s+/g, '_')}`);
    } catch (err) {
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDocxExport = async () => {
    setIsExporting(true);
    try {
      await exportToDocx(plan, `Lesson_Plan_${plan.topic.replace(/\s+/g, '_')}`);
    } catch (err) {
      alert('Failed to export Word document. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className = "" }) => (
    <div className={`p-6 bg-white rounded-2xl border border-gray-100 shadow-sm ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <div className="text-indigo-600">{icon}</div>
        <h3 className="font-bold text-gray-800 uppercase tracking-wide text-sm">{title}</h3>
      </div>
      <div className="text-gray-600 leading-relaxed text-sm md:text-base">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div id="lesson-plan-content" className="space-y-6 p-1 bg-white rounded-3xl"> {/* Added ID and small padding for export */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <svg className="w-24 h-24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          </div>
          <p className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-2">{plan.subject}</p>
          <h2 className="text-3xl font-black text-indigo-900 mb-2">{plan.topic}</h2>
          <p className="text-indigo-700 font-medium">{plan.gradeLevel}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-indigo-700 border border-indigo-200">MOE B.E. 2551 Aligned</span>
            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-indigo-700 border border-indigo-200">PPP Model</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Section 
            title="Learning Standards" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10a7.969 7.969 0 013.5-.804c1.191 0 2.32.232 3.351.652a9.97 9.97 0 003.149-1.326v-10A9.957 9.957 0 019 4.804zM11 14.716A9.957 9.957 0 0113.5 14c1.255 0 2.443.29 3.5.804v-10A7.969 7.969 0 0013.5 4c-1.191 0-2.32.232-3.351.652A9.97 9.97 0 0111 14.716z" /></svg>}
            className="md:col-span-3 bg-amber-50 border-amber-100"
          >
            <p className="font-semibold text-amber-900 mb-1">Ministry of Education Core Curriculum B.E. 2551:</p>
            <p className="text-amber-800 italic">{plan.strandStandards}</p>
          </Section>

          <Section 
            title="Indicators" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
            className="md:col-span-3 bg-emerald-50 border-emerald-100"
          >
            <ul className="list-disc pl-5 space-y-1 text-emerald-900">
              {plan.indicators.map((ind, i) => <li key={i} className="italic">{ind}</li>)}
            </ul>
          </Section>

          <Section 
            title="Key Competencies" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" /></svg>}
          >
            <ul className="list-disc pl-5 space-y-1">
              {plan.keyCompetencies.map((comp, i) => <li key={i}>{comp}</li>)}
            </ul>
          </Section>

          <Section 
            title="Desired Characteristics" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>}
          >
            <ul className="list-disc pl-5 space-y-1">
              {plan.desiredCharacteristics.map((char, i) => <li key={i}>{char}</li>)}
            </ul>
          </Section>

          <Section 
            title="Learning Objectives" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
          >
            <ul className="list-disc pl-5 space-y-1">
              {plan.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
            </ul>
          </Section>

          <Section 
            title="Vocabulary" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>}
          >
            <div className="flex flex-wrap gap-2">
              {plan.vocabulary.map((vocab, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg border border-gray-200">{vocab}</span>
              ))}
            </div>
          </Section>

          <Section 
            title="Grammar Focus" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" /></svg>}
          >
            <p className="font-medium text-indigo-700">{plan.grammar}</p>
          </Section>

          <Section title="Lesson Procedure (PPP Model)" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>} className="md:col-span-3">
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-blue-700 uppercase text-xs tracking-widest">Warm Up</span>
                  <span className="text-xs font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded">{plan.procedure.warmUp.duration}</span>
                </div>
                <h4 className="font-semibold text-gray-800">{plan.procedure.warmUp.title}</h4>
                <p className="mt-1 text-gray-600">{plan.procedure.warmUp.content}</p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-indigo-700 uppercase text-xs tracking-widest">Presentation</span>
                  <span className="text-xs font-mono bg-indigo-100 text-indigo-700 px-2 py-1 rounded">{plan.procedure.presentation.duration}</span>
                </div>
                <h4 className="font-semibold text-gray-800">{plan.procedure.presentation.title}</h4>
                <p className="mt-1 text-gray-600">{plan.procedure.presentation.content}</p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-purple-700 uppercase text-xs tracking-widest">Practice</span>
                  <span className="text-xs font-mono bg-purple-100 text-purple-700 px-2 py-1 rounded">{plan.procedure.practice.duration}</span>
                </div>
                <h4 className="font-semibold text-gray-800">{plan.procedure.practice.title}</h4>
                <p className="mt-1 text-gray-600">{plan.procedure.practice.content}</p>
              </div>

              <div className="border-l-4 border-pink-500 pl-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-pink-700 uppercase text-xs tracking-widest">Production (Product)</span>
                  <span className="text-xs font-mono bg-pink-100 text-pink-700 px-2 py-1 rounded">{plan.procedure.production.duration}</span>
                </div>
                <h4 className="font-semibold text-gray-800">{plan.procedure.production.title}</h4>
                <p className="mt-1 text-gray-600">{plan.procedure.production.content}</p>
              </div>

              <div className="border-l-4 border-slate-500 pl-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-700 uppercase text-xs tracking-widest">Wrap Up</span>
                  <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">{plan.procedure.wrapUp.duration}</span>
                </div>
                <h4 className="font-semibold text-gray-800">{plan.procedure.wrapUp.title}</h4>
                <p className="mt-1 text-gray-600">{plan.procedure.wrapUp.content}</p>
              </div>
            </div>
          </Section>

          <Section title="Worksheet Ideas" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>} className="md:col-span-2">
            <p className="whitespace-pre-line">{plan.worksheetIdeas}</p>
          </Section>

          <Section title="Materials" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>}>
            <ul className="list-disc pl-5 space-y-1">
              {plan.materials.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </Section>

          <Section title="Assessment" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>} className="md:col-span-3">
            <p>{plan.assessment}</p>
          </Section>

          <Section title="Reflection" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>} className="md:col-span-3 bg-slate-50 border-slate-100">
            <p className="italic">{plan.reflection}</p>
          </Section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-2 gap-8 px-8 pb-8">
          <div className="text-center space-y-4">
            <div className="h-px bg-gray-400 w-48 mx-auto"></div>
            <p className="text-sm font-bold text-gray-800">{plan.teacherName}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Teacher</p>
          </div>
          <div className="text-center space-y-4">
            <div className="h-px bg-gray-400 w-48 mx-auto"></div>
            <p className="text-sm font-bold text-gray-800">{plan.departmentHeadName}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Department Head</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center mt-8 gap-4">
        <button 
          onClick={() => window.print()} 
          disabled={isExporting}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-900 transition shadow-lg disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" /></svg>
          <span>Print</span>
        </button>

        <button 
          onClick={handlePDFExport} 
          disabled={isExporting}
          className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
          <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
        </button>

        <button 
          onClick={handleDocxExport} 
          disabled={isExporting}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" /></svg>
          <span>{isExporting ? 'Exporting...' : 'Export Word'}</span>
        </button>
      </div>
    </div>
  );
};

