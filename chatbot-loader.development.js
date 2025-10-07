//development env
(() => {
  const hostname = window.location.hostname;
  if (hostname) {
    console.log("[loader] hostname", hostname);
    console.log(" window.devicePixelRatio", window.devicePixelRatio);
    //test
  }
  const QUERYGOV_CHATBOT_URL = "http://localhost:3000/query";

  const origin = new URL(QUERYGOV_CHATBOT_URL).origin;
  const loadWidget = () => {
    const widget = document.createElement("div");
    const widgetStyle = widget.style;
    widgetStyle.borderRadius = "8px";
    widgetStyle.border = "1px solid #98A2B3"; // grey-400
    widgetStyle.boxShadow = "0px 0px 20px -4px rgba(52, 64, 84, 0.1)"; //drop shadow

    //dynamic resize the widget frame based on pixelratio
    if (window.devicePixelRatio === 1) {
      widgetStyle.width = "520px";
      widgetStyle.height = "580px";
    } else if (window.devicePixelRatio > 1 && window.devicePixelRatio < 2) {
      widgetStyle.width = "400px";
      widgetStyle.height = "470px";
    } else {
      widgetStyle.width = "450px";
      widgetStyle.height = "480px";
    }

    widgetStyle.display = "block";
    widgetStyle.boxSizing = "border-box";

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
    iframeStyle.borderRadius = "8px";
    iframeStyle.zIndex = "9999"; // use very high number
    widget.appendChild(iframe);

    const widgetUrl = `${QUERYGOV_CHATBOT_URL}`;
    iframe.src = widgetUrl;

    document.body.appendChild(widget);

    // Add CSS for shine effect
    const style = document.createElement("style");
    style.textContent = `
  .shine-button {
    position: relative;
    overflow: hidden;
  }

  .shine-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.2) 100%
    );
    transform: skewX(-25deg);
  }

  .shine-button:hover::before {
    animation: shine 0.75s ease-in-out;
  }

  @keyframes shine {
    0% { left: -75%; }
    100% { left: 125%; }
  }
`;
    document.head.appendChild(style);

    // Create the toggle button
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("shine-button"); // add shine class
    const buttonStyle = toggleButton.style;

    buttonStyle.position = "absolute";
    buttonStyle.bottom = "54px";
    buttonStyle.right = "44px";
    buttonStyle.padding = "12px 16px";
    buttonStyle.backgroundImage =
      "linear-gradient(to right, #491DB6, #5925DC, #7E55E4)";
    buttonStyle.color = "#fff";
    buttonStyle.border = "none";
    buttonStyle.borderRadius = "4px";
    buttonStyle.cursor = "pointer";
    buttonStyle.fontWeight = "bold";
    buttonStyle.width = "100%";
    buttonStyle.maxWidth = "200px";
    buttonStyle.boxShadow = "inset 0 0 0 2px rgba(255, 255, 255, 0.2)";
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

    const text = document.createElement("span");
    text.textContent = "Ask a question";
    text.style.fontSize = "18px";
    text.style.fontWeight = "bold";
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
      showButton: () => {
        toggleButton.style.display = "flex";
      },
      hideButton: () => {
        toggleButton.style.display = "none";
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
        console.log("[loader] type", type + " " + QUERYGOV_CHATBOT_URL);
        if (type === "INIT") {
          if (hostname === "localhost") {
            iframe.contentWindow.postMessage(
              { type: "HOSTNAME", payload: "http://localhost:3000" },
              QUERYGOV_CHATBOT_URL
            );
          } else {
            iframe.contentWindow.postMessage(
              { type: "HOSTNAME", payload: hostname },
              QUERYGOV_CHATBOT_URL
            );
          }
        }
        if (type === "MINIMIZED_CHAT") {
          api.hide();
          api.onHide();
        }
        if (type === "EXPAND_CHAT") {
          api.show();
        }
        if (type === "SHOW_BUTTON") {
          api.showButton();
        }
        if (type === "HIDE_BUTTON") {
          api.hideButton();
        }
      });
      widgetStyle.visibility = "hidden"; //should be hidden
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
