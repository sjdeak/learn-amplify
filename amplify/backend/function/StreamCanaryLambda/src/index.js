exports.handler = awslambda.streamifyResponse(async (event, responseStream) => {
  const strings = [
    "This",
    "function",
    "is",
    "streaming",
    "the",
    "response",
    "back",
    "and",
    "now",
    "it",
    "is",
    "finished!"
  ];

  // Writes a string back to the caller every 500ms
  for (let s in strings) {
    responseStream.write(strings[s]);
    await new Promise(r => setTimeout(r, 500));
  }

  // When we are done writing to the stream, we need to call
  // `.end()` so that node knows that no more bytes will be written
  // to the stream
  responseStream.end();
});
