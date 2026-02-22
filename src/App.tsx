/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  Trophy, 
  BookOpen, 
  GraduationCap,
  AlertCircle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  QUESTION_BANK, 
  Question, 
  Difficulty, 
  Grade,
  GrammarPoint, 
  Option 
} from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'quiz' | 'result'>('welcome');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'all'>('all');
  const [filterGrade, setFilterGrade] = useState<Grade | 'all'>('all');

  const filteredQuestions = useMemo(() => {
    return QUESTION_BANK.filter(q => {
      const matchDifficulty = filterDifficulty === 'all' || q.difficulty === filterDifficulty;
      const matchGrade = filterGrade === 'all' || q.grade === filterGrade;
      return matchDifficulty && matchGrade;
    });
  }, [filterDifficulty, filterGrade]);

  const currentQuestion = filteredQuestions[currentIndex];

  const handleStart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
    setCurrentStep('quiz');
  };

  const handleSelect = (optionId: string) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion.id]: optionId });
  };

  const handleSubmit = () => {
    if (!selectedAnswers[currentQuestion.id]) return;
    
    const selectedOption = currentQuestion.options.find(o => o.id === selectedAnswers[currentQuestion.id]);
    if (selectedOption?.isCorrect) {
      setScore(prev => prev + 1);
    }
    setSubmitted(true);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSubmitted(false);
      setShowExplanation(false);
    } else {
      setCurrentStep('result');
    }
  };

  const handleRestart = () => {
    setCurrentStep('welcome');
  };

  const progress = ((currentIndex + (submitted ? 1 : 0)) / filteredQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-bottom border-slate-200 px-4 py-3 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-800 hidden sm:block">GrammarMaster</h1>
          </div>
          
          {currentStep === 'quiz' && (
            <div className="flex items-center gap-4 flex-1 max-w-xs mx-4">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-mono font-medium text-slate-500 whitespace-nowrap">
                {currentIndex + 1} / {filteredQuestions.length}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
             <span className="text-sm font-medium text-slate-600">Score: {score}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8 py-12"
            >
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                  掌握英语句法的 <span className="text-indigo-600">秘密武器</span>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  专为中小学生打造的互动语法实验室。通过情境化练习，攻克定语从句、非谓语动词等核心难点。
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">选择年级</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {(['all', Grade.PRIMARY_LOW, Grade.PRIMARY_HIGH, Grade.JUNIOR_HIGH] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setFilterGrade(g)}
                        className={cn(
                          "px-5 py-2 rounded-xl text-sm font-semibold transition-all border-2",
                          filterGrade === g 
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100" 
                            : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300"
                        )}
                      >
                        {g === 'all' ? '全部年级' : g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">选择难度</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {(['all', Difficulty.BEGINNER, Difficulty.INTERMEDIATE, Difficulty.ADVANCED] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => setFilterDifficulty(d)}
                        className={cn(
                          "px-5 py-2 rounded-xl text-sm font-semibold transition-all border-2",
                          filterDifficulty === d 
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100" 
                            : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300"
                        )}
                      >
                        {d === 'all' ? '全部难度' : d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleStart}
                  disabled={filteredQuestions.length === 0}
                  className="group relative inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-xl disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {filteredQuestions.length > 0 ? `开始挑战 (${filteredQuestions.length} 题)` : '暂无匹配题目'}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
                {[
                  { icon: CheckCircle2, title: "即时反馈", desc: "答题即出解析，快速纠错" },
                  { icon: BookOpen, title: "深度解析", desc: "涵盖规则、例句与避坑指南" },
                  { icon: Trophy, title: "趣味激励", desc: "阶梯难度，见证你的成长" },
                ].map((feature, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <feature.icon className="w-8 h-8 text-indigo-500 mb-4 mx-auto" />
                    <h3 className="font-bold text-slate-800 mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 'quiz' && currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Question Card */}
              <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500" />
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    {currentQuestion.category}
                  </span>
                  <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    {currentQuestion.grade}
                  </span>
                  <span className={cn(
                    "px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider",
                    currentQuestion.difficulty === Difficulty.BEGINNER ? "bg-emerald-50 text-emerald-600" :
                    currentQuestion.difficulty === Difficulty.INTERMEDIATE ? "bg-amber-50 text-amber-600" :
                    "bg-rose-50 text-rose-600"
                  )}>
                    {currentQuestion.difficulty}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-medium leading-relaxed text-slate-800 mb-12">
                  {currentQuestion.sentence.split('______').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={cn(
                          "inline-flex items-center justify-center min-w-[120px] px-4 py-1 mx-2 border-b-4 transition-all",
                          submitted 
                            ? (currentQuestion.options.find(o => o.id === selectedAnswers[currentQuestion.id])?.isCorrect 
                                ? "border-emerald-500 text-emerald-600 bg-emerald-50" 
                                : "border-rose-500 text-rose-600 bg-rose-50")
                            : (selectedAnswers[currentQuestion.id] ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-slate-300 text-slate-400")
                        )}>
                          {selectedAnswers[currentQuestion.id] 
                            ? currentQuestion.options.find(o => o.id === selectedAnswers[currentQuestion.id])?.text 
                            : "点击下方选项"}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                    const isCorrect = option.isCorrect;
                    
                    let buttonClass = "flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all font-semibold ";
                    
                    if (submitted) {
                      if (isCorrect) {
                        buttonClass += "bg-emerald-50 border-emerald-500 text-emerald-700";
                      } else if (isSelected) {
                        buttonClass += "bg-rose-50 border-rose-500 text-rose-700";
                      } else {
                        buttonClass += "bg-white border-slate-100 text-slate-400 opacity-50";
                      }
                    } else {
                      if (isSelected) {
                        buttonClass += "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md";
                      } else {
                        buttonClass += "bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-slate-50";
                      }
                    }

                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelect(option.id)}
                        disabled={submitted}
                        className={buttonClass}
                      >
                        <span>{option.text}</span>
                        {submitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                        {submitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-4">
                {!submitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedAnswers[currentQuestion.id]}
                    className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-100"
                  >
                    提交答案
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="group bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg"
                  >
                    {currentIndex < filteredQuestions.length - 1 ? "下一题" : "查看结果"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>

              {/* Explanation Card */}
              <AnimatePresence>
                {submitted && showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-8 shadow-xl border border-indigo-100 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-2 mb-6 text-indigo-600">
                      <Lightbulb className="w-6 h-6" />
                      <h3 className="text-xl font-bold">详解卡片</h3>
                    </div>

                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 space-y-2">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">正确答案</p>
                          <p className="text-xl font-bold text-emerald-600">{currentQuestion.explanation.correctAnswer}</p>
                        </div>
                        <div className="flex-1 space-y-2">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">语法规则</p>
                          <p className="text-slate-700 leading-relaxed">{currentQuestion.explanation.rule}</p>
                        </div>
                      </div>

                      <div className="h-px bg-slate-100" />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-indigo-500">
                            <CheckCircle2 className="w-4 h-4" />
                            <p className="text-xs font-bold uppercase tracking-widest">经典例句</p>
                          </div>
                          <p className="text-slate-600 italic font-medium">"{currentQuestion.explanation.example}"</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-rose-500">
                            <AlertCircle className="w-4 h-4" />
                            <p className="text-xs font-bold uppercase tracking-widest">常见误区</p>
                          </div>
                          <p className="text-slate-600">{currentQuestion.explanation.pitfall}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {currentStep === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center space-y-8 py-12"
            >
              <div className="relative inline-block">
                <Trophy className="w-24 h-24 text-amber-400 mx-auto mb-4" />
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute -top-2 -right-2 bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 border-white"
                >
                  {Math.round((score / filteredQuestions.length) * 100)}
                </motion.div>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-slate-900">
                  {score === filteredQuestions.length ? "太棒了！你是语法大师！" : 
                   score > filteredQuestions.length / 2 ? "做得不错！继续加油！" : 
                   "别灰心，多练习会更好！"}
                </h2>
                <p className="text-slate-500 text-lg">
                  你完成了本次挑战，得分：<span className="font-bold text-indigo-600">{score} / {filteredQuestions.length}</span>
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-left space-y-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  推荐复习建议
                </h3>
                <ul className="space-y-4">
                  {[
                    { title: "巩固基础", desc: "复习状语从句的引导词辨析", link: "#" },
                    { title: "进阶提升", desc: "深入理解非谓语动词的时态与语态", link: "#" },
                    { title: "专项突破", desc: "练习独立主格结构在写作中的应用", link: "#" },
                  ].map((rec, i) => (
                    <li key={i} className="group flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="mt-1 w-2 h-2 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform" />
                      <div>
                        <p className="font-bold text-slate-700 text-sm">{rec.title}</p>
                        <p className="text-slate-500 text-xs">{rec.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 bg-white border-2 border-slate-200 text-slate-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95"
                >
                  <RotateCcw className="w-5 h-5" />
                  重新开始
                </button>
                <button
                  onClick={handleRestart}
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
                >
                  返回首页
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
          &copy; 2024 GrammarMaster • 助力每一位学习者
        </p>
      </footer>
    </div>
  );
}
