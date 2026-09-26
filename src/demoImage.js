/** Demo-only export: capture the full receipt without changing the live printer. */
export async function createPrinterImage(printer) {
  const { toBlob } = await import('html-to-image');
  const clone = printer.cloneNode(true);
  const sourceMarkup = printer.querySelector('.vp-markup-content');
  const extraWidth = sourceMarkup ? Math.max(0, sourceMarkup.scrollWidth - sourceMarkup.clientWidth) : 0;
  clone.setAttribute('aria-hidden', 'true');
  clone.inert = true;
  clone.removeAttribute('id');
  clone.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
  const sourceCanvases = printer.querySelectorAll('canvas');
  clone.querySelectorAll('canvas').forEach((target, index) => {
    const source = sourceCanvases[index];
    target.width = source.width;
    target.height = source.height;
    target.getContext('2d').drawImage(source, 0, 0);
  });
  Object.assign(clone.style, {
    position: 'fixed', left: '-20000px', top: '0', margin: '0',
    width: `${printer.getBoundingClientRect().width + extraWidth + 2}px`, maxWidth: 'none',
    pointerEvents: 'none',
  });
  document.body.append(clone);
  try {
    const scroll = clone.querySelector('.vp-paper-scroll');
    Object.assign(scroll.style, { maxHeight: 'none', overflow: 'visible' });
    // Expand fixed-width reports so the PNG includes every column as well.
    const markup = clone.querySelector('.vp-markup-content');
    if (markup) {
      const extra = Math.max(0, markup.scrollWidth - markup.clientWidth);
      clone.style.width = `${clone.getBoundingClientRect().width + extra}px`;
      markup.style.overflow = 'visible';
    }
    clone.querySelectorAll('button').forEach(button => { button.disabled = false; });
    const bounds = clone.getBoundingClientRect();
    const blob = await toBlob(clone, {
      pixelRatio: 2, skipFonts: true, width: Math.ceil(bounds.width), height: Math.ceil(bounds.height),
      style: { position: 'static', left: 'auto', top: 'auto' },
    });
    if (!blob) throw new Error('Could not create the receipt image.');
    return new File([blob], 'receipt.png', { type: 'image/png' });
  } finally {
    clone.remove();
  }
}

export function downloadPrinterImage(file) {
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 60000);
}
