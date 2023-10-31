self.onmessage = (event) => {
    try {
        const jsonContent = JSON.parse(event.data.stringContent);
        self.postMessage(jsonContent);
    } catch (error) {
        self.postMessage(error);
    }

}
