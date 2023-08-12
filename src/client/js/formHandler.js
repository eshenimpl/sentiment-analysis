function handleSubmit(event) {
  event.preventDefault();
  document.getElementById("error-holder").innerHTML = "";

  // check what text was put into the form field
  let formText = document.getElementById("input").value.trim();
  if (Client.isEmpty(formText)) {
    document.getElementById("error-holder").innerHTML =
      "Missing text/url. Please input above.";

    Client.clearResult();
    return;
  }
  let textType = Client.isURL(formText) ? "url" : "txt";

  // send user input to server
  fetch("/nlp", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: formText,
      type: textType,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      Client.renderResult(result);
    });
}

function renderResult(resultContent) {
  if ("msg" in resultContent) {
    document.getElementById("error-holder").innerHTML = resultContent.msg;
    Client.clearResult();
    return;
  }
  document.getElementById("score_tag").innerHTML = Client.mapScore(
    resultContent.score_tag
  );
  document.getElementById("agreement").innerHTML = resultContent.agreement;
  document.getElementById("subjectivity").innerHTML =
    resultContent.subjectivity;
  document.getElementById("confidence").innerHTML = resultContent.confidence;
  document.getElementById("irony").innerHTML = resultContent.irony;
  document.getElementById("text_snippet").innerHTML =
    resultContent.text_snippet;
}

function clearResult() {
  const resultElements = document.querySelectorAll(".result");
  resultElements.forEach((td) => {
    td.innerHTML = "";
  });
}

function mapScore(tag) {
  let polarity = "N/A";
  switch (tag) {
    case "P+":
      polarity = "Strong positive";
      break;
    case "P":
      polarity = "Positive";
      break;
    case "NEU":
      polarity = "Neutral";
      break;
    case "N":
      polarity = "Negative";
      break;
    case "N+":
      polarity = "Strong negative";
      break;
    case "NONE":
      polarity = "Without polarity";
      break;
  }
  return polarity;
}

export { handleSubmit, renderResult, mapScore, clearResult };
