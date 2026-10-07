/** Demo-only export: capture the full receipt without changing the live printer. */
export async function createPrinterImage(printer) {
  const { toBlob } = await import('html-to-image');
  const clone = printer.cloneNode(true);
  const sourceMarkup = printer.querySelector('.vp-markup-content');
  const extraWidth = sourceMarkup ? Math.max(0, sourceMarkup.scrollWidth - sourceMarkup.clientWidth) : 0;
  clone.setAttribute('aria-hidden', 'true');
  clone.removeAttribute('data-dragging');
  clone.removeAttribute('data-flexing');
  clone.querySelector('.vp-paper')?.removeAttribute('data-raster-ready');
  clone.querySelector('.vp-paper-surface')?.remove();
  clone.inert = true;
  clone.removeAttribute('id');
  clone.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
  clone.querySelector('.vp-controls')?.remove();
  const sourceCanvases = [...printer.querySelectorAll('canvas')].filter(node => !node.closest('.vp-paper-surface'));
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
  const tabletop = clone.classList.contains('vp--up');
  const capture = tabletop ? document.createElement('div') : clone;
  if (tabletop) {
    Object.assign(capture.style, { position: 'fixed', left: '-20000px', top: '0', width: 'max-content', padding: '20px', background: '#f7f8fa' });
    Object.assign(clone.style, { position: 'static', left: 'auto', top: 'auto' });
    clone.querySelector('.vp-machine').style.marginBottom = '0';
    capture.append(clone);
  }
  document.body.append(capture);
  try {
    const scroll = clone.querySelector('.vp-paper-scroll');
    if (tabletop) {
      const sourceScroll = printer.querySelector('.vp-paper-scroll');
      const extraHeight = Math.max(0, sourceScroll.scrollHeight - sourceScroll.clientHeight);
      if (extraHeight) {
        const machine = clone.querySelector('.vp-machine');
        const window = clone.querySelector('.vp-paper-window');
        machine.style.paddingTop = `${parseFloat(getComputedStyle(machine).paddingTop) + extraHeight}px`;
        window.style.height = `${window.getBoundingClientRect().height + extraHeight}px`;
      }
    }
    Object.assign(scroll.style, { maxHeight: 'none', overflow: 'visible', mask: 'none' });
    // Expand fixed-width reports so the PNG includes every column as well.
    const markup = clone.querySelector('.vp-markup-content');
    if (markup) {
      const extra = Math.max(0, markup.scrollWidth - markup.clientWidth);
      clone.style.width = `${clone.getBoundingClientRect().width + extra}px`;
      markup.style.overflow = 'visible';
    }
    if (tabletop) {
      const paperTop = clone.querySelector('.vp-paper').getBoundingClientRect().top;
      clone.style.marginTop = `${-Math.max(0, Math.floor(paperTop - clone.getBoundingClientRect().top - 16))}px`;
    }
    const bounds = capture.getBoundingClientRect();
    const blob = await toBlob(capture, {
      pixelRatio: 2, skipFonts: true, width: Math.ceil(bounds.width), height: Math.ceil(bounds.height),
      style: { position: 'static', left: 'auto', top: 'auto' },
    });
    if (!blob) throw new Error('Could not create the receipt image.');
    return new File([blob], 'receipt.png', { type: 'image/png' });
  } finally {
    capture.remove();
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
