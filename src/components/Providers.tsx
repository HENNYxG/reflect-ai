'use client'

import { AnalysisProvider } from '../../src/context/analysis.context'

const Providers = ({children}) => {
    return <AnalysisProvider>{children}</AnalysisProvider>;
}
export default Providers