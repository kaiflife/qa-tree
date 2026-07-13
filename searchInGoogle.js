const GOOGLE_BASE_URL = "https://google.com/search?q=QA ";

document.addEventListener("click", function (event) {
  if (!event.ctrlKey && !event.metaKey) return;

  if (event.target.className !== "value") return;

  event.preventDefault();

  const valueElement = event.target;
  const promptText = valueElement.innerText.trim();
  const encodedPrompt = encodeURIComponent(promptText);
  const targetUrl = GOOGLE_BASE_URL + encodedPrompt;

  window.open(targetUrl, "_blank");
});
