export function buildInstructionElements(instruction: string | null | undefined, instructionTokens: InstructionToken[] | null | undefined): Array<any>;
export type InstructionToken = {
    /**
     * - The token type ('text' or 'tab')
     */
    type: string;
    /**
     * - The text content (for 'text' type tokens)
     */
    text?: string;
};
//# sourceMappingURL=instruction-elements.d.ts.map