(() => {
  const script = document.currentScript;

  // const URL = "https://ai-chatbot-2honfku3e-chin-weis-projects.vercel.app";
  const URL = "https://ai-chatbot-ajpxv3mti-chin-weis-projects.vercel.app";
  //   const URL = "http://localhost:3000";
  const loadWidget = () => {
    const widget = document.createElement("div");

    const widgetStyle = widget.style;
    widgetStyle.display = "none";
    widgetStyle.boxSizing = "border-box";
    widgetStyle.width = "400px";
    widgetStyle.height = "747px";
    widgetStyle.position = "absolute";
    widgetStyle.bottom = "40px";
    widgetStyle.right = "40px";

    const iframe = document.createElement("iframe");

    const iframeStyle = iframe.style;
    iframeStyle.boxSizing = "borderBox";
    iframeStyle.position = "absolute";
    iframeStyle.right = 0;
    iframeStyle.top = 0;
    iframeStyle.width = "100%";
    iframeStyle.height = "100%";
    iframeStyle.border = 0;
    iframeStyle.margin = 0;
    iframeStyle.padding = 0;
    iframeStyle.width = "500px";

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
        widget.style.display = "block";
      },

      hide: () => {
        widget.style.display = "none";
      },

      toggle: () => {
        const display = window.getComputedStyle(widget, null).display;
        widget.style.display = display === "none" ? "block" : "none";
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
      widgetStyle.display = "block";
    });

    const license = script.getAttribute("data-license");
    // const widgetUrl = `http://localhost:3000?license=${license}`;
    const widgetUrl = `${URL}?license=${license}`;
    iframe.src = widgetUrl;

    document.body.appendChild(widget);

    // Create the toggle button
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Widget";
    const buttonStyle = toggleButton.style;
    buttonStyle.position = "absolute";
    buttonStyle.bottom = "10px";
    buttonStyle.right = "40px";
    buttonStyle.padding = "10px 20px";
    buttonStyle.backgroundColor = "#007bff";
    buttonStyle.color = "#fff";
    buttonStyle.border = "none";
    buttonStyle.borderRadius = "5px";
    buttonStyle.cursor = "pointer";

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
