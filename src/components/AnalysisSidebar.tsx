'use client'
import { useState } from 'react'

const AnalysisSidebar = ({analysis}) => {
//   const [analysis, setAnalysis] = useState(entry.analysis);
  const { mood, summary, color, subject, negative } = analysis;
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ];

  return (
    <div className="border-l border-black/10 h-full">
      <div className="px-6 py-10" style={{ backgroundColor: color }}>
        <h2 className="text-2xl"> Analysis</h2>
      </div>
      <div>
        <ul>
          {analysisData.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between px-2 py-4 border-b border-t border-black/10"
            >
              <span className="text-lg font-semibold p-2">{item.name}</span>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default AnalysisSidebar