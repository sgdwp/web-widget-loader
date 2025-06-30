(() => {
  // const script = document.currentScript;

  const hostname = window.location.hostname;
  if (hostname) {
    console.log("hostname", hostname);
  }

  // const URL = "https://ai-chatbot-2honfku3e-chin-weis-projects.vercel.app";
  // const URL = "https://ai-chatbot-ajpxv3mti-chin-weis-projects.vercel.app";

  // const URL = "https://sstabbgovtechomauatqatg.z23.web.core.windows.net/";
  const QUERYGOV_CHATBOT_URL = "http://localhost:3000/query";
  const origin = new URL(QUERYGOV_CHATBOT_URL).origin;
  const loadWidget = () => {
    const widget = document.createElement("div");
    const widgetStyle = widget.style;
    widgetStyle.display = "block";
    widgetStyle.boxSizing = "border-box";
    widgetStyle.width = "520px";
    widgetStyle.height = "580px";
    widgetStyle.position = "absolute";
    widgetStyle.bottom = "59px";
    widgetStyle.right = "44px";
    widgetStyle.backgroundColor = "#fff";
    widgetStyle.overflow = "hidden";
    widgetStyle.visibility = "hidden";

    const iframe = document.createElement("iframe");
    // Set the `allow` attribute for clipboard access
    iframe.setAttribute("allow", "clipboard-write");
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

    // const license = script.getAttribute("data-license");
    // const widgetUrl = `http://localhost:3000?license=${license}`;
    // const widgetUrl = `${QUERYGOV_CHATBOT_URL}?license=${license}&hostname=${hostname}`;
    // const widgetUrl = `${QUERYGOV_CHATBOT_URL}?hostname=${hostname}`;
    const widgetUrl = `${QUERYGOV_CHATBOT_URL}`;
    iframe.src = widgetUrl;

    document.body.appendChild(widget);

    // Create the toggle button
    const toggleButton = document.createElement("button");
    const buttonStyle = toggleButton.style;

    buttonStyle.position = "absolute";
    buttonStyle.bottom = "54px";
    buttonStyle.right = "44px";
    buttonStyle.padding = "16px 20px";
    buttonStyle.backgroundImage =
      "linear-gradient(to right, #491DB6, #5925DC, #7E55E4)";
    buttonStyle.color = "#fff";
    buttonStyle.border = "none";
    buttonStyle.borderRadius = "5px";
    buttonStyle.cursor = "pointer";
    buttonStyle.fontWeight = "bold";
    buttonStyle.width = "200px";
    buttonStyle.boxShadow = "0 4px 10px rgba(73, 29, 182, 0.22)";
    buttonStyle.backgroundColor = "rgba(73, 29, 182, 0.22)";
    buttonStyle.display = "none"; // flex
    buttonStyle.alignItems = "center";
    buttonStyle.justifyContent = "center";
    buttonStyle.gap = "8px"; // space between icon and text

    const icon = document.createElement("img");
    // Set icon source to base64 data URI
    icon.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEVSURBVHgB3VTdDYIwED4aEy1PjgCbOIIrOIE4gXEC4whO4AiO4AiygT7RQiInFyTQplApfeJLGkK5v+877gBmBymLc5blLyFy7DlP3SfLZNIXj+nBETEJAljDnxBCRIwFR3pajdvKa+OmaovPrbYr7mCvRg04lICKoKBd+aSkZCoTBg4gzRHZAwA33XtE2NJ9b0/GMmjlaQ4xGujFmAStTS0TyWP67iSRis+ukuaNWB6spi4MCENz4CXBEDxI1IKmXJ/0BUxAE4zzZfy7inSbSQlMAXV4lcgEIwPaSd2FN6XRRgZjtqkNPT0oY855Ch6gMKCJBM/QGOC1Emhf5aX/GRyRdl8UBmG4qtYwXlyZ1H7lCWaFL2+rIf/T1rVOAAAAAElFTkSuQmCC";
    icon.alt = "icon";
    icon.style.width = "20px";
    icon.style.height = "20px";

    const text = document.createTextNode("Ask a question");
    toggleButton.appendChild(icon);
    toggleButton.appendChild(text);

    // Attach click event to toggle the widget
    toggleButton.addEventListener("click", () => {
      api.toggle();
    });

    // Append the button to the body
    document.body.appendChild(toggleButton);

    //event listener
    const api = {
      sendMessage: (message) => {
        iframe.contentWindow.postMessage(
          {
            sendMessage: message,
          },
          QUERYGOV_CHATBOT_URL
        );
      },

      show: () => {
        widget.style.visibility = "visible";
        toggleButton.style.display = "none";
        toggleButton.style.visibility = "hidden";
        iframe.contentWindow.postMessage(
          {
            type: "VISIBILITY",
            payload: "visible",
          },
          QUERYGOV_CHATBOT_URL
        );
      },

      hide: () => {
        widget.style.visibility = "hidden";
        toggleButton.style.display = "flex";
        toggleButton.style.visibility = "visible";
        iframe.contentWindow.postMessage(
          {
            type: "VISIBILITY",
            payload: "hidden",
          },
          QUERYGOV_CHATBOT_URL
        );
      },

      toggle: () => {
        const visibility = window.getComputedStyle(widget).visibility;
        widget.style.visibility =
          visibility === "hidden" ? "visible" : "hidden";
        if (visibility === "hidden") {
          toggleButton.style.visibility = "hidden";
        }
        iframe.contentWindow.postMessage(
          {
            type: "VISIBILITY",
            payload: visibility === "hidden" ? "visible" : "hidden",
          },
          QUERYGOV_CHATBOT_URL
        );
      },

      onHide: () => {},
    };
    iframe.addEventListener("load", () => {
      window.addEventListener("getWidgetApi", () => {
        const event = new CustomEvent("widgetApi", { detail: api });
        window.dispatchEvent(event);
      });

      window.addEventListener("message", (evt) => {
        if (evt.origin !== origin) {
          return;
        }
        const { type } = evt.data;

        if (type === "INIT") {
          iframe.contentWindow.postMessage(
            { type: "HOSTNAME", payload: hostname },
            QUERYGOV_CHATBOT_URL
          );
        }
        if (type === "MINIMIZED_CHAT") {
          api.hide();
          api.onHide();
        }
        if (type === "EXPAND_CHAT") {
          api.show();
        }
      });
      // const greeting = script.getAttribute("data-greeting");
      // iframe.contentWindow.postMessage({ greeting }, QUERYGOV_CHATBOT_URL);
      widgetStyle.visibility = "hidden";
    });
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
