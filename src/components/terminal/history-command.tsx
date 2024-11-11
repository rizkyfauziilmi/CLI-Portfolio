import { cn } from "@/lib/utils";
import { commandLists, useTerminalStore } from "@/stores/terminal-store"

export const HistoryCommand = () => {
    const { history } = useTerminalStore();

    const historiesMapping = [...history.histories].reverse();

    return (
        <div>
            {historiesMapping.map((historyValue, index) => {
                const reversedIndex = history.histories.length - index - 1;
                const isSelectedHistory = reversedIndex === history.historyIndex;
                const isValidCommand = commandLists.indexOf(historyValue.toLowerCase()) !== -1;

                return (
                    <div key={historyValue}
                        className={cn(
                            "px-2 py-1 rounded-sm",
                            isSelectedHistory && "bg-primary",
                            isValidCommand ? "text-green-600" : "text-red-700"
                        )}>
                        {historyValue}
                    </div>
                )
            })}
        </div>
    )
}