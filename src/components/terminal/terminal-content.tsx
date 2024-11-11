import { useTerminalStore } from "@/stores/terminal-store"
import { TerminalInput } from "./terminal-input";
import { TerminalOutput } from "./terminal-output";
import { useRef } from "react";
import { HistoryCommand } from "./history-command";

export const TerminalContent = () => {
    const { output, history } = useTerminalStore();
    const contentRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (contentRef.current) {
            contentRef.current.scrollTo({
                behavior: "smooth",
                top: contentRef.current.scrollHeight,
            });
        }
    }

    return (
        <div ref={contentRef} className="text-sm break-words flex-1 overflow-auto font-mono">
            {output.outputs.map((output, index) => (
                <TerminalOutput key={index} output={output} />
            ))}
            <TerminalInput scrollToBottom={scrollToBottom} />
            {history.historyIndex !== -1 && (
                <HistoryCommand />
            )}
        </div>
    )
}