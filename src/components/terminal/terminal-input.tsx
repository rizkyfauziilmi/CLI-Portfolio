import { commandLists, useTerminalStore } from "@/stores/terminal-store";
import { Input } from "../ui/input";
import { useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface TerminalInputProps {
    scrollToBottom: () => void;
}

export const TerminalInput = ({
    scrollToBottom
}: TerminalInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { processor, output, history, input } = useTerminalStore();

    // Focus the input when the component mounted
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Scroll to the bottom when the processing complete
    useEffect(() => {
        if (processor.isProcessingComplete) {
            scrollToBottom();
        }
    }, [processor.isProcessingComplete, scrollToBottom]);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        // If the key printable character, focus the input
        if (event.key.length === 1) {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }

        // If user press Enter, process the command
        if (event.key === "Enter") {
            processor.processCommand();
            input.setInputValue("");
            history.resetHistoryIndex();
            inputRef.current?.focus();
        }

        // clear input when ctrl + c pressed
        if (event.key === "c" && event.ctrlKey) {
            input.setInputValue("");
            history.resetHistoryIndex();
            output.addOutput({
                text: "^C",
                isCommand: true,
                isError: true,
            })
        }

        // navigate through history when arrow up or down pressed
        if (event.key === "ArrowUp") {
            const upHistoryCommand = history.upHistory();
            input.setInputValue(upHistoryCommand);
        }
        if (event.key === "ArrowDown") {
            const downHistoryCommand = history.downHistory();
            input.setInputValue(downHistoryCommand);
        }
    };

    const handleBlur = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        input.setInputValue(e.target.value);
        history.resetHistoryIndex(); // Reset history index when typing or deleting a character
    };

    const isValidCommand = commandLists.indexOf(input.inputValue.toLowerCase().trim()) !== -1;

    return (
        <div className="flex items-center">
            <span className="text-orange-400 mr-4">
                ➜
            </span>
            <span>
                ~
            </span>
            <Input
                ref={inputRef}
                className={cn(
                    "w-full h-9 rounded-md bg-transparent px-3 py-1 shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent border-none",
                    input.inputValue.trim() === "" ? "text-primary" : isValidCommand ? "text-green-500" : "text-red-700"
                )}
                value={input.inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
            />
        </div>
    );
};
