export namespace XmlValidators {
    export { createNumberingValidator as numberingValidator };
    export { createRelationshipsValidator as relationshipsValidator };
}
export type XmlValidator = {
    /**
     * - Validator for numbering.xml file.
     */
    numberingValidator: import("../../types.js").XmlValidator;
};
import { createNumberingValidator } from './numbering/numbering-validator.js';
import { createRelationshipsValidator } from './relationships/relationships-validator.js';
//# sourceMappingURL=index.d.ts.map