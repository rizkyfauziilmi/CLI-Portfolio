import { ProfileComponent } from "@/components/output/profile-component";
import { create } from "zustand";

export type TerminalTypeOutput = {
  text?: string;
  component?: () => JSX.Element;
  isComponentFirst?: boolean;
  isCommand: boolean;
  isError?: boolean;
};

type HistoryType = {
  histories: string[];
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
  resetHistoryIndex: () => void;
  addHistory: (command: string) => void;
  upHistory: () => string;
  downHistory: () => string;
};

type OutputType = {
  outputs: TerminalTypeOutput[];
  addOutput: (output: TerminalTypeOutput) => void;
  printError: (error: {
    invalidPart: string;
    type: "COMMAND_NOT_FOUND" | "INVALID_ARGUMENT";
  }) => void;
  printHelp: () => void;
  printProfile: () => void;
  clearCommand: () => void;
};

type ProcessorType = {
  isProcessingComplete: boolean;
  processCommand: (command: string) => void;
};

interface TerminalState {
  history: HistoryType;
  output: OutputType;
  processor: ProcessorType;
}

export const commandLists = ["clear", "help", "profile"];

export const useTerminalStore = create<TerminalState>()((set, get) => ({
  output: {
    outputs: [
      {
        text: "Welcome to Rizky Fauzi Ilmi's Portfolio",
        isCommand: false,
      },
      {
        text: "Type 'help' to get started",
        isCommand: false,
      },
    ],
    addOutput(output) {
      set((state) => ({
        output: { ...state.output, outputs: [...state.output.outputs, output] },
      }));
    },
    printError(error) {
      const { type, invalidPart } = error;
      const errorMessages = {
        COMMAND_NOT_FOUND: `Command '${invalidPart}' not found. Type 'help' to see available commands.`,
        INVALID_ARGUMENT: `Invalid argument: ${invalidPart}`,
      };
      const errorMessage = errorMessages[type];
      get().output.addOutput({
        text: errorMessage,
        isCommand: false,
        isError: true,
      });
    },
    printHelp() {
      const actions: {
        command: string;
        description: string;
      }[] = [
        { command: "help", description: "Show all available commands" },
        { command: "clear", description: "Clear the terminal screen" },
        { command: "profile", description: "display personal information" },
        { command: "↑↓", description: "Navigate through the command history" },
        { command: "ctrl + c", description: "Terminate the current command" },
      ];
      const outputs = [
        { text: "All Commands:", isCommand: false },
        ...actions.map((action) => ({
          text: `${action.command.padEnd(10)} - ${action.description}`,
          isCommand: false,
        })),
      ];
      outputs.forEach(get().output.addOutput);
    },
    printProfile() {
      get().output.addOutput({
        component: ProfileComponent,
        isCommand: false,
      });
    },
    clearCommand() {
      set((state) => ({
        output: {
          ...state.output,
          outputs: [],
        },
      }));
    },
  },
  history: {
    histories: [],
    historyIndex: -1,
    setHistoryIndex(index) {
      set((state) => ({
        history: { ...state.history, historyIndex: index },
      }));
    },
    addHistory(command) {
      set((state) => {
        const newHistory = [command, ...state.history.histories];
        if (newHistory.length > 10) {
          newHistory.pop();
        }
        return { history: { ...state.history, histories: newHistory } };
      });
    },
    resetHistoryIndex() {
      set((state) => ({
        history: { ...state.history, historyIndex: -1 },
      }));
    },
    upHistory() {
      const otherAction = get();
      let newIndex = otherAction.history.historyIndex + 1;
      if (newIndex >= otherAction.history.histories.length) {
        newIndex = 0; // Loop to the first item
      }
      set((state) => ({
        history: { ...state.history, historyIndex: newIndex },
      }));

      return otherAction.history.histories[newIndex] || "";
    },
    downHistory() {
      const otherAction = get();
      let newIndex = otherAction.history.historyIndex - 1;
      if (newIndex < 0) {
        newIndex = otherAction.history.histories.length - 1; // Loop to the last item
      }
      set((state) => ({
        history: { ...state.history, historyIndex: newIndex },
      }));

      return otherAction.history.histories[newIndex] || "";
    },
  },
  processor: {
    isProcessingComplete: true,
    processCommand(command) {
      set((state) => ({
        processor: {
          ...state.processor,
          isProcessingComplete: false,
        },
      }));

      const lowerCaseCommand = command.toLowerCase().trim();
      const otherAction = get();

      // add the command to the output
      otherAction.output.addOutput({
        text: command,
        isCommand: true,
        isError: commandLists.indexOf(lowerCaseCommand) === -1,
      });

      /**
       * add the command to the history
       * if command not empty string and
       * current command is not in the first item of the history
       * */
      if (
        command.trim() !== "" &&
        otherAction.history.histories[0] !== command
      ) {
        otherAction.history.addHistory(command);
      }

      switch (lowerCaseCommand) {
        case "clear":
          otherAction.output.clearCommand();
          break;
        case "help":
          otherAction.output.printHelp();
          break;
        case "profile":
          otherAction.output.printProfile();
          break;
        default:
          {
            const trimmedCommand = command.trim();

            otherAction.output.printError({
              invalidPart: trimmedCommand,
              type: "COMMAND_NOT_FOUND",
            });
          }
          break;
      }

      set((state) => ({
        processor: {
          ...state.processor,
          isProcessingComplete: true,
        },
      }));
    },
  },
}));
