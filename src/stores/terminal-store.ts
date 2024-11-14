import { ProfileComponent } from "@/components/output/profile-component";
import { create } from "zustand";
import {HelpComponent} from "@/components/output/help-component.tsx";
import { JSX } from "react";
import {ProjectsComponent} from "@/components/output/projects-component.tsx";

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
    type: "COMMAND_NOT_FOUND" | "INVALID_ARGUMENT" | "EMPTY_COMMAND";
  }) => void;
  printHelp: () => void;
  printProfile: () => void;
  printProjects: () => void;
  clearCommand: () => void;
};

type ProcessorType = {
  isProcessingComplete: boolean;
  processCommand: () => void;
};

type InputType = {
    inputValue: string;
    setInputValue: (value: string) => void;
}

interface TerminalState {
  history: HistoryType;
  output: OutputType;
  input: InputType;
  processor: ProcessorType;
}

export const commandLists = ["clear", "help", "profile", "projects"];

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
        EMPTY_COMMAND: `Command is empty. Type 'help' to see available commands.`,
      };
      const errorMessage = errorMessages[type];
      get().output.addOutput({
        text: errorMessage,
        isCommand: false,
        isError: true,
      });
    },
    printHelp() {
      get().output.addOutput({
        component: HelpComponent,
        isCommand: false,
      })
    },
    printProfile() {
      get().output.addOutput({
        component: ProfileComponent,
        isCommand: false,
      });
    },
    printProjects(){
      get().output.addOutput({
        component: ProjectsComponent,
        isCommand: false,
      })
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
  input: {
    inputValue: "",
    setInputValue(value) {
        set((state) => ({
            input: { ...state.input, inputValue: value },
        }));
    }
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
    processCommand() {
      set((state) => ({
        processor: {
          ...state.processor,
          isProcessingComplete: false,
        },
      }));

      const otherAction = get();
      const command = otherAction.input.inputValue;
      const lowerCaseCommand = command.toLowerCase().trim();

      // add the command to the output
      otherAction.output.addOutput({
        text: command,
        isCommand: true,
        isError: commandLists.indexOf(lowerCaseCommand) === -1,
      });

      /**
       * add the command to the history
       * if command not empty string and
       * current command not the first item of history.
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
        case "projects":
          otherAction.output.printProjects();
          break;
        default:
          {
            if (command.trim() === "") {
              otherAction.output.printError({
                invalidPart: "",
                type: "EMPTY_COMMAND",
              });
              break;
            }

            otherAction.output.printError({
              invalidPart: lowerCaseCommand,
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
