import React, { createContext, useContext, useState, useEffect } from 'react';
import { Report, Story, Question, Experience } from '../types';
import { storageService } from '../services/storageService';

interface DataContextType {
  reports: Report[];
  stories: Story[];
  questions: Question[];
  experiences: Experience[];
  addReport: (report: Report) => void;
  addStory: (story: Story) => void;
  addQuestion: (question: Question) => void;
  addExperience: (experience: Experience) => void;
  updateReport: (report: Report) => void;
  updateQuestion: (question: Question) => void;
  updateExperience: (experience: Experience) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    // Load initial data
    setReports(storageService.getReports());
    setStories(storageService.getStories());
    setQuestions(storageService.getQuestions());
    setExperiences(storageService.getExperiences());
  }, []);

  const addReport = (report: Report) => {
    storageService.saveReport(report);
    setReports(prev => [...prev, report]);
  };

  const addStory = (story: Story) => {
    storageService.saveStory(story);
    setStories(prev => [...prev, story]);
  };

  const addQuestion = (question: Question) => {
    storageService.saveQuestion(question);
    setQuestions(prev => [...prev, question]);
  };

  const addExperience = (experience: Experience) => {
    storageService.saveExperience(experience);
    setExperiences(prev => [...prev, experience]);
  };

  const updateReport = (report: Report) => {
    storageService.updateReport(report);
    setReports(prev => prev.map(r => r.id === report.id ? report : r));
  };

  const updateQuestion = (question: Question) => {
    storageService.updateQuestion(question);
    setQuestions(prev => prev.map(q => q.id === question.id ? question : q));
  };

  const updateExperience = (experience: Experience) => {
    storageService.updateExperience(experience);
    setExperiences(prev => prev.map(e => e.id === experience.id ? experience : e));
  };

  return (
    <DataContext.Provider value={{
      reports,
      stories,
      questions,
      experiences,
      addReport,
      addStory,
      addQuestion,
      addExperience,
      updateReport,
      updateQuestion,
      updateExperience
    }}>
      {children}
    </DataContext.Provider>
  );
};