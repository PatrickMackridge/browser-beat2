const clearPattern = (sequencerRows) => {
  sequencerRows.forEach((row) => {
    const rowInputs = row.querySelectorAll("input");
    for (let i = 0; i < rowInputs.length; i++) {
      const input = rowInputs[i];
      if (input.checked) {
        input.checked = false;
      }
    }
  });
};

export { clearPattern };
