class BemUtils {
    static buildElementClass(blockName, elName) {
        const {
            EL: seprator
        } = this.SEPERATORS;

        return `${blockName}${seprator}${elName}`;
    }
    static buildModClass(className, modName, modValue) {
        const {
            MOD: modSeparator,
            MOD_VAL: valueSeparator
        } = this.SEPERATORS;

        if (typeof modValue === 'string') {
            return `${className}${modSeparator}${modName}${valueSeparator}${modValue}`;
        }

        return `${className}${modSeparator}${modName}`;
    }

    static get SEPERATORS() {
        return {
            EL: '__',
            MOD: '_',
            MOD_VAL: '_'
        };
    }
    static parse(className) {
        const matchResult = className.match(
            /([a-z\-]+)(__([a-z\-]+))?(_([a-z\-]+))?(_([a-z\-]+))?/i) || [
                className
            ];

        const bemConfig = {
            className: matchResult[0],
            blockName: matchResult[1],
            elName: matchResult[3],
            modName: matchResult[5],
            modVal: matchResult[7]
        };

        bemConfig.isMod = Boolean(bemConfig.modName);
        bemConfig.isElement = !bemConfig.isMod && Boolean(bemConfig.elName);
        bemConfig.isBlock = !bemConfig.isMod && !bemConfig.isElement;
        bemConfig.isElMod = bemConfig.isMod && Boolean(bemConfig.elName);
        bemConfig.isBlMod = bemConfig.isMod && !bemConfig.elName;

        return bemConfig;
    }
}

export default BemUtils;
