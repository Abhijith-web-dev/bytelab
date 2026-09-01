import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Eye, Cpu, Database, Check } from 'lucide-react';
import { Button } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx';

/**
 * Interactive Step-by-Step Code Simulation Player
 * Visualizes code execution line-by-line with variable state transitions and memory inspector
 */
export const CodeSimulationPlayer = React.memo(function CodeSimulationPlayer({ simulationData }) {
  if (!simulationData || !simulationData.steps || simulationData.steps.length === 0) {
    return null;
  }

  const { title, description, codeLines = [], steps = [] } = simulationData;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalSteps = steps.length;
  const currentStep = steps[currentStepIndex];

  // Auto-play interval
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < totalSteps - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSteps]);

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <div className="rounded-[16px] bg-white border border-slate-200 shadow-sm overflow-hidden font-sans">
      {/* Simulation Header */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
              Interactive Execution Simulator
            </span>
          </div>
          <h3 className="text-[18px] font-semibold text-slate-900 tracking-tight">
            {title}
          </h3>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-full border border-slate-200 shadow-sm">
          <button
            onClick={handleReset}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400"
            title="Previous Step"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-1.5 rounded-full shadow-md"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current mr-1" />
                <span className="font-semibold">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current mr-1" />
                <span className="font-semibold">Auto-Step</span>
              </>
            )}
          </Button>
          <button
            onClick={handleNext}
            disabled={currentStepIndex === totalSteps - 1}
            className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400"
            title="Next Step"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport (Split Code & Memory Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left Column: Code Line Highlighter (7 cols) */}
        <div className="lg:col-span-7 bg-[#0f111a] text-slate-50 p-5 font-mono text-[14px] leading-loose overflow-x-auto select-none">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-[12px] text-slate-400 font-sans">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm" />
              </div>
              <span className="font-medium ml-2 tracking-wide">program.py</span>
            </div>
            <span className="bg-white/10 px-2 py-0.5 rounded-full text-[11px] font-semibold text-slate-300">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
          </div>

          <div className="space-y-1">
            {codeLines.map((line, idx) => {
              const lineNum = idx + 1;
              const isCurrentLine = currentStep.activeLine === lineNum;

              return (
                <div
                  key={idx}
                  className={`flex items-center px-3 py-1 rounded-[6px] transition-all duration-200 ${
                    isCurrentLine
                      ? 'bg-[#2563eb]/30 border-l-[3px] border-[#60a5fa] text-white font-semibold shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-l-[3px] border-transparent'
                  }`}
                >
                  <span className="w-6 shrink-0 text-slate-500 text-[12px] select-none text-right mr-4 font-mono">
                    {lineNum}
                  </span>
                  <span className="whitespace-pre tracking-wide">{line}</span>
                  {isCurrentLine && (
                    <span className="ml-auto text-[10px] text-blue-200 font-sans uppercase font-bold tracking-widest bg-blue-500/30 px-2 py-0.5 rounded shrink-0 ring-1 ring-blue-400/50">
                      Executing
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Memory Stack & Variable Watcher (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 flex flex-col justify-between">
          <div className="p-5 space-y-5">
            {/* Step Explanation Callout */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-100 rounded-md text-indigo-700">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="text-[13px] font-bold uppercase tracking-wider text-slate-700">
                  CPython Evaluation State
                </h4>
              </div>

              <div className="p-4 rounded-[10px] bg-white border border-slate-200 shadow-sm text-[14px] text-slate-700 leading-relaxed font-medium min-h-[60px]">
                {currentStep.explanation || currentStep.description || "Executing..."}
              </div>
            </div>

            {/* Variable Watcher Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-slate-700">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>Memory & Variables</span>
                </div>
                <span className="text-[11px] font-mono bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-semibold">Scope: local</span>
              </div>

              <div className="rounded-[10px] bg-white border border-slate-200 shadow-sm overflow-x-auto text-[13px]">
                <table className="w-full text-left font-mono">
                  <thead className="bg-slate-100 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-4 w-1/3">Name</th>
                      <th className="py-2.5 px-4 w-1/3">Type</th>
                      <th className="py-2.5 px-4 w-1/3">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(currentStep.variables || currentStep.state) && Object.keys(currentStep.variables || currentStep.state).length > 0 ? (
                      Object.entries(currentStep.variables || currentStep.state).map(([name, info]) => {
                        const typeVal = typeof info === 'object' && info !== null ? info.type : typeof info;
                        const valVal = typeof info === 'object' && info !== null ? info.value : String(info);
                        return (
                        <tr key={name} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-4 font-bold text-slate-900">{name}</td>
                          <td className="py-2.5 px-4 text-slate-500 text-[12px]">{typeVal}</td>
                          <td className="py-2.5 px-4 text-blue-700 font-bold bg-blue-50/50">{valVal}</td>
                        </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="3" className="py-6 px-4 text-center text-slate-400 text-[13px] italic bg-slate-50/50">
                          Empty stack frame (no variables initialized yet)
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Output Terminal Stream */}
          {currentStep.output && (
            <div className="p-5 pt-0 mt-auto">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2 px-1">
                Standard Output (stdout)
              </span>
              <div className="p-4 rounded-[8px] bg-[#0f111a] border border-slate-800 text-[#4ade80] font-mono text-[13px] shadow-inner tracking-wide whitespace-pre-wrap">
                {currentStep.output}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Timeline Stepper */}
      <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between text-[13px] font-medium text-slate-500">
        <div className="flex items-center gap-1.5 flex-1">
          {steps.map((_, sIdx) => (
            <button
              key={sIdx}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(sIdx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-400 ${
                sIdx === currentStepIndex
                  ? 'w-8 bg-slate-900 shadow-sm'
                  : sIdx < currentStepIndex
                  ? 'w-2 bg-emerald-500'
                  : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              title={`Jump to Step ${sIdx + 1}`}
            />
          ))}
        </div>
        <span className="font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full text-[12px]">
          {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% Complete
        </span>
      </div>
    </div>
  );
});
