class BemUtils {
    static buildElementClass(blockName, elName) {
        const { EL: seprator } = this.SEPERATORS;

        return `${blockName}${seprator}${elName}`;
    }
    static buildModClass(className, modName, modValue) {
        const { MOD: modSeparator, MOD_VAL: valueSeparator } = this.SEPERATORS;

        if (typeof modValue === 'string') {
            return `${className}${modSeparator}${modName}${valueSeparator}${modValue}`;
        }

        if (typeof modValue === 'boolean') {
            if (modValue) {
                return `${className}${modSeparator}${modName}`;
            } else {
                return `${className}`;
            }
        }

        return className;
    }

    static get SEPERATORS() {
        return {
            EL: '__',
            MOD: '_',
            MOD_VAL: '_'
        };
    }
}

export default BemUtils;
