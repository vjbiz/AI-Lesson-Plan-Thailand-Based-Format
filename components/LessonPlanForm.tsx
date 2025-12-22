
import React from 'react';
import { LessonPlanRequest, GradeLevel } from '../types';

interface Props {
  onGenerate: (data: LessonPlanRequest) => void;
  isLoading: boolean;
}

export const LessonPlanForm: React.FC<Props> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = React.useState<LessonPlanRequest>({
    topic: '',
    gradeLevel: 'P1 (Prathom 1)',
    duration: '60',
    focusArea: 'Speaking & Listening',
    studentLevel: 'Beginner',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const gradeLevels: GradeLevel[] = [
    'P1 (Prathom 1)', 'P2 (Prathom 2)', 'P3 (Prathom 3)', 
    'P4 (Prathom 4)', 'P5 (Prathom 5)', 'P6 (Prathom 6)',
    'M1 (Mattayom 1)', 'M2 (Mattayom 2)', 'M3 (Mattayom 3)',
    'M4 (Mattayom 4)', 'M5 (Mattayom 5)', 'M6 (Mattayom 6)'
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block">Lesson Topic / Theme</label>
          <input
            type="text"
            required
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            placeholder="e.g., Daily Routines, At the Zoo..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block">Grade Level (Thai System)</label>
          <select
            value={formData.gradeLevel}
            onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value as GradeLevel })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          >
            {gradeLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block">Duration (Minutes)</label>
          <input
            type="number"
            required
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block">Main Focus</label>
          <select
            value={formData.focusArea}
            onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          >
            <option>Speaking & Listening</option>
            <option>Reading & Writing</option>
            <option>Integrated Skills</option>
            <option>Grammar & Vocabulary</option>
            <option>Phonics / Pronunciation</option>
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-gray-700 block">Student Ability Level</label>
          <div className="flex space-x-4">
            {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData({ ...formData, studentLevel: level })}
                className={`flex-1 py-3 px-4 rounded-xl border transition font-medium ${
                  formData.studentLevel === level
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 ${
          isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Drafting Lesson Plan...</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.95V4h2.803a1 1 0 01.95.697l2.197 7.14a1 1 0 01-.95 1.163H15.5V17a2 2 0 01-2 2h-3a2 2 0 01-2-2v-3.5h-1a1 1 0 01-1-1v-4a1 1 0 011-1h1V4a1 1 0 01.95-.697l2.197-2.197a1 1 0 01.95-.06zM13.5 13h2.1l-1.54-5H13.5v5z" clipRule="evenodd" />
            </svg>
            <span>Generate Professional Lesson Plan</span>
          </>
        )}
      </button>
    </form>
  );
};
