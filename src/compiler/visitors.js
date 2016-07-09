/**
 * Visitor for collecting variables within an Intl AST.
 */
export const messageVariablesVisitor = () => {
    const variables = [];

    return {
        argumentElement(node) {
            variables.push(node.id);
        },
        getVariables() {
            return variables;
        }
    };
};
