import { TerminalContent } from "./terminal-content";
import { TerminalTopBar } from "./terminal-topbar";

export const Terminal = () => {
  return (
    <div className="h-screen w-screen p-[0.35rem] overflow-hidden space-y-2 flex flex-col">
      <TerminalTopBar />
      <TerminalContent />
    </div>
  );
};
