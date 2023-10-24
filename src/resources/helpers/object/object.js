export const object = {
  hasEmptyAttributes: (obj) => {
    return Object.values(obj).some(
      (value) =>
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0)
    );
  },
};
