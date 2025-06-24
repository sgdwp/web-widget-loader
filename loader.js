(() => {
  const script = document.currentScript;

  const hostname = window.location.hostname;
  if (hostname) {
    console.log("hostname", hostname);
  }

  // const URL = "https://ai-chatbot-2honfku3e-chin-weis-projects.vercel.app";
  // const URL = "https://ai-chatbot-ajpxv3mti-chin-weis-projects.vercel.app";

  // const URL = "https://sstabbgovtechomauatqatg.z23.web.core.windows.net/";
  const URL = "http://localhost:3000/query";
  const loadWidget = () => {
    const widget = document.createElement("div");

    const widgetStyle = widget.style;
    widgetStyle.display = "block";
    widgetStyle.boxSizing = "border-box";
    widgetStyle.width = "520px";
    widgetStyle.height = "580px";
    widgetStyle.position = "absolute";
    widgetStyle.bottom = "55px";
    widgetStyle.right = "40px";
    widgetStyle.backgroundColor = "#fff";
    widgetStyle.overflow = "hidden";
    widgetStyle.visibility = "hidden";
    const iframe = document.createElement("iframe");

    const iframeStyle = iframe.style;
    iframeStyle.boxSizing = "border-box";
    iframeStyle.position = "absolute";
    iframeStyle.right = 0;
    iframeStyle.top = 0;
    iframeStyle.bottom = 10;
    iframeStyle.width = "100%";
    iframeStyle.height = "100%";
    iframeStyle.border = 0;
    iframeStyle.margin = 0;
    iframeStyle.padding = 0;
    widget.appendChild(iframe);

    const greeting = script.getAttribute("data-greeting");

    const api = {
      sendMessage: (message) => {
        iframe.contentWindow.postMessage(
          {
            sendMessage: message,
          },
          URL
        );
      },

      show: () => {
        // widget.style.display = "block";
        widgetStyle.visibility = "visible";
      },

      hide: () => {
        // widget.style.display = "none";
        widgetStyle.visibility = "hidden";
      },

      toggle: () => {
        // const display = window.getComputedStyle(widget, null).display;
        // widget.style.display = display === "none" ? "block" : "none";

        const visibility = window.getComputedStyle(widget).visibility;
        widget.style.visibility =
          visibility === "hidden" ? "visible" : "hidden";
      },

      onHide: () => {},
    };
    iframe.addEventListener("load", () => {
      window.addEventListener("getWidgetApi", () => {
        const event = new CustomEvent("widgetApi", { detail: api });
        window.dispatchEvent(event);
      });

      window.addEventListener("message", (evt) => {
        if (evt.origin !== URL) {
          return;
        }

        if (evt.data === "hide") {
          api.hide();
          api.onHide();
        }
      });

      iframe.contentWindow.postMessage({ greeting }, URL);
      // widgetStyle.display = "none";
      widgetStyle.visibility = "hidden";
    });

    const license = script.getAttribute("data-license");
    // const widgetUrl = `http://localhost:3000?license=${license}`;
    const widgetUrl = `${URL}?license=${license}&hostname=${hostname}`;
    iframe.src = widgetUrl;

    document.body.appendChild(widget);

    // Create the toggle button
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Ask a question";
    const buttonStyle = toggleButton.style;

    buttonStyle.position = "absolute";
    buttonStyle.bottom = "8px";
    buttonStyle.right = "40px";
    buttonStyle.padding = "10px 20px";
    buttonStyle.backgroundImage =
      "linear-gradient(to right, #491DB6, #5925DC, #7E55E4)";
    buttonStyle.color = "#fff";
    buttonStyle.border = "none";
    buttonStyle.borderRadius = "5px";
    buttonStyle.cursor = "pointer";
    buttonStyle.fontWeight = "bold";
    buttonStyle.width = "180px";

    // Attach click event to toggle the widget
    toggleButton.addEventListener("click", () => {
      api.toggle();
    });

    // Append the button to the body
    document.body.appendChild(toggleButton);
  };

  if (document.readyState === "complete") {
    loadWidget();
  } else {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") {
        loadWidget();
      }
    });
  }
})();
