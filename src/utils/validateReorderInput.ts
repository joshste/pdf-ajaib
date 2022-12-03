export const validateReorderInput = (body: ReorderInput) => {  
    if (!body["swap-instruction"].match(/\d,\d/)) return null;
    return body;
}

export type ReorderInput = { ["swap-instruction"]: string; };