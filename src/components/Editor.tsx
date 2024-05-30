'use client'
import { updateEntry } from '@/utils/api';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';
import Spinner from './Spinner';
import AnalysisSidebar from './AnalysisSidebar';

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis);

    //we use _value for the latest version
    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
          const data = await updateEntry(entry.id, _value)
          setAnalysis(data.analysis)
            setIsLoading(false)
        },
    })
    return (
      <div className="w-full h-full grid grid-cols-3 gap-0 relative">
        <div className="absolute left-0 top-0 p-2">
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
          )}
        </div>
        <div className="col-span-2">
          <textarea
            className="w-full h-full p-8 text-xl outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="col-span-1 ">
          <AnalysisSidebar analysis={analysis} />
        </div>
      </div>
    );
};

export default Editor;
