<script lang="ts">
  export let targetEl: HTMLTextAreaElement | null = null;

  function dispatchInput(el: HTMLTextAreaElement) {
    // Ensure existing on:input handlers run
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function getSel() {
    const el = targetEl;
    if (!el) return null;
    return {
      el,
      start: el.selectionStart ?? 0,
      end: el.selectionEnd ?? 0,
      value: el.value
    };
  }

  function setSel(el: HTMLTextAreaElement, start: number, end: number) {
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start, end);
    });
  }

  function surround(markLeft: string, markRight: string = markLeft) {
    const sel = getSel();
    if (!sel) return;
    const { el, start, end, value } = sel;
    const before = value.slice(0, start);
    const middle = value.slice(start, end);
    const after = value.slice(end);
    const newVal = `${before}${markLeft}${middle}${markRight}${after}`;
    el.value = newVal;
    const newStart = start + markLeft.length;
    const newEnd = newStart + middle.length;
    dispatchInput(el);
    setSel(el, newStart, newEnd);
  }

  function toggleInline(wrapper: string) {
    const sel = getSel();
    if (!sel) return;
    const { el, start, end, value } = sel;
    const selected = value.slice(start, end);
    const left = value.slice(Math.max(0, start - wrapper.length), start);
    const right = value.slice(end, end + wrapper.length);
    let newVal: string;
    let newStart = start, newEnd = end;
    if (left === wrapper && right === wrapper) {
      // unwrap
      newVal = value.slice(0, start - wrapper.length) + selected + value.slice(end + wrapper.length);
      newStart = start - wrapper.length;
      newEnd = end - wrapper.length;
    } else {
      newVal = value.slice(0, start) + wrapper + selected + wrapper + value.slice(end);
      newStart = start + wrapper.length;
      newEnd = newStart + selected.length;
    }
    el.value = newVal;
    dispatchInput(el);
    setSel(el, newStart, newEnd);
  }

  function prefixLines(prefix: string) {
    const sel = getSel();
    if (!sel) return;
    const { el, start, end, value } = sel;
    const before = value.slice(0, start);
    const middle = value.slice(start, end);
    const after = value.slice(end);

    const beforeLineStart = before.lastIndexOf('\n') + 1;
    const selection = value.slice(beforeLineStart, end);
    const lines = selection.split('\n');
    const updated = lines.map((l) => (l.startsWith(prefix) ? l : `${prefix}${l}`)).join('\n');

    const newVal = value.slice(0, beforeLineStart) + updated + after;
    const added = updated.length - selection.length;
    el.value = newVal;
    dispatchInput(el);
    setSel(el, start + (start - beforeLineStart > 0 ? prefix.length : 0), end + added);
  }

  function setHeading(level: 1 | 2 | 3) {
    const sel = getSel();
    if (!sel) return;
    const { el, start, end, value } = sel;
    const beforeLineStart = value.lastIndexOf('\n', start - 1) + 1;
    const line = value.slice(beforeLineStart, end);
    const hashes = '#'.repeat(level) + ' ';
    const lineNoHashes = line.replace(/^(#{1,6}\s+)?/, '');
    const newLine = hashes + lineNoHashes;
    const newVal = value.slice(0, beforeLineStart) + newLine + value.slice(end);
    el.value = newVal;
    dispatchInput(el);
    const cursor = beforeLineStart + hashes.length;
    setSel(el, cursor, cursor + lineNoHashes.length);
  }

  function makeLink() {
    const sel = getSel();
    if (!sel) return;
    const { el, start, end, value } = sel;
    const selected = value.slice(start, end) || 'link text';
    const url = prompt('Enter URL');
    if (!url) return;
    const markdown = `[${selected}](${url})`;
    const newVal = value.slice(0, start) + markdown + value.slice(end);
    el.value = newVal;
    dispatchInput(el);
    const caret = start + markdown.length;
    setSel(el, caret, caret);
  }

  function codeInline() { surround('`'); }
  function bold() { toggleInline('**'); }
  function italic() { toggleInline('*'); }
  function quote() { prefixLines('> '); }
  function ul() { prefixLines('- '); }
  function ol() { prefixLines('1. '); }
</script>

<div class="pointer-events-auto flex items-center gap-1 px-2 py-1 bg-black/60 text-white rounded shadow-lg border border-white/20 backdrop-blur-sm select-none">
  <div class="relative">
    <button class="px-2 py-1 text-xs rounded hover:bg-white/10" title="Paragraph" on:click={() => prefixLines('')}>¶</button>
    <div class="absolute hidden group-hover:block"></div>
  </div>
  <button class="px-2 py-1 text-xs rounded hover:bg-white/10" title="Heading 1" on:click={() => setHeading(1)}>H1</button>
  <button class="px-2 py-1 text-xs rounded hover:bg-white/10" title="Heading 2" on:click={() => setHeading(2)}>H2</button>
  <button class="px-2 py-1 text-xs rounded hover:bg-white/10" title="Bulleted list" on:click={ul}>• List</button>
  <button class="px-2 py-1 text-xs rounded hover:bg-white/10" title="Numbered list" on:click={ol}>1. List</button>
  <span class="mx-1 w-px h-4 bg-white/20"></span>
  <button class="px-2 py-1 text-xs rounded hover:bg-white/10 font-bold" title="Bold" on:click={bold}>B</button>
  <button class="px-2 py-1 text-xs italic rounded hover:bg-white/10" title="Italic" on:click={italic}>I</button>
  <button class="px-2 py-1 text-xs rounded hover:bg-white/10" title="Code" on:click={codeInline}>{"</>"}</button>
  <button class="px-2 py-1 text-xs rounded hover:bg-white/10" title="Quote" on:click={quote}>&gt;</button>
  <button class="px-2 py-1 text-xs rounded hover:bg-white/10" title="Link" on:click={makeLink}>🔗</button>
</div>

<style>
  :global(.toolbar-hidden) { opacity: 0; pointer-events: none; }
  :global(.toolbar-visible) { opacity: 1; }
</style>
