(() => {
  document.querySelectorAll('[data-price-stepper]').forEach((stepper) => {
    const input = stepper.querySelector('[data-stepper-value]');
    const step = Number(stepper.dataset.step);
    const minimum = Number(stepper.dataset.min);

    stepper.querySelectorAll('[data-step-action]').forEach((button) => {
      button.addEventListener('click', () => {
        const stepAction = button.dataset.stepAction;
        const direction = stepAction === 'decrease' ? -1 : 1;
        const current = Number(input.value) || minimum;
        const nextValue = Math.max(minimum, current + direction * step);
        input.value = nextValue.toFixed(2);
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });

    input.addEventListener('blur', () => {
      const value = Number(input.value);
      input.value = Math.max(minimum, Number.isFinite(value) ? value : minimum).toFixed(2);
    });
  });

  const helperTriggers = [...document.querySelectorAll('[data-helper-trigger]')];

  const closeHelpers = (exceptTrigger = null) => {
    helperTriggers.forEach((trigger) => {
      if (trigger === exceptTrigger) return;
      const popover = document.querySelector(`#${trigger.getAttribute('aria-controls')}`);
      trigger.setAttribute('aria-expanded', 'false');
      popover.hidden = true;
    });
  };

  helperTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const popover = document.querySelector(`#${trigger.getAttribute('aria-controls')}`);
      const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
      closeHelpers(trigger);
      trigger.setAttribute('aria-expanded', String(willOpen));
      popover.hidden = !willOpen;
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-helper-trigger], [data-helper-popover]')) {
      closeHelpers();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeHelpers();
    }
  });
})();
