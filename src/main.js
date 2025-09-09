document.addEventListener('DOMContentLoaded', async () => {
  const loadElements = document.querySelectorAll('load[src]');

  for (const el of loadElements) {
    const src = el.getAttribute('src');

    try {
      // завантажуємо файл з public/partials
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`❌ Failed to load ${src}: ${response.status}`);
      }

      const html = await response.text();
      const temp = document.createElement('div');
      temp.innerHTML = html;

      // вставляємо вміст перед <load>
      while (temp.firstChild) {
        el.parentNode.insertBefore(temp.firstChild, el);
      }

      // видаляємо тег <load>
      el.remove();
    } catch (err) {
      console.error(err);
      el.innerHTML = `<p style="color:red;">Error loading ${src}</p>`;
    }
  }
});
