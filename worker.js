self.onmessage = (event) => {
    const jsonContent = JSON.parse(event.data.stringContent);
    self.postMessage(jsonContent);
}
