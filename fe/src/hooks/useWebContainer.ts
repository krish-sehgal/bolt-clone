import { WebContainer } from "@webcontainer/api";
import { useEffect, useState } from "react"

function useWebContainer() {
  const [webContainer, setWebContainer] = useState<WebContainer>();

  async function main() {
    const webContainerInstance: WebContainer = await WebContainer.boot();
    setWebContainer(webContainerInstance);
  }

  useEffect(() => {
    main();
  }, [])

  return webContainer
}

export default useWebContainer
