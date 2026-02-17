export function getInstructionPreProcessor(instruction: string): InstructionPreProcessor | null;
export type InstructionPreProcessor = (nodesToCombine: import("../../v2/types/index.js").OpenXmlNode[], instruction: string, docx?: import("../../v2/docxHelper").ParsedDocx) => import("../../v2/types/index.js").OpenXmlNode[];
//# sourceMappingURL=index.d.ts.map