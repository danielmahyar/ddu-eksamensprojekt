import { useState } from 'react';

const { ipcRenderer } = window.app_cycle;

export default function useCopyToClipboard() {
  const [value, setValue] = useState<string>();
  const [success, setSucess] = useState<boolean>(true);

  async function copyToClipboard(text: string) {
    const result = await ipcRenderer.invoke('copyToClipboard', text.toString());
    if (result) setValue(text);
    setSucess(result);
  }

  return { copyToClipboard, value, success };
}
