export default function displayLoadingAnimation(state) {
  const loader = document.querySelector('.loading');

  if (state) {
    console.log('LOADING');
    loader.classList.add('loader');
  } else {
    console.log('HIDING');
    loader.classList.remove('loader');
  }
}
