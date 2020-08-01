export default function ToggleMode(manager, attribute) {
  const setByAttribute = (value, id) => {
    manager._assign(attribute, value, id);
  };

  const unsetByAttribute = (value, id) => {
    manager._unassign(attribute, value, id);
  };

  return {
    reset() {
      manager._reset(attribute);
    },
    set(value, id) {
      setByAttribute(value, id);
    },
    unset(_, id) {
      unsetByAttribute(_, id);
    },
  };
}
