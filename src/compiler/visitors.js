/**
 * Visitor for collecting variables within an Intl AST.
 */
export const messageVariablesVisitor = () => {
    const variables = [];

    return {
        argumentElement(node) {
            variables.push({
                name: node.id,
                type: node.format ? node.format.type : null
            });
        },
        getVariables() {
            return variables;
        }
    };
};
