var inputs = document.querySelectorAll('.controls input');

let shouldUpdate = false;

function varUpdate(event) {
  if (!shouldUpdate) return;

  const input = event.target;

  const suffix = (input.dataset && input.dataset.sizing) || '';

  document.documentElement.style.setProperty(
    `--${input.name}`,
    input.value + suffix
  );

  console.log(
    document.documentElement.style.getPropertyValue(`--${input.name}`)
  );
}

inputs.forEach(input => {
  input.addEventListener('pointerdown', () => (shouldUpdate = true));
  input.addEventListener('pointerup', () => (shouldUpdate = false));
  input.addEventListener('pointermove', varUpdate);

  input.addEventListener('change', event => {
    shouldUpdate = true;
    varUpdate(event);
    shouldUpdate = false;
  });
});

const scrollbar = document.getElementById('scrollbar');

let shouldUpdateScroll = false;

scrollbar.max = window.innerHeight;
window.addEventListener('resize', () => (scrollbar.max = window.innerHeight));

const updateScroll = event => {
  if (!shouldUpdateScroll) return;

  const input = event.target;
  window.scroll(0, parseInt(input.value) || 0);
};

scrollbar.addEventListener('pointerdown', () => (shouldUpdateScroll = true));
scrollbar.addEventListener('pointerup', () => (shouldUpdateScroll = false));
scrollbar.addEventListener('pointermove', updateScroll);

scrollbar.addEventListener('change', event => {
  shouldUpdateScroll = true;
  updateScroll(event);
  shouldUpdateScroll = false;
});

window.addEventListener('scroll', event => {
  scrollbar.value = window.scrollY;
});
