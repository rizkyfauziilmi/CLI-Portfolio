import { cn } from "@/lib/utils";
import { TerminalTypeOutput } from "@/stores/terminal-store";

interface TerminalOutputProps {
    output: TerminalTypeOutput;
}

export const TerminalOutput = ({
    output,
}: TerminalOutputProps) => {
    if (output.isCommand) {
        return (

            <div className="flex items-center py-2">
                <span className={cn(output.isError ? "text-red-700" : "text-green-600", "mr-4")}>
                    ➜
                </span>
                <span>
                    ~
                </span>
                <span className={cn(output.isError ? "text-red-700" : "text-green-600", "font-semibold px-3 py-1")}>
                    {output.text}
                </span>
            </div>
        )
    }

    return (
        <div>
            {output.isComponentFirst && output.component && output.component()}
            {output.text && (
                <pre>
                    {output.text}
                </pre>
            )}
            {output.component && !output.isComponentFirst && output.component()}
        </div>
    )
}
