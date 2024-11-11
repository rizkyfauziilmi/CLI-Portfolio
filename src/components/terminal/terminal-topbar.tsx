import { Button } from "../ui/button";

export const TerminalTopBar = () => {
  return (
    <div className="flex justify-between h-fit">
      <Button size="icon" variant="ghost" className="hover:bg-muted">
        <span className="text-3xl font-light">+</span>
      </Button>
      <div className="text-center">
        <div className="text-sm font-semibold">
          rizkyfauziilmi@rizkyfauziilmi:~
        </div>
        <p className="text-xs text-muted-foreground">~</p>
      </div>
      <div className="flex space-x-1.5 p-2">
        <div className="size-3 bg-green-500 rounded-full hover:scale-110 transition-transform duration-200"></div>
        <div className="size-3 bg-yellow-500 rounded-full hover:scale-110 transition-transform duration-200"></div>
        <div className="size-3 bg-red-500 rounded-full hover:scale-110 transition-transform duration-200" onClick={() => {
          // close current tab
          window.close();
        }}></div>
      </div>
    </div>
  );
};
