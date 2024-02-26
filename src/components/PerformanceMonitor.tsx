import { Perf } from 'r3f-perf'

interface IPerformanceMonitorProps {
  perfMonitor?: boolean
}

export const PerformanceMonitor = ({
  perfMonitor,
}: IPerformanceMonitorProps) => {
  return perfMonitor ? <Perf position="bottom-left" /> : null
}
